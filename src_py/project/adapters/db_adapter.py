from hat import json
from hat.aio import Group
from hat.event.common import Subscription
from hat.gui.common import AdapterEventClient
from hat.gui.common import AdapterSessionClient
from hat.util import RegisterCallbackHandle
import hat.aio
import hat.event.common
import hat.gui.common
import hat.juggler
import hat.util
import typing

json_schema_id = None
json_schema_repo = None


async def create_subscription(conf: json.Data) -> Subscription: 
    """Creates Subscription to a specific event type.

    Args:
        conf: adapter configuration
    Returns:
        Subscription: subscribed event types filter
    """
    return hat.event.common.Subscription([("db","*")])


async def create_adapter(conf: json.Data, event_client: AdapterEventClient) -> 'DbAdapter':
    """Creates a new DbAdapter which connects to database

    Args:
        conf: adapter configuration
        event_client: event client for adapter

    Returns:
        new DbAdapter instance
    """
    adapter = DbAdapter()

    adapter._async_group = hat.aio.Group()
    adapter._event_client = event_client
    adapter._state_change_cb_registry = hat.util.CallbackRegistry()
    adapter._async_group.spawn(adapter._main_loop)
    adapter._state = {}

    return adapter


class DbAdapter(hat.gui.common.Adapter):
    @property
    def async_group(self) -> Group:
        """Creates async Group which controlls asyncio Tasks

        Returns:
            new Group instance
        """
        return self._async_group

    @property
    def state(self) -> typing.Dict[str, json.Data]: #check
        """Returns adapter state.

        Returns:
            DbAdapter state
        """  
        return self._state
    
    def subscribe_to_state_change(self, callback: typing.Callable) -> RegisterCallbackHandle:
        """Registers state changes and returns a callback

        Args:
            callback: notified on state change

        Returns:
            registers callback handle
        """
        return self._state_change_cb_registry.register(callback)

    async def create_session(self, juggler_client: AdapterSessionClient) -> 'Session':
        """Creates a Session in the adapter for client.

        Args:
            juggler_client: juggler connection

        Returns:
            new client Session
        """
        return Session(self, juggler_client, self._async_group.create_subgroup())

    async def _main_loop(self):
        while True:
            events = await self._event_client.receive()


class Session(hat.gui.common.AdapterSession):
    def __init__(self, adapter, juggler_client, group):
        self._adapter = adapter
        self._juggler_client = juggler_client
        self._async_group = group
        self._async_group.spawn(self._run)
        self._state = {}

    @property
    def async_group(self) -> Group:
        """Creates async Group which controlls asyncio Tasks

        Returns:
            new Group instance
        """
        return self._async_group

    @property
    def state(self) -> typing.Dict[str, json.Data]: #check
        """Returns session state.

        Returns:
            Session state
        """  
        return self._state
    
    def subscribe_to_state_change(self, callback: typing.Callable) -> RegisterCallbackHandle:
        """Registers state changes and returns a callback

        Args:
            callback: notified on state change

        Returns:
            registers callback handle
        """
        return self._state_change_cb_registry.register(callback)

    async def _run(self):
        try:
            while True:
                received = await self._juggler_client.receive()
                asdu = str(received.get("asdu"))

                events = await self._adapter._event_client.query(
                    hat.event.common.QueryData(event_types=[["db", asdu]], max_results=1)
                )

                self._state = dict(self._state)
                self._state["plot_data"] = events[0].payload.data 
                self._on_state_change()

        except Exception as e:
            await self.wait_closing()

    def _on_state_change(self):
        self._juggler_client.set_local_data(self._state)
from hat import json as hatJson
from hat.aio import Group
from hat.event.common import Subscription
from hat.gui.common import AdapterEventClient
from hat.gui.common import AdapterSessionClient
from hat.util import RegisterCallbackHandle
import hat.aio
import hat.event.common
import hat.gui.common
import hat.util
import math
import typing
import json
json_schema_id = None
json_schema_repo = None


async def create_subscription(conf: hatJson.Data) -> Subscription: 
    """Creates Subscription to a specific event type.

    Args:
        conf: adapter configuration
    Returns:
        Subscription: subscribed event types filter
    """
    return hat.event.common.Subscription([('gateway', 'gateway', 'simulator', 'device', 'gateway', 'simulator','*')])


async def create_adapter(conf: hatJson.Data, event_client: AdapterEventClient) -> 'Adapter':
    """Creates a new Adapter which connects device to GUI interface

    Args:
        conf: adapter configuration
        event_client: event client for adapter

    Returns:
        new Adapter instance
    """
    adapter = Adapter()

    adapter._async_group = hat.aio.Group()
    adapter._event_client = event_client
    adapter._state = {}
    adapter._state_change_cb_registry = hat.util.CallbackRegistry()

    adapter._async_group.spawn(adapter._main_loop)

    return adapter


class Adapter(hat.gui.common.Adapter):

    @property
    def async_group(self) -> Group:
        """Creates async Group which controlls asyncio Tasks

        Returns:
            new Group instance
        """
        return self._async_group

    @property
    def state(self) -> hatJson.Data: #check
        """Returns adapter state.

        Returns:
            Adapter state
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
            for e in events:
                #data = e.payload.data
                data = json.loads(e.payload.data)
                event_type = e.event_type
                
                asdu_address = int(event_type[-2])
                io_address = int(event_type[-1])

                if not(data["value"] == 'ON' or data["value"] == 'OFF'):
                    if math.isnan(data["value"]):
                        data["value"] = 0
               
                self._state = hatJson.set_(self._state, [f'{asdu_address}',f'{io_address}'], data)
                self._state_change_cb_registry.notify()


class Session(hat.gui.common.AdapterSession):

    def __init__(self, adapter, juggler_client, group):
        self._adapter = adapter
        self._juggler_client = juggler_client
        self._async_group = group
        self._async_group.spawn(self._run)

    @property
    def async_group(self) -> Group:
        """Creates async Group which controlls asyncio Tasks

        Returns:
            new Group instance
        """
        return self._async_group

    async def _run(self):
        try:
            self._on_state_change()
            with self._adapter.subscribe_to_state_change(self._on_state_change):
                while(True):
                    data = await self._juggler_client.receive()
                    self._adapter._event_client.register(([
                        hat.event.common.RegisterEvent(
                        event_type=('gateway', 'gateway', 'simulator', 'device',
                                    'system', 'simulator'),
                        source_timestamp=None,
                        payload=hat.event.common.EventPayload(
                            type=hat.event.common.EventPayloadType.JSON,
                            data=data))]))
        except:
            await self.wait_closing()

    def _on_state_change(self):
        self._juggler_client.set_local_data(self._adapter.state)

from hat import json
from hat.aio import Group
from hat.event.common import Subscription
from hat.event.server.common import ProcessEvent
from hat.event.server.module_engine import ModuleEngine
import hat.aio
import hat.event.server.common
import typing

json_schema_id = None
json_schema_repo = None

_source_id = 0


async def create(conf: json.Data, engine: ModuleEngine)-> 'Module':
    """Creates new Module instance which receives events

    Args:
        conf: module configuration
        engine: module engine

    Returns:
        new Module instance
    """
    module = Module()

    global _source_id
    module._source = hat.event.server.common.Source(
        type=hat.event.server.common.SourceType.MODULE,
        name=__name__,
        id=_source_id)
    _source_id += 1

    module._subscription = hat.event.server.common.Subscription([
        ('gateway', '?', 'example', '?', 'gateway', 'simulator')])
    module._async_group = hat.aio.Group()
    module._engine = engine

    return module


class Module(hat.event.server.common.Module):

    @property
    def async_group(self) -> Group:
        """Creates async Group which controlls asyncio Tasks

        Returns:
            new Group instance
        """
        return self._async_group

    @property
    def subscription(self) -> Subscription:
        """Creates Subscription to a specific event type.

        Returns:
            new Subscription to event types
        """
        return self._subscription

    async def create_session(self) -> 'Session':
        """Creates a Session for Module

        Returns:
            new module Session
        """
        return Session(self._engine, self._source,
                       self._async_group.create_subgroup())


class Session(hat.event.server.common.ModuleSession):
    def __init__(self, engine, source, group):
        self._engine = engine
        self._source = source
        self._async_group = group

    @property
    def async_group(self) -> Group:
        """Creates async Group which controlls asyncio Tasks

        Returns:
            new Group instance
        """
        return self._async_group

    async def process(self, changes: typing.List[ProcessEvent]) -> typing.Iterable[ProcessEvent]:
        return [
            self._engine.create_process_event(
                self._source,
                hat.event.server.common.RegisterEvent(
                    event_type=('simulator', ),
                    source_timestamp=None,
                    payload=event.payload))
            for event in changes]

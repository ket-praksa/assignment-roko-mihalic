import hat
from hat.event.server import common
import pytest
import asyncio
from hat.event.server.common import RegisterEvent
from hat import aio, util, json

from project.modules import iec_104_module

pytestmark = pytest.mark.asyncio


class MockEngine:
    def create_process_event(self,
                         source: common.Source,
                         event: common.RegisterEvent
                         ) -> common.ProcessEvent:
    
      
        return common.ProcessEvent(
            event_id=common.EventId(
                server=1,
                instance=1),
            source=source,
            event_type=event.event_type,
            source_timestamp=event.source_timestamp,
            payload=event.payload)


@pytest.mark.parametrize(
    'input_event_type, input_payload, expected_event_type, expected_payload',
    [(('a', 'b', 'c'), 'krug', ('simulator', ), 'krug'),(('p', 'o', 'o'), 'leon_u_<3', ('simulator', ), 'leon_u_<3')])
async def test_example2(input_event_type, input_payload, 
                        expected_event_type, expected_payload):

    module = await iec_104_module.create(None, MockEngine())
    session = await module.create_session()
    engine = MockEngine()

    calculated_event = await session.process([
        engine.create_process_event(
            None,
            hat.event.server.common.RegisterEvent(
                    event_type=input_event_type,
                    source_timestamp=None,
                    payload=input_payload)
        )
    ])

    calculated_event = calculated_event[0]
    assert calculated_event.event_type == expected_event_type
    assert calculated_event.payload == expected_payload

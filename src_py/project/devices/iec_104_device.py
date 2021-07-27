from hat import json as hatJson
from hat.aio import Group
from hat.drivers.iec104.connection import connect
from hat.gateway.common import DeviceEventClient
import asyncio
import hat.aio
import hat.drivers.iec104.common
from hat.event.common import timestamp_from_datetime, EventPayload, EventPayloadType, RegisterEvent
import typing
from hat.drivers.iec104.common import SingleValue, Command, Action, time_to_datetime
import json
json_schema_id = None
json_schema_repo = None
device_type = 'simulator'


async def create(conf: hatJson.Data, event_client: DeviceEventClient,
                 event_type_prefix: typing.List[str]) -> 'Device':
    """Creates a new Device instance which connects to simulator. Receives events from simulator and
    sends commands back to simulator

    Args:
        conf: device configuration
        event_client: device's event client interface
        event_type_prefix: event type prefix

    Returns:
        new Device instance
    """

    device = Device()

    device._async_group = hat.aio.Group()
    device._event_client = event_client
    device._event_type_prefix = event_type_prefix
    device._async_group.spawn(device._main_loop)
    device._async_group.spawn(device._event_loop)

    return device


class Device(hat.gateway.common.Device):

    @property
    def async_group(self) -> Group:
        """Creates async Group which controlls asyncio Tasks

        Returns:
            new Group instance
        """
        return self._async_group

    # _event_loop waits for events from SVG model by switches
    # creates a new Command with the given data
    async def _event_loop(self):

        while(True):   
            con = await connect(("127.0.0.1",19999))
            
            events = await self._event_client.receive()
            for e in events:
                data = (e.payload.data)

                asdu = int(data["asdu"])
                value = data["value"]
                #breakpoint()

                if value == "ON":
                    value = SingleValue.ON
                else:
                    value = SingleValue.OFF

                command_to_send = Command(
                                        Action.EXECUTE,
                                        value,
                                        asdu,
                                        0, None,1)
                
                resp = await con.send_command(command_to_send)
                

    async def _main_loop(self):
        while True:
            while True:
                try:
                    con = await connect(("127.0.0.1",19999))
                    break
                except (ConnectionError, ConnectionRefusedError):
                    await asyncio.sleep(1)

            try:
                data = await con.interrogate(0xFFFF)
                await asyncio.sleep(3) 
                for event in data:
                    self._send_event(event)
                
                while True:
                    data = await con.receive()
                    for event in data:
                        self._send_event(event)

            except ConnectionError:
                await asyncio.sleep(1)

            except Exception:
                self.close()


    def _send_event(self, event):
        
        event_data = event._asdict() 
        dict_data = {}       
        
        # parsing Cause, not JSON serializable
        strCause = str(event_data['cause']).split(".")[1]
        dict_data['cause'] = strCause

        # parsing Time -> datetime -> Timestamp¸
        datetimeTime = timestamp_from_datetime(time_to_datetime(event_data['time']))
        dict_data['time'] = datetimeTime

        if isinstance(event_data['value'], SingleValue):
            dict_data['value'] = "ON" if event_data['value'] == SingleValue.ON else "OFF"
        else:
            dict_data['value'] = round(event_data['value'][0], 4)

        dict_data_json = json.dumps(dict_data)

        self._event_client.register([
            RegisterEvent(
                event_type=(*self._event_type_prefix,
                            'gateway', 'simulator', f'{event_data["asdu_address"]}', f'{event_data["io_address"]}'),
                source_timestamp= None,
                payload= EventPayload(
                    type= EventPayloadType.JSON,
                    data= dict_data_json))])

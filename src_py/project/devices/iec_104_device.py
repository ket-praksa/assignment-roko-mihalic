import asyncio
import hat.aio
from hat.drivers.iec104.connection import connect
import hat.event.common
import hat.drivers.iec104.common

json_schema_id = None
json_schema_repo = None
device_type = 'simulator'


async def create(conf, event_client, event_type_prefix):
    device = Device()

    device._async_group = hat.aio.Group()
    device._event_client = event_client
    device._event_type_prefix = event_type_prefix
    device._async_group.spawn(device._main_loop)

    # new function added to _async_group which runs concurrently with the main loop
    device._async_group.spawn(device._event_loop)

    
    return device


class Device(hat.gateway.common.Device):

    @property
    def async_group(self):
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
                value = int(data["value"])
                # io = int(data["io"])

                if value == 1:
                    value = hat.drivers.iec104.common.SingleValue.ON
                else:
                    value = hat.drivers.iec104.common.SingleValue.OFF

                commandToSend = hat.drivers.iec104.common.Command(
                                        hat.drivers.iec104.common.Action.EXECUTE,
                                        value,
                                        asdu,
                                        0, None,1)
                
                resp = await con.send_command(commandToSend)
                

    async def _main_loop(self):
        
        con = await connect(("127.0.0.1",19999))    
        data = await con.interrogate(65535)
        await asyncio.sleep(3)
        for event in data:
            self.sendEvent(event)
        
        while True:
            data = await con.receive()
            for event in data:
                self.sendEvent(event)


    def sendEvent(self, event):
        #breakpoint()
        dictData = event._asdict() 
                
        dictData.pop("quality")
        dictData.pop("is_test")
        
        # parsing Cause, not JSON serializable
        strCause = str(dictData["cause"]).split(".")[1]
        dictData["cause"]= strCause

        # parsing Time -> datetime -> Timestamp¸
        datetimeTime = hat.event.common.timestamp_from_datetime(hat.drivers.iec104.common.time_to_datetime(dictData["time"]))
        dictData["time"] = datetimeTime

        # SingleValue can't be serialized
        if "SingleValue" in str(dictData["value"]):
            dictData["value"] = 1 if ".ON" in str(dictData["value"]) else 0
        else:
            dictData["value"] = round(dictData["value"][0],4)

        self._event_client.register([
            hat.event.common.RegisterEvent(
                event_type=(*self._event_type_prefix,
                            'gateway', 'simulator', f'{dictData["asdu_address"]}', f'{dictData["io_address"]}'),
                source_timestamp=None,
                payload=hat.event.common.EventPayload(
                    type=hat.event.common.EventPayloadType.JSON,
                    data=dictData))])

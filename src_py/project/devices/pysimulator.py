import asyncio
import hat.aio
import hat.event.common
import hat.gateway.common
import hat.drivers.iec104.common
from hat.drivers.iec104.connection import *
import json

json_schema_id = None
json_schema_repo = None
device_type = 'simulator'


async def create(conf, event_client, event_type_prefix):
    device = Device()

    device._async_group = hat.aio.Group()
    device._event_client = event_client
    device._event_type_prefix = event_type_prefix
    device._async_group.spawn(device._main_loop)
    device._async_group.spawn(device._event_loop)

    ## dodati tu spawn za novi command, koji je async i blokirati ce main loop te slati
    return device


class Device(hat.gateway.common.Device):

    @property
    def async_group(self):
        return self._async_group
    ## novi async fun koja ce primati data i parsirati ga i onda slati pomocu send command 
    #dobivat ce data iz adaptera koji salje. dobiva json slan sa sent, radi Command!

    async def _event_loop(self):

        con = await connect(("127.0.0.1",19999))
        
        events = await self._event_client.receive()
        
        for e in events:
            data = (e.payload.data)
            tip = type(data)
            asdu = int(data["asdu"])
            value = int(data["value"])
            tip1 = type(asdu)
            tip2 = type(value)
            if value == 1:
                value = hat.drivers.iec104.common.SingleValue.ON
            else:
                value = hat.drivers.iec104.common.SingleValue.OFF
            commandToSend = hat.drivers.iec104.common.Command(hat.drivers.iec104.common.Action.EXECUTE,value,asdu,0,None,1)
            resp = await con.send_command(commandToSend)
    



    async def _main_loop(self):
        
        con = await connect(("127.0.0.1",19999))    
        while True:
            await asyncio.sleep(3)
            listOfData = []
            #getting data from all ASDU addresses
            data = await con.interrogate(65535)
            for eachASDU in data:
                #casting to dict
                dictData = eachASDU._asdict()
                
                dictData.pop("quality")
                dictData.pop("is_test")


                #parsing Cause, not JSON serializable
                strCause = str(dictData["cause"]).split(".")[1]
                dictData["cause"]= strCause

                #parsing Time -> datetime -> Timestamp¸
                #if dictData["time"] != None:
                datetimeTime = hat.event.common.timestamp_from_datetime(hat.drivers.iec104.common.time_to_datetime(dictData["time"]))
                #else:
                #    datetimeTime = (11,22)
                dictData["time"] = datetimeTime

                #SingleValue can't be serialized
                if "SingleValue" in str(dictData["value"]):
                    dictData["value"] = 1 if ".ON" in str(dictData["value"]) else 0


                # jsonData = json.dumps(dictData)
                listOfData.append(dictData)

            listOfDataJson = json.dumps(listOfData)
            
            self._event_client.register([
                hat.event.common.RegisterEvent(
                    event_type=(*self._event_type_prefix,
                                'gateway', 'simulator'),
                    source_timestamp=None,
                    payload=hat.event.common.EventPayload(
                        type=hat.event.common.EventPayloadType.JSON,
                        data=listOfDataJson))])

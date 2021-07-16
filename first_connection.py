from hat.drivers.iec104.common import Command, Action, SingleValue, time_to_datetime
from hat.drivers.iec104.connection import *
import hat.event.common
import asyncio
import time
import random

async def main():
    print("started")
    con = await connect(("127.0.0.1",19999))
    while(1):
        for i in range(3):
            print(f"waiting {i+1} secs...")
            time.sleep(1)
        #data = await con.receive()

        # listOfData = []
        # #getting data from all ASDU addresses
        # data = await con.interrogate(65535)
        # for eachASDU in data:
        #     #casting to dict
        #     dictData = eachASDU._asdict()

        #     #parsing Cause
        #     strCause = str(dictData["cause"]).split(".")[1]
        #     dictData["cause"]= strCause

        #     #parsing Time -> datetime -> Timestamp
        #     datetimeTime = hat.event.common.timestamp_from_datetime(time_to_datetime(dictData["time"]))
        #     dictData["time"] = datetimeTime
        #     #SingleValue can't be serialized
        #     if "SingleValue" in str(dictData["value"]):
        #         dictData["value"] = 1 if ".ON" in str(dictData["value"]) else 0


        #     jsonData = json.dumps(dictData)
        #     listOfData.append(jsonData)
        # print(json.dumps(listOfData))
        
        #sending custom commands
        openClose = random.randint(0,1)
        if openClose == 1:
            value = SingleValue.ON
        else:
            value = SingleValue.OFF

        randomSwitch = random.randint(30,37)
        print(f"Changing switch number: {randomSwitch-30} to value: {value}")

        time.sleep(1)
        commandToSend = Command(Action.EXECUTE,value,randomSwitch,0,None,1)
        resp = await con.send_command(commandToSend)
        #data = await con.receive()
        #print(data[0])

asyncio.run(main())

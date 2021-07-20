"""Dummy backend

Simple backend which returns constat values. While backend is not closed,
all methods are successful and:

* `DummyBackend.get_last_event_id` returns instance ``0``
* `DummyBackend.register` returns input arguments
* `DummyBackend.query` returns ``[]``

"""

import typing
from hat import aio
from hat import json
from hat.event.server import common
import sqlite3
import math
import os
from pathlib import Path
import hat
import json as jss

json_schema_id = None
json_schema_repo = None


async def create(conf: json.Data):
    backend = Backend()
    backend._async_group = aio.Group()
    backend._db_con = init_db(conf)
    #backend._db_con = sqlite3.connect(conf["db_path"])
    return backend

def init_db(conf):
    #breakpoint()
    con = sqlite3.connect((os.path.join(Path(__file__).parent.parent.parent.parent,'backend','event_database.db')))
    #breakpoint()
    cur = con.cursor()
    cur.execute(
        """CREATE TABLE IF NOT EXISTS BUS(asdu integer, io integer, val float,
                'time' DATETIME NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')))"""
    )
    cur.execute(
        """CREATE TABLE IF NOT EXISTS LINE(asdu integer, io integer, val float,
                'time' DATETIME NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')))"""
    )
    cur.execute(
        """CREATE TABLE IF NOT EXISTS TRANSFORMER(asdu integer, io integer, val float,
                'time' DATETIME NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')))"""
    )
    cur.execute(
        """CREATE TABLE IF NOT EXISTS SWITCH(asdu integer, io integer, val float,
                'time' DATETIME NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')))"""
    )
    con.commit()
    return con

class Backend(common.Backend):

    @property
    def async_group(self) -> aio.Group:
        return self._async_group

    async def get_last_event_id(self,
                                server_id: int
                                ) -> common.EventId:
        result = common.EventId(server_id, 0)
        return await self._async_group.spawn(aio.call, lambda: result)

    
    async def register(self,
                    events: typing.List[common.Event]
                    ) -> typing.List[typing.Optional[common.Event]]:

        cur = self._db_con.cursor()
        #breakpoint()
        
        for e in events:
            
            event_type = e.event_type
            
            #event_type[0]== 'simulator'
            if event_type[-3] == "simulator":
                #breakpoint()
                asduAddress = int(event_type[-2])
                ioAddress = int(event_type[-1])
                data = e.payload.data
                
                if math.isnan(data["value"]):
                    data["value"] = 0
                
                if asduAddress in range(0, 10): 
                    table = "BUS"
                elif asduAddress in range(10, 20):
                    table = "LINE"
                elif asduAddress in range(30, 40):
                    table = "SWITCH"
                else:
                    table = "TRANSFORMER"
                
                data = float(data["value"])
                cur.execute(f'INSERT INTO SWITCH (asdu, io, val) VALUES ({asduAddress}, {ioAddress}, {data});')
                cur.execute("SELECT * FROM SWITCH")
                rows = cur.fetchall()
                #breakpoint()

        self._db_con.commit()
        result = events
        return await self._async_group.spawn(aio.call, lambda: result)

    async def query(self, data: common.QueryData ) -> typing.List[common.Event]:
        result = []
        # uzet asdu i io, selectat podatke, poslat u session
        event = hat.event.common.Event(
            event_id=hat.event.common.EventId(server=1, instance=1),
            timestamp=common.Timestamp(1,2),
            event_type=("db",),
            source_timestamp=None,
            payload=hat.event.common.EventPayload(
                type=hat.event.common.EventPayloadType.JSON, data=["nesto"]
            ),
        )
        result.append(event)
        return await self._async_group.spawn(aio.call, lambda: result)
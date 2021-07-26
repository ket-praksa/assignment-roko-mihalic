from hat import aio
from hat import json
from hat.event.server import common
from pathlib import Path
import datetime
import hat
import math
import os
import sqlite3
import time
import typing

json_schema_id = None
json_schema_repo = None


async def create(conf: json.Data) -> 'Backend':
    """Creates new Backend instance with connection to database
    Args:
        conf: backend configuration

    Returns:
        new Backend instance
    """
    backend = Backend()
    backend._async_group = aio.Group()
    backend._db_con = _init_db(conf)
    return backend

def _init_db(conf):
    con = sqlite3.connect((os.path.join(Path(__file__).parent.parent.parent.parent,'backend','event_database.db')))
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

    last_entry = {}

    @property
    def async_group(self) -> aio.Group:
        """Creates async Group which controlls asyncio Tasks

        Returns:
            new Group instance
        """
        return self._async_group

    async def get_last_event_id(self, server_id: int) -> common.EventId:
        """Gets the last events id form the server id

        Args:
            server_id: server id

        Returns:
            last events id form the server id
        """
        result = common.EventId(server_id, 0)
        return await self._async_group.spawn(aio.call, lambda: result)

    
    async def register(self, events: typing.List[common.Event]) -> typing.List[typing.Optional[common.Event]]:
        """Registers events from device and returns a list of events

        Args:
            events: receives events from device

        Returns:
            list of events
        """
        cur = self._db_con.cursor()
        for e in events:            
            event_type = e.event_type
            
            if event_type[-3] == "simulator":
                asduAddress = int(event_type[-2])
                ioAddress = int(event_type[-1])
                key = f'{asduAddress},{ioAddress}'
                data = e.payload.data

                current_time = datetime.datetime.fromtimestamp(time.time())
                containsKey = Backend.last_entry.__contains__(key)

                if not containsKey or current_time - datetime.timedelta(seconds=20) > Backend.last_entry[key]:
                    Backend.last_entry[key] = current_time

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

                    entries = cur.execute(f"SELECT Count(*) FROM {table};")
                    entries = entries.fetchone()[0]
                    if entries > 50000:
                        cur.execute(f"DELETE FROM {table} ORDER BY time LIMIT 1000")

                    cur.execute(f'INSERT INTO {table} (asdu, io, val) VALUES ({asduAddress}, {ioAddress}, {data});')
                
        self._db_con.commit()
        result = events
        return await self._async_group.spawn(aio.call, lambda: result)

    async def query(self, data: common.QueryData) -> typing.List[common.Event]:
        """Gets all records for the given Query and returns them in a list

        Args:
            data: query data

        Returns:
            list of events with data from database
        """
        result = []
        cur = self._db_con.cursor()
        event_type = data.event_types[0]

        if event_type[0] == "db":
            asduAddress = int(event_type[1])

            if asduAddress in range(0, 10): 
                table = "BUS"
            elif asduAddress in range(10, 20):
                table = "LINE"
            elif asduAddress in range(30, 40):
                table = "SWITCH"
            else:
                table = "TRANSFORMER"
                
            time_val = []

            for asdu, val, io, time in cur.execute(
                f"SELECT asdu,io, val, time FROM {table} WHERE asdu={asduAddress} AND time >= datetime('now','-20 minutes','localtime');"):
                time_val.append(f"{asdu};{io};{time};{val}")

            event = hat.event.common.Event(
                event_id=hat.event.common.EventId(server=1, instance=1),
                timestamp=common.Timestamp(1,2),
                event_type=("db",),
                source_timestamp=None,
                payload=hat.event.common.EventPayload(
                    type=hat.event.common.EventPayloadType.JSON, data=time_val
                ),
            )
            result.append(event)
        return await self._async_group.spawn(aio.call, lambda: result)
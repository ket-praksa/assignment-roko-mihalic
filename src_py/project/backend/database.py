from os import error
import sqlite3
print('start')
import os
from pathlib import Path
try:
    #breakpoint()
    con = sqlite3.connect(os.path.join(Path(__file__).parent.parent.parent.parent,'backend','event_database.db'))
except error as e:
    print(e)

cur = con.cursor()
cur.execute('''CREATE TABLE IF NOT EXISTS BUS(asdu integer, io integer, val float,
            'time' DATETIME NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')))''')
cur.execute('''CREATE TABLE IF NOT EXISTS LINE(asdu integer, io integer, val float,
            'time' DATETIME NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')))''')
cur.execute('''CREATE TABLE IF NOT EXISTS TRANSFORMER(asdu integer, io integer, val float,
            'time' DATETIME NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')))''')
cur.execute('''CREATE TABLE IF NOT EXISTS SWITCH(asdu integer, io integer, val float,
            'time' DATETIME NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')))''')
cur.execute('''INSERT INTO SWITCH(asdu,io,val) VALUES (30,0,1.0)''')
cur.execute("SELECT * FROM SWITCH")
rows = cur.fetchall()

for row in rows:
    print(row)
con.commit()
con.close() 
print('done')

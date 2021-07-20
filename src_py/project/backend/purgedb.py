import sqlite3
print('Purging...')
import os
from pathlib import Path
try:
    #breakpoint()
    con = sqlite3.connect(os.path.join(Path(__file__).parent.parent.parent.parent,'backend','event_database.db'))
except os.error as e:
    print(e)

cur = con.cursor()
cur.execute('''DELETE FROM BUS''')
cur.execute('''DELETE FROM LINE''')
cur.execute('''DELETE FROM TRANSFORMER''')
cur.execute('''DELETE FROM SWITCH''')

cur.execute("SELECT * FROM SWITCH")
rows = cur.fetchall()

for row in rows:
    print(row)
con.commit()
con.close() 
print('purged!')

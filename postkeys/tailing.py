import time
from datetime import datetime
import json
import requests

url = 'http://127.0.0.1:3000/keypress'

headers = {'content-type': 'application/json'}


def follow(thefile):
    thefile.seek(0, 2)      # Go to the end of the file
    while True:
        line = thefile.readline()
        if not line:
            time.sleep(0.001)    # Sleep briefly
            continue
        yield datetime.utcnow(), line


def send_data(when, key):
    payload = {
        'timestamp': when,
        'key': key
    }
    requests.post(url, data=json.dumps(payload), headers=headers)


logfile = open('logger.txt')
loglines = follow(logfile)
for when, line in loglines:
    if len(line) == 1:
        send_data("%s" % when, ord(line))
    else:
        send_data("%s" % when, line)

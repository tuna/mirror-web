#!/usr/bin/env python3

import json
import urllib.request
from collections import OrderedDict

tunasync = json.loads(
    urllib.request
    .urlopen("https://mirrors.tuna.tsinghua.edu.cn/static/tunasync.json")
    .read()
    .decode('utf-8')
)

mirrors = list({t['name'] for t in tunasync})
mirrors.sort()

with open('_data/mirror_desc.json') as f:
    descriptions = json.load(f)

descriptions = {
    x['name']: x['desc'] for x in descriptions
}
for m in mirrors:
    if m not in descriptions:
        descriptions[m] = ""

descriptions = sorted(
    [
        OrderedDict([('name', name), ('desc', desc)])
        for name, desc in descriptions.items()
    ],
    key=lambda x: x['name']
)

content = (
    json
    .dumps(descriptions, indent=2)
    .encode('utf-8')
    .decode('unicode-escape')
    .encode('utf-8')
)

with open('_data/mirror_desc.json', 'wb') as f:
    f.write(content)

# vim: ts=4 sw=4 sts=4 expandtab

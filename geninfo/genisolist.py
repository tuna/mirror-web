#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re
import glob
import json
import logging
import collections
import sys
from urllib.parse import urljoin
from distutils.version import LooseVersion
from configparser import ConfigParser

logger = logging.getLogger(__name__)
CONFIG_FILE = os.path.join(os.path.dirname(__file__), 'genisolist.ini')


def getPlatformPriority(platform):
    platform = platform.lower()
    if platform in ['amd64', 'x86_64', '64bit']:
        return 100
    elif platform in ['i386', 'i486', 'i586', 'i686', 'x86', '32bit']:
        return 90
    else:
        return 0


def renderTemplate(template, result):
    group_count = len(result.groups()) + 1
    for i in range(group_count):
        template = template.replace("$%d" % i, result.group(i) or "")
    return template


def getSortKeys(template, result):
    keys = []
    for i in template.split(' '):
        if not i:
            continue
        if i[0] != '$':
            keys.append(i)
        else:
            keys.append(result.group(int(i[1:])) or "")
    return keys


def parseSection(items):
    items = dict(items)

    if 'location' in items:
        locations = [items['location']]
    else:
        locations = []
        i = 0
        while ("location_%d" % i) in items:
            locations.append(items["location_%d" % i])
            i += 1

    pattern = items.get("pattern", "")
    prog = re.compile(pattern)

    images = []
    images = {}
    for location in locations:
        logger.debug("[GLOB] %s", location)

        for imagepath in glob.glob(location):
            logger.debug("[FILE] %s", imagepath)

            result = prog.search(imagepath)

            if not(result):
                logger.debug("[MATCH] None")
                continue
            else:
                logger.debug("[MATCH] %r", result.groups())

            imageinfo = {"filepath": imagepath, "distro": items["distro"]}

            for prop in ("version", "type", "platform", "category"):
                imageinfo[prop] = renderTemplate(items.get(prop, ""), result)
            if 'version' not in imageinfo:
                imageinfo['version'] = '0.0'
            sort_by = items.get("sort_by", "")
            if not(sort_by):
                imageinfo['sort_key'] = (imageinfo['version'], imageinfo['platform'], imageinfo['type'])
            else:
                imageinfo['sort_key'] = getSortKeys(sort_by, result)

            logger.debug("[JSON] %r", imageinfo)
            key = renderTemplate(items.get("key_by", ""), result)
            if key not in images:
                images[key] = []
            images[key].append(imageinfo)

    for image_group in images.values():
        if 'nosort' not in items:
            image_group.sort(key=lambda k: (LooseVersion(k['version']),
                                            getPlatformPriority(k['platform']),
                                            k['type']),
                             reverse=True)

        i = 0
        versions = set()
        listvers = int(items.get('listvers', 0xFF))
        for image in image_group:
            versions.add(image['version'])
            if len(versions) <= listvers:
                yield image
            else:
                break


def getDetail(image_info, urlbase):
    url = urljoin(urlbase, image_info['filepath'])
    desc = "%s (%s%s)" % (
            image_info['version'],
            image_info['platform'],
            ", %s" % image_info['type'] if image_info['type'] else ''
    ) if image_info['platform'] != "" else image_info['version']

    category = image_info.get('category', 'os') or "os"
    return (desc, url, category)


def getJsonOutput(url_dict, prio={}):
    raw = []
    for distro in url_dict:
        raw.append({
            "distro": distro,
            "category": list({c for _, _, c in url_dict[distro]})[0],
            "urls": [
                {"name": name, "url": url} for name, url, _ in url_dict[distro]
            ]
        })

    raw.sort(key=lambda d: prio.get(d["distro"], 0xFFFF))

    return json.dumps(raw)


def getImageList():
    ini = ConfigParser()
    if not(ini.read(CONFIG_FILE)):
        raise Exception("%s not found!" % CONFIG_FILE)

    root = ini.get("%main%", 'root')
    urlbase = ini.get("%main%", 'urlbase')

    if len(sys.argv) > 1:
        # Allow to override root in command-line
        root = sys.argv[1]

    prior = {}
    for (name, value) in ini.items("%main%"):
        if re.match("d\d+$", name):
            prior[value] = int(name[1:])

    oldcwd = os.getcwd()
    os.chdir(root)

    img_dict = collections.defaultdict(list)
    for section in ini.sections():
        if section == "%main%":
            continue
        for image in parseSection(ini.items(section)):
            img_dict[image['distro']].append(image)

    url_dict = {}
    for distro, images in img_dict.items():
        images.sort(key=lambda x: x['sort_key'], reverse=True)
        logger.debug("[IMAGES] %r %r", distro, images)
        url_dict[distro] = [getDetail(image, urlbase) for image in images]

    os.chdir(oldcwd)

    return getJsonOutput(url_dict, prior)


if __name__ == "__main__":
    import sys
    logging.basicConfig(stream=sys.stderr, level=logging.WARNING)
    print(getImageList())

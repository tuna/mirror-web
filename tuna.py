import os
import json
from pathlib import Path
import bs4


outdir = Path(os.environ.get('TUNA_TEMP_DIR', './tuna/'))
os.makedirs(outdir, exist_ok=True)


def process(html, config, project, *_):
    doc = bs4.BeautifulSoup(html, 'html.parser')
    for tmpl in doc.find_all('tmpl'):
        tmpl.name = "pre"
        tmpl.attrs["class"] = tmpl.attrs.get("class", []) + ["z-tmpl"]
    for form in doc.find_all('form', class_='z-form'):
        form.attrs.pop('onchange', None)
        form.attrs.pop('onsumit', None)
    doc_body = doc.find('div', class_='z-help')
    doc_title = None
    if not doc_body is None:
        title = doc_body.find('h1')
        if not title is None:
            doc_title = title.extract()
    html = str(doc)
    md = f"""---
category: help
layout: helpz
mirrorid: {json.dumps(config.get('mirrorid', project))}
excerpt_separator: ""
---
""" + """
<!-- 本页面从 tuna/mirrorz-help-ng 自动生成，如需修改请参阅该仓库 -->
{% raw %}""" + (str(doc_title) if not doc_title is None else "") + """{% endraw %}
<div class="z-wrap">
    <form class="z-form z-global">
        <div>
            <label for="e0a5cecb">线路选择</label>
            <select id="e0a5cecb" name="host">
                <option selected="selected" value="{{ site.url }}">自动</option>
                <option value="{{ site.urlv4 }}">IPv4</option>
                <option value="{{ site.urlv6 }}">IPv6</option>
            </select>
        </div>
        <div>
            <input id="a44d763c" name="_scheme" type="checkbox" checked>
            <label for="a44d763c">是否使用 HTTPS</label>
        </div>
        <div>
            <input id="a659e7da" name="_sudo" type="checkbox">
            <label for="a659e7da">是否使用 sudo</label>
        </div>
    </form>
</div>
{% raw %}
""" + html + """
{% endraw %}
"""
    with open(outdir/f'1970-01-01-{config.get("permalink", project)}.html', 'w') as f:
        f.write(md)
    return html

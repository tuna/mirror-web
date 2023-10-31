---
---

function generateFormConfig(form) {
    const formData = Object.fromEntries(new FormData(form).entries());
    Array.from(  // FormData ignores unchecked checkboxes, workaround
        form.querySelectorAll('input[type=checkbox]:not(:checked)')
    ).forEach((elm) => { formData[elm.name] = '' });
    let conf = {};
    for (const x in formData) {
        conf[x] = formData[x];
        const varConf = GLOBAL_CONFIG.input[x];
        if (!varConf) continue;
        let optConf = null;
        if ('option' in varConf) optConf = varConf.option[formData[x]];
        else if ('true' in varConf || 'false' in varConf) {
            optConf = (formData[x] === 'on') ? varConf.true : varConf.false;
        }
        if (typeof optConf === 'object') Object.assign(conf, optConf);
        if (typeof optConf === 'string') conf[x] = optConf;
    }
    return conf
}

function renderCode(tmpl) {
    // generate mustache config
    let conf = {
        path: (window.mirrorId.endsWith(".git") ? '/git/' : '/') + window.mirrorId
    }
    Array.from(document.querySelectorAll('form.z-global')).forEach((elm) => {
        Object.assign(conf, generateFormConfig(elm));
    })
    conf.scheme = conf._scheme ? 'https' : 'http';
    conf.host = conf.host.replace(/^https?:\/\//, '');
    conf.sudo = conf._sudo ? 'sudo ' : '';
    if (conf.filter && GLOBAL_CONFIG.filter.scheme) {
        conf.scheme = GLOBAL_CONFIG.filter.scheme;
    }
    // find div.z-wrap
    const div = tmpl.previousElementSibling;
    // find form.z-form
    const form = div.querySelector('form.z-form');
    // find form.z-code
    var code = div.querySelector('pre.z-code');
    if (code === null) {
        code = document.createElement('pre');
        code.classList.add('z-code');
        div.appendChild(code);
    }
    if (form) Object.assign(conf, generateFormConfig(form));
    conf.endpoint = conf.scheme + '://' + conf.host + conf.path;

    // render with mustache
    let rendered = globalThis.Mustache.render(
        tmpl.textContent.trim(), conf, {}, { escape: x => x }
    )
    console.log(rendered);
    try {
        const lang = tmpl.attributes.getNamedItem('z-lang');
        if (lang && hljs.getLanguage(lang.value)) {
            rendered = hljs.highlight(rendered, { language: lang.value }).value;
        }
    } catch (err) {
        console.error(err);
    }
    code.innerHTML = rendered;
}

function renderForm(event) {
    if (!event || event.currentTarget.classList.contains('z-global')) {
        Array.from(document.querySelectorAll('.z-help tmpl')).forEach(renderCode);
    }
    else {
        renderCode(event.currentTarget.parentElement.nextElementSibling);
    }
}

const form_update = renderForm;

// Load project config
const GLOBAL_CONFIG = JSON.parse(atob(document.getElementById('z-config').textContent));

// Adjust <h1> and top <form> postion
const h1 = document.getElementsByTagName('h1')[0];
h1.parentElement.parentElement.insertBefore(h1, h1.parentElement.previousElementSibling);

// Hide HTTPS selector if filtered
if (GLOBAL_CONFIG.filter && GLOBAL_CONFIG.filter.scheme) {
    document.querySelector('input[name="_scheme"]').parentElement.style.display = 'none';
}

// Render code
window.addEventListener('DOMContentLoaded', () => { renderForm(null); });

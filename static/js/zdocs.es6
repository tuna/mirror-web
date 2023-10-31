---
---

function process_form(form) {
    const form_data = Object.fromEntries(new FormData(form).entries())
    Array.from(  // FormData ignores unchecked checkboxes, workaround
        form.querySelectorAll('input[type=checkbox]:not(:checked)')
    ).forEach((elm) => { form_data[elm.name] = '' })
    let vars = {}
    for (const x in form_data) {
        vars[x] = form_data[x]
        const var_conf = config.input[x]
        if (!var_conf) continue
        let opt_conf = null;
        if ('option' in var_conf) opt_conf = var_conf.option[form_data[x]]
        else if ('true' in var_conf || 'false' in var_conf) {
            opt_conf = (form_data[x] === 'on') ? var_conf.true : var_conf.false
        }
        if (typeof opt_conf === 'object') Object.assign(vars, opt_conf)
        if (typeof opt_conf === 'string') vars[x] = opt_conf
    }
    // console.log(vars)
    return vars
}

function update_code(tmpl) {
    let vars = {
        path: (window.mirrorId.endsWith(".git") ? '/git/' : '/') + window.mirrorId
    }
    Array.from(document.querySelectorAll('form.z-global')).forEach((elm) => {
        Object.assign(vars, process_form(elm))
    })
    vars.scheme = vars._scheme ? 'https' : 'http'
    vars.host = vars.host.replace(/^https?:\/\//, '')
    vars.sudo = vars._sudo ? 'sudo ' : ''
    if (config.filter && config.filter.scheme) {
        vars.scheme = config.filter.scheme
    }

    const code = tmpl.previousElementSibling.lastElementChild
    const form = code.previousElementSibling
    if (form) Object.assign(vars, process_form(form))
    vars.endpoint = vars.scheme + '://' + vars.host + vars.path
    let rendered = globalThis.Mustache.render(
        tmpl.textContent.trim(), vars, {}, { escape: x => x }
    )
    try {
        const lang = tmpl.attributes.getNamedItem('z-lang')
        if (lang && hljs.getLanguage(lang.value)) {
            rendered = hljs.highlight(rendered, { language: lang.value }).value
        }
    } catch (err) {
        console.error(err)
    }
    code.innerHTML = rendered
}

function update_form(event) {
    if (!event || event.currentTarget.classList.contains('z-global')) {
        Array.from(document.querySelectorAll('.z-help tmpl')).forEach(update_code)
    }
    else {
        update_code(event.currentTarget.parentElement.nextElementSibling)
    }
}


// Load project config
const config = JSON.parse(atob(document.getElementById('z-config').textContent))

// Adjust <h1> and top <form> postion
const h1 = document.getElementsByTagName('h1')[0]
h1.parentElement.parentElement.insertBefore(h1, h1.parentElement.previousElementSibling)

// Hide HTTPS selector if filtered
if (config.filter && config.filter.scheme) {
    document.querySelector('input[name="_scheme"]').parentElement.style.display = 'none'
}

// Render code
window.addEventListener('DOMContentLoaded', () => { update_form(null) })

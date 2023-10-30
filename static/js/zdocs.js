function process_form(form) {
    let form_data = Object.fromEntries(new FormData(form).entries())
    Array.from(  // FormData ignores unchecked checkboxes, workaround
        form.querySelectorAll('input[type=checkbox]:not(:checked)')
    ).forEach((elm) => { form_data[elm.name] = '' })
    let vars = {}
    for (x in form_data) {
        vars[x] = form_data[x]
        let var_conf = config.input[x]
        if (!var_conf) continue
        let opt_conf = null;
        if ('option' in var_conf) opt_conf = var_conf.option[form_data[x]]
        else if ('true' in var_conf || 'false' in var_conf) {
            opt_conf = (form_data[x] === 'on') ? var_conf.true : var_conf.false
        }
        if (typeof opt_conf === 'object') Object.assign(vars, opt_conf)
        if (typeof opt_conf === 'string') vars[x] = opt_conf
    }
    console.log(vars)
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
    let code = tmpl.previousElementSibling.lastElementChild
    let form = code.previousElementSibling
    if (form) Object.assign(vars, process_form(form))
    vars.endpoint = vars.scheme + '://' + vars.host + vars.path
    rendered = mustache.render(
        tmpl.textContent.trim(), vars, {}, {escape: x => x}
    )
    let lang = tmpl.attributes.getNamedItem('z-lang')  // get z-lang
    lang = hljs.getLanguage(lang ? lang.value : '')    // check support
    lang = lang ? lang.aliases[0] : 'plaintext'        // fallback
    hl = hljs.highlight(rendered, {language: lang})
    code.innerHTML = hl.value
}

function form_update(event) {
    if (!event || event.currentTarget.classList.contains('z-global')) {
        Array.from(document.querySelectorAll('.z-help tmpl')).forEach(update_code)
    }
    else update_code(event.currentTarget.parentElement.nextElementSibling)
}


// Load project config
var config = JSON.parse(atob(document.getElementById('z-config').textContent))

// Adjust <h1> and top <form> postion
let h1 = document.getElementsByTagName('h1')[0]
h1.parentElement.parentElement.insertBefore(h1, h1.parentElement.previousElementSibling)

// Hide HTTPS selector if filtered
if (config.filter && config.filter.scheme) {
    document.querySelector('input[name="_scheme"]').parentElement.style.display = 'none'
}

// Render code
window.addEventListener('DOMContentLoaded', () => {form_update(null)})

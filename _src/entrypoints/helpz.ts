import "./help";
import "../styles/helpz.scss";
import hljs from "../lib/hljs";
import { mirrorId } from "../lib/mirrorid";
import Mustache from "mustache";

function generateFormConfig(form) {
  const formData = Object.fromEntries(new FormData(form).entries());
  Array.from(
    // FormData ignores unchecked checkboxes, workaround
    form.querySelectorAll("input[type=checkbox]:not(:checked)"),
  ).forEach((elm) => {
    formData[elm["name"]] = "";
  });
  let conf = {};
  for (const x in formData) {
    conf[x] = formData[x];
    const varConf = GLOBAL_CONFIG.input[x];
    if (!varConf) continue;
    let optConf = null;
    if ("option" in varConf) optConf = varConf.option[formData[x] as string];
    else if ("true" in varConf || "false" in varConf) {
      optConf = formData[x] === "on" ? varConf.true : varConf.false;
    }
    if (typeof optConf === "object") Object.assign(conf, optConf);
    if (typeof optConf === "string") conf[x] = optConf;
  }
  return conf;
}

function renderCode(tmpl) {
  // generate mustache config
  let conf: Record<string, string> = {
    path: ((mirrorId.endsWith(".git") || GLOBAL_CONFIG.git) ? "/git/" : "/") + mirrorId,
  };
  Array.from(document.querySelectorAll("form.z-global")).forEach((elm) => {
    Object.assign(conf, generateFormConfig(elm));
  });
  conf.scheme = conf._scheme ? "https" : "http";
  conf.host = conf.host.replace(/^https?:\/\//, "");
  conf.sudo = conf._sudo ? "sudo " : "";
  if (conf.filter && GLOBAL_CONFIG.filter.scheme) {
    conf.scheme = GLOBAL_CONFIG.filter.scheme;
  }
  // find div.z-wrap
  const div = tmpl.previousElementSibling;
  // find form.z-form
  const form = div.querySelector("form.z-form");
  // find form.z-code
  var code = div.querySelector("pre.z-code");
  if (code === null) {
    code = document.createElement("pre");
    code.classList.add("z-code");
    div.appendChild(code);
  }
  if (form) Object.assign(conf, generateFormConfig(form));
  conf.endpoint = conf.scheme + "://" + conf.host + conf.path;

  // render with mustache
  let rendered = Mustache.render(
    tmpl.textContent.trim(),
    conf,
    {},
    { escape: (x) => x },
  );
  try {
    const lang = tmpl.attributes.getNamedItem("z-lang");
    if (lang && hljs.getLanguage(lang.value)) {
      rendered = hljs.highlight(rendered, { language: lang.value }).value;
    }
  } catch (err) {
    console.error(err);
  }
  code.innerHTML = rendered;
}

function renderForm(event) {
  if (!event || event.currentTarget.classList.contains("z-global")) {
    Array.from(document.querySelectorAll(".z-help pre.z-tmpl")).forEach(
      renderCode,
    );
  } else {
    renderCode(event.currentTarget.parentElement.nextElementSibling);
  }
}

// Load project config
const GLOBAL_CONFIG: Record<string, any> = JSON.parse(
  atob(document.getElementById("z-config").textContent),
);

// Hide HTTPS selector if filtered
if (GLOBAL_CONFIG.filter && GLOBAL_CONFIG.filter.scheme) {
  document.querySelector('input[name="_scheme"]').parentElement.style.display =
    "none";
}

// Render code
renderForm(null);

const ignoreEventHandler = (event) => event.preventDefault();

for (const form of document.querySelectorAll("form.z-form")) {
  form.addEventListener("submit", ignoreEventHandler);
  if (form.classList.contains("z-global")) {
    form.addEventListener("change", () => renderForm(null));
  } else {
    form.addEventListener("change", renderForm);
  }
}

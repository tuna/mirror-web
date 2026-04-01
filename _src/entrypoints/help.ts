import {
  hide_mirrorz as HideMirrorZ,
  hostname as SiteHostname,
  mirrorz_help_link as MirrorzHelpLink,
} from "virtual:jekyll-config";
import { options as globalOptions } from "virtual:jekyll-data";
import hljs from "../lib/hljs";
import HoganRuntime from "hogan.js/lib/template";
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import { TUNASYNC_JSON_PATH } from "../lib/consts";
import "./default";
import "../styles/help.scss";
import { ZInputOutput } from "../lib/helpz-types";
import { flattenData } from "../lib/helpz-libs.mjs";

document.getElementById("help-select").addEventListener("change", (ev) => {
  let help_url = (ev.target as Element).querySelector("option:checked")
    .attributes["data-help-url"].value;
  window.location.assign(
    `${window.location.protocol}//${window.location.host}${help_url}`,
  );
});

const zhelpTmplsElem = document.getElementById("zhelp-tmpls");
if (!zhelpTmplsElem) {
  throw new Error("zhelp-tmpls element not found");
}

fetch(TUNASYNC_JSON_PATH)
  .then((resp) => resp.json())
  .then((statusData) => {
    // remove help items for disabled/removed mirrors
    let availableMirrorIds = new Set(statusData.map((x) => x.name));
    globalOptions.unlisted_mirrors.forEach((elem) => {
      availableMirrorIds.add(elem.name);
    });
    if (!availableMirrorIds.has(mirrorId)) {
      if (HideMirrorZ) {
        location.href = "/404-help-hidden.html"; // this will break 404 issue submission
      } else {
        location.href = MirrorzHelpLink + mirrorId; // TODO: convert this to mirrorz cname
      }
    }

    Array.from(
      document.querySelectorAll('option[id^="toc-"],li[id^="toc-"]'),
    ).forEach((elem) => {
      if (
        elem.id.startsWith("toc-") &&
        !availableMirrorIds.has(elem.id.slice(4))
      ) {
        elem.remove();
      }
    });
  });

const mirrorId = zhelpTmplsElem["zhelp-name"] as string;
const ztmpls = zhelpTmplsElem["zhelp-tmpls"] as [any];
const tmplData = ztmpls.map((x) => ref({} as Record<string, ZInputOutput>));
const globalData = ref({} as Record<string, ZInputOutput>);
const debugRestore = ref(false);

[...document.querySelectorAll("[data-z-for-code]")].forEach((elem) => {
  const refKey = elem.getAttribute("data-z-for-code");
  const refData = refKey === "-1" ? globalData : tmplData[parseInt(refKey)];
  const changeHandler = () => {
    const keyName = elem.getAttribute("data-z-name");
    let value: ZInputOutput;
    if (elem instanceof HTMLInputElement) {
      if (elem.type === "checkbox") {
        const checked = elem.checked;
        if (checked) {
          if (elem.hasAttribute("data-z-true")) {
            value = elem.getAttribute("data-z-true");
          } else {
            value = true;
          }
        } else {
          if (elem.hasAttribute("data-z-false")) {
            value = elem.getAttribute("data-z-false");
          } else {
            value = false;
          }
        }
      } else if (elem.type === "text") {
        value = elem.value;
      }
    } else if (elem instanceof HTMLSelectElement) {
      const selectedOption = elem.options[elem.selectedIndex];
      value = [selectedOption.value, {}];
      [...selectedOption.attributes].forEach((attr) => {
        if (attr.name.startsWith("data-z-set-")) {
          const attrKey = attr.name.slice("data-z-set-".length);
          value[1][attrKey] = attr.value;
        }
      });
    } else {
      throw new Error("Unsupported element for z-for-code");
    }
    refData.value[keyName] = value;
  };
  changeHandler();
  elem.addEventListener("change", changeHandler);
});

const attachCopyButton = (preElem: Element, getRawCode: () => string) => {
  const copyButton = preElem.querySelector("button.btn-clipboard");
  if (copyButton) {
    copyButton.addEventListener("click", () => {
      navigator.clipboard.writeText(getRawCode()).then(
        () => {
          copyButton.classList.add("copied");
          setTimeout(() => {
            copyButton.classList.remove("copied");
          }, 2000);
        },
        () => {
          document
            .getElementById("help-content")
            .setAttribute("data-cannot-copy", "");
        },
      );
    });
  }
};

[...document.querySelectorAll("[data-z-code]")].forEach((elem) => {
  const codeId = parseInt(elem.getAttribute("data-z-code"));
  const lang = elem.getAttribute("data-z-lang");
  const tmpl = new HoganRuntime.Template(ztmpls[codeId]);
  let codeContainer: Element;
  let rawCode = "";
  if (elem.tagName.toLowerCase() === "pre") {
    codeContainer = elem.querySelector("code");
    attachCopyButton(elem, () => rawCode);
  } else {
    codeContainer = elem;
  }
  const originalContent = codeContainer.innerHTML;
  watchEffect(() => {
    const data = { ...flattenData(globalData.value) };
    const endpoint = new URL(data.urlpath as string);
    endpoint.protocol = (data.scheme + ":") as string;
    data.endpoint = endpoint.toString();
    data.host = endpoint.host;
    data.path = endpoint.pathname;
    Object.entries(flattenData(tmplData[codeId].value)).forEach(([k, v]) => {
      data[k] = v;
    });
    if (debugRestore.value) {
      codeContainer.innerHTML = originalContent;
    } else {
      const renderedConfig = tmpl.render(data);
      rawCode = renderedConfig;
      if (lang && hljs.getLanguage(lang)) {
        codeContainer.innerHTML = hljs.highlight(renderedConfig, {
          language: lang,
        }).value;
      } else if (!lang) {
        codeContainer.innerHTML = hljs.highlightAuto(renderedConfig).value;
      } else {
        codeContainer.textContent = renderedConfig;
      }
    }
  });
});

[...document.querySelectorAll("pre.codeblock:not([data-z-code])")].forEach(
  (elem) => {
    const rawCode = elem.querySelector("code[data-original-code]").textContent;
    attachCopyButton(elem, () => rawCode);
  },
);

document.getElementById("help-content").removeAttribute("data-helpz-not-ready");
if (
  typeof navigator !== "undefined" &&
  navigator.clipboard &&
  navigator.clipboard.writeText &&
  typeof navigator.clipboard.writeText === "function"
) {
  document.getElementById("help-content").removeAttribute("data-cannot-copy");
}

document.getElementById("debug-restore").addEventListener("click", () => {
  debugRestore.value = !debugRestore.value;
});

// vim: ts=2 sts=2 sw=2 noexpandtab
import {
  hide_mirrorz as HideMirrorZ,
  hostname as SiteHostname,
  mirrorz_help_link as MirrorzHelpLink,
} from "virtual:jekyll-config";
import { options as globalOptions } from "virtual:jekyll-data";
import hljs from "../lib/hljs";
import { TUNASYNC_JSON_PATH } from "../lib/consts";
import "./default";
import "../styles/help.scss";

const mirrorId = document.getElementById("zhelp-tmpls")["zhelp-name"] as string;

document.getElementById("help-select").addEventListener("change", (ev) => {
  let help_url = (ev.target as Element).querySelector("option:checked")
    .attributes["data-help-url"].value;
  window.location.assign(
    `${window.location.protocol}//${window.location.host}${help_url}`,
  );
});

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

// vim: ts=2 sts=2 sw=2 noexpandtab

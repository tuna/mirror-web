import "./default";
import "../styles/fancyIndex.scss";

import NowBrowsingMirror from "../components/NowBrowsingMirror.vue";
import { createApp } from "vue";

document.getElementById("list").setAttribute("class", "table");
Array.from(document.querySelectorAll("#list tbody tr td:nth-child(3)")).forEach(
  (el) => {
    const d = new Date(el["innerText"]);
    if (!isNaN(d.getTime())) {
      const date_str =
        ("000" + d.getFullYear()).substr(-4) +
        "-" +
        ("0" + (d.getMonth() + 1)).substr(-2) +
        "-" +
        ("0" + d.getDate()).substr(-2) +
        (" " +
          ("0" + d.getHours()).substr(-2) +
          ":" +
          ("0" + d.getMinutes()).substr(-2));
      el["innerText"] = date_str;
    }
  },
);

createApp(NowBrowsingMirror).mount("#now-browsing-mirror");

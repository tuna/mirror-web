<script setup>
import { ref, onUpdated, computed, onMounted, nextTick } from "vue";
import { TUNASYNC_JSON_PATH } from "../lib/consts";
import { options as globalOptions } from "virtual:jekyll-data";
import HelpPages from "virtual:tuna-help-pages";
import { format as TimeAgoFormat } from "timeago.js";
import BootStrapPopover from "bootstrap/js/dist/popover";
import SearchBox from "./SearchBox.vue";

const label_map = globalOptions.label_map;
const new_mirrors = Object.fromEntries(
  globalOptions.new_mirrors.map((x) => [x, true]),
);
const unlisted = globalOptions.unlisted_mirrors;
const options = Object.fromEntries(
  globalOptions.force_redirect_help_mirrors.map((m) => [
    m,
    { url: "/help/" + m + "/" },
  ]),
);
const descriptions = Object.fromEntries(
  globalOptions.mirror_desc.map((m) => [m.name, m.desc]),
);

const stringifyTime = (ts) => {
  const date = new Date(ts * 1000);
  let str = "";
  let ago = "";
  if (date.getFullYear() > 2000) {
    str =
      `${("000" + date.getFullYear()).slice(-4)}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}` +
      ` ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;
    ago = TimeAgoFormat(date);
  } else {
    str = "0000-00-00 00:00";
    ago = "Never";
  }
  return [str, ago];
};

const dateTooltip = localStorage.getItem("DateTooltip") !== "false";

const mirrorList = ref([]);
const filter = ref("");
const rawMirrorList = ref([]);

const getURL = (mir) => {
  if (mir.url !== undefined) {
    return mir.url;
  }
  return `/${mir.name}/`;
};

var refreshTimer = null;

const filteredMirrorList = computed(() => {
  var filterText = filter.value.toLowerCase();
  return mirrorList.value.filter((m) => {
    return m.is_master && m.name.toLowerCase().indexOf(filterText) !== -1;
  });
});

const refreshMirrorList = () => {
  if (document.hidden === true) {
    return;
  }
  fetch(TUNASYNC_JSON_PATH)
    .then((res) => res.json())
    .then((status_data) => {
      const unlisted_mir = unlisted.map((d) => processMirrorItem(d));
      status_data = status_data.map((d) => processMirrorItem(d));
      let mir_data = unlisted_mir.concat(status_data);
      mir_data = processLinkItem(mir_data);
      status_data = sortAndUniqMirrors(status_data);
      mir_data = sortAndUniqMirrors(mir_data).filter(
        (d) => !(d.status == "disabled"),
      );
      mirrorList.value = mir_data;
      rawMirrorList.value = status_data;
    })
    .finally(() => {
      refreshTimer = setTimeout(refreshMirrorList, 10000);
    });
};

nextTick(() => refreshMirrorList());

onMounted(() => {
  window.addEventListener("visibilitychange", () => {
    if (refreshTimer) {
      clearTimeout(refreshTimer);
      refreshTimer = null;
    }
    if (document.visibilityState === "visible") {
      refreshMirrorList();
    }
  });
});

onUpdated(() => {
  Array.from(document.getElementsByClassName("mirror-item-label")).map((el) => {
    new BootStrapPopover(el);
  });
});

const sortAndUniqMirrors = (mirs) => {
  mirs.sort((a, b) => {
    return a.name < b.name ? -1 : 1;
  });
  return mirs.reduce((acc, cur) => {
    if (acc.length > 1 && acc[acc.length - 1].name == cur.name) {
      if (acc[acc.length - 1].last_update_ts && cur.last_update_ts) {
        if (acc[acc.length - 1].last_update_ts < cur.last_update_ts) {
          acc[acc.length - 1] = cur;
        }
      } else if (cur.last_update_ts) {
        acc[acc.length - 1] = cur;
      }
    } else {
      acc.push(cur);
    }
    return acc;
  }, []);
};

const processLinkItem = (mirrors) => {
  var processed = [];
  for (let d of mirrors) {
    if (d.link_to === undefined) {
      processed.push(d);
      continue;
    }
    for (const target of mirrors) {
      if (d.link_to === target.name) {
        d.status = target.status;
        d.label = target.label;
        d.upstream = target.upstream;
        d.show_status = target.show_status;
        d.last_update = target.last_update;
        d.last_update_ago = target.last_update_ago;
        d.last_ended = target.last_ended;
        d.last_ended_ago = target.last_ended_ago;
        d.last_schedule = target.last_schedule;
        d.last_schedule_ago = target.last_schedule_ago;
        processed.push(d);
        break;
      }
    }
  }
  return processed;
};

const processMirrorItem = (d) => {
  if (options[d.name] != undefined) {
    for (const key of Object.keys(d)) {
      if (options[d.name].hasOwnProperty(key)) {
        d[key] = options[d.name][key];
      }
    }
  }
  d.help_url = HelpPages[d.name];
  d.is_new = Boolean(new_mirrors[d.name]);
  d.description = descriptions[d.name];
  d.github_release = d.url && d.url.startsWith("/github-release/");
  if (d.is_master === undefined) {
    d.is_master = true;
  }
  if (d.link_to !== undefined) {
    return d;
  }
  d.label = label_map[d.status];
  d.show_status = d.status != "success";
  // Strip the second component of last_update
  [d.last_update, d.last_update_ago] = stringifyTime(d.last_update_ts);
  [d.last_ended, d.last_ended_ago] = stringifyTime(d.last_ended_ts);
  [d.last_started, d.last_started_ago] = stringifyTime(d.last_started_ts);
  [d.next_schedule, d.next_schedule_ago] = stringifyTime(d.next_schedule_ts);
  return d;
};
</script>
<template src="./main-mirror-list.html" lang="liquid"></template>

<style lang="scss" scoped>
@use "../styles/3-wave.scss" as wave;

a.mirror-item-label::after {
  content: " ";
}

tbody {
  td {
    padding: 4px 8px;
    border-style: none;
  }
  font-size: 12pt;
  .badge.badge-new {
    padding: 0.1em 0.2em;
    vertical-align: 40%;
    text-shadow: 1px 1px #888;
    margin-right: 4px;
    background-color: #3aa0e6;
  }
  .badge.badge-status {
    vertical-align: 20%;
    margin-left: 0.5em;
  }
}
#mirror-title {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

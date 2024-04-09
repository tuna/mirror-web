<script setup>
import { ref, computed } from "vue";
import { options as globalOptions } from "virtual:jekyll-data";
import HelpPages from "virtual:tuna-help-pages";
import BootStrapPopover from "bootstrap/js/dist/popover";
import SearchBox from "./SearchBox.vue";
import { useMirrorList } from "../lib/mirrorList";

const new_mirrors = Object.fromEntries(
  globalOptions.new_mirrors.map((x) => [x, true]),
);
const unlisted = globalOptions.unlisted_mirrors;
const forceHelp = Object.fromEntries(
  globalOptions.force_redirect_help_mirrors.map((m) => [m, true]),
);
const descriptions = Object.fromEntries(
  globalOptions.mirror_desc.map((m) => [m.name, m.desc]),
);

const rawMirrorList = useMirrorList(unlisted);

const mirrorList = computed(() => {
  return rawMirrorList.value
    .filter((d) => !(d.status == "disabled"))
    .map((d) => ({
      ...d,
      url: forceHelp[d.name] ? HelpPages[d.name] : d.url,
      help_url: HelpPages[d.name],
      is_new: Boolean(new_mirrors[d.name]),
      description: descriptions[d.name],
      github_release: d.url && d.url.startsWith("/github-release/"),
    }));
});
const filter = ref("");

const getURL = (mir) => {
  if (mir.url !== undefined) {
    return mir.url;
  }
  return `/${mir.name}/`;
};

const filteredMirrorList = computed(() => {
  var filterText = filter.value.toLowerCase();
  return mirrorList.value.filter((m) => {
    return m.is_master && m.name.toLowerCase().indexOf(filterText) !== -1;
  });
});

const vWithPopover = {
  mounted: (el) => {
    BootStrapPopover.getOrCreateInstance(el);
  },
  beforeUnmount: (el) => {
    BootStrapPopover.getInstance(el)?.dispose();
  },
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

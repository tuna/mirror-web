<script setup>
import { ref, computed } from "vue";
import { options as globalOptions } from "virtual:jekyll-data";
import HelpPages from "virtual:tuna-help-pages";
import BootStrapPopover from "bootstrap/js/dist/popover";
import SearchBox from "./SearchBox.vue";
import UpdateField from "./UpdateField.vue";
import { useMirrorList } from "../lib/mirrorList";
import processingHandlers from "../lib/mirrorListDataProcessing";

const { unlistedMirrors: unlisted, genMainMirrorList } =
  processingHandlers(globalOptions);

const rawMirrorList = useMirrorList(unlisted);

const mirrorList = computed(() => {
  return genMainMirrorList(rawMirrorList.value, HelpPages);
});
const filter = ref("");

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
<template lang="liquid">
  {% include main-mirror-list.html %}
</template>

<style lang="scss" scoped>
@use "../styles/3-wave.scss" as wave;
@use "../styles/sync-status.scss";
@use "../styles/badge-new.scss";

a.mirror-item-label::after {
  content: " ";
}

tbody {
  td {
    padding: 4px 8px;
    border-style: none;
  }
  font-size: 12pt;
}
#mirror-title {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

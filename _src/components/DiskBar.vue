<script setup>
import { DISKINFO_JSON_PATH } from "../lib/consts";
import { ref, onMounted, nextTick } from "vue";

const diskUsages = ref([]);

const readableFileSize = (size) => {
  var units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  var i = 0;
  while (size >= 1024) {
    size /= 1024;
    ++i;
  }
  return size.toFixed(1) + " " + units[i];
};

onMounted(async () => {
  const res = await fetch(DISKINFO_JSON_PATH);
  const d = await res.json();
  if (!Array.isArray(d)) {
    d = [d];
  }
  diskUsages.value = d.map((disk) => {
    const percentage = Math.round((disk.used_kb * 100) / disk.total_kb);
    return {
      desc: disk.desc,
      used: readableFileSize(disk.used_kb * 1024),
      total: readableFileSize(disk.total_kb * 1024),
      percentage: import.meta.env.LEGACY ? percentage : 0,
      _percentage: percentage,
    };
  });
  if (!import.meta.env.LEGACY) {
    await nextTick();
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 0),
    );
    diskUsages.value.forEach((disk) => {
      disk.percentage = disk._percentage;
    });
  }
});
</script>
<template>
  <div class="col-12" v-if="diskUsages.length"><strong>磁盘占用</strong>:</div>
  <template v-for="disk in diskUsages">
    <div class="col-1" v-if="disk.desc">{{ disk.desc }}</div>
    <div :class="['col-' + (disk.desc ? '11' : '12')]">
      <div
        class="progress mb-3"
        role="progressbar"
        :aria-valuenow="disk.percentage"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div class="progress-bar" :style="{ width: disk.percentage + '%' }">
          <strong>{{ disk.used }} / {{ disk.total }}</strong>
        </div>
      </div>
    </div>
  </template>
</template>

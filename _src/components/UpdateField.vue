<script setup>
import { defineProps } from "vue";

const props = defineProps(["mir"]);
</script>
<template>
  {{ mir.last_update }}
  <span
    v-if="mir.show_status"
    :class="['badge', 'badge-status', mir.label, 'd-none', 'd-md-inline-block']"
  >
    {{ mir.status }}
  </span>
</template>
<style lang="scss" scoped>
@use "../styles/badge-status.scss";
</style>

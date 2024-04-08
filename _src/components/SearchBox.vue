<script setup>
import { defineModel } from "vue";
const model = defineModel({type: String, default: ""});
</script>
<template>
    <input type="search" v-model="model" placeholder="按 / 搜索" autocomplete="off" class="ms-auto d-inline-flex align-self-center">
</template>

<style scoped>
input[type="search"] {
  line-height: 18px;
  padding: 8px;
  border: 1px solid #e3e3e3;
  max-width: 240px;
  height: 30px;
  font-size: 16px;
  background: transparent;
}
</style>

<script setup>
import { ref, defineEmits, computed, onMounted, nextTick } from "vue";
import { ISOINFO_JSON_PATH } from "../lib/consts";

const distroList = ref([]);
const selected = ref({});
const curCategory = ref("");
const availableCategories = ref([]);
const knownCategories = {
  os: "操作系统",
  app: "应用软件",
  font: "字体",
};

const emit = defineEmits(["ready"]);

fetch(ISOINFO_JSON_PATH)
  .then((res) => res.json())
  .then((isoinfo) => {
    distroList.value = isoinfo;
    availableCategories.value = [...new Set(isoinfo.map((x) => x.category))];
    curCategory.value = availableCategories.value[0];
    selected.value = curDistroList.value[0];
  });

onMounted(async () => {
  await nextTick();
  emit("ready");
});

const curDistroList = computed(() => {
  return distroList.value
    .filter((x) => x.category === curCategory.value)
    .sort(function (a, b) {
      return a.distro.localeCompare(b.distro);
    });
});

const switchDistro = (distro) => {
  selected.value = distro;
};

const switchCategory = (category) => {
  curCategory.value = category;
  selected.value = curDistroList.value[0];
};
</script>

<template>
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button
          type="button"
          data-bs-dismiss="modal"
          aria-label="Close"
          class="close d-none d-bs3-block"
        >
          <span aria-hidden="true">×</span>
        </button>
        <h4 class="modal-title" id="isoModalLabel">获取安装镜像</h4>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <div class="row" v-if="availableCategories.length > 0">
          <div class="col-lg-12">
            <ul class="nav nav-tabs">
              <li
                class="nav-item"
                role="presentation"
                v-for="cat in availableCategories"
              >
                <a
                  :class="[curCategory === cat ? 'active' : '', 'nav-link']"
                  @click="switchCategory(cat)"
                  href="#"
                  >{{ knownCategories[cat] ? knownCategories[cat] : cat }}</a
                >
              </li>
            </ul>
          </div>
          <div class="col-lg-3">
            <ul class="nav nav-pills flex-column">
              <li class="nav-item" v-for="distro in curDistroList">
                <a
                  href="#"
                  @click="switchDistro(distro)"
                  :class="[
                    selected.distro == distro.distro ? 'active' : '',
                    'nav-link',
                  ]"
                  >{{ distro.distro }}</a
                >
              </li>
            </ul>
          </div>
          <div class="col-lg-9">
            <h3>{{ selected.distro }}</h3>
            <ul>
              <template v-for="url in selected.urls">
                <li>
                  <a :href="url.url">{{ url.name }}</a>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nav-tabs {
  margin-bottom: 0.5em;
}
</style>

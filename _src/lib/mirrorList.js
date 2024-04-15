import { TUNASYNC_JSON_PATH } from "../lib/consts";
import { options as globalOptions } from "virtual:jekyll-data";
import { ref, onMounted, nextTick } from "vue";
import processingHandlers from "../lib/mirrorListDataProcessing";

const { postProcessStatusData } = processingHandlers(globalOptions);

export const useMirrorList = (additional = []) => {
  const mirrorList = ref([]);
  let refreshTimer = null;

  const refreshMirrorList = async () => {
    if (document.hidden === true) {
      return;
    }
    try {
      const res = await fetch(TUNASYNC_JSON_PATH);
      const status_data = await res.json();
      mirrorList.value = postProcessStatusData(status_data, additional);
    } catch (e) {
      throw e;
    } finally {
      refreshTimer = setTimeout(refreshMirrorList, 10000);
    }
  };

  nextTick().then(() => refreshMirrorList());

  onMounted(() => {
    window.addEventListener("visibilitychange", () => {
      if (refreshTimer) {
        clearTimeout(refreshTimer);
        refreshTimer = null;
      }
      if (document.visibilityState === "visible") {
        refreshMirrorList().then();
      }
    });
  });

  return mirrorList;
};

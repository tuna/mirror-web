import Empty from "../components/Empty.vue";
import IsoModal from "../components/IsoModal.vue";
import MainMirrorList from "../components/MainMirrorList.vue";

import Modal from "bootstrap/js/dist/modal";
import { createApp } from "vue";
import "./default";
import "../styles/main-page.scss";

const empty = createApp(Empty);
empty.mount("#upgrade-mask");

const isoModalEl = document.getElementById("isoModal");

createApp(IsoModal, {
  onReady: async function () {
    if (window.location.hash === "#iso-download") {
      new Modal(isoModalEl).show();
    }
  },
}).mount(isoModalEl);

createApp(MainMirrorList).mount("#mirror-list");

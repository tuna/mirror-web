import "./default";

import DiskBar from "../components/DiskBar.vue";
import StatusMirrorList from "../components/StatusMirrorList.vue";
import { createApp } from "vue";

createApp(DiskBar).mount("#disk-usage");
createApp(StatusMirrorList).mount("#mirror-list");

import "./default";
import "../styles/status.scss";

import DiskBar from "../components/DiskBar.vue";
import { createApp } from "vue";

createApp(DiskBar).mount("#disk-usage");

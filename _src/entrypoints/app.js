import Empty from '../components/Empty.vue'
import IsoModal from '../components/IsoModal.vue'
import { createApp } from 'vue';

const empty = createApp(Empty);
empty.mount("#upgrade-mask");

const isoModalEl = document.getElementById('isoModal');

createApp(IsoModal, {
	onReady: async function() {
		if (window.location.hash.match(/#iso-download(\?.*)?/)) {
    	new bootstrap.Modal(isoModalEl).show();
  	}
	},
}).mount(isoModalEl);

import { TUNASYNC_JSON_PATH } from "../lib/consts";
import { options as globalOptions } from "virtual:jekyll-data";
import { ref, onMounted, nextTick } from "vue";
import { format as TimeAgoFormat } from "timeago.js";

const label_map = globalOptions.label_map;

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
			const processed = status_data
				.concat(additional)
				.map((d) => processMirrorItem(d));
			mirrorList.value = sortAndUniqMirrors(processLinkItem(processed));
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

const processLinkItem = (mirrors) => {
	var processed = [];
	for (let d of mirrors) {
		if (d.link_to === undefined) {
			processed.push(d);
			continue;
		}
		for (const target of mirrors) {
			if (d.link_to === target.name) {
				d.status = target.status;
				d.label = target.label;
				d.upstream = target.upstream;
				d.show_status = target.show_status;
				d.last_update = target.last_update;
				d.last_update_ago = target.last_update_ago;
				d.last_ended = target.last_ended;
				d.last_ended_ago = target.last_ended_ago;
				d.last_schedule = target.last_schedule;
				d.last_schedule_ago = target.last_schedule_ago;
				processed.push(d);
				break;
			}
		}
	}
	return processed;
};

const stringifyTime = (ts) => {
	const date = new Date(ts * 1000);
	let str = "";
	let ago = "";
	if (date.getFullYear() > 2000) {
		str =
			`${("000" + date.getFullYear()).slice(-4)}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}` +
			` ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;
		ago = TimeAgoFormat(date);
	} else {
		str = "0000-00-00 00:00";
		ago = "Never";
	}
	return [str, ago];
};

const processMirrorItem = (d) => {
	if (d.is_master === undefined) {
		d.is_master = true;
	}
	if (d.link_to !== undefined) {
		return d;
	}
	d.label = label_map[d.status];
	d.show_status = d.status != "success";
	// Strip the second component of last_update
	[d.last_update, d.last_update_ago] = stringifyTime(d.last_update_ts);
	[d.last_ended, d.last_ended_ago] = stringifyTime(d.last_ended_ts);
	[d.last_started, d.last_started_ago] = stringifyTime(d.last_started_ts);
	[d.next_schedule, d.next_schedule_ago] = stringifyTime(d.next_schedule_ts);
	return d;
};

const sortAndUniqMirrors = (mirs) => {
	mirs.sort((a, b) => {
		return a.name < b.name ? -1 : 1;
	});
	return mirs.reduce((acc, cur) => {
		if (acc.length > 1 && acc[acc.length - 1].name == cur.name) {
			if (acc[acc.length - 1].last_update_ts && cur.last_update_ts) {
				if (acc[acc.length - 1].last_update_ts < cur.last_update_ts) {
					acc[acc.length - 1] = cur;
				}
			} else if (cur.last_update_ts) {
				acc[acc.length - 1] = cur;
			}
		} else {
			acc.push(cur);
		}
		return acc;
	}, []);
};

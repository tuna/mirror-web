---
---
$(document).ready(() => {
	var mir_tmpl = $("#template").text();
	function readableFileSize(size) {
		var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		var i = 0;
		while(size >= 1024) {
		    size /= 1024;
		    ++i;
		}
		return size.toFixed(1) + ' ' + units[i];
	}
	$.get("/static/status/disk.json", (d) => {
		var used_percent = Math.round(d.used_kb * 100 / d.total_kb);
		$('#disk-usage-bar')
			.attr("aria-valuenow", used_percent)
			.css("width", used_percent + "%")
			.html("<strong>" + readableFileSize(d.used_kb * 1024) + " / " + readableFileSize(d.total_kb * 1024) + "</strong>");
	});

	window.refreshMirrorList = () => {
		$.getJSON("/static/tunasync.json", (status_data) => {
			var mirrors=[], mir_data=status_data;

			mir_data.sort((a, b) => { return a.name < b.name ? -1: 1 });

			for(var k in mir_data) {
				var d = mir_data[k];
				if (d.is_master === undefined) {
					d.is_master = true;
				}
				// Strip the second component of last_update
				if (d.last_update_ts) {
					let date = new Date(d.last_update_ts * 1000);
					if (date.getFullYear() > 2000) {
						d.last_update = `${('000'+date.getFullYear()).substr(-4)}-${('0'+(date.getMonth()+1)).substr(-2)}-${('0'+date.getDate()).substr(-2)}` +
							` ${('0'+date.getHours()).substr(-2)}:${('0'+date.getMinutes()).substr(-2)}`;
					} else {
						d.last_update = "0000-00-00 00:00";
					}
				} else {
					d.last_update = d.last_update.replace(/(\d\d:\d\d):\d\d(\s\+\d\d\d\d)?/, '$1');
				}
				mirrors.push(d);
			}
			var result = Mark.up(mir_tmpl, {mirrors: mirrors});
			$('#mirror-list').html(result);
		});
		setTimeout(refreshMirrorList, 10000);
	};
	refreshMirrorList();
});

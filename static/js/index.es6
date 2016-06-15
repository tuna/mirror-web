---
---
$(document).ready(() => {
var mir_tmpl = $("#template").text(),
	label_map = {
		'unknown': 'label-default',
		'syncing': 'label-info',
		'success': 'label-success',
		'fail': 'label-warning',
		'failed': 'label-warning',
	}, 
	help_url = {
		{% for h in site.categories['help'] %}"{{h.mirrorid}}": "{{h.url}}"{% if forloop.index < forloop.length %},{% endif %}{% endfor %}
	},
	new_mirrors = {
		{% for n in site.new_mirrors %}"{{n}}": true{% if forloop.index < forloop.length %},{% endif %}{% endfor %}
	},
	unlisted = [
	{
		'status': 'success',
		'last_update': "-",
		'name': 'npm',
		'upstream': 'https://registry.npmjs.org/'
	},
	{
		'status': 'success',
		'last_update': '-',
		'name': "AUR",
		'url': 'https://aur.tuna.tsinghua.edu.cn/',
		'upstream': 'https://aur.archlinux.org/'
	}
	],
	options = {
		'AOSP': {
			'url': "/help/AOSP/",
		}
	};

window.refreshMirrorList = () => {
	$.getJSON("/static/tunasync.json", (status_data) => {
		var mirrors = [], mir_data = $.merge(status_data, unlisted);
		
		mir_data.sort((a, b) => { return a.name < b.name ? -1: 1 });

		for(var k in mir_data) {
			var d = mir_data[k];
			if (d.status == "disabled") {
				continue;	
			}
			if (options[d.name] != undefined ) {
				d = $.extend(d, options[d.name]);
			}
			d.label = label_map[d.status];
			d.help_url = help_url[d.name];
			d.is_new = new_mirrors[d.name];
			d.show_status = (d.status != "success");
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
}
refreshMirrorList();

$.getJSON("/static/tunet.json", (to_alert) => {
	if (to_alert) {
		$('#thu-alert').removeClass('hidden');
	};
});

});

// vim: ts=2 sts=2 sw=2 noexpandtab

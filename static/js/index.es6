---
---
$(document).ready(() => {
var lei3Po8h = ["support", ["tuna", "tsinghua", "edu", "cn"].join(".")].join("@");
$('a#eib1gieB')
	.text(lei3Po8h)
	.attr('href', atob('bWFpbHRvOgo=') + lei3Po8h);

$('.selectpicker').selectpicker()

var mir_tmpl = $("#template").text(),
	label_map = {
		'unknown': 'label-default',
		'syncing': 'label-info',
		'success': 'label-success',
		'fail': 'label-warning',
		'failed': 'label-warning',
		'paused': 'label-warning',
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
		'last_update': '-',
		'name': "AUR",
		'url': 'https://aur.tuna.tsinghua.edu.cn/',
		'upstream': 'https://aur.archlinux.org/'
	}
	],
	options = {
		'AOSP': {
			'url': "/help/AOSP/"
		},
		'homebrew': {
			'url': "/help/homebrew/"
		},
		'linux.git': {
			'url': "/help/linux.git/"
		},
		'linux-stable.git': {
			'url': "/help/linux-stable.git/"
		},
		'git-repo': {
			'url': "/help/git-repo/"
		},
		'chromiumos': {
			'url': "/help/chromiumos/"
		},
	},
	descriptions = {
		{% for mir in site.data.mirror_desc %} '{{mir.name}}': '{{mir.desc}}' {% if forloop.index < forloop.length %},{% endif %}{% endfor %}
	}

var vmMirList = new Vue({
	el: "#mirror-list",
	data: {
		test: "hello",
		mirrorList: []
	},
	created () {
		this.refreshMirrorList();
	},
	updated () {
		$('.mirror-item-label').popover();
	},
	methods: {
		getURL (mir) {
			if (mir.url !== undefined) {
				return mir.url
			}
			return `/${mir.name}/`
		},
		refreshMirrorList () {
			var self = this;
			$.getJSON("/static/tunasync.json", (status_data) => {
				var mirrors = [], mir_data = $.merge(status_data, unlisted);
				var mir_uniq = {}; // for deduplication

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
					d.description = descriptions[d.name];
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
					if (d.name in mir_uniq) {
						let other = mir_uniq[d.name];
						if (other.last_update > d.last_update) {
							continue;
						}
					}
					mir_uniq[d.name] = d;
				}
				for (k in mir_uniq) {
					mirrors.push(mir_uniq[k]);
				}
				self.mirrorList = mirrors;
				setTimeout(() => {self.refreshMirrorList()}, 10000);
			});
		}
	}
})


var vmIso = new Vue({
	el: "#isoModal",
	data: {
		distroList: [],
		selected: {},
		curCategory: "os"
	},
	created: function () {
		var self = this;
		$.getJSON("/static/isoinfo.json", function (isoinfo) {
			self.distroList = isoinfo;
			self.selected = self.curDistroList[0];
			if (window.location.hash.match(/#iso-download(\?.*)?/)) {
				$('#isoModal').modal();
			}
		});
	},
	computed: {
		curDistroList () {
			return this.distroList
				.filter((x)=> x.category === this.curCategory);
		}
	},
	methods: {
		switchDistro (distro) {
			this.selected = distro;
		},
		switchCategory (category) {
			this.curCategory = category;
			this.selected = this.curDistroList[0];
		}
	}
});

});

// vim: ts=2 sts=2 sw=2 noexpandtab

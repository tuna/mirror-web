---
---
$(document).ready(() => {
var lei3Po8h = ["support", ["tuna", "tsinghua", "edu", "cn"].join(".")].join("@");
$('a#eib1gieB')
	.text(lei3Po8h)
	.attr('href', ["ma","lto:"].join("i") + lei3Po8h);

$('.selectpicker').selectpicker()

var global_options = {% include options.json %};
var label_map = global_options.options.label_map;
var help_url = {};
global_options.helps.forEach((h) => help_url[h.mirrorid] = h.url);
var new_mirrors = {};
global_options.options.new_mirrors.forEach((m) => new_mirrors[m] = true);
var unlisted = global_options.options.unlisted_mirrors;
var options = {};
global_options.options.force_help_mirrors.forEach((m) => options[m] = {'url': "/help/" + m + "/"})
var descriptions = {};
global_options.options.mirror_desc.forEach((m) => descriptions[m.name] = m.desc);

new Vue({
	el: "#upgrade-mask",
});

var vmMirList = new Vue({
	el: "#mirror-list",
	data: {
		test: "hello",
		mirrorList: [],
		filter: "",
		rawMirrorList: [],
		dateTooltip: localStorage.getItem('DateTooltip') !== 'false',
	},
	created () {
		this.refreshMirrorList();
	},
	updated () {
		$('.mirror-item-label').popover();
	},
	computed: {
		nowBrowsingMirror: function(){
			var mirrorName = location.pathname.split('/')[1];
			if(!mirrorName){
				return false;
			}
			mirrorName = mirrorName.toLowerCase();
			var result = this.mirrorList.filter(function(m){
				return m.name.toLowerCase() === mirrorName;
			})[0];
			if(!result){
				return false;
			}
			return result;
		},
		filteredMirrorList: function() {
			var filter = this.filter.toLowerCase();
			return this.mirrorList.filter(function(m){
				return m.is_master && m.name.toLowerCase().indexOf(filter) !== -1;
			});
		},
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
				var unlisted_mir = unlisted.map(d => processMirrorItem(d))
				status_data = status_data.map(d => processMirrorItem(d));
				var mir_data = $.merge(unlisted_mir, status_data);
				status_data = sortAndUniqMirrors(status_data);
				mir_data = sortAndUniqMirrors(mir_data).filter(d => !(d.status == "disabled"));
				self.mirrorList = mir_data;
				self.rawMirrorList = status_data;
				setTimeout(() => {self.refreshMirrorList()}, 10000);
			});
		}
	}
})

var stringifyTime = function(ts){
	var date = new Date(ts * 1000);
	var str = "";
	var ago = "";
	if (date.getFullYear() > 2000) {
		str = `${('000'+date.getFullYear()).substr(-4)}-${('0'+(date.getMonth()+1)).substr(-2)}-${('0'+date.getDate()).substr(-2)}` +
			` ${('0'+date.getHours()).substr(-2)}:${('0'+date.getMinutes()).substr(-2)}`;
		ago = timeago.format(date);
	} else {
		str = "0000-00-00 00:00";
		ago = "Never";
	}
	return [str, ago];
}

var sortAndUniqMirrors = function(mirs){
	mirs.sort((a, b) => { return a.name < b.name ? -1: 1 });
	return mirs.reduce((acc, cur)=>{
		if(acc.length > 1 && acc[acc.length - 1].name == cur.name){
			if(acc[acc.length - 1].last_update_ts && cur.last_update_ts){
				if(acc[acc.length - 1].last_update_ts < cur.last_update_ts){
					acc[acc.length - 1] = cur;
				}
			} else if(cur.last_update_ts){
				acc[acc.length - 1] = cur;
			}
		}else{
			acc.push(cur);
		}
		return acc;
	}, []);
}

var processMirrorItem = function(d){
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
	[d.last_update, d.last_update_ago] = stringifyTime(d.last_update_ts);
	[d.last_ended, d.last_ended_ago] = stringifyTime(d.last_ended_ts);
	[d.next_schedule, d.next_schedule_ago] = stringifyTime(d.next_schedule_ts);
	return d;
}

var vmIso = new Vue({
	el: "#isoModal",
	data: {
		distroList: [],
		selected: {},
		curCategory: "os"
	},
	created: function () {
		var self = this;
		$.getJSON("/static/status/isoinfo.json", function (isoinfo) {
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
				.filter((x)=> x.category === this.curCategory)
				.sort(function (a, b) {
					return a.distro.localeCompare(b.distro);
				});
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

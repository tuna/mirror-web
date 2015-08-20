$(document).ready(() => {

var mir_tmpl = $("#template").text(),
	label_map = {
		'unknown': 'label-default',
		'syncing': 'label-info',
		'success': 'label-success',
		'fail': 'label-warning'
	}, 
	help_page = {
		'AOSP': '/wiki/aosp.md',
		'archlinuxcn': '/wiki/archlinuxcn.md',
		'homebrew': '/wiki/homebrew.md',
		'linux.git': '/wiki/linux.md',
		'nodesource': '/wiki/nodesource.md',
		'pypi': "wiki/pypi.md",
		'docker': "wiki/docker.md",
		'raspbian': 'wiki/raspbian.md',
		'repo-ck': 'wiki/repo-ck.md',
		'rpmfusion': 'wiki/rpmfusion.md',
		'ubuntu': 'wiki/ubuntu.md',
		'lxc-images': 'wiki/lxc-images.md',
		'hackage': 'wiki/hackage.md'
	},
	new_mirrors = {
			'OpenBSD': true,
			'hackage': true
	},
	unlisted = [
	{
		'status': 'success',
		'last_update': "-",
		'name': 'npm',
		'upstream': 'https://registry.npmjs.org/'
	} 
	];

window.refreshMirrorList = () => {
	$.getJSON("/static/tunasync.json", (status_data) => {
		var mirrors = [], mir_data = $.merge(status_data, unlisted);
		
		mir_data.sort((a, b) => { return a.name < b.name ? -1: 1 });

		for(var k in mir_data) {
			var d = mir_data[k];
			d['label'] = label_map[d['status']];
			d['help'] = help_page[d['name']];
			d['is_new'] = new_mirrors[d['name']];
			// Strip the second component of last_update
			d['last_update'] = d['last_update'].replace(/(\d\d:\d\d):\d\d/, '$1');
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

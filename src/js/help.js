$(document).ready(() => {
	var M = (url) => {
		return () => {
			$('#spinner').removeClass('hidden');
			$('#help-content').text("");
			$.get(url, function(data) {
				var rendered = "";
				if (url.match(/\.md$/)) {
					rendered = marked(data);
				}
				$("#help-content")
					.html(rendered)
					.find('table')
					.addClass("table table-bordered table-striped");
				$('#spinner').addClass('hidden');
			});
		};
	};

	var AptHelp = (url) => {
		return () => {
			$('#spinner').removeClass('hidden');
			$('#help-content').text("");
			var apt_template;
			var update_apt_file = () => {
				var release_name = $("#release-select option:selected").attr('data-release');
				var apt_content = Mark.up(
						apt_template, {release_name: release_name}
				);
				$("#apt-content").html(apt_content);
			};
			$.get(url, function(data) {
				var rendered = "";
				if (url.match(/\.md$/)) {
					rendered = marked(data);
				}
				$("#help-content")
					.html(rendered)
					.find('table')
					.addClass("table table-bordered table-striped");
				$('#spinner').addClass('hidden');
				apt_template = $.trim($("#apt-template").text());
				update_apt_file();
				$("#release-select").on('change', update_apt_file);
			});
		};
	};

	var nav_tmpl = $('#help-nav-template').text(), 
		help = {
			'AOSP': M('/help/aosp.md'),
			'archlinuxcn': M('/help/archlinuxcn.md'),
			'homebrew': M('/help/homebrew.md'),
			'linux.git': M('/help/linux.md'),
			'nodesource': M('/help/nodesource.md'),
			'pypi': M("/help/pypi.md"),
			'docker': M("/help/docker.md"),
			'raspbian': AptHelp('/help/raspbian.md'),
			'repo-ck': M('/help/repo-ck.md'),
			'rpmfusion': M('/help/rpmfusion.md'),
			'ubuntu': AptHelp('/help/ubuntu.md'),
			'lxc-images': M('/help/lxc-images.md'),
			'hackage': M('/help/hackage.md'),
			'npm': M('/help/npm.md'),
			'AUR': M('/help/AUR.md')
		},
	  help_item = window.location.hash.replace('#', '');

	var showHelp = (name) => {
		var help_func = help[name];
		if (help_func != undefined)
			help_func();
	};

	var help_nav = Mark.up(nav_tmpl, () => {
		let nav = [];
		for (let k in help)	{
			nav.push({name: k});
		}
		nav.sort((a, b) => { return a.name < b.name ? -1: 1 });
		return {help_navs: nav};
	}());

	$('#help-nav').html(help_nav);
	showHelp(help_item);
	$(`#help-nav-item-${help_item}`).addClass('active');

	$('#help-nav').on('click', 'li', function() {
		// `this` cannot be used with arrow function
		let help_item = $(this).attr('data-help-item');
		showHelp(help_item);
		$(this)
			.parent().children('li')
			.removeClass('active');
		$(this).addClass('active');
	});

});

// vim: ts=2 sts=2 sw=2 noexpandtab

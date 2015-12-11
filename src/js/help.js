$(document).ready(() => {
	var M = (url) => {
		return () => {
			$('#spinner').removeClass('hidden');
			$('#help-content').text("");
			$.get(url, (data) => {
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
			var update_apt_file = (ev) => {
				var sel = $(ev.target);
				var os_name=sel.find("option:selected").attr('data-os'),
					release_name=sel.find("option:selected").attr('data-release'),
					tmpl_selector=sel.attr("data-template"), 
					target_selector=sel.attr("data-target"),
				  apt_template = $.trim($(tmpl_selector).text()),
				  apt_content = Mark.up(
						apt_template, 
						{
							os_name: os_name,
							release_name: release_name
						}
					);
				$(target_selector).html(apt_content);
			};
			$.get(url, (data) => {
				var rendered = "";
				if (url.match(/\.md$/)) {
					rendered = marked(data);
				}
				$("#help-content")
					.html(rendered)
					.find('table')
					.addClass("table table-bordered table-striped");
				$('#spinner').addClass('hidden');
				
				$("select.release-select").on('change', update_apt_file);
				$("select.release-select").each((i, e) => {
					$(e).trigger("change");
				});
			});
		};
	};

	var nav_tmpl = $('#help-nav-template').text(), 
		select_tmpl = $('#help-select-template').text(),
		help = {
			'AOSP': M('/help/aosp.md'),
			'archlinuxcn': M('/help/archlinuxcn.md'),
			'homebrew': M('/help/homebrew.md'),
			'linux.git': M('/help/linux.md'),
			'nodesource': M('/help/nodesource.md'),
			'pypi': M("/help/pypi.md"),
			'docker': AptHelp("/help/docker.md"),
			'gitlab-ce': AptHelp("/help/gitlab-ce.md"),
			'raspbian': AptHelp('/help/raspbian.md'),
			'repo-ck': M('/help/repo-ck.md'),
			'rpmfusion': M('/help/rpmfusion.md'),
			'ubuntu': AptHelp('/help/ubuntu.md'),
			'lxc-images': M('/help/lxc-images.md'),
			'hackage': M('/help/hackage.md'),
			'npm': M('/help/npm.md'),
			'AUR': M('/help/AUR.md'),
			'termux': M('/help/termux.md')
		},
	  help_item = window.location.hash.replace('#', '');

	var showHelp = (name) => {
		var help_func = help[name];
		if (help_func != undefined) {
			help_func();
			$('#help-nav li').removeClass('active');
			$(`#help-nav-item-${name}`).addClass('active');
			$('#help-select option').removeAttr('selected');
			$(`#help-select option[data-help-item=${name}]`).attr('selected', 'selected');
		}
	};
	
	var [help_nav, help_select] = (() => {
		let nav = [];
		for (let k in help)	{
			nav.push({name: k});
		}
		nav.sort((a, b) => { return a.name < b.name ? -1: 1 });
		let d = {help_navs: nav};
		return [
			Mark.up(nav_tmpl, d), 
			Mark.up(select_tmpl, d)
		];
	})();

	$('#help-nav').html(help_nav);
	$('#help-select').html(help_select);

	showHelp(help_item);
	$(`#help-nav-item-${help_item}`).addClass('active');

	$('#help-nav').on('click', 'li', function() {
		// `this` cannot be used with arrow function
		let help_item = $(this).attr('data-help-item');
		showHelp(help_item);
		// $(this)
		// 	.parent().children('li')
		// 	.removeClass('active');
		// $(this).addClass('active');
	});
	
	$('#help-select').on('change', (ev) => {
		let help_item = $(ev.target).find("option:selected").attr('data-help-item');
		showHelp(help_item);
	});

});

// vim: ts=2 sts=2 sw=2 noexpandtab

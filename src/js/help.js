$(document).ready(() => {
	var M = (url) => {
		return () => {
			$('#spinner').removeClass('hidden');
			$('#help-content').text("");
			$.get(url, function(data) {
				var rendered = "";
				if (url.match(/\.md$/)) {
					rendered = marked(data);
					console.log(rendered);
				}
				$("#help-content").html(rendered);
				$('#spinner').addClass('hidden');
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
			'raspbian': M('/help/raspbian.md'),
			'repo-ck': M('/help/repo-ck.md'),
			'rpmfusion': M('/help/rpmfusion.md'),
			'ubuntu': M('/help/ubuntu.md'),
			'lxc-images': M('/help/lxc-images.md'),
			'hackage': M('/help/hackage.md')
		},
	  help_item = window.location.hash.replace('#', '');

	var help_nav = Mark.up(nav_tmpl, () => {
		let nav = [];
		for (let k in help)	{
			nav.push({name: k});
		}
		return {help_navs: nav};
	}());

	$('#help-nav').html(help_nav);
	
	var help_func = help[help_item];
	help_func();
	$(`#help-nav-item-${help_item}`).addClass('active');

	$('#help-nav').on('click', 'li', function() {
		// `this` cannot use with arrow function
		let help_item = $(this).attr('data-help-item');
		var help_func = help[help_item];
		help_func();
		$(this).parent().children('li').removeClass('active');
		$(this).addClass('active');
	});



});
// vim: ts=2 sts=2 sw=2 noexpandtab

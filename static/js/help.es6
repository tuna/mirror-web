---
---

const globalOptions = {% include options.json %}.options;

$(document).ready(() => {
	$("#help-content")
		.find('table')
		.addClass("table table-bordered table-striped");

	var update_apt_file = (ev) => {
		var sel = $(ev.target),
			os_name=sel.find("option:selected").data('os'),
			release_name=sel.find("option:selected").data('release'),
			release_security=sel.find("option:selected").data('security'),
			opt=sel.find('option:selected').data('opt'),
			tmpl_selector=sel.data("template"), 
			target_selector=sel.data("target"),
			apt_template=$.trim($(tmpl_selector).text()),
			tmpl_data=$.extend({}, {
				os_name: os_name,
				release_name: release_name,
				release_security: release_security,
			}, opt),
			apt_content=Mark.up(
				apt_template, 
				tmpl_data
			);
		$(target_selector).html(apt_content);
	};
	
	$("select.release-select").on('change', update_apt_file);
	$("select.release-select").each((i, e) => {
		$(e).trigger('change');
	});

	$('#help-select').on('change', (ev) => {
		let help_url = $(ev.target).find("option:selected").data('help-url');
		window.location = `${window.location.protocol}//${window.location.host}${help_url}`;
	});

	$.getJSON("/static/tunasync.json", (statusData) => {
		// remove help items for disabled/removed mirrors
		let availableMirrorIds = new Set(statusData.map(x => x.name));
		globalOptions.unlisted_mirrors.forEach(elem => {
			availableMirrorIds.add(elem.name)
		});
		globalOptions.force_show_help_mirrors.forEach(elem => {
			availableMirrorIds.add(elem)
		});
		console.log(window.mirrorId);
		if (!availableMirrorIds.has(window.mirrorId)) {
			location.href = "/404-help-hidden.html"; // this will break 404 issue submission
		}

		$('li').filter((_, node) => node.id && node.id.startsWith("toc-") && !availableMirrorIds.has(node.id.slice(4))).remove();
		$('option').filter((_, node) => node.id && node.id.startsWith("toc-") && !availableMirrorIds.has(node.id.slice(4))).remove();
	});
});

// vim: ts=2 sts=2 sw=2 noexpandtab

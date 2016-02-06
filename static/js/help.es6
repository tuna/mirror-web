---
---
$(document).ready(() => {
	$("#help-content")
		.find('table')
		.addClass("table table-bordered table-striped");

	var update_apt_file = (ev) => {
		var sel = $(ev.target);
		var os_name=sel.find("option:selected").data('os'),
			release_name=sel.find("option:selected").data('release'),
			tmpl_selector=sel.data("template"), 
			target_selector=sel.data("target"),
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
	
	$("select.release-select").on('change', update_apt_file);
	$("select.release-select").each((i, e) => {
		$(e).trigger('change');
	});

	$('#help-select').on('change', (ev) => {
		let help_url = $(ev.target).find("option:selected").data('help-url');
		window.location = `${window.location.protocol}//${window.location.host}${help_url}`;
	});

});

// vim: ts=2 sts=2 sw=2 noexpandtab

---
---

const globalOptions = {% include options.json %}.options;

$(document).ready(() => {
	$("#help-content")
		.find('table')
		.addClass("table table-bordered table-striped");

	const update_target = (ev) => {
		const sel = $(ev.target);
		const target_selectors = sel.data("target").split(",");
		for (const target_selector of target_selectors) {
			const template_selector = $(target_selector).data("template");
			const select_selectors = $(target_selector).data("select").split(",");
			let url = "/" + window.mirrorId
			if (window.mirrorId.endsWith(".git")) {
				url = "/git/" + window.mirrorId
			}
			const template_data = {
				"mirror": "{{ site.hostname }}" + url,
			};
			for (const select_selector of select_selectors) {
				const opt = $(select_selector).find('option:selected').data();
				$.extend(template_data, opt);
			}
			// special hack for case-insensitive
			if ("sudoe" in template_data) {
				template_data.sudoE = template_data.sudoe;
			}
			const template = $.trim($(template_selector).text());
			const content = Mark.up(
				template,
				template_data
			);
			$(target_selector).html(content);
			hljs.highlightElement($(target_selector).get(0));
		}
	};

	$("select.content-select").on('change', update_target);
	$("select.content-select").each((i, e) => {
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
		console.log(window.mirrorId);
		if (!availableMirrorIds.has(window.mirrorId)) {
			if ({{ site.hide_mirrorz }}) {
				location.href = "/404-help-hidden.html"; // this will break 404 issue submission
			} else {
				location.href = "{{ site.mirrorz_help_link }}" + window.mirrorId; // TODO: convert this to mirrorz cname
			}
		}

		$('li').filter((_, node) => node.id && node.id.startsWith("toc-") && !availableMirrorIds.has(node.id.slice(4))).remove();
		$('option').filter((_, node) => node.id && node.id.startsWith("toc-") && !availableMirrorIds.has(node.id.slice(4))).remove();
	});
});

// vim: ts=2 sts=2 sw=2 noexpandtab

---
---

const globalOptions = {% include options.json %}.options;

document.addEventListener('DOMContentLoaded', () => {
	Array.from(document.querySelectorAll("#help-content table")).map((el) => {
		el.classList.add("table", "table-bordered", "table-striped");
	});

	const update_target = (ev) => {
		const sel = ev.target;
		const target_selectors = sel.attributes["data-target"].value.split(",");
		for (const target_selector of target_selectors) {
			const target = document.querySelector(target_selector);
			const template_selector = target.attributes["data-template"].value;
			const select_selectors = target.attributes["data-select"].value.split(",");
			let url = "/" + window.mirrorId
			if (window.mirrorId.endsWith(".git")) {
				url = "/git/" + window.mirrorId
			}
			const template_data = {
				"mirror": "{{ site.hostname }}" + url,
			};
			for (const select_selector of select_selectors) {
				const opt_attrs = document.querySelector(select_selector).querySelector('option:checked').attributes;
				for(const attr of opt_attrs) {
					if(attr.name.startsWith("data-")) {
						template_data[attr.name.slice(5)] = attr.value;
					}
				}
			}
			// special hack for case-insensitive
			if ("sudoe" in template_data) {
				template_data.sudoE = template_data.sudoe;
			}
			const template = document.querySelector(template_selector).textContent.trim();
			const content = Mark.up(
				template,
				template_data
			);
			target.innerHTML = content;
			hljs.highlightElement(target);
		}
	};

	Array.from(document.querySelectorAll("select.content-select")).map((el) => {
		el.addEventListener('change', update_target);
		el.dispatchEvent(new Event('change'));
	})

	document.getElementById('help-select').addEventListener('change', (ev) => {
		let help_url = ev.target.querySelector("option:checked").attributes['data-help-url'].value;
		window.location = `${window.location.protocol}//${window.location.host}${help_url}`;
	});

	fetch("/static/tunasync.json").then((resp)=>resp.json()).then((statusData) => {
		// remove help items for disabled/removed mirrors
		let availableMirrorIds = new Set(statusData.map(x => x.name));
		globalOptions.unlisted_mirrors.forEach(elem => {
			availableMirrorIds.add(elem.name)
		});
		if (!availableMirrorIds.has(window.mirrorId)) {
			if ({{ site.hide_mirrorz }}) {
				location.href = "/404-help-hidden.html"; // this will break 404 issue submission
			} else {
				location.href = "{{ site.mirrorz_help_link }}" + window.mirrorId; // TODO: convert this to mirrorz cname
			}
		}

		Array.from(document.querySelectorAll("option[id^=\"toc-\"],li[id^=\"toc-\"]")).forEach((elem) => {
			if (elem.id.startsWith("toc-") && !availableMirrorIds.has(elem.id.slice(4))) {
				elem.remove();
			}
		});
	});
});

// vim: ts=2 sts=2 sw=2 noexpandtab

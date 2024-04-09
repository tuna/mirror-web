import "../styles/global.scss";
import { suffix as siteSuffix } from "virtual:jekyll-config";

if (siteSuffix) {
	if (
		!document.location.hostname.endsWith(siteSuffix) &&
		!document.location.hostname.endsWith(siteSuffix + ".")
	) {
		document.title = document.title.replace(/(清华)|(tsinghua)|(tuna)/gi, "");
		document.addEventListener("DOMContentLoaded", () => {
			document.body.classList.add("nonthu");
		});
	}
}

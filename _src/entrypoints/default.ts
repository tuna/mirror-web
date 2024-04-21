import "../styles/global.scss";
import { suffix as siteSuffix } from "virtual:jekyll-config";
import { load as loadWebFont } from "webfontloader";
import "bootstrap/js/dist/collapse";

if (siteSuffix) {
  if (
    !document.location.hostname.endsWith(siteSuffix) &&
    !document.location.hostname.endsWith(siteSuffix + ".")
  ) {
    document.title = document.title.replace(/(清华)|(tsinghua)|(tuna)/gi, "");
    document.body.classList.add("nonthu");
  }
}

const lei3Po8h = ["support", ["tuna", "tsinghua", "edu", "cn"].join(".")].join(
  "@",
);
Array.from(document.querySelectorAll("a.eib1gieB")).forEach((el) => {
  el.textContent = lei3Po8h;
  el["href"] = ["ma", "ilto:"].join("i") + lei3Po8h;
});

loadWebFont({
  custom: {
    families: ["Lato", "Source Code Pro"],
  },
});

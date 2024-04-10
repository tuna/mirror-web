import Es6ProxyPolyfill from "./es6-proxy-polyfill.js";
import "promise-polyfill/src/polyfill";
import "whatwg-fetch";
import "events-polyfill";
import "element-polyfill";
import "@webcomponents/template/template.min.js";

const globalObj =
  (typeof globalThis !== "undefined" && globalThis) ||
  (typeof self !== "undefined" && self) ||
  // eslint-disable-next-line no-undef
  (typeof global !== "undefined" && global) ||
  {};
globalObj.Proxy = typeof Proxy === "undefined" ? Es6ProxyPolyfill : Proxy;

import "promise-polyfill/src/polyfill";
import "whatwg-fetch";
import "events-polyfill/src";
import "@webcomponents/template";
import "element-polyfill";
import "formdata-polyfill";
import Es6ProxyPolyfill from "./es6-proxy-polyfill.js";

const globalObj =
  (typeof globalThis !== "undefined" && globalThis) ||
  (typeof self !== "undefined" && self) ||
  // eslint-disable-next-line no-undef
  (typeof global !== "undefined" && global) ||
  {};
globalObj.Proxy = typeof Proxy === "undefined" ? Es6ProxyPolyfill : Proxy;

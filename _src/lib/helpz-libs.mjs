/**
 * @import { TemplateData, ZInputOutput } from "./helpz-types";
 * @param {Record<string, ZInputOutput>} data
 * @returns {TemplateData}
 */
export function flattenData(data) {
  /** @type {TemplateData} */
  const result = {};
  Object.entries(data).forEach(([k, v]) => {
    if (Array.isArray(v)) {
      result[k] = v[0];
    } else {
      result[k] = v;
    }
  });
  Object.entries(data).forEach(([, v]) => {
    if (Array.isArray(v)) {
      Object.entries(v[1]).forEach(([k, v]) => {
        result[k] = v;
      });
    }
  });
  return result;
}

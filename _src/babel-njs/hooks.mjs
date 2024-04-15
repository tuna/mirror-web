const commonJSHooksKey =
  "transform-njs-module/customWrapperPlugin";

export function defineCommonJSHook(file, hook) {
  let hooks = file.get(commonJSHooksKey);
  if (!hooks) file.set(commonJSHooksKey, (hooks = []));
  hooks.push(hook);
}

function findMap(arr, cb) {
  if (arr) {
    for (const el of arr) {
      const res = cb(el);
      if (res != null) return res;
    }
  }
}

export function makeInvokers(file){
  const hooks = file.get(commonJSHooksKey);

  return {
    getWrapperPayload(...args) {
      return findMap(hooks, hook => hook.getWrapperPayload?.(...args));
    },
    wrapReference(...args) {
      return findMap(hooks, hook => hook.wrapReference?.(...args));
    },
    buildRequireWrapper(...args) {
      return findMap(hooks, hook => hook.buildRequireWrapper?.(...args));
    },
  };
}

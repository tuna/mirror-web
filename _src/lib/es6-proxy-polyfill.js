// Constant variables
var UNDEFINED; // => undefined
var PROXY_TARGET = "[[ProxyTarget]]";
var PROXY_HANDLER = "[[ProxyHandler]]";
var GET = "[[Get]]";
var SET = "[[Set]]";
var CALL = "[[Call]]";
var CONSTRUCT = "[[Construct]]";
var PROTOTYPE = "__proto__";
var PROXY_FLAG = "__PROXY__";
var REVOKED_FLAG = "REVOKED";

var defineProperty = Object.defineProperty;
var defineProperties = Object.defineProperties;
var getPrototypeOf = Object.getPrototypeOf;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var supportES5 = defineProperties ? isNativeFn(defineProperties) : false;

/**
 * Return the prototype of proxy object
 * @param {object} obj
 * @returns {object}
 */
var getProxyProto = supportES5
  ? Object[PROTOTYPE]
    ? getPrototypeOf
    : function (obj) {
        return typeof obj === "function"
          ? obj[PROTOTYPE] || {}
          : getPrototypeOf(obj);
      }
  : function (obj) {
      return (_isVbObject(obj) && _getVbInternalOf(obj)[PROTOTYPE]) || {};
    };

/**
 * Check if `value` is a pristine native function
 * @param {any} value
 * @returns {boolean}
 */
function isNativeFn(value) {
  return (
    typeof value === "function" && /\[native code\]/.test(value.toString())
  );
}

/**
 * The Proxy constructor
 * @constructor
 * @param {object} target
 * @param {object} handler
 */
function ProxyPolyfill(target, handler) {
  if (this instanceof ProxyPolyfill) {
    return createProxy(new Internal(target, handler));
  } else {
    throwTypeError("Constructor Proxy requires 'new'");
  }
}

/**
 * Create a revocable Proxy object
 * @param {object} target
 * @param {object} handler
 * @returns {{proxy: object, revoke: function}}
 */
ProxyPolyfill.revocable = function (target, handler) {
  if (this instanceof ProxyPolyfill.revocable) {
    throwTypeError("Proxy.revocable is not a constructor");
  }
  var internal = new Internal(target, handler);
  var proxy = createProxy(internal);
  return {
    proxy: proxy,
    revoke: function () {
      internal[PROXY_TARGET] = UNDEFINED;
      internal[PROXY_HANDLER] = UNDEFINED;
      if (!supportES5) {
        getProxyProto(proxy)[PROXY_FLAG] = REVOKED_FLAG;
      }
    },
  };
};

/**
 * Create a Proxy object
 * @param {Internal} internal
 * @returns {object}
 */
function createProxy(internal) {
  var target = internal[PROXY_TARGET];
  var proxy;
  if (typeof target === "function") {
    proxy = proxyFunction(internal);
  } else if (target instanceof Array) {
    proxy = proxyArray(internal);
  } else {
    proxy = proxyObject(internal);
  }
  return proxy;
}

/**
 * Internal data
 * @constructor
 * @param {object} target
 * @param {object} handler
 */
function Internal(target, handler) {
  if (!isObject(target) || !isObject(handler)) {
    throwTypeError(
      "Cannot create proxy with a non-object as target or handler",
    );
  }
  if (
    (getProxyProto(target) && getProxyProto(target)[PROXY_FLAG]) ||
    (getProxyProto(handler) && getProxyProto(handler)[PROXY_FLAG]) ===
      REVOKED_FLAG
  ) {
    throwTypeError(
      "Cannot create proxy with a revoked proxy as target or handler",
    );
  }
  this[PROXY_TARGET] = target;
  this[PROXY_HANDLER] = handler;
}

/**
 * The implementation of internal method [[Get]]
 * @param {string} property
 * @param {object} receiver
 * @returns {any}
 */
Internal.prototype[GET] = function (property, receiver) {
  var handler = this[PROXY_HANDLER];
  validateProxyHanler(handler, "get");
  if (handler.get == UNDEFINED) {
    return this[PROXY_TARGET][property];
  }
  if (typeof handler.get === "function") {
    return handler.get(this[PROXY_TARGET], property, receiver);
  }
  throwTypeError("Trap 'get' is not a function: " + handler.get);
};

/**
 * The implementation of internal method [[Set]]
 * @param {string} property
 * @param {any} value
 * @param {object} receiver
 */
Internal.prototype[SET] = function (property, value, receiver) {
  var handler = this[PROXY_HANDLER];
  validateProxyHanler(handler, "set");
  if (handler.set == UNDEFINED) {
    this[PROXY_TARGET][property] = value;
  } else if (typeof handler.set === "function") {
    var result = handler.set(this[PROXY_TARGET], property, value, receiver);
    if (!result) {
      // If the set() method returns false in strict-mode code, a TypeError will be thrown.
      // throwTypeError("Trap 'set' returned false for property '" + property + "'");
      console.warn("Trap 'set' returned false for property '" + property + "'");
    }
    return Boolean(result);
  } else {
    throwTypeError("Trap 'set' is not a function: " + handler.set);
  }
};

/**
 * The implementation of internal method [[Call]]
 * @param {object} thisArg
 * @param {any[]} argList
 * @returns {any}
 */
Internal.prototype[CALL] = function (thisArg, argList) {
  var handler = this[PROXY_HANDLER];
  validateProxyHanler(handler, "apply");
  if (handler.apply == UNDEFINED) {
    return this[PROXY_TARGET].apply(thisArg, argList);
  }
  if (typeof handler.apply === "function") {
    return handler.apply(this[PROXY_TARGET], thisArg, argList);
  }
  throwTypeError("Trap 'apply' is not a function: " + handler.apply);
};

/**
 * The implementation of internal method [[Construct]]
 * @param {any[]} argList
 * @param {object} newTarget
 * @returns {object}
 */
Internal.prototype[CONSTRUCT] = function (argList, newTarget) {
  var handler = this[PROXY_HANDLER];
  validateProxyHanler(handler, "construct");

  var newObj;
  if (handler.construct == UNDEFINED) {
    newObj = evaluateNew(this[PROXY_TARGET], argList);
  } else if (typeof handler.construct === "function") {
    newObj = handler.construct(this[PROXY_TARGET], argList, newTarget);
  } else {
    throwTypeError("Trap 'construct' is not a function: " + handler.construct);
  }

  if (isObject(newObj)) {
    return newObj;
  } else {
    throwTypeError("Trap 'construct' returned non-object: " + newObj);
  }
};

/**
 * Validate the proxy hanler
 * @param {object} handler
 * @param {string} trap
 */
function validateProxyHanler(handler, trap) {
  if (!handler) {
    throwTypeError(
      "Cannot perform '" + trap + "' on a proxy that has been revoked",
    );
  }
}

/**
 * Call constructor with 'new'
 * @param {function} F constructor
 * @param {any[]} argList
 * @returns {object}
 */
function evaluateNew(F, argList) {
  var params = [];
  for (var i = 0, len = argList.length; i < len; ++i) {
    params.push("args[" + i + "]");
  }
  var executor = new Function(
    "Ctor",
    "args",
    "return new Ctor(" + params.join(", ") + ")",
  );
  return executor(F, argList);
}

/**
 * Throw a type error
 * @param {string} message
 */
function throwTypeError(message) {
  throw new TypeError(message);
}

/**
 * Check if value is the language type of Object
 * @param {any} value
 * @returns {boolean}
 */
function isObject(value) {
  return value
    ? typeof value === "object" || typeof value === "function"
    : false;
}

/**
 * Check if key is an own property of object
 * @param {object} obj
 * @param {string} key
 * @returns {boolean}
 */
function hasOwnProperty(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * Hack `Object.getOwnPropertyNames`
 */
var getOwnPropertyNames =
  Object.getOwnPropertyNames ||
  function (obj) {
    var names = [];
    for (var key in obj) {
      if (hasOwnProperty(obj, key)) {
        names.push(key);
      }
    }
    return names;
  };

/**
 * Set the prototype of function
 * @param {function} fn
 * @param {object} proto
 * @returns {object}
 */
var setFuncProto = isNativeFn(Object.setPrototypeOf)
  ? Object.setPrototypeOf
  : Object[PROTOTYPE]
    ? function (fn, proto) {
        fn[PROTOTYPE] = proto;
        return fn;
      }
    : function (fn, proto) {
        return defineProperty(fn, PROTOTYPE, { value: proto });
      };

/**
 * Hack `Object.create`
 */
var objectCreate = supportES5
  ? Object.create
  : function (_, props) {
      var obj = defineProperties({}, props);
      if (_isVbObject(obj)) {
        var proto = {};
        proto[PROXY_FLAG] = UNDEFINED;
        _getVbInternalOf(obj)[PROTOTYPE] = proto;
      }
      return obj;
    };

/**
 * Hack `Object.assign`
 */
var objectAssign =
  Object.assign ||
  function (target, source) {
    for (var key in source) {
      if (hasOwnProperty(source, key)) {
        target[key] = source[key];
      }
    }
    return target;
  };

/**
 * Proxy function
 * @param {Internal} internal
 * @returns {function}
 */
function proxyFunction(internal) {
  var target = internal[PROXY_TARGET];

  function P() {
    return this instanceof P
      ? internal[CONSTRUCT](arguments, P)
      : internal[CALL](this, arguments);
  }
  P.prototype = target.prototype; // `prototype` is not configurable

  if (supportES5) {
    var descMap = observeProto(internal);
    var newProto = objectCreate(getPrototypeOf(target), descMap);
    setFuncProto(P, newProto);

    descMap = observeProperties(target, internal);
    for (var key in descMap) {
      if (hasOwnProperty(P, key)) delete descMap[key];
    }
    defineProperties(P, descMap);
  } else {
    objectAssign(P, target);
  }

  return P;
}

/**
 * Proxy array
 * @param {Internal} internal
 * @returns {object} array-like object
 */
function proxyArray(internal) {
  var target = internal[PROXY_TARGET];

  var descMap, newProto;
  if (supportES5) {
    descMap = observeProto(internal);
    // Fix: `concat` does not work correctly on array-like object
    descMap.concat.get = function () {
      var val = internal[GET]("concat", this);
      return val === Array.prototype.concat ? val.bind(target) : val;
    };
    newProto = objectCreate(getPrototypeOf(target), descMap);
  }

  descMap = observeProperties(target, internal);
  // Observe the change of `length`, and synchronize
  // the properties of Proxy object to target array
  descMap.length.set = function (value) {
    var lenDiff = value - target.length;
    internal[SET]("length", value, this);
    if (lenDiff) syncArrayElement(lenDiff, this, internal);
  };

  return objectCreate(newProto, descMap);
}

/**
 * Proxy object
 * @param {Internal} internal
 * @returns {object}
 */
function proxyObject(internal) {
  var target = internal[PROXY_TARGET];
  var descMap, newProto;
  if (supportES5) {
    descMap = observeProto(internal);
    newProto = objectCreate(getPrototypeOf(target), descMap);
  }

  descMap = observeProperties(target, internal);
  return objectCreate(newProto, descMap);
}

/**
 * Observe [[Prototype]]
 * @param {Internal} internal
 * @returns {object} descriptors
 */
function observeProto(internal) {
  var descMap = {};
  var proto = internal[PROXY_TARGET];
  while ((proto = getPrototypeOf(proto))) {
    var props = observeProperties(proto, internal);
    objectAssign(descMap, props);
  }
  descMap[PROXY_FLAG] = {
    get: function () {
      return internal[PROXY_TARGET] ? UNDEFINED : REVOKED_FLAG;
    },
  };
  return descMap;
}

/**
 * Observe properties
 * @param {object} obj
 * @param {Internal} internal
 * @returns {object} descriptors
 */
function observeProperties(obj, internal) {
  var names = getOwnPropertyNames(obj);
  var descMap = {};
  for (var i = names.length - 1; i >= 0; --i) {
    descMap[names[i]] = observeProperty(obj, names[i], internal);
  }
  return descMap;
}

/**
 * Observe property
 * @param {object} obj
 * @param {string} prop
 * @param {Internal} internal
 * @returns {{get: function, set: function, enumerable: boolean, configurable: boolean}}
 */
function observeProperty(obj, prop, internal) {
  var desc = getOwnPropertyDescriptor(obj, prop);
  return {
    get: function () {
      return internal[GET](prop, this);
    },
    set: function (value) {
      internal[SET](prop, value, this);
    },
    enumerable: desc.enumerable,
    configurable: desc.configurable,
  };
}

/**
 * Sync array element from P to target
 * @param {number} lenDiff
 * @param {object} P
 * @param {Internal} internal
 */
function syncArrayElement(lenDiff, P, internal) {
  var target = internal[PROXY_TARGET];
  if (lenDiff > 0) {
    for (var tLen = target.length, i = tLen - lenDiff; i < tLen; ++i) {
      var desc = getOwnPropertyDescriptor(P, i);
      if (desc) defineProperty(target, i, desc);
      else target[i] = UNDEFINED;
      desc = observeProperty(target, i, internal);
      defineProperty(P, i, desc);
    }
  } else {
    for (var i = target.length, pLen = i - lenDiff; i < pLen; ++i) {
      delete P[i];
    }
  }
}

export default typeof Proxy === "undefined" ? ProxyPolyfill : Proxy;

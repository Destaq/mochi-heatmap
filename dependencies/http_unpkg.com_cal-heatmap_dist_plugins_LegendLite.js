(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('d3-selection'), require('d3')) :
  typeof define === 'function' && define.amd ? define(['d3-selection', 'd3'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.LegendLite = factory(global.d3, global.d3));
})(this, (function (d3Selection, d3) { 'use strict';

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var fails$p = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var fails$o = fails$p;

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails$o(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var fails$n = fails$p;

  var functionBindNative = !fails$n(function () {
    // eslint-disable-next-line es/no-function-prototype-bind -- safe
    var test = (function () { /* empty */ }).bind();
    // eslint-disable-next-line no-prototype-builtins -- safe
    return typeof test != 'function' || test.hasOwnProperty('prototype');
  });

  var NATIVE_BIND$3 = functionBindNative;

  var FunctionPrototype$3 = Function.prototype;
  var call$g = FunctionPrototype$3.call;
  var uncurryThisWithBind = NATIVE_BIND$3 && FunctionPrototype$3.bind.bind(call$g, call$g);

  var functionUncurryThis = NATIVE_BIND$3 ? uncurryThisWithBind : function (fn) {
    return function () {
      return call$g.apply(fn, arguments);
    };
  };

  // we can't use just `it == null` since of `document.all` special case
  // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
  var isNullOrUndefined$7 = function (it) {
    return it === null || it === undefined;
  };

  var isNullOrUndefined$6 = isNullOrUndefined$7;

  var $TypeError$g = TypeError;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible$5 = function (it) {
    if (isNullOrUndefined$6(it)) throw $TypeError$g("Can't call method on " + it);
    return it;
  };

  var requireObjectCoercible$4 = requireObjectCoercible$5;

  var $Object$4 = Object;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject$9 = function (argument) {
    return $Object$4(requireObjectCoercible$4(argument));
  };

  var uncurryThis$q = functionUncurryThis;
  var toObject$8 = toObject$9;

  var hasOwnProperty = uncurryThis$q({}.hasOwnProperty);

  // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty
  // eslint-disable-next-line es/no-object-hasown -- safe
  var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject$8(it), key);
  };

  var DESCRIPTORS$d = descriptors;
  var hasOwn$b = hasOwnProperty_1;

  var FunctionPrototype$2 = Function.prototype;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getDescriptor = DESCRIPTORS$d && Object.getOwnPropertyDescriptor;

  var EXISTS$1 = hasOwn$b(FunctionPrototype$2, 'name');
  // additional protection from minified / mangled / dropped function names
  var PROPER = EXISTS$1 && (function something() { /* empty */ }).name === 'something';
  var CONFIGURABLE$1 = EXISTS$1 && (!DESCRIPTORS$d || (DESCRIPTORS$d && getDescriptor(FunctionPrototype$2, 'name').configurable));

  var functionName = {
    EXISTS: EXISTS$1,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE$1
  };

  var makeBuiltIn$3 = {exports: {}};

  var documentAll$2 = typeof document == 'object' && document.all;

  // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
  // eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
  var IS_HTMLDDA = typeof documentAll$2 == 'undefined' && documentAll$2 !== undefined;

  var documentAll_1 = {
    all: documentAll$2,
    IS_HTMLDDA: IS_HTMLDDA
  };

  var $documentAll$1 = documentAll_1;

  var documentAll$1 = $documentAll$1.all;

  // `IsCallable` abstract operation
  // https://tc39.es/ecma262/#sec-iscallable
  var isCallable$m = $documentAll$1.IS_HTMLDDA ? function (argument) {
    return typeof argument == 'function' || argument === documentAll$1;
  } : function (argument) {
    return typeof argument == 'function';
  };

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$k =
    // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || commonjsGlobal || Function('return this')();

  var global$j = global$k;

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty$7 = Object.defineProperty;

  var defineGlobalProperty$3 = function (key, value) {
    try {
      defineProperty$7(global$j, key, { value: value, configurable: true, writable: true });
    } catch (error) {
      global$j[key] = value;
    } return value;
  };

  var global$i = global$k;
  var defineGlobalProperty$2 = defineGlobalProperty$3;

  var SHARED = '__core-js_shared__';
  var store$3 = global$i[SHARED] || defineGlobalProperty$2(SHARED, {});

  var sharedStore = store$3;

  var uncurryThis$p = functionUncurryThis;
  var isCallable$l = isCallable$m;
  var store$2 = sharedStore;

  var functionToString$1 = uncurryThis$p(Function.toString);

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (!isCallable$l(store$2.inspectSource)) {
    store$2.inspectSource = function (it) {
      return functionToString$1(it);
    };
  }

  var inspectSource$3 = store$2.inspectSource;

  var global$h = global$k;
  var isCallable$k = isCallable$m;

  var WeakMap$1 = global$h.WeakMap;

  var weakMapBasicDetection = isCallable$k(WeakMap$1) && /native code/.test(String(WeakMap$1));

  var isCallable$j = isCallable$m;
  var $documentAll = documentAll_1;

  var documentAll = $documentAll.all;

  var isObject$i = $documentAll.IS_HTMLDDA ? function (it) {
    return typeof it == 'object' ? it !== null : isCallable$j(it) || it === documentAll;
  } : function (it) {
    return typeof it == 'object' ? it !== null : isCallable$j(it);
  };

  var objectDefineProperty = {};

  var global$g = global$k;
  var isObject$h = isObject$i;

  var document$3 = global$g.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject$h(document$3) && isObject$h(document$3.createElement);

  var documentCreateElement$2 = function (it) {
    return EXISTS ? document$3.createElement(it) : {};
  };

  var DESCRIPTORS$c = descriptors;
  var fails$m = fails$p;
  var createElement$1 = documentCreateElement$2;

  // Thanks to IE8 for its funny defineProperty
  var ie8DomDefine = !DESCRIPTORS$c && !fails$m(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(createElement$1('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var DESCRIPTORS$b = descriptors;
  var fails$l = fails$p;

  // V8 ~ Chrome 36-
  // https://bugs.chromium.org/p/v8/issues/detail?id=3334
  var v8PrototypeDefineBug = DESCRIPTORS$b && fails$l(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(function () { /* empty */ }, 'prototype', {
      value: 42,
      writable: false
    }).prototype != 42;
  });

  var isObject$g = isObject$i;

  var $String$5 = String;
  var $TypeError$f = TypeError;

  // `Assert: Type(argument) is Object`
  var anObject$c = function (argument) {
    if (isObject$g(argument)) return argument;
    throw $TypeError$f($String$5(argument) + ' is not an object');
  };

  var NATIVE_BIND$2 = functionBindNative;

  var call$f = Function.prototype.call;

  var functionCall = NATIVE_BIND$2 ? call$f.bind(call$f) : function () {
    return call$f.apply(call$f, arguments);
  };

  var global$f = global$k;
  var isCallable$i = isCallable$m;

  var aFunction = function (argument) {
    return isCallable$i(argument) ? argument : undefined;
  };

  var getBuiltIn$7 = function (namespace, method) {
    return arguments.length < 2 ? aFunction(global$f[namespace]) : global$f[namespace] && global$f[namespace][method];
  };

  var uncurryThis$o = functionUncurryThis;

  var objectIsPrototypeOf = uncurryThis$o({}.isPrototypeOf);

  var engineUserAgent = typeof navigator != 'undefined' && String(navigator.userAgent) || '';

  var global$e = global$k;
  var userAgent$5 = engineUserAgent;

  var process$4 = global$e.process;
  var Deno$1 = global$e.Deno;
  var versions = process$4 && process$4.versions || Deno$1 && Deno$1.version;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us
    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
  }

  // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
  // so check `userAgent` even if `.v8` exists, but 0
  if (!version && userAgent$5) {
    match = userAgent$5.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = userAgent$5.match(/Chrome\/(\d+)/);
      if (match) version = +match[1];
    }
  }

  var engineV8Version = version;

  /* eslint-disable es/no-symbol -- required for testing */

  var V8_VERSION$3 = engineV8Version;
  var fails$k = fails$p;
  var global$d = global$k;

  var $String$4 = global$d.String;

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$k(function () {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
    // of course, fail.
    return !$String$4(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && V8_VERSION$3 && V8_VERSION$3 < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */

  var NATIVE_SYMBOL$1 = symbolConstructorDetection;

  var useSymbolAsUid = NATIVE_SYMBOL$1
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';

  var getBuiltIn$6 = getBuiltIn$7;
  var isCallable$h = isCallable$m;
  var isPrototypeOf$2 = objectIsPrototypeOf;
  var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

  var $Object$3 = Object;

  var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn$6('Symbol');
    return isCallable$h($Symbol) && isPrototypeOf$2($Symbol.prototype, $Object$3(it));
  };

  var $String$3 = String;

  var tryToString$5 = function (argument) {
    try {
      return $String$3(argument);
    } catch (error) {
      return 'Object';
    }
  };

  var isCallable$g = isCallable$m;
  var tryToString$4 = tryToString$5;

  var $TypeError$e = TypeError;

  // `Assert: IsCallable(argument) is true`
  var aCallable$b = function (argument) {
    if (isCallable$g(argument)) return argument;
    throw $TypeError$e(tryToString$4(argument) + ' is not a function');
  };

  var aCallable$a = aCallable$b;
  var isNullOrUndefined$5 = isNullOrUndefined$7;

  // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod
  var getMethod$3 = function (V, P) {
    var func = V[P];
    return isNullOrUndefined$5(func) ? undefined : aCallable$a(func);
  };

  var call$e = functionCall;
  var isCallable$f = isCallable$m;
  var isObject$f = isObject$i;

  var $TypeError$d = TypeError;

  // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive
  var ordinaryToPrimitive$1 = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable$f(fn = input.toString) && !isObject$f(val = call$e(fn, input))) return val;
    if (isCallable$f(fn = input.valueOf) && !isObject$f(val = call$e(fn, input))) return val;
    if (pref !== 'string' && isCallable$f(fn = input.toString) && !isObject$f(val = call$e(fn, input))) return val;
    throw $TypeError$d("Can't convert object to primitive value");
  };

  var shared$3 = {exports: {}};

  var store$1 = sharedStore;

  (shared$3.exports = function (key, value) {
    return store$1[key] || (store$1[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.30.2',
    mode: 'global',
    copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
    license: 'https://github.com/zloirock/core-js/blob/v3.30.2/LICENSE',
    source: 'https://github.com/zloirock/core-js'
  });

  var sharedExports = shared$3.exports;

  var uncurryThis$n = functionUncurryThis;

  var id$2 = 0;
  var postfix = Math.random();
  var toString$9 = uncurryThis$n(1.0.toString);

  var uid$3 = function (key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$9(++id$2 + postfix, 36);
  };

  var global$c = global$k;
  var shared$2 = sharedExports;
  var hasOwn$a = hasOwnProperty_1;
  var uid$2 = uid$3;
  var NATIVE_SYMBOL = symbolConstructorDetection;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;

  var Symbol$2 = global$c.Symbol;
  var WellKnownSymbolsStore = shared$2('wks');
  var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$2['for'] || Symbol$2 : Symbol$2 && Symbol$2.withoutSetter || uid$2;

  var wellKnownSymbol$k = function (name) {
    if (!hasOwn$a(WellKnownSymbolsStore, name)) {
      WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn$a(Symbol$2, name)
        ? Symbol$2[name]
        : createWellKnownSymbol('Symbol.' + name);
    } return WellKnownSymbolsStore[name];
  };

  var call$d = functionCall;
  var isObject$e = isObject$i;
  var isSymbol$1 = isSymbol$2;
  var getMethod$2 = getMethod$3;
  var ordinaryToPrimitive = ordinaryToPrimitive$1;
  var wellKnownSymbol$j = wellKnownSymbol$k;

  var $TypeError$c = TypeError;
  var TO_PRIMITIVE = wellKnownSymbol$j('toPrimitive');

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  var toPrimitive$1 = function (input, pref) {
    if (!isObject$e(input) || isSymbol$1(input)) return input;
    var exoticToPrim = getMethod$2(input, TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = call$d(exoticToPrim, input, pref);
      if (!isObject$e(result) || isSymbol$1(result)) return result;
      throw $TypeError$c("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
  };

  var toPrimitive = toPrimitive$1;
  var isSymbol = isSymbol$2;

  // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey
  var toPropertyKey$3 = function (argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol(key) ? key : key + '';
  };

  var DESCRIPTORS$a = descriptors;
  var IE8_DOM_DEFINE$1 = ie8DomDefine;
  var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
  var anObject$b = anObject$c;
  var toPropertyKey$2 = toPropertyKey$3;

  var $TypeError$b = TypeError;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty = Object.defineProperty;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
  var ENUMERABLE = 'enumerable';
  var CONFIGURABLE = 'configurable';
  var WRITABLE = 'writable';

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  objectDefineProperty.f = DESCRIPTORS$a ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
    anObject$b(O);
    P = toPropertyKey$2(P);
    anObject$b(Attributes);
    if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
      var current = $getOwnPropertyDescriptor$1(O, P);
      if (current && current[WRITABLE]) {
        O[P] = Attributes.value;
        Attributes = {
          configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
          enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
          writable: false
        };
      }
    } return $defineProperty(O, P, Attributes);
  } : $defineProperty : function defineProperty(O, P, Attributes) {
    anObject$b(O);
    P = toPropertyKey$2(P);
    anObject$b(Attributes);
    if (IE8_DOM_DEFINE$1) try {
      return $defineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw $TypeError$b('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var createPropertyDescriptor$4 = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var DESCRIPTORS$9 = descriptors;
  var definePropertyModule$4 = objectDefineProperty;
  var createPropertyDescriptor$3 = createPropertyDescriptor$4;

  var createNonEnumerableProperty$5 = DESCRIPTORS$9 ? function (object, key, value) {
    return definePropertyModule$4.f(object, key, createPropertyDescriptor$3(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var shared$1 = sharedExports;
  var uid$1 = uid$3;

  var keys = shared$1('keys');

  var sharedKey$3 = function (key) {
    return keys[key] || (keys[key] = uid$1(key));
  };

  var hiddenKeys$5 = {};

  var NATIVE_WEAK_MAP = weakMapBasicDetection;
  var global$b = global$k;
  var isObject$d = isObject$i;
  var createNonEnumerableProperty$4 = createNonEnumerableProperty$5;
  var hasOwn$9 = hasOwnProperty_1;
  var shared = sharedStore;
  var sharedKey$2 = sharedKey$3;
  var hiddenKeys$4 = hiddenKeys$5;

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var TypeError$2 = global$b.TypeError;
  var WeakMap = global$b.WeakMap;
  var set$1, get, has;

  var enforce = function (it) {
    return has(it) ? get(it) : set$1(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject$d(it) || (state = get(it)).type !== TYPE) {
        throw TypeError$2('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (NATIVE_WEAK_MAP || shared.state) {
    var store = shared.state || (shared.state = new WeakMap());
    /* eslint-disable no-self-assign -- prototype methods protection */
    store.get = store.get;
    store.has = store.has;
    store.set = store.set;
    /* eslint-enable no-self-assign -- prototype methods protection */
    set$1 = function (it, metadata) {
      if (store.has(it)) throw TypeError$2(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      store.set(it, metadata);
      return metadata;
    };
    get = function (it) {
      return store.get(it) || {};
    };
    has = function (it) {
      return store.has(it);
    };
  } else {
    var STATE = sharedKey$2('state');
    hiddenKeys$4[STATE] = true;
    set$1 = function (it, metadata) {
      if (hasOwn$9(it, STATE)) throw TypeError$2(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$4(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return hasOwn$9(it, STATE) ? it[STATE] : {};
    };
    has = function (it) {
      return hasOwn$9(it, STATE);
    };
  }

  var internalState = {
    set: set$1,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
  };

  var uncurryThis$m = functionUncurryThis;
  var fails$j = fails$p;
  var isCallable$e = isCallable$m;
  var hasOwn$8 = hasOwnProperty_1;
  var DESCRIPTORS$8 = descriptors;
  var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;
  var inspectSource$2 = inspectSource$3;
  var InternalStateModule$5 = internalState;

  var enforceInternalState = InternalStateModule$5.enforce;
  var getInternalState$2 = InternalStateModule$5.get;
  var $String$2 = String;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty$6 = Object.defineProperty;
  var stringSlice$3 = uncurryThis$m(''.slice);
  var replace$1 = uncurryThis$m(''.replace);
  var join = uncurryThis$m([].join);

  var CONFIGURABLE_LENGTH = DESCRIPTORS$8 && !fails$j(function () {
    return defineProperty$6(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
  });

  var TEMPLATE = String(String).split('String');

  var makeBuiltIn$2 = makeBuiltIn$3.exports = function (value, name, options) {
    if (stringSlice$3($String$2(name), 0, 7) === 'Symbol(') {
      name = '[' + replace$1($String$2(name), /^Symbol\(([^)]*)\)/, '$1') + ']';
    }
    if (options && options.getter) name = 'get ' + name;
    if (options && options.setter) name = 'set ' + name;
    if (!hasOwn$8(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name)) {
      if (DESCRIPTORS$8) defineProperty$6(value, 'name', { value: name, configurable: true });
      else value.name = name;
    }
    if (CONFIGURABLE_LENGTH && options && hasOwn$8(options, 'arity') && value.length !== options.arity) {
      defineProperty$6(value, 'length', { value: options.arity });
    }
    try {
      if (options && hasOwn$8(options, 'constructor') && options.constructor) {
        if (DESCRIPTORS$8) defineProperty$6(value, 'prototype', { writable: false });
      // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
      } else if (value.prototype) value.prototype = undefined;
    } catch (error) { /* empty */ }
    var state = enforceInternalState(value);
    if (!hasOwn$8(state, 'source')) {
      state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
    } return value;
  };

  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  // eslint-disable-next-line no-extend-native -- required
  Function.prototype.toString = makeBuiltIn$2(function toString() {
    return isCallable$e(this) && getInternalState$2(this).source || inspectSource$2(this);
  }, 'toString');

  var makeBuiltInExports = makeBuiltIn$3.exports;

  var makeBuiltIn$1 = makeBuiltInExports;
  var defineProperty$5 = objectDefineProperty;

  var defineBuiltInAccessor$3 = function (target, name, descriptor) {
    if (descriptor.get) makeBuiltIn$1(descriptor.get, name, { getter: true });
    if (descriptor.set) makeBuiltIn$1(descriptor.set, name, { setter: true });
    return defineProperty$5.f(target, name, descriptor);
  };

  var DESCRIPTORS$7 = descriptors;
  var FUNCTION_NAME_EXISTS = functionName.EXISTS;
  var uncurryThis$l = functionUncurryThis;
  var defineBuiltInAccessor$2 = defineBuiltInAccessor$3;

  var FunctionPrototype$1 = Function.prototype;
  var functionToString = uncurryThis$l(FunctionPrototype$1.toString);
  var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
  var regExpExec = uncurryThis$l(nameRE.exec);
  var NAME = 'name';

  // Function instances `.name` property
  // https://tc39.es/ecma262/#sec-function-instances-name
  if (DESCRIPTORS$7 && !FUNCTION_NAME_EXISTS) {
    defineBuiltInAccessor$2(FunctionPrototype$1, NAME, {
      configurable: true,
      get: function () {
        try {
          return regExpExec(nameRE, functionToString(this))[1];
        } catch (error) {
          return '';
        }
      }
    });
  }

  var objectGetOwnPropertyDescriptor = {};

  var objectPropertyIsEnumerable = {};

  var $propertyIsEnumerable$1 = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$3 = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor$3 && !$propertyIsEnumerable$1.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$3(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable$1;

  var uncurryThis$k = functionUncurryThis;

  var toString$8 = uncurryThis$k({}.toString);
  var stringSlice$2 = uncurryThis$k(''.slice);

  var classofRaw$2 = function (it) {
    return stringSlice$2(toString$8(it), 8, -1);
  };

  var uncurryThis$j = functionUncurryThis;
  var fails$i = fails$p;
  var classof$a = classofRaw$2;

  var $Object$2 = Object;
  var split = uncurryThis$j(''.split);

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails$i(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !$Object$2('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$a(it) == 'String' ? split(it, '') : $Object$2(it);
  } : $Object$2;

  // toObject with fallback for non-array-like ES3 strings
  var IndexedObject$4 = indexedObject;
  var requireObjectCoercible$3 = requireObjectCoercible$5;

  var toIndexedObject$9 = function (it) {
    return IndexedObject$4(requireObjectCoercible$3(it));
  };

  var DESCRIPTORS$6 = descriptors;
  var call$c = functionCall;
  var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
  var createPropertyDescriptor$2 = createPropertyDescriptor$4;
  var toIndexedObject$8 = toIndexedObject$9;
  var toPropertyKey$1 = toPropertyKey$3;
  var hasOwn$7 = hasOwnProperty_1;
  var IE8_DOM_DEFINE = ie8DomDefine;

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$6 ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$8(O);
    P = toPropertyKey$1(P);
    if (IE8_DOM_DEFINE) try {
      return $getOwnPropertyDescriptor(O, P);
    } catch (error) { /* empty */ }
    if (hasOwn$7(O, P)) return createPropertyDescriptor$2(!call$c(propertyIsEnumerableModule$1.f, O, P), O[P]);
  };

  var isCallable$d = isCallable$m;
  var definePropertyModule$3 = objectDefineProperty;
  var makeBuiltIn = makeBuiltInExports;
  var defineGlobalProperty$1 = defineGlobalProperty$3;

  var defineBuiltIn$8 = function (O, key, value, options) {
    if (!options) options = {};
    var simple = options.enumerable;
    var name = options.name !== undefined ? options.name : key;
    if (isCallable$d(value)) makeBuiltIn(value, name, options);
    if (options.global) {
      if (simple) O[key] = value;
      else defineGlobalProperty$1(key, value);
    } else {
      try {
        if (!options.unsafe) delete O[key];
        else if (O[key]) simple = true;
      } catch (error) { /* empty */ }
      if (simple) O[key] = value;
      else definePropertyModule$3.f(O, key, {
        value: value,
        enumerable: false,
        configurable: !options.nonConfigurable,
        writable: !options.nonWritable
      });
    } return O;
  };

  var objectGetOwnPropertyNames = {};

  var ceil = Math.ceil;
  var floor$1 = Math.floor;

  // `Math.trunc` method
  // https://tc39.es/ecma262/#sec-math.trunc
  // eslint-disable-next-line es/no-math-trunc -- safe
  var mathTrunc = Math.trunc || function trunc(x) {
    var n = +x;
    return (n > 0 ? floor$1 : ceil)(n);
  };

  var trunc = mathTrunc;

  // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity
  var toIntegerOrInfinity$3 = function (argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- NaN check
    return number !== number || number === 0 ? 0 : trunc(number);
  };

  var toIntegerOrInfinity$2 = toIntegerOrInfinity$3;

  var max$2 = Math.max;
  var min$2 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex$3 = function (index, length) {
    var integer = toIntegerOrInfinity$2(index);
    return integer < 0 ? max$2(integer + length, 0) : min$2(integer, length);
  };

  var toIntegerOrInfinity$1 = toIntegerOrInfinity$3;

  var min$1 = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength$2 = function (argument) {
    return argument > 0 ? min$1(toIntegerOrInfinity$1(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toLength$1 = toLength$2;

  // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike
  var lengthOfArrayLike$9 = function (obj) {
    return toLength$1(obj.length);
  };

  var toIndexedObject$7 = toIndexedObject$9;
  var toAbsoluteIndex$2 = toAbsoluteIndex$3;
  var lengthOfArrayLike$8 = lengthOfArrayLike$9;

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$5 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$7($this);
      var length = lengthOfArrayLike$8(O);
      var index = toAbsoluteIndex$2(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare -- NaN check
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod$5(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$5(false)
  };

  var uncurryThis$i = functionUncurryThis;
  var hasOwn$6 = hasOwnProperty_1;
  var toIndexedObject$6 = toIndexedObject$9;
  var indexOf = arrayIncludes.indexOf;
  var hiddenKeys$3 = hiddenKeys$5;

  var push$3 = uncurryThis$i([].push);

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject$6(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !hasOwn$6(hiddenKeys$3, key) && hasOwn$6(O, key) && push$3(result, key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (hasOwn$6(O, key = names[i++])) {
      ~indexOf(result, key) || push$3(result, key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys$3 = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var internalObjectKeys$1 = objectKeysInternal;
  var enumBugKeys$2 = enumBugKeys$3;

  var hiddenKeys$2 = enumBugKeys$2.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
  objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys$1(O, hiddenKeys$2);
  };

  var objectGetOwnPropertySymbols = {};

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
  objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

  var getBuiltIn$5 = getBuiltIn$7;
  var uncurryThis$h = functionUncurryThis;
  var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
  var anObject$a = anObject$c;

  var concat$1 = uncurryThis$h([].concat);

  // all object keys, includes non-enumerable and symbols
  var ownKeys$1 = getBuiltIn$5('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule$1.f(anObject$a(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
    return getOwnPropertySymbols ? concat$1(keys, getOwnPropertySymbols(it)) : keys;
  };

  var hasOwn$5 = hasOwnProperty_1;
  var ownKeys = ownKeys$1;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var definePropertyModule$2 = objectDefineProperty;

  var copyConstructorProperties$1 = function (target, source, exceptions) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule$2.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!hasOwn$5(target, key) && !(exceptions && hasOwn$5(exceptions, key))) {
        defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    }
  };

  var fails$h = fails$p;
  var isCallable$c = isCallable$m;

  var replacement = /#|\.prototype\./;

  var isForced$3 = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : isCallable$c(detection) ? fails$h(detection)
      : !!detection;
  };

  var normalize = isForced$3.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced$3.data = {};
  var NATIVE = isForced$3.NATIVE = 'N';
  var POLYFILL = isForced$3.POLYFILL = 'P';

  var isForced_1 = isForced$3;

  var global$a = global$k;
  var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty$3 = createNonEnumerableProperty$5;
  var defineBuiltIn$7 = defineBuiltIn$8;
  var defineGlobalProperty = defineGlobalProperty$3;
  var copyConstructorProperties = copyConstructorProperties$1;
  var isForced$2 = isForced_1;

  /*
    options.target         - name of the target object
    options.global         - target is the global object
    options.stat           - export as static methods of target
    options.proto          - export as prototype methods of target
    options.real           - real prototype method for the `pure` version
    options.forced         - export even if the native feature is available
    options.bind           - bind methods to the target, required for the `pure` version
    options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe         - use the simple assignment of property instead of delete + defineProperty
    options.sham           - add a flag to not completely full polyfills
    options.enumerable     - export as enumerable property
    options.dontCallGetSet - prevent calling a getter on target
    options.name           - the .name of the function if it does not match the key
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global$a;
    } else if (STATIC) {
      target = global$a[TARGET] || defineGlobalProperty(TARGET, {});
    } else {
      target = (global$a[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.dontCallGetSet) {
        descriptor = getOwnPropertyDescriptor$2(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced$2(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty == typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty$3(sourceProperty, 'sham', true);
      }
      defineBuiltIn$7(target, key, sourceProperty, options);
    }
  };

  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys$1 = enumBugKeys$3;

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  var objectKeys$3 = Object.keys || function keys(O) {
    return internalObjectKeys(O, enumBugKeys$1);
  };

  var DESCRIPTORS$5 = descriptors;
  var uncurryThis$g = functionUncurryThis;
  var call$b = functionCall;
  var fails$g = fails$p;
  var objectKeys$2 = objectKeys$3;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var toObject$7 = toObject$9;
  var IndexedObject$3 = indexedObject;

  // eslint-disable-next-line es/no-object-assign -- safe
  var $assign = Object.assign;
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  var defineProperty$4 = Object.defineProperty;
  var concat = uncurryThis$g([].concat);

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  var objectAssign = !$assign || fails$g(function () {
    // should have correct order of operations (Edge bug)
    if (DESCRIPTORS$5 && $assign({ b: 1 }, $assign(defineProperty$4({}, 'a', {
      enumerable: true,
      get: function () {
        defineProperty$4(this, 'b', {
          value: 3,
          enumerable: false
        });
      }
    }), { b: 2 })).b !== 1) return true;
    // should work with symbols and should have deterministic property order (V8 bug)
    var A = {};
    var B = {};
    // eslint-disable-next-line es/no-symbol -- safe
    var symbol = Symbol();
    var alphabet = 'abcdefghijklmnopqrst';
    A[symbol] = 7;
    alphabet.split('').forEach(function (chr) { B[chr] = chr; });
    return $assign({}, A)[symbol] != 7 || objectKeys$2($assign({}, B)).join('') != alphabet;
  }) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
    var T = toObject$7(target);
    var argumentsLength = arguments.length;
    var index = 1;
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    var propertyIsEnumerable = propertyIsEnumerableModule.f;
    while (argumentsLength > index) {
      var S = IndexedObject$3(arguments[index++]);
      var keys = getOwnPropertySymbols ? concat(objectKeys$2(S), getOwnPropertySymbols(S)) : objectKeys$2(S);
      var length = keys.length;
      var j = 0;
      var key;
      while (length > j) {
        key = keys[j++];
        if (!DESCRIPTORS$5 || call$b(propertyIsEnumerable, S, key)) T[key] = S[key];
      }
    } return T;
  } : $assign;

  var $$o = _export;
  var assign = objectAssign;

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  // eslint-disable-next-line es/no-object-assign -- required for testing
  $$o({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign }, {
    assign: assign
  });

  var wellKnownSymbol$i = wellKnownSymbol$k;

  var TO_STRING_TAG$3 = wellKnownSymbol$i('toStringTag');
  var test$1 = {};

  test$1[TO_STRING_TAG$3] = 'z';

  var toStringTagSupport = String(test$1) === '[object z]';

  var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
  var isCallable$b = isCallable$m;
  var classofRaw$1 = classofRaw$2;
  var wellKnownSymbol$h = wellKnownSymbol$k;

  var TO_STRING_TAG$2 = wellKnownSymbol$h('toStringTag');
  var $Object$1 = Object;

  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw$1(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof$9 = TO_STRING_TAG_SUPPORT$2 ? classofRaw$1 : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = $Object$1(it), TO_STRING_TAG$2)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw$1(O)
      // ES3 arguments fallback
      : (result = classofRaw$1(O)) == 'Object' && isCallable$b(O.callee) ? 'Arguments' : result;
  };

  var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
  var classof$8 = classof$9;

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString$1 = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
    return '[object ' + classof$8(this) + ']';
  };

  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var defineBuiltIn$6 = defineBuiltIn$8;
  var toString$7 = objectToString$1;

  // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if (!TO_STRING_TAG_SUPPORT) {
    defineBuiltIn$6(Object.prototype, 'toString', toString$7, { unsafe: true });
  }

  var classof$7 = classofRaw$2;

  var engineIsNode = typeof process != 'undefined' && classof$7(process) == 'process';

  var uncurryThis$f = functionUncurryThis;
  var aCallable$9 = aCallable$b;

  var functionUncurryThisAccessor = function (object, key, method) {
    try {
      // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
      return uncurryThis$f(aCallable$9(Object.getOwnPropertyDescriptor(object, key)[method]));
    } catch (error) { /* empty */ }
  };

  var isCallable$a = isCallable$m;

  var $String$1 = String;
  var $TypeError$a = TypeError;

  var aPossiblePrototype$1 = function (argument) {
    if (typeof argument == 'object' || isCallable$a(argument)) return argument;
    throw $TypeError$a("Can't set " + $String$1(argument) + ' as a prototype');
  };

  /* eslint-disable no-proto -- safe */

  var uncurryThisAccessor = functionUncurryThisAccessor;
  var anObject$9 = anObject$c;
  var aPossiblePrototype = aPossiblePrototype$1;

  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es/no-object-setprototypeof -- safe
  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
      setter(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) { /* empty */ }
    return function setPrototypeOf(O, proto) {
      anObject$9(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var defineProperty$3 = objectDefineProperty.f;
  var hasOwn$4 = hasOwnProperty_1;
  var wellKnownSymbol$g = wellKnownSymbol$k;

  var TO_STRING_TAG$1 = wellKnownSymbol$g('toStringTag');

  var setToStringTag$4 = function (target, TAG, STATIC) {
    if (target && !STATIC) target = target.prototype;
    if (target && !hasOwn$4(target, TO_STRING_TAG$1)) {
      defineProperty$3(target, TO_STRING_TAG$1, { configurable: true, value: TAG });
    }
  };

  var getBuiltIn$4 = getBuiltIn$7;
  var defineBuiltInAccessor$1 = defineBuiltInAccessor$3;
  var wellKnownSymbol$f = wellKnownSymbol$k;
  var DESCRIPTORS$4 = descriptors;

  var SPECIES$5 = wellKnownSymbol$f('species');

  var setSpecies$2 = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn$4(CONSTRUCTOR_NAME);

    if (DESCRIPTORS$4 && Constructor && !Constructor[SPECIES$5]) {
      defineBuiltInAccessor$1(Constructor, SPECIES$5, {
        configurable: true,
        get: function () { return this; }
      });
    }
  };

  var isPrototypeOf$1 = objectIsPrototypeOf;

  var $TypeError$9 = TypeError;

  var anInstance$4 = function (it, Prototype) {
    if (isPrototypeOf$1(Prototype, it)) return it;
    throw $TypeError$9('Incorrect invocation');
  };

  var uncurryThis$e = functionUncurryThis;
  var fails$f = fails$p;
  var isCallable$9 = isCallable$m;
  var classof$6 = classof$9;
  var getBuiltIn$3 = getBuiltIn$7;
  var inspectSource$1 = inspectSource$3;

  var noop = function () { /* empty */ };
  var empty = [];
  var construct = getBuiltIn$3('Reflect', 'construct');
  var constructorRegExp = /^\s*(?:class|function)\b/;
  var exec$1 = uncurryThis$e(constructorRegExp.exec);
  var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

  var isConstructorModern = function isConstructor(argument) {
    if (!isCallable$9(argument)) return false;
    try {
      construct(noop, empty, argument);
      return true;
    } catch (error) {
      return false;
    }
  };

  var isConstructorLegacy = function isConstructor(argument) {
    if (!isCallable$9(argument)) return false;
    switch (classof$6(argument)) {
      case 'AsyncFunction':
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction': return false;
    }
    try {
      // we can't check .prototype since constructors produced by .bind haven't it
      // `Function#toString` throws on some built-it function in some legacy engines
      // (for example, `DOMQuad` and similar in FF41-)
      return INCORRECT_TO_STRING || !!exec$1(constructorRegExp, inspectSource$1(argument));
    } catch (error) {
      return true;
    }
  };

  isConstructorLegacy.sham = true;

  // `IsConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-isconstructor
  var isConstructor$4 = !construct || fails$f(function () {
    var called;
    return isConstructorModern(isConstructorModern.call)
      || !isConstructorModern(Object)
      || !isConstructorModern(function () { called = true; })
      || called;
  }) ? isConstructorLegacy : isConstructorModern;

  var isConstructor$3 = isConstructor$4;
  var tryToString$3 = tryToString$5;

  var $TypeError$8 = TypeError;

  // `Assert: IsConstructor(argument) is true`
  var aConstructor$1 = function (argument) {
    if (isConstructor$3(argument)) return argument;
    throw $TypeError$8(tryToString$3(argument) + ' is not a constructor');
  };

  var anObject$8 = anObject$c;
  var aConstructor = aConstructor$1;
  var isNullOrUndefined$4 = isNullOrUndefined$7;
  var wellKnownSymbol$e = wellKnownSymbol$k;

  var SPECIES$4 = wellKnownSymbol$e('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor
  var speciesConstructor$1 = function (O, defaultConstructor) {
    var C = anObject$8(O).constructor;
    var S;
    return C === undefined || isNullOrUndefined$4(S = anObject$8(C)[SPECIES$4]) ? defaultConstructor : aConstructor(S);
  };

  var NATIVE_BIND$1 = functionBindNative;

  var FunctionPrototype = Function.prototype;
  var apply$1 = FunctionPrototype.apply;
  var call$a = FunctionPrototype.call;

  // eslint-disable-next-line es/no-reflect -- safe
  var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$1 ? call$a.bind(apply$1) : function () {
    return call$a.apply(apply$1, arguments);
  });

  var classofRaw = classofRaw$2;
  var uncurryThis$d = functionUncurryThis;

  var functionUncurryThisClause = function (fn) {
    // Nashorn bug:
    //   https://github.com/zloirock/core-js/issues/1128
    //   https://github.com/zloirock/core-js/issues/1130
    if (classofRaw(fn) === 'Function') return uncurryThis$d(fn);
  };

  var uncurryThis$c = functionUncurryThisClause;
  var aCallable$8 = aCallable$b;
  var NATIVE_BIND = functionBindNative;

  var bind$7 = uncurryThis$c(uncurryThis$c.bind);

  // optional / simple context binding
  var functionBindContext = function (fn, that) {
    aCallable$8(fn);
    return that === undefined ? fn : NATIVE_BIND ? bind$7(fn, that) : function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var getBuiltIn$2 = getBuiltIn$7;

  var html$2 = getBuiltIn$2('document', 'documentElement');

  var uncurryThis$b = functionUncurryThis;

  var arraySlice$3 = uncurryThis$b([].slice);

  var $TypeError$7 = TypeError;

  var validateArgumentsLength$1 = function (passed, required) {
    if (passed < required) throw $TypeError$7('Not enough arguments');
    return passed;
  };

  var userAgent$4 = engineUserAgent;

  // eslint-disable-next-line redos/no-vulnerable -- safe
  var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$4);

  var global$9 = global$k;
  var apply = functionApply;
  var bind$6 = functionBindContext;
  var isCallable$8 = isCallable$m;
  var hasOwn$3 = hasOwnProperty_1;
  var fails$e = fails$p;
  var html$1 = html$2;
  var arraySlice$2 = arraySlice$3;
  var createElement = documentCreateElement$2;
  var validateArgumentsLength = validateArgumentsLength$1;
  var IS_IOS$1 = engineIsIos;
  var IS_NODE$4 = engineIsNode;

  var set = global$9.setImmediate;
  var clear = global$9.clearImmediate;
  var process$3 = global$9.process;
  var Dispatch = global$9.Dispatch;
  var Function$1 = global$9.Function;
  var MessageChannel = global$9.MessageChannel;
  var String$1 = global$9.String;
  var counter = 0;
  var queue$2 = {};
  var ONREADYSTATECHANGE = 'onreadystatechange';
  var $location, defer, channel, port;

  fails$e(function () {
    // Deno throws a ReferenceError on `location` access without `--location` flag
    $location = global$9.location;
  });

  var run = function (id) {
    if (hasOwn$3(queue$2, id)) {
      var fn = queue$2[id];
      delete queue$2[id];
      fn();
    }
  };

  var runner = function (id) {
    return function () {
      run(id);
    };
  };

  var eventListener = function (event) {
    run(event.data);
  };

  var globalPostMessageDefer = function (id) {
    // old engines have not location.origin
    global$9.postMessage(String$1(id), $location.protocol + '//' + $location.host);
  };

  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if (!set || !clear) {
    set = function setImmediate(handler) {
      validateArgumentsLength(arguments.length, 1);
      var fn = isCallable$8(handler) ? handler : Function$1(handler);
      var args = arraySlice$2(arguments, 1);
      queue$2[++counter] = function () {
        apply(fn, undefined, args);
      };
      defer(counter);
      return counter;
    };
    clear = function clearImmediate(id) {
      delete queue$2[id];
    };
    // Node.js 0.8-
    if (IS_NODE$4) {
      defer = function (id) {
        process$3.nextTick(runner(id));
      };
    // Sphere (JS game engine) Dispatch API
    } else if (Dispatch && Dispatch.now) {
      defer = function (id) {
        Dispatch.now(runner(id));
      };
    // Browsers with MessageChannel, includes WebWorkers
    // except iOS - https://github.com/zloirock/core-js/issues/624
    } else if (MessageChannel && !IS_IOS$1) {
      channel = new MessageChannel();
      port = channel.port2;
      channel.port1.onmessage = eventListener;
      defer = bind$6(port.postMessage, port);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (
      global$9.addEventListener &&
      isCallable$8(global$9.postMessage) &&
      !global$9.importScripts &&
      $location && $location.protocol !== 'file:' &&
      !fails$e(globalPostMessageDefer)
    ) {
      defer = globalPostMessageDefer;
      global$9.addEventListener('message', eventListener, false);
    // IE8-
    } else if (ONREADYSTATECHANGE in createElement('script')) {
      defer = function (id) {
        html$1.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
          html$1.removeChild(this);
          run(id);
        };
      };
    // Rest old browsers
    } else {
      defer = function (id) {
        setTimeout(runner(id), 0);
      };
    }
  }

  var task$1 = {
    set: set,
    clear: clear
  };

  var Queue$2 = function () {
    this.head = null;
    this.tail = null;
  };

  Queue$2.prototype = {
    add: function (item) {
      var entry = { item: item, next: null };
      var tail = this.tail;
      if (tail) tail.next = entry;
      else this.head = entry;
      this.tail = entry;
    },
    get: function () {
      var entry = this.head;
      if (entry) {
        var next = this.head = entry.next;
        if (next === null) this.tail = null;
        return entry.item;
      }
    }
  };

  var queue$1 = Queue$2;

  var userAgent$3 = engineUserAgent;

  var engineIsIosPebble = /ipad|iphone|ipod/i.test(userAgent$3) && typeof Pebble != 'undefined';

  var userAgent$2 = engineUserAgent;

  var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent$2);

  var global$8 = global$k;
  var bind$5 = functionBindContext;
  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
  var macrotask = task$1.set;
  var Queue$1 = queue$1;
  var IS_IOS = engineIsIos;
  var IS_IOS_PEBBLE = engineIsIosPebble;
  var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
  var IS_NODE$3 = engineIsNode;

  var MutationObserver = global$8.MutationObserver || global$8.WebKitMutationObserver;
  var document$2 = global$8.document;
  var process$2 = global$8.process;
  var Promise$1 = global$8.Promise;
  // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
  var queueMicrotaskDescriptor = getOwnPropertyDescriptor$1(global$8, 'queueMicrotask');
  var microtask$1 = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
  var notify$1, toggle, node, promise, then;

  // modern engines have queueMicrotask method
  if (!microtask$1) {
    var queue = new Queue$1();

    var flush = function () {
      var parent, fn;
      if (IS_NODE$3 && (parent = process$2.domain)) parent.exit();
      while (fn = queue.get()) try {
        fn();
      } catch (error) {
        if (queue.head) notify$1();
        throw error;
      }
      if (parent) parent.enter();
    };

    // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
    // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
    if (!IS_IOS && !IS_NODE$3 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
      toggle = true;
      node = document$2.createTextNode('');
      new MutationObserver(flush).observe(node, { characterData: true });
      notify$1 = function () {
        node.data = toggle = !toggle;
      };
    // environments with maybe non-completely correct, but existent Promise
    } else if (!IS_IOS_PEBBLE && Promise$1 && Promise$1.resolve) {
      // Promise.resolve without an argument throws an error in LG WebOS 2
      promise = Promise$1.resolve(undefined);
      // workaround of WebKit ~ iOS Safari 10.1 bug
      promise.constructor = Promise$1;
      then = bind$5(promise.then, promise);
      notify$1 = function () {
        then(flush);
      };
    // Node.js without promises
    } else if (IS_NODE$3) {
      notify$1 = function () {
        process$2.nextTick(flush);
      };
    // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessage
    // - onreadystatechange
    // - setTimeout
    } else {
      // `webpack` dev server bug on IE global methods - use bind(fn, global)
      macrotask = bind$5(macrotask, global$8);
      notify$1 = function () {
        macrotask(flush);
      };
    }

    microtask$1 = function (fn) {
      if (!queue.head) notify$1();
      queue.add(fn);
    };
  }

  var microtask_1 = microtask$1;

  var hostReportErrors$1 = function (a, b) {
    try {
      // eslint-disable-next-line no-console -- safe
      arguments.length == 1 ? console.error(a) : console.error(a, b);
    } catch (error) { /* empty */ }
  };

  var perform$4 = function (exec) {
    try {
      return { error: false, value: exec() };
    } catch (error) {
      return { error: true, value: error };
    }
  };

  var global$7 = global$k;

  var promiseNativeConstructor = global$7.Promise;

  /* global Deno -- Deno case */

  var engineIsDeno = typeof Deno == 'object' && Deno && typeof Deno.version == 'object';

  var IS_DENO$1 = engineIsDeno;
  var IS_NODE$2 = engineIsNode;

  var engineIsBrowser = !IS_DENO$1 && !IS_NODE$2
    && typeof window == 'object'
    && typeof document == 'object';

  var global$6 = global$k;
  var NativePromiseConstructor$3 = promiseNativeConstructor;
  var isCallable$7 = isCallable$m;
  var isForced$1 = isForced_1;
  var inspectSource = inspectSource$3;
  var wellKnownSymbol$d = wellKnownSymbol$k;
  var IS_BROWSER = engineIsBrowser;
  var IS_DENO = engineIsDeno;
  var V8_VERSION$2 = engineV8Version;

  NativePromiseConstructor$3 && NativePromiseConstructor$3.prototype;
  var SPECIES$3 = wellKnownSymbol$d('species');
  var SUBCLASSING = false;
  var NATIVE_PROMISE_REJECTION_EVENT$1 = isCallable$7(global$6.PromiseRejectionEvent);

  var FORCED_PROMISE_CONSTRUCTOR$5 = isForced$1('Promise', function () {
    var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor$3);
    var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor$3);
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION$2 === 66) return true;
    // We can't use @@species feature detection in V8 since it causes
    // deoptimization and performance degradation
    // https://github.com/zloirock/core-js/issues/679
    if (!V8_VERSION$2 || V8_VERSION$2 < 51 || !/native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) {
      // Detect correctness of subclassing with @@species support
      var promise = new NativePromiseConstructor$3(function (resolve) { resolve(1); });
      var FakePromise = function (exec) {
        exec(function () { /* empty */ }, function () { /* empty */ });
      };
      var constructor = promise.constructor = {};
      constructor[SPECIES$3] = FakePromise;
      SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
      if (!SUBCLASSING) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    } return !GLOBAL_CORE_JS_PROMISE && (IS_BROWSER || IS_DENO) && !NATIVE_PROMISE_REJECTION_EVENT$1;
  });

  var promiseConstructorDetection = {
    CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR$5,
    REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT$1,
    SUBCLASSING: SUBCLASSING
  };

  var newPromiseCapability$2 = {};

  var aCallable$7 = aCallable$b;

  var $TypeError$6 = TypeError;

  var PromiseCapability = function (C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw $TypeError$6('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = aCallable$7(resolve);
    this.reject = aCallable$7(reject);
  };

  // `NewPromiseCapability` abstract operation
  // https://tc39.es/ecma262/#sec-newpromisecapability
  newPromiseCapability$2.f = function (C) {
    return new PromiseCapability(C);
  };

  var $$n = _export;
  var IS_NODE$1 = engineIsNode;
  var global$5 = global$k;
  var call$9 = functionCall;
  var defineBuiltIn$5 = defineBuiltIn$8;
  var setPrototypeOf$2 = objectSetPrototypeOf;
  var setToStringTag$3 = setToStringTag$4;
  var setSpecies$1 = setSpecies$2;
  var aCallable$6 = aCallable$b;
  var isCallable$6 = isCallable$m;
  var isObject$c = isObject$i;
  var anInstance$3 = anInstance$4;
  var speciesConstructor = speciesConstructor$1;
  var task = task$1.set;
  var microtask = microtask_1;
  var hostReportErrors = hostReportErrors$1;
  var perform$3 = perform$4;
  var Queue = queue$1;
  var InternalStateModule$4 = internalState;
  var NativePromiseConstructor$2 = promiseNativeConstructor;
  var PromiseConstructorDetection = promiseConstructorDetection;
  var newPromiseCapabilityModule$4 = newPromiseCapability$2;

  var PROMISE = 'Promise';
  var FORCED_PROMISE_CONSTRUCTOR$4 = PromiseConstructorDetection.CONSTRUCTOR;
  var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
  var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
  var getInternalPromiseState = InternalStateModule$4.getterFor(PROMISE);
  var setInternalState$4 = InternalStateModule$4.set;
  var NativePromisePrototype$1 = NativePromiseConstructor$2 && NativePromiseConstructor$2.prototype;
  var PromiseConstructor = NativePromiseConstructor$2;
  var PromisePrototype = NativePromisePrototype$1;
  var TypeError$1 = global$5.TypeError;
  var document$1 = global$5.document;
  var process$1 = global$5.process;
  var newPromiseCapability$1 = newPromiseCapabilityModule$4.f;
  var newGenericPromiseCapability = newPromiseCapability$1;

  var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$5.dispatchEvent);
  var UNHANDLED_REJECTION = 'unhandledrejection';
  var REJECTION_HANDLED = 'rejectionhandled';
  var PENDING = 0;
  var FULFILLED = 1;
  var REJECTED = 2;
  var HANDLED = 1;
  var UNHANDLED = 2;

  var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

  // helpers
  var isThenable = function (it) {
    var then;
    return isObject$c(it) && isCallable$6(then = it.then) ? then : false;
  };

  var callReaction = function (reaction, state) {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var handler = ok ? reaction.ok : reaction.fail;
    var resolve = reaction.resolve;
    var reject = reaction.reject;
    var domain = reaction.domain;
    var result, then, exited;
    try {
      if (handler) {
        if (!ok) {
          if (state.rejection === UNHANDLED) onHandleUnhandled(state);
          state.rejection = HANDLED;
        }
        if (handler === true) result = value;
        else {
          if (domain) domain.enter();
          result = handler(value); // can throw
          if (domain) {
            domain.exit();
            exited = true;
          }
        }
        if (result === reaction.promise) {
          reject(TypeError$1('Promise-chain cycle'));
        } else if (then = isThenable(result)) {
          call$9(then, result, resolve, reject);
        } else resolve(result);
      } else reject(value);
    } catch (error) {
      if (domain && !exited) domain.exit();
      reject(error);
    }
  };

  var notify = function (state, isReject) {
    if (state.notified) return;
    state.notified = true;
    microtask(function () {
      var reactions = state.reactions;
      var reaction;
      while (reaction = reactions.get()) {
        callReaction(reaction, state);
      }
      state.notified = false;
      if (isReject && !state.rejection) onUnhandled(state);
    });
  };

  var dispatchEvent = function (name, promise, reason) {
    var event, handler;
    if (DISPATCH_EVENT) {
      event = document$1.createEvent('Event');
      event.promise = promise;
      event.reason = reason;
      event.initEvent(name, false, true);
      global$5.dispatchEvent(event);
    } else event = { promise: promise, reason: reason };
    if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = global$5['on' + name])) handler(event);
    else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
  };

  var onUnhandled = function (state) {
    call$9(task, global$5, function () {
      var promise = state.facade;
      var value = state.value;
      var IS_UNHANDLED = isUnhandled(state);
      var result;
      if (IS_UNHANDLED) {
        result = perform$3(function () {
          if (IS_NODE$1) {
            process$1.emit('unhandledRejection', value, promise);
          } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
        });
        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
        state.rejection = IS_NODE$1 || isUnhandled(state) ? UNHANDLED : HANDLED;
        if (result.error) throw result.value;
      }
    });
  };

  var isUnhandled = function (state) {
    return state.rejection !== HANDLED && !state.parent;
  };

  var onHandleUnhandled = function (state) {
    call$9(task, global$5, function () {
      var promise = state.facade;
      if (IS_NODE$1) {
        process$1.emit('rejectionHandled', promise);
      } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
    });
  };

  var bind$4 = function (fn, state, unwrap) {
    return function (value) {
      fn(state, value, unwrap);
    };
  };

  var internalReject = function (state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    state.value = value;
    state.state = REJECTED;
    notify(state, true);
  };

  var internalResolve = function (state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    try {
      if (state.facade === value) throw TypeError$1("Promise can't be resolved itself");
      var then = isThenable(value);
      if (then) {
        microtask(function () {
          var wrapper = { done: false };
          try {
            call$9(then, value,
              bind$4(internalResolve, wrapper, state),
              bind$4(internalReject, wrapper, state)
            );
          } catch (error) {
            internalReject(wrapper, error, state);
          }
        });
      } else {
        state.value = value;
        state.state = FULFILLED;
        notify(state, false);
      }
    } catch (error) {
      internalReject({ done: false }, error, state);
    }
  };

  // constructor polyfill
  if (FORCED_PROMISE_CONSTRUCTOR$4) {
    // 25.4.3.1 Promise(executor)
    PromiseConstructor = function Promise(executor) {
      anInstance$3(this, PromisePrototype);
      aCallable$6(executor);
      call$9(Internal, this);
      var state = getInternalPromiseState(this);
      try {
        executor(bind$4(internalResolve, state), bind$4(internalReject, state));
      } catch (error) {
        internalReject(state, error);
      }
    };

    PromisePrototype = PromiseConstructor.prototype;

    // eslint-disable-next-line no-unused-vars -- required for `.length`
    Internal = function Promise(executor) {
      setInternalState$4(this, {
        type: PROMISE,
        done: false,
        notified: false,
        parent: false,
        reactions: new Queue(),
        rejection: false,
        state: PENDING,
        value: undefined
      });
    };

    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    Internal.prototype = defineBuiltIn$5(PromisePrototype, 'then', function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
      state.parent = true;
      reaction.ok = isCallable$6(onFulfilled) ? onFulfilled : true;
      reaction.fail = isCallable$6(onRejected) && onRejected;
      reaction.domain = IS_NODE$1 ? process$1.domain : undefined;
      if (state.state == PENDING) state.reactions.add(reaction);
      else microtask(function () {
        callReaction(reaction, state);
      });
      return reaction.promise;
    });

    OwnPromiseCapability = function () {
      var promise = new Internal();
      var state = getInternalPromiseState(promise);
      this.promise = promise;
      this.resolve = bind$4(internalResolve, state);
      this.reject = bind$4(internalReject, state);
    };

    newPromiseCapabilityModule$4.f = newPromiseCapability$1 = function (C) {
      return C === PromiseConstructor || C === PromiseWrapper
        ? new OwnPromiseCapability(C)
        : newGenericPromiseCapability(C);
    };

    if (isCallable$6(NativePromiseConstructor$2) && NativePromisePrototype$1 !== Object.prototype) {
      nativeThen = NativePromisePrototype$1.then;

      if (!NATIVE_PROMISE_SUBCLASSING) {
        // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
        defineBuiltIn$5(NativePromisePrototype$1, 'then', function then(onFulfilled, onRejected) {
          var that = this;
          return new PromiseConstructor(function (resolve, reject) {
            call$9(nativeThen, that, resolve, reject);
          }).then(onFulfilled, onRejected);
        // https://github.com/zloirock/core-js/issues/640
        }, { unsafe: true });
      }

      // make `.constructor === Promise` work for native promise-based APIs
      try {
        delete NativePromisePrototype$1.constructor;
      } catch (error) { /* empty */ }

      // make `instanceof Promise` work for native promise-based APIs
      if (setPrototypeOf$2) {
        setPrototypeOf$2(NativePromisePrototype$1, PromisePrototype);
      }
    }
  }

  $$n({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR$4 }, {
    Promise: PromiseConstructor
  });

  setToStringTag$3(PromiseConstructor, PROMISE, false);
  setSpecies$1(PROMISE);

  var iterators = {};

  var wellKnownSymbol$c = wellKnownSymbol$k;
  var Iterators$4 = iterators;

  var ITERATOR$6 = wellKnownSymbol$c('iterator');
  var ArrayPrototype$1 = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod$2 = function (it) {
    return it !== undefined && (Iterators$4.Array === it || ArrayPrototype$1[ITERATOR$6] === it);
  };

  var classof$5 = classof$9;
  var getMethod$1 = getMethod$3;
  var isNullOrUndefined$3 = isNullOrUndefined$7;
  var Iterators$3 = iterators;
  var wellKnownSymbol$b = wellKnownSymbol$k;

  var ITERATOR$5 = wellKnownSymbol$b('iterator');

  var getIteratorMethod$3 = function (it) {
    if (!isNullOrUndefined$3(it)) return getMethod$1(it, ITERATOR$5)
      || getMethod$1(it, '@@iterator')
      || Iterators$3[classof$5(it)];
  };

  var call$8 = functionCall;
  var aCallable$5 = aCallable$b;
  var anObject$7 = anObject$c;
  var tryToString$2 = tryToString$5;
  var getIteratorMethod$2 = getIteratorMethod$3;

  var $TypeError$5 = TypeError;

  var getIterator$2 = function (argument, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod$2(argument) : usingIterator;
    if (aCallable$5(iteratorMethod)) return anObject$7(call$8(iteratorMethod, argument));
    throw $TypeError$5(tryToString$2(argument) + ' is not iterable');
  };

  var call$7 = functionCall;
  var anObject$6 = anObject$c;
  var getMethod = getMethod$3;

  var iteratorClose$2 = function (iterator, kind, value) {
    var innerResult, innerError;
    anObject$6(iterator);
    try {
      innerResult = getMethod(iterator, 'return');
      if (!innerResult) {
        if (kind === 'throw') throw value;
        return value;
      }
      innerResult = call$7(innerResult, iterator);
    } catch (error) {
      innerError = true;
      innerResult = error;
    }
    if (kind === 'throw') throw value;
    if (innerError) throw innerResult;
    anObject$6(innerResult);
    return value;
  };

  var bind$3 = functionBindContext;
  var call$6 = functionCall;
  var anObject$5 = anObject$c;
  var tryToString$1 = tryToString$5;
  var isArrayIteratorMethod$1 = isArrayIteratorMethod$2;
  var lengthOfArrayLike$7 = lengthOfArrayLike$9;
  var isPrototypeOf = objectIsPrototypeOf;
  var getIterator$1 = getIterator$2;
  var getIteratorMethod$1 = getIteratorMethod$3;
  var iteratorClose$1 = iteratorClose$2;

  var $TypeError$4 = TypeError;

  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var ResultPrototype = Result.prototype;

  var iterate$6 = function (iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_RECORD = !!(options && options.IS_RECORD);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = bind$3(unboundFunction, that);
    var iterator, iterFn, index, length, result, next, step;

    var stop = function (condition) {
      if (iterator) iteratorClose$1(iterator, 'normal', condition);
      return new Result(true, condition);
    };

    var callFn = function (value) {
      if (AS_ENTRIES) {
        anObject$5(value);
        return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
      } return INTERRUPTED ? fn(value, stop) : fn(value);
    };

    if (IS_RECORD) {
      iterator = iterable.iterator;
    } else if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod$1(iterable);
      if (!iterFn) throw $TypeError$4(tryToString$1(iterable) + ' is not iterable');
      // optimisation for array iterators
      if (isArrayIteratorMethod$1(iterFn)) {
        for (index = 0, length = lengthOfArrayLike$7(iterable); length > index; index++) {
          result = callFn(iterable[index]);
          if (result && isPrototypeOf(ResultPrototype, result)) return result;
        } return new Result(false);
      }
      iterator = getIterator$1(iterable, iterFn);
    }

    next = IS_RECORD ? iterable.next : iterator.next;
    while (!(step = call$6(next, iterator)).done) {
      try {
        result = callFn(step.value);
      } catch (error) {
        iteratorClose$1(iterator, 'throw', error);
      }
      if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
    } return new Result(false);
  };

  var wellKnownSymbol$a = wellKnownSymbol$k;

  var ITERATOR$4 = wellKnownSymbol$a('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return { done: !!called++ };
      },
      'return': function () {
        SAFE_CLOSING = true;
      }
    };
    iteratorWithReturn[ITERATOR$4] = function () {
      return this;
    };
    // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
    Array.from(iteratorWithReturn, function () { throw 2; });
  } catch (error) { /* empty */ }

  var checkCorrectnessOfIteration$3 = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR$4] = function () {
        return {
          next: function () {
            return { done: ITERATION_SUPPORT = true };
          }
        };
      };
      exec(object);
    } catch (error) { /* empty */ }
    return ITERATION_SUPPORT;
  };

  var NativePromiseConstructor$1 = promiseNativeConstructor;
  var checkCorrectnessOfIteration$2 = checkCorrectnessOfIteration$3;
  var FORCED_PROMISE_CONSTRUCTOR$3 = promiseConstructorDetection.CONSTRUCTOR;

  var promiseStaticsIncorrectIteration = FORCED_PROMISE_CONSTRUCTOR$3 || !checkCorrectnessOfIteration$2(function (iterable) {
    NativePromiseConstructor$1.all(iterable).then(undefined, function () { /* empty */ });
  });

  var $$m = _export;
  var call$5 = functionCall;
  var aCallable$4 = aCallable$b;
  var newPromiseCapabilityModule$3 = newPromiseCapability$2;
  var perform$2 = perform$4;
  var iterate$5 = iterate$6;
  var PROMISE_STATICS_INCORRECT_ITERATION$2 = promiseStaticsIncorrectIteration;

  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  $$m({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION$2 }, {
    all: function all(iterable) {
      var C = this;
      var capability = newPromiseCapabilityModule$3.f(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = perform$2(function () {
        var $promiseResolve = aCallable$4(C.resolve);
        var values = [];
        var counter = 0;
        var remaining = 1;
        iterate$5(iterable, function (promise) {
          var index = counter++;
          var alreadyCalled = false;
          remaining++;
          call$5($promiseResolve, C, promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[index] = value;
            --remaining || resolve(values);
          }, reject);
        });
        --remaining || resolve(values);
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

  var $$l = _export;
  var FORCED_PROMISE_CONSTRUCTOR$2 = promiseConstructorDetection.CONSTRUCTOR;
  var NativePromiseConstructor = promiseNativeConstructor;
  var getBuiltIn$1 = getBuiltIn$7;
  var isCallable$5 = isCallable$m;
  var defineBuiltIn$4 = defineBuiltIn$8;

  var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

  // `Promise.prototype.catch` method
  // https://tc39.es/ecma262/#sec-promise.prototype.catch
  $$l({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR$2, real: true }, {
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });

  // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
  if (isCallable$5(NativePromiseConstructor)) {
    var method = getBuiltIn$1('Promise').prototype['catch'];
    if (NativePromisePrototype['catch'] !== method) {
      defineBuiltIn$4(NativePromisePrototype, 'catch', method, { unsafe: true });
    }
  }

  var $$k = _export;
  var call$4 = functionCall;
  var aCallable$3 = aCallable$b;
  var newPromiseCapabilityModule$2 = newPromiseCapability$2;
  var perform$1 = perform$4;
  var iterate$4 = iterate$6;
  var PROMISE_STATICS_INCORRECT_ITERATION$1 = promiseStaticsIncorrectIteration;

  // `Promise.race` method
  // https://tc39.es/ecma262/#sec-promise.race
  $$k({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION$1 }, {
    race: function race(iterable) {
      var C = this;
      var capability = newPromiseCapabilityModule$2.f(C);
      var reject = capability.reject;
      var result = perform$1(function () {
        var $promiseResolve = aCallable$3(C.resolve);
        iterate$4(iterable, function (promise) {
          call$4($promiseResolve, C, promise).then(capability.resolve, reject);
        });
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

  var $$j = _export;
  var call$3 = functionCall;
  var newPromiseCapabilityModule$1 = newPromiseCapability$2;
  var FORCED_PROMISE_CONSTRUCTOR$1 = promiseConstructorDetection.CONSTRUCTOR;

  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  $$j({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR$1 }, {
    reject: function reject(r) {
      var capability = newPromiseCapabilityModule$1.f(this);
      call$3(capability.reject, undefined, r);
      return capability.promise;
    }
  });

  var anObject$4 = anObject$c;
  var isObject$b = isObject$i;
  var newPromiseCapability = newPromiseCapability$2;

  var promiseResolve$1 = function (C, x) {
    anObject$4(C);
    if (isObject$b(x) && x.constructor === C) return x;
    var promiseCapability = newPromiseCapability.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  var $$i = _export;
  var getBuiltIn = getBuiltIn$7;
  var FORCED_PROMISE_CONSTRUCTOR = promiseConstructorDetection.CONSTRUCTOR;
  var promiseResolve = promiseResolve$1;

  getBuiltIn('Promise');

  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  $$i({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
    resolve: function resolve(x) {
      return promiseResolve(this, x);
    }
  });

  var objectDefineProperties = {};

  var DESCRIPTORS$3 = descriptors;
  var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
  var definePropertyModule$1 = objectDefineProperty;
  var anObject$3 = anObject$c;
  var toIndexedObject$5 = toIndexedObject$9;
  var objectKeys$1 = objectKeys$3;

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  objectDefineProperties.f = DESCRIPTORS$3 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$3(O);
    var props = toIndexedObject$5(Properties);
    var keys = objectKeys$1(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) definePropertyModule$1.f(O, key = keys[index++], props[key]);
    return O;
  };

  /* global ActiveXObject -- old IE, WSH */

  var anObject$2 = anObject$c;
  var definePropertiesModule = objectDefineProperties;
  var enumBugKeys = enumBugKeys$3;
  var hiddenKeys$1 = hiddenKeys$5;
  var html = html$2;
  var documentCreateElement$1 = documentCreateElement$2;
  var sharedKey$1 = sharedKey$3;

  var GT = '>';
  var LT = '<';
  var PROTOTYPE = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO$1 = sharedKey$1('IE_PROTO');

  var EmptyConstructor = function () { /* empty */ };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement$1('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      activeXDocument = new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject = typeof document != 'undefined'
      ? document.domain && activeXDocument
        ? NullProtoObjectViaActiveX(activeXDocument) // old IE
        : NullProtoObjectViaIFrame()
      : NullProtoObjectViaActiveX(activeXDocument); // WSH
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys$1[IE_PROTO$1] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  // eslint-disable-next-line es/no-object-create -- safe
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject$2(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
  };

  var wellKnownSymbol$9 = wellKnownSymbol$k;
  var create$2 = objectCreate;
  var defineProperty$2 = objectDefineProperty.f;

  var UNSCOPABLES = wellKnownSymbol$9('unscopables');
  var ArrayPrototype = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype[UNSCOPABLES] == undefined) {
    defineProperty$2(ArrayPrototype, UNSCOPABLES, {
      configurable: true,
      value: create$2(null)
    });
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables$2 = function (key) {
    ArrayPrototype[UNSCOPABLES][key] = true;
  };

  var fails$d = fails$p;

  var correctPrototypeGetter = !fails$d(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var hasOwn$2 = hasOwnProperty_1;
  var isCallable$4 = isCallable$m;
  var toObject$6 = toObject$9;
  var sharedKey = sharedKey$3;
  var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

  var IE_PROTO = sharedKey('IE_PROTO');
  var $Object = Object;
  var ObjectPrototype = $Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  // eslint-disable-next-line es/no-object-getprototypeof -- safe
  var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
    var object = toObject$6(O);
    if (hasOwn$2(object, IE_PROTO)) return object[IE_PROTO];
    var constructor = object.constructor;
    if (isCallable$4(constructor) && object instanceof constructor) {
      return constructor.prototype;
    } return object instanceof $Object ? ObjectPrototype : null;
  };

  var fails$c = fails$p;
  var isCallable$3 = isCallable$m;
  var isObject$a = isObject$i;
  var getPrototypeOf$1 = objectGetPrototypeOf;
  var defineBuiltIn$3 = defineBuiltIn$8;
  var wellKnownSymbol$8 = wellKnownSymbol$k;

  var ITERATOR$3 = wellKnownSymbol$8('iterator');
  var BUGGY_SAFARI_ITERATORS$1 = false;

  // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

  /* eslint-disable es/no-array-prototype-keys -- safe */
  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
    else {
      PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE = !isObject$a(IteratorPrototype$2) || fails$c(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype$2[ITERATOR$3].call(test) !== test;
  });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

  // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
  if (!isCallable$3(IteratorPrototype$2[ITERATOR$3])) {
    defineBuiltIn$3(IteratorPrototype$2, ITERATOR$3, function () {
      return this;
    });
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$2,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
  var create$1 = objectCreate;
  var createPropertyDescriptor$1 = createPropertyDescriptor$4;
  var setToStringTag$2 = setToStringTag$4;
  var Iterators$2 = iterators;

  var returnThis$1 = function () { return this; };

  var iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create$1(IteratorPrototype$1, { next: createPropertyDescriptor$1(+!ENUMERABLE_NEXT, next) });
    setToStringTag$2(IteratorConstructor, TO_STRING_TAG, false);
    Iterators$2[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var $$h = _export;
  var call$2 = functionCall;
  var FunctionName = functionName;
  var isCallable$2 = isCallable$m;
  var createIteratorConstructor = iteratorCreateConstructor;
  var getPrototypeOf = objectGetPrototypeOf;
  var setPrototypeOf$1 = objectSetPrototypeOf;
  var setToStringTag$1 = setToStringTag$4;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$5;
  var defineBuiltIn$2 = defineBuiltIn$8;
  var wellKnownSymbol$7 = wellKnownSymbol$k;
  var Iterators$1 = iterators;
  var IteratorsCore = iteratorsCore;

  var PROPER_FUNCTION_NAME$1 = FunctionName.PROPER;
  var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
  var IteratorPrototype = IteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$2 = wellKnownSymbol$7('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis = function () { return this; };

  var iteratorDefine = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
      switch (KIND) {
        case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
        case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
        case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
      } return function () { return new IteratorConstructor(this); };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR$2]
      || IterablePrototype['@@iterator']
      || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
      if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
          if (setPrototypeOf$1) {
            setPrototypeOf$1(CurrentIteratorPrototype, IteratorPrototype);
          } else if (!isCallable$2(CurrentIteratorPrototype[ITERATOR$2])) {
            defineBuiltIn$2(CurrentIteratorPrototype, ITERATOR$2, returnThis);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag$1(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
    if (PROPER_FUNCTION_NAME$1 && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      if (CONFIGURABLE_FUNCTION_NAME) {
        createNonEnumerableProperty$2(IterablePrototype, 'name', VALUES);
      } else {
        INCORRECT_VALUES_NAME = true;
        defaultIterator = function values() { return call$2(nativeIterator, this); };
      }
    }

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          defineBuiltIn$2(IterablePrototype, KEY, methods[KEY]);
        }
      } else $$h({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
    }

    // define iterator
    if (IterablePrototype[ITERATOR$2] !== defaultIterator) {
      defineBuiltIn$2(IterablePrototype, ITERATOR$2, defaultIterator, { name: DEFAULT });
    }
    Iterators$1[NAME] = defaultIterator;

    return methods;
  };

  // `CreateIterResultObject` abstract operation
  // https://tc39.es/ecma262/#sec-createiterresultobject
  var createIterResultObject$3 = function (value, done) {
    return { value: value, done: done };
  };

  var toIndexedObject$4 = toIndexedObject$9;
  var addToUnscopables$1 = addToUnscopables$2;
  var Iterators = iterators;
  var InternalStateModule$3 = internalState;
  var defineProperty$1 = objectDefineProperty.f;
  var defineIterator$2 = iteratorDefine;
  var createIterResultObject$2 = createIterResultObject$3;
  var DESCRIPTORS$2 = descriptors;

  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$3 = InternalStateModule$3.set;
  var getInternalState$1 = InternalStateModule$3.getterFor(ARRAY_ITERATOR);

  // `Array.prototype.entries` method
  // https://tc39.es/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.es/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.es/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.es/ecma262/#sec-createarrayiterator
  var es_array_iterator = defineIterator$2(Array, 'Array', function (iterated, kind) {
    setInternalState$3(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject$4(iterated), // target
      index: 0,                          // next index
      kind: kind                         // kind
    });
  // `%ArrayIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
  }, function () {
    var state = getInternalState$1(this);
    var target = state.target;
    var kind = state.kind;
    var index = state.index++;
    if (!target || index >= target.length) {
      state.target = undefined;
      return createIterResultObject$2(undefined, true);
    }
    if (kind == 'keys') return createIterResultObject$2(index, false);
    if (kind == 'values') return createIterResultObject$2(target[index], false);
    return createIterResultObject$2([index, target[index]], false);
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.es/ecma262/#sec-createmappedargumentsobject
  var values = Iterators.Arguments = Iterators.Array;

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables$1('keys');
  addToUnscopables$1('values');
  addToUnscopables$1('entries');

  // V8 ~ Chrome 45- bug
  if (DESCRIPTORS$2 && values.name !== 'values') try {
    defineProperty$1(values, 'name', { value: 'values' });
  } catch (error) { /* empty */ }

  var classof$4 = classof$9;

  var $String = String;

  var toString$6 = function (argument) {
    if (classof$4(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
    return $String(argument);
  };

  var uncurryThis$a = functionUncurryThis;
  var toIntegerOrInfinity = toIntegerOrInfinity$3;
  var toString$5 = toString$6;
  var requireObjectCoercible$2 = requireObjectCoercible$5;

  var charAt$1 = uncurryThis$a(''.charAt);
  var charCodeAt = uncurryThis$a(''.charCodeAt);
  var stringSlice$1 = uncurryThis$a(''.slice);

  var createMethod$4 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = toString$5(requireObjectCoercible$2($this));
      var position = toIntegerOrInfinity(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = charCodeAt(S, position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING
            ? charAt$1(S, position)
            : first
          : CONVERT_TO_STRING
            ? stringSlice$1(S, position, position + 2)
            : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$4(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$4(true)
  };

  var charAt = stringMultibyte.charAt;
  var toString$4 = toString$6;
  var InternalStateModule$2 = internalState;
  var defineIterator$1 = iteratorDefine;
  var createIterResultObject$1 = createIterResultObject$3;

  var STRING_ITERATOR = 'String Iterator';
  var setInternalState$2 = InternalStateModule$2.set;
  var getInternalState = InternalStateModule$2.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
  defineIterator$1(String, 'String', function (iterated) {
    setInternalState$2(this, {
      type: STRING_ITERATOR,
      string: toString$4(iterated),
      index: 0
    });
  // `%StringIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return createIterResultObject$1(undefined, true);
    point = charAt(string, index);
    state.index += point.length;
    return createIterResultObject$1(point, false);
  });

  var internalMetadata = {exports: {}};

  var objectGetOwnPropertyNamesExternal = {};

  var toPropertyKey = toPropertyKey$3;
  var definePropertyModule = objectDefineProperty;
  var createPropertyDescriptor = createPropertyDescriptor$4;

  var createProperty$4 = function (object, key, value) {
    var propertyKey = toPropertyKey(key);
    if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
    else object[propertyKey] = value;
  };

  var toAbsoluteIndex$1 = toAbsoluteIndex$3;
  var lengthOfArrayLike$6 = lengthOfArrayLike$9;
  var createProperty$3 = createProperty$4;

  var $Array$3 = Array;
  var max$1 = Math.max;

  var arraySliceSimple = function (O, start, end) {
    var length = lengthOfArrayLike$6(O);
    var k = toAbsoluteIndex$1(start, length);
    var fin = toAbsoluteIndex$1(end === undefined ? length : end, length);
    var result = $Array$3(max$1(fin - k, 0));
    for (var n = 0; k < fin; k++, n++) createProperty$3(result, n, O[k]);
    result.length = n;
    return result;
  };

  /* eslint-disable es/no-object-getownpropertynames -- safe */

  var classof$3 = classofRaw$2;
  var toIndexedObject$3 = toIndexedObject$9;
  var $getOwnPropertyNames = objectGetOwnPropertyNames.f;
  var arraySlice$1 = arraySliceSimple;

  var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
    ? Object.getOwnPropertyNames(window) : [];

  var getWindowNames = function (it) {
    try {
      return $getOwnPropertyNames(it);
    } catch (error) {
      return arraySlice$1(windowNames);
    }
  };

  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
  objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
    return windowNames && classof$3(it) == 'Window'
      ? getWindowNames(it)
      : $getOwnPropertyNames(toIndexedObject$3(it));
  };

  // FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it
  var fails$b = fails$p;

  var arrayBufferNonExtensible = fails$b(function () {
    if (typeof ArrayBuffer == 'function') {
      var buffer = new ArrayBuffer(8);
      // eslint-disable-next-line es/no-object-isextensible, es/no-object-defineproperty -- safe
      if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 });
    }
  });

  var fails$a = fails$p;
  var isObject$9 = isObject$i;
  var classof$2 = classofRaw$2;
  var ARRAY_BUFFER_NON_EXTENSIBLE = arrayBufferNonExtensible;

  // eslint-disable-next-line es/no-object-isextensible -- safe
  var $isExtensible = Object.isExtensible;
  var FAILS_ON_PRIMITIVES$1 = fails$a(function () { $isExtensible(1); });

  // `Object.isExtensible` method
  // https://tc39.es/ecma262/#sec-object.isextensible
  var objectIsExtensible = (FAILS_ON_PRIMITIVES$1 || ARRAY_BUFFER_NON_EXTENSIBLE) ? function isExtensible(it) {
    if (!isObject$9(it)) return false;
    if (ARRAY_BUFFER_NON_EXTENSIBLE && classof$2(it) == 'ArrayBuffer') return false;
    return $isExtensible ? $isExtensible(it) : true;
  } : $isExtensible;

  var fails$9 = fails$p;

  var freezing = !fails$9(function () {
    // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
    return Object.isExtensible(Object.preventExtensions({}));
  });

  var $$g = _export;
  var uncurryThis$9 = functionUncurryThis;
  var hiddenKeys = hiddenKeys$5;
  var isObject$8 = isObject$i;
  var hasOwn$1 = hasOwnProperty_1;
  var defineProperty = objectDefineProperty.f;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertyNamesExternalModule = objectGetOwnPropertyNamesExternal;
  var isExtensible = objectIsExtensible;
  var uid = uid$3;
  var FREEZING = freezing;

  var REQUIRED = false;
  var METADATA = uid('meta');
  var id$1 = 0;

  var setMetadata = function (it) {
    defineProperty(it, METADATA, { value: {
      objectID: 'O' + id$1++, // object ID
      weakData: {}          // weak collections IDs
    } });
  };

  var fastKey$1 = function (it, create) {
    // return a primitive with prefix
    if (!isObject$8(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!hasOwn$1(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return 'F';
      // not necessary to add metadata
      if (!create) return 'E';
      // add missing metadata
      setMetadata(it);
    // return object ID
    } return it[METADATA].objectID;
  };

  var getWeakData$1 = function (it, create) {
    if (!hasOwn$1(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return true;
      // not necessary to add metadata
      if (!create) return false;
      // add missing metadata
      setMetadata(it);
    // return the store of weak collections IDs
    } return it[METADATA].weakData;
  };

  // add metadata on freeze-family methods calling
  var onFreeze = function (it) {
    if (FREEZING && REQUIRED && isExtensible(it) && !hasOwn$1(it, METADATA)) setMetadata(it);
    return it;
  };

  var enable = function () {
    meta.enable = function () { /* empty */ };
    REQUIRED = true;
    var getOwnPropertyNames = getOwnPropertyNamesModule.f;
    var splice = uncurryThis$9([].splice);
    var test = {};
    test[METADATA] = 1;

    // prevent exposing of metadata key
    if (getOwnPropertyNames(test).length) {
      getOwnPropertyNamesModule.f = function (it) {
        var result = getOwnPropertyNames(it);
        for (var i = 0, length = result.length; i < length; i++) {
          if (result[i] === METADATA) {
            splice(result, i, 1);
            break;
          }
        } return result;
      };

      $$g({ target: 'Object', stat: true, forced: true }, {
        getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
      });
    }
  };

  var meta = internalMetadata.exports = {
    enable: enable,
    fastKey: fastKey$1,
    getWeakData: getWeakData$1,
    onFreeze: onFreeze
  };

  hiddenKeys[METADATA] = true;

  var internalMetadataExports = internalMetadata.exports;

  var isCallable$1 = isCallable$m;
  var isObject$7 = isObject$i;
  var setPrototypeOf = objectSetPrototypeOf;

  // makes subclassing work correct for wrapped built-ins
  var inheritIfRequired$1 = function ($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if (
      // it can work only with native `setPrototypeOf`
      setPrototypeOf &&
      // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
      isCallable$1(NewTarget = dummy.constructor) &&
      NewTarget !== Wrapper &&
      isObject$7(NewTargetPrototype = NewTarget.prototype) &&
      NewTargetPrototype !== Wrapper.prototype
    ) setPrototypeOf($this, NewTargetPrototype);
    return $this;
  };

  var $$f = _export;
  var global$4 = global$k;
  var uncurryThis$8 = functionUncurryThis;
  var isForced = isForced_1;
  var defineBuiltIn$1 = defineBuiltIn$8;
  var InternalMetadataModule = internalMetadataExports;
  var iterate$3 = iterate$6;
  var anInstance$2 = anInstance$4;
  var isCallable = isCallable$m;
  var isNullOrUndefined$2 = isNullOrUndefined$7;
  var isObject$6 = isObject$i;
  var fails$8 = fails$p;
  var checkCorrectnessOfIteration$1 = checkCorrectnessOfIteration$3;
  var setToStringTag = setToStringTag$4;
  var inheritIfRequired = inheritIfRequired$1;

  var collection$2 = function (CONSTRUCTOR_NAME, wrapper, common) {
    var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
    var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
    var ADDER = IS_MAP ? 'set' : 'add';
    var NativeConstructor = global$4[CONSTRUCTOR_NAME];
    var NativePrototype = NativeConstructor && NativeConstructor.prototype;
    var Constructor = NativeConstructor;
    var exported = {};

    var fixMethod = function (KEY) {
      var uncurriedNativeMethod = uncurryThis$8(NativePrototype[KEY]);
      defineBuiltIn$1(NativePrototype, KEY,
        KEY == 'add' ? function add(value) {
          uncurriedNativeMethod(this, value === 0 ? 0 : value);
          return this;
        } : KEY == 'delete' ? function (key) {
          return IS_WEAK && !isObject$6(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
        } : KEY == 'get' ? function get(key) {
          return IS_WEAK && !isObject$6(key) ? undefined : uncurriedNativeMethod(this, key === 0 ? 0 : key);
        } : KEY == 'has' ? function has(key) {
          return IS_WEAK && !isObject$6(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
        } : function set(key, value) {
          uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
          return this;
        }
      );
    };

    var REPLACE = isForced(
      CONSTRUCTOR_NAME,
      !isCallable(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails$8(function () {
        new NativeConstructor().entries().next();
      }))
    );

    if (REPLACE) {
      // create collection constructor
      Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
      InternalMetadataModule.enable();
    } else if (isForced(CONSTRUCTOR_NAME, true)) {
      var instance = new Constructor();
      // early implementations not supports chaining
      var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
      // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
      var THROWS_ON_PRIMITIVES = fails$8(function () { instance.has(1); });
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      // eslint-disable-next-line no-new -- required for testing
      var ACCEPT_ITERABLES = checkCorrectnessOfIteration$1(function (iterable) { new NativeConstructor(iterable); });
      // for early implementations -0 and +0 not the same
      var BUGGY_ZERO = !IS_WEAK && fails$8(function () {
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new NativeConstructor();
        var index = 5;
        while (index--) $instance[ADDER](index, index);
        return !$instance.has(-0);
      });

      if (!ACCEPT_ITERABLES) {
        Constructor = wrapper(function (dummy, iterable) {
          anInstance$2(dummy, NativePrototype);
          var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
          if (!isNullOrUndefined$2(iterable)) iterate$3(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
          return that;
        });
        Constructor.prototype = NativePrototype;
        NativePrototype.constructor = Constructor;
      }

      if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
        fixMethod('delete');
        fixMethod('has');
        IS_MAP && fixMethod('get');
      }

      if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

      // weak collections should not contains .clear method
      if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
    }

    exported[CONSTRUCTOR_NAME] = Constructor;
    $$f({ global: true, constructor: true, forced: Constructor != NativeConstructor }, exported);

    setToStringTag(Constructor, CONSTRUCTOR_NAME);

    if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

    return Constructor;
  };

  var defineBuiltIn = defineBuiltIn$8;

  var defineBuiltIns$2 = function (target, src, options) {
    for (var key in src) defineBuiltIn(target, key, src[key], options);
    return target;
  };

  var classof$1 = classofRaw$2;

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray$3 = Array.isArray || function isArray(argument) {
    return classof$1(argument) == 'Array';
  };

  var isArray$2 = isArray$3;
  var isConstructor$2 = isConstructor$4;
  var isObject$5 = isObject$i;
  var wellKnownSymbol$6 = wellKnownSymbol$k;

  var SPECIES$2 = wellKnownSymbol$6('species');
  var $Array$2 = Array;

  // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesConstructor$1 = function (originalArray) {
    var C;
    if (isArray$2(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (isConstructor$2(C) && (C === $Array$2 || isArray$2(C.prototype))) C = undefined;
      else if (isObject$5(C)) {
        C = C[SPECIES$2];
        if (C === null) C = undefined;
      }
    } return C === undefined ? $Array$2 : C;
  };

  var arraySpeciesConstructor = arraySpeciesConstructor$1;

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate$2 = function (originalArray, length) {
    return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
  };

  var bind$2 = functionBindContext;
  var uncurryThis$7 = functionUncurryThis;
  var IndexedObject$2 = indexedObject;
  var toObject$5 = toObject$9;
  var lengthOfArrayLike$5 = lengthOfArrayLike$9;
  var arraySpeciesCreate$1 = arraySpeciesCreate$2;

  var push$2 = uncurryThis$7([].push);

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
  var createMethod$3 = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_REJECT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject$5($this);
      var self = IndexedObject$2(O);
      var boundFunction = bind$2(callbackfn, that);
      var length = lengthOfArrayLike$5(self);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate$1;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
      var value, result;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3: return true;              // some
            case 5: return value;             // find
            case 6: return index;             // findIndex
            case 2: push$2(target, value);      // filter
          } else switch (TYPE) {
            case 4: return false;             // every
            case 7: push$2(target, value);      // filterReject
          }
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$3(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod$3(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod$3(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod$3(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod$3(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod$3(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$3(6),
    // `Array.prototype.filterReject` method
    // https://github.com/tc39/proposal-array-filtering
    filterReject: createMethod$3(7)
  };

  var uncurryThis$6 = functionUncurryThis;
  var defineBuiltIns$1 = defineBuiltIns$2;
  var getWeakData = internalMetadataExports.getWeakData;
  var anInstance$1 = anInstance$4;
  var anObject$1 = anObject$c;
  var isNullOrUndefined$1 = isNullOrUndefined$7;
  var isObject$4 = isObject$i;
  var iterate$2 = iterate$6;
  var ArrayIterationModule = arrayIteration;
  var hasOwn = hasOwnProperty_1;
  var InternalStateModule$1 = internalState;

  var setInternalState$1 = InternalStateModule$1.set;
  var internalStateGetterFor$1 = InternalStateModule$1.getterFor;
  var find = ArrayIterationModule.find;
  var findIndex = ArrayIterationModule.findIndex;
  var splice = uncurryThis$6([].splice);
  var id = 0;

  // fallback for uncaught frozen keys
  var uncaughtFrozenStore = function (state) {
    return state.frozen || (state.frozen = new UncaughtFrozenStore());
  };

  var UncaughtFrozenStore = function () {
    this.entries = [];
  };

  var findUncaughtFrozen = function (store, key) {
    return find(store.entries, function (it) {
      return it[0] === key;
    });
  };

  UncaughtFrozenStore.prototype = {
    get: function (key) {
      var entry = findUncaughtFrozen(this, key);
      if (entry) return entry[1];
    },
    has: function (key) {
      return !!findUncaughtFrozen(this, key);
    },
    set: function (key, value) {
      var entry = findUncaughtFrozen(this, key);
      if (entry) entry[1] = value;
      else this.entries.push([key, value]);
    },
    'delete': function (key) {
      var index = findIndex(this.entries, function (it) {
        return it[0] === key;
      });
      if (~index) splice(this.entries, index, 1);
      return !!~index;
    }
  };

  var collectionWeak$1 = {
    getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var Constructor = wrapper(function (that, iterable) {
        anInstance$1(that, Prototype);
        setInternalState$1(that, {
          type: CONSTRUCTOR_NAME,
          id: id++,
          frozen: undefined
        });
        if (!isNullOrUndefined$1(iterable)) iterate$2(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
      });

      var Prototype = Constructor.prototype;

      var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);

      var define = function (that, key, value) {
        var state = getInternalState(that);
        var data = getWeakData(anObject$1(key), true);
        if (data === true) uncaughtFrozenStore(state).set(key, value);
        else data[state.id] = value;
        return that;
      };

      defineBuiltIns$1(Prototype, {
        // `{ WeakMap, WeakSet }.prototype.delete(key)` methods
        // https://tc39.es/ecma262/#sec-weakmap.prototype.delete
        // https://tc39.es/ecma262/#sec-weakset.prototype.delete
        'delete': function (key) {
          var state = getInternalState(this);
          if (!isObject$4(key)) return false;
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state)['delete'](key);
          return data && hasOwn(data, state.id) && delete data[state.id];
        },
        // `{ WeakMap, WeakSet }.prototype.has(key)` methods
        // https://tc39.es/ecma262/#sec-weakmap.prototype.has
        // https://tc39.es/ecma262/#sec-weakset.prototype.has
        has: function has(key) {
          var state = getInternalState(this);
          if (!isObject$4(key)) return false;
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).has(key);
          return data && hasOwn(data, state.id);
        }
      });

      defineBuiltIns$1(Prototype, IS_MAP ? {
        // `WeakMap.prototype.get(key)` method
        // https://tc39.es/ecma262/#sec-weakmap.prototype.get
        get: function get(key) {
          var state = getInternalState(this);
          if (isObject$4(key)) {
            var data = getWeakData(key);
            if (data === true) return uncaughtFrozenStore(state).get(key);
            return data ? data[state.id] : undefined;
          }
        },
        // `WeakMap.prototype.set(key, value)` method
        // https://tc39.es/ecma262/#sec-weakmap.prototype.set
        set: function set(key, value) {
          return define(this, key, value);
        }
      } : {
        // `WeakSet.prototype.add(value)` method
        // https://tc39.es/ecma262/#sec-weakset.prototype.add
        add: function add(value) {
          return define(this, value, true);
        }
      });

      return Constructor;
    }
  };

  var collection$1 = collection$2;
  var collectionWeak = collectionWeak$1;

  // `WeakSet` constructor
  // https://tc39.es/ecma262/#sec-weakset-constructor
  collection$1('WeakSet', function (init) {
    return function WeakSet() { return init(this, arguments.length ? arguments[0] : undefined); };
  }, collectionWeak);

  // iterable DOM collections
  // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
  var domIterables = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
  };

  // in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
  var documentCreateElement = documentCreateElement$2;

  var classList = documentCreateElement('span').classList;
  var DOMTokenListPrototype$2 = classList && classList.constructor && classList.constructor.prototype;

  var domTokenListPrototype = DOMTokenListPrototype$2 === Object.prototype ? undefined : DOMTokenListPrototype$2;

  var global$3 = global$k;
  var DOMIterables$1 = domIterables;
  var DOMTokenListPrototype$1 = domTokenListPrototype;
  var ArrayIteratorMethods = es_array_iterator;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$5;
  var wellKnownSymbol$5 = wellKnownSymbol$k;

  var ITERATOR$1 = wellKnownSymbol$5('iterator');
  var TO_STRING_TAG = wellKnownSymbol$5('toStringTag');
  var ArrayValues = ArrayIteratorMethods.values;

  var handlePrototype$1 = function (CollectionPrototype, COLLECTION_NAME) {
    if (CollectionPrototype) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[ITERATOR$1] !== ArrayValues) try {
        createNonEnumerableProperty$1(CollectionPrototype, ITERATOR$1, ArrayValues);
      } catch (error) {
        CollectionPrototype[ITERATOR$1] = ArrayValues;
      }
      if (!CollectionPrototype[TO_STRING_TAG]) {
        createNonEnumerableProperty$1(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
      }
      if (DOMIterables$1[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
          createNonEnumerableProperty$1(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
        } catch (error) {
          CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
        }
      }
    }
  };

  for (var COLLECTION_NAME$1 in DOMIterables$1) {
    handlePrototype$1(global$3[COLLECTION_NAME$1] && global$3[COLLECTION_NAME$1].prototype, COLLECTION_NAME$1);
  }

  handlePrototype$1(DOMTokenListPrototype$1, 'DOMTokenList');

  var fails$7 = fails$p;
  var wellKnownSymbol$4 = wellKnownSymbol$k;
  var V8_VERSION$1 = engineV8Version;

  var SPECIES$1 = wellKnownSymbol$4('species');

  var arrayMethodHasSpeciesSupport$4 = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return V8_VERSION$1 >= 51 || !fails$7(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$1] = function () {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var $$e = _export;
  var isArray$1 = isArray$3;
  var isConstructor$1 = isConstructor$4;
  var isObject$3 = isObject$i;
  var toAbsoluteIndex = toAbsoluteIndex$3;
  var lengthOfArrayLike$4 = lengthOfArrayLike$9;
  var toIndexedObject$2 = toIndexedObject$9;
  var createProperty$2 = createProperty$4;
  var wellKnownSymbol$3 = wellKnownSymbol$k;
  var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$4;
  var nativeSlice = arraySlice$3;

  var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$3('slice');

  var SPECIES = wellKnownSymbol$3('species');
  var $Array$1 = Array;
  var max = Math.max;

  // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  $$e({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
    slice: function slice(start, end) {
      var O = toIndexedObject$2(this);
      var length = lengthOfArrayLike$4(O);
      var k = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length);
      // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
      var Constructor, result, n;
      if (isArray$1(O)) {
        Constructor = O.constructor;
        // cross-realm fallback
        if (isConstructor$1(Constructor) && (Constructor === $Array$1 || isArray$1(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject$3(Constructor)) {
          Constructor = Constructor[SPECIES];
          if (Constructor === null) Constructor = undefined;
        }
        if (Constructor === $Array$1 || Constructor === undefined) {
          return nativeSlice(O, k, fin);
        }
      }
      result = new (Constructor === undefined ? $Array$1 : Constructor)(max(fin - k, 0));
      for (n = 0; k < fin; k++, n++) if (k in O) createProperty$2(result, n, O[k]);
      result.length = n;
      return result;
    }
  });

  var fails$6 = fails$p;

  var arrayMethodIsStrict$4 = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails$6(function () {
      // eslint-disable-next-line no-useless-call -- required for testing
      method.call(null, argument || function () { return 1; }, 1);
    });
  };

  var $$d = _export;
  var uncurryThis$5 = functionUncurryThis;
  var IndexedObject$1 = indexedObject;
  var toIndexedObject$1 = toIndexedObject$9;
  var arrayMethodIsStrict$3 = arrayMethodIsStrict$4;

  var nativeJoin = uncurryThis$5([].join);

  var ES3_STRINGS = IndexedObject$1 != Object;
  var FORCED$4 = ES3_STRINGS || !arrayMethodIsStrict$3('join', ',');

  // `Array.prototype.join` method
  // https://tc39.es/ecma262/#sec-array.prototype.join
  $$d({ target: 'Array', proto: true, forced: FORCED$4 }, {
    join: function join(separator) {
      return nativeJoin(toIndexedObject$1(this), separator === undefined ? ',' : separator);
    }
  });

  /******************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  /* global Reflect, Promise */


  function __classPrivateFieldGet(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  }

  var $$c = _export;
  var toObject$4 = toObject$9;
  var nativeKeys = objectKeys$3;
  var fails$5 = fails$p;

  var FAILS_ON_PRIMITIVES = fails$5(function () { nativeKeys(1); });

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  $$c({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
    keys: function keys(it) {
      return nativeKeys(toObject$4(it));
    }
  });

  var isObject$2 = isObject$i;
  var classof = classofRaw$2;
  var wellKnownSymbol$2 = wellKnownSymbol$k;

  var MATCH$1 = wellKnownSymbol$2('match');

  // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp
  var isRegexp = function (it) {
    var isRegExp;
    return isObject$2(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
  };

  var isRegExp = isRegexp;

  var $TypeError$3 = TypeError;

  var notARegexp = function (it) {
    if (isRegExp(it)) {
      throw $TypeError$3("The method doesn't accept regular expressions");
    } return it;
  };

  var wellKnownSymbol$1 = wellKnownSymbol$k;

  var MATCH = wellKnownSymbol$1('match');

  var correctIsRegexpLogic = function (METHOD_NAME) {
    var regexp = /./;
    try {
      '/./'[METHOD_NAME](regexp);
    } catch (error1) {
      try {
        regexp[MATCH] = false;
        return '/./'[METHOD_NAME](regexp);
      } catch (error2) { /* empty */ }
    } return false;
  };

  var $$b = _export;
  var uncurryThis$4 = functionUncurryThisClause;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var toLength = toLength$2;
  var toString$3 = toString$6;
  var notARegExp = notARegexp;
  var requireObjectCoercible$1 = requireObjectCoercible$5;
  var correctIsRegExpLogic = correctIsRegexpLogic;

  // eslint-disable-next-line es/no-string-prototype-startswith -- safe
  var nativeStartsWith = uncurryThis$4(''.startsWith);
  var stringSlice = uncurryThis$4(''.slice);
  var min = Math.min;

  var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');
  // https://github.com/zloirock/core-js/pull/702
  var MDN_POLYFILL_BUG = !CORRECT_IS_REGEXP_LOGIC && !!function () {
    var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
    return descriptor && !descriptor.writable;
  }();

  // `String.prototype.startsWith` method
  // https://tc39.es/ecma262/#sec-string.prototype.startswith
  $$b({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
    startsWith: function startsWith(searchString /* , position = 0 */) {
      var that = toString$3(requireObjectCoercible$1(this));
      notARegExp(searchString);
      var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
      var search = toString$3(searchString);
      return nativeStartsWith
        ? nativeStartsWith(that, search, index)
        : stringSlice(that, index, index + search.length) === search;
    }
  });

  var $forEach = arrayIteration.forEach;
  var arrayMethodIsStrict$2 = arrayMethodIsStrict$4;

  var STRICT_METHOD$1 = arrayMethodIsStrict$2('forEach');

  // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  var arrayForEach = !STRICT_METHOD$1 ? function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  // eslint-disable-next-line es/no-array-prototype-foreach -- safe
  } : [].forEach;

  var global$2 = global$k;
  var DOMIterables = domIterables;
  var DOMTokenListPrototype = domTokenListPrototype;
  var forEach = arrayForEach;
  var createNonEnumerableProperty = createNonEnumerableProperty$5;

  var handlePrototype = function (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
      createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
    } catch (error) {
      CollectionPrototype.forEach = forEach;
    }
  };

  for (var COLLECTION_NAME in DOMIterables) {
    if (DOMIterables[COLLECTION_NAME]) {
      handlePrototype(global$2[COLLECTION_NAME] && global$2[COLLECTION_NAME].prototype);
    }
  }

  handlePrototype(DOMTokenListPrototype);

  var DESCRIPTORS$1 = descriptors;
  var uncurryThis$3 = functionUncurryThis;
  var objectKeys = objectKeys$3;
  var toIndexedObject = toIndexedObject$9;
  var $propertyIsEnumerable = objectPropertyIsEnumerable.f;

  var propertyIsEnumerable = uncurryThis$3($propertyIsEnumerable);
  var push$1 = uncurryThis$3([].push);

  // `Object.{ entries, values }` methods implementation
  var createMethod$2 = function (TO_ENTRIES) {
    return function (it) {
      var O = toIndexedObject(it);
      var keys = objectKeys(O);
      var length = keys.length;
      var i = 0;
      var result = [];
      var key;
      while (length > i) {
        key = keys[i++];
        if (!DESCRIPTORS$1 || propertyIsEnumerable(O, key)) {
          push$1(result, TO_ENTRIES ? [key, O[key]] : O[key]);
        }
      }
      return result;
    };
  };

  var objectToArray = {
    // `Object.entries` method
    // https://tc39.es/ecma262/#sec-object.entries
    entries: createMethod$2(true),
    // `Object.values` method
    // https://tc39.es/ecma262/#sec-object.values
    values: createMethod$2(false)
  };

  var $$a = _export;
  var $entries = objectToArray.entries;

  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  $$a({ target: 'Object', stat: true }, {
    entries: function entries(O) {
      return $entries(O);
    }
  });

  function defined(x) {
    return x != null && !Number.isNaN(x);
  }

  function ascendingDefined(a, b) {
    return +defined(b) - +defined(a) || d3.ascending(a, b);
  }

  function finite(x) {
    return isFinite(x) ? x : NaN;
  }

  function positive(x) {
    return x > 0 && isFinite(x) ? x : NaN;
  }

  function negative(x) {
    return x < 0 && isFinite(x) ? x : NaN;
  }

  const re = /^(?:[-+]\d{2})?\d{4}(?:-\d{2}(?:-\d{2})?)?(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d{3})?)?(?:Z|[-+]\d{2}:?\d{2})?)?$/;

  function parse(string, fallback) {
    if (!re.test(string += "")) return typeof fallback === "function" ? fallback(string) : fallback;
    return new Date(string);
  }

  const timeIntervals = new Map([
    ["second", d3.timeSecond],
    ["minute", d3.timeMinute],
    ["hour", d3.timeHour],
    ["day", d3.timeDay],
    ["week", d3.timeWeek],
    ["month", d3.timeMonth],
    ["quarter", d3.timeMonth.every(3)],
    ["half", d3.timeMonth.every(6)],
    ["year", d3.timeYear],
    ["monday", d3.timeMonday],
    ["tuesday", d3.timeTuesday],
    ["wednesday", d3.timeWednesday],
    ["thursday", d3.timeThursday],
    ["friday", d3.timeFriday],
    ["saturday", d3.timeSaturday],
    ["sunday", d3.timeSunday]
  ]);

  const utcIntervals = new Map([
    ["second", d3.utcSecond],
    ["minute", d3.utcMinute],
    ["hour", d3.utcHour],
    ["day", d3.utcDay],
    ["week", d3.utcWeek],
    ["month", d3.utcMonth],
    ["quarter", d3.utcMonth.every(3)],
    ["half", d3.utcMonth.every(6)],
    ["year", d3.utcYear],
    ["monday", d3.utcMonday],
    ["tuesday", d3.utcTuesday],
    ["wednesday", d3.utcWednesday],
    ["thursday", d3.utcThursday],
    ["friday", d3.utcFriday],
    ["saturday", d3.utcSaturday],
    ["sunday", d3.utcSunday]
  ]);

  function maybeTimeInterval(interval) {
    const i = timeIntervals.get(`${interval}`.toLowerCase());
    if (!i) throw new Error(`unknown interval: ${interval}`);
    return i;
  }

  function maybeUtcInterval(interval) {
    const i = utcIntervals.get(`${interval}`.toLowerCase());
    if (!i) throw new Error(`unknown interval: ${interval}`);
    return i;
  }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
  const TypedArray = Object.getPrototypeOf(Uint8Array);
  const objectToString = Object.prototype.toString;
  const constant = (x) => () => x;

  // If the values are specified as a typed array, no coercion is required.
  function coerceNumbers(values) {
    return values instanceof TypedArray ? values : map(values, coerceNumber, Float64Array);
  }

  // Unlike Mark’s number, here we want to convert null and undefined to NaN since
  // the result will be stored in a Float64Array and we don’t want null to be
  // coerced to zero. We use Number instead of unary + to allow BigInt coercion.
  function coerceNumber(x) {
    return x == null ? NaN : Number(x);
  }

  function coerceDates(values) {
    return map(values, coerceDate);
  }

  // When coercing strings to dates, we only want to allow the ISO 8601 format
  // since the built-in string parsing of the Date constructor varies across
  // browsers. (In the future, this could be made more liberal if desired, though
  // it is still generally preferable to do date parsing yourself explicitly,
  // rather than rely on Plot.) Any non-string values are coerced to number first
  // and treated as milliseconds since UNIX epoch.
  function coerceDate(x) {
    return x instanceof Date && !isNaN(x)
      ? x
      : typeof x === "string"
      ? parse(x)
      : x == null || isNaN((x = +x))
      ? undefined
      : new Date(x);
  }

  // Promotes the specified data to an array as needed.
  function arrayify(data) {
    return data == null || data instanceof Array || data instanceof TypedArray ? data : Array.from(data);
  }

  // An optimization of type.from(values, f): if the given values are already an
  // instanceof the desired array type, the faster values.map method is used.
  function map(values, f, type = Array) {
    return values == null ? values : values instanceof type ? values.map(f) : type.from(values, f);
  }

  // An optimization of type.from(values): if the given values are already an
  // instanceof the desired array type, the faster values.slice method is used.
  function slice(values, type = Array) {
    return values instanceof type ? values.slice() : type.from(values);
  }

  // Disambiguates an options object (e.g., {y: "x2"}) from a primitive value.
  function isObject$1(option) {
    return option?.toString === objectToString;
  }

  // Disambiguates a scale options object (e.g., {color: {type: "linear"}}) from
  // some other option (e.g., {color: "red"}). When creating standalone legends,
  // this is used to test whether a scale is defined; this should be consistent
  // with inferScaleType when there are no channels associated with the scale, and
  // if this returns true, then normalizeScale must return non-null.
  function isScaleOptions(option) {
    return isObject$1(option) && (option.type !== undefined || option.domain !== undefined);
  }

  // If interval is not nullish, converts interval shorthand such as a number (for
  // multiples) or a time interval name (such as “day”) to a {floor, offset,
  // range} object similar to a D3 time interval.
  function maybeInterval(interval, type) {
    if (interval == null) return;
    if (typeof interval === "number") {
      if (0 < interval && interval < 1 && Number.isInteger(1 / interval)) interval = -1 / interval;
      const n = Math.abs(interval);
      return interval < 0
        ? {
            floor: (d) => Math.floor(d * n) / n,
            offset: (d) => (d * n + 1) / n, // note: no optional step for simplicity
            range: (lo, hi) => d3.range(Math.ceil(lo * n), hi * n).map((x) => x / n)
          }
        : {
            floor: (d) => Math.floor(d / n) * n,
            offset: (d) => d + n, // note: no optional step for simplicity
            range: (lo, hi) => d3.range(Math.ceil(lo / n), hi / n).map((x) => x * n)
          };
    }
    if (typeof interval === "string") return (type === "time" ? maybeTimeInterval : maybeUtcInterval)(interval);
    if (typeof interval.floor !== "function") throw new Error("invalid interval; missing floor method");
    if (typeof interval.offset !== "function") throw new Error("invalid interval; missing offset method");
    return interval;
  }

  // Like maybeInterval, but requires a range method too.
  function maybeRangeInterval(interval, type) {
    interval = maybeInterval(interval, type);
    if (interval && typeof interval.range !== "function") throw new Error("invalid interval: missing range method");
    return interval;
  }

  // Like maybeRangeInterval, but requires a ceil method too.
  function maybeNiceInterval(interval, type) {
    interval = maybeRangeInterval(interval, type);
    if (interval && typeof interval.ceil !== "function") throw new Error("invalid interval: missing ceil method");
    return interval;
  }

  function isOrdinal(values) {
    for (const value of values) {
      if (value == null) continue;
      const type = typeof value;
      return type === "string" || type === "boolean";
    }
  }

  function isTemporal(values) {
    for (const value of values) {
      if (value == null) continue;
      return value instanceof Date;
    }
  }

  // Are these strings that might represent dates? This is stricter than ISO 8601
  // because we want to ignore false positives on numbers; for example, the string
  // "1192" is more likely to represent a number than a date even though it is
  // valid ISO 8601 representing 1192-01-01.
  function isTemporalString(values) {
    for (const value of values) {
      if (value == null) continue;
      return typeof value === "string" && isNaN(value) && parse(value);
    }
  }

  // Are these strings that might represent numbers? This is stricter than
  // coercion because we want to ignore false positives on e.g. empty strings.
  function isNumericString(values) {
    for (const value of values) {
      if (value == null) continue;
      if (typeof value !== "string") return false;
      if (!value.trim()) continue;
      return !isNaN(value);
    }
  }

  function isNoneish(value) {
    return value == null || isNone(value);
  }

  function isNone(value) {
    return /^\s*none\s*$/i.test(value);
  }

  // Like a sort comparator, returns a positive value if the given array of values
  // is in ascending order, a negative value if the values are in descending
  // order. Assumes monotonicity; only tests the first and last values.
  function orderof(values) {
    if (values == null) return;
    const first = values[0];
    const last = values[values.length - 1];
    return d3.descending(first, last);
  }

  // Positional scales have associated axes, and for ordinal data, a point or band
  // scale is used instead of an ordinal scale.
  const position = Symbol("position");

  // Color scales default to the turbo interpolator for quantitative data, and to
  // the Tableau10 scheme for ordinal data. Color scales may also have an
  // associated legend.
  const color = Symbol("color");

  // Radius scales default to the sqrt type, have a default range of [0, 3], and a
  // default domain from 0 to the median first quartile of associated channels.
  const radius = Symbol("radius");

  // Length scales default to the linear type, have a default range of [0, 12],
  // and a default domain from 0 to the median median of associated channels.
  const length = Symbol("length");

  // Opacity scales have a default range of [0, 1], and a default domain from 0 to
  // the maximum value of associated channels.
  const opacity = Symbol("opacity");

  // Symbol scales have a default range of categorical symbols.
  const symbol = Symbol("symbol");

  // TODO Rather than hard-coding the list of known scale names, collect the names
  // and categories for each plot specification, so that custom marks can register
  // custom scales.
  const registry = new Map([
    ["x", position],
    ["y", position],
    ["fx", position],
    ["fy", position],
    ["r", radius],
    ["color", color],
    ["opacity", opacity],
    ["symbol", symbol],
    ["length", length]
  ]);

  const sqrt3 = Math.sqrt(3);
  const sqrt4_3 = 2 / sqrt3;

  const symbolHexagon = {
    draw(context, size) {
      const rx = Math.sqrt(size / Math.PI),
        ry = rx * sqrt4_3,
        hy = ry / 2;
      context.moveTo(0, ry);
      context.lineTo(rx, hy);
      context.lineTo(rx, -hy);
      context.lineTo(0, -ry);
      context.lineTo(-rx, -hy);
      context.lineTo(-rx, hy);
      context.closePath();
    }
  };

  const symbols = new Map([
    ["asterisk", d3.symbolAsterisk],
    ["circle", d3.symbolCircle],
    ["cross", d3.symbolCross],
    ["diamond", d3.symbolDiamond],
    ["diamond2", d3.symbolDiamond2],
    ["hexagon", symbolHexagon],
    ["plus", d3.symbolPlus],
    ["square", d3.symbolSquare],
    ["square2", d3.symbolSquare2],
    ["star", d3.symbolStar],
    ["times", d3.symbolTimes],
    ["triangle", d3.symbolTriangle],
    ["triangle2", d3.symbolTriangle2],
    ["wye", d3.symbolWye]
  ]);

  function isSymbolObject(value) {
    return value && typeof value.draw === "function";
  }

  function maybeSymbol(symbol) {
    if (symbol == null || isSymbolObject(symbol)) return symbol;
    const value = symbols.get(`${symbol}`.toLowerCase());
    if (value) return value;
    throw new Error(`invalid symbol: ${symbol}`);
  }

  function warn(message) {
    console.warn(message);
  }

  const ordinalSchemes = new Map([
    // categorical
    ["accent", d3.schemeAccent],
    ["category10", d3.schemeCategory10],
    ["dark2", d3.schemeDark2],
    ["paired", d3.schemePaired],
    ["pastel1", d3.schemePastel1],
    ["pastel2", d3.schemePastel2],
    ["set1", d3.schemeSet1],
    ["set2", d3.schemeSet2],
    ["set3", d3.schemeSet3],
    ["tableau10", d3.schemeTableau10],

    // diverging
    ["brbg", scheme11(d3.schemeBrBG, d3.interpolateBrBG)],
    ["prgn", scheme11(d3.schemePRGn, d3.interpolatePRGn)],
    ["piyg", scheme11(d3.schemePiYG, d3.interpolatePiYG)],
    ["puor", scheme11(d3.schemePuOr, d3.interpolatePuOr)],
    ["rdbu", scheme11(d3.schemeRdBu, d3.interpolateRdBu)],
    ["rdgy", scheme11(d3.schemeRdGy, d3.interpolateRdGy)],
    ["rdylbu", scheme11(d3.schemeRdYlBu, d3.interpolateRdYlBu)],
    ["rdylgn", scheme11(d3.schemeRdYlGn, d3.interpolateRdYlGn)],
    ["spectral", scheme11(d3.schemeSpectral, d3.interpolateSpectral)],

    // reversed diverging (for temperature data)
    ["burd", scheme11r(d3.schemeRdBu, d3.interpolateRdBu)],
    ["buylrd", scheme11r(d3.schemeRdYlBu, d3.interpolateRdYlBu)],

    // sequential (single-hue)
    ["blues", scheme9(d3.schemeBlues, d3.interpolateBlues)],
    ["greens", scheme9(d3.schemeGreens, d3.interpolateGreens)],
    ["greys", scheme9(d3.schemeGreys, d3.interpolateGreys)],
    ["oranges", scheme9(d3.schemeOranges, d3.interpolateOranges)],
    ["purples", scheme9(d3.schemePurples, d3.interpolatePurples)],
    ["reds", scheme9(d3.schemeReds, d3.interpolateReds)],

    // sequential (multi-hue)
    ["turbo", schemei(d3.interpolateTurbo)],
    ["viridis", schemei(d3.interpolateViridis)],
    ["magma", schemei(d3.interpolateMagma)],
    ["inferno", schemei(d3.interpolateInferno)],
    ["plasma", schemei(d3.interpolatePlasma)],
    ["cividis", schemei(d3.interpolateCividis)],
    ["cubehelix", schemei(d3.interpolateCubehelixDefault)],
    ["warm", schemei(d3.interpolateWarm)],
    ["cool", schemei(d3.interpolateCool)],
    ["bugn", scheme9(d3.schemeBuGn, d3.interpolateBuGn)],
    ["bupu", scheme9(d3.schemeBuPu, d3.interpolateBuPu)],
    ["gnbu", scheme9(d3.schemeGnBu, d3.interpolateGnBu)],
    ["orrd", scheme9(d3.schemeOrRd, d3.interpolateOrRd)],
    ["pubu", scheme9(d3.schemePuBu, d3.interpolatePuBu)],
    ["pubugn", scheme9(d3.schemePuBuGn, d3.interpolatePuBuGn)],
    ["purd", scheme9(d3.schemePuRd, d3.interpolatePuRd)],
    ["rdpu", scheme9(d3.schemeRdPu, d3.interpolateRdPu)],
    ["ylgn", scheme9(d3.schemeYlGn, d3.interpolateYlGn)],
    ["ylgnbu", scheme9(d3.schemeYlGnBu, d3.interpolateYlGnBu)],
    ["ylorbr", scheme9(d3.schemeYlOrBr, d3.interpolateYlOrBr)],
    ["ylorrd", scheme9(d3.schemeYlOrRd, d3.interpolateYlOrRd)],

    // cyclical
    ["rainbow", schemeicyclical(d3.interpolateRainbow)],
    ["sinebow", schemeicyclical(d3.interpolateSinebow)]
  ]);

  function scheme9(scheme, interpolate) {
    return ({length: n}) => {
      if (n === 1) return [scheme[3][1]]; // favor midpoint
      if (n === 2) return [scheme[3][1], scheme[3][2]]; // favor darker
      n = Math.max(3, Math.floor(n));
      return n > 9 ? d3.quantize(interpolate, n) : scheme[n];
    };
  }

  function scheme11(scheme, interpolate) {
    return ({length: n}) => {
      if (n === 2) return [scheme[3][0], scheme[3][2]]; // favor diverging extrema
      n = Math.max(3, Math.floor(n));
      return n > 11 ? d3.quantize(interpolate, n) : scheme[n];
    };
  }

  function scheme11r(scheme, interpolate) {
    return ({length: n}) => {
      if (n === 2) return [scheme[3][2], scheme[3][0]]; // favor diverging extrema
      n = Math.max(3, Math.floor(n));
      return n > 11 ? d3.quantize((t) => interpolate(1 - t), n) : scheme[n].slice().reverse();
    };
  }

  function schemei(interpolate) {
    return ({length: n}) => d3.quantize(interpolate, Math.max(2, Math.floor(n)));
  }

  function schemeicyclical(interpolate) {
    return ({length: n}) => d3.quantize(interpolate, Math.floor(n) + 1).slice(0, -1);
  }

  function ordinalScheme(scheme) {
    const s = `${scheme}`.toLowerCase();
    if (!ordinalSchemes.has(s)) throw new Error(`unknown ordinal scheme: ${s}`);
    return ordinalSchemes.get(s);
  }

  function ordinalRange(scheme, length) {
    const s = ordinalScheme(scheme);
    const r = typeof s === "function" ? s({length}) : s;
    return r.length !== length ? r.slice(0, length) : r;
  }

  // If the specified domain contains only booleans (ignoring null and undefined),
  // returns a corresponding range where false is mapped to the low color and true
  // is mapped to the high color of the specified scheme.
  function maybeBooleanRange(domain, scheme = "greys") {
    const range = new Set();
    const [f, t] = ordinalRange(scheme, 2);
    for (const value of domain) {
      if (value == null) continue;
      if (value === true) range.add(t);
      else if (value === false) range.add(f);
      else return;
    }
    return [...range];
  }

  const quantitativeSchemes = new Map([
    // diverging
    ["brbg", d3.interpolateBrBG],
    ["prgn", d3.interpolatePRGn],
    ["piyg", d3.interpolatePiYG],
    ["puor", d3.interpolatePuOr],
    ["rdbu", d3.interpolateRdBu],
    ["rdgy", d3.interpolateRdGy],
    ["rdylbu", d3.interpolateRdYlBu],
    ["rdylgn", d3.interpolateRdYlGn],
    ["spectral", d3.interpolateSpectral],

    // reversed diverging (for temperature data)
    ["burd", (t) => d3.interpolateRdBu(1 - t)],
    ["buylrd", (t) => d3.interpolateRdYlBu(1 - t)],

    // sequential (single-hue)
    ["blues", d3.interpolateBlues],
    ["greens", d3.interpolateGreens],
    ["greys", d3.interpolateGreys],
    ["purples", d3.interpolatePurples],
    ["reds", d3.interpolateReds],
    ["oranges", d3.interpolateOranges],

    // sequential (multi-hue)
    ["turbo", d3.interpolateTurbo],
    ["viridis", d3.interpolateViridis],
    ["magma", d3.interpolateMagma],
    ["inferno", d3.interpolateInferno],
    ["plasma", d3.interpolatePlasma],
    ["cividis", d3.interpolateCividis],
    ["cubehelix", d3.interpolateCubehelixDefault],
    ["warm", d3.interpolateWarm],
    ["cool", d3.interpolateCool],
    ["bugn", d3.interpolateBuGn],
    ["bupu", d3.interpolateBuPu],
    ["gnbu", d3.interpolateGnBu],
    ["orrd", d3.interpolateOrRd],
    ["pubugn", d3.interpolatePuBuGn],
    ["pubu", d3.interpolatePuBu],
    ["purd", d3.interpolatePuRd],
    ["rdpu", d3.interpolateRdPu],
    ["ylgnbu", d3.interpolateYlGnBu],
    ["ylgn", d3.interpolateYlGn],
    ["ylorbr", d3.interpolateYlOrBr],
    ["ylorrd", d3.interpolateYlOrRd],

    // cyclical
    ["rainbow", d3.interpolateRainbow],
    ["sinebow", d3.interpolateSinebow]
  ]);

  function quantitativeScheme(scheme) {
    const s = `${scheme}`.toLowerCase();
    if (!quantitativeSchemes.has(s)) throw new Error(`unknown quantitative scheme: ${s}`);
    return quantitativeSchemes.get(s);
  }

  const divergingSchemes = new Set([
    "brbg",
    "prgn",
    "piyg",
    "puor",
    "rdbu",
    "rdgy",
    "rdylbu",
    "rdylgn",
    "spectral",
    "burd",
    "buylrd"
  ]);

  function isDivergingScheme(scheme) {
    return scheme != null && divergingSchemes.has(`${scheme}`.toLowerCase());
  }

  const flip = (i) => (t) => i(1 - t);
  const unit = [0, 1];

  const interpolators = new Map([
    // numbers
    ["number", d3.interpolateNumber],

    // color spaces
    ["rgb", d3.interpolateRgb],
    ["hsl", d3.interpolateHsl],
    ["hcl", d3.interpolateHcl],
    ["lab", d3.interpolateLab]
  ]);

  function maybeInterpolator(interpolate) {
    const i = `${interpolate}`.toLowerCase();
    if (!interpolators.has(i)) throw new Error(`unknown interpolator: ${i}`);
    return interpolators.get(i);
  }

  function createScaleQ(
    key,
    scale,
    channels,
    {
      type,
      nice,
      clamp,
      zero,
      domain = inferAutoDomain(key, channels),
      unknown,
      round,
      scheme,
      interval,
      range = registry.get(key) === radius
        ? inferRadialRange(channels, domain)
        : registry.get(key) === length
        ? inferLengthRange(channels, domain)
        : registry.get(key) === opacity
        ? unit
        : undefined,
      interpolate = registry.get(key) === color
        ? scheme == null && range !== undefined
          ? d3.interpolateRgb
          : quantitativeScheme(scheme !== undefined ? scheme : type === "cyclical" ? "rainbow" : "turbo")
        : round
        ? d3.interpolateRound
        : d3.interpolateNumber,
      reverse
    }
  ) {
    interval = maybeRangeInterval(interval, type);
    if (type === "cyclical" || type === "sequential") type = "linear"; // shorthand for color schemes
    reverse = !!reverse;

    // Sometimes interpolate is a named interpolator, such as "lab" for Lab color
    // space. Other times interpolate is a function that takes two arguments and
    // is used in conjunction with the range. And other times the interpolate
    // function is a “fixed” interpolator on the [0, 1] interval, as when a
    // color scheme such as interpolateRdBu is used.
    if (typeof interpolate !== "function") {
      interpolate = maybeInterpolator(interpolate);
    }
    if (interpolate.length === 1) {
      if (reverse) {
        interpolate = flip(interpolate);
        reverse = false;
      }
      if (range === undefined) {
        range = Float64Array.from(domain, (_, i) => i / (domain.length - 1));
        if (range.length === 2) range = unit; // optimize common case of [0, 1]
      }
      scale.interpolate((range === unit ? constant : interpolatePiecewise)(interpolate));
    } else {
      scale.interpolate(interpolate);
    }

    // If a zero option is specified, we assume that the domain is numeric, and we
    // want to ensure that the domain crosses zero. However, note that the domain
    // may be reversed (descending) so we shouldn’t assume that the first value is
    // smaller than the last; and also it’s possible that the domain has more than
    // two values for a “poly” scale. And lastly be careful not to mutate input!
    if (zero) {
      const [min, max] = d3.extent(domain);
      if (min > 0 || max < 0) {
        domain = slice(domain);
        if (orderof(domain) !== Math.sign(min)) domain[domain.length - 1] = 0;
        // [2, 1] or [-2, -1]
        else domain[0] = 0; // [1, 2] or [-1, -2]
      }
    }

    if (reverse) domain = d3.reverse(domain);
    scale.domain(domain).unknown(unknown);
    if (nice) scale.nice(maybeNice(nice, type)), (domain = scale.domain());
    if (range !== undefined) scale.range(range);
    if (clamp) scale.clamp(clamp);
    return {type, domain, range, scale, interpolate, interval};
  }

  function maybeNice(nice, type) {
    return nice === true ? undefined : typeof nice === "number" ? nice : maybeNiceInterval(nice, type);
  }

  function createScaleLinear(key, channels, options) {
    return createScaleQ(key, d3.scaleLinear(), channels, options);
  }

  function createScaleSqrt(key, channels, options) {
    return createScalePow(key, channels, {...options, exponent: 0.5});
  }

  function createScalePow(key, channels, {exponent = 1, ...options}) {
    return createScaleQ(key, d3.scalePow().exponent(exponent), channels, {...options, type: "pow"});
  }

  function createScaleLog(key, channels, {base = 10, domain = inferLogDomain(channels), ...options}) {
    return createScaleQ(key, d3.scaleLog().base(base), channels, {...options, domain});
  }

  function createScaleSymlog(key, channels, {constant = 1, ...options}) {
    return createScaleQ(key, d3.scaleSymlog().constant(constant), channels, options);
  }

  function createScaleQuantile(
    key,
    channels,
    {
      range,
      quantiles = range === undefined ? 5 : (range = [...range]).length, // deprecated; use n instead
      n = quantiles,
      scheme = "rdylbu",
      domain = inferQuantileDomain(channels),
      unknown,
      interpolate,
      reverse
    }
  ) {
    if (range === undefined) {
      range =
        interpolate !== undefined
          ? d3.quantize(interpolate, n)
          : registry.get(key) === color
          ? ordinalRange(scheme, n)
          : undefined;
    }
    if (domain.length > 0) {
      domain = d3.scaleQuantile(domain, range === undefined ? {length: n} : range).quantiles();
    }
    return createScaleThreshold(key, channels, {domain, range, reverse, unknown});
  }

  function createScaleQuantize(
    key,
    channels,
    {
      range,
      n = range === undefined ? 5 : (range = [...range]).length,
      scheme = "rdylbu",
      domain = inferAutoDomain(key, channels),
      unknown,
      interpolate,
      reverse
    }
  ) {
    const [min, max] = d3.extent(domain);
    let thresholds;
    if (range === undefined) {
      thresholds = d3.ticks(min, max, n); // approximate number of nice, round thresholds
      if (thresholds[0] <= min) thresholds.splice(0, 1); // drop exact lower bound
      if (thresholds[thresholds.length - 1] >= max) thresholds.pop(); // drop exact upper bound
      n = thresholds.length + 1;
      range =
        interpolate !== undefined
          ? d3.quantize(interpolate, n)
          : registry.get(key) === color
          ? ordinalRange(scheme, n)
          : undefined;
    } else {
      thresholds = d3.quantize(d3.interpolateNumber(min, max), n + 1).slice(1, -1); // exactly n - 1 thresholds to match range
      if (min instanceof Date) thresholds = thresholds.map((x) => new Date(x)); // preserve date types
    }
    if (orderof(arrayify(domain)) < 0) thresholds.reverse(); // preserve descending domain
    return createScaleThreshold(key, channels, {domain: thresholds, range, reverse, unknown});
  }

  function createScaleThreshold(
    key,
    channels,
    {
      domain = [0], // explicit thresholds in ascending order
      unknown,
      scheme = "rdylbu",
      interpolate,
      range = interpolate !== undefined
        ? d3.quantize(interpolate, domain.length + 1)
        : registry.get(key) === color
        ? ordinalRange(scheme, domain.length + 1)
        : undefined,
      reverse
    }
  ) {
    domain = arrayify(domain);
    const sign = orderof(domain); // preserve descending domain
    if (!isNaN(sign) && !isOrdered(domain, sign)) throw new Error(`the ${key} scale has a non-monotonic domain`);
    if (reverse) range = d3.reverse(range); // domain ascending, so reverse range
    return {
      type: "threshold",
      scale: d3.scaleThreshold(sign < 0 ? d3.reverse(domain) : domain, range === undefined ? [] : range).unknown(unknown),
      domain,
      range
    };
  }

  function isOrdered(domain, sign) {
    for (let i = 1, n = domain.length, d = domain[0]; i < n; ++i) {
      const s = d3.descending(d, (d = domain[i]));
      if (s !== 0 && s !== sign) return false;
    }
    return true;
  }

  function createScaleIdentity() {
    return {type: "identity", scale: d3.scaleIdentity()};
  }

  function inferDomain$1(channels, f = finite) {
    return channels.length
      ? [
          d3.min(channels, ({value}) => (value === undefined ? value : d3.min(value, f))),
          d3.max(channels, ({value}) => (value === undefined ? value : d3.max(value, f)))
        ]
      : [0, 1];
  }

  function inferAutoDomain(key, channels) {
    const type = registry.get(key);
    return (type === radius || type === opacity || type === length ? inferZeroDomain : inferDomain$1)(channels);
  }

  function inferZeroDomain(channels) {
    return [0, channels.length ? d3.max(channels, ({value}) => (value === undefined ? value : d3.max(value, finite))) : 1];
  }

  // We don’t want the upper bound of the radial domain to be zero, as this would
  // be degenerate, so we ignore nonpositive values. We also don’t want the
  // maximum default radius to exceed 30px.
  function inferRadialRange(channels, domain) {
    const hint = channels.find(({radius}) => radius !== undefined);
    if (hint !== undefined) return [0, hint.radius]; // a natural maximum radius, e.g. hexbins
    const h25 = d3.quantile(channels, 0.5, ({value}) => (value === undefined ? NaN : d3.quantile(value, 0.25, positive)));
    const range = domain.map((d) => 3 * Math.sqrt(d / h25));
    const k = 30 / d3.max(range);
    return k < 1 ? range.map((r) => r * k) : range;
  }

  // We want a length scale’s domain to go from zero to a positive value, and to
  // treat negative lengths if any as inverted vectors of equivalent magnitude. We
  // also don’t want the maximum default length to exceed 60px.
  function inferLengthRange(channels, domain) {
    const h50 = d3.median(channels, ({value}) => (value === undefined ? NaN : d3.median(value, Math.abs)));
    const range = domain.map((d) => (12 * d) / h50);
    const k = 60 / d3.max(range);
    return k < 1 ? range.map((r) => r * k) : range;
  }

  function inferLogDomain(channels) {
    for (const {value} of channels) {
      if (value !== undefined) {
        for (let v of value) {
          if (v > 0) return inferDomain$1(channels, positive);
          if (v < 0) return inferDomain$1(channels, negative);
        }
      }
    }
    return [1, 10];
  }

  function inferQuantileDomain(channels) {
    const domain = [];
    for (const {value} of channels) {
      if (value === undefined) continue;
      for (const v of value) domain.push(v);
    }
    return domain;
  }

  function interpolatePiecewise(interpolate) {
    return (i, j) => (t) => interpolate(i + t * (j - i));
  }

  function createScaleD(
    key,
    scale,
    transform,
    channels,
    {
      type,
      nice,
      clamp,
      domain = inferDomain$1(channels),
      unknown,
      pivot = 0,
      scheme,
      range,
      symmetric = true,
      interpolate = registry.get(key) === color
        ? scheme == null && range !== undefined
          ? d3.interpolateRgb
          : quantitativeScheme(scheme !== undefined ? scheme : "rdbu")
        : d3.interpolateNumber,
      reverse
    }
  ) {
    pivot = +pivot;
    let [min, max] = domain;
    if (d3.descending(min, max) < 0) ([min, max] = [max, min]), (reverse = !reverse);
    min = Math.min(min, pivot);
    max = Math.max(max, pivot);

    // Sometimes interpolate is a named interpolator, such as "lab" for Lab color
    // space. Other times interpolate is a function that takes two arguments and
    // is used in conjunction with the range. And other times the interpolate
    // function is a “fixed” interpolator on the [0, 1] interval, as when a
    // color scheme such as interpolateRdBu is used.
    if (typeof interpolate !== "function") {
      interpolate = maybeInterpolator(interpolate);
    }

    // If an explicit range is specified, promote it to a piecewise interpolator.
    if (range !== undefined) {
      interpolate =
        interpolate.length === 1 ? interpolatePiecewise(interpolate)(...range) : d3.piecewise(interpolate, range);
    }

    // Reverse before normalization.
    if (reverse) interpolate = flip(interpolate);

    // Normalize the interpolator for symmetric difference around the pivot.
    if (symmetric) {
      const mid = transform.apply(pivot);
      const mindelta = mid - transform.apply(min);
      const maxdelta = transform.apply(max) - mid;
      if (mindelta < maxdelta) min = transform.invert(mid - maxdelta);
      else if (mindelta > maxdelta) max = transform.invert(mid + mindelta);
    }

    scale.domain([min, pivot, max]).unknown(unknown).interpolator(interpolate);
    if (clamp) scale.clamp(clamp);
    if (nice) scale.nice(nice);
    return {type, domain: [min, max], pivot, interpolate, scale};
  }

  function createScaleDiverging(key, channels, options) {
    return createScaleD(key, d3.scaleDiverging(), transformIdentity, channels, options);
  }

  function createScaleDivergingSqrt(key, channels, options) {
    return createScaleDivergingPow(key, channels, {...options, exponent: 0.5});
  }

  function createScaleDivergingPow(key, channels, {exponent = 1, ...options}) {
    return createScaleD(key, d3.scaleDivergingPow().exponent((exponent = +exponent)), transformPow(exponent), channels, {
      ...options,
      type: "diverging-pow"
    });
  }

  function createScaleDivergingLog(
    key,
    channels,
    {base = 10, pivot = 1, domain = inferDomain$1(channels, pivot < 0 ? negative : positive), ...options}
  ) {
    return createScaleD(key, d3.scaleDivergingLog().base((base = +base)), transformLog, channels, {
      domain,
      pivot,
      ...options
    });
  }

  function createScaleDivergingSymlog(key, channels, {constant = 1, ...options}) {
    return createScaleD(
      key,
      d3.scaleDivergingSymlog().constant((constant = +constant)),
      transformSymlog(constant),
      channels,
      options
    );
  }

  const transformIdentity = {
    apply(x) {
      return x;
    },
    invert(x) {
      return x;
    }
  };

  const transformLog = {
    apply: Math.log,
    invert: Math.exp
  };

  const transformSqrt = {
    apply(x) {
      return Math.sign(x) * Math.sqrt(Math.abs(x));
    },
    invert(x) {
      return Math.sign(x) * (x * x);
    }
  };

  function transformPow(exponent) {
    return exponent === 0.5
      ? transformSqrt
      : {
          apply(x) {
            return Math.sign(x) * Math.pow(Math.abs(x), exponent);
          },
          invert(x) {
            return Math.sign(x) * Math.pow(Math.abs(x), 1 / exponent);
          }
        };
  }

  function transformSymlog(constant) {
    return {
      apply(x) {
        return Math.sign(x) * Math.log1p(Math.abs(x / constant));
      },
      invert(x) {
        return Math.sign(x) * Math.expm1(Math.abs(x)) * constant;
      }
    };
  }

  function createScaleT(key, scale, channels, options) {
    return createScaleQ(key, scale, channels, options);
  }

  function createScaleTime(key, channels, options) {
    return createScaleT(key, d3.scaleTime(), channels, options);
  }

  function createScaleUtc(key, channels, options) {
    return createScaleT(key, d3.scaleUtc(), channels, options);
  }

  // This denotes an implicitly ordinal color scale: the scale type was not set,
  // but the associated values are strings or booleans. If the associated defined
  // values are entirely boolean, the range will default to greys. You can opt out
  // of this by setting the type explicitly.
  const ordinalImplicit = Symbol("ordinal");

  function createScaleO(key, scale, channels, {type, interval, domain, range, reverse, hint}) {
    interval = maybeRangeInterval(interval, type);
    if (domain === undefined) domain = inferDomain(channels, interval, key);
    if (type === "categorical" || type === ordinalImplicit) type = "ordinal"; // shorthand for color schemes
    if (reverse) domain = d3.reverse(domain);
    scale.domain(domain);
    if (range !== undefined) {
      // If the range is specified as a function, pass it the domain.
      if (typeof range === "function") range = range(domain);
      scale.range(range);
    }
    return {type, domain, range, scale, hint, interval};
  }

  function createScaleOrdinal(key, channels, {type, interval, domain, range, scheme, unknown, ...options}) {
    interval = maybeRangeInterval(interval, type);
    if (domain === undefined) domain = inferDomain(channels, interval, key);
    let hint;
    if (registry.get(key) === symbol) {
      hint = inferSymbolHint(channels);
      range = range === undefined ? inferSymbolRange(hint) : map(range, maybeSymbol);
    } else if (registry.get(key) === color) {
      if (range === undefined && (type === "ordinal" || type === ordinalImplicit)) {
        range = maybeBooleanRange(domain, scheme);
        if (range !== undefined) scheme = undefined; // Don’t re-apply scheme.
      }
      if (scheme === undefined && range === undefined) {
        scheme = type === "ordinal" ? "turbo" : "tableau10";
      }
      if (scheme !== undefined) {
        if (range !== undefined) {
          const interpolate = quantitativeScheme(scheme);
          const t0 = range[0],
            d = range[1] - range[0];
          range = ({length: n}) => d3.quantize((t) => interpolate(t0 + d * t), n);
        } else {
          range = ordinalScheme(scheme);
        }
      }
    }
    if (unknown === d3.scaleImplicit) {
      throw new Error(`implicit unknown on ${key} scale is not supported`);
    }
    return createScaleO(key, d3.scaleOrdinal().unknown(unknown), channels, {...options, type, domain, range, hint});
  }

  function createScalePoint(key, channels, {align = 0.5, padding = 0.5, ...options}) {
    return maybeRound(d3.scalePoint().align(align).padding(padding), channels, options, key);
  }

  function createScaleBand(
    key,
    channels,
    {
      align = 0.5,
      padding = 0.1,
      paddingInner = padding,
      paddingOuter = key === "fx" || key === "fy" ? 0 : padding,
      ...options
    }
  ) {
    return maybeRound(
      d3.scaleBand().align(align).paddingInner(paddingInner).paddingOuter(paddingOuter),
      channels,
      options,
      key
    );
  }

  function maybeRound(scale, channels, options, key) {
    let {round} = options;
    if (round !== undefined) scale.round((round = !!round));
    scale = createScaleO(key, scale, channels, options);
    scale.round = round; // preserve for autoScaleRound
    return scale;
  }

  function inferDomain(channels, interval, key) {
    const values = new d3.InternSet();
    for (const {value, domain} of channels) {
      if (domain !== undefined) return domain(); // see channelDomain
      if (value === undefined) continue;
      for (const v of value) values.add(v);
    }
    if (interval !== undefined) {
      const [min, max] = d3.extent(values).map(interval.floor, interval);
      return interval.range(min, interval.offset(max));
    }
    if (values.size > 10e3 && registry.get(key) === position) {
      throw new Error(`implicit ordinal domain of ${key} scale has more than 10,000 values`);
    }
    return d3.sort(values, ascendingDefined);
  }

  // If all channels provide a consistent hint, propagate it to the scale.
  function inferHint(channels, key) {
    let value;
    for (const {hint} of channels) {
      const candidate = hint?.[key];
      if (candidate === undefined) continue; // no hint here
      if (value === undefined) value = candidate;
      // first hint
      else if (value !== candidate) return; // inconsistent hint
    }
    return value;
  }

  function inferSymbolHint(channels) {
    return {
      fill: inferHint(channels, "fill"),
      stroke: inferHint(channels, "stroke")
    };
  }

  function inferSymbolRange(hint) {
    return isNoneish(hint.fill) ? d3.symbolsStroke : d3.symbolsFill;
  }

  function normalizeScale(key, scale, hint) {
    return createScale(key, hint === undefined ? undefined : [{hint}], {...scale});
  }

  function createScale(key, channels = [], options = {}) {
    const type = inferScaleType(key, channels, options);

    // Warn for common misuses of implicit ordinal scales. We disable this test if
    // you specify a scale interval or if you set the domain or range explicitly,
    // since setting the domain or range (typically with a cardinality of more than
    // two) is another indication that you intended for the scale to be ordinal; we
    // also disable it for facet scales since these are always band scales.
    if (
      options.type === undefined &&
      options.domain === undefined &&
      options.range === undefined &&
      options.interval == null &&
      key !== "fx" &&
      key !== "fy" &&
      isOrdinalScale({type})
    ) {
      const values = channels.map(({value}) => value).filter((value) => value !== undefined);
      if (values.some(isTemporal))
        warn(
          `Warning: some data associated with the ${key} scale are dates. Dates are typically associated with a "utc" or "time" scale rather than a "${formatScaleType(
          type
        )}" scale. If you are using a bar mark, you probably want a rect mark with the interval option instead; if you are using a group transform, you probably want a bin transform instead. If you want to treat this data as ordinal, you can specify the interval of the ${key} scale (e.g., d3.utcDay), or you can suppress this warning by setting the type of the ${key} scale to "${formatScaleType(
          type
        )}".`
        );
      else if (values.some(isTemporalString))
        warn(
          `Warning: some data associated with the ${key} scale are strings that appear to be dates (e.g., YYYY-MM-DD). If these strings represent dates, you should parse them to Date objects. Dates are typically associated with a "utc" or "time" scale rather than a "${formatScaleType(
          type
        )}" scale. If you are using a bar mark, you probably want a rect mark with the interval option instead; if you are using a group transform, you probably want a bin transform instead. If you want to treat this data as ordinal, you can suppress this warning by setting the type of the ${key} scale to "${formatScaleType(
          type
        )}".`
        );
      else if (values.some(isNumericString))
        warn(
          `Warning: some data associated with the ${key} scale are strings that appear to be numbers. If these strings represent numbers, you should parse or coerce them to numbers. Numbers are typically associated with a "linear" scale rather than a "${formatScaleType(
          type
        )}" scale. If you want to treat this data as ordinal, you can specify the interval of the ${key} scale (e.g., 1 for integers), or you can suppress this warning by setting the type of the ${key} scale to "${formatScaleType(
          type
        )}".`
        );
    }

    options.type = type; // Mutates input!

    // Once the scale type is known, coerce the associated channel values and any
    // explicitly-specified domain to the expected type.
    switch (type) {
      case "diverging":
      case "diverging-sqrt":
      case "diverging-pow":
      case "diverging-log":
      case "diverging-symlog":
      case "cyclical":
      case "sequential":
      case "linear":
      case "sqrt":
      case "threshold":
      case "quantile":
      case "pow":
      case "log":
      case "symlog":
        options = coerceType(channels, options, coerceNumbers);
        break;
      case "identity":
        switch (registry.get(key)) {
          case position:
            options = coerceType(channels, options, coerceNumbers);
            break;
          case symbol:
            options = coerceType(channels, options, coerceSymbols);
            break;
        }
        break;
      case "utc":
      case "time":
        options = coerceType(channels, options, coerceDates);
        break;
    }

    switch (type) {
      case "diverging":
        return createScaleDiverging(key, channels, options);
      case "diverging-sqrt":
        return createScaleDivergingSqrt(key, channels, options);
      case "diverging-pow":
        return createScaleDivergingPow(key, channels, options);
      case "diverging-log":
        return createScaleDivergingLog(key, channels, options);
      case "diverging-symlog":
        return createScaleDivergingSymlog(key, channels, options);
      case "categorical":
      case "ordinal":
      case ordinalImplicit:
        return createScaleOrdinal(key, channels, options);
      case "cyclical":
      case "sequential":
      case "linear":
        return createScaleLinear(key, channels, options);
      case "sqrt":
        return createScaleSqrt(key, channels, options);
      case "threshold":
        return createScaleThreshold(key, channels, options);
      case "quantile":
        return createScaleQuantile(key, channels, options);
      case "quantize":
        return createScaleQuantize(key, channels, options);
      case "pow":
        return createScalePow(key, channels, options);
      case "log":
        return createScaleLog(key, channels, options);
      case "symlog":
        return createScaleSymlog(key, channels, options);
      case "utc":
        return createScaleUtc(key, channels, options);
      case "time":
        return createScaleTime(key, channels, options);
      case "point":
        return createScalePoint(key, channels, options);
      case "band":
        return createScaleBand(key, channels, options);
      case "identity":
        return registry.get(key) === position ? createScaleIdentity() : {type: "identity"};
      case undefined:
        return;
      default:
        throw new Error(`unknown scale type: ${type}`);
    }
  }

  function formatScaleType(type) {
    return typeof type === "symbol" ? type.description : type;
  }

  // A special type symbol when the x and y scales are replaced with a projection.
  const typeProjection = {toString: () => "projection"};

  function inferScaleType(key, channels, {type, domain, range, scheme, pivot, projection}) {
    // The facet scales are always band scales; this cannot be changed.
    if (key === "fx" || key === "fy") return "band";

    // If a projection is specified, the x- and y-scales are disabled; these
    // channels will be projected rather than scaled. (But still check that none
    // of the associated channels are incompatible with a projection.)
    if ((key === "x" || key === "y") && projection != null) type = typeProjection;

    // If a channel dictates a scale type, make sure that it is consistent with
    // the user-specified scale type (if any) and all other channels. For example,
    // barY requires x to be a band scale and disallows any other scale type.
    for (const {type: t} of channels) {
      if (t === undefined) continue;
      else if (type === undefined) type = t;
      else if (type !== t) throw new Error(`scale incompatible with channel: ${type} !== ${t}`);
    }

    // If the scale, a channel, or user specified a (consistent) type, return it.
    if (type === typeProjection) return;
    if (type !== undefined) return type;

    // If there’s no data (and no type) associated with this scale, don’t create a scale.
    if (domain === undefined && !channels.some(({value}) => value !== undefined)) return;

    // Some scales have default types.
    const kind = registry.get(key);
    if (kind === radius) return "sqrt";
    if (kind === opacity || kind === length) return "linear";
    if (kind === symbol) return "ordinal";

    // If the domain or range has more than two values, assume it’s ordinal. You
    // can still use a “piecewise” (or “polylinear”) scale, but you must set the
    // type explicitly.
    if ((domain || range || []).length > 2) return asOrdinalType(kind);

    // Otherwise, infer the scale type from the data! Prefer the domain, if
    // present, over channels. (The domain and channels should be consistently
    // typed, and the domain is more explicit and typically much smaller.) We only
    // check the first defined value for expedience and simplicity; we expect
    // that the types are consistent.
    if (domain !== undefined) {
      if (isOrdinal(domain)) return asOrdinalType(kind);
      if (isTemporal(domain)) return "utc";
      if (kind === color && (pivot != null || isDivergingScheme(scheme))) return "diverging";
      return "linear";
    }

    // If any channel is ordinal or temporal, it takes priority.
    const values = channels.map(({value}) => value).filter((value) => value !== undefined);
    if (values.some(isOrdinal)) return asOrdinalType(kind);
    if (values.some(isTemporal)) return "utc";
    if (kind === color && (pivot != null || isDivergingScheme(scheme))) return "diverging";
    return "linear";
  }

  // Positional scales default to a point scale instead of an ordinal scale.
  function asOrdinalType(kind) {
    switch (kind) {
      case position:
        return "point";
      case color:
        return ordinalImplicit;
      default:
        return "ordinal";
    }
  }

  function isOrdinalScale({type}) {
    return type === "ordinal" || type === "point" || type === "band" || type === ordinalImplicit;
  }

  // Mutates channel.value!
  function coerceType(channels, {domain, ...options}, coerceValues) {
    for (const c of channels) {
      if (c.value !== undefined) {
        c.value = coerceValues(c.value);
      }
    }
    return {
      domain: domain === undefined ? domain : coerceValues(domain),
      ...options
    };
  }

  function coerceSymbols(values) {
    return map(values, maybeSymbol);
  }

  function scale(options = {}) {
    let scale;
    for (const key in options) {
      if (!registry.has(key)) continue; // ignore unknown properties
      if (!isScaleOptions(options[key])) continue; // e.g., ignore {color: "red"}
      if (scale !== undefined) throw new Error("ambiguous scale definition; multiple scales found");
      scale = exposeScale(normalizeScale(key, options[key]));
    }
    if (scale === undefined) throw new Error("invalid scale definition; no scale found");
    return scale;
  }

  // Note: axis- and legend-related properties (such as label, ticks and
  // tickFormat) are not included here as they do not affect the scale’s behavior.
  function exposeScale({scale, type, domain, range, interpolate, interval, transform, percent, pivot}) {
    if (type === "identity") return {type: "identity", apply: (d) => d, invert: (d) => d};
    const unknown = scale.unknown ? scale.unknown() : undefined;
    return {
      type,
      domain: slice(domain), // defensive copy
      ...(range !== undefined && {range: slice(range)}), // defensive copy
      ...(transform !== undefined && {transform}),
      ...(percent && {percent}), // only exposed if truthy
      ...(unknown !== undefined && {unknown}),
      ...(interval !== undefined && {interval}),

      // quantitative
      ...(interpolate !== undefined && {interpolate}),
      ...(scale.clamp && {clamp: scale.clamp()}),

      // diverging (always asymmetric; we never want to apply the symmetric transform twice)
      ...(pivot !== undefined && {pivot, symmetric: false}),

      // log, diverging-log
      ...(scale.base && {base: scale.base()}),

      // pow, diverging-pow
      ...(scale.exponent && {exponent: scale.exponent()}),

      // symlog, diverging-symlog
      ...(scale.constant && {constant: scale.constant()}),

      // band, point
      ...(scale.align && {align: scale.align(), round: scale.round()}),
      ...(scale.padding &&
        (scale.paddingInner
          ? {paddingInner: scale.paddingInner(), paddingOuter: scale.paddingOuter()}
          : {padding: scale.padding()})),
      ...(scale.bandwidth && {bandwidth: scale.bandwidth(), step: scale.step()}),

      // utilities
      apply: (t) => scale(t),
      ...(scale.invert && {invert: (t) => scale.invert(t)})
    };
  }

  var ScrollDirection;
  (function (ScrollDirection) {
    ScrollDirection[ScrollDirection["SCROLL_NONE"] = 0] = "SCROLL_NONE";
    ScrollDirection[ScrollDirection["SCROLL_BACKWARD"] = 1] = "SCROLL_BACKWARD";
    ScrollDirection[ScrollDirection["SCROLL_FORWARD"] = 2] = "SCROLL_FORWARD";
  })(ScrollDirection || (ScrollDirection = {}));
  var Position;
  (function (Position) {
    Position[Position["TOP"] = 0] = "TOP";
    Position[Position["RIGHT"] = 1] = "RIGHT";
    Position[Position["BOTTOM"] = 2] = "BOTTOM";
    Position[Position["LEFT"] = 3] = "LEFT";
  })(Position || (Position = {}));
  var OPTIONS_DEFAULT_SUBDOMAIN_WIDTH = 10;
  var OPTIONS_DEFAULT_SUBDOMAIN_HEIGHT = 10;
  var OPTIONS_DEFAULT_SUBDOMAIN_GUTTER = 2;
  var OPTIONS_DEFAULT_SUBDOMAIN_RADIUS = 0;
  var SCALE_BASE_OPACITY_COLOR = 'red';

  function normalizedScale(scaleOptions) {
    try {
      var scaleType = Object.keys(scaleOptions)[0];
      return scale(_defineProperty({}, scaleType, Object.assign(Object.assign({}, scaleOptions[scaleType]), {
        clamp: true
      })));
    } catch (error) {
      return null;
    }
  }
  function scaleStyle(_scale, scaleOptions) {
    var styles = {};
    if (scaleOptions.hasOwnProperty('opacity')) {
      styles.fill = function () {
        return (
          // eslint-disable-next-line implicit-arrow-linebreak
          scaleOptions.opacity.baseColor || SCALE_BASE_OPACITY_COLOR
        );
      };
      styles['fill-opacity'] = function (d) {
        return _scale === null || _scale === void 0 ? void 0 : _scale.apply(d);
      };
    } else {
      styles.fill = function (d) {
        return (
          // eslint-disable-next-line implicit-arrow-linebreak
          typeof d === 'string' && (d === null || d === void 0 ? void 0 : d.startsWith('#')) ? d : _scale === null || _scale === void 0 ? void 0 : _scale.apply(d)
        );
      };
    }
    return styles;
  }
  function applyScaleStyle(elem, _scale, scaleOptions, keyname) {
    Object.entries(scaleStyle(_scale, scaleOptions)).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        prop = _ref2[0],
        val = _ref2[1];
      return (
        // eslint-disable-next-line implicit-arrow-linebreak
        elem.style(prop, function (d) {
          return (
            // eslint-disable-next-line implicit-arrow-linebreak
            val(keyname ? d[keyname] : d)
          );
        })
      );
    });
  }

  var $TypeError$2 = TypeError;
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

  var doesNotExceedSafeInteger$1 = function (it) {
    if (it > MAX_SAFE_INTEGER) throw $TypeError$2('Maximum allowed index exceeded');
    return it;
  };

  var $$9 = _export;
  var fails$4 = fails$p;
  var isArray = isArray$3;
  var isObject = isObject$i;
  var toObject$3 = toObject$9;
  var lengthOfArrayLike$3 = lengthOfArrayLike$9;
  var doesNotExceedSafeInteger = doesNotExceedSafeInteger$1;
  var createProperty$1 = createProperty$4;
  var arraySpeciesCreate = arraySpeciesCreate$2;
  var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$4;
  var wellKnownSymbol = wellKnownSymbol$k;
  var V8_VERSION = engineV8Version;

  var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');

  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679
  var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$4(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });

  var isConcatSpreadable = function (O) {
    if (!isObject(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray(O);
  };

  var FORCED$3 = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport$2('concat');

  // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  $$9({ target: 'Array', proto: true, arity: 1, forced: FORCED$3 }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    concat: function concat(arg) {
      var O = toObject$3(this);
      var A = arraySpeciesCreate(O, 0);
      var n = 0;
      var i, k, length, len, E;
      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];
        if (isConcatSpreadable(E)) {
          len = lengthOfArrayLike$3(E);
          doesNotExceedSafeInteger(n + len);
          for (k = 0; k < len; k++, n++) if (k in E) createProperty$1(A, n, E[k]);
        } else {
          doesNotExceedSafeInteger(n + 1);
          createProperty$1(A, n++, E);
        }
      }
      A.length = n;
      return A;
    }
  });

  var $$8 = _export;
  var call$1 = functionCall;
  var aCallable$2 = aCallable$b;
  var newPromiseCapabilityModule = newPromiseCapability$2;
  var perform = perform$4;
  var iterate$1 = iterate$6;
  var PROMISE_STATICS_INCORRECT_ITERATION = promiseStaticsIncorrectIteration;

  // `Promise.allSettled` method
  // https://tc39.es/ecma262/#sec-promise.allsettled
  $$8({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
    allSettled: function allSettled(iterable) {
      var C = this;
      var capability = newPromiseCapabilityModule.f(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = perform(function () {
        var promiseResolve = aCallable$2(C.resolve);
        var values = [];
        var counter = 0;
        var remaining = 1;
        iterate$1(iterable, function (promise) {
          var index = counter++;
          var alreadyCalled = false;
          remaining++;
          call$1(promiseResolve, C, promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[index] = { status: 'fulfilled', value: value };
            --remaining || resolve(values);
          }, function (error) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[index] = { status: 'rejected', reason: error };
            --remaining || resolve(values);
          });
        });
        --remaining || resolve(values);
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

  var create = objectCreate;
  var defineBuiltInAccessor = defineBuiltInAccessor$3;
  var defineBuiltIns = defineBuiltIns$2;
  var bind$1 = functionBindContext;
  var anInstance = anInstance$4;
  var isNullOrUndefined = isNullOrUndefined$7;
  var iterate = iterate$6;
  var defineIterator = iteratorDefine;
  var createIterResultObject = createIterResultObject$3;
  var setSpecies = setSpecies$2;
  var DESCRIPTORS = descriptors;
  var fastKey = internalMetadataExports.fastKey;
  var InternalStateModule = internalState;

  var setInternalState = InternalStateModule.set;
  var internalStateGetterFor = InternalStateModule.getterFor;

  var collectionStrong$1 = {
    getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var Constructor = wrapper(function (that, iterable) {
        anInstance(that, Prototype);
        setInternalState(that, {
          type: CONSTRUCTOR_NAME,
          index: create(null),
          first: undefined,
          last: undefined,
          size: 0
        });
        if (!DESCRIPTORS) that.size = 0;
        if (!isNullOrUndefined(iterable)) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
      });

      var Prototype = Constructor.prototype;

      var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

      var define = function (that, key, value) {
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        var previous, index;
        // change existing entry
        if (entry) {
          entry.value = value;
        // create new entry
        } else {
          state.last = entry = {
            index: index = fastKey(key, true),
            key: key,
            value: value,
            previous: previous = state.last,
            next: undefined,
            removed: false
          };
          if (!state.first) state.first = entry;
          if (previous) previous.next = entry;
          if (DESCRIPTORS) state.size++;
          else that.size++;
          // add to index
          if (index !== 'F') state.index[index] = entry;
        } return that;
      };

      var getEntry = function (that, key) {
        var state = getInternalState(that);
        // fast case
        var index = fastKey(key);
        var entry;
        if (index !== 'F') return state.index[index];
        // frozen object case
        for (entry = state.first; entry; entry = entry.next) {
          if (entry.key == key) return entry;
        }
      };

      defineBuiltIns(Prototype, {
        // `{ Map, Set }.prototype.clear()` methods
        // https://tc39.es/ecma262/#sec-map.prototype.clear
        // https://tc39.es/ecma262/#sec-set.prototype.clear
        clear: function clear() {
          var that = this;
          var state = getInternalState(that);
          var data = state.index;
          var entry = state.first;
          while (entry) {
            entry.removed = true;
            if (entry.previous) entry.previous = entry.previous.next = undefined;
            delete data[entry.index];
            entry = entry.next;
          }
          state.first = state.last = undefined;
          if (DESCRIPTORS) state.size = 0;
          else that.size = 0;
        },
        // `{ Map, Set }.prototype.delete(key)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.delete
        // https://tc39.es/ecma262/#sec-set.prototype.delete
        'delete': function (key) {
          var that = this;
          var state = getInternalState(that);
          var entry = getEntry(that, key);
          if (entry) {
            var next = entry.next;
            var prev = entry.previous;
            delete state.index[entry.index];
            entry.removed = true;
            if (prev) prev.next = next;
            if (next) next.previous = prev;
            if (state.first == entry) state.first = next;
            if (state.last == entry) state.last = prev;
            if (DESCRIPTORS) state.size--;
            else that.size--;
          } return !!entry;
        },
        // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.foreach
        // https://tc39.es/ecma262/#sec-set.prototype.foreach
        forEach: function forEach(callbackfn /* , that = undefined */) {
          var state = getInternalState(this);
          var boundFunction = bind$1(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
          var entry;
          while (entry = entry ? entry.next : state.first) {
            boundFunction(entry.value, entry.key, this);
            // revert to the last existing entry
            while (entry && entry.removed) entry = entry.previous;
          }
        },
        // `{ Map, Set}.prototype.has(key)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.has
        // https://tc39.es/ecma262/#sec-set.prototype.has
        has: function has(key) {
          return !!getEntry(this, key);
        }
      });

      defineBuiltIns(Prototype, IS_MAP ? {
        // `Map.prototype.get(key)` method
        // https://tc39.es/ecma262/#sec-map.prototype.get
        get: function get(key) {
          var entry = getEntry(this, key);
          return entry && entry.value;
        },
        // `Map.prototype.set(key, value)` method
        // https://tc39.es/ecma262/#sec-map.prototype.set
        set: function set(key, value) {
          return define(this, key === 0 ? 0 : key, value);
        }
      } : {
        // `Set.prototype.add(value)` method
        // https://tc39.es/ecma262/#sec-set.prototype.add
        add: function add(value) {
          return define(this, value = value === 0 ? 0 : value, value);
        }
      });
      if (DESCRIPTORS) defineBuiltInAccessor(Prototype, 'size', {
        configurable: true,
        get: function () {
          return getInternalState(this).size;
        }
      });
      return Constructor;
    },
    setStrong: function (Constructor, CONSTRUCTOR_NAME, IS_MAP) {
      var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
      var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
      var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
      // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.entries
      // https://tc39.es/ecma262/#sec-map.prototype.keys
      // https://tc39.es/ecma262/#sec-map.prototype.values
      // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
      // https://tc39.es/ecma262/#sec-set.prototype.entries
      // https://tc39.es/ecma262/#sec-set.prototype.keys
      // https://tc39.es/ecma262/#sec-set.prototype.values
      // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
      defineIterator(Constructor, CONSTRUCTOR_NAME, function (iterated, kind) {
        setInternalState(this, {
          type: ITERATOR_NAME,
          target: iterated,
          state: getInternalCollectionState(iterated),
          kind: kind,
          last: undefined
        });
      }, function () {
        var state = getInternalIteratorState(this);
        var kind = state.kind;
        var entry = state.last;
        // revert to the last existing entry
        while (entry && entry.removed) entry = entry.previous;
        // get next entry
        if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
          // or finish the iteration
          state.target = undefined;
          return createIterResultObject(undefined, true);
        }
        // return step by kind
        if (kind == 'keys') return createIterResultObject(entry.key, false);
        if (kind == 'values') return createIterResultObject(entry.value, false);
        return createIterResultObject([entry.key, entry.value], false);
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

      // `{ Map, Set }.prototype[@@species]` accessors
      // https://tc39.es/ecma262/#sec-get-map-@@species
      // https://tc39.es/ecma262/#sec-get-set-@@species
      setSpecies(CONSTRUCTOR_NAME);
    }
  };

  var collection = collection$2;
  var collectionStrong = collectionStrong$1;

  // `Map` constructor
  // https://tc39.es/ecma262/#sec-map-objects
  collection('Map', function (init) {
    return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
  }, collectionStrong);

  var tryToString = tryToString$5;

  var $TypeError$1 = TypeError;

  var deletePropertyOrThrow$1 = function (O, P) {
    if (!delete O[P]) throw $TypeError$1('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
  };

  var arraySlice = arraySliceSimple;

  var floor = Math.floor;

  var mergeSort = function (array, comparefn) {
    var length = array.length;
    var middle = floor(length / 2);
    return length < 8 ? insertionSort(array, comparefn) : merge(
      array,
      mergeSort(arraySlice(array, 0, middle), comparefn),
      mergeSort(arraySlice(array, middle), comparefn),
      comparefn
    );
  };

  var insertionSort = function (array, comparefn) {
    var length = array.length;
    var i = 1;
    var element, j;

    while (i < length) {
      j = i;
      element = array[i];
      while (j && comparefn(array[j - 1], element) > 0) {
        array[j] = array[--j];
      }
      if (j !== i++) array[j] = element;
    } return array;
  };

  var merge = function (array, left, right, comparefn) {
    var llength = left.length;
    var rlength = right.length;
    var lindex = 0;
    var rindex = 0;

    while (lindex < llength || rindex < rlength) {
      array[lindex + rindex] = (lindex < llength && rindex < rlength)
        ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
        : lindex < llength ? left[lindex++] : right[rindex++];
    } return array;
  };

  var arraySort = mergeSort;

  var userAgent$1 = engineUserAgent;

  var firefox = userAgent$1.match(/firefox\/(\d+)/i);

  var engineFfVersion = !!firefox && +firefox[1];

  var UA = engineUserAgent;

  var engineIsIeOrEdge = /MSIE|Trident/.test(UA);

  var userAgent = engineUserAgent;

  var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

  var engineWebkitVersion = !!webkit && +webkit[1];

  var $$7 = _export;
  var uncurryThis$2 = functionUncurryThis;
  var aCallable$1 = aCallable$b;
  var toObject$2 = toObject$9;
  var lengthOfArrayLike$2 = lengthOfArrayLike$9;
  var deletePropertyOrThrow = deletePropertyOrThrow$1;
  var toString$2 = toString$6;
  var fails$3 = fails$p;
  var internalSort = arraySort;
  var arrayMethodIsStrict$1 = arrayMethodIsStrict$4;
  var FF = engineFfVersion;
  var IE_OR_EDGE = engineIsIeOrEdge;
  var V8 = engineV8Version;
  var WEBKIT = engineWebkitVersion;

  var test = [];
  var nativeSort = uncurryThis$2(test.sort);
  var push = uncurryThis$2(test.push);

  // IE8-
  var FAILS_ON_UNDEFINED = fails$3(function () {
    test.sort(undefined);
  });
  // V8 bug
  var FAILS_ON_NULL = fails$3(function () {
    test.sort(null);
  });
  // Old WebKit
  var STRICT_METHOD = arrayMethodIsStrict$1('sort');

  var STABLE_SORT = !fails$3(function () {
    // feature detection can be too slow, so check engines versions
    if (V8) return V8 < 70;
    if (FF && FF > 3) return;
    if (IE_OR_EDGE) return true;
    if (WEBKIT) return WEBKIT < 603;

    var result = '';
    var code, chr, value, index;

    // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
    for (code = 65; code < 76; code++) {
      chr = String.fromCharCode(code);

      switch (code) {
        case 66: case 69: case 70: case 72: value = 3; break;
        case 68: case 71: value = 4; break;
        default: value = 2;
      }

      for (index = 0; index < 47; index++) {
        test.push({ k: chr + index, v: value });
      }
    }

    test.sort(function (a, b) { return b.v - a.v; });

    for (index = 0; index < test.length; index++) {
      chr = test[index].k.charAt(0);
      if (result.charAt(result.length - 1) !== chr) result += chr;
    }

    return result !== 'DGBEFHACIJK';
  });

  var FORCED$2 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

  var getSortCompare = function (comparefn) {
    return function (x, y) {
      if (y === undefined) return -1;
      if (x === undefined) return 1;
      if (comparefn !== undefined) return +comparefn(x, y) || 0;
      return toString$2(x) > toString$2(y) ? 1 : -1;
    };
  };

  // `Array.prototype.sort` method
  // https://tc39.es/ecma262/#sec-array.prototype.sort
  $$7({ target: 'Array', proto: true, forced: FORCED$2 }, {
    sort: function sort(comparefn) {
      if (comparefn !== undefined) aCallable$1(comparefn);

      var array = toObject$2(this);

      if (STABLE_SORT) return comparefn === undefined ? nativeSort(array) : nativeSort(array, comparefn);

      var items = [];
      var arrayLength = lengthOfArrayLike$2(array);
      var itemsLength, index;

      for (index = 0; index < arrayLength; index++) {
        if (index in array) push(items, array[index]);
      }

      internalSort(items, getSortCompare(comparefn));

      itemsLength = lengthOfArrayLike$2(items);
      index = 0;

      while (index < itemsLength) array[index] = items[index++];
      while (index < arrayLength) deletePropertyOrThrow(array, index++);

      return array;
    }
  });

  new WeakSet();

  new WeakSet();

  var $$6 = _export;
  var $includes = arrayIncludes.includes;
  var fails$2 = fails$p;
  var addToUnscopables = addToUnscopables$2;

  // FF99+ bug
  var BROKEN_ON_SPARSE = fails$2(function () {
    // eslint-disable-next-line es/no-array-prototype-includes -- detection
    return !Array(1).includes();
  });

  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  $$6({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
    includes: function includes(el /* , fromIndex = 0 */) {
      return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('includes');

  var $$5 = _export;
  var $map = arrayIteration.map;
  var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$4;

  var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('map');

  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  // with adding support of @@species
  $$5({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
    map: function map(callbackfn /* , thisArg */) {
      return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var $$4 = _export;
  var $filter = arrayIteration.filter;
  var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$4;

  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  // with adding support of @@species
  $$4({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
    filter: function filter(callbackfn /* , thisArg */) {
      return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var aCallable = aCallable$b;
  var toObject$1 = toObject$9;
  var IndexedObject = indexedObject;
  var lengthOfArrayLike$1 = lengthOfArrayLike$9;

  var $TypeError = TypeError;

  // `Array.prototype.{ reduce, reduceRight }` methods implementation
  var createMethod$1 = function (IS_RIGHT) {
    return function (that, callbackfn, argumentsLength, memo) {
      aCallable(callbackfn);
      var O = toObject$1(that);
      var self = IndexedObject(O);
      var length = lengthOfArrayLike$1(O);
      var index = IS_RIGHT ? length - 1 : 0;
      var i = IS_RIGHT ? -1 : 1;
      if (argumentsLength < 2) while (true) {
        if (index in self) {
          memo = self[index];
          index += i;
          break;
        }
        index += i;
        if (IS_RIGHT ? index < 0 : length <= index) {
          throw $TypeError('Reduce of empty array with no initial value');
        }
      }
      for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
        memo = callbackfn(memo, self[index], index, O);
      }
      return memo;
    };
  };

  var arrayReduce = {
    // `Array.prototype.reduce` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduce
    left: createMethod$1(false),
    // `Array.prototype.reduceRight` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduceright
    right: createMethod$1(true)
  };

  var $$3 = _export;
  var $reduce = arrayReduce.left;
  var arrayMethodIsStrict = arrayMethodIsStrict$4;
  var CHROME_VERSION = engineV8Version;
  var IS_NODE = engineIsNode;

  // Chrome 80-82 has a critical bug
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
  var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;
  var FORCED$1 = CHROME_BUG || !arrayMethodIsStrict('reduce');

  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  $$3({ target: 'Array', proto: true, forced: FORCED$1 }, {
    reduce: function reduce(callbackfn /* , initialValue */) {
      var length = arguments.length;
      return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
    }
  });

  var anObject = anObject$c;
  var iteratorClose = iteratorClose$2;

  // call something on iterator step with safe closing on error
  var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
  };

  var bind = functionBindContext;
  var call = functionCall;
  var toObject = toObject$9;
  var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
  var isArrayIteratorMethod = isArrayIteratorMethod$2;
  var isConstructor = isConstructor$4;
  var lengthOfArrayLike = lengthOfArrayLike$9;
  var createProperty = createProperty$4;
  var getIterator = getIterator$2;
  var getIteratorMethod = getIteratorMethod$3;

  var $Array = Array;

  // `Array.from` method implementation
  // https://tc39.es/ecma262/#sec-array.from
  var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var IS_CONSTRUCTOR = isConstructor(this);
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
    var iteratorMethod = getIteratorMethod(O);
    var index = 0;
    var length, result, step, iterator, next, value;
    // if the target is not iterable or it's an array with the default iterator - use a simple case
    if (iteratorMethod && !(this === $Array && isArrayIteratorMethod(iteratorMethod))) {
      iterator = getIterator(O, iteratorMethod);
      next = iterator.next;
      result = IS_CONSTRUCTOR ? new this() : [];
      for (;!(step = call(next, iterator)).done; index++) {
        value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
        createProperty(result, index, value);
      }
    } else {
      length = lengthOfArrayLike(O);
      result = IS_CONSTRUCTOR ? new this(length) : $Array(length);
      for (;length > index; index++) {
        value = mapping ? mapfn(O[index], index) : O[index];
        createProperty(result, index, value);
      }
    }
    result.length = index;
    return result;
  };

  var $$2 = _export;
  var from = arrayFrom;
  var checkCorrectnessOfIteration = checkCorrectnessOfIteration$3;

  var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
    // eslint-disable-next-line es/no-array-from -- required for testing
    Array.from(iterable);
  });

  // `Array.from` method
  // https://tc39.es/ecma262/#sec-array.from
  $$2({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
    from: from
  });

  // a string of all valid unicode whitespaces
  var whitespaces$3 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
    '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var uncurryThis$1 = functionUncurryThis;
  var requireObjectCoercible = requireObjectCoercible$5;
  var toString$1 = toString$6;
  var whitespaces$2 = whitespaces$3;

  var replace = uncurryThis$1(''.replace);
  var ltrim = RegExp('^[' + whitespaces$2 + ']+');
  var rtrim = RegExp('(^|[^' + whitespaces$2 + '])[' + whitespaces$2 + ']+$');

  // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  var createMethod = function (TYPE) {
    return function ($this) {
      var string = toString$1(requireObjectCoercible($this));
      if (TYPE & 1) string = replace(string, ltrim, '');
      if (TYPE & 2) string = replace(string, rtrim, '$1');
      return string;
    };
  };

  var stringTrim = {
    // `String.prototype.{ trimLeft, trimStart }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimstart
    start: createMethod(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimend
    end: createMethod(2),
    // `String.prototype.trim` method
    // https://tc39.es/ecma262/#sec-string.prototype.trim
    trim: createMethod(3)
  };

  var global$1 = global$k;
  var fails$1 = fails$p;
  var uncurryThis = functionUncurryThis;
  var toString = toString$6;
  var trim = stringTrim.trim;
  var whitespaces$1 = whitespaces$3;

  var $parseInt$1 = global$1.parseInt;
  var Symbol$1 = global$1.Symbol;
  var ITERATOR = Symbol$1 && Symbol$1.iterator;
  var hex = /^[+-]?0x/i;
  var exec = uncurryThis(hex.exec);
  var FORCED = $parseInt$1(whitespaces$1 + '08') !== 8 || $parseInt$1(whitespaces$1 + '0x16') !== 22
    // MS Edge 18- broken with boxed symbols
    || (ITERATOR && !fails$1(function () { $parseInt$1(Object(ITERATOR)); }));

  // `parseInt` method
  // https://tc39.es/ecma262/#sec-parseint-string-radix
  var numberParseInt = FORCED ? function parseInt(string, radix) {
    var S = trim(toString(string));
    return $parseInt$1(S, (radix >>> 0) || (exec(hex, S) ? 16 : 10));
  } : $parseInt$1;

  var $$1 = _export;
  var $parseInt = numberParseInt;

  // `parseInt` method
  // https://tc39.es/ecma262/#sec-parseint-string-radix
  $$1({ global: true, forced: parseInt != $parseInt }, {
    parseInt: $parseInt
  });

  new WeakSet();

  new WeakSet();

  var PROPER_FUNCTION_NAME = functionName.PROPER;
  var fails = fails$p;
  var whitespaces = whitespaces$3;

  var non = '\u200B\u0085\u180E';

  // check that a method works with the correct list
  // of whitespaces and has a correct name
  var stringTrimForced = function (METHOD_NAME) {
    return fails(function () {
      return !!whitespaces[METHOD_NAME]()
        || non[METHOD_NAME]() !== non
        || (PROPER_FUNCTION_NAME && whitespaces[METHOD_NAME].name !== METHOD_NAME);
    });
  };

  var $ = _export;
  var $trim = stringTrim.trim;
  var forcedStringTrimMethod = stringTrimForced;

  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  $({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
    trim: function trim() {
      return $trim(this);
    }
  });

  var DEFAULT_SELECTOR$2 = '.ch-subdomain';
  new WeakSet();

  new WeakSet();

  var DEFAULT_SELECTOR$1 = '.ch-container';
  new WeakSet();

  var _LegendLite_instances, _LegendLite_buildLegend, _LegendLite_nodeAttrs;
  var DEFAULT_SELECTOR = '.ch-plugin-legend-lite';
  var defaultOptions = {
    enabled: true,
    itemSelector: null,
    width: OPTIONS_DEFAULT_SUBDOMAIN_WIDTH,
    height: OPTIONS_DEFAULT_SUBDOMAIN_HEIGHT,
    gutter: OPTIONS_DEFAULT_SUBDOMAIN_GUTTER,
    radius: OPTIONS_DEFAULT_SUBDOMAIN_RADIUS,
    includeBlank: false
  };
  var LegendLite = /*#__PURE__*/function () {
    function LegendLite(calendar) {
      _classCallCheck(this, LegendLite);
      _LegendLite_instances.add(this);
      this.name = 'LegendLite';
      this.calendar = calendar;
      this.root = null;
      this.shown = false;
      this.options = defaultOptions;
    }
    _createClass(LegendLite, [{
      key: "setup",
      value: function setup(pluginOptions) {
        this.options = Object.assign(Object.assign({}, this.options), pluginOptions);
      }
    }, {
      key: "paint",
      value: function paint() {
        var _this$options = this.options,
          enabled = _this$options.enabled,
          itemSelector = _this$options.itemSelector;
        if (!enabled || itemSelector && d3Selection.select(itemSelector).empty()) {
          return this.destroy();
        }
        this.shown = true;
        this.root = d3Selection.select(itemSelector || this.calendar.options.options.itemSelector);
        if (this.root.select(DEFAULT_SELECTOR).empty()) {
          this.root = this.root.append('div').attr('class', DEFAULT_SELECTOR.slice(1));
        } else {
          this.root = this.root.select(DEFAULT_SELECTOR);
        }
        var node = __classPrivateFieldGet(this, _LegendLite_instances, "m", _LegendLite_buildLegend).call(this);
        this.root.selectAll('*').remove();
        this.root.append(function () {
          return node.node();
        });
        return Promise.resolve();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (this.root !== null) {
          this.root.remove();
          this.root = null;
        }
        return Promise.resolve();
      }
    }]);
    return LegendLite;
  }();
  _LegendLite_instances = new WeakSet(), _LegendLite_buildLegend = function _LegendLite_buildLegend() {
    var _this = this;
    var node = d3Selection.create('svg');
    var scale = normalizedScale(this.calendar.options.options.scale);
    var _this$options2 = this.options,
      width = _this$options2.width,
      height = _this$options2.height,
      gutter = _this$options2.gutter,
      includeBlank = _this$options2.includeBlank;
    var localRange = _toConsumableArray(scale.range);
    if (includeBlank) {
      localRange.unshift(null);
    }
    node.attr('class', DEFAULT_SELECTOR$1.slice(1)).attr('width', localRange.length * width + (localRange.length - 1) * gutter).attr('height', height);
    node.selectAll('rect').data(localRange).join(function (enter) {
      return enter.append('rect').call(function (sc) {
        return (
          // eslint-disable-next-line implicit-arrow-linebreak
          __classPrivateFieldGet(_this, _LegendLite_instances, "m", _LegendLite_nodeAttrs).call(_this, sc, scale)
        );
      });
    }, function (update) {
      return update.selectAll('rect').call(function (sc) {
        return __classPrivateFieldGet(_this, _LegendLite_instances, "m", _LegendLite_nodeAttrs).call(_this, sc, scale);
      });
    });
    return node;
  }, _LegendLite_nodeAttrs = function _LegendLite_nodeAttrs(selection, scale) {
    var _this2 = this;
    var _this$options3 = this.options,
      width = _this$options3.width,
      height = _this$options3.height,
      radius = _this$options3.radius,
      gutter = _this$options3.gutter;
    return selection.attr('width', width).attr('height', height).attr('class', "".concat(DEFAULT_SELECTOR$2.slice(1), "-bg")).attr('rx', radius).attr('ry', radius).attr('x', function (_d, i) {
      return i * (width + gutter);
    }).attr('y', 0).call(function (element) {
      applyScaleStyle(element, scale, _this2.calendar.options.options.scale);
    });
  };

  return LegendLite;

}));

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('d3-selection'), require('d3-color'), require('d3'), require('d3-fetch')) :
  typeof define === 'function' && define.amd ? define(['d3-selection', 'd3-color', 'd3', 'd3-fetch'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.CalHeatmap = factory(global.d3, global.d3, global.d3, global.d3));
})(this, (function (d3Selection, d3Color, d3, d3Fetch) { 'use strict';

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
  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return exports;
    };
    var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      defineProperty = Object.defineProperty || function (obj, key, desc) {
        obj[key] = desc.value;
      },
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      return Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function (obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
      return defineProperty(generator, "_invoke", {
        value: makeInvokeMethod(innerFn, self, context)
      }), generator;
    }
    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }
    exports.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if ("throw" !== record.type) {
          var result = record.arg,
            value = result.value;
          return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          }) : PromiseImpl.resolve(value).then(function (unwrapped) {
            result.value = unwrapped, resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }
        reject(record.arg);
      }
      var previousPromise;
      defineProperty(this, "_invoke", {
        value: function (method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }
          return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");
        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }
        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }
          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);
          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }
          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var methodName = context.method,
        method = delegate.iterator[methodName];
      if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
      var record = tryCatch(method, delegate.iterator, context.arg);
      if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
      var info = record.arg;
      return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) return iteratorMethod.call(iterable);
        if ("function" == typeof iterable.next) return iterable;
        if (!isNaN(iterable.length)) {
          var i = -1,
            next = function next() {
              for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
              return next.value = undefined, next.done = !0, next;
            };
          return next.next = next;
        }
      }
      return {
        next: doneResult
      };
    }
    function doneResult() {
      return {
        value: undefined,
        done: !0
      };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function (genFun) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function (arg) {
      return {
        __await: arg
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
      return this;
    }), define(Gp, "toString", function () {
      return "[object Generator]";
    }), exports.keys = function (val) {
      var object = Object(val),
        keys = [];
      for (var key in object) keys.push(key);
      return keys.reverse(), function next() {
        for (; keys.length;) {
          var key = keys.pop();
          if (key in object) return next.value = key, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, exports.values = values, Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      },
      stop: function () {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) throw exception;
        var context = this;
        function handle(loc, caught) {
          return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
            record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally) throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
      },
      complete: function (record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
        }
      },
      catch: function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        return this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
      }
    }, exports;
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
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

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$n =
    // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || commonjsGlobal || Function('return this')();

  var shared$4 = {exports: {}};

  var global$m = global$n;

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty$9 = Object.defineProperty;

  var defineGlobalProperty$3 = function (key, value) {
    try {
      defineProperty$9(global$m, key, { value: value, configurable: true, writable: true });
    } catch (error) {
      global$m[key] = value;
    } return value;
  };

  var global$l = global$n;
  var defineGlobalProperty$2 = defineGlobalProperty$3;

  var SHARED = '__core-js_shared__';
  var store$3 = global$l[SHARED] || defineGlobalProperty$2(SHARED, {});

  var sharedStore = store$3;

  var store$2 = sharedStore;

  (shared$4.exports = function (key, value) {
    return store$2[key] || (store$2[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.30.2',
    mode: 'global',
    copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
    license: 'https://github.com/zloirock/core-js/blob/v3.30.2/LICENSE',
    source: 'https://github.com/zloirock/core-js'
  });

  var sharedExports = shared$4.exports;

  var fails$u = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var fails$t = fails$u;

  var functionBindNative = !fails$t(function () {
    // eslint-disable-next-line es/no-function-prototype-bind -- safe
    var test = (function () { /* empty */ }).bind();
    // eslint-disable-next-line no-prototype-builtins -- safe
    return typeof test != 'function' || test.hasOwnProperty('prototype');
  });

  var NATIVE_BIND$3 = functionBindNative;

  var FunctionPrototype$3 = Function.prototype;
  var call$j = FunctionPrototype$3.call;
  var uncurryThisWithBind = NATIVE_BIND$3 && FunctionPrototype$3.bind.bind(call$j, call$j);

  var functionUncurryThis = NATIVE_BIND$3 ? uncurryThisWithBind : function (fn) {
    return function () {
      return call$j.apply(fn, arguments);
    };
  };

  // we can't use just `it == null` since of `document.all` special case
  // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
  var isNullOrUndefined$8 = function (it) {
    return it === null || it === undefined;
  };

  var isNullOrUndefined$7 = isNullOrUndefined$8;

  var $TypeError$h = TypeError;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible$7 = function (it) {
    if (isNullOrUndefined$7(it)) throw $TypeError$h("Can't call method on " + it);
    return it;
  };

  var requireObjectCoercible$6 = requireObjectCoercible$7;

  var $Object$4 = Object;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject$b = function (argument) {
    return $Object$4(requireObjectCoercible$6(argument));
  };

  var uncurryThis$v = functionUncurryThis;
  var toObject$a = toObject$b;

  var hasOwnProperty$d = uncurryThis$v({}.hasOwnProperty);

  // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty
  // eslint-disable-next-line es/no-object-hasown -- safe
  var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty$d(toObject$a(it), key);
  };

  var uncurryThis$u = functionUncurryThis;

  var id$2 = 0;
  var postfix = Math.random();
  var toString$d = uncurryThis$u(1.0.toString);

  var uid$3 = function (key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$d(++id$2 + postfix, 36);
  };

  var engineUserAgent = typeof navigator != 'undefined' && String(navigator.userAgent) || '';

  var global$k = global$n;
  var userAgent$5 = engineUserAgent;

  var process$4 = global$k.process;
  var Deno$1 = global$k.Deno;
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
  var fails$s = fails$u;
  var global$j = global$n;

  var $String$5 = global$j.String;

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$s(function () {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
    // of course, fail.
    return !$String$5(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && V8_VERSION$3 && V8_VERSION$3 < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */

  var NATIVE_SYMBOL$1 = symbolConstructorDetection;

  var useSymbolAsUid = NATIVE_SYMBOL$1
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';

  var global$i = global$n;
  var shared$3 = sharedExports;
  var hasOwn$b = hasOwnProperty_1;
  var uid$2 = uid$3;
  var NATIVE_SYMBOL = symbolConstructorDetection;
  var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

  var Symbol$4 = global$i.Symbol;
  var WellKnownSymbolsStore = shared$3('wks');
  var createWellKnownSymbol = USE_SYMBOL_AS_UID$1 ? Symbol$4['for'] || Symbol$4 : Symbol$4 && Symbol$4.withoutSetter || uid$2;

  var wellKnownSymbol$m = function (name) {
    if (!hasOwn$b(WellKnownSymbolsStore, name)) {
      WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn$b(Symbol$4, name)
        ? Symbol$4[name]
        : createWellKnownSymbol('Symbol.' + name);
    } return WellKnownSymbolsStore[name];
  };

  var wellKnownSymbol$l = wellKnownSymbol$m;

  var TO_STRING_TAG$3 = wellKnownSymbol$l('toStringTag');
  var test$1 = {};

  test$1[TO_STRING_TAG$3] = 'z';

  var toStringTagSupport = String(test$1) === '[object z]';

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
  var isCallable$o = $documentAll$1.IS_HTMLDDA ? function (argument) {
    return typeof argument == 'function' || argument === documentAll$1;
  } : function (argument) {
    return typeof argument == 'function';
  };

  var objectDefineProperty = {};

  var fails$r = fails$u;

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails$r(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var isCallable$n = isCallable$o;
  var $documentAll = documentAll_1;

  var documentAll = $documentAll.all;

  var isObject$j = $documentAll.IS_HTMLDDA ? function (it) {
    return typeof it == 'object' ? it !== null : isCallable$n(it) || it === documentAll;
  } : function (it) {
    return typeof it == 'object' ? it !== null : isCallable$n(it);
  };

  var global$h = global$n;
  var isObject$i = isObject$j;

  var document$3 = global$h.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS$1 = isObject$i(document$3) && isObject$i(document$3.createElement);

  var documentCreateElement$2 = function (it) {
    return EXISTS$1 ? document$3.createElement(it) : {};
  };

  var DESCRIPTORS$d = descriptors;
  var fails$q = fails$u;
  var createElement$1 = documentCreateElement$2;

  // Thanks to IE8 for its funny defineProperty
  var ie8DomDefine = !DESCRIPTORS$d && !fails$q(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(createElement$1('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var DESCRIPTORS$c = descriptors;
  var fails$p = fails$u;

  // V8 ~ Chrome 36-
  // https://bugs.chromium.org/p/v8/issues/detail?id=3334
  var v8PrototypeDefineBug = DESCRIPTORS$c && fails$p(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(function () { /* empty */ }, 'prototype', {
      value: 42,
      writable: false
    }).prototype != 42;
  });

  var isObject$h = isObject$j;

  var $String$4 = String;
  var $TypeError$g = TypeError;

  // `Assert: Type(argument) is Object`
  var anObject$f = function (argument) {
    if (isObject$h(argument)) return argument;
    throw $TypeError$g($String$4(argument) + ' is not an object');
  };

  var NATIVE_BIND$2 = functionBindNative;

  var call$i = Function.prototype.call;

  var functionCall = NATIVE_BIND$2 ? call$i.bind(call$i) : function () {
    return call$i.apply(call$i, arguments);
  };

  var global$g = global$n;
  var isCallable$m = isCallable$o;

  var aFunction = function (argument) {
    return isCallable$m(argument) ? argument : undefined;
  };

  var getBuiltIn$7 = function (namespace, method) {
    return arguments.length < 2 ? aFunction(global$g[namespace]) : global$g[namespace] && global$g[namespace][method];
  };

  var uncurryThis$t = functionUncurryThis;

  var objectIsPrototypeOf = uncurryThis$t({}.isPrototypeOf);

  var getBuiltIn$6 = getBuiltIn$7;
  var isCallable$l = isCallable$o;
  var isPrototypeOf$2 = objectIsPrototypeOf;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;

  var $Object$3 = Object;

  var isSymbol$3 = USE_SYMBOL_AS_UID ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn$6('Symbol');
    return isCallable$l($Symbol) && isPrototypeOf$2($Symbol.prototype, $Object$3(it));
  };

  var $String$3 = String;

  var tryToString$5 = function (argument) {
    try {
      return $String$3(argument);
    } catch (error) {
      return 'Object';
    }
  };

  var isCallable$k = isCallable$o;
  var tryToString$4 = tryToString$5;

  var $TypeError$f = TypeError;

  // `Assert: IsCallable(argument) is true`
  var aCallable$b = function (argument) {
    if (isCallable$k(argument)) return argument;
    throw $TypeError$f(tryToString$4(argument) + ' is not a function');
  };

  var aCallable$a = aCallable$b;
  var isNullOrUndefined$6 = isNullOrUndefined$8;

  // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod
  var getMethod$4 = function (V, P) {
    var func = V[P];
    return isNullOrUndefined$6(func) ? undefined : aCallable$a(func);
  };

  var call$h = functionCall;
  var isCallable$j = isCallable$o;
  var isObject$g = isObject$j;

  var $TypeError$e = TypeError;

  // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive
  var ordinaryToPrimitive$1 = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable$j(fn = input.toString) && !isObject$g(val = call$h(fn, input))) return val;
    if (isCallable$j(fn = input.valueOf) && !isObject$g(val = call$h(fn, input))) return val;
    if (pref !== 'string' && isCallable$j(fn = input.toString) && !isObject$g(val = call$h(fn, input))) return val;
    throw $TypeError$e("Can't convert object to primitive value");
  };

  var call$g = functionCall;
  var isObject$f = isObject$j;
  var isSymbol$2 = isSymbol$3;
  var getMethod$3 = getMethod$4;
  var ordinaryToPrimitive = ordinaryToPrimitive$1;
  var wellKnownSymbol$k = wellKnownSymbol$m;

  var $TypeError$d = TypeError;
  var TO_PRIMITIVE = wellKnownSymbol$k('toPrimitive');

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  var toPrimitive$1 = function (input, pref) {
    if (!isObject$f(input) || isSymbol$2(input)) return input;
    var exoticToPrim = getMethod$3(input, TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = call$g(exoticToPrim, input, pref);
      if (!isObject$f(result) || isSymbol$2(result)) return result;
      throw $TypeError$d("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
  };

  var toPrimitive = toPrimitive$1;
  var isSymbol$1 = isSymbol$3;

  // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey
  var toPropertyKey$3 = function (argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol$1(key) ? key : key + '';
  };

  var DESCRIPTORS$b = descriptors;
  var IE8_DOM_DEFINE$1 = ie8DomDefine;
  var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
  var anObject$e = anObject$f;
  var toPropertyKey$2 = toPropertyKey$3;

  var $TypeError$c = TypeError;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty = Object.defineProperty;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
  var ENUMERABLE = 'enumerable';
  var CONFIGURABLE$1 = 'configurable';
  var WRITABLE = 'writable';

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  objectDefineProperty.f = DESCRIPTORS$b ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
    anObject$e(O);
    P = toPropertyKey$2(P);
    anObject$e(Attributes);
    if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
      var current = $getOwnPropertyDescriptor$1(O, P);
      if (current && current[WRITABLE]) {
        O[P] = Attributes.value;
        Attributes = {
          configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
          enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
          writable: false
        };
      }
    } return $defineProperty(O, P, Attributes);
  } : $defineProperty : function defineProperty(O, P, Attributes) {
    anObject$e(O);
    P = toPropertyKey$2(P);
    anObject$e(Attributes);
    if (IE8_DOM_DEFINE$1) try {
      return $defineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw $TypeError$c('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var makeBuiltIn$3 = {exports: {}};

  var DESCRIPTORS$a = descriptors;
  var hasOwn$a = hasOwnProperty_1;

  var FunctionPrototype$2 = Function.prototype;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getDescriptor = DESCRIPTORS$a && Object.getOwnPropertyDescriptor;

  var EXISTS = hasOwn$a(FunctionPrototype$2, 'name');
  // additional protection from minified / mangled / dropped function names
  var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
  var CONFIGURABLE = EXISTS && (!DESCRIPTORS$a || (DESCRIPTORS$a && getDescriptor(FunctionPrototype$2, 'name').configurable));

  var functionName = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
  };

  var uncurryThis$s = functionUncurryThis;
  var isCallable$i = isCallable$o;
  var store$1 = sharedStore;

  var functionToString$1 = uncurryThis$s(Function.toString);

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (!isCallable$i(store$1.inspectSource)) {
    store$1.inspectSource = function (it) {
      return functionToString$1(it);
    };
  }

  var inspectSource$3 = store$1.inspectSource;

  var global$f = global$n;
  var isCallable$h = isCallable$o;

  var WeakMap$3 = global$f.WeakMap;

  var weakMapBasicDetection = isCallable$h(WeakMap$3) && /native code/.test(String(WeakMap$3));

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

  var createNonEnumerableProperty$6 = DESCRIPTORS$9 ? function (object, key, value) {
    return definePropertyModule$4.f(object, key, createPropertyDescriptor$3(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var shared$2 = sharedExports;
  var uid$1 = uid$3;

  var keys$1 = shared$2('keys');

  var sharedKey$3 = function (key) {
    return keys$1[key] || (keys$1[key] = uid$1(key));
  };

  var hiddenKeys$5 = {};

  var NATIVE_WEAK_MAP = weakMapBasicDetection;
  var global$e = global$n;
  var isObject$e = isObject$j;
  var createNonEnumerableProperty$5 = createNonEnumerableProperty$6;
  var hasOwn$9 = hasOwnProperty_1;
  var shared$1 = sharedStore;
  var sharedKey$2 = sharedKey$3;
  var hiddenKeys$4 = hiddenKeys$5;

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var TypeError$2 = global$e.TypeError;
  var WeakMap$2 = global$e.WeakMap;
  var set$2, get$1, has$1;

  var enforce = function (it) {
    return has$1(it) ? get$1(it) : set$2(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject$e(it) || (state = get$1(it)).type !== TYPE) {
        throw TypeError$2('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (NATIVE_WEAK_MAP || shared$1.state) {
    var store = shared$1.state || (shared$1.state = new WeakMap$2());
    /* eslint-disable no-self-assign -- prototype methods protection */
    store.get = store.get;
    store.has = store.has;
    store.set = store.set;
    /* eslint-enable no-self-assign -- prototype methods protection */
    set$2 = function (it, metadata) {
      if (store.has(it)) throw TypeError$2(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      store.set(it, metadata);
      return metadata;
    };
    get$1 = function (it) {
      return store.get(it) || {};
    };
    has$1 = function (it) {
      return store.has(it);
    };
  } else {
    var STATE = sharedKey$2('state');
    hiddenKeys$4[STATE] = true;
    set$2 = function (it, metadata) {
      if (hasOwn$9(it, STATE)) throw TypeError$2(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$5(it, STATE, metadata);
      return metadata;
    };
    get$1 = function (it) {
      return hasOwn$9(it, STATE) ? it[STATE] : {};
    };
    has$1 = function (it) {
      return hasOwn$9(it, STATE);
    };
  }

  var internalState = {
    set: set$2,
    get: get$1,
    has: has$1,
    enforce: enforce,
    getterFor: getterFor
  };

  var uncurryThis$r = functionUncurryThis;
  var fails$o = fails$u;
  var isCallable$g = isCallable$o;
  var hasOwn$8 = hasOwnProperty_1;
  var DESCRIPTORS$8 = descriptors;
  var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;
  var inspectSource$2 = inspectSource$3;
  var InternalStateModule$5 = internalState;

  var enforceInternalState = InternalStateModule$5.enforce;
  var getInternalState$3 = InternalStateModule$5.get;
  var $String$2 = String;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty$8 = Object.defineProperty;
  var stringSlice$6 = uncurryThis$r(''.slice);
  var replace$3 = uncurryThis$r(''.replace);
  var join = uncurryThis$r([].join);

  var CONFIGURABLE_LENGTH = DESCRIPTORS$8 && !fails$o(function () {
    return defineProperty$8(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
  });

  var TEMPLATE = String(String).split('String');

  var makeBuiltIn$2 = makeBuiltIn$3.exports = function (value, name, options) {
    if (stringSlice$6($String$2(name), 0, 7) === 'Symbol(') {
      name = '[' + replace$3($String$2(name), /^Symbol\(([^)]*)\)/, '$1') + ']';
    }
    if (options && options.getter) name = 'get ' + name;
    if (options && options.setter) name = 'set ' + name;
    if (!hasOwn$8(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name)) {
      if (DESCRIPTORS$8) defineProperty$8(value, 'name', { value: name, configurable: true });
      else value.name = name;
    }
    if (CONFIGURABLE_LENGTH && options && hasOwn$8(options, 'arity') && value.length !== options.arity) {
      defineProperty$8(value, 'length', { value: options.arity });
    }
    try {
      if (options && hasOwn$8(options, 'constructor') && options.constructor) {
        if (DESCRIPTORS$8) defineProperty$8(value, 'prototype', { writable: false });
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
    return isCallable$g(this) && getInternalState$3(this).source || inspectSource$2(this);
  }, 'toString');

  var makeBuiltInExports = makeBuiltIn$3.exports;

  var isCallable$f = isCallable$o;
  var definePropertyModule$3 = objectDefineProperty;
  var makeBuiltIn$1 = makeBuiltInExports;
  var defineGlobalProperty$1 = defineGlobalProperty$3;

  var defineBuiltIn$9 = function (O, key, value, options) {
    if (!options) options = {};
    var simple = options.enumerable;
    var name = options.name !== undefined ? options.name : key;
    if (isCallable$f(value)) makeBuiltIn$1(value, name, options);
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

  var uncurryThis$q = functionUncurryThis;

  var toString$c = uncurryThis$q({}.toString);
  var stringSlice$5 = uncurryThis$q(''.slice);

  var classofRaw$2 = function (it) {
    return stringSlice$5(toString$c(it), 8, -1);
  };

  var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
  var isCallable$e = isCallable$o;
  var classofRaw$1 = classofRaw$2;
  var wellKnownSymbol$j = wellKnownSymbol$m;

  var TO_STRING_TAG$2 = wellKnownSymbol$j('toStringTag');
  var $Object$2 = Object;

  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw$1(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof$b = TO_STRING_TAG_SUPPORT$2 ? classofRaw$1 : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = $Object$2(it), TO_STRING_TAG$2)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw$1(O)
      // ES3 arguments fallback
      : (result = classofRaw$1(O)) == 'Object' && isCallable$e(O.callee) ? 'Arguments' : result;
  };

  var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
  var classof$a = classof$b;

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString$2 = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
    return '[object ' + classof$a(this) + ']';
  };

  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var defineBuiltIn$8 = defineBuiltIn$9;
  var toString$b = objectToString$2;

  // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if (!TO_STRING_TAG_SUPPORT) {
    defineBuiltIn$8(Object.prototype, 'toString', toString$b, { unsafe: true });
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

  var uncurryThis$p = functionUncurryThis;
  var fails$n = fails$u;
  var classof$9 = classofRaw$2;

  var $Object$1 = Object;
  var split = uncurryThis$p(''.split);

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails$n(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !$Object$1('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$9(it) == 'String' ? split(it, '') : $Object$1(it);
  } : $Object$1;

  // toObject with fallback for non-array-like ES3 strings
  var IndexedObject$4 = indexedObject;
  var requireObjectCoercible$5 = requireObjectCoercible$7;

  var toIndexedObject$9 = function (it) {
    return IndexedObject$4(requireObjectCoercible$5(it));
  };

  var DESCRIPTORS$7 = descriptors;
  var call$f = functionCall;
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
  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$7 ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$8(O);
    P = toPropertyKey$1(P);
    if (IE8_DOM_DEFINE) try {
      return $getOwnPropertyDescriptor(O, P);
    } catch (error) { /* empty */ }
    if (hasOwn$7(O, P)) return createPropertyDescriptor$2(!call$f(propertyIsEnumerableModule$1.f, O, P), O[P]);
  };

  var objectGetOwnPropertyNames = {};

  var ceil = Math.ceil;
  var floor$2 = Math.floor;

  // `Math.trunc` method
  // https://tc39.es/ecma262/#sec-math.trunc
  // eslint-disable-next-line es/no-math-trunc -- safe
  var mathTrunc = Math.trunc || function trunc(x) {
    var n = +x;
    return (n > 0 ? floor$2 : ceil)(n);
  };

  var trunc = mathTrunc;

  // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity
  var toIntegerOrInfinity$4 = function (argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- NaN check
    return number !== number || number === 0 ? 0 : trunc(number);
  };

  var toIntegerOrInfinity$3 = toIntegerOrInfinity$4;

  var max$3 = Math.max;
  var min$3 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex$4 = function (index, length) {
    var integer = toIntegerOrInfinity$3(index);
    return integer < 0 ? max$3(integer + length, 0) : min$3(integer, length);
  };

  var toIntegerOrInfinity$2 = toIntegerOrInfinity$4;

  var min$2 = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength$3 = function (argument) {
    return argument > 0 ? min$2(toIntegerOrInfinity$2(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toLength$2 = toLength$3;

  // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike
  var lengthOfArrayLike$a = function (obj) {
    return toLength$2(obj.length);
  };

  var toIndexedObject$7 = toIndexedObject$9;
  var toAbsoluteIndex$3 = toAbsoluteIndex$4;
  var lengthOfArrayLike$9 = lengthOfArrayLike$a;

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$5 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$7($this);
      var length = lengthOfArrayLike$9(O);
      var index = toAbsoluteIndex$3(fromIndex, length);
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

  var uncurryThis$o = functionUncurryThis;
  var hasOwn$6 = hasOwnProperty_1;
  var toIndexedObject$6 = toIndexedObject$9;
  var indexOf$1 = arrayIncludes.indexOf;
  var hiddenKeys$3 = hiddenKeys$5;

  var push$4 = uncurryThis$o([].push);

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject$6(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !hasOwn$6(hiddenKeys$3, key) && hasOwn$6(O, key) && push$4(result, key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (hasOwn$6(O, key = names[i++])) {
      ~indexOf$1(result, key) || push$4(result, key);
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
  var uncurryThis$n = functionUncurryThis;
  var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
  var anObject$d = anObject$f;

  var concat$2 = uncurryThis$n([].concat);

  // all object keys, includes non-enumerable and symbols
  var ownKeys$1 = getBuiltIn$5('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule$1.f(anObject$d(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
    return getOwnPropertySymbols ? concat$2(keys, getOwnPropertySymbols(it)) : keys;
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

  var fails$m = fails$u;
  var isCallable$d = isCallable$o;

  var replacement = /#|\.prototype\./;

  var isForced$3 = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : isCallable$d(detection) ? fails$m(detection)
      : !!detection;
  };

  var normalize = isForced$3.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced$3.data = {};
  var NATIVE = isForced$3.NATIVE = 'N';
  var POLYFILL = isForced$3.POLYFILL = 'P';

  var isForced_1 = isForced$3;

  var global$d = global$n;
  var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty$4 = createNonEnumerableProperty$6;
  var defineBuiltIn$7 = defineBuiltIn$9;
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
      target = global$d;
    } else if (STATIC) {
      target = global$d[TARGET] || defineGlobalProperty(TARGET, {});
    } else {
      target = (global$d[TARGET] || {}).prototype;
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
        createNonEnumerableProperty$4(sourceProperty, 'sham', true);
      }
      defineBuiltIn$7(target, key, sourceProperty, options);
    }
  };

  var classof$8 = classofRaw$2;

  var engineIsNode = typeof process != 'undefined' && classof$8(process) == 'process';

  var uncurryThis$m = functionUncurryThis;
  var aCallable$9 = aCallable$b;

  var functionUncurryThisAccessor = function (object, key, method) {
    try {
      // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
      return uncurryThis$m(aCallable$9(Object.getOwnPropertyDescriptor(object, key)[method]));
    } catch (error) { /* empty */ }
  };

  var isCallable$c = isCallable$o;

  var $String$1 = String;
  var $TypeError$b = TypeError;

  var aPossiblePrototype$1 = function (argument) {
    if (typeof argument == 'object' || isCallable$c(argument)) return argument;
    throw $TypeError$b("Can't set " + $String$1(argument) + ' as a prototype');
  };

  /* eslint-disable no-proto -- safe */

  var uncurryThisAccessor = functionUncurryThisAccessor;
  var anObject$c = anObject$f;
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
      anObject$c(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var defineProperty$7 = objectDefineProperty.f;
  var hasOwn$4 = hasOwnProperty_1;
  var wellKnownSymbol$i = wellKnownSymbol$m;

  var TO_STRING_TAG$1 = wellKnownSymbol$i('toStringTag');

  var setToStringTag$4 = function (target, TAG, STATIC) {
    if (target && !STATIC) target = target.prototype;
    if (target && !hasOwn$4(target, TO_STRING_TAG$1)) {
      defineProperty$7(target, TO_STRING_TAG$1, { configurable: true, value: TAG });
    }
  };

  var makeBuiltIn = makeBuiltInExports;
  var defineProperty$6 = objectDefineProperty;

  var defineBuiltInAccessor$3 = function (target, name, descriptor) {
    if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
    if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
    return defineProperty$6.f(target, name, descriptor);
  };

  var getBuiltIn$4 = getBuiltIn$7;
  var defineBuiltInAccessor$2 = defineBuiltInAccessor$3;
  var wellKnownSymbol$h = wellKnownSymbol$m;
  var DESCRIPTORS$6 = descriptors;

  var SPECIES$6 = wellKnownSymbol$h('species');

  var setSpecies$2 = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn$4(CONSTRUCTOR_NAME);

    if (DESCRIPTORS$6 && Constructor && !Constructor[SPECIES$6]) {
      defineBuiltInAccessor$2(Constructor, SPECIES$6, {
        configurable: true,
        get: function () { return this; }
      });
    }
  };

  var isPrototypeOf$1 = objectIsPrototypeOf;

  var $TypeError$a = TypeError;

  var anInstance$4 = function (it, Prototype) {
    if (isPrototypeOf$1(Prototype, it)) return it;
    throw $TypeError$a('Incorrect invocation');
  };

  var uncurryThis$l = functionUncurryThis;
  var fails$l = fails$u;
  var isCallable$b = isCallable$o;
  var classof$7 = classof$b;
  var getBuiltIn$3 = getBuiltIn$7;
  var inspectSource$1 = inspectSource$3;

  var noop = function () { /* empty */ };
  var empty = [];
  var construct = getBuiltIn$3('Reflect', 'construct');
  var constructorRegExp = /^\s*(?:class|function)\b/;
  var exec$2 = uncurryThis$l(constructorRegExp.exec);
  var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

  var isConstructorModern = function isConstructor(argument) {
    if (!isCallable$b(argument)) return false;
    try {
      construct(noop, empty, argument);
      return true;
    } catch (error) {
      return false;
    }
  };

  var isConstructorLegacy = function isConstructor(argument) {
    if (!isCallable$b(argument)) return false;
    switch (classof$7(argument)) {
      case 'AsyncFunction':
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction': return false;
    }
    try {
      // we can't check .prototype since constructors produced by .bind haven't it
      // `Function#toString` throws on some built-it function in some legacy engines
      // (for example, `DOMQuad` and similar in FF41-)
      return INCORRECT_TO_STRING || !!exec$2(constructorRegExp, inspectSource$1(argument));
    } catch (error) {
      return true;
    }
  };

  isConstructorLegacy.sham = true;

  // `IsConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-isconstructor
  var isConstructor$4 = !construct || fails$l(function () {
    var called;
    return isConstructorModern(isConstructorModern.call)
      || !isConstructorModern(Object)
      || !isConstructorModern(function () { called = true; })
      || called;
  }) ? isConstructorLegacy : isConstructorModern;

  var isConstructor$3 = isConstructor$4;
  var tryToString$3 = tryToString$5;

  var $TypeError$9 = TypeError;

  // `Assert: IsConstructor(argument) is true`
  var aConstructor$1 = function (argument) {
    if (isConstructor$3(argument)) return argument;
    throw $TypeError$9(tryToString$3(argument) + ' is not a constructor');
  };

  var anObject$b = anObject$f;
  var aConstructor = aConstructor$1;
  var isNullOrUndefined$5 = isNullOrUndefined$8;
  var wellKnownSymbol$g = wellKnownSymbol$m;

  var SPECIES$5 = wellKnownSymbol$g('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor
  var speciesConstructor$1 = function (O, defaultConstructor) {
    var C = anObject$b(O).constructor;
    var S;
    return C === undefined || isNullOrUndefined$5(S = anObject$b(C)[SPECIES$5]) ? defaultConstructor : aConstructor(S);
  };

  var NATIVE_BIND$1 = functionBindNative;

  var FunctionPrototype$1 = Function.prototype;
  var apply$3 = FunctionPrototype$1.apply;
  var call$e = FunctionPrototype$1.call;

  // eslint-disable-next-line es/no-reflect -- safe
  var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$1 ? call$e.bind(apply$3) : function () {
    return call$e.apply(apply$3, arguments);
  });

  var classofRaw = classofRaw$2;
  var uncurryThis$k = functionUncurryThis;

  var functionUncurryThisClause = function (fn) {
    // Nashorn bug:
    //   https://github.com/zloirock/core-js/issues/1128
    //   https://github.com/zloirock/core-js/issues/1130
    if (classofRaw(fn) === 'Function') return uncurryThis$k(fn);
  };

  var uncurryThis$j = functionUncurryThisClause;
  var aCallable$8 = aCallable$b;
  var NATIVE_BIND = functionBindNative;

  var bind$7 = uncurryThis$j(uncurryThis$j.bind);

  // optional / simple context binding
  var functionBindContext = function (fn, that) {
    aCallable$8(fn);
    return that === undefined ? fn : NATIVE_BIND ? bind$7(fn, that) : function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var getBuiltIn$2 = getBuiltIn$7;

  var html$2 = getBuiltIn$2('document', 'documentElement');

  var uncurryThis$i = functionUncurryThis;

  var arraySlice$3 = uncurryThis$i([].slice);

  var $TypeError$8 = TypeError;

  var validateArgumentsLength$1 = function (passed, required) {
    if (passed < required) throw $TypeError$8('Not enough arguments');
    return passed;
  };

  var userAgent$4 = engineUserAgent;

  // eslint-disable-next-line redos/no-vulnerable -- safe
  var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$4);

  var global$c = global$n;
  var apply$2 = functionApply;
  var bind$6 = functionBindContext;
  var isCallable$a = isCallable$o;
  var hasOwn$3 = hasOwnProperty_1;
  var fails$k = fails$u;
  var html$1 = html$2;
  var arraySlice$2 = arraySlice$3;
  var createElement = documentCreateElement$2;
  var validateArgumentsLength = validateArgumentsLength$1;
  var IS_IOS$1 = engineIsIos;
  var IS_NODE$4 = engineIsNode;

  var set$1 = global$c.setImmediate;
  var clear = global$c.clearImmediate;
  var process$3 = global$c.process;
  var Dispatch = global$c.Dispatch;
  var Function$1 = global$c.Function;
  var MessageChannel = global$c.MessageChannel;
  var String$1 = global$c.String;
  var counter = 0;
  var queue$2 = {};
  var ONREADYSTATECHANGE = 'onreadystatechange';
  var $location, defer, channel, port;

  fails$k(function () {
    // Deno throws a ReferenceError on `location` access without `--location` flag
    $location = global$c.location;
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
    global$c.postMessage(String$1(id), $location.protocol + '//' + $location.host);
  };

  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if (!set$1 || !clear) {
    set$1 = function setImmediate(handler) {
      validateArgumentsLength(arguments.length, 1);
      var fn = isCallable$a(handler) ? handler : Function$1(handler);
      var args = arraySlice$2(arguments, 1);
      queue$2[++counter] = function () {
        apply$2(fn, undefined, args);
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
      global$c.addEventListener &&
      isCallable$a(global$c.postMessage) &&
      !global$c.importScripts &&
      $location && $location.protocol !== 'file:' &&
      !fails$k(globalPostMessageDefer)
    ) {
      defer = globalPostMessageDefer;
      global$c.addEventListener('message', eventListener, false);
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
    set: set$1,
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

  var global$b = global$n;
  var bind$5 = functionBindContext;
  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
  var macrotask = task$1.set;
  var Queue$1 = queue$1;
  var IS_IOS = engineIsIos;
  var IS_IOS_PEBBLE = engineIsIosPebble;
  var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
  var IS_NODE$3 = engineIsNode;

  var MutationObserver = global$b.MutationObserver || global$b.WebKitMutationObserver;
  var document$2 = global$b.document;
  var process$2 = global$b.process;
  var Promise$3 = global$b.Promise;
  // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
  var queueMicrotaskDescriptor = getOwnPropertyDescriptor$1(global$b, 'queueMicrotask');
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
    } else if (!IS_IOS_PEBBLE && Promise$3 && Promise$3.resolve) {
      // Promise.resolve without an argument throws an error in LG WebOS 2
      promise = Promise$3.resolve(undefined);
      // workaround of WebKit ~ iOS Safari 10.1 bug
      promise.constructor = Promise$3;
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
      macrotask = bind$5(macrotask, global$b);
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

  var global$a = global$n;

  var promiseNativeConstructor = global$a.Promise;

  /* global Deno -- Deno case */

  var engineIsDeno = typeof Deno == 'object' && Deno && typeof Deno.version == 'object';

  var IS_DENO$1 = engineIsDeno;
  var IS_NODE$2 = engineIsNode;

  var engineIsBrowser = !IS_DENO$1 && !IS_NODE$2
    && typeof window == 'object'
    && typeof document == 'object';

  var global$9 = global$n;
  var NativePromiseConstructor$3 = promiseNativeConstructor;
  var isCallable$9 = isCallable$o;
  var isForced$1 = isForced_1;
  var inspectSource = inspectSource$3;
  var wellKnownSymbol$f = wellKnownSymbol$m;
  var IS_BROWSER = engineIsBrowser;
  var IS_DENO = engineIsDeno;
  var V8_VERSION$2 = engineV8Version;

  NativePromiseConstructor$3 && NativePromiseConstructor$3.prototype;
  var SPECIES$4 = wellKnownSymbol$f('species');
  var SUBCLASSING = false;
  var NATIVE_PROMISE_REJECTION_EVENT$1 = isCallable$9(global$9.PromiseRejectionEvent);

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
      constructor[SPECIES$4] = FakePromise;
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

  var $TypeError$7 = TypeError;

  var PromiseCapability = function (C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw $TypeError$7('Bad Promise constructor');
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

  var $$r = _export;
  var IS_NODE$1 = engineIsNode;
  var global$8 = global$n;
  var call$d = functionCall;
  var defineBuiltIn$6 = defineBuiltIn$9;
  var setPrototypeOf$2 = objectSetPrototypeOf;
  var setToStringTag$3 = setToStringTag$4;
  var setSpecies$1 = setSpecies$2;
  var aCallable$6 = aCallable$b;
  var isCallable$8 = isCallable$o;
  var isObject$d = isObject$j;
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
  var TypeError$1 = global$8.TypeError;
  var document$1 = global$8.document;
  var process$1 = global$8.process;
  var newPromiseCapability$1 = newPromiseCapabilityModule$4.f;
  var newGenericPromiseCapability = newPromiseCapability$1;

  var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$8.dispatchEvent);
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
    return isObject$d(it) && isCallable$8(then = it.then) ? then : false;
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
          call$d(then, result, resolve, reject);
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
      global$8.dispatchEvent(event);
    } else event = { promise: promise, reason: reason };
    if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = global$8['on' + name])) handler(event);
    else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
  };

  var onUnhandled = function (state) {
    call$d(task, global$8, function () {
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
    call$d(task, global$8, function () {
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
            call$d(then, value,
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
      call$d(Internal, this);
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
    Internal.prototype = defineBuiltIn$6(PromisePrototype, 'then', function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
      state.parent = true;
      reaction.ok = isCallable$8(onFulfilled) ? onFulfilled : true;
      reaction.fail = isCallable$8(onRejected) && onRejected;
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

    if (isCallable$8(NativePromiseConstructor$2) && NativePromisePrototype$1 !== Object.prototype) {
      nativeThen = NativePromisePrototype$1.then;

      if (!NATIVE_PROMISE_SUBCLASSING) {
        // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
        defineBuiltIn$6(NativePromisePrototype$1, 'then', function then(onFulfilled, onRejected) {
          var that = this;
          return new PromiseConstructor(function (resolve, reject) {
            call$d(nativeThen, that, resolve, reject);
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

  $$r({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR$4 }, {
    Promise: PromiseConstructor
  });

  setToStringTag$3(PromiseConstructor, PROMISE, false);
  setSpecies$1(PROMISE);

  var iterators = {};

  var wellKnownSymbol$e = wellKnownSymbol$m;
  var Iterators$4 = iterators;

  var ITERATOR$6 = wellKnownSymbol$e('iterator');
  var ArrayPrototype$1 = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod$2 = function (it) {
    return it !== undefined && (Iterators$4.Array === it || ArrayPrototype$1[ITERATOR$6] === it);
  };

  var classof$6 = classof$b;
  var getMethod$2 = getMethod$4;
  var isNullOrUndefined$4 = isNullOrUndefined$8;
  var Iterators$3 = iterators;
  var wellKnownSymbol$d = wellKnownSymbol$m;

  var ITERATOR$5 = wellKnownSymbol$d('iterator');

  var getIteratorMethod$3 = function (it) {
    if (!isNullOrUndefined$4(it)) return getMethod$2(it, ITERATOR$5)
      || getMethod$2(it, '@@iterator')
      || Iterators$3[classof$6(it)];
  };

  var call$c = functionCall;
  var aCallable$5 = aCallable$b;
  var anObject$a = anObject$f;
  var tryToString$2 = tryToString$5;
  var getIteratorMethod$2 = getIteratorMethod$3;

  var $TypeError$6 = TypeError;

  var getIterator$2 = function (argument, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod$2(argument) : usingIterator;
    if (aCallable$5(iteratorMethod)) return anObject$a(call$c(iteratorMethod, argument));
    throw $TypeError$6(tryToString$2(argument) + ' is not iterable');
  };

  var call$b = functionCall;
  var anObject$9 = anObject$f;
  var getMethod$1 = getMethod$4;

  var iteratorClose$2 = function (iterator, kind, value) {
    var innerResult, innerError;
    anObject$9(iterator);
    try {
      innerResult = getMethod$1(iterator, 'return');
      if (!innerResult) {
        if (kind === 'throw') throw value;
        return value;
      }
      innerResult = call$b(innerResult, iterator);
    } catch (error) {
      innerError = true;
      innerResult = error;
    }
    if (kind === 'throw') throw value;
    if (innerError) throw innerResult;
    anObject$9(innerResult);
    return value;
  };

  var bind$3 = functionBindContext;
  var call$a = functionCall;
  var anObject$8 = anObject$f;
  var tryToString$1 = tryToString$5;
  var isArrayIteratorMethod$1 = isArrayIteratorMethod$2;
  var lengthOfArrayLike$8 = lengthOfArrayLike$a;
  var isPrototypeOf = objectIsPrototypeOf;
  var getIterator$1 = getIterator$2;
  var getIteratorMethod$1 = getIteratorMethod$3;
  var iteratorClose$1 = iteratorClose$2;

  var $TypeError$5 = TypeError;

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
        anObject$8(value);
        return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
      } return INTERRUPTED ? fn(value, stop) : fn(value);
    };

    if (IS_RECORD) {
      iterator = iterable.iterator;
    } else if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod$1(iterable);
      if (!iterFn) throw $TypeError$5(tryToString$1(iterable) + ' is not iterable');
      // optimisation for array iterators
      if (isArrayIteratorMethod$1(iterFn)) {
        for (index = 0, length = lengthOfArrayLike$8(iterable); length > index; index++) {
          result = callFn(iterable[index]);
          if (result && isPrototypeOf(ResultPrototype, result)) return result;
        } return new Result(false);
      }
      iterator = getIterator$1(iterable, iterFn);
    }

    next = IS_RECORD ? iterable.next : iterator.next;
    while (!(step = call$a(next, iterator)).done) {
      try {
        result = callFn(step.value);
      } catch (error) {
        iteratorClose$1(iterator, 'throw', error);
      }
      if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
    } return new Result(false);
  };

  var wellKnownSymbol$c = wellKnownSymbol$m;

  var ITERATOR$4 = wellKnownSymbol$c('iterator');
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

  var $$q = _export;
  var call$9 = functionCall;
  var aCallable$4 = aCallable$b;
  var newPromiseCapabilityModule$3 = newPromiseCapability$2;
  var perform$2 = perform$4;
  var iterate$5 = iterate$6;
  var PROMISE_STATICS_INCORRECT_ITERATION$2 = promiseStaticsIncorrectIteration;

  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  $$q({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION$2 }, {
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
          call$9($promiseResolve, C, promise).then(function (value) {
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

  var $$p = _export;
  var FORCED_PROMISE_CONSTRUCTOR$2 = promiseConstructorDetection.CONSTRUCTOR;
  var NativePromiseConstructor = promiseNativeConstructor;
  var getBuiltIn$1 = getBuiltIn$7;
  var isCallable$7 = isCallable$o;
  var defineBuiltIn$5 = defineBuiltIn$9;

  var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

  // `Promise.prototype.catch` method
  // https://tc39.es/ecma262/#sec-promise.prototype.catch
  $$p({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR$2, real: true }, {
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });

  // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
  if (isCallable$7(NativePromiseConstructor)) {
    var method = getBuiltIn$1('Promise').prototype['catch'];
    if (NativePromisePrototype['catch'] !== method) {
      defineBuiltIn$5(NativePromisePrototype, 'catch', method, { unsafe: true });
    }
  }

  var $$o = _export;
  var call$8 = functionCall;
  var aCallable$3 = aCallable$b;
  var newPromiseCapabilityModule$2 = newPromiseCapability$2;
  var perform$1 = perform$4;
  var iterate$4 = iterate$6;
  var PROMISE_STATICS_INCORRECT_ITERATION$1 = promiseStaticsIncorrectIteration;

  // `Promise.race` method
  // https://tc39.es/ecma262/#sec-promise.race
  $$o({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION$1 }, {
    race: function race(iterable) {
      var C = this;
      var capability = newPromiseCapabilityModule$2.f(C);
      var reject = capability.reject;
      var result = perform$1(function () {
        var $promiseResolve = aCallable$3(C.resolve);
        iterate$4(iterable, function (promise) {
          call$8($promiseResolve, C, promise).then(capability.resolve, reject);
        });
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

  var $$n = _export;
  var call$7 = functionCall;
  var newPromiseCapabilityModule$1 = newPromiseCapability$2;
  var FORCED_PROMISE_CONSTRUCTOR$1 = promiseConstructorDetection.CONSTRUCTOR;

  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  $$n({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR$1 }, {
    reject: function reject(r) {
      var capability = newPromiseCapabilityModule$1.f(this);
      call$7(capability.reject, undefined, r);
      return capability.promise;
    }
  });

  var anObject$7 = anObject$f;
  var isObject$c = isObject$j;
  var newPromiseCapability = newPromiseCapability$2;

  var promiseResolve$1 = function (C, x) {
    anObject$7(C);
    if (isObject$c(x) && x.constructor === C) return x;
    var promiseCapability = newPromiseCapability.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  var $$m = _export;
  var getBuiltIn = getBuiltIn$7;
  var FORCED_PROMISE_CONSTRUCTOR = promiseConstructorDetection.CONSTRUCTOR;
  var promiseResolve = promiseResolve$1;

  getBuiltIn('Promise');

  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  $$m({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
    resolve: function resolve(x) {
      return promiseResolve(this, x);
    }
  });

  var objectDefineProperties = {};

  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys$1 = enumBugKeys$3;

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  var objectKeys$3 = Object.keys || function keys(O) {
    return internalObjectKeys(O, enumBugKeys$1);
  };

  var DESCRIPTORS$5 = descriptors;
  var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
  var definePropertyModule$1 = objectDefineProperty;
  var anObject$6 = anObject$f;
  var toIndexedObject$5 = toIndexedObject$9;
  var objectKeys$2 = objectKeys$3;

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  objectDefineProperties.f = DESCRIPTORS$5 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$6(O);
    var props = toIndexedObject$5(Properties);
    var keys = objectKeys$2(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) definePropertyModule$1.f(O, key = keys[index++], props[key]);
    return O;
  };

  /* global ActiveXObject -- old IE, WSH */

  var anObject$5 = anObject$f;
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
  var objectCreate$1 = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject$5(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
  };

  var wellKnownSymbol$b = wellKnownSymbol$m;
  var create$3 = objectCreate$1;
  var defineProperty$5 = objectDefineProperty.f;

  var UNSCOPABLES = wellKnownSymbol$b('unscopables');
  var ArrayPrototype = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype[UNSCOPABLES] == undefined) {
    defineProperty$5(ArrayPrototype, UNSCOPABLES, {
      configurable: true,
      value: create$3(null)
    });
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables$3 = function (key) {
    ArrayPrototype[UNSCOPABLES][key] = true;
  };

  var fails$j = fails$u;

  var correctPrototypeGetter = !fails$j(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var hasOwn$2 = hasOwnProperty_1;
  var isCallable$6 = isCallable$o;
  var toObject$9 = toObject$b;
  var sharedKey = sharedKey$3;
  var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

  var IE_PROTO = sharedKey('IE_PROTO');
  var $Object = Object;
  var ObjectPrototype = $Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  // eslint-disable-next-line es/no-object-getprototypeof -- safe
  var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
    var object = toObject$9(O);
    if (hasOwn$2(object, IE_PROTO)) return object[IE_PROTO];
    var constructor = object.constructor;
    if (isCallable$6(constructor) && object instanceof constructor) {
      return constructor.prototype;
    } return object instanceof $Object ? ObjectPrototype : null;
  };

  var fails$i = fails$u;
  var isCallable$5 = isCallable$o;
  var isObject$b = isObject$j;
  var getPrototypeOf$1 = objectGetPrototypeOf;
  var defineBuiltIn$4 = defineBuiltIn$9;
  var wellKnownSymbol$a = wellKnownSymbol$m;

  var ITERATOR$3 = wellKnownSymbol$a('iterator');
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

  var NEW_ITERATOR_PROTOTYPE = !isObject$b(IteratorPrototype$2) || fails$i(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype$2[ITERATOR$3].call(test) !== test;
  });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

  // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
  if (!isCallable$5(IteratorPrototype$2[ITERATOR$3])) {
    defineBuiltIn$4(IteratorPrototype$2, ITERATOR$3, function () {
      return this;
    });
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$2,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
  var create$2 = objectCreate$1;
  var createPropertyDescriptor$1 = createPropertyDescriptor$4;
  var setToStringTag$2 = setToStringTag$4;
  var Iterators$2 = iterators;

  var returnThis$1 = function () { return this; };

  var iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create$2(IteratorPrototype$1, { next: createPropertyDescriptor$1(+!ENUMERABLE_NEXT, next) });
    setToStringTag$2(IteratorConstructor, TO_STRING_TAG, false);
    Iterators$2[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var $$l = _export;
  var call$6 = functionCall;
  var FunctionName = functionName;
  var isCallable$4 = isCallable$o;
  var createIteratorConstructor = iteratorCreateConstructor;
  var getPrototypeOf = objectGetPrototypeOf;
  var setPrototypeOf$1 = objectSetPrototypeOf;
  var setToStringTag$1 = setToStringTag$4;
  var createNonEnumerableProperty$3 = createNonEnumerableProperty$6;
  var defineBuiltIn$3 = defineBuiltIn$9;
  var wellKnownSymbol$9 = wellKnownSymbol$m;
  var Iterators$1 = iterators;
  var IteratorsCore = iteratorsCore;

  var PROPER_FUNCTION_NAME$1 = FunctionName.PROPER;
  var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
  var IteratorPrototype = IteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$2 = wellKnownSymbol$9('iterator');
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
          } else if (!isCallable$4(CurrentIteratorPrototype[ITERATOR$2])) {
            defineBuiltIn$3(CurrentIteratorPrototype, ITERATOR$2, returnThis);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag$1(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
    if (PROPER_FUNCTION_NAME$1 && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      if (CONFIGURABLE_FUNCTION_NAME) {
        createNonEnumerableProperty$3(IterablePrototype, 'name', VALUES);
      } else {
        INCORRECT_VALUES_NAME = true;
        defaultIterator = function values() { return call$6(nativeIterator, this); };
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
          defineBuiltIn$3(IterablePrototype, KEY, methods[KEY]);
        }
      } else $$l({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
    }

    // define iterator
    if (IterablePrototype[ITERATOR$2] !== defaultIterator) {
      defineBuiltIn$3(IterablePrototype, ITERATOR$2, defaultIterator, { name: DEFAULT });
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
  var addToUnscopables$2 = addToUnscopables$3;
  var Iterators = iterators;
  var InternalStateModule$3 = internalState;
  var defineProperty$4 = objectDefineProperty.f;
  var defineIterator$2 = iteratorDefine;
  var createIterResultObject$2 = createIterResultObject$3;
  var DESCRIPTORS$4 = descriptors;

  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$3 = InternalStateModule$3.set;
  var getInternalState$2 = InternalStateModule$3.getterFor(ARRAY_ITERATOR);

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
    var state = getInternalState$2(this);
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
  addToUnscopables$2('keys');
  addToUnscopables$2('values');
  addToUnscopables$2('entries');

  // V8 ~ Chrome 45- bug
  if (DESCRIPTORS$4 && values.name !== 'values') try {
    defineProperty$4(values, 'name', { value: 'values' });
  } catch (error) { /* empty */ }

  var $$k = _export;
  var call$5 = functionCall;
  var aCallable$2 = aCallable$b;
  var newPromiseCapabilityModule = newPromiseCapability$2;
  var perform = perform$4;
  var iterate$3 = iterate$6;
  var PROMISE_STATICS_INCORRECT_ITERATION = promiseStaticsIncorrectIteration;

  // `Promise.allSettled` method
  // https://tc39.es/ecma262/#sec-promise.allsettled
  $$k({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
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
        iterate$3(iterable, function (promise) {
          var index = counter++;
          var alreadyCalled = false;
          remaining++;
          call$5(promiseResolve, C, promise).then(function (value) {
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

  var classof$5 = classof$b;

  var $String = String;

  var toString$a = function (argument) {
    if (classof$5(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
    return $String(argument);
  };

  var uncurryThis$h = functionUncurryThis;
  var toIntegerOrInfinity$1 = toIntegerOrInfinity$4;
  var toString$9 = toString$a;
  var requireObjectCoercible$4 = requireObjectCoercible$7;

  var charAt$4 = uncurryThis$h(''.charAt);
  var charCodeAt = uncurryThis$h(''.charCodeAt);
  var stringSlice$4 = uncurryThis$h(''.slice);

  var createMethod$4 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = toString$9(requireObjectCoercible$4($this));
      var position = toIntegerOrInfinity$1(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = charCodeAt(S, position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING
            ? charAt$4(S, position)
            : first
          : CONVERT_TO_STRING
            ? stringSlice$4(S, position, position + 2)
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

  var charAt$3 = stringMultibyte.charAt;
  var toString$8 = toString$a;
  var InternalStateModule$2 = internalState;
  var defineIterator$1 = iteratorDefine;
  var createIterResultObject$1 = createIterResultObject$3;

  var STRING_ITERATOR = 'String Iterator';
  var setInternalState$2 = InternalStateModule$2.set;
  var getInternalState$1 = InternalStateModule$2.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
  defineIterator$1(String, 'String', function (iterated) {
    setInternalState$2(this, {
      type: STRING_ITERATOR,
      string: toString$8(iterated),
      index: 0
    });
  // `%StringIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState$1(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return createIterResultObject$1(undefined, true);
    point = charAt$3(string, index);
    state.index += point.length;
    return createIterResultObject$1(point, false);
  });

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

  var global$7 = global$n;
  var DOMIterables$1 = domIterables;
  var DOMTokenListPrototype$1 = domTokenListPrototype;
  var ArrayIteratorMethods = es_array_iterator;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$6;
  var wellKnownSymbol$8 = wellKnownSymbol$m;

  var ITERATOR$1 = wellKnownSymbol$8('iterator');
  var TO_STRING_TAG = wellKnownSymbol$8('toStringTag');
  var ArrayValues = ArrayIteratorMethods.values;

  var handlePrototype$1 = function (CollectionPrototype, COLLECTION_NAME) {
    if (CollectionPrototype) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[ITERATOR$1] !== ArrayValues) try {
        createNonEnumerableProperty$2(CollectionPrototype, ITERATOR$1, ArrayValues);
      } catch (error) {
        CollectionPrototype[ITERATOR$1] = ArrayValues;
      }
      if (!CollectionPrototype[TO_STRING_TAG]) {
        createNonEnumerableProperty$2(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
      }
      if (DOMIterables$1[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
          createNonEnumerableProperty$2(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
        } catch (error) {
          CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
        }
      }
    }
  };

  for (var COLLECTION_NAME$1 in DOMIterables$1) {
    handlePrototype$1(global$7[COLLECTION_NAME$1] && global$7[COLLECTION_NAME$1].prototype, COLLECTION_NAME$1);
  }

  handlePrototype$1(DOMTokenListPrototype$1, 'DOMTokenList');

  var toObject$8 = toObject$b;
  var toAbsoluteIndex$2 = toAbsoluteIndex$4;
  var lengthOfArrayLike$7 = lengthOfArrayLike$a;

  // `Array.prototype.fill` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.fill
  var arrayFill = function fill(value /* , start = 0, end = @length */) {
    var O = toObject$8(this);
    var length = lengthOfArrayLike$7(O);
    var argumentsLength = arguments.length;
    var index = toAbsoluteIndex$2(argumentsLength > 1 ? arguments[1] : undefined, length);
    var end = argumentsLength > 2 ? arguments[2] : undefined;
    var endPos = end === undefined ? length : toAbsoluteIndex$2(end, length);
    while (endPos > index) O[index++] = value;
    return O;
  };

  var $$j = _export;
  var fill = arrayFill;
  var addToUnscopables$1 = addToUnscopables$3;

  // `Array.prototype.fill` method
  // https://tc39.es/ecma262/#sec-array.prototype.fill
  $$j({ target: 'Array', proto: true }, {
    fill: fill
  });

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables$1('fill');

  var classof$4 = classofRaw$2;

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray$5 = Array.isArray || function isArray(argument) {
    return classof$4(argument) == 'Array';
  };

  var toPropertyKey = toPropertyKey$3;
  var definePropertyModule = objectDefineProperty;
  var createPropertyDescriptor = createPropertyDescriptor$4;

  var createProperty$4 = function (object, key, value) {
    var propertyKey = toPropertyKey(key);
    if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
    else object[propertyKey] = value;
  };

  var fails$h = fails$u;
  var wellKnownSymbol$7 = wellKnownSymbol$m;
  var V8_VERSION$1 = engineV8Version;

  var SPECIES$3 = wellKnownSymbol$7('species');

  var arrayMethodHasSpeciesSupport$4 = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return V8_VERSION$1 >= 51 || !fails$h(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$3] = function () {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var $$i = _export;
  var isArray$4 = isArray$5;
  var isConstructor$2 = isConstructor$4;
  var isObject$a = isObject$j;
  var toAbsoluteIndex$1 = toAbsoluteIndex$4;
  var lengthOfArrayLike$6 = lengthOfArrayLike$a;
  var toIndexedObject$3 = toIndexedObject$9;
  var createProperty$3 = createProperty$4;
  var wellKnownSymbol$6 = wellKnownSymbol$m;
  var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$4;
  var nativeSlice = arraySlice$3;

  var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$3('slice');

  var SPECIES$2 = wellKnownSymbol$6('species');
  var $Array$3 = Array;
  var max$2 = Math.max;

  // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  $$i({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
    slice: function slice(start, end) {
      var O = toIndexedObject$3(this);
      var length = lengthOfArrayLike$6(O);
      var k = toAbsoluteIndex$1(start, length);
      var fin = toAbsoluteIndex$1(end === undefined ? length : end, length);
      // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
      var Constructor, result, n;
      if (isArray$4(O)) {
        Constructor = O.constructor;
        // cross-realm fallback
        if (isConstructor$2(Constructor) && (Constructor === $Array$3 || isArray$4(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject$a(Constructor)) {
          Constructor = Constructor[SPECIES$2];
          if (Constructor === null) Constructor = undefined;
        }
        if (Constructor === $Array$3 || Constructor === undefined) {
          return nativeSlice(O, k, fin);
        }
      }
      result = new (Constructor === undefined ? $Array$3 : Constructor)(max$2(fin - k, 0));
      for (n = 0; k < fin; k++, n++) if (k in O) createProperty$3(result, n, O[k]);
      result.length = n;
      return result;
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


  function __awaiter(thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  }

  function __classPrivateFieldGet(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  }

  var eventemitter3 = {exports: {}};

  (function (module) {

  	var has = Object.prototype.hasOwnProperty
  	  , prefix = '~';

  	/**
  	 * Constructor to create a storage for our `EE` objects.
  	 * An `Events` instance is a plain object whose properties are event names.
  	 *
  	 * @constructor
  	 * @private
  	 */
  	function Events() {}

  	//
  	// We try to not inherit from `Object.prototype`. In some engines creating an
  	// instance in this way is faster than calling `Object.create(null)` directly.
  	// If `Object.create(null)` is not supported we prefix the event names with a
  	// character to make sure that the built-in object properties are not
  	// overridden or used as an attack vector.
  	//
  	if (Object.create) {
  	  Events.prototype = Object.create(null);

  	  //
  	  // This hack is needed because the `__proto__` property is still inherited in
  	  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  	  //
  	  if (!new Events().__proto__) prefix = false;
  	}

  	/**
  	 * Representation of a single event listener.
  	 *
  	 * @param {Function} fn The listener function.
  	 * @param {*} context The context to invoke the listener with.
  	 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
  	 * @constructor
  	 * @private
  	 */
  	function EE(fn, context, once) {
  	  this.fn = fn;
  	  this.context = context;
  	  this.once = once || false;
  	}

  	/**
  	 * Add a listener for a given event.
  	 *
  	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
  	 * @param {(String|Symbol)} event The event name.
  	 * @param {Function} fn The listener function.
  	 * @param {*} context The context to invoke the listener with.
  	 * @param {Boolean} once Specify if the listener is a one-time listener.
  	 * @returns {EventEmitter}
  	 * @private
  	 */
  	function addListener(emitter, event, fn, context, once) {
  	  if (typeof fn !== 'function') {
  	    throw new TypeError('The listener must be a function');
  	  }

  	  var listener = new EE(fn, context || emitter, once)
  	    , evt = prefix ? prefix + event : event;

  	  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  	  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  	  else emitter._events[evt] = [emitter._events[evt], listener];

  	  return emitter;
  	}

  	/**
  	 * Clear event by name.
  	 *
  	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
  	 * @param {(String|Symbol)} evt The Event name.
  	 * @private
  	 */
  	function clearEvent(emitter, evt) {
  	  if (--emitter._eventsCount === 0) emitter._events = new Events();
  	  else delete emitter._events[evt];
  	}

  	/**
  	 * Minimal `EventEmitter` interface that is molded against the Node.js
  	 * `EventEmitter` interface.
  	 *
  	 * @constructor
  	 * @public
  	 */
  	function EventEmitter() {
  	  this._events = new Events();
  	  this._eventsCount = 0;
  	}

  	/**
  	 * Return an array listing the events for which the emitter has registered
  	 * listeners.
  	 *
  	 * @returns {Array}
  	 * @public
  	 */
  	EventEmitter.prototype.eventNames = function eventNames() {
  	  var names = []
  	    , events
  	    , name;

  	  if (this._eventsCount === 0) return names;

  	  for (name in (events = this._events)) {
  	    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  	  }

  	  if (Object.getOwnPropertySymbols) {
  	    return names.concat(Object.getOwnPropertySymbols(events));
  	  }

  	  return names;
  	};

  	/**
  	 * Return the listeners registered for a given event.
  	 *
  	 * @param {(String|Symbol)} event The event name.
  	 * @returns {Array} The registered listeners.
  	 * @public
  	 */
  	EventEmitter.prototype.listeners = function listeners(event) {
  	  var evt = prefix ? prefix + event : event
  	    , handlers = this._events[evt];

  	  if (!handlers) return [];
  	  if (handlers.fn) return [handlers.fn];

  	  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
  	    ee[i] = handlers[i].fn;
  	  }

  	  return ee;
  	};

  	/**
  	 * Return the number of listeners listening to a given event.
  	 *
  	 * @param {(String|Symbol)} event The event name.
  	 * @returns {Number} The number of listeners.
  	 * @public
  	 */
  	EventEmitter.prototype.listenerCount = function listenerCount(event) {
  	  var evt = prefix ? prefix + event : event
  	    , listeners = this._events[evt];

  	  if (!listeners) return 0;
  	  if (listeners.fn) return 1;
  	  return listeners.length;
  	};

  	/**
  	 * Calls each of the listeners registered for a given event.
  	 *
  	 * @param {(String|Symbol)} event The event name.
  	 * @returns {Boolean} `true` if the event had listeners, else `false`.
  	 * @public
  	 */
  	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  	  var evt = prefix ? prefix + event : event;

  	  if (!this._events[evt]) return false;

  	  var listeners = this._events[evt]
  	    , len = arguments.length
  	    , args
  	    , i;

  	  if (listeners.fn) {
  	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

  	    switch (len) {
  	      case 1: return listeners.fn.call(listeners.context), true;
  	      case 2: return listeners.fn.call(listeners.context, a1), true;
  	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
  	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
  	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
  	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
  	    }

  	    for (i = 1, args = new Array(len -1); i < len; i++) {
  	      args[i - 1] = arguments[i];
  	    }

  	    listeners.fn.apply(listeners.context, args);
  	  } else {
  	    var length = listeners.length
  	      , j;

  	    for (i = 0; i < length; i++) {
  	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

  	      switch (len) {
  	        case 1: listeners[i].fn.call(listeners[i].context); break;
  	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
  	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
  	        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
  	        default:
  	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
  	            args[j - 1] = arguments[j];
  	          }

  	          listeners[i].fn.apply(listeners[i].context, args);
  	      }
  	    }
  	  }

  	  return true;
  	};

  	/**
  	 * Add a listener for a given event.
  	 *
  	 * @param {(String|Symbol)} event The event name.
  	 * @param {Function} fn The listener function.
  	 * @param {*} [context=this] The context to invoke the listener with.
  	 * @returns {EventEmitter} `this`.
  	 * @public
  	 */
  	EventEmitter.prototype.on = function on(event, fn, context) {
  	  return addListener(this, event, fn, context, false);
  	};

  	/**
  	 * Add a one-time listener for a given event.
  	 *
  	 * @param {(String|Symbol)} event The event name.
  	 * @param {Function} fn The listener function.
  	 * @param {*} [context=this] The context to invoke the listener with.
  	 * @returns {EventEmitter} `this`.
  	 * @public
  	 */
  	EventEmitter.prototype.once = function once(event, fn, context) {
  	  return addListener(this, event, fn, context, true);
  	};

  	/**
  	 * Remove the listeners of a given event.
  	 *
  	 * @param {(String|Symbol)} event The event name.
  	 * @param {Function} fn Only remove the listeners that match this function.
  	 * @param {*} context Only remove the listeners that have this context.
  	 * @param {Boolean} once Only remove one-time listeners.
  	 * @returns {EventEmitter} `this`.
  	 * @public
  	 */
  	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  	  var evt = prefix ? prefix + event : event;

  	  if (!this._events[evt]) return this;
  	  if (!fn) {
  	    clearEvent(this, evt);
  	    return this;
  	  }

  	  var listeners = this._events[evt];

  	  if (listeners.fn) {
  	    if (
  	      listeners.fn === fn &&
  	      (!once || listeners.once) &&
  	      (!context || listeners.context === context)
  	    ) {
  	      clearEvent(this, evt);
  	    }
  	  } else {
  	    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
  	      if (
  	        listeners[i].fn !== fn ||
  	        (once && !listeners[i].once) ||
  	        (context && listeners[i].context !== context)
  	      ) {
  	        events.push(listeners[i]);
  	      }
  	    }

  	    //
  	    // Reset the array, or remove it completely if we have no more listeners.
  	    //
  	    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
  	    else clearEvent(this, evt);
  	  }

  	  return this;
  	};

  	/**
  	 * Remove all listeners, or those of the specified event.
  	 *
  	 * @param {(String|Symbol)} [event] The event name.
  	 * @returns {EventEmitter} `this`.
  	 * @public
  	 */
  	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  	  var evt;

  	  if (event) {
  	    evt = prefix ? prefix + event : event;
  	    if (this._events[evt]) clearEvent(this, evt);
  	  } else {
  	    this._events = new Events();
  	    this._eventsCount = 0;
  	  }

  	  return this;
  	};

  	//
  	// Alias methods names because people roll like that.
  	//
  	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  	//
  	// Expose the prefix.
  	//
  	EventEmitter.prefixed = prefix;

  	//
  	// Allow `EventEmitter` to be imported as module namespace.
  	//
  	EventEmitter.EventEmitter = EventEmitter;

  	//
  	// Expose the module.
  	//
  	{
  	  module.exports = EventEmitter;
  	} 
  } (eventemitter3));

  var eventemitter3Exports = eventemitter3.exports;
  var EventEmitter = /*@__PURE__*/getDefaultExportFromCjs(eventemitter3Exports);

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray$2 = Array.isArray;

  var isArray$3 = isArray$2;

  /**
   * Casts `value` as an array if it's not one.
   *
   * @static
   * @memberOf _
   * @since 4.4.0
   * @category Lang
   * @param {*} value The value to inspect.
   * @returns {Array} Returns the cast array.
   * @example
   *
   * _.castArray(1);
   * // => [1]
   *
   * _.castArray({ 'a': 1 });
   * // => [{ 'a': 1 }]
   *
   * _.castArray('abc');
   * // => ['abc']
   *
   * _.castArray(null);
   * // => [null]
   *
   * _.castArray(undefined);
   * // => [undefined]
   *
   * _.castArray();
   * // => []
   *
   * var array = [1, 2, 3];
   * console.log(_.castArray(array) === array);
   * // => true
   */
  function castArray() {
    if (!arguments.length) {
      return [];
    }
    var value = arguments[0];
    return isArray$3(value) ? value : [value];
  }

  var isArray$1 = isArray$5;
  var isConstructor$1 = isConstructor$4;
  var isObject$9 = isObject$j;
  var wellKnownSymbol$5 = wellKnownSymbol$m;

  var SPECIES$1 = wellKnownSymbol$5('species');
  var $Array$2 = Array;

  // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesConstructor$1 = function (originalArray) {
    var C;
    if (isArray$1(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (isConstructor$1(C) && (C === $Array$2 || isArray$1(C.prototype))) C = undefined;
      else if (isObject$9(C)) {
        C = C[SPECIES$1];
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
  var uncurryThis$g = functionUncurryThis;
  var IndexedObject$3 = indexedObject;
  var toObject$7 = toObject$b;
  var lengthOfArrayLike$5 = lengthOfArrayLike$a;
  var arraySpeciesCreate$1 = arraySpeciesCreate$2;

  var push$3 = uncurryThis$g([].push);

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
      var O = toObject$7($this);
      var self = IndexedObject$3(O);
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
            case 2: push$3(target, value);      // filter
          } else switch (TYPE) {
            case 4: return false;             // every
            case 7: push$3(target, value);      // filterReject
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

  var $$h = _export;
  var $map = arrayIteration.map;
  var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$4;

  var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$2('map');

  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  // with adding support of @@species
  $$h({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
    map: function map(callbackfn /* , thisArg */) {
      return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var DESCRIPTORS$3 = descriptors;
  var uncurryThis$f = functionUncurryThis;
  var call$4 = functionCall;
  var fails$g = fails$u;
  var objectKeys$1 = objectKeys$3;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var toObject$6 = toObject$b;
  var IndexedObject$2 = indexedObject;

  // eslint-disable-next-line es/no-object-assign -- safe
  var $assign = Object.assign;
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  var defineProperty$3 = Object.defineProperty;
  var concat$1 = uncurryThis$f([].concat);

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  var objectAssign = !$assign || fails$g(function () {
    // should have correct order of operations (Edge bug)
    if (DESCRIPTORS$3 && $assign({ b: 1 }, $assign(defineProperty$3({}, 'a', {
      enumerable: true,
      get: function () {
        defineProperty$3(this, 'b', {
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
    return $assign({}, A)[symbol] != 7 || objectKeys$1($assign({}, B)).join('') != alphabet;
  }) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
    var T = toObject$6(target);
    var argumentsLength = arguments.length;
    var index = 1;
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    var propertyIsEnumerable = propertyIsEnumerableModule.f;
    while (argumentsLength > index) {
      var S = IndexedObject$2(arguments[index++]);
      var keys = getOwnPropertySymbols ? concat$1(objectKeys$1(S), getOwnPropertySymbols(S)) : objectKeys$1(S);
      var length = keys.length;
      var j = 0;
      var key;
      while (length > j) {
        key = keys[j++];
        if (!DESCRIPTORS$3 || call$4(propertyIsEnumerable, S, key)) T[key] = S[key];
      }
    } return T;
  } : $assign;

  var $$g = _export;
  var assign = objectAssign;

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  // eslint-disable-next-line es/no-object-assign -- required for testing
  $$g({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign }, {
    assign: assign
  });

  var internalMetadata = {exports: {}};

  var objectGetOwnPropertyNamesExternal = {};

  var toAbsoluteIndex = toAbsoluteIndex$4;
  var lengthOfArrayLike$4 = lengthOfArrayLike$a;
  var createProperty$2 = createProperty$4;

  var $Array$1 = Array;
  var max$1 = Math.max;

  var arraySliceSimple = function (O, start, end) {
    var length = lengthOfArrayLike$4(O);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    var result = $Array$1(max$1(fin - k, 0));
    for (var n = 0; k < fin; k++, n++) createProperty$2(result, n, O[k]);
    result.length = n;
    return result;
  };

  /* eslint-disable es/no-object-getownpropertynames -- safe */

  var classof$3 = classofRaw$2;
  var toIndexedObject$2 = toIndexedObject$9;
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
      : $getOwnPropertyNames(toIndexedObject$2(it));
  };

  // FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it
  var fails$f = fails$u;

  var arrayBufferNonExtensible = fails$f(function () {
    if (typeof ArrayBuffer == 'function') {
      var buffer = new ArrayBuffer(8);
      // eslint-disable-next-line es/no-object-isextensible, es/no-object-defineproperty -- safe
      if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 });
    }
  });

  var fails$e = fails$u;
  var isObject$8 = isObject$j;
  var classof$2 = classofRaw$2;
  var ARRAY_BUFFER_NON_EXTENSIBLE = arrayBufferNonExtensible;

  // eslint-disable-next-line es/no-object-isextensible -- safe
  var $isExtensible = Object.isExtensible;
  var FAILS_ON_PRIMITIVES$1 = fails$e(function () { $isExtensible(1); });

  // `Object.isExtensible` method
  // https://tc39.es/ecma262/#sec-object.isextensible
  var objectIsExtensible = (FAILS_ON_PRIMITIVES$1 || ARRAY_BUFFER_NON_EXTENSIBLE) ? function isExtensible(it) {
    if (!isObject$8(it)) return false;
    if (ARRAY_BUFFER_NON_EXTENSIBLE && classof$2(it) == 'ArrayBuffer') return false;
    return $isExtensible ? $isExtensible(it) : true;
  } : $isExtensible;

  var fails$d = fails$u;

  var freezing = !fails$d(function () {
    // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
    return Object.isExtensible(Object.preventExtensions({}));
  });

  var $$f = _export;
  var uncurryThis$e = functionUncurryThis;
  var hiddenKeys = hiddenKeys$5;
  var isObject$7 = isObject$j;
  var hasOwn$1 = hasOwnProperty_1;
  var defineProperty$2 = objectDefineProperty.f;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertyNamesExternalModule = objectGetOwnPropertyNamesExternal;
  var isExtensible = objectIsExtensible;
  var uid = uid$3;
  var FREEZING = freezing;

  var REQUIRED = false;
  var METADATA = uid('meta');
  var id$1 = 0;

  var setMetadata = function (it) {
    defineProperty$2(it, METADATA, { value: {
      objectID: 'O' + id$1++, // object ID
      weakData: {}          // weak collections IDs
    } });
  };

  var fastKey$1 = function (it, create) {
    // return a primitive with prefix
    if (!isObject$7(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
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
    var splice = uncurryThis$e([].splice);
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

      $$f({ target: 'Object', stat: true, forced: true }, {
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

  var isCallable$3 = isCallable$o;
  var isObject$6 = isObject$j;
  var setPrototypeOf = objectSetPrototypeOf;

  // makes subclassing work correct for wrapped built-ins
  var inheritIfRequired$1 = function ($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if (
      // it can work only with native `setPrototypeOf`
      setPrototypeOf &&
      // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
      isCallable$3(NewTarget = dummy.constructor) &&
      NewTarget !== Wrapper &&
      isObject$6(NewTargetPrototype = NewTarget.prototype) &&
      NewTargetPrototype !== Wrapper.prototype
    ) setPrototypeOf($this, NewTargetPrototype);
    return $this;
  };

  var $$e = _export;
  var global$6 = global$n;
  var uncurryThis$d = functionUncurryThis;
  var isForced = isForced_1;
  var defineBuiltIn$2 = defineBuiltIn$9;
  var InternalMetadataModule = internalMetadataExports;
  var iterate$2 = iterate$6;
  var anInstance$2 = anInstance$4;
  var isCallable$2 = isCallable$o;
  var isNullOrUndefined$3 = isNullOrUndefined$8;
  var isObject$5 = isObject$j;
  var fails$c = fails$u;
  var checkCorrectnessOfIteration$1 = checkCorrectnessOfIteration$3;
  var setToStringTag = setToStringTag$4;
  var inheritIfRequired = inheritIfRequired$1;

  var collection$3 = function (CONSTRUCTOR_NAME, wrapper, common) {
    var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
    var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
    var ADDER = IS_MAP ? 'set' : 'add';
    var NativeConstructor = global$6[CONSTRUCTOR_NAME];
    var NativePrototype = NativeConstructor && NativeConstructor.prototype;
    var Constructor = NativeConstructor;
    var exported = {};

    var fixMethod = function (KEY) {
      var uncurriedNativeMethod = uncurryThis$d(NativePrototype[KEY]);
      defineBuiltIn$2(NativePrototype, KEY,
        KEY == 'add' ? function add(value) {
          uncurriedNativeMethod(this, value === 0 ? 0 : value);
          return this;
        } : KEY == 'delete' ? function (key) {
          return IS_WEAK && !isObject$5(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
        } : KEY == 'get' ? function get(key) {
          return IS_WEAK && !isObject$5(key) ? undefined : uncurriedNativeMethod(this, key === 0 ? 0 : key);
        } : KEY == 'has' ? function has(key) {
          return IS_WEAK && !isObject$5(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
        } : function set(key, value) {
          uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
          return this;
        }
      );
    };

    var REPLACE = isForced(
      CONSTRUCTOR_NAME,
      !isCallable$2(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails$c(function () {
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
      var THROWS_ON_PRIMITIVES = fails$c(function () { instance.has(1); });
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      // eslint-disable-next-line no-new -- required for testing
      var ACCEPT_ITERABLES = checkCorrectnessOfIteration$1(function (iterable) { new NativeConstructor(iterable); });
      // for early implementations -0 and +0 not the same
      var BUGGY_ZERO = !IS_WEAK && fails$c(function () {
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
          if (!isNullOrUndefined$3(iterable)) iterate$2(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
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
    $$e({ global: true, constructor: true, forced: Constructor != NativeConstructor }, exported);

    setToStringTag(Constructor, CONSTRUCTOR_NAME);

    if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

    return Constructor;
  };

  var defineBuiltIn$1 = defineBuiltIn$9;

  var defineBuiltIns$2 = function (target, src, options) {
    for (var key in src) defineBuiltIn$1(target, key, src[key], options);
    return target;
  };

  var uncurryThis$c = functionUncurryThis;
  var defineBuiltIns$1 = defineBuiltIns$2;
  var getWeakData = internalMetadataExports.getWeakData;
  var anInstance$1 = anInstance$4;
  var anObject$4 = anObject$f;
  var isNullOrUndefined$2 = isNullOrUndefined$8;
  var isObject$4 = isObject$j;
  var iterate$1 = iterate$6;
  var ArrayIterationModule = arrayIteration;
  var hasOwn = hasOwnProperty_1;
  var InternalStateModule$1 = internalState;

  var setInternalState$1 = InternalStateModule$1.set;
  var internalStateGetterFor$1 = InternalStateModule$1.getterFor;
  var find = ArrayIterationModule.find;
  var findIndex = ArrayIterationModule.findIndex;
  var splice$1 = uncurryThis$c([].splice);
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
      if (~index) splice$1(this.entries, index, 1);
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
        if (!isNullOrUndefined$2(iterable)) iterate$1(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
      });

      var Prototype = Constructor.prototype;

      var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);

      var define = function (that, key, value) {
        var state = getInternalState(that);
        var data = getWeakData(anObject$4(key), true);
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

  var collection$2 = collection$3;
  var collectionWeak = collectionWeak$1;

  // `WeakSet` constructor
  // https://tc39.es/ecma262/#sec-weakset-constructor
  collection$2('WeakSet', function (init) {
    return function WeakSet() { return init(this, arguments.length ? arguments[0] : undefined); };
  }, collectionWeak);

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
  var OPTIONS_DEFAULT_DOMAIN_TYPE = 'hour';
  var OPTIONS_DEFAULT_SUBDOMAIN_TYPE = 'minute';
  var OPTIONS_DEFAULT_SUBDOMAIN_WIDTH = 10;
  var OPTIONS_DEFAULT_SUBDOMAIN_HEIGHT = 10;
  var OPTIONS_DEFAULT_SUBDOMAIN_GUTTER = 2;
  var OPTIONS_DEFAULT_SUBDOMAIN_RADIUS = 0;
  var OPTIONS_DEFAULT_ANIMATION_DURATION = 200;
  var OPTIONS_DEFAULT_RANGE = 12;
  var OPTIONS_DEFAULT_ITEM_SELECTOR = '#cal-heatmap';
  var OPTIONS_DEFAULT_THEME = 'light';
  var OPTIONS_DEFAULT_LOCALE = 'en';
  var SCALE_BASE_OPACITY_COLOR = 'red';
  var SCALE_BASE_COLOR_SCHEME = 'YlOrBr';
  var SCALE_BASE_COLOR_TYPE = 'quantize';
  var SCALE_BASE_COLOR_DOMAIN = [0, 100];

  var _Navigator_instances, _Navigator_isDomainBoundaryReached, _Navigator_setDomainsBoundaryReached;
  var Navigator = /*#__PURE__*/function () {
    function Navigator(calendar) {
      _classCallCheck(this, Navigator);
      _Navigator_instances.add(this);
      this.calendar = calendar;
      this.maxDomainReached = false;
      this.minDomainReached = false;
    }
    _createClass(Navigator, [{
      key: "loadNewDomains",
      value: function loadNewDomains(newDomainCollection) {
        var _this = this;
        var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ScrollDirection.SCROLL_NONE;
        var options = this.calendar.options.options;
        var templatesClt = this.calendar.templateCollection;
        var minDate = options.date.min ? templatesClt.get(options.domain.type).extractUnit(+options.date.min) : undefined;
        var maxDate = options.date.max ? templatesClt.get(options.domain.type).extractUnit(+options.date.max) : undefined;
        var domainCollection = this.calendar.domainCollection;
        if (__classPrivateFieldGet(this, _Navigator_instances, "m", _Navigator_isDomainBoundaryReached).call(this, newDomainCollection, minDate, maxDate, direction)) {
          return ScrollDirection.SCROLL_NONE;
        }
        if (direction !== ScrollDirection.SCROLL_NONE) {
          newDomainCollection.clamp(minDate, maxDate).slice(options.range, direction === ScrollDirection.SCROLL_FORWARD);
        }
        domainCollection.merge(newDomainCollection, options.range, function (domainKey, index) {
          var subDomainEndDate = null;
          if (newDomainCollection.at(index + 1)) {
            subDomainEndDate = newDomainCollection.at(index + 1);
          } else {
            subDomainEndDate = _this.calendar.dateHelper.intervals(options.domain.type, domainKey, 2).pop();
          }
          return templatesClt.get(options.subDomain.type).mapping(domainKey, subDomainEndDate).map(function (d) {
            return Object.assign(Object.assign({}, d), {
              v: options.data.defaultValue
            });
          });
        });
        __classPrivateFieldGet(this, _Navigator_instances, "m", _Navigator_setDomainsBoundaryReached).call(this, domainCollection.min, domainCollection.max, minDate, maxDate);
        if (direction === ScrollDirection.SCROLL_BACKWARD) {
          this.calendar.eventEmitter.emit('domainsLoaded', [domainCollection.min]);
        } else if (direction === ScrollDirection.SCROLL_FORWARD) {
          this.calendar.eventEmitter.emit('domainsLoaded', [domainCollection.max]);
        }
        return direction;
      }
    }, {
      key: "jumpTo",
      value: function jumpTo(date, reset) {
        var _this$calendar = this.calendar,
          domainCollection = _this$calendar.domainCollection,
          options = _this$calendar.options;
        var minDate = new Date(domainCollection.min);
        var maxDate = new Date(domainCollection.max);
        if (date < minDate) {
          return this.loadNewDomains(this.calendar.createDomainCollection(date, minDate, false), ScrollDirection.SCROLL_BACKWARD);
        }
        if (reset) {
          return this.loadNewDomains(this.calendar.createDomainCollection(date, options.options.range), minDate < date ? ScrollDirection.SCROLL_FORWARD : ScrollDirection.SCROLL_BACKWARD);
        }
        if (date > maxDate) {
          return this.loadNewDomains(this.calendar.createDomainCollection(maxDate, date, false), ScrollDirection.SCROLL_FORWARD);
        }
        return ScrollDirection.SCROLL_NONE;
      }
    }]);
    return Navigator;
  }();
  _Navigator_instances = new WeakSet(), _Navigator_isDomainBoundaryReached = function _Navigator_isDomainBoundaryReached(newDomainCollection, minDate, maxDate, direction) {
    if (maxDate && newDomainCollection.max >= maxDate && this.maxDomainReached && direction === ScrollDirection.SCROLL_FORWARD) {
      return true;
    }
    if (minDate && newDomainCollection.min <= minDate && this.minDomainReached && direction === ScrollDirection.SCROLL_BACKWARD) {
      return true;
    }
    return false;
  }, _Navigator_setDomainsBoundaryReached = function _Navigator_setDomainsBoundaryReached(lowerBound, upperBound, min, max) {
    if (min) {
      var reached = lowerBound <= min;
      this.calendar.eventEmitter.emit(reached ? 'minDateReached' : 'minDateNotReached');
      this.minDomainReached = reached;
    }
    if (max) {
      var _reached = upperBound >= max;
      this.calendar.eventEmitter.emit(_reached ? 'maxDateReached' : 'maxDateNotReached');
      this.maxDomainReached = _reached;
    }
  };

  var $TypeError$4 = TypeError;
  var MAX_SAFE_INTEGER$2 = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

  var doesNotExceedSafeInteger$1 = function (it) {
    if (it > MAX_SAFE_INTEGER$2) throw $TypeError$4('Maximum allowed index exceeded');
    return it;
  };

  var $$d = _export;
  var fails$b = fails$u;
  var isArray = isArray$5;
  var isObject$3 = isObject$j;
  var toObject$5 = toObject$b;
  var lengthOfArrayLike$3 = lengthOfArrayLike$a;
  var doesNotExceedSafeInteger = doesNotExceedSafeInteger$1;
  var createProperty$1 = createProperty$4;
  var arraySpeciesCreate = arraySpeciesCreate$2;
  var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$4;
  var wellKnownSymbol$4 = wellKnownSymbol$m;
  var V8_VERSION = engineV8Version;

  var IS_CONCAT_SPREADABLE = wellKnownSymbol$4('isConcatSpreadable');

  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679
  var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$b(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });

  var isConcatSpreadable = function (O) {
    if (!isObject$3(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray(O);
  };

  var FORCED$4 = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport$1('concat');

  // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  $$d({ target: 'Array', proto: true, arity: 1, forced: FORCED$4 }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    concat: function concat(arg) {
      var O = toObject$5(this);
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

  var fails$a = fails$u;

  var arrayMethodIsStrict$4 = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails$a(function () {
      // eslint-disable-next-line no-useless-call -- required for testing
      method.call(null, argument || function () { return 1; }, 1);
    });
  };

  var $$c = _export;
  var uncurryThis$b = functionUncurryThis;
  var IndexedObject$1 = indexedObject;
  var toIndexedObject$1 = toIndexedObject$9;
  var arrayMethodIsStrict$3 = arrayMethodIsStrict$4;

  var nativeJoin = uncurryThis$b([].join);

  var ES3_STRINGS = IndexedObject$1 != Object;
  var FORCED$3 = ES3_STRINGS || !arrayMethodIsStrict$3('join', ',');

  // `Array.prototype.join` method
  // https://tc39.es/ecma262/#sec-array.prototype.join
  $$c({ target: 'Array', proto: true, forced: FORCED$3 }, {
    join: function join(separator) {
      return nativeJoin(toIndexedObject$1(this), separator === undefined ? ',' : separator);
    }
  });

  var create$1 = objectCreate$1;
  var defineBuiltInAccessor$1 = defineBuiltInAccessor$3;
  var defineBuiltIns = defineBuiltIns$2;
  var bind$1 = functionBindContext;
  var anInstance = anInstance$4;
  var isNullOrUndefined$1 = isNullOrUndefined$8;
  var iterate = iterate$6;
  var defineIterator = iteratorDefine;
  var createIterResultObject = createIterResultObject$3;
  var setSpecies = setSpecies$2;
  var DESCRIPTORS$2 = descriptors;
  var fastKey = internalMetadataExports.fastKey;
  var InternalStateModule = internalState;

  var setInternalState = InternalStateModule.set;
  var internalStateGetterFor = InternalStateModule.getterFor;

  var collectionStrong$2 = {
    getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var Constructor = wrapper(function (that, iterable) {
        anInstance(that, Prototype);
        setInternalState(that, {
          type: CONSTRUCTOR_NAME,
          index: create$1(null),
          first: undefined,
          last: undefined,
          size: 0
        });
        if (!DESCRIPTORS$2) that.size = 0;
        if (!isNullOrUndefined$1(iterable)) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
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
          if (DESCRIPTORS$2) state.size++;
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
          if (DESCRIPTORS$2) state.size = 0;
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
            if (DESCRIPTORS$2) state.size--;
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
      if (DESCRIPTORS$2) defineBuiltInAccessor$1(Prototype, 'size', {
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

  var collection$1 = collection$3;
  var collectionStrong$1 = collectionStrong$2;

  // `Map` constructor
  // https://tc39.es/ecma262/#sec-map-objects
  collection$1('Map', function (init) {
    return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
  }, collectionStrong$1);

  var tryToString = tryToString$5;

  var $TypeError$3 = TypeError;

  var deletePropertyOrThrow$1 = function (O, P) {
    if (!delete O[P]) throw $TypeError$3('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
  };

  var arraySlice = arraySliceSimple;

  var floor$1 = Math.floor;

  var mergeSort = function (array, comparefn) {
    var length = array.length;
    var middle = floor$1(length / 2);
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

  var $$b = _export;
  var uncurryThis$a = functionUncurryThis;
  var aCallable$1 = aCallable$b;
  var toObject$4 = toObject$b;
  var lengthOfArrayLike$2 = lengthOfArrayLike$a;
  var deletePropertyOrThrow = deletePropertyOrThrow$1;
  var toString$7 = toString$a;
  var fails$9 = fails$u;
  var internalSort = arraySort;
  var arrayMethodIsStrict$2 = arrayMethodIsStrict$4;
  var FF = engineFfVersion;
  var IE_OR_EDGE = engineIsIeOrEdge;
  var V8 = engineV8Version;
  var WEBKIT = engineWebkitVersion;

  var test = [];
  var nativeSort = uncurryThis$a(test.sort);
  var push$2 = uncurryThis$a(test.push);

  // IE8-
  var FAILS_ON_UNDEFINED = fails$9(function () {
    test.sort(undefined);
  });
  // V8 bug
  var FAILS_ON_NULL = fails$9(function () {
    test.sort(null);
  });
  // Old WebKit
  var STRICT_METHOD$1 = arrayMethodIsStrict$2('sort');

  var STABLE_SORT = !fails$9(function () {
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

  var FORCED$2 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD$1 || !STABLE_SORT;

  var getSortCompare = function (comparefn) {
    return function (x, y) {
      if (y === undefined) return -1;
      if (x === undefined) return 1;
      if (comparefn !== undefined) return +comparefn(x, y) || 0;
      return toString$7(x) > toString$7(y) ? 1 : -1;
    };
  };

  // `Array.prototype.sort` method
  // https://tc39.es/ecma262/#sec-array.prototype.sort
  $$b({ target: 'Array', proto: true, forced: FORCED$2 }, {
    sort: function sort(comparefn) {
      if (comparefn !== undefined) aCallable$1(comparefn);

      var array = toObject$4(this);

      if (STABLE_SORT) return comparefn === undefined ? nativeSort(array) : nativeSort(array, comparefn);

      var items = [];
      var arrayLength = lengthOfArrayLike$2(array);
      var itemsLength, index;

      for (index = 0; index < arrayLength; index++) {
        if (index in array) push$2(items, array[index]);
      }

      internalSort(items, getSortCompare(comparefn));

      itemsLength = lengthOfArrayLike$2(items);
      index = 0;

      while (index < itemsLength) array[index] = items[index++];
      while (index < arrayLength) deletePropertyOrThrow(array, index++);

      return array;
    }
  });

  var $forEach = arrayIteration.forEach;
  var arrayMethodIsStrict$1 = arrayMethodIsStrict$4;

  var STRICT_METHOD = arrayMethodIsStrict$1('forEach');

  // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  var arrayForEach = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  // eslint-disable-next-line es/no-array-prototype-foreach -- safe
  } : [].forEach;

  var global$5 = global$n;
  var DOMIterables = domIterables;
  var DOMTokenListPrototype = domTokenListPrototype;
  var forEach = arrayForEach;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$6;

  var handlePrototype = function (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
      createNonEnumerableProperty$1(CollectionPrototype, 'forEach', forEach);
    } catch (error) {
      CollectionPrototype.forEach = forEach;
    }
  };

  for (var COLLECTION_NAME in DOMIterables) {
    if (DOMIterables[COLLECTION_NAME]) {
      handlePrototype(global$5[COLLECTION_NAME] && global$5[COLLECTION_NAME].prototype);
    }
  }

  handlePrototype(DOMTokenListPrototype);

  function isVertical(position) {
    return position === 'top' || position === 'bottom';
  }
  function horizontalPadding(padding) {
    return padding[Position.LEFT] + padding[Position.RIGHT];
  }
  function verticalPadding(padding) {
    return padding[Position.TOP] + padding[Position.BOTTOM];
  }

  var _DomainCoordinates_instances, _DomainCoordinates_getWidth, _DomainCoordinates_getHeight;
  var DomainCoordinates = /*#__PURE__*/function () {
    function DomainCoordinates(calendar, domainPainter) {
      _classCallCheck(this, DomainCoordinates);
      _DomainCoordinates_instances.add(this);
      this.calendar = calendar;
      this.domainPainter = domainPainter;
      this.collection = new Map();
      this.scrollDirection = ScrollDirection.SCROLL_FORWARD;
    }
    _createClass(DomainCoordinates, [{
      key: "get",
      value: function get(domainKey) {
        return this.collection.get(domainKey);
      }
    }, {
      key: "update",
      value: function update(collection, scrollDirection) {
        var _this = this;
        var _this$calendar$option = this.calendar.options.options,
          verticalOrientation = _this$calendar$option.verticalOrientation,
          domain = _this$calendar$option.domain;
        this.scrollDirection = scrollDirection;
        var dimensions = {
          width: 0,
          height: 0
        };
        var exitingTotal = 0;
        var scrollFactor = scrollDirection === ScrollDirection.SCROLL_FORWARD ? -1 : 1;
        var keys = collection.keys;
        if (this.calendar.options.options.domain.sort === 'desc') {
          keys.reverse();
          scrollFactor *= -1;
        }
        collection.yankedDomains.forEach(function (domainKey) {
          exitingTotal += _this.collection.get(domainKey)[verticalOrientation ? 'height' : 'width'];
        });
        collection.yankedDomains.forEach(function (domainKey) {
          var coor = _this.collection.get(domainKey);
          _this.collection.set(domainKey, Object.assign(Object.assign({}, coor), {
            x: verticalOrientation ? coor.x : coor.x + exitingTotal * scrollFactor,
            y: verticalOrientation ? coor.y + exitingTotal * scrollFactor : coor.y
          }));
        });
        keys.forEach(function (domainKey) {
          var w = __classPrivateFieldGet(_this, _DomainCoordinates_instances, "m", _DomainCoordinates_getWidth).call(_this, domainKey);
          var h = __classPrivateFieldGet(_this, _DomainCoordinates_instances, "m", _DomainCoordinates_getHeight).call(_this, domainKey);
          if (verticalOrientation) {
            dimensions.height += h;
            dimensions.width = Math.max(w, dimensions.width);
          } else {
            dimensions.width += w;
            dimensions.height = Math.max(h, dimensions.height);
          }
          var x = dimensions.width - w;
          var y = dimensions.height - h;
          _this.collection.set(domainKey, Object.assign(Object.assign({}, _this.collection.get(domainKey)), {
            x: verticalOrientation ? 0 : x,
            y: verticalOrientation ? y : 0,
            pre_x: verticalOrientation ? x : x - exitingTotal * scrollFactor,
            pre_y: verticalOrientation ? y - exitingTotal * scrollFactor : y,
            width: w,
            height: h,
            inner_width: w - (verticalOrientation ? 0 : domain.gutter),
            inner_height: h - (!verticalOrientation ? 0 : domain.gutter)
          }));
        });
        return dimensions;
      }
    }]);
    return DomainCoordinates;
  }();
  _DomainCoordinates_instances = new WeakSet(), _DomainCoordinates_getWidth = function _DomainCoordinates_getWidth(d) {
    var _this$calendar$option2 = this.calendar.options.options,
      domain = _this$calendar$option2.domain,
      subDomain = _this$calendar$option2.subDomain,
      x = _this$calendar$option2.x,
      verticalOrientation = _this$calendar$option2.verticalOrientation;
    var columnsCount = this.calendar.templateCollection.get(subDomain.type).columnsCount(d);
    var subDomainWidth = (subDomain.width + subDomain.gutter) * columnsCount - subDomain.gutter;
    return horizontalPadding(domain.padding) + x.domainHorizontalLabelWidth + (verticalOrientation ? 0 : domain.gutter) + subDomainWidth;
  }, _DomainCoordinates_getHeight = function _DomainCoordinates_getHeight(d) {
    var _this$calendar$option3 = this.calendar.options.options,
      domain = _this$calendar$option3.domain,
      subDomain = _this$calendar$option3.subDomain,
      x = _this$calendar$option3.x,
      verticalOrientation = _this$calendar$option3.verticalOrientation;
    var rowsCount = this.calendar.templateCollection.get(subDomain.type).rowsCount(d);
    var subDomainHeight = (subDomain.height + subDomain.gutter) * rowsCount - subDomain.gutter;
    return verticalPadding(domain.padding) + subDomainHeight + (verticalOrientation ? domain.gutter : 0) + x.domainVerticalLabelHeight;
  };

  var _DomainPainter_instances, _DomainPainter_getClassName;
  var DEFAULT_SELECTOR$3 = '.ch-domain';
  var DomainPainter = /*#__PURE__*/function () {
    function DomainPainter(calendar) {
      _classCallCheck(this, DomainPainter);
      _DomainPainter_instances.add(this);
      this.calendar = calendar;
      this.coordinates = new DomainCoordinates(calendar, this);
      this.root = null;
      // Dimensions of the internal area containing all the domains
      // Excluding all surrounding margins
      this.dimensions = {
        width: 0,
        height: 0
      };
    }
    _createClass(DomainPainter, [{
      key: "paint",
      value: function paint(scrollDirection, rootNode) {
        var _this = this;
        var animationDuration = this.calendar.options.options.animationDuration;
        var t = rootNode.transition().duration(animationDuration);
        var coor = this.coordinates;
        this.dimensions = coor.update(this.calendar.domainCollection, scrollDirection);
        var promises = [];
        this.root = rootNode.selectAll(DEFAULT_SELECTOR$3).data(this.calendar.domainCollection.keys, function (d) {
          return d;
        }).join(function (enter) {
          return enter.append('svg').attr('x', function (d) {
            return coor.get(d).pre_x;
          }).attr('y', function (d) {
            return coor.get(d).pre_y;
          }).attr('width', function (d) {
            return coor.get(d).inner_width;
          }).attr('height', function (d) {
            return coor.get(d).inner_height;
          }).attr('class', function (d) {
            return __classPrivateFieldGet(_this, _DomainPainter_instances, "m", _DomainPainter_getClassName).call(_this, d);
          }).call(function (enterSelection) {
            return enterSelection.append('rect').attr('width', function (d) {
              return coor.get(d).inner_width;
            }).attr('height', function (d) {
              return coor.get(d).inner_height;
            }).attr('class', "".concat(DEFAULT_SELECTOR$3.slice(1), "-bg"));
          }).call(function (enterSelection) {
            return promises.push(enterSelection.transition(t).attr('x', function (d) {
              return coor.get(d).x;
            }).attr('y', function (d) {
              return coor.get(d).y;
            }).end());
          });
        }, function (update) {
          return update.call(function (updateSelection) {
            return promises.push(updateSelection.transition(t).attr('x', function (d) {
              return coor.get(d).x;
            }).attr('y', function (d) {
              return coor.get(d).y;
            }).attr('width', function (d) {
              return coor.get(d).inner_width;
            }).attr('height', function (d) {
              return coor.get(d).inner_height;
            }).end());
          }).call(function (updateSelection) {
            return promises.push(updateSelection.selectAll("".concat(DEFAULT_SELECTOR$3, "-bg")).transition(t).attr('width', function (d) {
              return coor.get(d).inner_width;
            }).attr('height', function (d) {
              return coor.get(d).inner_height;
            }).end());
          });
        }, function (exit) {
          return exit.call(function (exitSelection) {
            return promises.push(exitSelection.transition(t).attr('x', function (d) {
              return coor.get(d).x;
            }).attr('y', function (d) {
              return coor.get(d).y;
            }).remove().end());
          });
        });
        return promises;
      }
    }]);
    return DomainPainter;
  }();
  _DomainPainter_instances = new WeakSet(), _DomainPainter_getClassName = function _DomainPainter_getClassName(d) {
    var classname = DEFAULT_SELECTOR$3.slice(1);
    var helper = this.calendar.dateHelper.date(d);
    switch (this.calendar.options.options.domain.type) {
      case 'hour':
        classname += " h_".concat(helper.hour());
        break;
      case 'day':
        classname += " d_".concat(helper.date(), " dy_").concat(helper.format('d') + 1);
        break;
      case 'week':
        classname += " w_".concat(helper.week());
        break;
      case 'month':
        classname += " m_".concat(helper.month() + 1);
        break;
      case 'year':
        classname += " y_".concat(helper.year());
        break;
    }
    return classname;
  };

  var $$a = _export;
  var $includes = arrayIncludes.includes;
  var fails$8 = fails$u;
  var addToUnscopables = addToUnscopables$3;

  // FF99+ bug
  var BROKEN_ON_SPARSE = fails$8(function () {
    // eslint-disable-next-line es/no-array-prototype-includes -- detection
    return !Array(1).includes();
  });

  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  $$a({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
    includes: function includes(el /* , fromIndex = 0 */) {
      return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('includes');

  var $$9 = _export;
  var $filter = arrayIteration.filter;
  var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$4;

  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  // with adding support of @@species
  $$9({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
    filter: function filter(callbackfn /* , thisArg */) {
      return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var aCallable = aCallable$b;
  var toObject$3 = toObject$b;
  var IndexedObject = indexedObject;
  var lengthOfArrayLike$1 = lengthOfArrayLike$a;

  var $TypeError$2 = TypeError;

  // `Array.prototype.{ reduce, reduceRight }` methods implementation
  var createMethod$2 = function (IS_RIGHT) {
    return function (that, callbackfn, argumentsLength, memo) {
      aCallable(callbackfn);
      var O = toObject$3(that);
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
          throw $TypeError$2('Reduce of empty array with no initial value');
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
    left: createMethod$2(false),
    // `Array.prototype.reduceRight` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduceright
    right: createMethod$2(true)
  };

  var $$8 = _export;
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
  $$8({ target: 'Array', proto: true, forced: FORCED$1 }, {
    reduce: function reduce(callbackfn /* , initialValue */) {
      var length = arguments.length;
      return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
    }
  });

  var anObject$3 = anObject$f;
  var iteratorClose = iteratorClose$2;

  // call something on iterator step with safe closing on error
  var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject$3(value)[0], value[1]) : fn(value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
  };

  var bind = functionBindContext;
  var call$3 = functionCall;
  var toObject$2 = toObject$b;
  var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
  var isArrayIteratorMethod = isArrayIteratorMethod$2;
  var isConstructor = isConstructor$4;
  var lengthOfArrayLike = lengthOfArrayLike$a;
  var createProperty = createProperty$4;
  var getIterator = getIterator$2;
  var getIteratorMethod = getIteratorMethod$3;

  var $Array = Array;

  // `Array.from` method implementation
  // https://tc39.es/ecma262/#sec-array.from
  var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject$2(arrayLike);
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
      for (;!(step = call$3(next, iterator)).done; index++) {
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

  var $$7 = _export;
  var from = arrayFrom;
  var checkCorrectnessOfIteration = checkCorrectnessOfIteration$3;

  var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
    // eslint-disable-next-line es/no-array-from -- required for testing
    Array.from(iterable);
  });

  // `Array.from` method
  // https://tc39.es/ecma262/#sec-array.from
  $$7({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
    from: from
  });

  // a string of all valid unicode whitespaces
  var whitespaces$3 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
    '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var uncurryThis$9 = functionUncurryThis;
  var requireObjectCoercible$3 = requireObjectCoercible$7;
  var toString$6 = toString$a;
  var whitespaces$2 = whitespaces$3;

  var replace$2 = uncurryThis$9(''.replace);
  var ltrim = RegExp('^[' + whitespaces$2 + ']+');
  var rtrim = RegExp('(^|[^' + whitespaces$2 + '])[' + whitespaces$2 + ']+$');

  // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  var createMethod$1 = function (TYPE) {
    return function ($this) {
      var string = toString$6(requireObjectCoercible$3($this));
      if (TYPE & 1) string = replace$2(string, ltrim, '');
      if (TYPE & 2) string = replace$2(string, rtrim, '$1');
      return string;
    };
  };

  var stringTrim = {
    // `String.prototype.{ trimLeft, trimStart }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimstart
    start: createMethod$1(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimend
    end: createMethod$1(2),
    // `String.prototype.trim` method
    // https://tc39.es/ecma262/#sec-string.prototype.trim
    trim: createMethod$1(3)
  };

  var global$4 = global$n;
  var fails$7 = fails$u;
  var uncurryThis$8 = functionUncurryThis;
  var toString$5 = toString$a;
  var trim = stringTrim.trim;
  var whitespaces$1 = whitespaces$3;

  var $parseInt$1 = global$4.parseInt;
  var Symbol$3 = global$4.Symbol;
  var ITERATOR = Symbol$3 && Symbol$3.iterator;
  var hex = /^[+-]?0x/i;
  var exec$1 = uncurryThis$8(hex.exec);
  var FORCED = $parseInt$1(whitespaces$1 + '08') !== 8 || $parseInt$1(whitespaces$1 + '0x16') !== 22
    // MS Edge 18- broken with boxed symbols
    || (ITERATOR && !fails$7(function () { $parseInt$1(Object(ITERATOR)); }));

  // `parseInt` method
  // https://tc39.es/ecma262/#sec-parseint-string-radix
  var numberParseInt = FORCED ? function parseInt(string, radix) {
    var S = trim(toString$5(string));
    return $parseInt$1(S, (radix >>> 0) || (exec$1(hex, S) ? 16 : 10));
  } : $parseInt$1;

  var $$6 = _export;
  var $parseInt = numberParseInt;

  // `parseInt` method
  // https://tc39.es/ecma262/#sec-parseint-string-radix
  $$6({ global: true, forced: parseInt != $parseInt }, {
    parseInt: $parseInt
  });

  var _DomainCollection_instances, _DomainCollection_setSubDomainValues, _DomainCollection_extractValues, _DomainCollection_refreshKeys;
  var DOMAIN_FORMAT = {
    year: 'YYYY',
    month: 'MMMM',
    week: 'wo [week] YYYY',
    xDay: 'Do MMM',
    ghDay: 'Do MMM',
    day: 'Do MMM',
    hour: 'HH:00',
    minute: 'HH:mm'
  };
  var DomainCollection = /*#__PURE__*/function () {
    function DomainCollection(dateHelper, interval, start, range) {
      var excludeEnd = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _classCallCheck(this, DomainCollection);
      _DomainCollection_instances.add(this);
      this.collection = new Map();
      this.dateHelper = dateHelper;
      if (interval && start && range) {
        var ts = this.dateHelper.intervals(interval, start, range, excludeEnd).map(function (d) {
          return castArray(d);
        });
        // @ts-ignore
        this.collection = new Map(ts);
      }
      this.min = 0;
      this.max = 0;
      this.keys = [];
      this.yankedDomains = [];
      if (this.collection.size > 0) {
        __classPrivateFieldGet(this, _DomainCollection_instances, "m", _DomainCollection_refreshKeys).call(this);
      }
    }
    _createClass(DomainCollection, [{
      key: "has",
      value: function has(key) {
        return this.collection.has(key);
      }
    }, {
      key: "get",
      value: function get(key) {
        return this.collection.get(key);
      }
    }, {
      key: "forEach",
      value: function forEach(callback) {
        return this.collection.forEach(callback);
      }
    }, {
      key: "at",
      value: function at(index) {
        return this.keys[index];
      }
    }, {
      key: "clamp",
      value: function clamp(minDate, maxDate) {
        var _this = this;
        if (minDate && this.min < minDate) {
          this.keys.filter(function (key) {
            return key < minDate;
          }).forEach(function (d) {
            return _this.collection.delete(d);
          });
        }
        if (maxDate && this.max > maxDate) {
          this.keys.filter(function (key) {
            return key > maxDate;
          }).forEach(function (d) {
            return _this.collection.delete(d);
          });
        }
        __classPrivateFieldGet(this, _DomainCollection_instances, "m", _DomainCollection_refreshKeys).call(this);
        return this;
      }
    }, {
      key: "merge",
      value: function merge(newCollection, limit, createValueCallback) {
        var _this2 = this;
        this.yankedDomains = [];
        newCollection.keys.forEach(function (domainKey, index) {
          if (_this2.has(domainKey)) {
            return;
          }
          if (_this2.collection.size >= limit) {
            var keyToRemove = _this2.max;
            if (domainKey > _this2.max) {
              keyToRemove = _this2.min;
            }
            if (keyToRemove && _this2.collection.delete(keyToRemove)) {
              _this2.yankedDomains.push(keyToRemove);
            }
          }
          _this2.collection.set(domainKey, createValueCallback(domainKey, index));
          __classPrivateFieldGet(_this2, _DomainCollection_instances, "m", _DomainCollection_refreshKeys).call(_this2);
        });
        this.yankedDomains = this.yankedDomains.sort(function (a, b) {
          return a - b;
        });
      }
    }, {
      key: "slice",
      value: function slice() {
        var _this3 = this;
        var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var fromBeginning = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        if (this.keys.length > limit) {
          var keysToDelete = fromBeginning ? this.keys.slice(0, -limit) : this.keys.slice(limit);
          keysToDelete.forEach(function (key) {
            _this3.collection.delete(key);
          });
          __classPrivateFieldGet(this, _DomainCollection_instances, "m", _DomainCollection_refreshKeys).call(this);
        }
        return this;
      }
    }, {
      key: "fill",
      value: function fill(data, _ref, subDomainKeyExtractor) {
        var _this4 = this;
        var x = _ref.x,
          y = _ref.y,
          groupY = _ref.groupY,
          defaultValue = _ref.defaultValue;
        var groupedRecords = this.groupRecords(data, x, subDomainKeyExtractor);
        this.keys.forEach(function (domainKey) {
          var records = groupedRecords.get(domainKey) || {};
          __classPrivateFieldGet(_this4, _DomainCollection_instances, "m", _DomainCollection_setSubDomainValues).call(_this4, domainKey, records, y, groupY, defaultValue);
        });
      }
    }, {
      key: "groupRecords",
      value: function groupRecords(data, x, subDomainKeyExtractor) {
        var _this5 = this;
        var results = new Map();
        var validSubDomainTimestamp = new Map();
        this.keys.forEach(function (domainKey) {
          _this5.get(domainKey).forEach(function (subDomain) {
            validSubDomainTimestamp.set(subDomain.t, domainKey);
          });
        });
        data.forEach(function (d) {
          var timestamp = _this5.extractTimestamp(d, x, subDomainKeyExtractor);
          if (validSubDomainTimestamp.has(timestamp)) {
            var domainKey = validSubDomainTimestamp.get(timestamp);
            var records = results.get(domainKey) || {};
            records[timestamp] || (records[timestamp] = []);
            records[timestamp].push(d);
            results.set(domainKey, records);
          }
        });
        return results;
      }
      // eslint-disable-next-line class-methods-use-this
    }, {
      key: "groupValues",
      value: function groupValues(values, groupFn) {
        var cleanedValues = values.filter(function (n) {
          return n !== null;
        });
        if (typeof groupFn === 'string') {
          if (cleanedValues.every(function (n) {
            return typeof n === 'number';
          })) {
            switch (groupFn) {
              case 'sum':
                return cleanedValues.reduce(function (a, b) {
                  return a + b;
                }, 0);
              case 'count':
                return cleanedValues.length;
              case 'min':
                return Math.min.apply(Math, _toConsumableArray(cleanedValues)) || null;
              case 'max':
                return Math.max.apply(Math, _toConsumableArray(cleanedValues)) || null;
              case 'average':
                return cleanedValues.length > 0 ? cleanedValues.reduce(function (a, b) {
                  return a + b;
                }, 0) / cleanedValues.length : null;
              default:
                return null;
            }
          }
          switch (groupFn) {
            case 'count':
              return cleanedValues.length;
            default:
              return null;
          }
        } else if (typeof groupFn === 'function') {
          return groupFn(cleanedValues);
        }
        return null;
      }
      // eslint-disable-next-line class-methods-use-this
    }, {
      key: "extractTimestamp",
      value: function extractTimestamp(datum, x, extractorFn) {
        var timestamp = typeof x === 'function' ? x(datum) : datum[x];
        if (typeof timestamp === 'string') {
          timestamp = +new Date(timestamp);
        }
        return extractorFn(timestamp);
      }
    }]);
    return DomainCollection;
  }();
  _DomainCollection_instances = new WeakSet(), _DomainCollection_setSubDomainValues = function _DomainCollection_setSubDomainValues(domainKey, records, y, groupY, defaultValue) {
    var _this6 = this;
    this.get(domainKey).forEach(function (subDomain, index) {
      var value = defaultValue;
      if (records.hasOwnProperty(subDomain.t)) {
        value = _this6.groupValues(__classPrivateFieldGet(_this6, _DomainCollection_instances, "m", _DomainCollection_extractValues).call(_this6, records[subDomain.t], y), groupY);
      }
      _this6.get(domainKey)[index].v = value;
    });
  }, _DomainCollection_extractValues = function _DomainCollection_extractValues(data, y) {
    return data.map(function (d) {
      return typeof y === 'function' ? y(d) : d[y];
    });
  }, _DomainCollection_refreshKeys = function _DomainCollection_refreshKeys() {
    this.keys = Array.from(this.collection.keys()).map(function (d) {
      return parseInt(d, 10);
    }).sort(function (a, b) {
      return a - b;
    });
    var keys = this.keys;
    // eslint-disable-next-line prefer-destructuring
    this.min = keys[0];
    this.max = keys[keys.length - 1];
    return this.keys;
  };

  var _DomainLabelPainter_instances, _DomainLabelPainter_textVerticalAlign, _DomainLabelPainter_getX, _DomainLabelPainter_getY, _DomainLabelPainter_getDomainInsideWidth, _DomainLabelPainter_getDomainInsideHeight, _DomainLabelPainter_domainRotate;
  var DEFAULT_SELECTOR$2 = '.ch-domain-text';
  var DomainLabelPainter = /*#__PURE__*/function () {
    function DomainLabelPainter(calendar) {
      _classCallCheck(this, DomainLabelPainter);
      _DomainLabelPainter_instances.add(this);
      this.calendar = calendar;
    }
    _createClass(DomainLabelPainter, [{
      key: "paint",
      value: function paint(root) {
        var _this = this;
        var _this$calendar$option = this.calendar.options.options.domain,
          label = _this$calendar$option.label,
          type = _this$calendar$option.type;
        var dateHelper = this.calendar.dateHelper;
        var format = label.text;
        if (format === null || format === '') {
          return;
        }
        if (typeof format === 'undefined') {
          format = DOMAIN_FORMAT[type];
        }
        root.selectAll(DEFAULT_SELECTOR$2).data(function (d) {
          return [d];
        }, function (d) {
          return d;
        }).join(function (enter) {
          return enter.append('text').attr('class', DEFAULT_SELECTOR$2.slice(1)).attr('x', function (d) {
            return __classPrivateFieldGet(_this, _DomainLabelPainter_instances, "m", _DomainLabelPainter_getX).call(_this, d);
          }).attr('y', function (d) {
            return __classPrivateFieldGet(_this, _DomainLabelPainter_instances, "m", _DomainLabelPainter_getY).call(_this, d);
          }).attr('text-anchor', label.textAlign).attr('dominant-baseline', function () {
            return __classPrivateFieldGet(_this, _DomainLabelPainter_instances, "m", _DomainLabelPainter_textVerticalAlign).call(_this);
          }).text(function (d, i, nodes) {
            return (
              // eslint-disable-next-line implicit-arrow-linebreak
              dateHelper.format(d, format, nodes[i])
            );
          }).call(function (selection) {
            return __classPrivateFieldGet(_this, _DomainLabelPainter_instances, "m", _DomainLabelPainter_domainRotate).call(_this, selection);
          });
        }, function (update) {
          update.attr('x', function (d) {
            return __classPrivateFieldGet(_this, _DomainLabelPainter_instances, "m", _DomainLabelPainter_getX).call(_this, d);
          }).attr('y', function (d) {
            return __classPrivateFieldGet(_this, _DomainLabelPainter_instances, "m", _DomainLabelPainter_getY).call(_this, d);
          }).attr('text-anchor', label.textAlign).attr('dominant-baseline', function () {
            return __classPrivateFieldGet(_this, _DomainLabelPainter_instances, "m", _DomainLabelPainter_textVerticalAlign).call(_this);
          }).text(function (d, i, nodes) {
            return (
              // eslint-disable-next-line implicit-arrow-linebreak
              dateHelper.format(d, format, nodes[i])
            );
          }).call(function (selection) {
            return __classPrivateFieldGet(_this, _DomainLabelPainter_instances, "m", _DomainLabelPainter_domainRotate).call(_this, selection);
          });
        });
      }
    }]);
    return DomainLabelPainter;
  }();
  _DomainLabelPainter_instances = new WeakSet(), _DomainLabelPainter_textVerticalAlign = function _DomainLabelPainter_textVerticalAlign() {
    var _this$calendar$option2 = this.calendar.options.options.domain.label,
      position = _this$calendar$option2.position,
      rotate = _this$calendar$option2.rotate;
    if (isVertical(position)) {
      return 'middle';
    }
    if (rotate === 'left' && position === 'left' || rotate === 'right' && position === 'right') {
      return 'bottom';
    }
    return 'hanging';
  }, _DomainLabelPainter_getX = function _DomainLabelPainter_getX(d) {
    var _this$calendar$option3 = this.calendar.options.options.domain,
      padding = _this$calendar$option3.padding,
      _this$calendar$option4 = _this$calendar$option3.label,
      position = _this$calendar$option4.position,
      textAlign = _this$calendar$option4.textAlign,
      offset = _this$calendar$option4.offset;
    var domainHorizontalLabelWidth = this.calendar.options.options.x.domainHorizontalLabelWidth;
    var x = padding[Position.LEFT];
    if (position === 'right') {
      x += __classPrivateFieldGet(this, _DomainLabelPainter_instances, "m", _DomainLabelPainter_getDomainInsideWidth).call(this, d);
    }
    if (textAlign === 'middle') {
      if (['top', 'bottom'].includes(position)) {
        x += __classPrivateFieldGet(this, _DomainLabelPainter_instances, "m", _DomainLabelPainter_getDomainInsideWidth).call(this, d) / 2;
      } else {
        x += domainHorizontalLabelWidth / 2;
      }
    }
    if (textAlign === 'end') {
      if (isVertical(position)) {
        x += __classPrivateFieldGet(this, _DomainLabelPainter_instances, "m", _DomainLabelPainter_getDomainInsideWidth).call(this, d);
      } else {
        x += domainHorizontalLabelWidth;
      }
    }
    return x + offset.x;
  }, _DomainLabelPainter_getY = function _DomainLabelPainter_getY(d) {
    var _this$calendar$option5 = this.calendar.options.options,
      _this$calendar$option6 = _this$calendar$option5.domain,
      _this$calendar$option7 = _this$calendar$option6.label,
      position = _this$calendar$option7.position,
      offset = _this$calendar$option7.offset,
      padding = _this$calendar$option6.padding,
      x = _this$calendar$option5.x;
    var y = padding[Position.TOP] + x.domainVerticalLabelHeight / 2;
    if (position === 'bottom') {
      y += __classPrivateFieldGet(this, _DomainLabelPainter_instances, "m", _DomainLabelPainter_getDomainInsideHeight).call(this, d);
    }
    return y + offset.y;
  }, _DomainLabelPainter_getDomainInsideWidth = function _DomainLabelPainter_getDomainInsideWidth(d) {
    var _this$calendar$option8 = this.calendar.options.options,
      padding = _this$calendar$option8.domain.padding,
      domainHorizontalLabelWidth = _this$calendar$option8.x.domainHorizontalLabelWidth;
    var coordinates = this.calendar.calendarPainter.domainsContainerPainter.domainPainter.coordinates;
    return coordinates.get(d).inner_width - domainHorizontalLabelWidth - horizontalPadding(padding);
  }, _DomainLabelPainter_getDomainInsideHeight = function _DomainLabelPainter_getDomainInsideHeight(d) {
    var _this$calendar$option9 = this.calendar.options.options,
      domainVerticalLabelHeight = _this$calendar$option9.x.domainVerticalLabelHeight,
      padding = _this$calendar$option9.domain.padding;
    var coordinates = this.calendar.calendarPainter.domainsContainerPainter.domainPainter.coordinates;
    return coordinates.get(d).inner_height - domainVerticalLabelHeight - verticalPadding(padding);
  }, _DomainLabelPainter_domainRotate = function _DomainLabelPainter_domainRotate(selection) {
    var _this2 = this;
    var _this$calendar$option10 = this.calendar.options.options,
      _this$calendar$option11 = _this$calendar$option10.domain.label,
      rotate = _this$calendar$option11.rotate,
      textAlign = _this$calendar$option11.textAlign,
      position = _this$calendar$option11.position,
      x = _this$calendar$option10.x;
    var labelWidth = x.domainHorizontalLabelWidth;
    switch (rotate) {
      // Rotating the text clockwise
      case 'right':
        selection.attr('transform', function (d) {
          var domainWidth = __classPrivateFieldGet(_this2, _DomainLabelPainter_instances, "m", _DomainLabelPainter_getDomainInsideWidth).call(_this2, d);
          var domainHeight = __classPrivateFieldGet(_this2, _DomainLabelPainter_instances, "m", _DomainLabelPainter_getDomainInsideHeight).call(_this2, d);
          var s = ["rotate(90, ".concat(position === 'right' ? domainWidth : labelWidth, ", 0)")];
          switch (position) {
            case 'right':
              if (textAlign === 'middle') {
                s.push("translate(".concat(domainHeight / 2 - labelWidth / 2, ")"));
              } else if (textAlign === 'end') {
                s.push("translate(".concat(domainHeight - labelWidth, ")"));
              }
              break;
            case 'left':
              if (textAlign === 'start') {
                s.push("translate(".concat(labelWidth, ")"));
              } else if (textAlign === 'middle') {
                s.push("translate(".concat(labelWidth / 2 + domainHeight / 2, ")"));
              } else if (textAlign === 'end') {
                s.push("translate(".concat(domainHeight, ")"));
              }
              break;
          }
          return s.join(',');
        });
        break;
      // Rotating the text anticlockwise
      case 'left':
        selection.attr('transform', function (d) {
          var domainWidth = __classPrivateFieldGet(_this2, _DomainLabelPainter_instances, "m", _DomainLabelPainter_getDomainInsideWidth).call(_this2, d);
          var domainHeight = __classPrivateFieldGet(_this2, _DomainLabelPainter_instances, "m", _DomainLabelPainter_getDomainInsideHeight).call(_this2, d);
          var s = ["rotate(270, ".concat(position === 'right' ? domainWidth : labelWidth, ", 0)")];
          switch (position) {
            case 'right':
              if (textAlign === 'start') {
                s.push("translate(-".concat(domainHeight, ")"));
              } else if (textAlign === 'middle') {
                s.push("translate(-".concat(domainHeight / 2 + labelWidth / 2, ")"));
              } else if (textAlign === 'end') {
                s.push("translate(-".concat(labelWidth, ")"));
              }
              break;
            case 'left':
              if (textAlign === 'start') {
                s.push("translate(".concat(labelWidth - domainHeight, ")"));
              } else if (textAlign === 'middle') {
                s.push("translate(".concat(labelWidth / 2 - domainHeight / 2, ")"));
              }
              break;
          }
          return s.join(',');
        });
        break;
    }
  };

  var PROPER_FUNCTION_NAME = functionName.PROPER;
  var fails$6 = fails$u;
  var whitespaces = whitespaces$3;

  var non = '\u200B\u0085\u180E';

  // check that a method works with the correct list
  // of whitespaces and has a correct name
  var stringTrimForced = function (METHOD_NAME) {
    return fails$6(function () {
      return !!whitespaces[METHOD_NAME]()
        || non[METHOD_NAME]() !== non
        || (PROPER_FUNCTION_NAME && whitespaces[METHOD_NAME].name !== METHOD_NAME);
    });
  };

  var $$5 = _export;
  var $trim = stringTrim.trim;
  var forcedStringTrimMethod = stringTrimForced;

  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  $$5({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
    trim: function trim() {
      return $trim(this);
    }
  });

  var _SubDomainPainter_instances, _SubDomainPainter_setPositions, _SubDomainPainter_classname, _SubDomainPainter_appendText, _SubDomainPainter_getCoordinates, _SubDomainPainter_getX, _SubDomainPainter_getY;
  var DEFAULT_SELECTOR$1 = '.ch-subdomain';
  var HIGHLIGHT_CLASSNAME = 'highlight';
  var SubDomainPainter = /*#__PURE__*/function () {
    function SubDomainPainter(calendar) {
      _classCallCheck(this, SubDomainPainter);
      _SubDomainPainter_instances.add(this);
      this.calendar = calendar;
      this.root = null;
    }
    _createClass(SubDomainPainter, [{
      key: "paint",
      value: function paint(root) {
        var _this = this;
        this.root = root || this.root;
        var containerClassname = "".concat(DEFAULT_SELECTOR$1, "-container");
        var subDomainSvgGroup = this.root.selectAll(containerClassname).data(function (d) {
          return [d];
        }, function (d) {
          return d;
        }).join(function (enter) {
          return enter.append('svg').call(function (selection) {
            return __classPrivateFieldGet(_this, _SubDomainPainter_instances, "m", _SubDomainPainter_setPositions).call(_this, selection);
          }).attr('class', containerClassname.slice(1));
        }, function (update) {
          return (
            // eslint-disable-next-line implicit-arrow-linebreak
            update.call(function (selection) {
              return __classPrivateFieldGet(_this, _SubDomainPainter_instances, "m", _SubDomainPainter_setPositions).call(_this, selection);
            })
          );
        });
        var _this$calendar$option = this.calendar.options.options.subDomain,
          radius = _this$calendar$option.radius,
          width = _this$calendar$option.width,
          height = _this$calendar$option.height,
          sort = _this$calendar$option.sort;
        var evt = this.calendar.eventEmitter;
        subDomainSvgGroup.selectAll('g').data(function (d) {
          var subDomainsCollection = _this.calendar.domainCollection.get(d);
          if (sort === 'desc') {
            var max = Math.max.apply(Math, _toConsumableArray(subDomainsCollection.map(function (s) {
              return s.x;
            })));
            subDomainsCollection.forEach(function (s, i) {
              subDomainsCollection[i].x = Math.abs(s.x - max);
            });
          }
          return subDomainsCollection;
        }).join(function (enter) {
          return enter.append('g').call(function (selection) {
            return selection.insert('rect').attr('class', function (d) {
              return (
                // eslint-disable-next-line implicit-arrow-linebreak
                __classPrivateFieldGet(_this, _SubDomainPainter_instances, "m", _SubDomainPainter_classname).call(_this, d.t, "".concat(DEFAULT_SELECTOR$1.slice(1), "-bg"))
              );
            }).attr('width', width).attr('height', height).attr('x', function (d) {
              return __classPrivateFieldGet(_this, _SubDomainPainter_instances, "m", _SubDomainPainter_getX).call(_this, d);
            }).attr('y', function (d) {
              return __classPrivateFieldGet(_this, _SubDomainPainter_instances, "m", _SubDomainPainter_getY).call(_this, d);
            }).on('click', function (ev, d) {
              return (
                // eslint-disable-next-line implicit-arrow-linebreak
                evt.emit('click', ev, d.t, d.v)
              );
            }).on('mouseover', function (ev, d) {
              return (
                // eslint-disable-next-line implicit-arrow-linebreak
                evt.emit('mouseover', ev, d.t, d.v)
              );
            }).on('mouseout', function (ev, d) {
              return (
                // eslint-disable-next-line implicit-arrow-linebreak
                evt.emit('mouseout', ev, d.t, d.v)
              );
            }).attr('rx', radius > 0 ? radius : null).attr('ry', radius > 0 ? radius : null);
          }).call(function (selection) {
            return __classPrivateFieldGet(_this, _SubDomainPainter_instances, "m", _SubDomainPainter_appendText).call(_this, selection);
          });
        }, function (update) {
          return update.selectAll('rect').attr('class', function (d) {
            return (
              // eslint-disable-next-line implicit-arrow-linebreak
              __classPrivateFieldGet(_this, _SubDomainPainter_instances, "m", _SubDomainPainter_classname).call(_this, d.t, "".concat(DEFAULT_SELECTOR$1.slice(1), "-bg"))
            );
          }).attr('width', width).attr('height', height).attr('x', function (d) {
            return __classPrivateFieldGet(_this, _SubDomainPainter_instances, "m", _SubDomainPainter_getX).call(_this, d);
          }).attr('y', function (d) {
            return __classPrivateFieldGet(_this, _SubDomainPainter_instances, "m", _SubDomainPainter_getY).call(_this, d);
          }).attr('rx', radius).attr('ry', radius);
        });
      }
    }]);
    return SubDomainPainter;
  }();
  _SubDomainPainter_instances = new WeakSet(), _SubDomainPainter_setPositions = function _SubDomainPainter_setPositions(selection) {
    var options = this.calendar.options.options;
    var _options$domain = options.domain,
      padding = _options$domain.padding,
      position = _options$domain.label.position;
    selection.attr('x', function () {
      var pos = padding[Position.LEFT];
      if (position === 'left') {
        pos += options.x.domainHorizontalLabelWidth;
      }
      return pos;
    }).attr('y', function () {
      var pos = padding[Position.TOP];
      if (position === 'top') {
        pos += options.x.domainVerticalLabelHeight;
      }
      return pos;
    });
  }, _SubDomainPainter_classname = function _SubDomainPainter_classname(timestamp) {
    var _this2 = this;
    var _this$calendar$option2 = this.calendar.options.options,
      highlight = _this$calendar$option2.date.highlight,
      type = _this$calendar$option2.subDomain.type;
    var classname = '';
    if (highlight.length > 0) {
      highlight.forEach(function (d) {
        var unitFn = _this2.calendar.templateCollection.get(type).extractUnit;
        if (unitFn(+d) === unitFn(timestamp)) {
          classname = HIGHLIGHT_CLASSNAME;
        }
      });
    }
    for (var _len = arguments.length, otherClasses = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      otherClasses[_key - 1] = arguments[_key];
    }
    return [classname].concat(otherClasses).join(' ').trim();
  }, _SubDomainPainter_appendText = function _SubDomainPainter_appendText(elem) {
    var _this3 = this;
    var _this$calendar$option3 = this.calendar.options.options.subDomain,
      width = _this$calendar$option3.width,
      height = _this$calendar$option3.height,
      label = _this$calendar$option3.label;
    if (!label) {
      return null;
    }
    return elem.append('text').attr('class', function (d) {
      return (
        // eslint-disable-next-line implicit-arrow-linebreak
        __classPrivateFieldGet(_this3, _SubDomainPainter_instances, "m", _SubDomainPainter_classname).call(_this3, d.t, "".concat(DEFAULT_SELECTOR$1.slice(1), "-text"))
      );
    }).attr('x', function (d) {
      return __classPrivateFieldGet(_this3, _SubDomainPainter_instances, "m", _SubDomainPainter_getX).call(_this3, d) + width / 2;
    }).attr('y', function (d) {
      return __classPrivateFieldGet(_this3, _SubDomainPainter_instances, "m", _SubDomainPainter_getY).call(_this3, d) + height / 2;
    }).attr('text-anchor', 'middle').attr('dominant-baseline', 'central').text(function (d, i, nodes) {
      return (
        // eslint-disable-next-line implicit-arrow-linebreak
        _this3.calendar.dateHelper.format(d.t, label, d.v, nodes[i])
      );
    });
  }, _SubDomainPainter_getCoordinates = function _SubDomainPainter_getCoordinates(axis, d) {
    var subDomain = this.calendar.options.options.subDomain;
    return d[axis] * (subDomain[axis === 'x' ? 'width' : 'height'] + subDomain.gutter);
  }, _SubDomainPainter_getX = function _SubDomainPainter_getX(d) {
    return __classPrivateFieldGet(this, _SubDomainPainter_instances, "m", _SubDomainPainter_getCoordinates).call(this, 'x', d);
  }, _SubDomainPainter_getY = function _SubDomainPainter_getY(d) {
    return __classPrivateFieldGet(this, _SubDomainPainter_instances, "m", _SubDomainPainter_getCoordinates).call(this, 'y', d);
  };

  var _DomainsContainerPainter_instances, _DomainsContainerPainter_startAnimation, _DomainsContainerPainter_endAnimation, _DomainsContainerPainter_recomputeDimensions;
  var BASE_SELECTOR = '.ch-domain-container';
  var TRANSITION_CLASSNAME = 'in-transition';
  var DomainsContainerPainter = /*#__PURE__*/function () {
    function DomainsContainerPainter(calendar) {
      _classCallCheck(this, DomainsContainerPainter);
      _DomainsContainerPainter_instances.add(this);
      this.calendar = calendar;
      this.domainPainter = new DomainPainter(calendar);
      this.subDomainPainter = new SubDomainPainter(calendar);
      this.domainLabelPainter = new DomainLabelPainter(calendar);
      this.dimensions = {
        width: 0,
        height: 0
      };
      this.transitionsQueueCount = 0;
    }
    _createClass(DomainsContainerPainter, [{
      key: "setup",
      value: function setup() {
        this.root = this.calendar.calendarPainter.root.attr('x', 0).attr('y', 0).append('svg').attr('class', BASE_SELECTOR.slice(1)).append('svg').attr('class', "".concat(BASE_SELECTOR.slice(1), "-animation-wrapper"));
      }
    }, {
      key: "paint",
      value: function paint(scrollDirection) {
        var _this = this;
        __classPrivateFieldGet(this, _DomainsContainerPainter_instances, "m", _DomainsContainerPainter_startAnimation).call(this);
        var result = this.domainPainter.paint(scrollDirection, this.root);
        this.subDomainPainter.paint(this.domainPainter.root);
        this.domainLabelPainter.paint(this.domainPainter.root);
        __classPrivateFieldGet(this, _DomainsContainerPainter_instances, "m", _DomainsContainerPainter_recomputeDimensions).call(this);
        Promise.allSettled(result).then(function () {
          __classPrivateFieldGet(_this, _DomainsContainerPainter_instances, "m", _DomainsContainerPainter_endAnimation).call(_this);
        });
        return result;
      }
    }, {
      key: "updatePosition",
      value: function updatePosition() {
        var _a;
        if (!((_a = this.root) === null || _a === void 0 ? void 0 : _a.node())) {
          return Promise.resolve();
        }
        var animationDuration = this.calendar.options.options.animationDuration;
        var topHeight = this.calendar.pluginManager.getHeightFromPosition('top');
        var leftWidth = this.calendar.pluginManager.getWidthFromPosition('left');
        return [d3Selection.select(this.root.node().parentNode).transition().duration(animationDuration).call(function (selection) {
          selection.attr('x', leftWidth).attr('y', topHeight);
        }).end()];
      }
    }, {
      key: "width",
      value: function width() {
        return this.dimensions.width;
      }
    }, {
      key: "height",
      value: function height() {
        return this.dimensions.height;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        __classPrivateFieldGet(this, _DomainsContainerPainter_instances, "m", _DomainsContainerPainter_startAnimation).call(this);
        return Promise.resolve();
      }
    }]);
    return DomainsContainerPainter;
  }();
  _DomainsContainerPainter_instances = new WeakSet(), _DomainsContainerPainter_startAnimation = function _DomainsContainerPainter_startAnimation() {
    var _a;
    if ((_a = this.root) === null || _a === void 0 ? void 0 : _a.node()) {
      this.transitionsQueueCount += 1;
      d3Selection.select(this.root.node().parentNode).classed(TRANSITION_CLASSNAME, true);
    }
  }, _DomainsContainerPainter_endAnimation = function _DomainsContainerPainter_endAnimation() {
    var _a;
    if ((_a = this.root) === null || _a === void 0 ? void 0 : _a.node()) {
      this.transitionsQueueCount -= 1;
      if (this.transitionsQueueCount === 0) {
        d3Selection.select(this.root.node().parentNode).classed(TRANSITION_CLASSNAME, false);
      }
    }
  }, _DomainsContainerPainter_recomputeDimensions = function _DomainsContainerPainter_recomputeDimensions() {
    var _this$calendar$option = this.calendar.options.options,
      animationDuration = _this$calendar$option.animationDuration,
      verticalOrientation = _this$calendar$option.verticalOrientation,
      gutter = _this$calendar$option.domain.gutter;
    var domainsDimensions = this.domainPainter.dimensions;
    this.dimensions = {
      width: domainsDimensions.width - (verticalOrientation ? 0 : gutter),
      height: domainsDimensions.height - (!verticalOrientation ? 0 : gutter)
    };
    this.root.transition().duration(animationDuration).attr('width', this.dimensions.width).attr('height', this.dimensions.height);
  };

  var PluginPainter = /*#__PURE__*/function () {
    function PluginPainter(calendar) {
      _classCallCheck(this, PluginPainter);
      this.calendar = calendar;
    }
    _createClass(PluginPainter, [{
      key: "paint",
      value: function paint() {
        var promises = [];
        promises = promises.concat(this.calendar.pluginManager.paintAll());
        promises = promises.concat(this.setPluginsPosition());
        return promises;
      }
    }, {
      key: "setPluginsPosition",
      value: function setPluginsPosition() {
        var pluginManager = this.calendar.pluginManager;
        var animationDuration = this.calendar.options.options.animationDuration;
        var domainsContainerPainter = this.calendar.calendarPainter.domainsContainerPainter;
        var top = pluginManager.getFromPosition('top');
        var right = pluginManager.getFromPosition('right');
        var bottom = pluginManager.getFromPosition('bottom');
        var left = pluginManager.getFromPosition('left');
        var topHeight = pluginManager.getHeightFromPosition('top');
        var leftWidth = pluginManager.getWidthFromPosition('left');
        var promises = [];
        var topOffset = 0;
        top.forEach(function (plugin) {
          promises.push(plugin.root.transition().duration(animationDuration).attr('y', topOffset).attr('x', leftWidth).end());
          topOffset += plugin.options.dimensions.height;
        });
        var leftOffset = 0;
        left.forEach(function (plugin) {
          promises.push(plugin.root.transition().duration(animationDuration).attr('x', leftOffset).attr('y', topHeight).end());
          leftOffset += plugin.options.dimensions.width;
        });
        bottom.forEach(function (plugin) {
          promises.push(plugin.root.transition().duration(animationDuration).attr('x', leftWidth).attr('y', topHeight + domainsContainerPainter.height()).end());
        });
        leftOffset += domainsContainerPainter.width();
        right.forEach(function (plugin) {
          promises.push(plugin.root.transition().duration(animationDuration).attr('x', leftOffset).attr('y', topHeight).end());
          leftOffset += plugin.options.dimensions.width;
        });
        return promises;
      }
    }, {
      key: "insideWidth",
      value: function insideWidth() {
        return this.calendar.pluginManager.getWidthFromPosition('left') + this.calendar.pluginManager.getWidthFromPosition('right');
      }
    }, {
      key: "insideHeight",
      value: function insideHeight() {
        return this.calendar.pluginManager.getHeightFromPosition('top') + this.calendar.pluginManager.getHeightFromPosition('bottom');
      }
    }]);
    return PluginPainter;
  }();

  var _CalendarPainter_instances, _CalendarPainter_getHeight, _CalendarPainter_getWidth, _CalendarPainter_resize;
  var DEFAULT_SELECTOR = '.ch-container';
  var CalendarPainter = /*#__PURE__*/function () {
    function CalendarPainter(calendar) {
      _classCallCheck(this, CalendarPainter);
      _CalendarPainter_instances.add(this);
      this.calendar = calendar;
      this.dimensions = {
        width: 0,
        height: 0
      };
      this.root = null;
      this.domainsContainerPainter = new DomainsContainerPainter(calendar);
      this.pluginPainter = new PluginPainter(calendar);
    }
    _createClass(CalendarPainter, [{
      key: "setup",
      value: function setup() {
        var _this$calendar$option = this.calendar.options.options,
          itemSelector = _this$calendar$option.itemSelector,
          theme = _this$calendar$option.theme;
        if (!this.root) {
          this.root = d3Selection.select(itemSelector).append('svg').attr('data-theme', theme).attr('class', DEFAULT_SELECTOR.slice(1));
          this.domainsContainerPainter.setup();
        }
        this.calendar.pluginManager.setupAll();
        return true;
      }
    }, {
      key: "paint",
      value: function paint() {
        var navigationDir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ScrollDirection.SCROLL_NONE;
        var transitions = this.domainsContainerPainter.paint(navigationDir).concat(this.pluginPainter.paint()).concat(this.domainsContainerPainter.updatePosition());
        __classPrivateFieldGet(this, _CalendarPainter_instances, "m", _CalendarPainter_resize).call(this);
        return Promise.allSettled(transitions);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var result = this.calendar.pluginManager.destroyAll().concat(this.domainsContainerPainter.destroy());
        if (!this.root) {
          return Promise.allSettled(result);
        }
        result.push(this.root.transition().duration(this.calendar.options.options.animationDuration).attr('width', 0).attr('height', 0).remove().end());
        return Promise.allSettled(result);
      }
    }]);
    return CalendarPainter;
  }();
  _CalendarPainter_instances = new WeakSet(), _CalendarPainter_getHeight = function _CalendarPainter_getHeight() {
    return this.domainsContainerPainter.height() + this.pluginPainter.insideHeight();
  }, _CalendarPainter_getWidth = function _CalendarPainter_getWidth() {
    return this.domainsContainerPainter.width() + this.pluginPainter.insideWidth();
  }, _CalendarPainter_resize = function _CalendarPainter_resize() {
    var options = this.calendar.options.options;
    var newWidth = __classPrivateFieldGet(this, _CalendarPainter_instances, "m", _CalendarPainter_getWidth).call(this);
    var newHeight = __classPrivateFieldGet(this, _CalendarPainter_instances, "m", _CalendarPainter_getHeight).call(this);
    this.root.transition().duration(options.animationDuration).attr('width', newWidth).attr('height', newHeight);
    if (newWidth !== this.dimensions.width || newHeight !== this.dimensions.height) {
      this.calendar.eventEmitter.emit('resize', newWidth, newHeight, this.dimensions.width, this.dimensions.height);
    }
    this.dimensions = {
      width: newWidth,
      height: newHeight
    };
  };

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  var freeGlobal$1 = freeGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal$1 || freeSelf || Function('return this')();

  var root$1 = root;

  /** Built-in value references. */
  var Symbol$1 = root$1.Symbol;

  var Symbol$2 = Symbol$1;

  /** Used for built-in method references. */
  var objectProto$f = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$c = objectProto$f.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$f.toString;

  /** Built-in value references. */
  var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty$c.call(value, symToStringTag$1),
        tag = value[symToStringTag$1];

    try {
      value[symToStringTag$1] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString$1.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$1] = tag;
      } else {
        delete value[symToStringTag$1];
      }
    }
    return result;
  }

  /** Used for built-in method references. */
  var objectProto$e = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto$e.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString$1(value) {
    return nativeObjectToString.call(value);
  }

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag && symToStringTag in Object(value))
      ? getRawTag(value)
      : objectToString$1(value);
  }

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject$2(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  /** `Object#toString` result references. */
  var asyncTag = '[object AsyncFunction]',
      funcTag$1 = '[object Function]',
      genTag = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    if (!isObject$2(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = baseGetTag(value);
    return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  var $$4 = _export;
  var toObject$1 = toObject$b;
  var nativeKeys$2 = objectKeys$3;
  var fails$5 = fails$u;

  var FAILS_ON_PRIMITIVES = fails$5(function () { nativeKeys$2(1); });

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  $$4({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
    keys: function keys(it) {
      return nativeKeys$2(toObject$1(it));
    }
  });

  var isObject$1 = isObject$j;
  var classof$1 = classofRaw$2;
  var wellKnownSymbol$3 = wellKnownSymbol$m;

  var MATCH$1 = wellKnownSymbol$3('match');

  // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp
  var isRegexp = function (it) {
    var isRegExp;
    return isObject$1(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof$1(it) == 'RegExp');
  };

  var isRegExp = isRegexp;

  var $TypeError$1 = TypeError;

  var notARegexp = function (it) {
    if (isRegExp(it)) {
      throw $TypeError$1("The method doesn't accept regular expressions");
    } return it;
  };

  var wellKnownSymbol$2 = wellKnownSymbol$m;

  var MATCH = wellKnownSymbol$2('match');

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

  var $$3 = _export;
  var uncurryThis$7 = functionUncurryThisClause;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var toLength$1 = toLength$3;
  var toString$4 = toString$a;
  var notARegExp$1 = notARegexp;
  var requireObjectCoercible$2 = requireObjectCoercible$7;
  var correctIsRegExpLogic$1 = correctIsRegexpLogic;

  // eslint-disable-next-line es/no-string-prototype-startswith -- safe
  var nativeStartsWith = uncurryThis$7(''.startsWith);
  var stringSlice$3 = uncurryThis$7(''.slice);
  var min$1 = Math.min;

  var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic$1('startsWith');
  // https://github.com/zloirock/core-js/pull/702
  var MDN_POLYFILL_BUG = !CORRECT_IS_REGEXP_LOGIC && !!function () {
    var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
    return descriptor && !descriptor.writable;
  }();

  // `String.prototype.startsWith` method
  // https://tc39.es/ecma262/#sec-string.prototype.startswith
  $$3({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
    startsWith: function startsWith(searchString /* , position = 0 */) {
      var that = toString$4(requireObjectCoercible$2(this));
      notARegExp$1(searchString);
      var index = toLength$1(min$1(arguments.length > 1 ? arguments[1] : undefined, that.length));
      var search = toString$4(searchString);
      return nativeStartsWith
        ? nativeStartsWith(that, search, index)
        : stringSlice$3(that, index, index + search.length) === search;
    }
  });

  var DESCRIPTORS$1 = descriptors;
  var uncurryThis$6 = functionUncurryThis;
  var objectKeys = objectKeys$3;
  var toIndexedObject = toIndexedObject$9;
  var $propertyIsEnumerable = objectPropertyIsEnumerable.f;

  var propertyIsEnumerable$2 = uncurryThis$6($propertyIsEnumerable);
  var push$1 = uncurryThis$6([].push);

  // `Object.{ entries, values }` methods implementation
  var createMethod = function (TO_ENTRIES) {
    return function (it) {
      var O = toIndexedObject(it);
      var keys = objectKeys(O);
      var length = keys.length;
      var i = 0;
      var result = [];
      var key;
      while (length > i) {
        key = keys[i++];
        if (!DESCRIPTORS$1 || propertyIsEnumerable$2(O, key)) {
          push$1(result, TO_ENTRIES ? [key, O[key]] : O[key]);
        }
      }
      return result;
    };
  };

  var objectToArray = {
    // `Object.entries` method
    // https://tc39.es/ecma262/#sec-object.entries
    entries: createMethod(true),
    // `Object.values` method
    // https://tc39.es/ecma262/#sec-object.values
    values: createMethod(false)
  };

  var $$2 = _export;
  var $entries = objectToArray.entries;

  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  $$2({ target: 'Object', stat: true }, {
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
  const constant$1 = (x) => () => x;

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
  function isObject(option) {
    return option?.toString === objectToString;
  }

  // Disambiguates a scale options object (e.g., {color: {type: "linear"}}) from
  // some other option (e.g., {color: "red"}). When creating standalone legends,
  // this is used to test whether a scale is defined; this should be consistent
  // with inferScaleType when there are no channels associated with the scale, and
  // if this returns true, then normalizeScale must return non-null.
  function isScaleOptions(option) {
    return isObject(option) && (option.type !== undefined || option.domain !== undefined);
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
      scale.interpolate((range === unit ? constant$1 : interpolatePiecewise)(interpolate));
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

  var Populator = /*#__PURE__*/function () {
    function Populator(calendar) {
      _classCallCheck(this, Populator);
      this.calendar = calendar;
    }
    _createClass(Populator, [{
      key: "populate",
      value: function populate() {
        var calendar = this.calendar;
        var _calendar$options$opt = calendar.options.options,
          scale = _calendar$options$opt.scale,
          subDomain = _calendar$options$opt.subDomain;
        var colorScale = normalizedScale(scale);
        calendar.calendarPainter.root.selectAll('.ch-domain').selectAll('svg').selectAll('g').data(function (d) {
          return calendar.domainCollection.get(d) || [];
        }).call(function (element) {
          applyScaleStyle(element.select('rect'), colorScale, scale, 'v');
        }).call(function (element) {
          element.select('text').attr('style', function (d) {
            var defaultColor = d3Color.hcl(colorScale === null || colorScale === void 0 ? void 0 : colorScale.apply(d.v)).l > 60 ? '#000' : '#fff';
            var color = subDomain.color || (d.v ? defaultColor : null);
            if (isFunction(color)) {
              color = color(d.t, d.v, colorScale === null || colorScale === void 0 ? void 0 : colorScale.apply(d.v));
            }
            if (!color) {
              return null;
            }
            return "fill: ".concat(color, ";");
          }).text(function (d, i, nodes) {
            return (
              // eslint-disable-next-line implicit-arrow-linebreak
              calendar.dateHelper.format(d.t, subDomain.label, d.v, nodes[i])
            );
          });
        }).call(function () {
          calendar.eventEmitter.emit('fill');
        });
      }
    }]);
    return Populator;
  }();

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq(value, other) {
    return value === other || (value !== value && other !== other);
  }

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }

  /** Used for built-in method references. */
  var arrayProto = Array.prototype;

  /** Built-in value references. */
  var splice = arrayProto.splice;

  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function listCacheDelete(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function listCacheGet(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    return index < 0 ? undefined : data[index][1];
  }

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  function listCacheSet(key, value) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function ListCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `ListCache`.
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype['delete'] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */
  function stackClear() {
    this.__data__ = new ListCache;
    this.size = 0;
  }

  /**
   * Removes `key` and its value from the stack.
   *
   * @private
   * @name delete
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function stackDelete(key) {
    var data = this.__data__,
        result = data['delete'](key);

    this.size = data.size;
    return result;
  }

  /**
   * Gets the stack value for `key`.
   *
   * @private
   * @name get
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function stackGet(key) {
    return this.__data__.get(key);
  }

  /**
   * Checks if a stack value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function stackHas(key) {
    return this.__data__.has(key);
  }

  /** Used to detect overreaching core-js shims. */
  var coreJsData = root$1['__core-js_shared__'];

  var coreJsData$1 = coreJsData;

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || '');
    return uid ? ('Symbol(src)_1.' + uid) : '';
  }());

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked(func) {
    return !!maskSrcKey && (maskSrcKey in func);
  }

  /** Used for built-in method references. */
  var funcProto$2 = Function.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$2 = funcProto$2.toString;

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString$2.call(func);
      } catch (e) {}
      try {
        return (func + '');
      } catch (e) {}
    }
    return '';
  }

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used for built-in method references. */
  var funcProto$1 = Function.prototype,
      objectProto$d = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$1 = funcProto$1.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$b = objectProto$d.hasOwnProperty;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' +
    funcToString$1.call(hasOwnProperty$b).replace(reRegExpChar, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative(value) {
    if (!isObject$2(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
  }

  /* Built-in method references that are verified to be native. */
  var Map$1 = getNative(root$1, 'Map');

  var Map$2 = Map$1;

  /* Built-in method references that are verified to be native. */
  var nativeCreate = getNative(Object, 'create');

  var nativeCreate$1 = nativeCreate;

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear() {
    this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
    this.size = 0;
  }

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

  /** Used for built-in method references. */
  var objectProto$c = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$a = objectProto$c.hasOwnProperty;

  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate$1) {
      var result = data[key];
      return result === HASH_UNDEFINED$2 ? undefined : result;
    }
    return hasOwnProperty$a.call(data, key) ? data[key] : undefined;
  }

  /** Used for built-in method references. */
  var objectProto$b = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$9 = objectProto$b.hasOwnProperty;

  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate$1 ? (data[key] !== undefined) : hasOwnProperty$9.call(data, key);
  }

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = (nativeCreate$1 && value === undefined) ? HASH_UNDEFINED$1 : value;
    return this;
  }

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Hash(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `Hash`.
  Hash.prototype.clear = hashClear;
  Hash.prototype['delete'] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      'hash': new Hash,
      'map': new (Map$2 || ListCache),
      'string': new Hash
    };
  }

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = typeof value;
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
      ? (value !== '__proto__')
      : (value === null);
  }

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key)
      ? data[typeof key == 'string' ? 'string' : 'hash']
      : data.map;
  }

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function mapCacheDelete(key) {
    var result = getMapData(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */
  function mapCacheSet(key, value) {
    var data = getMapData(this, key),
        size = data.size;

    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function MapCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `MapCache`.
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype['delete'] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /**
   * Sets the stack `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the stack cache instance.
   */
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache) {
      var pairs = data.__data__;
      if (!Map$2 || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Stack(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }

  // Add methods to `Stack`.
  Stack.prototype.clear = stackClear;
  Stack.prototype['delete'] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;

  var defineProperty = (function() {
    try {
      var func = getNative(Object, 'defineProperty');
      func({}, '', {});
      return func;
    } catch (e) {}
  }());

  var defineProperty$1 = defineProperty;

  /**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function baseAssignValue(object, key, value) {
    if (key == '__proto__' && defineProperty$1) {
      defineProperty$1(object, key, {
        'configurable': true,
        'enumerable': true,
        'value': value,
        'writable': true
      });
    } else {
      object[key] = value;
    }
  }

  /**
   * This function is like `assignValue` except that it doesn't assign
   * `undefined` values.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignMergeValue(object, key, value) {
    if ((value !== undefined && !eq(object[key], value)) ||
        (value === undefined && !(key in object))) {
      baseAssignValue(object, key, value);
    }
  }

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index = -1,
          iterable = Object(object),
          props = keysFunc(object),
          length = props.length;

      while (length--) {
        var key = props[fromRight ? length : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }

  /**
   * The base implementation of `baseForOwn` which iterates over `object`
   * properties returned by `keysFunc` and invokes `iteratee` for each property.
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  var baseFor = createBaseFor();

  var baseFor$1 = baseFor;

  /** Detect free variable `exports`. */
  var freeExports$2 = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule$2 = freeExports$2 && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;

  /** Built-in value references. */
  var Buffer$1 = moduleExports$2 ? root$1.Buffer : undefined,
      allocUnsafe = Buffer$1 ? Buffer$1.allocUnsafe : undefined;

  /**
   * Creates a clone of  `buffer`.
   *
   * @private
   * @param {Buffer} buffer The buffer to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Buffer} Returns the cloned buffer.
   */
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length,
        result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

    buffer.copy(result);
    return result;
  }

  /** Built-in value references. */
  var Uint8Array$1 = root$1.Uint8Array;

  var Uint8Array$2 = Uint8Array$1;

  /**
   * Creates a clone of `arrayBuffer`.
   *
   * @private
   * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
   * @returns {ArrayBuffer} Returns the cloned array buffer.
   */
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array$2(result).set(new Uint8Array$2(arrayBuffer));
    return result;
  }

  /**
   * Creates a clone of `typedArray`.
   *
   * @private
   * @param {Object} typedArray The typed array to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned typed array.
   */
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */
  function copyArray(source, array) {
    var index = -1,
        length = source.length;

    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }

  /** Built-in value references. */
  var objectCreate = Object.create;

  /**
   * The base implementation of `_.create` without support for assigning
   * properties to the created object.
   *
   * @private
   * @param {Object} proto The object to inherit from.
   * @returns {Object} Returns the new object.
   */
  var baseCreate = (function() {
    function object() {}
    return function(proto) {
      if (!isObject$2(proto)) {
        return {};
      }
      if (objectCreate) {
        return objectCreate(proto);
      }
      object.prototype = proto;
      var result = new object;
      object.prototype = undefined;
      return result;
    };
  }());

  var baseCreate$1 = baseCreate;

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  /** Built-in value references. */
  var getPrototype = overArg(Object.getPrototypeOf, Object);

  var getPrototype$1 = getPrototype;

  /** Used for built-in method references. */
  var objectProto$a = Object.prototype;

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$a;

    return value === proto;
  }

  /**
   * Initializes an object clone.
   *
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneObject(object) {
    return (typeof object.constructor == 'function' && !isPrototype(object))
      ? baseCreate$1(getPrototype$1(object))
      : {};
  }

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  /** `Object#toString` result references. */
  var argsTag$2 = '[object Arguments]';

  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */
  function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag$2;
  }

  /** Used for built-in method references. */
  var objectProto$9 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$8 = objectProto$9.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable$1 = objectProto$9.propertyIsEnumerable;

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
    return isObjectLike(value) && hasOwnProperty$8.call(value, 'callee') &&
      !propertyIsEnumerable$1.call(value, 'callee');
  };

  var isArguments$1 = isArguments;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$1 = 9007199254740991;

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength(value) {
    return typeof value == 'number' &&
      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
  }

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }

  /**
   * This method is like `_.isArrayLike` except that it also checks if `value`
   * is an object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array-like object,
   *  else `false`.
   * @example
   *
   * _.isArrayLikeObject([1, 2, 3]);
   * // => true
   *
   * _.isArrayLikeObject(document.body.children);
   * // => true
   *
   * _.isArrayLikeObject('abc');
   * // => false
   *
   * _.isArrayLikeObject(_.noop);
   * // => false
   */
  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }

  /**
   * This method returns `false`.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {boolean} Returns `false`.
   * @example
   *
   * _.times(2, _.stubFalse);
   * // => [false, false]
   */
  function stubFalse() {
    return false;
  }

  /** Detect free variable `exports`. */
  var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

  /** Built-in value references. */
  var Buffer = moduleExports$1 ? root$1.Buffer : undefined;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */
  var isBuffer = nativeIsBuffer || stubFalse;

  var isBuffer$1 = isBuffer;

  /** `Object#toString` result references. */
  var objectTag$3 = '[object Object]';

  /** Used for built-in method references. */
  var funcProto = Function.prototype,
      objectProto$8 = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$7 = objectProto$8.hasOwnProperty;

  /** Used to infer the `Object` constructor. */
  var objectCtorString = funcToString.call(Object);

  /**
   * Checks if `value` is a plain object, that is, an object created by the
   * `Object` constructor or one with a `[[Prototype]]` of `null`.
   *
   * @static
   * @memberOf _
   * @since 0.8.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * _.isPlainObject(new Foo);
   * // => false
   *
   * _.isPlainObject([1, 2, 3]);
   * // => false
   *
   * _.isPlainObject({ 'x': 0, 'y': 0 });
   * // => true
   *
   * _.isPlainObject(Object.create(null));
   * // => true
   */
  function isPlainObject(value) {
    if (!isObjectLike(value) || baseGetTag(value) != objectTag$3) {
      return false;
    }
    var proto = getPrototype$1(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty$7.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor &&
      funcToString.call(Ctor) == objectCtorString;
  }

  /** `Object#toString` result references. */
  var argsTag$1 = '[object Arguments]',
      arrayTag$1 = '[object Array]',
      boolTag$1 = '[object Boolean]',
      dateTag$1 = '[object Date]',
      errorTag$1 = '[object Error]',
      funcTag = '[object Function]',
      mapTag$2 = '[object Map]',
      numberTag$1 = '[object Number]',
      objectTag$2 = '[object Object]',
      regexpTag$1 = '[object RegExp]',
      setTag$2 = '[object Set]',
      stringTag$2 = '[object String]',
      weakMapTag$1 = '[object WeakMap]';

  var arrayBufferTag$1 = '[object ArrayBuffer]',
      dataViewTag$2 = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] =
  typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] =
  typedArrayTags[dataViewTag$2] = typedArrayTags[dateTag$1] =
  typedArrayTags[errorTag$1] = typedArrayTags[funcTag] =
  typedArrayTags[mapTag$2] = typedArrayTags[numberTag$1] =
  typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$1] =
  typedArrayTags[setTag$2] = typedArrayTags[stringTag$2] =
  typedArrayTags[weakMapTag$1] = false;

  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */
  function baseIsTypedArray(value) {
    return isObjectLike(value) &&
      isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  }

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  /** Detect free variable `exports`. */
  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && freeGlobal$1.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule && freeModule.require && freeModule.require('util').types;

      if (types) {
        return types;
      }

      // Legacy `process.binding('util')` for Node.js < 10.
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  var nodeUtil$1 = nodeUtil;

  /* Node.js helper references. */
  var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;

  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */
  var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

  var isTypedArray$1 = isTypedArray;

  /**
   * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function safeGet(object, key) {
    if (key === 'constructor' && typeof object[key] === 'function') {
      return;
    }

    if (key == '__proto__') {
      return;
    }

    return object[key];
  }

  /** Used for built-in method references. */
  var objectProto$7 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

  /**
   * Assigns `value` to `key` of `object` if the existing value is not equivalent
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty$6.call(object, key) && eq(objValue, value)) ||
        (value === undefined && !(key in object))) {
      baseAssignValue(object, key, value);
    }
  }

  /**
   * Copies properties of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy properties from.
   * @param {Array} props The property identifiers to copy.
   * @param {Object} [object={}] The object to copy properties to.
   * @param {Function} [customizer] The function to customize copied values.
   * @returns {Object} Returns `object`.
   */
  function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});

    var index = -1,
        length = props.length;

    while (++index < length) {
      var key = props[index];

      var newValue = customizer
        ? customizer(object[key], source[key], key, object, source)
        : undefined;

      if (newValue === undefined) {
        newValue = source[key];
      }
      if (isNew) {
        baseAssignValue(object, key, newValue);
      } else {
        assignValue(object, key, newValue);
      }
    }
    return object;
  }

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;

    return !!length &&
      (type == 'number' ||
        (type != 'symbol' && reIsUint.test(value))) &&
          (value > -1 && value % 1 == 0 && value < length);
  }

  /** Used for built-in method references. */
  var objectProto$6 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray$3(value),
        isArg = !isArr && isArguments$1(value),
        isBuff = !isArr && !isArg && isBuffer$1(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray$1(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? baseTimes(value.length, String) : [],
        length = result.length;

    for (var key in value) {
      if ((inherited || hasOwnProperty$5.call(value, key)) &&
          !(skipIndexes && (
             // Safari 9 has enumerable `arguments.length` in strict mode.
             key == 'length' ||
             // Node.js 0.10 has enumerable non-index properties on buffers.
             (isBuff && (key == 'offset' || key == 'parent')) ||
             // PhantomJS 2 has enumerable non-index properties on typed arrays.
             (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
             // Skip index properties.
             isIndex(key, length)
          ))) {
        result.push(key);
      }
    }
    return result;
  }

  /**
   * This function is like
   * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * except that it includes inherited enumerable properties.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }

  /** Used for built-in method references. */
  var objectProto$5 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

  /**
   * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeysIn(object) {
    if (!isObject$2(object)) {
      return nativeKeysIn(object);
    }
    var isProto = isPrototype(object),
        result = [];

    for (var key in object) {
      if (!(key == 'constructor' && (isProto || !hasOwnProperty$4.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }

  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */
  function keysIn(object) {
    return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
  }

  /**
   * Converts `value` to a plain object flattening inherited enumerable string
   * keyed properties of `value` to own properties of the plain object.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {Object} Returns the converted plain object.
   * @example
   *
   * function Foo() {
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.assign({ 'a': 1 }, new Foo);
   * // => { 'a': 1, 'b': 2 }
   *
   * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
   * // => { 'a': 1, 'b': 2, 'c': 3 }
   */
  function toPlainObject(value) {
    return copyObject(value, keysIn(value));
  }

  /**
   * A specialized version of `baseMerge` for arrays and objects which performs
   * deep merges and tracks traversed objects enabling objects with circular
   * references to be merged.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {string} key The key of the value to merge.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} mergeFunc The function to merge values.
   * @param {Function} [customizer] The function to customize assigned values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */
  function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = safeGet(object, key),
        srcValue = safeGet(source, key),
        stacked = stack.get(srcValue);

    if (stacked) {
      assignMergeValue(object, key, stacked);
      return;
    }
    var newValue = customizer
      ? customizer(objValue, srcValue, (key + ''), object, source, stack)
      : undefined;

    var isCommon = newValue === undefined;

    if (isCommon) {
      var isArr = isArray$3(srcValue),
          isBuff = !isArr && isBuffer$1(srcValue),
          isTyped = !isArr && !isBuff && isTypedArray$1(srcValue);

      newValue = srcValue;
      if (isArr || isBuff || isTyped) {
        if (isArray$3(objValue)) {
          newValue = objValue;
        }
        else if (isArrayLikeObject(objValue)) {
          newValue = copyArray(objValue);
        }
        else if (isBuff) {
          isCommon = false;
          newValue = cloneBuffer(srcValue, true);
        }
        else if (isTyped) {
          isCommon = false;
          newValue = cloneTypedArray(srcValue, true);
        }
        else {
          newValue = [];
        }
      }
      else if (isPlainObject(srcValue) || isArguments$1(srcValue)) {
        newValue = objValue;
        if (isArguments$1(objValue)) {
          newValue = toPlainObject(objValue);
        }
        else if (!isObject$2(objValue) || isFunction(objValue)) {
          newValue = initCloneObject(srcValue);
        }
      }
      else {
        isCommon = false;
      }
    }
    if (isCommon) {
      // Recursively merge objects and arrays (susceptible to call stack limits).
      stack.set(srcValue, newValue);
      mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
      stack['delete'](srcValue);
    }
    assignMergeValue(object, key, newValue);
  }

  /**
   * The base implementation of `_.merge` without support for multiple sources.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} [customizer] The function to customize merged values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */
  function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) {
      return;
    }
    baseFor$1(source, function(srcValue, key) {
      stack || (stack = new Stack);
      if (isObject$2(srcValue)) {
        baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
      }
      else {
        var newValue = customizer
          ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
          : undefined;

        if (newValue === undefined) {
          newValue = srcValue;
        }
        assignMergeValue(object, key, newValue);
      }
    }, keysIn);
  }

  /**
   * This method returns the first argument it receives.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'a': 1 };
   *
   * console.log(_.identity(object) === object);
   * // => true
   */
  function identity(value) {
    return value;
  }

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */
  function apply$1(func, thisArg, args) {
    switch (args.length) {
      case 0: return func.call(thisArg);
      case 1: return func.call(thisArg, args[0]);
      case 2: return func.call(thisArg, args[0], args[1]);
      case 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max;

  /**
   * A specialized version of `baseRest` which transforms the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @param {Function} transform The rest array transform.
   * @returns {Function} Returns the new function.
   */
  function overRest(func, start, transform) {
    start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
    return function() {
      var args = arguments,
          index = -1,
          length = nativeMax(args.length - start, 0),
          array = Array(length);

      while (++index < length) {
        array[index] = args[start + index];
      }
      index = -1;
      var otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = transform(array);
      return apply$1(func, this, otherArgs);
    };
  }

  /**
   * Creates a function that returns `value`.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {*} value The value to return from the new function.
   * @returns {Function} Returns the new constant function.
   * @example
   *
   * var objects = _.times(2, _.constant({ 'a': 1 }));
   *
   * console.log(objects);
   * // => [{ 'a': 1 }, { 'a': 1 }]
   *
   * console.log(objects[0] === objects[1]);
   * // => true
   */
  function constant(value) {
    return function() {
      return value;
    };
  }

  /**
   * The base implementation of `setToString` without support for hot loop shorting.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var baseSetToString = !defineProperty$1 ? identity : function(func, string) {
    return defineProperty$1(func, 'toString', {
      'configurable': true,
      'enumerable': false,
      'value': constant(string),
      'writable': true
    });
  };

  var baseSetToString$1 = baseSetToString;

  /** Used to detect hot functions by number of calls within a span of milliseconds. */
  var HOT_COUNT = 800,
      HOT_SPAN = 16;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeNow = Date.now;

  /**
   * Creates a function that'll short out and invoke `identity` instead
   * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
   * milliseconds.
   *
   * @private
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new shortable function.
   */
  function shortOut(func) {
    var count = 0,
        lastCalled = 0;

    return function() {
      var stamp = nativeNow(),
          remaining = HOT_SPAN - (stamp - lastCalled);

      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }
      return func.apply(undefined, arguments);
    };
  }

  /**
   * Sets the `toString` method of `func` to return `string`.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var setToString = shortOut(baseSetToString$1);

  var setToString$1 = setToString;

  /**
   * The base implementation of `_.rest` which doesn't validate or coerce arguments.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   */
  function baseRest(func, start) {
    return setToString$1(overRest(func, start, identity), func + '');
  }

  /**
   * Checks if the given arguments are from an iteratee call.
   *
   * @private
   * @param {*} value The potential iteratee value argument.
   * @param {*} index The potential iteratee index or key argument.
   * @param {*} object The potential iteratee object argument.
   * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
   *  else `false`.
   */
  function isIterateeCall(value, index, object) {
    if (!isObject$2(object)) {
      return false;
    }
    var type = typeof index;
    if (type == 'number'
          ? (isArrayLike(object) && isIndex(index, object.length))
          : (type == 'string' && index in object)
        ) {
      return eq(object[index], value);
    }
    return false;
  }

  /**
   * Creates a function like `_.assign`.
   *
   * @private
   * @param {Function} assigner The function to assign values.
   * @returns {Function} Returns the new assigner function.
   */
  function createAssigner(assigner) {
    return baseRest(function(object, sources) {
      var index = -1,
          length = sources.length,
          customizer = length > 1 ? sources[length - 1] : undefined,
          guard = length > 2 ? sources[2] : undefined;

      customizer = (assigner.length > 3 && typeof customizer == 'function')
        ? (length--, customizer)
        : undefined;

      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? undefined : customizer;
        length = 1;
      }
      object = Object(object);
      while (++index < length) {
        var source = sources[index];
        if (source) {
          assigner(object, source, index, customizer);
        }
      }
      return object;
    });
  }

  /**
   * This method is like `_.merge` except that it accepts `customizer` which
   * is invoked to produce the merged values of the destination and source
   * properties. If `customizer` returns `undefined`, merging is handled by the
   * method instead. The `customizer` is invoked with six arguments:
   * (objValue, srcValue, key, object, source, stack).
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} sources The source objects.
   * @param {Function} customizer The function to customize assigned values.
   * @returns {Object} Returns `object`.
   * @example
   *
   * function customizer(objValue, srcValue) {
   *   if (_.isArray(objValue)) {
   *     return objValue.concat(srcValue);
   *   }
   * }
   *
   * var object = { 'a': [1], 'b': [2] };
   * var other = { 'a': [3], 'b': [4] };
   *
   * _.mergeWith(object, other, customizer);
   * // => { 'a': [1, 3], 'b': [2, 4] }
   */
  var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
    baseMerge(object, source, srcIndex, customizer);
  });

  var mergeWith$1 = mergeWith;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /**
   * Adds `value` to the array cache.
   *
   * @private
   * @name add
   * @memberOf SetCache
   * @alias push
   * @param {*} value The value to cache.
   * @returns {Object} Returns the cache instance.
   */
  function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED);
    return this;
  }

  /**
   * Checks if `value` is in the array cache.
   *
   * @private
   * @name has
   * @memberOf SetCache
   * @param {*} value The value to search for.
   * @returns {number} Returns `true` if `value` is found, else `false`.
   */
  function setCacheHas(value) {
    return this.__data__.has(value);
  }

  /**
   *
   * Creates an array cache object to store unique values.
   *
   * @private
   * @constructor
   * @param {Array} [values] The values to cache.
   */
  function SetCache(values) {
    var index = -1,
        length = values == null ? 0 : values.length;

    this.__data__ = new MapCache;
    while (++index < length) {
      this.add(values[index]);
    }
  }

  // Add methods to `SetCache`.
  SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
  SetCache.prototype.has = setCacheHas;

  /**
   * A specialized version of `_.some` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */
  function arraySome(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Checks if a `cache` value for `key` exists.
   *
   * @private
   * @param {Object} cache The cache to query.
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function cacheHas(cache, key) {
    return cache.has(key);
  }

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$3 = 1,
      COMPARE_UNORDERED_FLAG$1 = 2;

  /**
   * A specialized version of `baseIsEqualDeep` for arrays with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Array} array The array to compare.
   * @param {Array} other The other array to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `array` and `other` objects.
   * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
   */
  function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3,
        arrLength = array.length,
        othLength = other.length;

    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    }
    // Check that cyclic values are equal.
    var arrStacked = stack.get(array);
    var othStacked = stack.get(other);
    if (arrStacked && othStacked) {
      return arrStacked == other && othStacked == array;
    }
    var index = -1,
        result = true,
        seen = (bitmask & COMPARE_UNORDERED_FLAG$1) ? new SetCache : undefined;

    stack.set(array, other);
    stack.set(other, array);

    // Ignore non-index properties.
    while (++index < arrLength) {
      var arrValue = array[index],
          othValue = other[index];

      if (customizer) {
        var compared = isPartial
          ? customizer(othValue, arrValue, index, other, array, stack)
          : customizer(arrValue, othValue, index, array, other, stack);
      }
      if (compared !== undefined) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
      // Recursively compare arrays (susceptible to call stack limits).
      if (seen) {
        if (!arraySome(other, function(othValue, othIndex) {
              if (!cacheHas(seen, othIndex) &&
                  (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                return seen.push(othIndex);
              }
            })) {
          result = false;
          break;
        }
      } else if (!(
            arrValue === othValue ||
              equalFunc(arrValue, othValue, bitmask, customizer, stack)
          )) {
        result = false;
        break;
      }
    }
    stack['delete'](array);
    stack['delete'](other);
    return result;
  }

  /**
   * Converts `map` to its key-value pairs.
   *
   * @private
   * @param {Object} map The map to convert.
   * @returns {Array} Returns the key-value pairs.
   */
  function mapToArray(map) {
    var index = -1,
        result = Array(map.size);

    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }

  /**
   * Converts `set` to an array of its values.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the values.
   */
  function setToArray(set) {
    var index = -1,
        result = Array(set.size);

    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$2 = 1,
      COMPARE_UNORDERED_FLAG = 2;

  /** `Object#toString` result references. */
  var boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      mapTag$1 = '[object Map]',
      numberTag = '[object Number]',
      regexpTag = '[object RegExp]',
      setTag$1 = '[object Set]',
      stringTag$1 = '[object String]',
      symbolTag$1 = '[object Symbol]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag$1 = '[object DataView]';

  /** Used to convert symbols to primitives and strings. */
  var symbolProto$1 = Symbol$2 ? Symbol$2.prototype : undefined,
      symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : undefined;

  /**
   * A specialized version of `baseIsEqualDeep` for comparing objects of
   * the same `toStringTag`.
   *
   * **Note:** This function only supports comparing values with tags of
   * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {string} tag The `toStringTag` of the objects to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
      case dataViewTag$1:
        if ((object.byteLength != other.byteLength) ||
            (object.byteOffset != other.byteOffset)) {
          return false;
        }
        object = object.buffer;
        other = other.buffer;

      case arrayBufferTag:
        if ((object.byteLength != other.byteLength) ||
            !equalFunc(new Uint8Array$2(object), new Uint8Array$2(other))) {
          return false;
        }
        return true;

      case boolTag:
      case dateTag:
      case numberTag:
        // Coerce booleans to `1` or `0` and dates to milliseconds.
        // Invalid dates are coerced to `NaN`.
        return eq(+object, +other);

      case errorTag:
        return object.name == other.name && object.message == other.message;

      case regexpTag:
      case stringTag$1:
        // Coerce regexes to strings and treat strings, primitives and objects,
        // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
        // for more details.
        return object == (other + '');

      case mapTag$1:
        var convert = mapToArray;

      case setTag$1:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2;
        convert || (convert = setToArray);

        if (object.size != other.size && !isPartial) {
          return false;
        }
        // Assume cyclic values are equal.
        var stacked = stack.get(object);
        if (stacked) {
          return stacked == other;
        }
        bitmask |= COMPARE_UNORDERED_FLAG;

        // Recursively compare objects (susceptible to call stack limits).
        stack.set(object, other);
        var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
        stack['delete'](object);
        return result;

      case symbolTag$1:
        if (symbolValueOf) {
          return symbolValueOf.call(object) == symbolValueOf.call(other);
        }
    }
    return false;
  }

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */
  function arrayPush(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }

  /**
   * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
   * `keysFunc` and `symbolsFunc` to get the enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @param {Function} symbolsFunc The function to get the symbols of `object`.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray$3(object) ? result : arrayPush(result, symbolsFunc(object));
  }

  /**
   * A specialized version of `_.filter` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function arrayFilter(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }

  /**
   * This method returns a new empty array.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {Array} Returns the new empty array.
   * @example
   *
   * var arrays = _.times(2, _.stubArray);
   *
   * console.log(arrays);
   * // => [[], []]
   *
   * console.log(arrays[0] === arrays[1]);
   * // => false
   */
  function stubArray() {
    return [];
  }

  /** Used for built-in method references. */
  var objectProto$4 = Object.prototype;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto$4.propertyIsEnumerable;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeGetSymbols = Object.getOwnPropertySymbols;

  /**
   * Creates an array of the own enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return arrayFilter(nativeGetSymbols(object), function(symbol) {
      return propertyIsEnumerable.call(object, symbol);
    });
  };

  var getSymbols$1 = getSymbols;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeKeys = overArg(Object.keys, Object);

  var nativeKeys$1 = nativeKeys;

  /** Used for built-in method references. */
  var objectProto$3 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$3 = objectProto$3.hasOwnProperty;

  /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeys(object) {
    if (!isPrototype(object)) {
      return nativeKeys$1(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty$3.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }
    return result;
  }

  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * for more details.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */
  function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  }

  /**
   * Creates an array of own enumerable property names and symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeys(object) {
    return baseGetAllKeys(object, keys, getSymbols$1);
  }

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$1 = 1;

  /** Used for built-in method references. */
  var objectProto$2 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

  /**
   * A specialized version of `baseIsEqualDeep` for objects with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1,
        objProps = getAllKeys(object),
        objLength = objProps.length,
        othProps = getAllKeys(other),
        othLength = othProps.length;

    if (objLength != othLength && !isPartial) {
      return false;
    }
    var index = objLength;
    while (index--) {
      var key = objProps[index];
      if (!(isPartial ? key in other : hasOwnProperty$2.call(other, key))) {
        return false;
      }
    }
    // Check that cyclic values are equal.
    var objStacked = stack.get(object);
    var othStacked = stack.get(other);
    if (objStacked && othStacked) {
      return objStacked == other && othStacked == object;
    }
    var result = true;
    stack.set(object, other);
    stack.set(other, object);

    var skipCtor = isPartial;
    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key],
          othValue = other[key];

      if (customizer) {
        var compared = isPartial
          ? customizer(othValue, objValue, key, other, object, stack)
          : customizer(objValue, othValue, key, object, other, stack);
      }
      // Recursively compare objects (susceptible to call stack limits).
      if (!(compared === undefined
            ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
            : compared
          )) {
        result = false;
        break;
      }
      skipCtor || (skipCtor = key == 'constructor');
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor,
          othCtor = other.constructor;

      // Non `Object` object instances with different constructors are not equal.
      if (objCtor != othCtor &&
          ('constructor' in object && 'constructor' in other) &&
          !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
            typeof othCtor == 'function' && othCtor instanceof othCtor)) {
        result = false;
      }
    }
    stack['delete'](object);
    stack['delete'](other);
    return result;
  }

  /* Built-in method references that are verified to be native. */
  var DataView = getNative(root$1, 'DataView');

  var DataView$1 = DataView;

  /* Built-in method references that are verified to be native. */
  var Promise$1 = getNative(root$1, 'Promise');

  var Promise$2 = Promise$1;

  /* Built-in method references that are verified to be native. */
  var Set$1 = getNative(root$1, 'Set');

  var Set$2 = Set$1;

  /* Built-in method references that are verified to be native. */
  var WeakMap = getNative(root$1, 'WeakMap');

  var WeakMap$1 = WeakMap;

  /** `Object#toString` result references. */
  var mapTag = '[object Map]',
      objectTag$1 = '[object Object]',
      promiseTag = '[object Promise]',
      setTag = '[object Set]',
      weakMapTag = '[object WeakMap]';

  var dataViewTag = '[object DataView]';

  /** Used to detect maps, sets, and weakmaps. */
  var dataViewCtorString = toSource(DataView$1),
      mapCtorString = toSource(Map$2),
      promiseCtorString = toSource(Promise$2),
      setCtorString = toSource(Set$2),
      weakMapCtorString = toSource(WeakMap$1);

  /**
   * Gets the `toStringTag` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  var getTag = baseGetTag;

  // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
  if ((DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag) ||
      (Map$2 && getTag(new Map$2) != mapTag) ||
      (Promise$2 && getTag(Promise$2.resolve()) != promiseTag) ||
      (Set$2 && getTag(new Set$2) != setTag) ||
      (WeakMap$1 && getTag(new WeakMap$1) != weakMapTag)) {
    getTag = function(value) {
      var result = baseGetTag(value),
          Ctor = result == objectTag$1 ? value.constructor : undefined,
          ctorString = Ctor ? toSource(Ctor) : '';

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString: return dataViewTag;
          case mapCtorString: return mapTag;
          case promiseCtorString: return promiseTag;
          case setCtorString: return setTag;
          case weakMapCtorString: return weakMapTag;
        }
      }
      return result;
    };
  }

  var getTag$1 = getTag;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG = 1;

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      objectTag = '[object Object]';

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

  /**
   * A specialized version of `baseIsEqual` for arrays and objects which performs
   * deep comparisons and tracks traversed objects enabling objects with circular
   * references to be compared.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} [stack] Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray$3(object),
        othIsArr = isArray$3(other),
        objTag = objIsArr ? arrayTag : getTag$1(object),
        othTag = othIsArr ? arrayTag : getTag$1(other);

    objTag = objTag == argsTag ? objectTag : objTag;
    othTag = othTag == argsTag ? objectTag : othTag;

    var objIsObj = objTag == objectTag,
        othIsObj = othTag == objectTag,
        isSameTag = objTag == othTag;

    if (isSameTag && isBuffer$1(object)) {
      if (!isBuffer$1(other)) {
        return false;
      }
      objIsArr = true;
      objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
      stack || (stack = new Stack);
      return (objIsArr || isTypedArray$1(object))
        ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
        : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
      var objIsWrapped = objIsObj && hasOwnProperty$1.call(object, '__wrapped__'),
          othIsWrapped = othIsObj && hasOwnProperty$1.call(other, '__wrapped__');

      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object,
            othUnwrapped = othIsWrapped ? other.value() : other;

        stack || (stack = new Stack);
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }
    if (!isSameTag) {
      return false;
    }
    stack || (stack = new Stack);
    return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
  }

  /**
   * The base implementation of `_.isEqual` which supports partial comparisons
   * and tracks traversed objects.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @param {boolean} bitmask The bitmask flags.
   *  1 - Unordered comparison
   *  2 - Partial comparison
   * @param {Function} [customizer] The function to customize comparisons.
   * @param {Object} [stack] Tracks traversed `value` and `other` objects.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   */
  function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
      return value !== value && other !== other;
    }
    return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
  }

  /**
   * Performs a deep comparison between two values to determine if they are
   * equivalent.
   *
   * **Note:** This method supports comparing arrays, array buffers, booleans,
   * date objects, error objects, maps, numbers, `Object` objects, regexes,
   * sets, strings, symbols, and typed arrays. `Object` objects are compared
   * by their own, not inherited, enumerable properties. Functions and DOM
   * nodes are compared by strict equality, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.isEqual(object, other);
   * // => true
   *
   * object === other;
   * // => false
   */
  function isEqual(value, other) {
    return baseIsEqual(value, other);
  }

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * The base implementation of `_.has` without support for deep paths.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {Array|string} key The key to check.
   * @returns {boolean} Returns `true` if `key` exists, else `false`.
   */
  function baseHas(object, key) {
    return object != null && hasOwnProperty.call(object, key);
  }

  /** `Object#toString` result references. */
  var symbolTag = '[object Symbol]';

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol(value) {
    return typeof value == 'symbol' ||
      (isObjectLike(value) && baseGetTag(value) == symbolTag);
  }

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/;

  /**
   * Checks if `value` is a property name and not a property path.
   *
   * @private
   * @param {*} value The value to check.
   * @param {Object} [object] The object to query keys on.
   * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
   */
  function isKey(value, object) {
    if (isArray$3(value)) {
      return false;
    }
    var type = typeof value;
    if (type == 'number' || type == 'symbol' || type == 'boolean' ||
        value == null || isSymbol(value)) {
      return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
      (object != null && value in Object(object));
  }

  /** Error message constants. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /**
   * Creates a function that memoizes the result of `func`. If `resolver` is
   * provided, it determines the cache key for storing the result based on the
   * arguments provided to the memoized function. By default, the first argument
   * provided to the memoized function is used as the map cache key. The `func`
   * is invoked with the `this` binding of the memoized function.
   *
   * **Note:** The cache is exposed as the `cache` property on the memoized
   * function. Its creation may be customized by replacing the `_.memoize.Cache`
   * constructor with one whose instances implement the
   * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
   * method interface of `clear`, `delete`, `get`, `has`, and `set`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] The function to resolve the cache key.
   * @returns {Function} Returns the new memoized function.
   * @example
   *
   * var object = { 'a': 1, 'b': 2 };
   * var other = { 'c': 3, 'd': 4 };
   *
   * var values = _.memoize(_.values);
   * values(object);
   * // => [1, 2]
   *
   * values(other);
   * // => [3, 4]
   *
   * object.a = 2;
   * values(object);
   * // => [1, 2]
   *
   * // Modify the result cache.
   * values.cache.set(object, ['a', 'b']);
   * values(object);
   * // => ['a', 'b']
   *
   * // Replace `_.memoize.Cache`.
   * _.memoize.Cache = WeakMap;
   */
  function memoize(func, resolver) {
    if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function() {
      var args = arguments,
          key = resolver ? resolver.apply(this, args) : args[0],
          cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };
    memoized.cache = new (memoize.Cache || MapCache);
    return memoized;
  }

  // Expose `MapCache`.
  memoize.Cache = MapCache;

  /** Used as the maximum memoize cache size. */
  var MAX_MEMOIZE_SIZE = 500;

  /**
   * A specialized version of `_.memoize` which clears the memoized function's
   * cache when it exceeds `MAX_MEMOIZE_SIZE`.
   *
   * @private
   * @param {Function} func The function to have its output memoized.
   * @returns {Function} Returns the new memoized function.
   */
  function memoizeCapped(func) {
    var result = memoize(func, function(key) {
      if (cache.size === MAX_MEMOIZE_SIZE) {
        cache.clear();
      }
      return key;
    });

    var cache = result.cache;
    return result;
  }

  /** Used to match property names within property paths. */
  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

  /** Used to match backslashes in property paths. */
  var reEscapeChar = /\\(\\)?/g;

  /**
   * Converts `string` to a property path array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the property path array.
   */
  var stringToPath = memoizeCapped(function(string) {
    var result = [];
    if (string.charCodeAt(0) === 46 /* . */) {
      result.push('');
    }
    string.replace(rePropName, function(match, number, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
    });
    return result;
  });

  var stringToPath$1 = stringToPath;

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  /** Used as references for various `Number` constants. */
  var INFINITY$1 = 1 / 0;

  /** Used to convert symbols to primitives and strings. */
  var symbolProto = Symbol$2 ? Symbol$2.prototype : undefined,
      symbolToString = symbolProto ? symbolProto.toString : undefined;

  /**
   * The base implementation of `_.toString` which doesn't convert nullish
   * values to empty strings.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
  function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value;
    }
    if (isArray$3(value)) {
      // Recursively convert values (susceptible to call stack limits).
      return arrayMap(value, baseToString) + '';
    }
    if (isSymbol(value)) {
      return symbolToString ? symbolToString.call(value) : '';
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
  }

  /**
   * Converts `value` to a string. An empty string is returned for `null`
   * and `undefined` values. The sign of `-0` is preserved.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   * @example
   *
   * _.toString(null);
   * // => ''
   *
   * _.toString(-0);
   * // => '-0'
   *
   * _.toString([1, 2, 3]);
   * // => '1,2,3'
   */
  function toString$3(value) {
    return value == null ? '' : baseToString(value);
  }

  /**
   * Casts `value` to a path array if it's not one.
   *
   * @private
   * @param {*} value The value to inspect.
   * @param {Object} [object] The object to query keys on.
   * @returns {Array} Returns the cast property path array.
   */
  function castPath(value, object) {
    if (isArray$3(value)) {
      return value;
    }
    return isKey(value, object) ? [value] : stringToPath$1(toString$3(value));
  }

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0;

  /**
   * Converts `value` to a string key if it's not a string or symbol.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {string|symbol} Returns the key.
   */
  function toKey(value) {
    if (typeof value == 'string' || isSymbol(value)) {
      return value;
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
  }

  /**
   * Checks if `path` exists on `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @param {Function} hasFunc The function to check properties.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   */
  function hasPath(object, path, hasFunc) {
    path = castPath(path, object);

    var index = -1,
        length = path.length,
        result = false;

    while (++index < length) {
      var key = toKey(path[index]);
      if (!(result = object != null && hasFunc(object, key))) {
        break;
      }
      object = object[key];
    }
    if (result || ++index != length) {
      return result;
    }
    length = object == null ? 0 : object.length;
    return !!length && isLength(length) && isIndex(key, length) &&
      (isArray$3(object) || isArguments$1(object));
  }

  /**
   * Checks if `path` is a direct property of `object`.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   * @example
   *
   * var object = { 'a': { 'b': 2 } };
   * var other = _.create({ 'a': _.create({ 'b': 2 }) });
   *
   * _.has(object, 'a');
   * // => true
   *
   * _.has(object, 'a.b');
   * // => true
   *
   * _.has(object, ['a', 'b']);
   * // => true
   *
   * _.has(other, 'a');
   * // => false
   */
  function has(object, path) {
    return object != null && hasPath(object, path, baseHas);
  }

  /**
   * The base implementation of `_.get` without support for default values.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @returns {*} Returns the resolved value.
   */
  function baseGet(object, path) {
    path = castPath(path, object);

    var index = 0,
        length = path.length;

    while (object != null && index < length) {
      object = object[toKey(path[index++])];
    }
    return (index && index == length) ? object : undefined;
  }

  /**
   * Gets the value at `path` of `object`. If the resolved value is
   * `undefined`, the `defaultValue` is returned in its place.
   *
   * @static
   * @memberOf _
   * @since 3.7.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @param {*} [defaultValue] The value returned for `undefined` resolved values.
   * @returns {*} Returns the resolved value.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * _.get(object, 'a[0].b.c');
   * // => 3
   *
   * _.get(object, ['a', '0', 'b', 'c']);
   * // => 3
   *
   * _.get(object, 'a.b.c', 'default');
   * // => 'default'
   */
  function get(object, path, defaultValue) {
    var result = object == null ? undefined : baseGet(object, path);
    return result === undefined ? defaultValue : result;
  }

  /**
   * The base implementation of `_.set`.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {Array|string} path The path of the property to set.
   * @param {*} value The value to set.
   * @param {Function} [customizer] The function to customize path creation.
   * @returns {Object} Returns `object`.
   */
  function baseSet(object, path, value, customizer) {
    if (!isObject$2(object)) {
      return object;
    }
    path = castPath(path, object);

    var index = -1,
        length = path.length,
        lastIndex = length - 1,
        nested = object;

    while (nested != null && ++index < length) {
      var key = toKey(path[index]),
          newValue = value;

      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        return object;
      }

      if (index != lastIndex) {
        var objValue = nested[key];
        newValue = customizer ? customizer(objValue, key, nested) : undefined;
        if (newValue === undefined) {
          newValue = isObject$2(objValue)
            ? objValue
            : (isIndex(path[index + 1]) ? [] : {});
        }
      }
      assignValue(nested, key, newValue);
      nested = nested[key];
    }
    return object;
  }

  /**
   * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
   * it's created. Arrays are created for missing index properties while objects
   * are created for all other missing properties. Use `_.setWith` to customize
   * `path` creation.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 3.7.0
   * @category Object
   * @param {Object} object The object to modify.
   * @param {Array|string} path The path of the property to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * _.set(object, 'a[0].b.c', 4);
   * console.log(object.a[0].b.c);
   * // => 4
   *
   * _.set(object, ['x', '0', 'y', 'z'], 5);
   * console.log(object.x[0].y.z);
   * // => 5
   */
  function set(object, path, value) {
    return object == null ? object : baseSet(object, path, value);
  }

  /** `Object#toString` result references. */
  var stringTag = '[object String]';

  /**
   * Checks if `value` is classified as a `String` primitive or object.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a string, else `false`.
   * @example
   *
   * _.isString('abc');
   * // => true
   *
   * _.isString(1);
   * // => false
   */
  function isString(value) {
    return typeof value == 'string' ||
      (!isArray$3(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
  }

  var OptionsPreProcessors = {
    range: function range(value) {
      return Math.max(+value, 1);
    },
    'date.highlight': function dateHighlight(args) {
      return castArray(args);
    },
    'subDomain.label': function subDomainLabel(value) {
      return (
        // eslint-disable-next-line
        isString(value) && value !== '' || isFunction(value) ? value : null
      );
    }
  };

  var Options = /*#__PURE__*/function () {
    function Options() {
      var processors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : OptionsPreProcessors;
      _classCallCheck(this, Options);
      this.preProcessors = processors;
      this.options = {
        // selector string of the container to append the graph to
        // Accept any string value accepted by document.querySelector or CSS3
        // or an Element object
        itemSelector: OPTIONS_DEFAULT_ITEM_SELECTOR,
        // Number of domain to display on the graph
        range: OPTIONS_DEFAULT_RANGE,
        domain: {
          type: OPTIONS_DEFAULT_DOMAIN_TYPE,
          // Space between each domain, in pixel
          gutter: 4,
          padding: [0, 0, 0, 0],
          // Whether to enable dynamic domain size
          // The width/height on a domain depends on the number of
          // subDomains items count
          dynamicDimension: true,
          // Whether to show most recent date first
          sort: 'asc',
          label: {
            // Formatting of the domain label
            // @default: undefined, will use the formatting
            // according to domain type
            // Accept any string accepted by dayjs.format()
            // or a function
            //
            // Refer to https://day.js.org/docs/en/display/format
            // for list of accepted string tokens used by dayjs.format()
            text: undefined,
            // valid: top, right, bottom, left
            position: 'bottom',
            // Valid are the direct svg values: start, middle, end
            textAlign: 'middle',
            // By default, there is no margin/padding around the label
            offset: {
              x: 0,
              y: 0
            },
            rotate: null,
            // Used only on vertical orientation
            width: 100,
            // Used only on horizontal orientation
            height: 25
          }
        },
        subDomain: {
          type: OPTIONS_DEFAULT_SUBDOMAIN_TYPE,
          // Width of each subDomain cell, in pixel
          width: OPTIONS_DEFAULT_SUBDOMAIN_WIDTH,
          // Height of each subDomain cell, in pixel
          height: OPTIONS_DEFAULT_SUBDOMAIN_HEIGHT,
          // Space between each subDomain cell, in pixel
          gutter: OPTIONS_DEFAULT_SUBDOMAIN_GUTTER,
          // Radius of each subDomain cell, in pixel
          radius: OPTIONS_DEFAULT_SUBDOMAIN_RADIUS,
          // Formatting of the text inside each subDomain cell
          // @default: null, no text
          // Accept any string accepted by dayjs.format()
          // or a function
          //
          // Refer to https://day.js.org/docs/en/display/format
          // for list of accepted string tokens used by dayjs.format()
          label: null,
          color: undefined,
          sort: 'asc'
        },
        date: {
          // Start date of the graph
          // @default now
          start: new Date(),
          min: undefined,
          max: undefined,
          // List of dates to highlight
          // Valid values:
          // - []: don't highlight anything
          // - an array of Date objects: highlight the specified dates
          highlight: [],
          locale: OPTIONS_DEFAULT_LOCALE,
          timezone: undefined
        },
        // Calendar orientation
        // false: display domains side by side
        // true : display domains one under the other
        verticalOrientation: false,
        data: {
          // Data source
          // URL, where to fetch the original datas
          source: '',
          // Data type
          // Default: json
          type: 'json',
          requestInit: {},
          // keyname of the time property
          x: '',
          // keyname of the value property
          y: '',
          // Grouping function of the values
          groupY: 'sum',
          defaultValue: null
        },
        scale: undefined,
        // Animation duration, in ms
        animationDuration: OPTIONS_DEFAULT_ANIMATION_DURATION,
        // Theme mode: dark/light
        theme: OPTIONS_DEFAULT_THEME,
        // Internally used options, do not edit not set
        x: {
          domainHorizontalLabelWidth: 0,
          domainVerticalLabelHeight: 0
        }
      };
    }
    /**
     * Set a new value for an option, only if unchanged
     * @param {string} key   Name of the option
     * @param {any} value Value of the option
     * @return {boolean} Whether the option have been changed
     */
    _createClass(Options, [{
      key: "set",
      value: function set$1(key, value) {
        if (!has(this.options, key) || isEqual(get(this.options, key), value)) {
          return false;
        }
        set(this.options, key, has(this.preProcessors, key) ? get(this.preProcessors, key)(value) : value);
        return true;
      }
    }, {
      key: "init",
      value: function init(opts) {
        var _this = this;
        this.options = Object.assign({}, mergeWith$1(this.options, opts, function (_, srcValue) {
          return Array.isArray(srcValue) ? srcValue : undefined;
        }));
        var options = this.options;
        Object.keys(this.preProcessors).forEach(function (key) {
          set(options, key, get(_this.preProcessors, key)(get(options, key)));
        });
        if (typeof options.scale === 'undefined') {
          this.initScale();
        }
        options.x.domainVerticalLabelHeight = options.domain.label.height;
        // When the label is affecting the height
        if (options.domain.label.position === 'top' || options.domain.label.position === 'bottom') {
          options.x.domainHorizontalLabelWidth = 0;
        } else {
          options.x.domainVerticalLabelHeight = 0;
          options.x.domainHorizontalLabelWidth = options.domain.label.width;
        }
        if (options.domain.label.text === null || options.domain.label.text === '') {
          options.x.domainVerticalLabelHeight = 0;
          options.x.domainHorizontalLabelWidth = 0;
        }
      }
    }, {
      key: "initScale",
      value: function initScale() {
        this.options.scale = {
          color: {
            scheme: SCALE_BASE_COLOR_SCHEME,
            type: SCALE_BASE_COLOR_TYPE,
            domain: SCALE_BASE_COLOR_DOMAIN
          }
        };
      }
    }]);
    return Options;
  }();

  var anObject$2 = anObject$f;

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags$1 = function () {
    var that = anObject$2(this);
    var result = '';
    if (that.hasIndices) result += 'd';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.unicodeSets) result += 'v';
    if (that.sticky) result += 'y';
    return result;
  };

  var fails$4 = fails$u;
  var global$3 = global$n;

  // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var $RegExp$2 = global$3.RegExp;

  var UNSUPPORTED_Y$1 = fails$4(function () {
    var re = $RegExp$2('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') != null;
  });

  // UC Browser bug
  // https://github.com/zloirock/core-js/issues/1008
  var MISSED_STICKY = UNSUPPORTED_Y$1 || fails$4(function () {
    return !$RegExp$2('a', 'y').sticky;
  });

  var BROKEN_CARET = UNSUPPORTED_Y$1 || fails$4(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = $RegExp$2('^r', 'gy');
    re.lastIndex = 2;
    return re.exec('str') != null;
  });

  var regexpStickyHelpers = {
    BROKEN_CARET: BROKEN_CARET,
    MISSED_STICKY: MISSED_STICKY,
    UNSUPPORTED_Y: UNSUPPORTED_Y$1
  };

  var fails$3 = fails$u;
  var global$2 = global$n;

  // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
  var $RegExp$1 = global$2.RegExp;

  var regexpUnsupportedDotAll = fails$3(function () {
    var re = $RegExp$1('.', 's');
    return !(re.dotAll && re.exec('\n') && re.flags === 's');
  });

  var fails$2 = fails$u;
  var global$1 = global$n;

  // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
  var $RegExp = global$1.RegExp;

  var regexpUnsupportedNcg = fails$2(function () {
    var re = $RegExp('(?<a>b)', 'g');
    return re.exec('b').groups.a !== 'b' ||
      'b'.replace(re, '$<a>c') !== 'bc';
  });

  /* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
  /* eslint-disable regexp/no-useless-quantifier -- testing */
  var call$2 = functionCall;
  var uncurryThis$5 = functionUncurryThis;
  var toString$2 = toString$a;
  var regexpFlags = regexpFlags$1;
  var stickyHelpers = regexpStickyHelpers;
  var shared = sharedExports;
  var create = objectCreate$1;
  var getInternalState = internalState.get;
  var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
  var UNSUPPORTED_NCG = regexpUnsupportedNcg;

  var nativeReplace = shared('native-string-replace', String.prototype.replace);
  var nativeExec = RegExp.prototype.exec;
  var patchedExec = nativeExec;
  var charAt$2 = uncurryThis$5(''.charAt);
  var indexOf = uncurryThis$5(''.indexOf);
  var replace$1 = uncurryThis$5(''.replace);
  var stringSlice$2 = uncurryThis$5(''.slice);

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/;
    var re2 = /b*/g;
    call$2(nativeExec, re1, 'a');
    call$2(nativeExec, re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  })();

  var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

  if (PATCH) {
    patchedExec = function exec(string) {
      var re = this;
      var state = getInternalState(re);
      var str = toString$2(string);
      var raw = state.raw;
      var result, reCopy, lastIndex, match, i, object, group;

      if (raw) {
        raw.lastIndex = re.lastIndex;
        result = call$2(patchedExec, raw, str);
        re.lastIndex = raw.lastIndex;
        return result;
      }

      var groups = state.groups;
      var sticky = UNSUPPORTED_Y && re.sticky;
      var flags = call$2(regexpFlags, re);
      var source = re.source;
      var charsAdded = 0;
      var strCopy = str;

      if (sticky) {
        flags = replace$1(flags, 'y', '');
        if (indexOf(flags, 'g') === -1) {
          flags += 'g';
        }

        strCopy = stringSlice$2(str, re.lastIndex);
        // Support anchored sticky behavior.
        if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$2(str, re.lastIndex - 1) !== '\n')) {
          source = '(?: ' + source + ')';
          strCopy = ' ' + strCopy;
          charsAdded++;
        }
        // ^(? + rx + ) is needed, in combination with some str slicing, to
        // simulate the 'y' flag.
        reCopy = new RegExp('^(?:' + source + ')', flags);
      }

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

      match = call$2(nativeExec, sticky ? reCopy : re, strCopy);

      if (sticky) {
        if (match) {
          match.input = stringSlice$2(match.input, charsAdded);
          match[0] = stringSlice$2(match[0], charsAdded);
          match.index = re.lastIndex;
          re.lastIndex += match[0].length;
        } else re.lastIndex = 0;
      } else if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
        call$2(nativeReplace, match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      if (match && groups) {
        match.groups = object = create(null);
        for (i = 0; i < groups.length; i++) {
          group = groups[i];
          object[group[0]] = match[group[1]];
        }
      }

      return match;
    };
  }

  var regexpExec$2 = patchedExec;

  var $$1 = _export;
  var exec = regexpExec$2;

  // `RegExp.prototype.exec` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.exec
  $$1({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
    exec: exec
  });

  // TODO: Remove from `core-js@4` since it's moved to entry points

  var uncurryThis$4 = functionUncurryThisClause;
  var defineBuiltIn = defineBuiltIn$9;
  var regexpExec$1 = regexpExec$2;
  var fails$1 = fails$u;
  var wellKnownSymbol$1 = wellKnownSymbol$m;
  var createNonEnumerableProperty = createNonEnumerableProperty$6;

  var SPECIES = wellKnownSymbol$1('species');
  var RegExpPrototype = RegExp.prototype;

  var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
    var SYMBOL = wellKnownSymbol$1(KEY);

    var DELEGATES_TO_SYMBOL = !fails$1(function () {
      // String methods call symbol-named RegEp methods
      var O = {};
      O[SYMBOL] = function () { return 7; };
      return ''[KEY](O) != 7;
    });

    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$1(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;

      if (KEY === 'split') {
        // We can't use real regex here since it causes deoptimization
        // and serious performance degradation in V8
        // https://github.com/zloirock/core-js/issues/306
        re = {};
        // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};
        re.constructor[SPECIES] = function () { return re; };
        re.flags = '';
        re[SYMBOL] = /./[SYMBOL];
      }

      re.exec = function () { execCalled = true; return null; };

      re[SYMBOL]('');
      return !execCalled;
    });

    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      FORCED
    ) {
      var uncurriedNativeRegExpMethod = uncurryThis$4(/./[SYMBOL]);
      var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        var uncurriedNativeMethod = uncurryThis$4(nativeMethod);
        var $exec = regexp.exec;
        if ($exec === regexpExec$1 || $exec === RegExpPrototype.exec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
          }
          return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
        }
        return { done: false };
      });

      defineBuiltIn(String.prototype, KEY, methods[0]);
      defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
    }

    if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
  };

  var charAt$1 = stringMultibyte.charAt;

  // `AdvanceStringIndex` abstract operation
  // https://tc39.es/ecma262/#sec-advancestringindex
  var advanceStringIndex$1 = function (S, index, unicode) {
    return index + (unicode ? charAt$1(S, index).length : 1);
  };

  var uncurryThis$3 = functionUncurryThis;
  var toObject = toObject$b;

  var floor = Math.floor;
  var charAt = uncurryThis$3(''.charAt);
  var replace = uncurryThis$3(''.replace);
  var stringSlice$1 = uncurryThis$3(''.slice);
  // eslint-disable-next-line redos/no-vulnerable -- safe
  var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

  // `GetSubstitution` abstract operation
  // https://tc39.es/ecma262/#sec-getsubstitution
  var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return replace(replacement, symbols, function (match, ch) {
      var capture;
      switch (charAt(ch, 0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return stringSlice$1(str, 0, position);
        case "'": return stringSlice$1(str, tailPos);
        case '<':
          capture = namedCaptures[stringSlice$1(ch, 1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  };

  var call$1 = functionCall;
  var anObject$1 = anObject$f;
  var isCallable$1 = isCallable$o;
  var classof = classofRaw$2;
  var regexpExec = regexpExec$2;

  var $TypeError = TypeError;

  // `RegExpExec` abstract operation
  // https://tc39.es/ecma262/#sec-regexpexec
  var regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (isCallable$1(exec)) {
      var result = call$1(exec, R, S);
      if (result !== null) anObject$1(result);
      return result;
    }
    if (classof(R) === 'RegExp') return call$1(regexpExec, R, S);
    throw $TypeError('RegExp#exec called on incompatible receiver');
  };

  var apply = functionApply;
  var call = functionCall;
  var uncurryThis$2 = functionUncurryThis;
  var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
  var fails = fails$u;
  var anObject = anObject$f;
  var isCallable = isCallable$o;
  var isNullOrUndefined = isNullOrUndefined$8;
  var toIntegerOrInfinity = toIntegerOrInfinity$4;
  var toLength = toLength$3;
  var toString$1 = toString$a;
  var requireObjectCoercible$1 = requireObjectCoercible$7;
  var advanceStringIndex = advanceStringIndex$1;
  var getMethod = getMethod$4;
  var getSubstitution = getSubstitution$1;
  var regExpExec$1 = regexpExecAbstract;
  var wellKnownSymbol = wellKnownSymbol$m;

  var REPLACE = wellKnownSymbol('replace');
  var max = Math.max;
  var min = Math.min;
  var concat = uncurryThis$2([].concat);
  var push = uncurryThis$2([].push);
  var stringIndexOf$1 = uncurryThis$2(''.indexOf);
  var stringSlice = uncurryThis$2(''.slice);

  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  };

  // IE <= 11 replaces $0 with the whole match, as if it was $&
  // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
  var REPLACE_KEEPS_$0 = (function () {
    // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
    return 'a'.replace(/./, '$0') === '$0';
  })();

  // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
    if (/./[REPLACE]) {
      return /./[REPLACE]('a', '$0') === '';
    }
    return false;
  })();

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: '7' };
      return result;
    };
    // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
    return ''.replace(re, '$<a>') !== '7';
  });

  // @@replace logic
  fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
    var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

    return [
      // `String.prototype.replace` method
      // https://tc39.es/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = requireObjectCoercible$1(this);
        var replacer = isNullOrUndefined(searchValue) ? undefined : getMethod(searchValue, REPLACE);
        return replacer
          ? call(replacer, searchValue, O, replaceValue)
          : call(nativeReplace, toString$1(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
      function (string, replaceValue) {
        var rx = anObject(this);
        var S = toString$1(string);

        if (
          typeof replaceValue == 'string' &&
          stringIndexOf$1(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
          stringIndexOf$1(replaceValue, '$<') === -1
        ) {
          var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
          if (res.done) return res.value;
        }

        var functionalReplace = isCallable(replaceValue);
        if (!functionalReplace) replaceValue = toString$1(replaceValue);

        var global = rx.global;
        if (global) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }
        var results = [];
        while (true) {
          var result = regExpExec$1(rx, S);
          if (result === null) break;

          push(results, result);
          if (!global) break;

          var matchStr = toString$1(result[0]);
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        }

        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];

          var matched = toString$1(result[0]);
          var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
          var captures = [];
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = concat([matched], captures, position, S);
            if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
            var replacement = toString$1(apply(replaceValue, undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }
          if (position >= nextSourcePosition) {
            accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }
        return accumulatedResult + stringSlice(S, nextSourcePosition);
      }
    ];
  }, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

  var _DataFetcher_instances, _DataFetcher_fetch;
  var DataFetcher = /*#__PURE__*/function () {
    function DataFetcher(calendar) {
      _classCallCheck(this, DataFetcher);
      _DataFetcher_instances.add(this);
      this.calendar = calendar;
    }
    /**
     * Fetch and interpret data from the datasource
     *
     * @param {string|object} source
     * @param {number} startTimestamp
     * @param {number} endTimestamp
     *
     * @return {Promize} A promise, that will return the final data when resolved
     */
    _createClass(DataFetcher, [{
      key: "getDatas",
      value: function getDatas(source, startTimestamp, endTimestamp) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var d;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                if (!(typeof source === 'string' && source.length > 0)) {
                  _context.next = 2;
                  break;
                }
                return _context.abrupt("return", __classPrivateFieldGet(this, _DataFetcher_instances, "m", _DataFetcher_fetch).call(this, source, startTimestamp, endTimestamp));
              case 2:
                d = [];
                if (Array.isArray(source)) {
                  d = source;
                }
                return _context.abrupt("return", new Promise(function (resolve) {
                  resolve(d);
                }));
              case 5:
              case "end":
                return _context.stop();
            }
          }, _callee, this);
        }));
      }
    }, {
      key: "parseURI",
      value: function parseURI(str, startTimestamp, endTimestamp) {
        var _this = this;
        var newUri = str.replace(/\{\{start=(.*)\}\}/g, function (_, format) {
          return (
            // eslint-disable-next-line implicit-arrow-linebreak
            _this.calendar.dateHelper.date(startTimestamp).format(format)
          );
        });
        newUri = newUri.replace(/\{\{end=(.*)\}\}/g, function (_, format) {
          return (
            // eslint-disable-next-line implicit-arrow-linebreak
            _this.calendar.dateHelper.date(endTimestamp).format(format)
          );
        });
        return newUri;
      }
    }]);
    return DataFetcher;
  }();
  _DataFetcher_instances = new WeakSet(), _DataFetcher_fetch = function _DataFetcher_fetch(source, startTimestamp, endTimestamp) {
    var _this$calendar$option = this.calendar.options.options.data,
      type = _this$calendar$option.type,
      requestInit = _this$calendar$option.requestInit;
    var url = this.parseURI(source, startTimestamp, endTimestamp);
    switch (type) {
      case 'json':
        return d3Fetch.json(url, requestInit);
      case 'csv':
        return d3Fetch.csv(url, requestInit);
      case 'tsv':
        return d3Fetch.dsv('\t', url, requestInit);
      case 'txt':
        return d3Fetch.text(url, requestInit);
      default:
        return new Promise(function (resolve) {
          resolve([]);
        });
    }
  };

  var DESCRIPTORS = descriptors;
  var FUNCTION_NAME_EXISTS = functionName.EXISTS;
  var uncurryThis$1 = functionUncurryThis;
  var defineBuiltInAccessor = defineBuiltInAccessor$3;

  var FunctionPrototype = Function.prototype;
  var functionToString = uncurryThis$1(FunctionPrototype.toString);
  var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
  var regExpExec = uncurryThis$1(nameRE.exec);
  var NAME = 'name';

  // Function instances `.name` property
  // https://tc39.es/ecma262/#sec-function-instances-name
  if (DESCRIPTORS && !FUNCTION_NAME_EXISTS) {
    defineBuiltInAccessor(FunctionPrototype, NAME, {
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

  var dayjs_min = {exports: {}};

  (function (module, exports) {
  	!function(t,e){module.exports=e();}(commonjsGlobal,(function(){var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return "["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return -t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return +(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return {M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p=function(t){return t instanceof _},S=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else {var a=e.name;D[a]=e,i=a;}return !r&&i&&(g=i),i||!r&&g},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=v;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t);}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init();},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},m.$utils=function(){return O},m.isValid=function(){return !(this.$d.toString()===l)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),l=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(h){case c:return r?l(1,0):l(31,11);case f:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),l=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d;}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,l=this;r=Number(r);var $=O.p(h),y=function(t){var e=w(l);return O.w(e.date(e.date()+Math.round(t*r)),l)};if($===f)return this.set(f,this.$M+r);if($===c)return this.set(c,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},$={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||$[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,v=this-M,g=O.m(this,M);return g=($={},$[c]=g/12,$[f]=g,$[h]=g/3,$[o]=(v-m)/6048e5,$[a]=(v-m)/864e5,$[u]=v/n,$[s]=v/e,$[i]=v/t,$)[y]||v,l?g:O.a(g)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),T=_.prototype;return w.prototype=T,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){T[t[1]]=function(e){return this.$g(e,t[0],t[1])};})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=D[g],w.Ls=D,w.p={},w})); 
  } (dayjs_min));

  var dayjs_minExports = dayjs_min.exports;
  var dayjs = /*@__PURE__*/getDefaultExportFromCjs(dayjs_minExports);

  var weekOfYear$1 = {exports: {}};

  (function (module, exports) {
  	!function(e,t){module.exports=t();}(commonjsGlobal,(function(){var e="week",t="year";return function(i,n,r){var f=n.prototype;f.week=function(i){if(void 0===i&&(i=null),null!==i)return this.add(7*(i-this.week()),"day");var n=this.$locale().yearStart||1;if(11===this.month()&&this.date()>25){var f=r(this).startOf(t).add(1,t).date(n),s=r(this).endOf(e);if(f.isBefore(s))return 1}var a=r(this).startOf(t).date(n).startOf(e).subtract(1,"millisecond"),o=this.diff(a,e,!0);return o<0?r(this).startOf("week").week():Math.ceil(o)},f.weeks=function(e){return void 0===e&&(e=null),this.week(e)};}})); 
  } (weekOfYear$1));

  var weekOfYearExports = weekOfYear$1.exports;
  var weekOfYear = /*@__PURE__*/getDefaultExportFromCjs(weekOfYearExports);

  var dayOfYear$1 = {exports: {}};

  (function (module, exports) {
  	!function(e,t){module.exports=t();}(commonjsGlobal,(function(){return function(e,t,n){t.prototype.dayOfYear=function(e){var t=Math.round((n(this).startOf("day")-n(this).startOf("year"))/864e5)+1;return null==e?t:this.add(e-t,"day")};}})); 
  } (dayOfYear$1));

  var dayOfYearExports = dayOfYear$1.exports;
  var dayOfYear = /*@__PURE__*/getDefaultExportFromCjs(dayOfYearExports);

  var weekday$1 = {exports: {}};

  (function (module, exports) {
  	!function(e,t){module.exports=t();}(commonjsGlobal,(function(){return function(e,t){t.prototype.weekday=function(e){var t=this.$locale().weekStart||0,i=this.$W,n=(i<t?i+7:i)-t;return this.$utils().u(e)?n:this.subtract(n,"day").add(e,"day")};}})); 
  } (weekday$1));

  var weekdayExports = weekday$1.exports;
  var weekday = /*@__PURE__*/getDefaultExportFromCjs(weekdayExports);

  var minMax$1 = {exports: {}};

  (function (module, exports) {
  	!function(e,n){module.exports=n();}(commonjsGlobal,(function(){return function(e,n,t){var i=function(e,n){if(!n||!n.length||!n[0]||1===n.length&&!n[0].length)return null;var t;1===n.length&&n[0].length>0&&(n=n[0]);t=n[0];for(var i=1;i<n.length;i+=1)n[i].isValid()&&!n[i][e](t)||(t=n[i]);return t};t.max=function(){var e=[].slice.call(arguments,0);return i("isAfter",e)},t.min=function(){var e=[].slice.call(arguments,0);return i("isBefore",e)};}})); 
  } (minMax$1));

  var minMaxExports = minMax$1.exports;
  var minMax = /*@__PURE__*/getDefaultExportFromCjs(minMaxExports);

  var isoWeeksInYear$1 = {exports: {}};

  (function (module, exports) {
  	!function(e,n){module.exports=n();}(commonjsGlobal,(function(){return function(e,n){n.prototype.isoWeeksInYear=function(){var e=this.isLeapYear(),n=this.endOf("y").day();return 4===n||e&&5===n?53:52};}})); 
  } (isoWeeksInYear$1));

  var isoWeeksInYearExports = isoWeeksInYear$1.exports;
  var isoWeeksInYear = /*@__PURE__*/getDefaultExportFromCjs(isoWeeksInYearExports);

  var isoWeek$1 = {exports: {}};

  (function (module, exports) {
  	!function(e,t){module.exports=t();}(commonjsGlobal,(function(){var e="day";return function(t,i,s){var a=function(t){return t.add(4-t.isoWeekday(),e)},d=i.prototype;d.isoWeekYear=function(){return a(this).year()},d.isoWeek=function(t){if(!this.$utils().u(t))return this.add(7*(t-this.isoWeek()),e);var i,d,n,o,r=a(this),u=(i=this.isoWeekYear(),d=this.$u,n=(d?s.utc:s)().year(i).startOf("year"),o=4-n.isoWeekday(),n.isoWeekday()>4&&(o+=7),n.add(o,e));return r.diff(u,"week")+1},d.isoWeekday=function(e){return this.$utils().u(e)?this.day()||7:this.day(this.day()%7?e:e-7)};var n=d.startOf;d.startOf=function(e,t){var i=this.$utils(),s=!!i.u(t)||t;return "isoweek"===i.p(e)?s?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):n.bind(this)(e,t)};}})); 
  } (isoWeek$1));

  var isoWeekExports = isoWeek$1.exports;
  var isoWeek = /*@__PURE__*/getDefaultExportFromCjs(isoWeekExports);

  var isLeapYear$1 = {exports: {}};

  (function (module, exports) {
  	!function(e,t){module.exports=t();}(commonjsGlobal,(function(){return function(e,t){t.prototype.isLeapYear=function(){return this.$y%4==0&&this.$y%100!=0||this.$y%400==0};}})); 
  } (isLeapYear$1));

  var isLeapYearExports = isLeapYear$1.exports;
  var isLeapYear = /*@__PURE__*/getDefaultExportFromCjs(isLeapYearExports);

  var advancedFormat$1 = {exports: {}};

  (function (module, exports) {
  	!function(e,t){module.exports=t();}(commonjsGlobal,(function(){return function(e,t){var r=t.prototype,n=r.format;r.format=function(e){var t=this,r=this.$locale();if(!this.isValid())return n.bind(this)(e);var s=this.$utils(),a=(e||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,(function(e){switch(e){case"Q":return Math.ceil((t.$M+1)/3);case"Do":return r.ordinal(t.$D);case"gggg":return t.weekYear();case"GGGG":return t.isoWeekYear();case"wo":return r.ordinal(t.week(),"W");case"w":case"ww":return s.s(t.week(),"w"===e?1:2,"0");case"W":case"WW":return s.s(t.isoWeek(),"W"===e?1:2,"0");case"k":case"kk":return s.s(String(0===t.$H?24:t.$H),"k"===e?1:2,"0");case"X":return Math.floor(t.$d.getTime()/1e3);case"x":return t.$d.getTime();case"z":return "["+t.offsetName()+"]";case"zzz":return "["+t.offsetName("long")+"]";default:return e}}));return n.bind(this)(a)};}})); 
  } (advancedFormat$1));

  var advancedFormatExports = advancedFormat$1.exports;
  var advancedFormat = /*@__PURE__*/getDefaultExportFromCjs(advancedFormatExports);

  var utc$1 = {exports: {}};

  (function (module, exports) {
  	!function(t,i){module.exports=i();}(commonjsGlobal,(function(){var t="minute",i=/[+-]\d\d(?::?\d\d)?/g,e=/([+-]|\d\d)/g;return function(s,f,n){var u=f.prototype;n.utc=function(t){var i={date:t,utc:!0,args:arguments};return new f(i)},u.utc=function(i){var e=n(this.toDate(),{locale:this.$L,utc:!0});return i?e.add(this.utcOffset(),t):e},u.local=function(){return n(this.toDate(),{locale:this.$L,utc:!1})};var o=u.parse;u.parse=function(t){t.utc&&(this.$u=!0),this.$utils().u(t.$offset)||(this.$offset=t.$offset),o.call(this,t);};var r=u.init;u.init=function(){if(this.$u){var t=this.$d;this.$y=t.getUTCFullYear(),this.$M=t.getUTCMonth(),this.$D=t.getUTCDate(),this.$W=t.getUTCDay(),this.$H=t.getUTCHours(),this.$m=t.getUTCMinutes(),this.$s=t.getUTCSeconds(),this.$ms=t.getUTCMilliseconds();}else r.call(this);};var a=u.utcOffset;u.utcOffset=function(s,f){var n=this.$utils().u;if(n(s))return this.$u?0:n(this.$offset)?a.call(this):this.$offset;if("string"==typeof s&&(s=function(t){void 0===t&&(t="");var s=t.match(i);if(!s)return null;var f=(""+s[0]).match(e)||["-",0,0],n=f[0],u=60*+f[1]+ +f[2];return 0===u?0:"+"===n?u:-u}(s),null===s))return this;var u=Math.abs(s)<=16?60*s:s,o=this;if(f)return o.$offset=u,o.$u=0===s,o;if(0!==s){var r=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(o=this.local().add(u+r,t)).$offset=u,o.$x.$localOffset=r;}else o=this.utc();return o};var h=u.format;u.format=function(t){var i=t||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return h.call(this,i)},u.valueOf=function(){var t=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*t},u.isUTC=function(){return !!this.$u},u.toISOString=function(){return this.toDate().toISOString()},u.toString=function(){return this.toDate().toUTCString()};var l=u.toDate;u.toDate=function(t){return "s"===t&&this.$offset?n(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():l.call(this)};var c=u.diff;u.diff=function(t,i,e){if(t&&this.$u===t.$u)return c.call(this,t,i,e);var s=this.local(),f=n(t).local();return c.call(s,f,i,e)};}})); 
  } (utc$1));

  var utcExports = utc$1.exports;
  var utc = /*@__PURE__*/getDefaultExportFromCjs(utcExports);

  var timezone$1 = {exports: {}};

  (function (module, exports) {
  	!function(t,e){module.exports=e();}(commonjsGlobal,(function(){var t={year:0,month:1,day:2,hour:3,minute:4,second:5},e={};return function(n,i,o){var r,a=function(t,n,i){void 0===i&&(i={});var o=new Date(t),r=function(t,n){void 0===n&&(n={});var i=n.timeZoneName||"short",o=t+"|"+i,r=e[o];return r||(r=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZoneName:i}),e[o]=r),r}(n,i);return r.formatToParts(o)},u=function(e,n){for(var i=a(e,n),r=[],u=0;u<i.length;u+=1){var f=i[u],s=f.type,m=f.value,c=t[s];c>=0&&(r[c]=parseInt(m,10));}var d=r[3],l=24===d?0:d,v=r[0]+"-"+r[1]+"-"+r[2]+" "+l+":"+r[4]+":"+r[5]+":000",h=+e;return (o.utc(v).valueOf()-(h-=h%1e3))/6e4},f=i.prototype;f.tz=function(t,e){void 0===t&&(t=r);var n=this.utcOffset(),i=this.toDate(),a=i.toLocaleString("en-US",{timeZone:t}),u=Math.round((i-new Date(a))/1e3/60),f=o(a).$set("millisecond",this.$ms).utcOffset(15*-Math.round(i.getTimezoneOffset()/15)-u,!0);if(e){var s=f.utcOffset();f=f.add(n-s,"minute");}return f.$x.$timezone=t,f},f.offsetName=function(t){var e=this.$x.$timezone||o.tz.guess(),n=a(this.valueOf(),e,{timeZoneName:t}).find((function(t){return "timezonename"===t.type.toLowerCase()}));return n&&n.value};var s=f.startOf;f.startOf=function(t,e){if(!this.$x||!this.$x.$timezone)return s.call(this,t,e);var n=o(this.format("YYYY-MM-DD HH:mm:ss:SSS"));return s.call(n,t,e).tz(this.$x.$timezone,!0)},o.tz=function(t,e,n){var i=n&&e,a=n||e||r,f=u(+o(),a);if("string"!=typeof t)return o(t).tz(a);var s=function(t,e,n){var i=t-60*e*1e3,o=u(i,n);if(e===o)return [i,e];var r=u(i-=60*(o-e)*1e3,n);return o===r?[i,o]:[t-60*Math.min(o,r)*1e3,Math.max(o,r)]}(o.utc(t,i).valueOf(),f,a),m=s[0],c=s[1],d=o(m).utcOffset(c);return d.$x.$timezone=a,d},o.tz.guess=function(){return Intl.DateTimeFormat().resolvedOptions().timeZone},o.tz.setDefault=function(t){r=t;};}})); 
  } (timezone$1));

  var timezoneExports = timezone$1.exports;
  var timezone = /*@__PURE__*/getDefaultExportFromCjs(timezoneExports);

  var localeData$1 = {exports: {}};

  (function (module, exports) {
  	!function(n,e){module.exports=e();}(commonjsGlobal,(function(){return function(n,e,t){var r=e.prototype,o=function(n){return n&&(n.indexOf?n:n.s)},u=function(n,e,t,r,u){var i=n.name?n:n.$locale(),a=o(i[e]),s=o(i[t]),f=a||s.map((function(n){return n.slice(0,r)}));if(!u)return f;var d=i.weekStart;return f.map((function(n,e){return f[(e+(d||0))%7]}))},i=function(){return t.Ls[t.locale()]},a=function(n,e){return n.formats[e]||function(n){return n.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(n,e,t){return e||t.slice(1)}))}(n.formats[e.toUpperCase()])},s=function(){var n=this;return {months:function(e){return e?e.format("MMMM"):u(n,"months")},monthsShort:function(e){return e?e.format("MMM"):u(n,"monthsShort","months",3)},firstDayOfWeek:function(){return n.$locale().weekStart||0},weekdays:function(e){return e?e.format("dddd"):u(n,"weekdays")},weekdaysMin:function(e){return e?e.format("dd"):u(n,"weekdaysMin","weekdays",2)},weekdaysShort:function(e){return e?e.format("ddd"):u(n,"weekdaysShort","weekdays",3)},longDateFormat:function(e){return a(n.$locale(),e)},meridiem:this.$locale().meridiem,ordinal:this.$locale().ordinal}};r.localeData=function(){return s.bind(this)()},t.localeData=function(){var n=i();return {firstDayOfWeek:function(){return n.weekStart||0},weekdays:function(){return t.weekdays()},weekdaysShort:function(){return t.weekdaysShort()},weekdaysMin:function(){return t.weekdaysMin()},months:function(){return t.months()},monthsShort:function(){return t.monthsShort()},longDateFormat:function(e){return a(n,e)},meridiem:n.meridiem,ordinal:n.ordinal}},t.months=function(){return u(i(),"months")},t.monthsShort=function(){return u(i(),"monthsShort","months",3)},t.weekdays=function(n){return u(i(),"weekdays",null,null,n)},t.weekdaysShort=function(n){return u(i(),"weekdaysShort","weekdays",3,n)},t.weekdaysMin=function(n){return u(i(),"weekdaysMin","weekdays",2,n)};}})); 
  } (localeData$1));

  var localeDataExports = localeData$1.exports;
  var localeData = /*@__PURE__*/getDefaultExportFromCjs(localeDataExports);

  var localizedFormat$1 = {exports: {}};

  (function (module, exports) {
  	!function(e,t){module.exports=t();}(commonjsGlobal,(function(){var e={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"};return function(t,o,n){var r=o.prototype,i=r.format;n.en.formats=e,r.format=function(t){void 0===t&&(t="YYYY-MM-DDTHH:mm:ssZ");var o=this.$locale().formats,n=function(t,o){return t.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(t,n,r){var i=r&&r.toUpperCase();return n||o[r]||e[r]||o[i].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(e,t,o){return t||o.slice(1)}))}))}(t,void 0===o?{}:o);return i.call(this,n)};}})); 
  } (localizedFormat$1));

  var localizedFormatExports = localizedFormat$1.exports;
  var localizedFormat = /*@__PURE__*/getDefaultExportFromCjs(localizedFormatExports);

  var updateLocale$1 = {exports: {}};

  (function (module, exports) {
  	!function(e,n){module.exports=n();}(commonjsGlobal,(function(){return function(e,n,t){t.updateLocale=function(e,n){var o=t.Ls[e];if(o)return (n?Object.keys(n):[]).forEach((function(e){o[e]=n[e];})),o};}})); 
  } (updateLocale$1));

  var updateLocaleExports = updateLocale$1.exports;
  var updateLocale = /*@__PURE__*/getDefaultExportFromCjs(updateLocaleExports);

  dayjs.extend(weekOfYear);
  dayjs.extend(isoWeeksInYear);
  dayjs.extend(isoWeek);
  dayjs.extend(isLeapYear);
  dayjs.extend(dayOfYear);
  dayjs.extend(weekday);
  dayjs.extend(minMax);
  dayjs.extend(advancedFormat);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(localeData);
  dayjs.extend(localizedFormat);
  dayjs.extend(updateLocale);
  var DEFAULT_LOCALE = 'en';
  var DateHelper = /*#__PURE__*/function () {
    function DateHelper() {
      _classCallCheck(this, DateHelper);
      var _a;
      this.locale = DEFAULT_LOCALE;
      this.timezone = dayjs.tz.guess();
      if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
        (_a = window).dayjs || (_a.dayjs = dayjs);
      }
    }
    _createClass(DateHelper, [{
      key: "setup",
      value: function setup(_ref) {
        var options = _ref.options;
        return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var userLocale, locale;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                this.timezone = options.date.timezone || dayjs.tz.guess();
                userLocale = options.date.locale;
                if (!(typeof userLocale === 'string' && userLocale !== DEFAULT_LOCALE)) {
                  _context.next = 17;
                  break;
                }
                if (!((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object')) {
                  _context.next = 12;
                  break;
                }
                _context.t0 = window["dayjs_locale_".concat(userLocale)];
                if (_context.t0) {
                  _context.next = 9;
                  break;
                }
                _context.next = 8;
                return this.loadBrowserLocale(userLocale);
              case 8:
                _context.t0 = _context.sent;
              case 9:
                locale = _context.t0;
                _context.next = 15;
                break;
              case 12:
                _context.next = 14;
                return this.loadNodeLocale(userLocale);
              case 14:
                locale = _context.sent;
              case 15:
                dayjs.locale(userLocale);
                this.locale = locale;
              case 17:
                if (_typeof(userLocale) === 'object') {
                  if (userLocale.hasOwnProperty('name')) {
                    dayjs.locale(userLocale.name, userLocale);
                    this.locale = userLocale;
                  } else {
                    this.locale = dayjs.updateLocale(DEFAULT_LOCALE, userLocale);
                  }
                }
              case 18:
              case "end":
                return _context.stop();
            }
          }, _callee, this);
        }));
      }
      // eslint-disable-next-line class-methods-use-this
    }, {
      key: "extend",
      value: function extend(dayjsPlugin) {
        return dayjs.extend(dayjsPlugin);
      }
      /**
       * Return the week number, relative to its month
       *
       * @param  {number|Date} d Date or timestamp in milliseconds
       * @returns {number} The week number, relative to the month [0-5]
       */
    }, {
      key: "getMonthWeekNumber",
      value: function getMonthWeekNumber(d) {
        var dayjsDate = this.date(d);
        var date = dayjsDate.startOf('day');
        var endOfWeek = dayjsDate.startOf('month').endOf('week');
        if (date <= endOfWeek) {
          return 1;
        }
        return Math.ceil(date.diff(endOfWeek, 'weeks', true)) + 1;
      }
      /**
       * Return the number of weeks in the given month
       *
       * As there is no fixed standard to specify which month a partial week should
       * belongs to, the ISO week date standard is used, where:
       * - the first week of the month should have at least 4 days
       *
       *  @see https://en.wikipedia.org/wiki/ISO_week_date
       *
       * @param  {Timestamp | dayjs.Dayjs} d Datejs object or timestamp
       * @return {number}         The number of weeks
       */
    }, {
      key: "getWeeksCountInMonth",
      value: function getWeeksCountInMonth(d) {
        var pivotDate = this.date(d);
        return this.getLastWeekOfMonth(pivotDate).diff(this.getFirstWeekOfMonth(pivotDate), 'week') + 1;
      }
      /**
       * Return the start of the first week of the month
       *
       * @see getWeeksCountInMonth() about standard warning
       * @return {dayjs.Dayjs} A dayjs object representing the start of the
       * first week
       */
    }, {
      key: "getFirstWeekOfMonth",
      value: function getFirstWeekOfMonth(d) {
        var startOfMonth = this.date(d).startOf('month');
        var startOfFirstWeek = startOfMonth.startOf('week');
        if (startOfMonth.weekday() > 4) {
          startOfFirstWeek = startOfFirstWeek.add(1, 'week');
        }
        return startOfFirstWeek;
      }
      /**
       * Return the end of the last week of the month
       *
       * @see getWeeksCountInMonth() about standard warning
       * @return {dayjs.Dayjs} A dayjs object representing the end of the last week
       */
    }, {
      key: "getLastWeekOfMonth",
      value: function getLastWeekOfMonth(d) {
        var endOfMonth = this.date(d).endOf('month');
        var endOfLastWeek = endOfMonth.endOf('week');
        if (endOfMonth.weekday() < 4) {
          endOfLastWeek = endOfLastWeek.subtract(1, 'week');
        }
        return endOfLastWeek;
      }
    }, {
      key: "date",
      value: function date() {
        var d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
        if (dayjs.isDayjs(d)) {
          return d;
        }
        return dayjs(d).tz(this.timezone).utcOffset(0).locale(this.locale);
      }
    }, {
      key: "format",
      value: function format(timestamp, formatter) {
        if (typeof formatter === 'function') {
          for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
          }
          return formatter.apply(void 0, [timestamp].concat(args));
        }
        if (typeof formatter === 'string') {
          return this.date(timestamp).format(formatter);
        }
        return null;
      }
      /**
       * Return an array of time interval
       *
       * @param  {number|Date} date A random date included in the wanted interval
       * @param  {number|Date} range Length of the wanted interval, or a stop date.
       * @param  {boolean} range Whether the end date should be excluded
       *                         from the result
       * @returns {Array<number>} Array of unix timestamp, in milliseconds
       */
    }, {
      key: "intervals",
      value: function intervals(interval, date, range) {
        var excludeEnd = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var start = this.date(date);
        var end;
        if (typeof range === 'number') {
          end = start.add(range, interval);
        } else if (dayjs.isDayjs(range)) {
          end = range;
        } else {
          end = this.date(range);
        }
        start = start.startOf(interval);
        end = end.startOf(interval);
        var pivot = dayjs.min(start, end);
        end = dayjs.max(start, end);
        var result = [];
        if (!excludeEnd) {
          end = end.add(1, 'second');
        }
        do {
          result.push(+pivot);
          pivot = pivot.add(1, interval);
        } while (pivot < end);
        return result;
      }
      // this function will work cross-browser for loading scripts asynchronously
      // eslint-disable-next-line class-methods-use-this
    }, {
      key: "loadBrowserLocale",
      value: function loadBrowserLocale(userLocale) {
        return new Promise(function (resolve, reject) {
          var s = document.createElement('script');
          s.type = 'text/javascript';
          s.async = true;
          s.src = "https://cdn.jsdelivr.net/npm/dayjs@1/locale/".concat(userLocale, ".js");
          s.onerror = function (err) {
            reject(err);
          };
          s.onload = function () {
            resolve(window["dayjs_locale_".concat(userLocale)]);
          };
          document.head.appendChild(s);
        });
      }
      // eslint-disable-next-line class-methods-use-this
    }, {
      key: "loadNodeLocale",
      value: function loadNodeLocale(userLocale) {
        return import("dayjs/locale/".concat(userLocale, ".js"));
      }
    }]);
    return DateHelper;
  }();

  var $ = _export;
  var uncurryThis = functionUncurryThis;
  var notARegExp = notARegexp;
  var requireObjectCoercible = requireObjectCoercible$7;
  var toString = toString$a;
  var correctIsRegExpLogic = correctIsRegexpLogic;

  var stringIndexOf = uncurryThis(''.indexOf);

  // `String.prototype.includes` method
  // https://tc39.es/ecma262/#sec-string.prototype.includes
  $({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
    includes: function includes(searchString /* , position = 0 */) {
      return !!~stringIndexOf(
        toString(requireObjectCoercible(this)),
        toString(notARegExp(searchString)),
        arguments.length > 1 ? arguments[1] : undefined
      );
    }
  });

  var ALLOWED_DATA_TYPES = ['json', 'csv', 'tsv', 'txt'];
  /**
   * Ensure that critical options are valid
   *
   * @throw {Error} on critical invalid options
   * @return {boolean} Returns true when there is not critical errors
   */
  function validate(templateCollection, _ref) {
    var domain = _ref.domain,
      subDomain = _ref.subDomain,
      data = _ref.data;
    var domainType = domain.type;
    var subDomainType = subDomain.type;
    if (!templateCollection.has(domainType)) {
      throw new Error("'".concat(domainType, "' is not a valid domain type'"));
    }
    if (!templateCollection.has(subDomainType)) {
      throw new Error("'".concat(subDomainType, "' is not a valid subDomain type'"));
    }
    if (data.type && !ALLOWED_DATA_TYPES.includes(data.type)) {
      throw new Error("The data type '".concat(data.type, "' is not valid data type"));
    }
    if (!(templateCollection.get(subDomainType).allowedDomainType || []).includes(domainType)) {
      throw new Error("The subDomain.type '".concat(subDomainType, "' can not be used together ") + "with the domain type ".concat(domainType));
    }
    return true;
  }

  var collection = collection$3;
  var collectionStrong = collectionStrong$2;

  // `Set` constructor
  // https://tc39.es/ecma262/#sec-set-objects
  collection('Set', function (init) {
    return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
  }, collectionStrong);

  function createPlugin(Creator, calendar) {
    return new Creator(calendar);
  }
  function extractPluginName(PluginClass, options) {
    return "".concat(new PluginClass().name).concat((options === null || options === void 0 ? void 0 : options.key) || '');
  }
  var PluginManager = /*#__PURE__*/function () {
    function PluginManager(calendar) {
      _classCallCheck(this, PluginManager);
      this.calendar = calendar;
      this.settings = new Map();
      this.plugins = new Map();
      this.pendingPaint = new Set();
    }
    _createClass(PluginManager, [{
      key: "add",
      value: function add(plugins) {
        var _this = this;
        plugins.forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            PluginClass = _ref2[0],
            pluginOptions = _ref2[1];
          var name = extractPluginName(PluginClass, pluginOptions);
          var existingPlugin = _this.plugins.get(name);
          if (existingPlugin && _this.settings.get(name) && isEqual(_this.settings.get(name).options, pluginOptions)) {
            return;
          }
          _this.settings.set(name, {
            options: pluginOptions,
            dirty: true
          });
          if (!_this.plugins.has(name)) {
            _this.plugins.set(name, createPlugin(PluginClass, _this.calendar));
          }
          _this.pendingPaint.add(_this.plugins.get(name));
        });
      }
    }, {
      key: "setupAll",
      value: function setupAll() {
        var _this2 = this;
        this.plugins.forEach(function (pluginInstance, name) {
          var settings = _this2.settings.get(name);
          if (typeof settings !== 'undefined') {
            if (settings.dirty) {
              pluginInstance.setup(settings.options);
              settings.dirty = false;
              _this2.settings.set(name, settings);
            }
          }
        });
      }
    }, {
      key: "paintAll",
      value: function paintAll() {
        return Array.from(this.pendingPaint.values()).map(function (p) {
          return p.paint();
        });
      }
    }, {
      key: "destroyAll",
      value: function destroyAll() {
        return this.allPlugins().map(function (p) {
          return p.destroy();
        });
      }
    }, {
      key: "getFromPosition",
      value: function getFromPosition(position) {
        return this.allPlugins().filter(function (plugin) {
          var _a;
          // eslint-disable-next-line implicit-arrow-linebreak
          return ((_a = plugin.options) === null || _a === void 0 ? void 0 : _a.position) === position;
        });
      }
    }, {
      key: "getHeightFromPosition",
      value: function getHeightFromPosition(position) {
        return this.getFromPosition(position).map(function (d) {
          return d.options.dimensions.height;
        }).reduce(function (a, b) {
          return a + b;
        }, 0);
      }
    }, {
      key: "getWidthFromPosition",
      value: function getWidthFromPosition(position) {
        return this.getFromPosition(position).map(function (d) {
          return d.options.dimensions.width;
        }).reduce(function (a, b) {
          return a + b;
        }, 0);
      }
    }, {
      key: "allPlugins",
      value: function allPlugins() {
        return Array.from(this.plugins.values());
      }
    }]);
    return PluginManager;
  }();

  var VERSION = '4.2.3';

  var minuteTemplate = function minuteTemplate(DateHelper) {
    var COLUMNS_COUNT = 10;
    var ROWS_COUNT = 6;
    var ALLOWED_DOMAIN_TYPE = ['day', 'hour'];
    return {
      name: 'minute',
      allowedDomainType: ALLOWED_DOMAIN_TYPE,
      rowsCount: function rowsCount() {
        return COLUMNS_COUNT;
      },
      columnsCount: function columnsCount() {
        return ROWS_COUNT;
      },
      mapping: function mapping(startTimestamp, endTimestamp) {
        return (
          // eslint-disable-next-line implicit-arrow-linebreak
          DateHelper.intervals('minute', startTimestamp, DateHelper.date(endTimestamp)).map(function (ts, index) {
            return {
              t: ts,
              x: Math.floor(index / COLUMNS_COUNT),
              y: index % COLUMNS_COUNT
            };
          })
        );
      },
      extractUnit: function extractUnit(ts) {
        return DateHelper.date(ts).startOf('minute').valueOf();
      }
    };
  };

  var hourTemplate = function hourTemplate(DateHelper, _ref) {
    var domain = _ref.domain;
    var TOTAL_ITEMS = 24;
    var ROWS_COUNT = 6;
    var ALLOWED_DOMAIN_TYPE = ['month', 'week', 'day'];
    return {
      name: 'hour',
      allowedDomainType: ALLOWED_DOMAIN_TYPE,
      rowsCount: function rowsCount() {
        return ROWS_COUNT;
      },
      columnsCount: function columnsCount(ts) {
        switch (domain.type) {
          case 'week':
            return TOTAL_ITEMS / ROWS_COUNT * 7;
          case 'month':
            return TOTAL_ITEMS / ROWS_COUNT * (domain.dynamicDimension ? DateHelper.date(ts).daysInMonth() : 31);
          case 'day':
          default:
            return TOTAL_ITEMS / ROWS_COUNT;
        }
      },
      mapping: function mapping(startTimestamp, endTimestamp) {
        return (
          // eslint-disable-next-line implicit-arrow-linebreak
          DateHelper.intervals('hour', startTimestamp, DateHelper.date(endTimestamp)).map(function (ts) {
            var date = DateHelper.date(ts);
            var hour = date.hour();
            var monthDate = date.date();
            var baseX = Math.floor(hour / ROWS_COUNT);
            var columnOffset = TOTAL_ITEMS / ROWS_COUNT;
            if (domain.type === 'month') {
              baseX += (monthDate - 1) * columnOffset;
            }
            if (domain.type === 'week') {
              baseX += +date.format('d') * columnOffset;
            }
            return {
              t: ts,
              x: baseX,
              y: Math.floor(hour % ROWS_COUNT)
            };
          })
        );
      },
      extractUnit: function extractUnit(ts) {
        return DateHelper.date(ts).startOf('hour').valueOf();
      }
    };
  };

  var dayTemplate$2 = function dayTemplate(DateHelper, _ref) {
    var domain = _ref.domain,
      verticalOrientation = _ref.verticalOrientation;
    var ROWS_COUNT = 7;
    var ALLOWED_DOMAIN_TYPE = ['year', 'month', 'week'];
    return {
      name: 'day',
      allowedDomainType: ALLOWED_DOMAIN_TYPE,
      rowsCount: function rowsCount() {
        return domain.type === 'week' ? 1 : ROWS_COUNT;
      },
      columnsCount: function columnsCount(ts) {
        switch (domain.type) {
          case 'month':
            return Math.ceil(domain.dynamicDimension && !verticalOrientation ? DateHelper.getMonthWeekNumber(DateHelper.date(ts).endOf('month')) : 6);
          case 'year':
            return Math.ceil(domain.dynamicDimension ? DateHelper.date(ts).endOf('year').dayOfYear() / ROWS_COUNT : 54);
          case 'week':
          default:
            return ROWS_COUNT;
        }
      },
      mapping: function mapping(startTimestamp, endTimestamp) {
        var weekNumber = 0;
        var x = -1;
        return DateHelper.intervals('day', startTimestamp, DateHelper.date(endTimestamp)).map(function (ts) {
          var date = DateHelper.date(ts);
          switch (domain.type) {
            case 'month':
              x = DateHelper.getMonthWeekNumber(ts) - 1;
              break;
            case 'year':
              if (weekNumber !== date.week()) {
                weekNumber = date.week();
                x += 1;
              }
              break;
            case 'week':
              x = date.weekday();
              break;
          }
          return {
            t: ts,
            x: x,
            y: domain.type === 'week' ? 0 : date.weekday()
          };
        });
      },
      extractUnit: function extractUnit(ts) {
        return DateHelper.date(ts).startOf('day').valueOf();
      }
    };
  };

  var dayTemplate$1 = function dayTemplate(DateHelper, _ref) {
    var domain = _ref.domain,
      verticalOrientation = _ref.verticalOrientation;
    var COLUMNS_COUNT = 7;
    var ALLOWED_DOMAIN_TYPE = ['year', 'month', 'week'];
    return {
      name: 'xDay',
      allowedDomainType: ALLOWED_DOMAIN_TYPE,
      rowsCount: function rowsCount(ts) {
        switch (domain.type) {
          case 'month':
            return Math.ceil(domain.dynamicDimension && !verticalOrientation ? DateHelper.getMonthWeekNumber(DateHelper.date(ts).endOf('month')) : 6);
          case 'year':
            return Math.ceil(domain.dynamicDimension ? DateHelper.date(ts).endOf('year').dayOfYear() / COLUMNS_COUNT : 54);
          case 'week':
          default:
            return COLUMNS_COUNT;
        }
      },
      columnsCount: function columnsCount() {
        if (domain.type === 'week') {
          return 1;
        }
        return COLUMNS_COUNT;
      },
      mapping: function mapping(startTimestamp, endTimestamp) {
        return (
          // eslint-disable-next-line implicit-arrow-linebreak
          DateHelper.intervals('day', startTimestamp, DateHelper.date(endTimestamp)).map(function (ts) {
            var date = DateHelper.date(ts);
            var endWeekNumber = date.endOf('year').week();
            var x = 0;
            switch (domain.type) {
              case 'month':
                x = DateHelper.getMonthWeekNumber(ts) - 1;
                break;
              case 'year':
                if (endWeekNumber === 1 && date.week() === endWeekNumber) {
                  x = date.subtract(1, 'week').week() + 1;
                }
                x = date.week() - 1;
                break;
              case 'week':
                x = date.weekday();
                break;
            }
            return {
              t: ts,
              y: x,
              x: domain.type === 'week' ? 0 : date.weekday()
            };
          })
        );
      },
      extractUnit: function extractUnit(ts) {
        return DateHelper.date(ts).startOf('day').valueOf();
      }
    };
  };

  var dayTemplate = function dayTemplate(DateHelper) {
    var ROWS_COUNT = 7;
    var ALLOWED_DOMAIN_TYPE = ['month'];
    return {
      name: 'ghDay',
      allowedDomainType: ALLOWED_DOMAIN_TYPE,
      rowsCount: function rowsCount() {
        return ROWS_COUNT;
      },
      columnsCount: function columnsCount(ts) {
        return DateHelper.getWeeksCountInMonth(ts);
      },
      mapping: function mapping(startTimestamp, endTimestamp) {
        var clampStart = DateHelper.getFirstWeekOfMonth(startTimestamp);
        var clampEnd = DateHelper.getFirstWeekOfMonth(endTimestamp);
        var x = -1;
        var pivotDay = clampStart.weekday();
        return DateHelper.intervals('day', clampStart, clampEnd).map(function (ts) {
          var weekday = DateHelper.date(ts).weekday();
          if (weekday === pivotDay) {
            x += 1;
          }
          return {
            t: ts,
            x: x,
            y: weekday
          };
        });
      },
      extractUnit: function extractUnit(ts) {
        return DateHelper.date(ts).startOf('day').valueOf();
      }
    };
  };

  var weekTemplate = function weekTemplate(DateHelper, _ref) {
    var domain = _ref.domain;
    var ALLOWED_DOMAIN_TYPE = ['year', 'month'];
    return {
      name: 'week',
      allowedDomainType: ALLOWED_DOMAIN_TYPE,
      rowsCount: function rowsCount() {
        return 1;
      },
      columnsCount: function columnsCount(ts) {
        switch (domain.type) {
          case 'year':
            return domain.dynamicDimension ? DateHelper.date(ts).endOf('year').isoWeeksInYear() : 53;
          case 'month':
            return domain.dynamicDimension ? DateHelper.getWeeksCountInMonth(ts) : 5;
          default:
            return 1;
        }
      },
      mapping: function mapping(startTimestamp, endTimestamp) {
        var clampStart = DateHelper.getFirstWeekOfMonth(startTimestamp);
        var clampEnd = DateHelper.getFirstWeekOfMonth(endTimestamp);
        return DateHelper.intervals('week', clampStart, clampEnd).map(function (ts, i) {
          return {
            t: ts,
            x: i,
            y: 0
          };
        });
      },
      extractUnit: function extractUnit(ts) {
        return DateHelper.date(ts).startOf('week').valueOf();
      }
    };
  };

  var monthTemplate = function monthTemplate(DateHelper) {
    var ALLOWED_DOMAIN_TYPE = ['year'];
    return {
      name: 'month',
      allowedDomainType: ALLOWED_DOMAIN_TYPE,
      rowsCount: function rowsCount() {
        return 1;
      },
      columnsCount: function columnsCount() {
        return 12;
      },
      mapping: function mapping(startTimestamp, endTimestamp) {
        return (
          // eslint-disable-next-line implicit-arrow-linebreak
          DateHelper.intervals('month', startTimestamp, DateHelper.date(endTimestamp)).map(function (ts) {
            return {
              t: ts,
              x: DateHelper.date(ts).month(),
              y: 0
            };
          })
        );
      },
      extractUnit: function extractUnit(ts) {
        return DateHelper.date(ts).startOf('month').valueOf();
      }
    };
  };

  var yearTemplate = function yearTemplate(DateHelper) {
    var ALLOWED_DOMAIN_TYPE = [];
    return {
      name: 'year',
      allowedDomainType: ALLOWED_DOMAIN_TYPE,
      rowsCount: function rowsCount() {
        return 1;
      },
      columnsCount: function columnsCount() {
        return 1;
      },
      mapping: function mapping(startTimestamp, endTimestamp) {
        return (
          // eslint-disable-next-line implicit-arrow-linebreak
          DateHelper.intervals('year', startTimestamp, DateHelper.date(endTimestamp)).map(function (ts, index) {
            return {
              t: ts,
              x: index,
              y: 0
            };
          })
        );
      },
      extractUnit: function extractUnit(ts) {
        return DateHelper.date(ts).startOf('year').valueOf();
      }
    };
  };

  var DefaultTemplates = [minuteTemplate, hourTemplate, dayTemplate$2, dayTemplate$1, dayTemplate, weekTemplate, monthTemplate, yearTemplate];

  var TemplateCollection = /*#__PURE__*/function () {
    function TemplateCollection(dateHelper, options) {
      _classCallCheck(this, TemplateCollection);
      this.settings = new Map();
      this.dateHelper = dateHelper;
      this.options = options;
      this.initiated = false;
    }
    _createClass(TemplateCollection, [{
      key: "get",
      value: function get(subDomainType) {
        return this.settings.get(subDomainType);
      }
    }, {
      key: "has",
      value: function has(subDomainType) {
        return this.settings.has(subDomainType);
      }
    }, {
      key: "init",
      value: function init() {
        if (!this.initiated) {
          this.initiated = true;
          this.add(DefaultTemplates);
        }
      }
    }, {
      key: "add",
      value: function add(templates) {
        var _this = this;
        this.init();
        var tplWithParent = [];
        castArray(templates).forEach(function (f) {
          var template = f(_this.dateHelper, _this.options.options);
          _this.settings.set(template.name, template);
          if (template.hasOwnProperty('parent')) {
            tplWithParent.push(template.name);
          }
        });
        tplWithParent.forEach(function (name) {
          var parentTemplate = _this.settings.get(_this.settings.get(name).parent);
          if (!parentTemplate) {
            return;
          }
          _this.settings.set(name, Object.assign(Object.assign({}, parentTemplate), _this.settings.get(name)));
        });
      }
    }]);
    return TemplateCollection;
  }();

  var CalHeatmap = /*#__PURE__*/function () {
    function CalHeatmap() {
      _classCallCheck(this, CalHeatmap);
      // Default options
      this.options = new Options();
      // Init the helpers with the default options
      this.dateHelper = new DateHelper();
      this.templateCollection = new TemplateCollection(this.dateHelper, this.options);
      this.dataFetcher = new DataFetcher(this);
      this.navigator = new Navigator(this);
      this.populator = new Populator(this);
      this.calendarPainter = new CalendarPainter(this);
      this.eventEmitter = new EventEmitter();
      this.pluginManager = new PluginManager(this);
    }
    _createClass(CalHeatmap, [{
      key: "createDomainCollection",
      value: function createDomainCollection(startDate, range) {
        var excludeEnd = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        return new DomainCollection(this.dateHelper, this.options.options.domain.type, startDate, range, excludeEnd);
      }
      // =========================================================================
      // PUBLIC API
      // =========================================================================
      /**
       * Setup and paint the calendar with the given options
       *
       * @param  {Object} options The Options object
       * @return A Promise, which will fulfill once all the underlying asynchronous
       * tasks settle, whether resolved or rejected.
       */
    }, {
      key: "paint",
      value: function paint(options, plugins) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                this.options.init(options);
                _context.next = 3;
                return this.dateHelper.setup(this.options);
              case 3:
                this.templateCollection.init();
                _context.prev = 4;
                validate(this.templateCollection, this.options.options);
                _context.next = 11;
                break;
              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](4);
                return _context.abrupt("return", Promise.reject(_context.t0));
              case 11:
                if (plugins) {
                  this.pluginManager.add(castArray(plugins));
                }
                this.calendarPainter.setup();
                // Record all the valid domains
                // Each domain value is a timestamp in milliseconds
                this.domainCollection = new DomainCollection(this.dateHelper);
                this.navigator.loadNewDomains(this.createDomainCollection(this.options.options.date.start, this.options.options.range));
                return _context.abrupt("return", Promise.allSettled([this.calendarPainter.paint(), this.fill()]));
              case 16:
              case "end":
                return _context.stop();
            }
          }, _callee, this, [[4, 8]]);
        }));
      }
      /**
       * Add a new subDomainTemplate
       *
       * @since 4.0.0
       * @param  {SubDomainTemplate[] | SubDomainTemplate} templates
       * A single, or an array of SubDomainTemplate object
       * @return void
       */
    }, {
      key: "addTemplates",
      value: function addTemplates(templates) {
        this.templateCollection.add(templates);
      }
      /**
       * Shift the calendar by n domains forward
       *
       * @param {number} n Number of domain intervals to shift forward
       * @return A Promise, which will fulfill once all the underlying asynchronous
       * tasks settle, whether resolved or rejected.
       */
    }, {
      key: "next",
      value: function next() {
        var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var loadDirection = this.navigator.loadNewDomains(this.createDomainCollection(this.domainCollection.max, n + 1).slice(n), ScrollDirection.SCROLL_FORWARD);
        return Promise.allSettled([this.calendarPainter.paint(loadDirection), this.fill()]);
      }
      /**
       * Shift the calendar by n domains backward
       *
       * @param {number} n Number of domain intervals to shift backward
       * @return A Promise, which will fulfill once all the underlying asynchronous
       * tasks settle, whether resolved or rejected.
       */
    }, {
      key: "previous",
      value: function previous() {
        var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var loadDirection = this.navigator.loadNewDomains(this.createDomainCollection(this.domainCollection.min, -n), ScrollDirection.SCROLL_BACKWARD);
        return Promise.allSettled([this.calendarPainter.paint(loadDirection), this.fill()]);
      }
      /**
       * Jump directly to a specific date
       *
       * JumpTo will scroll the calendar until the wanted domain with the specified
       * date is visible. Unless you set reset to true, the wanted domain
       * will not necessarily be the first domain of the calendar.
       *
       * @param {Date} date Jump to the domain containing that date
       * @param {boolean} reset Whether the wanted domain
       * should be the first domain of the calendar
       * @return A Promise, which will fulfill once all the underlying asynchronous
       * tasks settle, whether resolved or rejected.
       */
    }, {
      key: "jumpTo",
      value: function jumpTo(date) {
        var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        return Promise.allSettled([this.calendarPainter.paint(this.navigator.jumpTo(date, reset)), this.fill()]);
      }
      /**
       * Fill the calendar with the given data
       *
       * @param  {Object|string}    dataSource    The calendar's datasource,
       * same type as `options.data.source`
       * @return A Promise, which will fulfill once all the underlying asynchronous
       * tasks settle, whether resolved or rejected.
       */
    }, {
      key: "fill",
      value: function fill() {
        var _this = this;
        var dataSource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options.options.data.source;
        var options = this.options.options;
        var template = this.templateCollection;
        var endDate = this.dateHelper.intervals(options.domain.type, this.domainCollection.max, 2)[1];
        var dataPromise = this.dataFetcher.getDatas(dataSource, this.domainCollection.min, endDate);
        return new Promise(function (resolve, reject) {
          dataPromise.then(function (data) {
            _this.domainCollection.fill(data, options.data, template.get(options.subDomain.type).extractUnit);
            _this.populator.populate();
            resolve(null);
          }, function (error) {
            reject(error);
          });
        });
      }
      /**
       * Listener for all events
       *
       * @since 4.0.0
       * @param  {string}  eventName  Name of the event to listen to
       * @param  {function} Callback function to execute on event trigger
       * @return void
       */
    }, {
      key: "on",
      value: function on(name, fn) {
        this.eventEmitter.on(name, fn);
      }
    }, {
      key: "dimensions",
      value: function dimensions() {
        return this.calendarPainter.dimensions;
      }
      /**
       * Destroy the calendar
       *
       * @since  3.3.6
       * @return A Promise, which will fulfill once all the underlying asynchronous
       * tasks settle, whether resolved or rejected.
       */
    }, {
      key: "destroy",
      value: function destroy() {
        return this.calendarPainter.destroy();
      }
    }, {
      key: "extendDayjs",
      value: function extendDayjs(plugin) {
        return this.dateHelper.extend(plugin);
      }
    }]);
    return CalHeatmap;
  }();
  CalHeatmap.VERSION = VERSION;

  return CalHeatmap;

}));

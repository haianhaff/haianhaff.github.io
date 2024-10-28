(function(__wpcc) {
    'use strict';
    __wpcc.f = __wpcc.f || {};
    __wpcc.f.scope = {};
    __wpcc.f.createTemplateTagFirstArg = function(a) {
        return a.raw = a
    }
    ;
    __wpcc.f.createTemplateTagFirstArgWithRaw = function(a, b) {
        a.raw = b;
        return a
    }
    ;
    __wpcc.f.arrayIteratorImpl = function(a) {
        var b = 0;
        return function() {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            }
        }
    }
    ;
    __wpcc.f.arrayIterator = function(a) {
        return {
            next: __wpcc.f.arrayIteratorImpl(a)
        }
    }
    ;
    __wpcc.f.makeIterator = function(a) {
        var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        return b ? b.call(a) : __wpcc.f.arrayIterator(a)
    }
    ;
    __wpcc.f.arrayFromIterator = function(a) {
        for (var b, c = []; !(b = a.next()).done; )
            c.push(b.value);
        return c
    }
    ;
    __wpcc.f.arrayFromIterable = function(a) {
        return a instanceof Array ? a : __wpcc.f.arrayFromIterator(__wpcc.f.makeIterator(a))
    }
    ;
    __wpcc.f.ASSUME_ES5 = !1;
    __wpcc.f.ASSUME_NO_NATIVE_MAP = !1;
    __wpcc.f.ASSUME_NO_NATIVE_SET = !1;
    __wpcc.f.SIMPLE_FROUND_POLYFILL = !1;
    __wpcc.f.ISOLATE_POLYFILLS = !1;
    __wpcc.f.FORCE_POLYFILL_PROMISE = !1;
    __wpcc.f.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
    __wpcc.f.objectCreate = __wpcc.f.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function(a) {
        function b() {}
        b.prototype = a;
        return new b
    }
    ;
    __wpcc.f.defineProperty = __wpcc.f.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
        if (a == Array.prototype || a == Object.prototype)
            return a;
        a[b] = c.value;
        return a
    }
    ;
    __wpcc.f.getGlobal = function(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math)
                return c
        }
        throw Error("Cannot find global object");
    }
    ;
    __wpcc.f.global = __wpcc.f.getGlobal(this);
    __wpcc.f.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
    __wpcc.f.TRUST_ES6_POLYFILLS = !__wpcc.f.ISOLATE_POLYFILLS || __wpcc.f.IS_SYMBOL_NATIVE;
    __wpcc.f.polyfills = {};
    __wpcc.f.propertyToPolyfillSymbol = {};
    __wpcc.f.POLYFILL_PREFIX = "$jscp$";
    __wpcc.f.polyfill = function(a, b, c, d) {
        b && (__wpcc.f.ISOLATE_POLYFILLS ? __wpcc.f.polyfillIsolated(a, b, c, d) : __wpcc.f.polyfillUnisolated(a, b, c, d))
    }
    ;
    __wpcc.f.polyfillUnisolated = function(a, b) {
        var c = __wpcc.f.global;
        a = a.split(".");
        for (var d = 0; d < a.length - 1; d++) {
            var e = a[d];
            if (!(e in c))
                return;
            c = c[e]
        }
        a = a[a.length - 1];
        d = c[a];
        b = b(d);
        b != d && null != b && __wpcc.f.defineProperty(c, a, {
            configurable: !0,
            writable: !0,
            value: b
        })
    }
    ;
    __wpcc.f.polyfillIsolated = function(a, b, c) {
        var d = a.split(".");
        a = 1 === d.length;
        var e = d[0];
        e = !a && e in __wpcc.f.polyfills ? __wpcc.f.polyfills : __wpcc.f.global;
        for (var g = 0; g < d.length - 1; g++) {
            var h = d[g];
            if (!(h in e))
                return;
            e = e[h]
        }
        d = d[d.length - 1];
        c = __wpcc.f.IS_SYMBOL_NATIVE && "es6" === c ? e[d] : null;
        b = b(c);
        null != b && (a ? __wpcc.f.defineProperty(__wpcc.f.polyfills, d, {
            configurable: !0,
            writable: !0,
            value: b
        }) : b !== c && (void 0 === __wpcc.f.propertyToPolyfillSymbol[d] && (a = 1E9 * Math.random() >>> 0,
        __wpcc.f.propertyToPolyfillSymbol[d] = __wpcc.f.IS_SYMBOL_NATIVE ? __wpcc.f.global.Symbol(d) : __wpcc.f.POLYFILL_PREFIX + a + "$" + d),
        __wpcc.f.defineProperty(e, __wpcc.f.propertyToPolyfillSymbol[d], {
            configurable: !0,
            writable: !0,
            value: b
        })))
    }
    ;
    __wpcc.f.getConstructImplementation = function() {
        function a() {
            function c() {}
            new c;
            Reflect.construct(c, [], function() {});
            return new c instanceof c
        }
        if (__wpcc.f.TRUST_ES6_POLYFILLS && "undefined" != typeof Reflect && Reflect.construct) {
            if (a())
                return Reflect.construct;
            var b = Reflect.construct;
            return function(c, d, e) {
                c = b(c, d);
                e && Reflect.setPrototypeOf(c, e.prototype);
                return c
            }
        }
        return function(c, d, e) {
            void 0 === e && (e = c);
            e = __wpcc.f.objectCreate(e.prototype || Object.prototype);
            return Function.prototype.apply.call(c, e, d) || e
        }
    }
    ;
    __wpcc.f.construct = {
        valueOf: __wpcc.f.getConstructImplementation
    }.valueOf();
    __wpcc.f.underscoreProtoCanBeSet = function() {
        var a = {
            a: !0
        }
          , b = {};
        try {
            return b.__proto__ = a,
            b.a
        } catch (c) {}
        return !1
    }
    ;
    __wpcc.f.setPrototypeOf = __wpcc.f.TRUST_ES6_POLYFILLS && "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : __wpcc.f.underscoreProtoCanBeSet() ? function(a, b) {
        a.__proto__ = b;
        if (a.__proto__ !== b)
            throw new TypeError(a + " is not extensible");
        return a
    }
    : null;
    __wpcc.f.inherits = function(a, b) {
        a.prototype = __wpcc.f.objectCreate(b.prototype);
        a.prototype.constructor = a;
        if (__wpcc.f.setPrototypeOf) {
            var c = __wpcc.f.setPrototypeOf;
            c(a, b)
        } else
            for (c in b)
                if ("prototype" != c)
                    if (Object.defineProperties) {
                        var d = Object.getOwnPropertyDescriptor(b, c);
                        d && Object.defineProperty(a, c, d)
                    } else
                        a[c] = b[c];
        a.superClass_ = b.prototype
    }
    ;
    __wpcc.f.generator = {};
    __wpcc.f.generator.ensureIteratorResultIsObject_ = function(a) {
        if (!(a instanceof Object))
            throw new TypeError("Iterator result " + a + " is not an object");
    }
    ;
    __wpcc.f.generator.Context = function() {
        this.isRunning_ = !1;
        this.yieldAllIterator_ = null;
        this.yieldResult = void 0;
        this.nextAddress = 1;
        this.finallyAddress_ = this.catchAddress_ = 0;
        this.finallyContexts_ = this.abruptCompletion_ = null
    }
    ;
    __wpcc.f.generator.Context.prototype.start_ = function() {
        if (this.isRunning_)
            throw new TypeError("Generator is already running");
        this.isRunning_ = !0
    }
    ;
    __wpcc.f.generator.Context.prototype.stop_ = function() {
        this.isRunning_ = !1
    }
    ;
    __wpcc.f.generator.Context.prototype.jumpToErrorHandler_ = function() {
        this.nextAddress = this.catchAddress_ || this.finallyAddress_
    }
    ;
    __wpcc.f.generator.Context.prototype.next_ = function(a) {
        this.yieldResult = a
    }
    ;
    __wpcc.f.generator.Context.prototype.throw_ = function(a) {
        this.abruptCompletion_ = {
            exception: a,
            isException: !0
        };
        this.jumpToErrorHandler_()
    }
    ;
    __wpcc.f.generator.Context.prototype.return = function(a) {
        this.abruptCompletion_ = {
            return: a
        };
        this.nextAddress = this.finallyAddress_
    }
    ;
    __wpcc.f.generator.Context.prototype.jumpThroughFinallyBlocks = function(a) {
        this.abruptCompletion_ = {
            jumpTo: a
        };
        this.nextAddress = this.finallyAddress_
    }
    ;
    __wpcc.f.generator.Context.prototype.yield = function(a, b) {
        this.nextAddress = b;
        return {
            value: a
        }
    }
    ;
    __wpcc.f.generator.Context.prototype.yieldAll = function(a, b) {
        a = __wpcc.f.makeIterator(a);
        var c = a.next();
        __wpcc.f.generator.ensureIteratorResultIsObject_(c);
        if (c.done)
            this.yieldResult = c.value,
            this.nextAddress = b;
        else
            return this.yieldAllIterator_ = a,
            this.yield(c.value, b)
    }
    ;
    __wpcc.f.generator.Context.prototype.jumpTo = function(a) {
        this.nextAddress = a
    }
    ;
    __wpcc.f.generator.Context.prototype.jumpToEnd = function() {
        this.nextAddress = 0
    }
    ;
    __wpcc.f.generator.Context.prototype.setCatchFinallyBlocks = function(a, b) {
        this.catchAddress_ = a;
        void 0 != b && (this.finallyAddress_ = b)
    }
    ;
    __wpcc.f.generator.Context.prototype.setFinallyBlock = function(a) {
        this.catchAddress_ = 0;
        this.finallyAddress_ = a || 0
    }
    ;
    __wpcc.f.generator.Context.prototype.leaveTryBlock = function(a, b) {
        this.nextAddress = a;
        this.catchAddress_ = b || 0
    }
    ;
    __wpcc.f.generator.Context.prototype.enterCatchBlock = function(a) {
        this.catchAddress_ = a || 0;
        a = this.abruptCompletion_.exception;
        this.abruptCompletion_ = null;
        return a
    }
    ;
    __wpcc.f.generator.Context.prototype.enterFinallyBlock = function(a, b, c) {
        c ? this.finallyContexts_[c] = this.abruptCompletion_ : this.finallyContexts_ = [this.abruptCompletion_];
        this.catchAddress_ = a || 0;
        this.finallyAddress_ = b || 0
    }
    ;
    __wpcc.f.generator.Context.prototype.leaveFinallyBlock = function(a, b) {
        b = this.finallyContexts_.splice(b || 0)[0];
        if (b = this.abruptCompletion_ = this.abruptCompletion_ || b) {
            if (b.isException)
                return this.jumpToErrorHandler_();
            void 0 != b.jumpTo && this.finallyAddress_ < b.jumpTo ? (this.nextAddress = b.jumpTo,
            this.abruptCompletion_ = null) : this.nextAddress = this.finallyAddress_
        } else
            this.nextAddress = a
    }
    ;
    __wpcc.f.generator.Context.prototype.forIn = function(a) {
        return new __wpcc.f.generator.Context.PropertyIterator(a)
    }
    ;
    __wpcc.f.generator.Context.PropertyIterator = function(a) {
        this.object_ = a;
        this.properties_ = [];
        for (var b in a)
            this.properties_.push(b);
        this.properties_.reverse()
    }
    ;
    __wpcc.f.generator.Context.PropertyIterator.prototype.getNext = function() {
        for (; 0 < this.properties_.length; ) {
            var a = this.properties_.pop();
            if (a in this.object_)
                return a
        }
        return null
    }
    ;
    __wpcc.f.generator.Engine_ = function(a) {
        this.context_ = new __wpcc.f.generator.Context;
        this.program_ = a
    }
    ;
    __wpcc.f.generator.Engine_.prototype.next_ = function(a) {
        this.context_.start_();
        if (this.context_.yieldAllIterator_)
            return this.yieldAllStep_(this.context_.yieldAllIterator_.next, a, this.context_.next_);
        this.context_.next_(a);
        return this.nextStep_()
    }
    ;
    __wpcc.f.generator.Engine_.prototype.return_ = function(a) {
        this.context_.start_();
        var b = this.context_.yieldAllIterator_;
        if (b)
            return this.yieldAllStep_("return"in b ? b["return"] : function(c) {
                return {
                    value: c,
                    done: !0
                }
            }
            , a, this.context_.return);
        this.context_.return(a);
        return this.nextStep_()
    }
    ;
    __wpcc.f.generator.Engine_.prototype.throw_ = function(a) {
        this.context_.start_();
        if (this.context_.yieldAllIterator_)
            return this.yieldAllStep_(this.context_.yieldAllIterator_["throw"], a, this.context_.next_);
        this.context_.throw_(a);
        return this.nextStep_()
    }
    ;
    __wpcc.f.generator.Engine_.prototype.yieldAllStep_ = function(a, b, c) {
        try {
            var d = a.call(this.context_.yieldAllIterator_, b);
            __wpcc.f.generator.ensureIteratorResultIsObject_(d);
            if (!d.done)
                return this.context_.stop_(),
                d;
            var e = d.value
        } catch (g) {
            return this.context_.yieldAllIterator_ = null,
            this.context_.throw_(g),
            this.nextStep_()
        }
        this.context_.yieldAllIterator_ = null;
        c.call(this.context_, e);
        return this.nextStep_()
    }
    ;
    __wpcc.f.generator.Engine_.prototype.nextStep_ = function() {
        for (; this.context_.nextAddress; )
            try {
                var a = this.program_(this.context_);
                if (a)
                    return this.context_.stop_(),
                    {
                        value: a.value,
                        done: !1
                    }
            } catch (b) {
                this.context_.yieldResult = void 0,
                this.context_.throw_(b)
            }
        this.context_.stop_();
        if (this.context_.abruptCompletion_) {
            a = this.context_.abruptCompletion_;
            this.context_.abruptCompletion_ = null;
            if (a.isException)
                throw a.exception;
            return {
                value: a.return,
                done: !0
            }
        }
        return {
            value: void 0,
            done: !0
        }
    }
    ;
    __wpcc.f.generator.Generator_ = function(a) {
        this.next = function(b) {
            return a.next_(b)
        }
        ;
        this.throw = function(b) {
            return a.throw_(b)
        }
        ;
        this.return = function(b) {
            return a.return_(b)
        }
        ;
        this[Symbol.iterator] = function() {
            return this
        }
    }
    ;
    __wpcc.f.generator.createGenerator = function(a, b) {
        b = new __wpcc.f.generator.Generator_(new __wpcc.f.generator.Engine_(b));
        __wpcc.f.setPrototypeOf && a.prototype && __wpcc.f.setPrototypeOf(b, a.prototype);
        return b
    }
    ;
    __wpcc.f.asyncExecutePromiseGenerator = function(a) {
        function b(d) {
            return a.next(d)
        }
        function c(d) {
            return a.throw(d)
        }
        return new Promise(function(d, e) {
            function g(h) {
                h.done ? d(h.value) : Promise.resolve(h.value).then(b, c).then(g, e)
            }
            g(a.next())
        }
        )
    }
    ;
    __wpcc.f.asyncExecutePromiseGeneratorFunction = function(a) {
        return __wpcc.f.asyncExecutePromiseGenerator(a())
    }
    ;
    __wpcc.f.asyncExecutePromiseGeneratorProgram = function(a) {
        return __wpcc.f.asyncExecutePromiseGenerator(new __wpcc.f.generator.Generator_(new __wpcc.f.generator.Engine_(a)))
    }
    ;
    __wpcc.f.polyfill("Reflect", function(a) {
        return a ? a : {}
    }, "es6", "es3");
    __wpcc.f.polyfill("Reflect.construct", function() {
        return __wpcc.f.construct
    }, "es6", "es3");
    __wpcc.f.polyfill("Reflect.setPrototypeOf", function(a) {
        if (a)
            return a;
        if (__wpcc.f.setPrototypeOf) {
            var b = __wpcc.f.setPrototypeOf;
            return function(c, d) {
                try {
                    return b(c, d),
                    !0
                } catch (e) {
                    return !1
                }
            }
        }
        return null
    }, "es6", "es5");
    __wpcc.f.initSymbol = function() {}
    ;
    __wpcc.f.polyfill("Symbol", function(a) {
        function b(g) {
            if (this instanceof b)
                throw new TypeError("Symbol is not a constructor");
            return new c(d + (g || "") + "_" + e++,g)
        }
        function c(g, h) {
            this.$jscomp$symbol$id_ = g;
            __wpcc.f.defineProperty(this, "description", {
                configurable: !0,
                writable: !0,
                value: h
            })
        }
        if (a)
            return a;
        c.prototype.toString = function() {
            return this.$jscomp$symbol$id_
        }
        ;
        var d = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_"
          , e = 0;
        return b
    }, "es6", "es3");
    __wpcc.f.polyfill("Symbol.iterator", function(a) {
        if (a)
            return a;
        a = Symbol("Symbol.iterator");
        for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
            var d = __wpcc.f.global[b[c]];
            "function" === typeof d && "function" != typeof d.prototype[a] && __wpcc.f.defineProperty(d.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function() {
                    return __wpcc.f.iteratorPrototype(__wpcc.f.arrayIteratorImpl(this))
                }
            })
        }
        return a
    }, "es6", "es3");
    __wpcc.f.iteratorPrototype = function(a) {
        a = {
            next: a
        };
        a[Symbol.iterator] = function() {
            return this
        }
        ;
        return a
    }
    ;
    __wpcc.f.polyfill("Promise", function(a) {
        function b(h) {
            this.state_ = 0;
            this.result_ = void 0;
            this.onSettledCallbacks_ = [];
            this.isRejectionHandled_ = !1;
            var l = this.createResolveAndReject_();
            try {
                h(l.resolve, l.reject)
            } catch (m) {
                l.reject(m)
            }
        }
        function c() {
            this.batch_ = null
        }
        function d(h) {
            return h instanceof b ? h : new b(function(l) {
                l(h)
            }
            )
        }
        if (a && (!(__wpcc.f.FORCE_POLYFILL_PROMISE || __wpcc.f.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION && "undefined" === typeof __wpcc.f.global.PromiseRejectionEvent) || !__wpcc.f.global.Promise || -1 === __wpcc.f.global.Promise.toString().indexOf("[native code]")))
            return a;
        c.prototype.asyncExecute = function(h) {
            if (null == this.batch_) {
                this.batch_ = [];
                var l = this;
                this.asyncExecuteFunction(function() {
                    l.executeBatch_()
                })
            }
            this.batch_.push(h)
        }
        ;
        var e = __wpcc.f.global.setTimeout;
        c.prototype.asyncExecuteFunction = function(h) {
            e(h, 0)
        }
        ;
        c.prototype.executeBatch_ = function() {
            for (; this.batch_ && this.batch_.length; ) {
                var h = this.batch_;
                this.batch_ = [];
                for (var l = 0; l < h.length; ++l) {
                    var m = h[l];
                    h[l] = null;
                    try {
                        m()
                    } catch (p) {
                        this.asyncThrow_(p)
                    }
                }
            }
            this.batch_ = null
        }
        ;
        c.prototype.asyncThrow_ = function(h) {
            this.asyncExecuteFunction(function() {
                throw h;
            })
        }
        ;
        b.prototype.createResolveAndReject_ = function() {
            function h(p) {
                return function(q) {
                    m || (m = !0,
                    p.call(l, q))
                }
            }
            var l = this
              , m = !1;
            return {
                resolve: h(this.resolveTo_),
                reject: h(this.reject_)
            }
        }
        ;
        b.prototype.resolveTo_ = function(h) {
            if (h === this)
                this.reject_(new TypeError("A Promise cannot resolve to itself"));
            else if (h instanceof b)
                this.settleSameAsPromise_(h);
            else {
                a: switch (typeof h) {
                case "object":
                    var l = null != h;
                    break a;
                case "function":
                    l = !0;
                    break a;
                default:
                    l = !1
                }
                l ? this.resolveToNonPromiseObj_(h) : this.fulfill_(h)
            }
        }
        ;
        b.prototype.resolveToNonPromiseObj_ = function(h) {
            var l = void 0;
            try {
                l = h.then
            } catch (m) {
                this.reject_(m);
                return
            }
            "function" == typeof l ? this.settleSameAsThenable_(l, h) : this.fulfill_(h)
        }
        ;
        b.prototype.reject_ = function(h) {
            this.settle_(2, h)
        }
        ;
        b.prototype.fulfill_ = function(h) {
            this.settle_(1, h)
        }
        ;
        b.prototype.settle_ = function(h, l) {
            if (0 != this.state_)
                throw Error("Cannot settle(" + h + ", " + l + "): Promise already settled in state" + this.state_);
            this.state_ = h;
            this.result_ = l;
            2 === this.state_ && this.scheduleUnhandledRejectionCheck_();
            this.executeOnSettledCallbacks_()
        }
        ;
        b.prototype.scheduleUnhandledRejectionCheck_ = function() {
            var h = this;
            e(function() {
                if (h.notifyUnhandledRejection_()) {
                    var l = __wpcc.f.global.console;
                    "undefined" !== typeof l && l.error(h.result_)
                }
            }, 1)
        }
        ;
        b.prototype.notifyUnhandledRejection_ = function() {
            if (this.isRejectionHandled_)
                return !1;
            var h = __wpcc.f.global.CustomEvent
              , l = __wpcc.f.global.Event
              , m = __wpcc.f.global.dispatchEvent;
            if ("undefined" === typeof m)
                return !0;
            "function" === typeof h ? h = new h("unhandledrejection",{
                cancelable: !0
            }) : "function" === typeof l ? h = new l("unhandledrejection",{
                cancelable: !0
            }) : (h = __wpcc.f.global.document.createEvent("CustomEvent"),
            h.initCustomEvent("unhandledrejection", !1, !0, h));
            h.promise = this;
            h.reason = this.result_;
            return m(h)
        }
        ;
        b.prototype.executeOnSettledCallbacks_ = function() {
            if (null != this.onSettledCallbacks_) {
                for (var h = 0; h < this.onSettledCallbacks_.length; ++h)
                    g.asyncExecute(this.onSettledCallbacks_[h]);
                this.onSettledCallbacks_ = null
            }
        }
        ;
        var g = new c;
        b.prototype.settleSameAsPromise_ = function(h) {
            var l = this.createResolveAndReject_();
            h.callWhenSettled_(l.resolve, l.reject)
        }
        ;
        b.prototype.settleSameAsThenable_ = function(h, l) {
            var m = this.createResolveAndReject_();
            try {
                h.call(l, m.resolve, m.reject)
            } catch (p) {
                m.reject(p)
            }
        }
        ;
        b.prototype.then = function(h, l) {
            function m(T, Rb) {
                return "function" == typeof T ? function(Sd) {
                    try {
                        p(T(Sd))
                    } catch (Td) {
                        q(Td)
                    }
                }
                : Rb
            }
            var p, q, r = new b(function(T, Rb) {
                p = T;
                q = Rb
            }
            );
            this.callWhenSettled_(m(h, p), m(l, q));
            return r
        }
        ;
        b.prototype.catch = function(h) {
            return this.then(void 0, h)
        }
        ;
        b.prototype.callWhenSettled_ = function(h, l) {
            function m() {
                switch (p.state_) {
                case 1:
                    h(p.result_);
                    break;
                case 2:
                    l(p.result_);
                    break;
                default:
                    throw Error("Unexpected state: " + p.state_);
                }
            }
            var p = this;
            null == this.onSettledCallbacks_ ? g.asyncExecute(m) : this.onSettledCallbacks_.push(m);
            this.isRejectionHandled_ = !0
        }
        ;
        b.resolve = d;
        b.reject = function(h) {
            return new b(function(l, m) {
                m(h)
            }
            )
        }
        ;
        b.race = function(h) {
            return new b(function(l, m) {
                for (var p = __wpcc.f.makeIterator(h), q = p.next(); !q.done; q = p.next())
                    d(q.value).callWhenSettled_(l, m)
            }
            )
        }
        ;
        b.all = function(h) {
            var l = __wpcc.f.makeIterator(h)
              , m = l.next();
            return m.done ? d([]) : new b(function(p, q) {
                function r(Sd) {
                    return function(Td) {
                        T[Sd] = Td;
                        Rb--;
                        0 == Rb && p(T)
                    }
                }
                var T = []
                  , Rb = 0;
                do
                    T.push(void 0),
                    Rb++,
                    d(m.value).callWhenSettled_(r(T.length - 1), q),
                    m = l.next();
                while (!m.done)
            }
            )
        }
        ;
        return b
    }, "es6", "es3");
    __wpcc.f.checkEs6ConformanceViaProxy = function() {
        try {
            var a = {}
              , b = Object.create(new __wpcc.f.global.Proxy(a,{
                get: function(c, d, e) {
                    return c == a && "q" == d && e == b
                }
            }));
            return !0 === b.q
        } catch (c) {
            return !1
        }
    }
    ;
    __wpcc.f.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
    __wpcc.f.ES6_CONFORMANCE = __wpcc.f.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && __wpcc.f.checkEs6ConformanceViaProxy();
    __wpcc.f.owns = function(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }
    ;
    __wpcc.f.polyfill("WeakMap", function(a) {
        function b(p) {
            this.id_ = (m += Math.random() + 1).toString();
            if (p) {
                p = __wpcc.f.makeIterator(p);
                for (var q; !(q = p.next()).done; )
                    q = q.value,
                    this.set(q[0], q[1])
            }
        }
        function c() {
            if (!a || !Object.seal)
                return !1;
            try {
                var p = Object.seal({})
                  , q = Object.seal({})
                  , r = new a([[p, 2], [q, 3]]);
                if (2 != r.get(p) || 3 != r.get(q))
                    return !1;
                r.delete(p);
                r.set(q, 4);
                return !r.has(p) && 4 == r.get(q)
            } catch (T) {
                return !1
            }
        }
        function d() {}
        function e(p) {
            var q = typeof p;
            return "object" === q && null !== p || "function" === q
        }
        function g(p) {
            if (!__wpcc.f.owns(p, l)) {
                var q = new d;
                __wpcc.f.defineProperty(p, l, {
                    value: q
                })
            }
        }
        function h(p) {
            if (!__wpcc.f.ISOLATE_POLYFILLS) {
                var q = Object[p];
                q && (Object[p] = function(r) {
                    if (r instanceof d)
                        return r;
                    Object.isExtensible(r) && g(r);
                    return q(r)
                }
                )
            }
        }
        if (__wpcc.f.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
            if (a && __wpcc.f.ES6_CONFORMANCE)
                return a
        } else if (c())
            return a;
        var l = "$jscomp_hidden_" + Math.random();
        h("freeze");
        h("preventExtensions");
        h("seal");
        var m = 0;
        b.prototype.set = function(p, q) {
            if (!e(p))
                throw Error("Invalid WeakMap key");
            g(p);
            if (!__wpcc.f.owns(p, l))
                throw Error("WeakMap key fail: " + p);
            p[l][this.id_] = q;
            return this
        }
        ;
        b.prototype.get = function(p) {
            return e(p) && __wpcc.f.owns(p, l) ? p[l][this.id_] : void 0
        }
        ;
        b.prototype.has = function(p) {
            return e(p) && __wpcc.f.owns(p, l) && __wpcc.f.owns(p[l], this.id_)
        }
        ;
        b.prototype.delete = function(p) {
            return e(p) && __wpcc.f.owns(p, l) && __wpcc.f.owns(p[l], this.id_) ? delete p[l][this.id_] : !1
        }
        ;
        return b
    }, "es6", "es3");
    __wpcc.f.MapEntry = function() {}
    ;
    __wpcc.f.polyfill("Map", function(a) {
        function b() {
            var m = {};
            return m.previous = m.next = m.head = m
        }
        function c(m, p) {
            var q = m.head_;
            return __wpcc.f.iteratorPrototype(function() {
                if (q) {
                    for (; q.head != m.head_; )
                        q = q.previous;
                    for (; q.next != q.head; )
                        return q = q.next,
                        {
                            done: !1,
                            value: p(q)
                        };
                    q = null
                }
                return {
                    done: !0,
                    value: void 0
                }
            })
        }
        function d(m, p) {
            var q = p && typeof p;
            "object" == q || "function" == q ? h.has(p) ? q = h.get(p) : (q = "" + ++l,
            h.set(p, q)) : q = "p_" + p;
            var r = m.data_[q];
            if (r && __wpcc.f.owns(m.data_, q))
                for (m = 0; m < r.length; m++) {
                    var T = r[m];
                    if (p !== p && T.key !== T.key || p === T.key)
                        return {
                            id: q,
                            list: r,
                            index: m,
                            entry: T
                        }
                }
            return {
                id: q,
                list: r,
                index: -1,
                entry: void 0
            }
        }
        function e(m) {
            this.data_ = {};
            this.head_ = b();
            this.size = 0;
            if (m) {
                m = __wpcc.f.makeIterator(m);
                for (var p; !(p = m.next()).done; )
                    p = p.value,
                    this.set(p[0], p[1])
            }
        }
        function g() {
            if (__wpcc.f.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal)
                return !1;
            try {
                var m = Object.seal({
                    x: 4
                })
                  , p = new a(__wpcc.f.makeIterator([[m, "s"]]));
                if ("s" != p.get(m) || 1 != p.size || p.get({
                    x: 4
                }) || p.set({
                    x: 4
                }, "t") != p || 2 != p.size)
                    return !1;
                var q = p.entries()
                  , r = q.next();
                if (r.done || r.value[0] != m || "s" != r.value[1])
                    return !1;
                r = q.next();
                return r.done || 4 != r.value[0].x || "t" != r.value[1] || !q.next().done ? !1 : !0
            } catch (T) {
                return !1
            }
        }
        if (__wpcc.f.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
            if (a && __wpcc.f.ES6_CONFORMANCE)
                return a
        } else if (g())
            return a;
        var h = new WeakMap;
        e.prototype.set = function(m, p) {
            m = 0 === m ? 0 : m;
            var q = d(this, m);
            q.list || (q.list = this.data_[q.id] = []);
            q.entry ? q.entry.value = p : (q.entry = {
                next: this.head_,
                previous: this.head_.previous,
                head: this.head_,
                key: m,
                value: p
            },
            q.list.push(q.entry),
            this.head_.previous.next = q.entry,
            this.head_.previous = q.entry,
            this.size++);
            return this
        }
        ;
        e.prototype.delete = function(m) {
            m = d(this, m);
            return m.entry && m.list ? (m.list.splice(m.index, 1),
            m.list.length || delete this.data_[m.id],
            m.entry.previous.next = m.entry.next,
            m.entry.next.previous = m.entry.previous,
            m.entry.head = null,
            this.size--,
            !0) : !1
        }
        ;
        e.prototype.clear = function() {
            this.data_ = {};
            this.head_ = this.head_.previous = b();
            this.size = 0
        }
        ;
        e.prototype.has = function(m) {
            return !!d(this, m).entry
        }
        ;
        e.prototype.get = function(m) {
            return (m = d(this, m).entry) && m.value
        }
        ;
        e.prototype.entries = function() {
            return c(this, function(m) {
                return [m.key, m.value]
            })
        }
        ;
        e.prototype.keys = function() {
            return c(this, function(m) {
                return m.key
            })
        }
        ;
        e.prototype.values = function() {
            return c(this, function(m) {
                return m.value
            })
        }
        ;
        e.prototype.forEach = function(m, p) {
            for (var q = this.entries(), r; !(r = q.next()).done; )
                r = r.value,
                m.call(p, r[1], r[0], this)
        }
        ;
        e.prototype[Symbol.iterator] = e.prototype.entries;
        var l = 0;
        return e
    }, "es6", "es3");
    __wpcc.f.iteratorFromArray = function(a, b) {
        a instanceof String && (a += "");
        var c = 0
          , d = !1
          , e = {
            next: function() {
                if (!d && c < a.length) {
                    var g = c++;
                    return {
                        value: b(g, a[g]),
                        done: !1
                    }
                }
                d = !0;
                return {
                    done: !0,
                    value: void 0
                }
            }
        };
        e[Symbol.iterator] = function() {
            return e
        }
        ;
        return e
    }
    ;
    __wpcc.f.polyfill("Array.prototype.keys", function(a) {
        return a ? a : function() {
            return __wpcc.f.iteratorFromArray(this, function(b) {
                return b
            })
        }
    }, "es6", "es3");
    __wpcc.f.polyfill("Object.is", function(a) {
        return a ? a : function(b, c) {
            return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c
        }
    }, "es6", "es3");
    __wpcc.f.polyfill("Array.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            var d = this;
            d instanceof String && (d = String(d));
            var e = d.length;
            c = c || 0;
            for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
                var g = d[c];
                if (g === b || Object.is(g, b))
                    return !0
            }
            return !1
        }
    }, "es7", "es3");
    __wpcc.f.checkStringArgs = function(a, b, c) {
        if (null == a)
            throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
        if (b instanceof RegExp)
            throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
        return a + ""
    }
    ;
    __wpcc.f.polyfill("String.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            return -1 !== __wpcc.f.checkStringArgs(this, b, "includes").indexOf(b, c || 0)
        }
    }, "es6", "es3");
    __wpcc.f.polyfill("Array.from", function(a) {
        return a ? a : function(b, c, d) {
            c = null != c ? c : function(l) {
                return l
            }
            ;
            var e = []
              , g = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
            if ("function" == typeof g) {
                b = g.call(b);
                for (var h = 0; !(g = b.next()).done; )
                    e.push(c.call(d, g.value, h++))
            } else
                for (g = b.length,
                h = 0; h < g; h++)
                    e.push(c.call(d, b[h], h));
            return e
        }
    }, "es6", "es3");
    __wpcc.f.assign = __wpcc.f.TRUST_ES6_POLYFILLS && "function" == typeof Object.assign ? Object.assign : function(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (d)
                for (var e in d)
                    __wpcc.f.owns(d, e) && (a[e] = d[e])
        }
        return a
    }
    ;
    __wpcc.f.polyfill("Object.assign", function(a) {
        return a || __wpcc.f.assign
    }, "es6", "es3");
    __wpcc.f.polyfill("Array.prototype.entries", function(a) {
        return a ? a : function() {
            return __wpcc.f.iteratorFromArray(this, function(b, c) {
                return [b, c]
            })
        }
    }, "es6", "es3");
    __wpcc.f.polyfill("Object.entries", function(a) {
        return a ? a : function(b) {
            var c = [], d;
            for (d in b)
                __wpcc.f.owns(b, d) && c.push([d, b[d]]);
            return c
        }
    }, "es8", "es3");
    __wpcc.f.findInternal = function(a, b, c) {
        a instanceof String && (a = String(a));
        for (var d = a.length, e = 0; e < d; e++) {
            var g = a[e];
            if (b.call(c, g, e, a))
                return {
                    i: e,
                    v: g
                }
        }
        return {
            i: -1,
            v: void 0
        }
    }
    ;
    __wpcc.f.polyfill("Array.prototype.findIndex", function(a) {
        return a ? a : function(b, c) {
            return __wpcc.f.findInternal(this, b, c).i
        }
    }, "es6", "es3");
    __wpcc.f.polyfill("Array.prototype.find", function(a) {
        return a ? a : function(b, c) {
            return __wpcc.f.findInternal(this, b, c).v
        }
    }, "es6", "es3");
    __wpcc.f.polyfill("Number.isFinite", function(a) {
        return a ? a : function(b) {
            return "number" !== typeof b ? !1 : !isNaN(b) && Infinity !== b && -Infinity !== b
        }
    }, "es6", "es3");
    __wpcc.f.polyfill("Number.isInteger", function(a) {
        return a ? a : function(b) {
            return Number.isFinite(b) ? b === Math.floor(b) : !1
        }
    }, "es6", "es3");
    var aa;
    "undefined" === typeof aa && (aa = function() {}
    );
    aa.p = "";
}
).call(this || window, (window.__wpcc = window.__wpcc || {}));

(function(__wpcc) {
    'use strict';
    var k = function(a) {
        this.root = a
    }
      , da = function(a) {
        this.root = a;
        var b = this;
        this.togglePlayerState = function(c) {
            c instanceof KeyboardEvent && c.key !== n.ENTER && c.key !== n.SPACE || (b.videoContainer.paused ? b.playVideo() : b.pauseVideo())
        }
        ;
        if (a = this.root.querySelector("." + ba.VIDEO_CONTAINER))
            this.videoContainer = a;
        else
            throw Error(ca.MEDIA_ELEMENT_MISSING);
        if (a = this.root.querySelector("." + ba.BUTTON))
            this.button = a;
        else
            throw Error(ca.BUTTON_ELEMENT_MISSING);
        if (a = this.button.querySelector("." + ba.BUTTON_ICON))
            this.icon = a;
        else
            throw Error(ca.BUTTON_ICON_ELEMENT_MISSING);
        this.playVideo();
        this.initialize()
    }
      , fa = function(a) {
        var b;
        this.root = a;
        var c = this;
        this.handleClick = function() {
            c.close()
        }
        ;
        this.closeButton = this.root.querySelector("." + ea.BANNER_CLOSE_BUTTON);
        null === (b = this.closeButton) || void 0 === b ? void 0 : b.addEventListener(t.CLICK, this.handleClick)
    }
      , ia = function(a) {
        return 0 < ha.filter(function(b) {
            return a.matches(b)
        }).length
    }
      , ja = function(a) {
        var b = a.querySelectorAll("input")
          , c = a.querySelectorAll("a")
          , d = a.querySelectorAll("textarea")
          , e = a.querySelectorAll("select")
          , g = a.querySelectorAll("button")
          , h = a.querySelectorAll("iframe")
          , l = a.querySelectorAll('[role="button"]:not(input):not(a):not(textarea):not(select):not(button):not(iframe)');
        a = a.querySelectorAll('[tabindex="0"]:not([role="button"]):not(input):not(a):not(textarea):not(select):not(button):not(iframe)');
        return [].concat(__wpcc.f.arrayFromIterable(b), __wpcc.f.arrayFromIterable(c), __wpcc.f.arrayFromIterable(d), __wpcc.f.arrayFromIterable(e), __wpcc.f.arrayFromIterable(g), __wpcc.f.arrayFromIterable(h), __wpcc.f.arrayFromIterable(l), __wpcc.f.arrayFromIterable(a))
    }
      , ka = function(a) {
        this.data = a;
        this.watchers = new Map;
        this.walk(this.data)
    }
      , u = function(a) {
        var b = this;
        a = void 0 === a ? [] : a;
        this.vpUpdateHandler = function() {
            b.handleViewportUpdate()
        }
        ;
        this.mqRuleHandlerMaps = [];
        this.bpChangeHandlers = [];
        this.bpRuleHandlerMaps = [];
        this.currentBreakpoint = this.readBreakpoint();
        this.previousBreakpoint = "";
        Array.isArray(a) || (a = [a]);
        a.forEach(this.addRule.bind(this));
        window.addEventListener(t.DOM_CONTENT_READY, this.vpUpdateHandler);
        window.addEventListener(t.RESIZE, this.vpUpdateHandler);
        window.addEventListener(t.ORIENTATION_CHANGE, this.vpUpdateHandler)
    }
      , v = function(a, b) {
        this.root = a;
        var c = this;
        this.dots = [];
        this.slidesPerPage = this.totalPages = 1;
        this.animationEnabled = !0;
        this.slideWidth = this.containerWidth = 0;
        this.isRtl = document.documentElement.dir === la.RTL;
        this.isShowingNavigation = this.isTabModel = !0;
        this.pagesX = [];
        this.initialTouchPos = null;
        this.isDragging = !1;
        this.lastTouchPos = null;
        this.rafPending = !1;
        this.currentXPosition = 0;
        this.handleCurrentSlideChange = function() {
            c.emit(la.SLIDE_CHANGE, c.getCurrentSlide());
            c.render()
        }
        ;
        this.handleResize = function() {
            c.animationEnabled = !1;
            c.calculate();
            c.render()
        }
        ;
        this.handleClick = function(d) {
            var e = d.target;
            if (e instanceof HTMLElement || e instanceof window.SVGElement)
                e.closest("." + ma.BUTTON_NEXT) === c.nextBtn ? c.next() : e.closest("." + ma.BUTTON_PREV) === c.prevBtn ? c.previous() : e instanceof HTMLButtonElement && c.dots.includes(e) ? c.setCurrentPage(Number(e.dataset[la.DATA_DOT])) : c.isCards && c.isDragging && d.preventDefault()
        }
        ;
        this.handleKeydown = function(d) {
            var e = d.code === n.LEFT
              , g = d.code === n.RIGHT;
            if (e || g)
                e = c.isRtl ? e : g,
                d.target instanceof HTMLButtonElement && c.dots.includes(d.target) ? e ? c.next() : c.previous() : d.target instanceof HTMLElement && c.slides.includes(d.target) && (d = e ? 1 : -1,
                c.setCurrentSlide(c.getCurrentSlide() + d))
        }
        ;
        this.handleTransitionEnd = function(d) {
            d.target === c.slidesContainer && c.options.cyclical && (d = c.getCurrentSlide(),
            d > c.totalPages ? (c.animationEnabled = !1,
            c.setCurrentSlide(1)) : 1 > d && (c.animationEnabled = !1,
            c.setCurrentSlide(c.totalPages)))
        }
        ;
        this.handleGestureStart = function(d) {
            d.preventDefault();
            c.isTouchEvent(d) && 1 < d.touches.length || (window.PointerEvent && d instanceof PointerEvent && d.target instanceof Element ? d.target.setPointerCapture(d.pointerId) : (document.addEventListener(t.MOUSEMOVE, c.handleGestureMove, !0),
            document.addEventListener(t.MOUSEUP, c.handleGestureEnd, !0)),
            c.initialTouchPos = c.getGesturePointFromEvent(d),
            c.slidesContainer.style.transition = "initial")
        }
        ;
        this.handleGestureMove = function(d) {
            d.preventDefault();
            c.initialTouchPos && (d = c.getGesturePointFromEvent(d),
            !c.isDragging && Math.abs(c.getXDistance(c.initialTouchPos, d)) < na.DRAGSTART_THRESHOLD_PX || (c.isDragging = !0,
            c.lastTouchPos = d,
            c.rafPending || (c.rafPending = !0,
            window.requestAnimationFrame(function() {
                c.onAnimFrame()
            }))))
        }
        ;
        this.handleGestureEnd = function(d) {
            var e;
            d.preventDefault();
            c.isTouchEvent(d) && 0 < (null === (e = d.touches) || void 0 === e ? void 0 : e.length) || (c.rafPending = !1,
            window.PointerEvent && d instanceof PointerEvent && d.target instanceof Element ? d.target.releasePointerCapture(d.pointerId) : (document.removeEventListener(t.MOUSEMOVE, c.handleGestureMove, !0),
            document.removeEventListener(t.MOUSEUP, c.handleGestureEnd, !0)),
            c.updateSwipeRestPosition(),
            c.initialTouchPos = null,
            c.lastTouchPos = null,
            setTimeout(function() {
                c.isDragging = !1
            }, 0))
        }
        ;
        this.isCards = this.root.classList.contains(ma.CARDS);
        this.viewport = this.root.querySelector("." + ma.VIEWPORT);
        this.slidesContainer = this.root.querySelector("." + ma.LIST);
        this.slides = Array.from(this.slidesContainer.querySelectorAll("." + ma.ITEM));
        this.slidesRef = Array.from(this.slides);
        this.navigation = this.root.querySelector("." + ma.NAVIGATION);
        this.prevBtn = this.root.querySelector("." + ma.BUTTON_PREV);
        this.nextBtn = this.root.querySelector("." + ma.BUTTON_NEXT);
        this.options = Object.assign(Object.assign(Object.assign({}, v.defaults), b), this.getDataAttrs());
        this.observer = new ka({
            currentSlide: this.options.currentSlide
        });
        this.responsiveMonitor = this.isCards ? new u : null;
        this.setup();
        this.registerEvents()
    }
      , oa = function(a) {
        return Number(a.replace("px", ""))
    }
      , pa = function(a, b, c) {
        c = c + 1 - b;
        a = b + (a - b) % c;
        return a < b ? a + c : a
    }
      , sa = function(a) {
        var b, c;
        this.root = a;
        var d = this;
        this.successMsg = qa.SUCCESS_MESSAGE;
        this.failMsg = qa.FAIL_MESSAGE;
        this.originLabel = "";
        a = this.root.querySelector("." + ra.VALUE);
        var e = this.root.querySelector("." + ra.BUTTON);
        if (!a)
            throw Error(qa.MISSING_INPUT);
        if (!e)
            throw Error(qa.MISSING_COPY_BUTTON);
        this.copyValueEl = a;
        this.copyButtonEl = e;
        this.selection = window.getSelection();
        this.hasPopoverParent = null !== (c = null === (b = this.root.parentElement) || void 0 === b ? void 0 : b.classList.contains("" + ra.POPOVER_DIALOG)) && void 0 !== c ? c : !1;
        this.clickHandler = function(g) {
            d.copy();
            g.preventDefault()
        }
        ;
        this.keyDownHandler = function(g) {
            g.key === n.ENTER && (d.copy(),
            g.preventDefault())
        }
        ;
        this.closeHandler = function() {
            d.reset()
        }
        ;
        this.init()
    }
      , ta = function(a, b) {
        this.fn = a;
        this.delay = b
    }
      , ua = function() {
        this.listeners = {}
    }
      , va = function(a) {
        a = Object.assign({}, va.defaults, a);
        this.isAnimated = a.isAnimated;
        this.panelsCollapsed = this.panelsCount = a.panelsCount;
        this.panelsStatus = wa.COLLAPSED;
        this.eventTarget = new ua
    }
      , xa = function() {}
      , Aa = function(a) {
        var b, c, d;
        this.root = a;
        var e = this;
        this.tabIndexArr = [];
        this.isCollapsed = !0;
        this.panelHeight = 0;
        this.groupEl = this.root.closest("." + w.GROUP);
        this.panelEl = this.root.closest("." + w.PANEL);
        this.toggleButton = null !== (c = null === (b = this.panelEl) || void 0 === b ? void 0 : b.querySelector("." + w.BUTTON)) && void 0 !== c ? c : null;
        this.toggleContentHandler = function(g) {
            e.toggleContent(g)
        }
        ;
        this.expandHandler = function() {
            e.expand()
        }
        ;
        this.collapseHandler = function() {
            e.collapse()
        }
        ;
        this.transitionendHandler = function() {
            e.unsetPanelHeight()
        }
        ;
        a = null === (d = this.root.closest("." + w.GROUP)) || void 0 === d ? void 0 : d.dataset[ya.KEY];
        this.model = xa.get(a);
        if (!this.root.id)
            throw Error(za.MISSING_CONTENT_ID);
        this.init()
    }
      , Ba = function(a) {
        var b;
        this.root = a;
        var c = this;
        this.clickHandler = function(d) {
            d.preventDefault();
            c.toggle()
        }
        ;
        this.keydownHandler = function(d) {
            c.handleKeydown(d)
        }
        ;
        a = null === (b = this.root.closest("." + w.GROUP)) || void 0 === b ? void 0 : b.dataset[ya.KEY];
        this.model = xa.get(a);
        if (b = this.root.dataset[ya.TOGGLEFOR])
            this.contentId = b;
        else
            throw Error(za.TOGGLE_MISSING_CONTENT_ID);
        this.init()
    }
      , Ca = function(a) {
        var b;
        this.root = a;
        var c = this;
        this.statusChangeHandler = function() {
            c.updateToggleAllStatus()
        }
        ;
        this.clickHandler = function(d) {
            d.preventDefault();
            c.toggleAll()
        }
        ;
        this.keydownHandler = function(d) {
            c.handleKeydown(d)
        }
        ;
        this.keyupHandler = function(d) {
            c.handleKeyup(d)
        }
        ;
        this.model = xa.get(null === (b = this.root.closest("." + w.GROUP)) || void 0 === b ? void 0 : b.dataset[ya.KEY]);
        this.init()
    }
      , Da = function(a, b) {
        this.root = a;
        var c = this;
        this.toggleAllComponents = [];
        this.panelContentComponents = [];
        this.panelToggleComponents = [];
        this.options = Object.assign({}, va.defaults, b);
        this.statusChangeHandler = function() {
            c.updateStatus()
        }
        ;
        this.modelKey = this.root.dataset[ya.KEY] || wa.DEFAULT_INSTANCE_ID;
        this.model = xa.get(this.modelKey, this.options);
        this.init()
    }
      , Ea = function() {
        this.models = {};
        Ea.instance ? this.models = Ea.instance.getModels() : Ea.instance = this;
        return Ea.instance
    }
      , Ha = function(a) {
        this.root = a;
        var b = this;
        this.labels = {};
        this.stateManager = new Ea;
        this.handleSelectChangeFunc = function(c) {
            b.handleSelectChange(c)
        }
        ;
        this.handleCheckboxChangeFunc = function(c) {
            b.handleCheckboxChange(c)
        }
        ;
        this.selectEl = this.root.querySelector("select");
        this.checkboxEls = Array.from(this.root.querySelectorAll(Fa.INPUT_CHECKBOX_SELECTOR + "." + Ga.ITEM));
        this.init()
    }
      , Ia = function(a, b) {
        this.root = a;
        var c = this;
        this.data = b;
        this.labelArr = [];
        this.handleClickFun = function(d) {
            c.handleClick(d)
        }
        ;
        this.stateManager = new Ea;
        this.init()
    }
      , Ja = function(a, b, c) {
        var d = [];
        a.forEach(function(e) {
            a: {
                var g = !1;
                void 0 !== b.strategy && ["strict", "loose"].includes(b.strategy) || (b.strategy = "strict");
                for (var h = __wpcc.f.makeIterator(Object.keys(e)), l = h.next(); !l.done; l = h.next()) {
                    l = l.value;
                    g = !1;
                    b: {
                        var m = void 0;
                        var p = b[l];
                        if ("object" === typeof p)
                            for (m in p)
                                if (p[m]) {
                                    m = !0;
                                    break b
                                }
                        m = "string" === typeof p && 0 < p.length ? !0 : !1
                    }
                    if (m && void 0 !== b[l])
                        for (m = __wpcc.f.makeIterator(e[l]),
                        p = m.next(); !p.done; p = m.next()) {
                            p = p.value;
                            var q = b[l]
                              , r = !1;
                            c ? r = c.call(void 0, b, l, p) : "object" === typeof q && (r = q[p]);
                            if (!0 === r) {
                                g = !0;
                                break
                            }
                        }
                    else
                        g = !0;
                    if ("strict" === b.strategy !== g) {
                        e = g;
                        break a
                    }
                }
                e = g
            }
            d.push(e)
        });
        return d
    }
      , Ka = function(a) {
        this.resultItems = [];
        this.filteredItems = [];
        this.resultTags = [];
        this.filterIds = [];
        this.filterData = {};
        this.root = a;
        this.init()
    }
      , La = function(a) {
        this.root = a;
        this.controls = [];
        this.init()
    }
      , Ma = function(a, b) {
        this.root = a;
        var c = this;
        this.options = Object.assign({}, Ma.defaults, b);
        this.panelsOptions = {
            isAnimated: this.options.isAnimated,
            panelsCount: this.options.columnCount
        };
        if (this.panelGroupEl = this.root.querySelector("." + Na.FOOTER_PANELS_GROUP))
            this.responsiveSitelinks = new u({
                breakpoint: this.options.panelsBreakpoints,
                enter: function() {
                    c.panelGroupEl && (c.configureExpansionPanels(!0),
                    c.panelsComponent = new Da(c.panelGroupEl,c.panelsOptions))
                },
                leave: function() {
                    var d;
                    c.panelGroupEl && (null === (d = c.panelsComponent) || void 0 === d ? void 0 : d.destroy(),
                    c.configureExpansionPanels(!1))
                }
            })
    }
      , Oa = function(a, b) {
        this.x = void 0 === a ? 0 : a;
        this.y = void 0 === b ? 0 : b
    }
      , Pa = function(a, b) {
        this.root = a;
        var c = this;
        this.parentMenu = b;
        this.isMenubarItem = !1;
        this.popupMenu = null;
        this.handleKeydown = function(d) {
            var e = !1
              , g = d.key;
            switch (d.key) {
            case n.SPACE:
            case n.ENTER:
                c.popupMenu && (c.popupMenu.open(),
                c.popupMenu.setFocusToFirstItem());
                e = !1;
                break;
            case n.UP:
                c.parentMenu.setFocusToPreviousItem(c);
                e = !0;
                break;
            case n.DOWN:
                c.parentMenu.setFocusToNextItem(c);
                e = !0;
                break;
            case n.LEFT:
                if (c.controllerWithoutParentMenu(c.parentMenu.controller))
                    return;
                c.parentMenu.setFocusToController("previous");
                c.parentMenu.close(!0);
                e = !0;
                break;
            case n.RIGHT:
                if (c.controllerWithoutParentMenu(c.parentMenu.controller))
                    return;
                c.popupMenu ? (c.popupMenu.open(),
                c.popupMenu.setFocusToFirstItem()) : (c.parentMenu.setFocusToController("next"),
                c.parentMenu.close(!0));
                e = !0;
                break;
            case n.HOME:
            case n.PAGEUP:
                c.parentMenu.setFocusToFirstItem();
                e = !0;
                break;
            case n.END:
            case n.PAGEDOWN:
                c.parentMenu.setFocusToLastItem();
                e = !0;
                break;
            case n.ESC:
                c.parentMenu.setFocusToController();
                c.parentMenu.close(!0);
                e = !0;
                break;
            case n.TAB:
                c.parentMenu.setFocusToController();
                c.parentMenu.close(!0);
                break;
            default:
                1 === g.length && g.match(/\S/) && (c.parentMenu.setFocusByFirstCharacter(c, g),
                e = !0)
            }
            e && (d.stopPropagation(),
            d.preventDefault())
        }
        ;
        this.handleClick = function() {
            c.parentMenu.setFocusToController();
            c.parentMenu.close(!0)
        }
        ;
        this.handleFocus = function() {
            c.parentMenu.hasFocus = !0
        }
        ;
        this.handleBlur = function() {
            c.parentMenu.hasFocus = !1;
            setTimeout(function() {
                c.parentMenu.close(!1)
            }, 300)
        }
        ;
        this.handleMouseenter = function() {
            var d;
            c.parentMenu.hasHover = !0;
            c.parentMenu.open();
            c.popupMenu && (c.popupMenu.hasHover = !0);
            null === (d = c.popupMenu) || void 0 === d ? void 0 : d.open()
        }
        ;
        this.handleMouseleave = function() {
            var d;
            c.popupMenu && (c.popupMenu.hasHover = !1);
            null === (d = c.popupMenu) || void 0 === d ? void 0 : d.close(!0)
        }
        ;
        this.init()
    }
      , Sa = function(a, b) {
        this.root = a;
        var c = this;
        this.menuItemCollection = [];
        this.firstChars = [];
        this.lastItem = this.firstItem = null;
        this.hasHover = this.hasFocus = !1;
        this.handleMouseenter = function() {
            c.hasHover = !0
        }
        ;
        this.handleMouseleave = function(d) {
            c.hasHover = !1;
            d = new Oa(d.clientX,d.clientY);
            c.isInController(d) || setTimeout(function() {
                c.close(!1)
            }, 300)
        }
        ;
        this.setFocusByFirstCharacter = function(d, e) {
            function g(l, m) {
                return l === e && m >= h
            }
            e = e.toLowerCase();
            var h = c.menuItemCollection.indexOf(d) + 1;
            h === c.menuItemCollection.length && (h = 0);
            d = c.firstChars.findIndex(g);
            -1 === d && (h = 0,
            d = c.firstChars.findIndex(g));
            -1 < d && c.menuItemCollection[d].root.focus()
        }
        ;
        this.open = function() {
            c.root.classList.add(Qa.MENU_OPEN);
            c.controller.root.setAttribute(x.ARIA_EXPANDED, "true");
            c.controller.setExpanded(!0)
        }
        ;
        if (0 === this.root.childElementCount)
            throw Error("" + Ra.NO_CHILDREN);
        this.menuItems = Array.from(this.root.querySelectorAll("." + y.LIST_ITEM));
        this.controller = b;
        this.init()
    }
      , Ta = function(a, b) {
        this.root = a;
        var c = this;
        this.parentMenu = b;
        this.popupMenu = null;
        this.hasHover = this.hasFocus = !1;
        this.isMenubarItem = !0;
        this.handleKeydown = function(d) {
            var e, g, h = d.key, l = !1;
            switch (d.key) {
            case n.SPACE:
            case n.ENTER:
            case n.DOWN:
                c.popupMenu && (c.popupMenu.open(),
                c.popupMenu.setFocusToFirstItem(),
                l = !0);
                break;
            case n.LEFT:
                c.parentMenu.setFocusToPreviousItem(c);
                l = !0;
                break;
            case n.RIGHT:
                c.parentMenu.setFocusToNextItem(c);
                l = !0;
                break;
            case n.UP:
                c.popupMenu && (c.popupMenu.open(),
                c.popupMenu.setFocusToLastItem(),
                l = !0);
                break;
            case n.HOME:
            case n.PAGEUP:
                c.parentMenu.setFocusToFirstItem();
                l = !0;
                break;
            case n.END:
            case n.PAGEDOWN:
                c.parentMenu.setFocusToLastItem();
                l = !0;
                break;
            case n.TAB:
                null === (e = c.popupMenu) || void 0 === e ? void 0 : e.close(!0);
                break;
            case n.ESC:
                null === (g = c.popupMenu) || void 0 === g ? void 0 : g.close(!0);
                break;
            default:
                1 === h.length && h.match(/\S/) && (c.parentMenu.setFocusByFirstCharacter(c, h),
                l = !0)
            }
            l && (d.stopPropagation(),
            d.preventDefault())
        }
        ;
        this.setExpanded = function(d) {
            d ? c.root.setAttribute(x.ARIA_EXPANDED, "true") : c.root.setAttribute(x.ARIA_EXPANDED, "false")
        }
        ;
        this.handleFocus = function() {
            c.parentMenu.hasFocus = !0
        }
        ;
        this.handleBlur = function() {
            c.parentMenu.hasFocus = !1
        }
        ;
        this.handleMouseenter = function() {
            var d;
            c.hasHover = !0;
            null === (d = c.popupMenu) || void 0 === d ? void 0 : d.open()
        }
        ;
        this.handleMouseleave = function() {
            c.hasHover = !1;
            setTimeout(function() {
                var d;
                null === (d = c.popupMenu) || void 0 === d ? void 0 : d.close(!1)
            }, 300)
        }
        ;
        this.init()
    }
      , Va = function(a) {
        this.root = a;
        this.menubarItems = [];
        this.firstChars = [];
        this.lastItem = this.firstItem = null;
        this.hasHover = this.hasFocus = !1;
        if (0 === a.childElementCount)
            throw Error(Ua.ERROR_PREFIX + Ua.ERROR_MSG_NO_CHILDREN);
        this.init()
    }
      , z = function(a, b) {
        var c;
        this.root = a;
        var d = this;
        this.toggleEl = b;
        this.closed = !0;
        this.isAnimating = !1;
        this.ariaHiddenElements = [];
        this.focusableElements = [];
        this.startTime = 0;
        this.lastTouchPos = this.initialTouchPos = null;
        this.rafPending = !1;
        this.handleGestureStart = function(e) {
            d.isTouchEvent(e) && 1 < e.touches.length || (d.isPointerEvent(e) && e.target instanceof Element ? e.target.setPointerCapture(e.pointerId) : (document.addEventListener(t.MOUSEMOVE, d.handleGestureMove, !0),
            document.addEventListener(t.MOUSEUP, d.handleGestureEnd, !0)),
            d.initialTouchPos = d.getGesturePointFromEvent(e),
            d.startTime = (new Date).getTime(),
            d.root.style.transition = "initial")
        }
        ;
        this.handleGestureMove = function(e) {
            e.preventDefault();
            d.initialTouchPos && (e = d.getGesturePointFromEvent(e),
            10 > Math.abs(Oa.difference(e, d.initialTouchPos).x) || (d.lastTouchPos = e,
            d.rafPending || (d.rafPending = !0,
            window.requestAnimationFrame(function() {
                d.onAnimFrame()
            }))))
        }
        ;
        this.handleGestureEnd = function(e) {
            var g;
            e.preventDefault();
            d.isTouchEvent(e) && 0 < (null === (g = e.touches) || void 0 === g ? void 0 : g.length) || (d.rafPending = !1,
            d.isPointerEvent(e) && e.target instanceof Element ? e.target.releasePointerCapture(e.pointerId) : (document.removeEventListener(t.MOUSEMOVE, d.handleGestureMove, !0),
            document.removeEventListener(t.MOUSEUP, d.handleGestureEnd, !0)),
            d.updateDrawerPosition(),
            d.startTime = 0,
            d.initialTouchPos = null,
            d.lastTouchPos = null)
        }
        ;
        if (!this.root.classList.contains(Wa.ROOT))
            throw Error(Xa.MISSING_DRAWER_ELEMENT);
        this.setAttributes();
        a = null === (c = this.root.parentElement) || void 0 === c ? void 0 : c.querySelector("." + Wa.BACKDROP);
        if (!a)
            throw Error(Xa.MISSING_BACKDROP_ELEMENT);
        this.backdrop = a;
        this.transitionEndHandler = function() {
            return d.handleTransitionEndEvent()
        }
        ;
        this.handleKeydown = function(e) {
            e.preventDefault();
            e.code === n.ENTER && d.close()
        }
        ;
        this.handleOpen = function() {
            document.body.classList.add(Wa.NO_SCROLL);
            document.documentElement.classList.add(Wa.NO_SCROLL);
            d.backdrop.addEventListener(t.KEYDOWN, d.handleKeydown)
        }
        ;
        this.handleClose = function() {
            document.body.classList.remove(Wa.NO_SCROLL);
            document.documentElement.classList.remove(Wa.NO_SCROLL);
            d.backdrop.removeEventListener(t.KEYDOWN, d.handleKeydown)
        }
        ;
        this.root.addEventListener(t.TRANSITIONEND, this.transitionEndHandler);
        document.body.addEventListener(Xa.OPEN, this.handleOpen);
        document.body.addEventListener(Xa.CLOSE, this.handleClose)
    }
      , Za = function(a) {
        this.root = a;
        var b = this;
        this.parentMenu = null;
        this.isMenubarItem = this.hasHover = this.hasFocus = !1;
        this.handleKeydown = function(c) {
            var d = !1;
            switch (c.key) {
            case n.SPACE:
            case n.ENTER:
            case n.DOWN:
                b.popupMenu.open();
                b.popupMenu.setFocusToFirstItem();
                d = !0;
                break;
            case n.UP:
                b.popupMenu.open(),
                b.popupMenu.setFocusToLastItem(),
                d = !0
            }
            d && (c.stopPropagation(),
            c.preventDefault())
        }
        ;
        this.handleClick = function() {
            "true" === b.root.getAttribute(x.ARIA_EXPANDED) ? b.popupMenu.close(!0) : (b.popupMenu.open(),
            b.popupMenu.setFocusToFirstItem())
        }
        ;
        this.handleFocus = function() {
            b.popupMenu.hasFocus = !0
        }
        ;
        this.handleBlur = function() {
            b.popupMenu.hasFocus = !1
        }
        ;
        this.handleMouseenter = function() {
            b.hasHover = !0;
            b.popupMenu.open()
        }
        ;
        this.handleMouseLeave = function() {
            b.hasHover = !1;
            setTimeout(function() {
                b.popupMenu.close(!1)
            }, 300)
        }
        ;
        if (!this.root.getAttribute(x.ARIA_CONTROLS))
            throw Error(Ya.NO_ARIA_CONTROL);
        a = this.root.closest("." + y.BAR_DESKTOP).querySelector("#" + this.root.getAttribute(x.ARIA_CONTROLS));
        if (!a)
            throw Error(Ya.NO_MENU);
        this.popupMenu = new Sa(a,this);
        this.init()
    }
      , $a = function(a, b) {
        this.root = a;
        var c = this;
        this.observer = b;
        this.pageEls = Array.from(this.root.children);
        this.elementIds = [];
        this.selectableElements = [];
        this.handleUpdate = function() {
            c.update()
        }
        ;
        this.initialize()
    }
      , bb = function(a) {
        this.root = a;
        var b = this;
        this.activeInitPageIndex = 1;
        this.modelDefaults = {
            currentPage: 1,
            totalPages: 0
        };
        this.handleKeyPress = function(c) {
            b.keyPress(c)
        }
        ;
        this.handleClick = function(c) {
            c.target instanceof Element && b.selectPage(c.target)
        }
        ;
        this.updateHandler = function() {
            b.root.focus()
        }
        ;
        this.observer = new ka(Object.assign({}, this.modelDefaults));
        this.model = this.observer.data;
        this.initMenuPages();
        this.initControls();
        this.buildPagesFromNav();
        this.model.currentPage = this.activeInitPageIndex;
        this.root.setAttribute(x.ROLE, A.NAVIGATION);
        this.root.tabIndex = Number(B.TABBABLE);
        this.root.addEventListener(t.CLICK, this.handleClick);
        this.root.addEventListener(t.KEYDOWN, this.handleKeyPress);
        this.observer.listen(ab.CURRENT_PAGE, this.updateHandler)
    }
      , C = function(a, b) {
        this.root = a;
        this.scrolling = this.isAnimating = !1;
        this.lastPositionY = 0;
        this.atTopOfPage = !0;
        this.allowTransitionEndEvent = !1;
        this.blockFalseScroll = !0;
        if (!this.root.classList.contains(y.ROOT))
            throw Error(cb.MISSING_ROOT_ELEMENT);
        this.options = Object.assign({}, C.defaultOptions, b, this.getOptions());
        this.initialize();
        this.initializeNavigationSubcomponents()
    }
      , db = function(a) {
        return 0 === a || 1 === a ? a : .5 > a ? 8 * a * a * a * a : 1 - 8 * --a * a * a * a
    }
      , fb = function(a) {
        return 0 === a || 1 === a ? a : 1 - eb(1 - a)
    }
      , eb = function(a) {
        return 0 === a || 1 === a ? a : a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a - 1.5 / 2.75) * (a - 1.5 / 2.75) + .75 : a < 2.5 / 2.75 ? 7.5625 * (a - 2.25 / 2.75) * (a - 2.25 / 2.75) + .9375 : 7.5625 * (a - 2.625 / 2.75) * (a - 2.625 / 2.75) + .984375
    }
      , hb = function() {
        var a = this;
        this.animationFrame = this.startTime = this.elapsedTime = 0;
        this.endPosition = this.startPosition = this.distance = this.position = {
            x: 0,
            y: 0
        };
        this.config = gb;
        this.mousewheelHandlerFunc = function() {
            a.mousewheelHandler()
        }
    }
      , D = function(a, b) {
        this.root = a;
        var c = this;
        this.linkTargets = [];
        this.lastScrollPosition = 0;
        this.isScrolling = !1;
        this.handleClick = function(d) {
            c.clickHandler(d)
        }
        ;
        this.handleActiveLinkChange = function() {
            c.activeLinkChangeHandler()
        }
        ;
        this.handleScroll = function() {
            c.scrollHandler()
        }
        ;
        this.handleResize = function() {
            c.resizeHandler()
        }
        ;
        this.handleLinkFocus = function(d) {
            c.focusLinkHandler(d)
        }
        ;
        if (a = this.root.querySelector("." + ib.LIST))
            this.list = a;
        else
            throw Error("Jumplinks List element is missing.");
        if (a = this.root.querySelector("." + ib.BUTTON_LEFT))
            this.prevButton = a;
        else
            throw Error("Jumplinks left button element is missing.");
        if (a = this.root.querySelector("." + ib.BUTTON_RIGHT))
            this.nextButton = a;
        else
            throw Error("Jumplinks right button element is missing.");
        this.listItems = Array.from(this.root.querySelectorAll("." + ib.ITEMS));
        if (0 === this.listItems.length)
            throw Error("Jumplinks list item is missing.");
        this.links = Array.from(this.root.querySelectorAll("." + ib.LINK));
        if (0 === this.links.length)
            throw Error("Jumplinks link item is missing.");
        this.options = Object.assign({}, {
            offset: jb.DEFAULT_OFFSET,
            belowHeader: !1
        }, b);
        this.smoothScroll = new hb;
        this.observer = new ka({
            activeLink: ""
        });
        this.leftWatchPoint = this.root.getBoundingClientRect().x + this.prevButton.offsetWidth;
        this.rightWatchPoint = this.leftWatchPoint + this.list.offsetWidth;
        this.initialize()
    }
      , mb = function(a, b, c) {
        c = void 0 === c ? null : c;
        this.root = a;
        var d = this;
        this.lastFocus = document.activeElement;
        this.ignoreFocusChange = !1;
        this.ariaHiddenElements = [];
        this.handleTransitionEnds = function() {
            d.root.classList.remove(kb.CLOSING);
            d.focusAfterClosed.focus();
            d.root.removeEventListener(t.TRANSITIONEND, d.handleTransitionEnds)
        }
        ;
        this.closeBtn = this.root.querySelector("." + kb.CLOSE_BTN);
        this.focusAfterClosed = b;
        this.focusFirst = c;
        this.handleCloseBtnClick = function(e) {
            e.stopPropagation();
            d.close()
        }
        ;
        this.handleKeyDown = function(e) {
            e.stopPropagation();
            e.key !== n.ESC && e.keyCode !== lb.ESC || d.close()
        }
        ;
        this.handleFocus = function(e) {
            return d.trapFocus(e)
        }
        ;
        this.init()
    }
      , ob = function(a, b, c, d) {
        b = void 0 === b ? {} : b;
        this.root = a;
        var e = this;
        this.copyEls = document.querySelectorAll("." + nb.COPY);
        this.options = Object.assign({}, ob.defaults, b, this.getAttributeOptions());
        if (!["left", "bottom", "left", "right"].includes(this.options.placement))
            throw Error(pb.INCORRECT_PLACEMENT);
        this.clickOutsideDialogHandler = function(g) {
            e.handleClickOutsideDialog(g)
        }
        ;
        this.initInteractiveElements(c, d)
    }
      , qb = function(a) {
        this.currentScrollElementId = "";
        this.scrollManager = new hb;
        this.globalConfig = Object.assign({}, gb, a)
    }
      , tb = function(a, b) {
        this.root = a;
        var c = this;
        this.handleOpen = function(d) {
            d = d.target;
            d instanceof HTMLElement && c.isTooltipChild(d) && c.open()
        }
        ;
        this.handleClose = function(d) {
            d = d.target;
            d instanceof HTMLElement && c.isTooltipChild(d) && c.close()
        }
        ;
        this.handleKeyup = function(d) {
            var e = d.target;
            d.key === n.ESC && (e instanceof HTMLElement && c.content.contains(e) && c.trigger.focus(),
            c.close())
        }
        ;
        this.handleClick = function(d) {
            d = d.target;
            d instanceof HTMLElement && !c.isTooltipChild(d) && c.close()
        }
        ;
        this.handleTransitionStart = function() {
            c.content.classList.contains(rb.SHOW_TOOLTIP) && c.content.classList.add(rb.ANIMATION)
        }
        ;
        this.handleTransitionEnd = function() {
            c.content.classList.contains(rb.SHOW_TOOLTIP) || c.content.classList.remove(rb.ANIMATION)
        }
        ;
        this.handleResize = function() {
            if (!0 === c.options.autoPosition) {
                var d = __wpcc.f.makeIterator(c.getTooltipPosition())
                  , e = d.next().value;
                d = d.next().value;
                c.content.style.left = e + "px";
                c.content.style.top = d + "px"
            }
        }
        ;
        if (a = this.root.querySelector("." + rb.TRIGGER))
            this.trigger = a,
            this.trigger.tabIndex = B.TABBABLE;
        else
            throw Error(sb.MISSING_TRIGGER);
        if (a = this.root.querySelector("." + rb.CONTENT))
            this.content = a,
            this.content.setAttribute(x.ARIA_HIDDEN, "true"),
            this.trigger.setAttribute(x.ARIA_CONTROLS, this.content.id),
            this.content.getAttribute(x.ROLE) === A.DIALOG && (this.content.tabIndex = B.TABBABLE);
        else
            throw Error(sb.MISSING_CONTENT);
        this.options = this.getAttributeOptions(b);
        this.registerEvents()
    }
      , ub = function(a) {
        this.root = a;
        this.tooltipComponents = [];
        this.copyEl = this.root.querySelector("." + E.COPY_ROOT);
        this.popoverEl = this.root.querySelector("." + E.POPOVER_ROOT);
        this.panelsEl = this.root.querySelector("." + E.SOCIAL_GROUP);
        this.panelTitleEl = this.root.querySelector("." + E.SOCIAL_TITLE);
        this.socialListEl = this.root.querySelector("." + E.SOCIAL_LIST);
        this.tooltipEls = Array.from(this.root.querySelectorAll("." + E.TOOLTIP_ROOT));
        this.initialize()
    }
      , wb = function(a, b) {
        b = void 0 === b ? {
            currentTab: 1
        } : b;
        this.root = a;
        var c = this;
        this.handleClick = function(e) {
            e.target instanceof Element && (e = e.target.closest("." + vb.TAB),
            null !== e && c.setActiveTab([].concat(__wpcc.f.arrayFromIterable(c.tabs)).indexOf(e) + 1))
        }
        ;
        this.handleKeydown = function(e) {
            if (e.code === n.RIGHT || e.code === n.LEFT)
                e.code === n.RIGHT ? c.setActiveTab(c.getActiveTab() + 1) : e.code === n.LEFT && c.setActiveTab(c.getActiveTab() - 1),
                0 === c.getActiveTab() ? c.setActiveTab(c.totalTabs) : c.getActiveTab() === c.totalTabs + 1 && c.setActiveTab(1);
            e.code === n.HOME && c.setActiveTab(1);
            e.code === n.END && c.setActiveTab(c.totalTabs);
            e.code !== n.RIGHT && e.code !== n.LEFT && e.code !== n.HOME && e.code !== n.END || c.tabs[c.getActiveTab() - 1].focus()
        }
        ;
        this.tablist = this.root.querySelector("." + vb.TABLIST);
        this.tabs = Array.from(this.tablist.querySelectorAll("." + vb.TAB));
        this.tabPanels = Array.from(this.root.querySelectorAll("." + vb.PANEL));
        this.totalTabs = this.tabs.length;
        this.currentTabChangeHandler = function() {
            c.render()
        }
        ;
        this.validateElements();
        this.setAriaRoles();
        a = this.getDataAttribute();
        var d = 1;
        this.isValidTab(a) ? d = a : this.isValidTab(b.currentTab) && (d = b.currentTab);
        this.observer = new ka({
            currentTab: d
        });
        this.observer.listen("currentTab", this.currentTabChangeHandler);
        this.tablist.addEventListener(t.CLICK, this.handleClick);
        this.tablist.addEventListener(t.KEYDOWN, this.handleKeydown);
        this.render()
    }
      , xb = function(a, b) {
        this.root = a;
        this.options = Object.assign({}, xb.defaults, b);
        this.panelsoptions = {
            isAnimated: this.options.isPanelsAnimated,
            panelsCount: this.options.panelsCount
        };
        this.tablistEl = this.root.querySelector("." + F.TABPANEL_PAGE_LIST);
        this.panelsEl = this.root.querySelector("." + F.TABPANEL_PANEL_LIST);
        this.initialize()
    }
      , yb = function() {
        this.videoObjects = new Map
    }
      , Bb = function(a, b) {
        var c, d;
        this.root = a;
        var e = this;
        this.id = "";
        this.hidePosterAndPlay = function(g) {
            var h, l;
            g instanceof KeyboardEvent && g.key !== n.ENTER && g.key !== n.SPACE || null === (h = e.trigger) || void 0 === h || !h.classList.contains(zb.INLINE_VIDEO) || (null === (l = e.trigger) || void 0 === l ? void 0 : l.classList.add(zb.HIDE_ELEMENT),
            e.video.classList.remove(zb.HIDE_ELEMENT),
            g = e.getPlayer(),
            null === g || void 0 === g ? void 0 : g.playVideo())
        }
        ;
        if (this.trigger = this.root.querySelector("." + zb.ASSET))
            this.trigger.addEventListener(t.CLICK, function(g) {
                e.hidePosterAndPlay(g)
            }),
            this.trigger.addEventListener(t.KEYDOWN, function(g) {
                e.hidePosterAndPlay(g)
            }),
            this.trigger.tabIndex = 0,
            this.trigger.setAttribute("role", "button");
        a = this.root.querySelector("." + zb.VIDEO);
        if (!a)
            throw Error(Ab.MISSING_VIDEO);
        this.video = a;
        (null === (c = this.trigger) || void 0 === c ? 0 : c.classList.contains(zb.INLINE_VIDEO)) && this.video.classList.add(zb.HIDE_ELEMENT);
        this.manager = yb.getManager();
        this.options = this.setPlayerOptions(b);
        YT.ready(function() {
            e.initializeVideo()
        });
        this.poster = this.root.querySelector("." + zb.IMAGE_CONTAINER);
        b = null === (d = this.poster) || void 0 === d ? void 0 : d.getAttribute("src");
        this.poster && 0 === (null === b || void 0 === b ? void 0 : b.length) && (this.poster.src = "https://i.ytimg.com/vi_webp/" + this.options.videoId + "/maxresdefault.webp")
    }
      , Cb = function(a) {
        return Number(a.replace("px", ""))
    }
      , Db = function(a, b, c) {
        c = c + 1 - b;
        a = b + (a - b) % c;
        return a < b ? a + c : a
    };
    k.prototype.destroy = function() {}
    ;
    k.prototype.emit = function(a, b, c) {
        c = void 0 === c ? !1 : c;
        if ("function" === typeof CustomEvent)
            var d = new CustomEvent(a,{
                detail: b,
                bubbles: c
            });
        else
            d = document.createEvent("CustomEvent"),
            d.initCustomEvent(a, c, !1, b);
        this.root.dispatchEvent(d)
    }
    ;
    var Eb = {};
    Eb.Component = k;
    var x, Fb = x || (x = {});
    Fb.ARIA_CONTROLS = "aria-controls";
    Fb.ARIA_CURRENT = "aria-current";
    Fb.ARIA_SELECTED = "aria-selected";
    Fb.ARIA_EXPANDED = "aria-expanded";
    Fb.ARIA_HASPOPUP = "aria-haspopup";
    Fb.ARIA_LABELLEDBY = "aria-labelledby";
    Fb.ARIA_LABEL = "aria-label";
    Fb.ARIA_LIVE = "aria-live";
    Fb.ARIA_HIDDEN = "aria-hidden";
    Fb.TAB_INDEX = "tabindex";
    Fb.ROLE = "role";
    var A, Gb = A || (A = {});
    Gb.BUTTON = "button";
    Gb.DIALOG = "dialog";
    Gb.REGION = "region";
    Gb.TABPANEL = "tabpanel";
    Gb.TABLIST = "tablist";
    Gb.NAVIGATION = "navigation";
    Gb.TAB = "tab";
    Gb.MENU = "menu";
    Gb.MENUITEM = "menuitem";
    Gb.MENUBAR = "menubar";
    Gb.TOOLTIP = "tooltip";
    Gb.NONE = "none";
    var B, Hb = B || (B = {});
    Hb[Hb.TABBABLE = 0] = "TABBABLE";
    Hb[Hb.NOT_TABBABLE = -1] = "NOT_TABBABLE";
    var G = {};
    G.Attribute = x;
    G.Role = A;
    G.TabIndex = B;
    var t, H = t || (t = {});
    H.CLICK = "click";
    H.FOCUS = "focus";
    H.MOUSEENTER = "mouseenter";
    H.MOUSEOVER = "mouseover";
    H.MOUSELEAVE = "mouseleave";
    H.MOUSEOUT = "mouseout";
    H.MOUSEWHEEL = "mousewheel";
    H.HOVER = "hover";
    H.NONE = "none";
    H.MOUSEDOWN = "mousedown";
    H.MOUSEMOVE = "mousemove";
    H.MOUSEUP = "mouseup";
    H.KEYDOWN = "keydown";
    H.KEYPRESS = "keypress";
    H.KEYUP = "keyup";
    H.BLUR = "blur";
    H.LOAD = "load";
    H.PAN = "pan";
    H.PAN_LEFT = "panleft";
    H.PAN_RIGHT = "panright";
    H.PAN_END = "panend";
    H.PAN_START = "panstart";
    H.PAN_MOVE = "panmove";
    H.SCROLL = "scroll";
    H.CHANGE = "change";
    H.TRANSITIONEND = "transitionend";
    H.TRANSITIONSTART = "transitionstart";
    H.RESIZE = "resize";
    H.ORIENTATION_CHANGE = "orientationchange";
    H.DOM_CONTENT_READY = "DOMContentReady";
    H.HASHCHANGE = "hashchange";
    H.POINTERDOWN = "pointerdown";
    H.POINTERMOVE = "pointermove";
    H.POINTERUP = "pointerup";
    H.POINTERCANCEL = "pointercancel";
    H.TOUCHSTART = "touchstart";
    H.TOUCHMOVE = "touchmove";
    H.TOUCHEND = "touchend";
    H.TOUCHCANCEL = "touchcancel";
    var I = {};
    I.EventType = t;
    var n, Ib = n || (n = {});
    Ib.ENTER = "Enter";
    Ib.SPACE = " ";
    Ib.TAB = "Tab";
    Ib.ESC = "Escape";
    Ib.LEFT = "ArrowLeft";
    Ib.UP = "ArrowUp";
    Ib.RIGHT = "ArrowRight";
    Ib.DOWN = "ArrowDown";
    Ib.HOME = "Home";
    Ib.END = "End";
    Ib.PAGEUP = "PageUp";
    Ib.PAGEDOWN = "PageDown";
    var lb, J = lb || (lb = {});
    J[J.ENTER = 13] = "ENTER";
    J[J.SPACE = 32] = "SPACE";
    J[J.TAB = 9] = "TAB";
    J[J.ESC = 27] = "ESC";
    J[J.LEFT = 37] = "LEFT";
    J[J.UP = 38] = "UP";
    J[J.RIGHT = 39] = "RIGHT";
    J[J.DOWN = 40] = "DOWN";
    J[J.HOME = 36] = "HOME";
    J[J.END = 35] = "END";
    J[J.PAGEUP = 33] = "PAGEUP";
    J[J.PAGEDOWN = 34] = "PAGEDOWN";
    var Jb = {};
    Jb.Key = n;
    Jb.KeyCode = lb;
    var ba, Kb = ba || (ba = {});
    Kb.BUTTON = "glue-ambient-video__button";
    Kb.BUTTON_PAUSE = "glue-ambient-video__button--paused";
    Kb.BUTTON_ICON = "glue-ambient-video__icon";
    Kb.VIDEO_CONTAINER = "glue-ambient-video__container";
    var ca, Lb = ca || (ca = {});
    Lb.BUTTON_ELEMENT_MISSING = "Ambient Button element is missing.";
    Lb.BUTTON_ICON_ELEMENT_MISSING = "Ambient Button Icon element is missing";
    Lb.MEDIA_ELEMENT_MISSING = "Ambient Media element is missing.";
    Lb.PLAY_VIDEO_ERROR = "Play video interrupted.";
    var Mb, Nb = Mb || (Mb = {});
    Nb.VIDEO_PAUSE = "Pause";
    Nb.VIDEO_PLAY = "Play";
    __wpcc.f.inherits(da, k);
    da.prototype.initialize = function() {
        this.button.tabIndex = B.TABBABLE;
        this.icon.tabIndex = B.NOT_TABBABLE;
        this.button.addEventListener(t.CLICK, this.togglePlayerState);
        this.button.addEventListener(t.KEYDOWN, this.togglePlayerState)
    }
    ;
    da.prototype.playVideo = function() {
        var a = this, b;
        return __wpcc.f.asyncExecutePromiseGeneratorProgram(function(c) {
            if (1 == c.nextAddress)
                return c.setCatchFinallyBlocks(2),
                c.yield(a.videoContainer.play(), 4);
            if (2 != c.nextAddress)
                return a.button.classList.add(ba.BUTTON_PAUSE),
                a.button.setAttribute(x.ARIA_LABEL, Mb.VIDEO_PAUSE),
                c.leaveTryBlock(0);
            b = c.enterCatchBlock();
            a.button.classList.remove(ba.BUTTON_PAUSE);
            console.error(b);
            c.jumpToEnd()
        })
    }
    ;
    da.prototype.pauseVideo = function() {
        this.videoContainer.pause();
        this.button.classList.remove(ba.BUTTON_PAUSE);
        this.button.setAttribute(x.ARIA_LABEL, Mb.VIDEO_PLAY)
    }
    ;
    da.prototype.destroy = function() {
        this.button.removeAttribute(x.TAB_INDEX);
        this.button.removeAttribute(x.ARIA_LABEL);
        this.icon.removeAttribute(x.TAB_INDEX);
        this.button.removeEventListener(t.CLICK, this.togglePlayerState);
        this.button.removeEventListener(t.KEYDOWN, this.togglePlayerState)
    }
    ;
    var ea, Ob = ea || (ea = {});
    Ob.BANNER_CLOSE_BUTTON = "glue-banner__close-btn";
    Ob.BANNER_HIDDEN = "glue-banner--hidden";
    var Pb, Qb = Pb || (Pb = {});
    Qb[Qb.BANNER_CLOSE_DELAY = 300] = "BANNER_CLOSE_DELAY";
    __wpcc.f.inherits(fa, k);
    fa.prototype.close = function() {
        var a = this;
        this.root.classList.add(ea.BANNER_HIDDEN);
        setTimeout(function() {
            a.root.style.display = "none"
        }, Pb.BANNER_CLOSE_DELAY)
    }
    ;
    fa.prototype.destroy = function() {
        var a;
        null === (a = this.closeButton) || void 0 === a ? void 0 : a.removeEventListener(t.CLICK, this.handleClick)
    }
    ;
    var ha = 'input textarea select button iframe [role="button"] a [tabindex]'.split(" ")
      , Sb = {
        FOCUSABLE_ELEMENT_SELECTORS: ha
    };
    Sb.getFocusableElements = ja;
    Sb.isElementFocusable = ia;
    ka.prototype.walk = function(a) {
        for (var b = Object.keys(a), c = 0; c < b.length; c++)
            this.defineReactive(a, b[c])
    }
    ;
    ka.prototype.defineReactive = function(a, b, c) {
        var d = this
          , e = Object.getOwnPropertyDescriptor(a, b);
        if (!e || !1 !== e.configurable) {
            var g = e && e.get
              , h = e && e.set;
            g && !h || 2 !== arguments.length || (c = a[b]);
            Object.defineProperty(a, b, {
                enumerable: !0,
                configurable: !0,
                get: function() {
                    var l = g ? g.call(a) : c;
                    d.watchers.has(b) || d.watchers.set(b, []);
                    return l
                },
                set: function(l) {
                    var m = g ? g.call(a) : c;
                    l !== m && (h ? h.call(a, l) : c = l,
                    d.notify(b))
                }
            })
        }
    }
    ;
    ka.prototype.listen = function(a, b) {
        var c = this;
        "object" === typeof a ? Object.keys(a).forEach(function(d) {
            c.watchers.has(d) || c.watchers.set(d, []);
            (d = c.watchers.get(d)) && d.push(b)
        }) : (this.watchers.has(a) || this.watchers.set(a, []),
        (a = this.watchers.get(a)) && a.push(b))
    }
    ;
    ka.prototype.unlisten = function(a, b) {
        var c = this;
        "object" === typeof a ? Object.keys(a).forEach(function(d) {
            c.watchers.has(d) && c.watchers.set(d, c.watchers.get(d).filter(function(e) {
                return e !== b
            }))
        }) : this.watchers.get(a) && this.watchers.set(a, this.watchers.get(a).filter(function(d) {
            return d !== b
        }))
    }
    ;
    ka.prototype.notify = function(a) {
        this.watchers.get(a) && this.watchers.get(a).forEach(function(b) {
            b.call(null)
        })
    }
    ;
    var Tb = {};
    Tb.Observer = ka;
    u.getInstance = function() {
        u.instance || (u.instance = new u);
        return u.instance
    }
    ;
    u.prototype.listen = function(a) {
        "function" === typeof a ? this.bpChangeHandlers.push(a) : this.addRule(a)
    }
    ;
    u.prototype.unlisten = function(a) {
        if ("function" === typeof a)
            for (var b = 0; a = this.bpChangeHandlers[b]; b++) {
                if (a === a) {
                    this.bpChangeHandlers.splice(b, 1);
                    break
                }
            }
        else
            this.removeRule(a)
    }
    ;
    u.prototype.destroy = function() {
        this.currentBreakpoint = "";
        for (var a = __wpcc.f.makeIterator(this.mqRuleHandlerMaps), b = a.next(); !b.done; b = a.next())
            b = b.value,
            b.mql.removeEventListener(t.CHANGE, b.handler);
        this.mqRuleHandlerMaps = [];
        this.bpRuleHandlerMaps = [];
        this.bpChangeHandlers = [];
        window.removeEventListener(t.DOM_CONTENT_READY, this.vpUpdateHandler);
        window.removeEventListener(t.RESIZE, this.vpUpdateHandler);
        window.removeEventListener(t.ORIENTATION_CHANGE, this.vpUpdateHandler)
    }
    ;
    u.prototype.getCurrentBreakpoint = function() {
        return this.currentBreakpoint
    }
    ;
    u.prototype.isBreakpointRule = function(a) {
        return void 0 !== a.breakpoint
    }
    ;
    u.prototype.isMediaQueryRuleRule = function(a) {
        return void 0 !== a.media
    }
    ;
    u.prototype.addRule = function(a) {
        this.isBreakpointRule(a) ? this.addBreakpointRule(a) : this.isMediaQueryRuleRule(a) && this.addMediaQueryRule(a)
    }
    ;
    u.prototype.removeRule = function(a) {
        this.isBreakpointRule(a) ? this.removeBreakpointRule(a) : this.isMediaQueryRuleRule(a) && this.removeMediaQueryRule(a)
    }
    ;
    u.prototype.addBreakpointRule = function(a) {
        function b(d) {
            var e = a.breakpoint;
            -1 === e.indexOf(c.previousBreakpoint) && -1 !== e.indexOf(c.currentBreakpoint) ? a.enter(d) : a.leave && -1 !== e.indexOf(c.previousBreakpoint) && -1 === e.indexOf(c.currentBreakpoint) && a.leave(d)
        }
        var c = this;
        this.bpRuleHandlerMaps.push({
            rule: a,
            handler: b
        });
        b(this.getCurrentBreakpoint());
        this.listen(b)
    }
    ;
    u.prototype.removeBreakpointRule = function(a) {
        for (var b, c = 0; b = this.bpRuleHandlerMaps[c]; c++)
            b.rule === a && this.unlisten(b.handler)
    }
    ;
    u.prototype.addMediaQueryRule = function(a) {
        function b() {
            c(d)
        }
        var c = this.handleMediaQueryChange(a.transform, a.revert)
          , d = window.matchMedia(a.media);
        d.addEventListener(t.CHANGE, b);
        this.mqRuleHandlerMaps.push({
            rule: a,
            mql: d,
            handler: b
        });
        d.matches && c(d)
    }
    ;
    u.prototype.removeMediaQueryRule = function(a) {
        for (var b = __wpcc.f.makeIterator(this.mqRuleHandlerMaps), c = b.next(); !c.done; c = b.next())
            c = c.value,
            c.rule === a && c.mql.removeEventListener(t.CHANGE, c.handler)
    }
    ;
    u.prototype.handleMediaQueryChange = function(a, b) {
        return function(c) {
            c.matches ? a(c) : b && b(c)
        }
    }
    ;
    u.prototype.handleViewportUpdate = function() {
        var a = this.readBreakpoint();
        if (this.currentBreakpoint !== a) {
            this.previousBreakpoint = this.currentBreakpoint;
            this.currentBreakpoint = a;
            a = __wpcc.f.makeIterator(this.bpChangeHandlers);
            for (var b = a.next(); !b.done; b = a.next())
                b = b.value,
                b(this.currentBreakpoint)
        }
    }
    ;
    u.prototype.readBreakpoint = function() {
        return window.getComputedStyle(document.body, ":after").getPropertyValue("content").replace(/["']/g, "")
    }
    ;
    var Ub = {};
    Ub.ResponsiveMonitor = u;
    var ma, Vb = ma || (ma = {});
    Vb.LIST = "glue-carousel__list";
    Vb.VIEWPORT = "glue-carousel__viewport";
    Vb.BUTTON = "glue-carousel__button";
    Vb.BUTTON_PREV = "glue-carousel__button--prev";
    Vb.BUTTON_NEXT = "glue-carousel__button--next";
    Vb.ITEM = "glue-carousel__item";
    Vb.NAVIGATION = "glue-carousel__navigation";
    Vb.NAVIGATION_DOT = "glue-carousel__dot";
    Vb.ACTIVE = "glue-is-active";
    Vb.INACTIVE = "glue-is-inactive";
    Vb.PEEK_OUT = "glue-carousel--peek-out";
    Vb.HAS_NAVIGATION = "glue-carousel--has-navigation";
    Vb.CARDS = "glue-carousel--cards";
    var na, Wb = na || (na = {});
    Wb[Wb.DRAG_THRESHOLD = .2] = "DRAG_THRESHOLD";
    Wb[Wb.DRAGSTART_THRESHOLD_PX = 10] = "DRAGSTART_THRESHOLD_PX";
    Wb[Wb.ROUNDING_THRESHOLD = .05] = "ROUNDING_THRESHOLD";
    var la, Xb = la || (la = {});
    Xb.DATA_DOT = "dot";
    Xb.DATA_NAVIGATION_LABEL = "glueCarouselNavigationLabel";
    Xb.NAVIGATION_LABEL_DEFAULT = "Go to slide $glue_carousel_page_number$";
    Xb.NAVIGATION_LABEL_VAR_NAME = "$glue_carousel_page_number$";
    Xb.RTL = "rtl";
    Xb.SLIDE_CHANGE = "gluecarouselslidechange";
    Xb.TRANSITION_NONE = "none";
    var K = {};
    K.CssClasses = ma;
    K.Numbers = na;
    K.Strings = la;
    __wpcc.f.inherits(v, k);
    v.prototype.setup = function() {
        this.options.peekOut && this.root.classList.add(ma.PEEK_OUT);
        this.options.cyclical && this.copyDummySlides();
        this.slidesContainer.setAttribute(x.ARIA_LIVE, "polite");
        this.nextBtn.setAttribute(x.ARIA_CONTROLS, this.root.id);
        this.prevBtn.setAttribute(x.ARIA_CONTROLS, this.root.id);
        this.animationEnabled = !1;
        this.calculate();
        this.currentXPosition = -1 * this.pagesX[this.getCurrentPage()];
        this.render()
    }
    ;
    v.prototype.registerEvents = function() {
        var a;
        this.root.addEventListener(t.CLICK, this.handleClick);
        this.root.addEventListener(t.KEYDOWN, this.handleKeydown);
        this.slidesContainer.addEventListener(t.TRANSITIONEND, this.handleTransitionEnd);
        window.addEventListener(t.RESIZE, this.handleResize);
        this.registerTouchEvents();
        this.observer.listen("currentSlide", this.handleCurrentSlideChange);
        null === (a = this.responsiveMonitor) || void 0 === a ? void 0 : a.listen(this.handleResize)
    }
    ;
    v.prototype.destroy = function() {
        var a;
        this.root.removeEventListener(t.CLICK, this.handleClick);
        this.root.removeEventListener(t.KEYDOWN, this.handleKeydown);
        this.slidesContainer.removeEventListener(t.TRANSITIONEND, this.handleTransitionEnd);
        window.removeEventListener(t.RESIZE, this.handleResize);
        this.deregisterTouchEvents();
        this.observer.unlisten("currentSlide", this.handleCurrentSlideChange);
        null === (a = this.responsiveMonitor) || void 0 === a ? void 0 : a.destroy()
    }
    ;
    v.prototype.reset = function() {
        this.setCurrentSlide(this.options.currentSlide)
    }
    ;
    v.prototype.calculate = function() {
        this.isCards ? this.calculateCardsProperties() : this.calculateProperties();
        this.calcScrollValue()
    }
    ;
    v.prototype.calculateProperties = function() {
        this.containerWidth = oa(getComputedStyle(this.slidesContainer).width);
        this.slideWidth = oa(getComputedStyle(this.slides[0]).width);
        var a = this.containerWidth / this.slideWidth;
        this.slidesPerPage = 1 - a % 1 < na.ROUNDING_THRESHOLD ? Math.ceil(a) : Math.floor(a);
        this.totalPages = Math.ceil(this.slidesRef.length / this.slidesPerPage);
        this.isTabModel = (this.isShowingNavigation = this.options.navigation) && 1 === this.slidesPerPage
    }
    ;
    v.prototype.calculateCardsProperties = function() {
        var a, b = null === (a = this.responsiveMonitor) || void 0 === a ? void 0 : a.getCurrentBreakpoint();
        switch (b) {
        case "sm":
            a = 1;
            break;
        case "md":
            a = Math.max(1, this.options.cardsPerPage - 1);
            break;
        default:
            a = this.options.cardsPerPage
        }
        var c = this.slides.length / a
          , d = oa(getComputedStyle(this.slidesContainer).gridColumnGap);
        this.slidesContainer.style.width = "calc(" + 100 * c + "% + " + (c - 1) * d + "px)";
        this.slidesContainer.style.gridTemplateColumns = "repeat(" + this.slides.length + ", 1fr)";
        var e = getComputedStyle(this.viewport);
        this.containerWidth = oa(e.width) + d - oa(e.paddingLeft) - oa(e.paddingRight);
        this.slidesPerPage = a;
        this.slideWidth = this.containerWidth / a;
        this.totalPages = Math.ceil(c);
        this.isShowingNavigation = this.options.navigation && "sm" !== b;
        this.isTabModel = !1
    }
    ;
    v.prototype.render = function() {
        this.renderSlides();
        this.renderButtons();
        this.renderNavigation()
    }
    ;
    v.prototype.getCurrentSlide = function() {
        return this.observer.data.currentSlide
    }
    ;
    v.prototype.getCurrentPage = function() {
        return Math.ceil(this.getCurrentSlide() / this.slidesPerPage)
    }
    ;
    v.prototype.setCurrentSlide = function(a) {
        var b = this.options.cyclical && this.options.animation ? 1 : 0
          , c = 1 - b;
        b = this.slidesRef.length + b;
        this.observer.data.currentSlide = this.options.cyclical ? pa(a, c, b) : Math.max(c, Math.min(b, a))
    }
    ;
    v.prototype.setCurrentPage = function(a) {
        this.setCurrentSlide((a - 1) * this.slidesPerPage + 1)
    }
    ;
    v.prototype.previous = function() {
        var a = this.getCurrentPage() - 1;
        this.setCurrentPage(a)
    }
    ;
    v.prototype.next = function() {
        var a = this.getCurrentPage() + 1;
        this.setCurrentPage(a)
    }
    ;
    v.prototype.renderSlides = function() {
        var a = this;
        this.transit();
        for (var b = pa(this.getCurrentSlide(), 1, this.slidesRef.length) - 1, c = this.getCurrentPage(), d = c - 1, e = document.activeElement instanceof HTMLElement && this.slides.includes(document.activeElement), g = __wpcc.f.makeIterator(this.slidesRef.entries()), h = g.next(); !h.done; h = g.next()) {
            var l = __wpcc.f.makeIterator(h.value);
            h = l.next().value;
            l = l.next().value;
            var m = h === b;
            m || Math.floor(h / this.slidesPerPage) === d || c === this.totalPages && h >= this.slidesRef.length - this.slidesPerPage ? l.removeAttribute(x.ARIA_HIDDEN) : l.setAttribute(x.ARIA_HIDDEN, "true");
            this.isTabModel ? l.setAttribute(x.ROLE, A.TABPANEL) : l.removeAttribute(x.ROLE);
            l.tabIndex = m ? B.TABBABLE : B.NOT_TABBABLE;
            m && e && (l.focus({
                preventScroll: !0
            }),
            setTimeout(function() {
                a.viewport.scrollLeft = 0
            }, 0))
        }
        this.removeFocusOnHiddenElements()
    }
    ;
    v.prototype.removeFocusOnHiddenElements = function() {
        var a = pa(this.getCurrentSlide(), 1, this.slidesRef.length) - 1;
        a = this.options.cyclical ? a + 1 : a;
        for (var b = __wpcc.f.makeIterator(this.slides.entries()), c = b.next(); !c.done; c = b.next()) {
            var d = __wpcc.f.makeIterator(c.value);
            c = d.next().value;
            d = d.next().value;
            d = ja(d);
            d = __wpcc.f.makeIterator(d);
            for (var e = d.next(); !e.done; e = d.next())
                e = e.value,
                c === a ? e.removeAttribute(x.TAB_INDEX) : e.tabIndex = B.NOT_TABBABLE
        }
    }
    ;
    v.prototype.transit = function() {
        this.animationEnabled && this.options.animation || (this.slidesContainer.style.transition = "initial");
        var a = this.pagesX[this.getCurrentPage()];
        this.slidesContainer.style.transform = "translate3d(" + a + "px, 0, 0)";
        this.currentXPosition = a;
        this.options.animation && !this.animationEnabled && this.turnOnAnimation()
    }
    ;
    v.prototype.turnOnAnimation = function() {
        var a = this;
        this.animationEnabled = !0;
        setTimeout(function() {
            a.slidesContainer.style.transition = ""
        }, 0)
    }
    ;
    v.prototype.renderNavigation = function() {
        if (this.isShowingNavigation) {
            this.root.classList.add(ma.HAS_NAVIGATION);
            this.isTabModel ? this.navigation.setAttribute(x.ROLE, A.TABLIST) : this.navigation.removeAttribute(x.ROLE);
            this.dots.length !== this.totalPages && this.buildNavigation();
            for (var a = pa(this.getCurrentPage(), 1, this.totalPages) - 1, b = document.activeElement instanceof HTMLButtonElement && this.dots.includes(document.activeElement), c = __wpcc.f.makeIterator(this.dots.entries()), d = c.next(); !d.done; d = c.next()) {
                var e = __wpcc.f.makeIterator(d.value);
                d = e.next().value;
                e = e.next().value;
                d = d === a;
                e.classList.toggle(ma.ACTIVE, d);
                e.tabIndex = d ? B.TABBABLE : B.NOT_TABBABLE;
                this.isTabModel ? e.setAttribute(x.ARIA_SELECTED, "" + d) : e.setAttribute(x.ARIA_CURRENT, "" + d);
                d && b && e.focus()
            }
        } else
            this.root.classList.remove(ma.HAS_NAVIGATION)
    }
    ;
    v.prototype.renderButtons = function() {
        if (!this.options.cyclical) {
            var a = document.activeElement
              , b = this.getCurrentPage()
              , c = 1 === b;
            b = b === this.totalPages;
            this.prevBtn.classList.toggle(ma.INACTIVE, c);
            this.nextBtn.classList.toggle(ma.INACTIVE, b);
            b && a === this.nextBtn ? this.prevBtn.focus() : c && a === this.prevBtn && this.nextBtn.focus()
        }
    }
    ;
    v.prototype.buildNavigation = function() {
        for (var a, b; this.dots.length; )
            null === (a = this.dots.pop()) || void 0 === a ? void 0 : a.remove();
        for (a = 0; a < this.totalPages; a++) {
            var c = document.createElement("button");
            c.classList.add(ma.NAVIGATION_DOT);
            c.dataset[la.DATA_DOT] = "" + (a + 1);
            if (this.isTabModel) {
                var d = null === (b = this.slidesRef[a * this.slidesPerPage]) || void 0 === b ? void 0 : b.id;
                c.setAttribute(x.ARIA_CONTROLS, d);
                c.setAttribute(x.ARIA_LABELLEDBY, d);
                c.setAttribute(x.ROLE, A.TAB)
            } else
                d = (this.navigation.dataset[la.DATA_NAVIGATION_LABEL] || la.NAVIGATION_LABEL_DEFAULT).replace(la.NAVIGATION_LABEL_VAR_NAME, "" + (a + 1)),
                c.setAttribute(x.ARIA_CONTROLS, this.root.id),
                c.setAttribute(x.ARIA_LABEL, d);
            this.navigation.appendChild(c);
            this.dots.push(c)
        }
    }
    ;
    v.prototype.copyDummySlides = function() {
        var a = this.cloneSlide(this.slides[0])
          , b = this.cloneSlide(this.slides[this.slides.length - 1]);
        this.slidesContainer.append(a);
        this.slidesContainer.prepend(b);
        this.slides = [b].concat(__wpcc.f.arrayFromIterable(this.slides), [a])
    }
    ;
    v.prototype.cloneSlide = function(a) {
        var b = a.cloneNode(!0);
        b.id = a.id + "-copy";
        b.setAttribute(x.ARIA_HIDDEN, "true");
        b.tabIndex = B.NOT_TABBABLE;
        return b
    }
    ;
    v.prototype.calcScrollValue = function() {
        var a = this.options.cyclical ? 1 : 0
          , b = this.totalPages + a
          , c = this.isRtl ? 1 : -1;
        this.pagesX = [];
        for (var d = 1 - a; d <= b; d++)
            this.pagesX[d] = (d < b ? (d - 1 + a) * this.slidesPerPage * this.slideWidth : this.slides.length * this.slideWidth - this.containerWidth) * c
    }
    ;
    v.prototype.registerTouchEvents = function() {
        window.PointerEvent ? (this.viewport.addEventListener(t.POINTERDOWN, this.handleGestureStart, !0),
        this.viewport.addEventListener(t.POINTERMOVE, this.handleGestureMove, !0),
        this.viewport.addEventListener(t.POINTERUP, this.handleGestureEnd, !0),
        this.viewport.addEventListener(t.POINTERCANCEL, this.handleGestureEnd, !0)) : (this.viewport.addEventListener(t.TOUCHSTART, this.handleGestureStart, !0),
        this.viewport.addEventListener(t.TOUCHMOVE, this.handleGestureMove, !0),
        this.viewport.addEventListener(t.TOUCHEND, this.handleGestureEnd, !0),
        this.viewport.addEventListener(t.TOUCHCANCEL, this.handleGestureEnd, !0),
        this.viewport.addEventListener(t.MOUSEDOWN, this.handleGestureStart, !0))
    }
    ;
    v.prototype.deregisterTouchEvents = function() {
        window.PointerEvent ? (this.viewport.removeEventListener(t.POINTERDOWN, this.handleGestureStart, !0),
        this.viewport.removeEventListener(t.POINTERMOVE, this.handleGestureMove, !0),
        this.viewport.removeEventListener(t.POINTERUP, this.handleGestureEnd, !0),
        this.viewport.removeEventListener(t.POINTERCANCEL, this.handleGestureEnd, !0)) : (this.viewport.removeEventListener(t.TOUCHSTART, this.handleGestureStart, !0),
        this.viewport.removeEventListener(t.TOUCHMOVE, this.handleGestureMove, !0),
        this.viewport.removeEventListener(t.TOUCHEND, this.handleGestureEnd, !0),
        this.viewport.removeEventListener(t.TOUCHCANCEL, this.handleGestureEnd, !0),
        this.viewport.removeEventListener(t.MOUSEDOWN, this.handleGestureStart, !0))
    }
    ;
    v.prototype.updateSwipeRestPosition = function() {
        var a = this.getXDistance(this.initialTouchPos, this.lastTouchPos);
        this.slidesContainer.style.transition = "";
        Math.abs(a) >= this.containerWidth * na.DRAG_THRESHOLD && ((0 < a && !this.isRtl || 0 > a && this.isRtl) && this.next(),
        (0 > a && !this.isRtl || 0 < a && this.isRtl) && this.previous());
        this.transit()
    }
    ;
    v.prototype.getXDistance = function(a, b) {
        return a && b ? a.x - b.x : 0
    }
    ;
    v.prototype.getGesturePointFromEvent = function(a) {
        var b = {
            x: 0,
            y: 0
        };
        this.isTouchEvent(a) ? a.targetTouches && (b.x = a.targetTouches[0].clientX,
        b.y = a.targetTouches[0].clientY) : (b.x = a.clientX,
        b.y = a.clientY);
        return b
    }
    ;
    v.prototype.onAnimFrame = function() {
        if (this.rafPending) {
            var a = this.getXDistance(this.initialTouchPos, this.lastTouchPos);
            this.slidesContainer.style.transform = "translate3d(" + (this.currentXPosition - a) + "px, 0, 0)";
            this.rafPending = !1
        }
    }
    ;
    v.prototype.isTouchEvent = function(a) {
        return window.TouchEvent && a instanceof TouchEvent
    }
    ;
    v.prototype.getDataAttrs = function() {
        for (var a = {}, b = __wpcc.f.makeIterator(Object.keys(v.defaults)), c = b.next(); !c.done; c = b.next()) {
            c = c.value;
            var d = "glueCarousel" + c.toUpperCase().slice(0, 1) + c.slice(1);
            this.root.dataset[d] && ("currentSlide" === c || "cardsPerPage" === c ? (d = Number(this.root.dataset[d]),
            isNaN(d) || (a[c] = d)) : a[c] = "true" === this.root.dataset[d])
        }
        return a
    }
    ;
    __wpcc.f.global.Object.defineProperties(v, {
        defaults: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return {
                    currentSlide: 1,
                    peekOut: !0,
                    navigation: !0,
                    animation: !0,
                    cyclical: !1,
                    cardsPerPage: 3
                }
            }
        }
    });
    var Yb, Zb = Yb || (Yb = {});
    Zb.LEFT = "left";
    Zb.RIGHT = "right";
    Zb.TOP = "top";
    Zb.BOTTOM = "bottom";
    var nb, $b = nb || (nb = {});
    $b.PREFIX = "data-glue-popover";
    $b.ROOT = "glue-popover";
    $b.TRIGGER = "glue-popover__trigger";
    $b.DIALOG = "glue-popover__dialog";
    $b.CLOSE_BTN = "glue-popover__close-btn";
    $b.IS_SHOWN = "glue-is-shown";
    $b.COPY = "glue-copy";
    var pb, ac = pb || (pb = {});
    ac.TRIGGER = "trigger";
    ac.PLACEMENT = "placement";
    ac.FOCUS = "takeFocus";
    ac.ROOT = "root";
    ac.MISSING_ID = "Missing or invalid ID. Popover requires a unique ID";
    ac.MISSING_TRIGGER = "Popover trigger element is missing";
    ac.MISSING_DIALOG = "Popover dialog element is missing";
    ac.INCORRECT_PLACEMENT = "Placement value needs to be one of these: left, right, top, bottom.";
    var bc;
    (bc || (bc = {})).TRIGGER = "gluePopoverTrigger";
    var cc, dc = cc || (cc = {});
    dc.OPEN_EVENT = "gluepopovershow";
    dc.CLOSE_EVENT = "gluepopoverclose";
    var ra, ec = ra || (ra = {});
    ec.ROOT = "glue-copy";
    ec.VALUE = "glue-copy-value";
    ec.BUTTON = "glue-copy-button";
    ec.IS_COPIED = "glue-is-copied";
    ec.POPOVER_DIALOG = "glue-popover__dialog";
    var fc, gc = fc || (fc = {});
    gc.SUCCESS = "glue-copy-success";
    gc.FAIL = "glue-copy-fail";
    var hc;
    (hc || (hc = {})).IS_HIDDEN = "glue.isHidden";
    var ic;
    (ic || (ic = {})).COPY = "copy";
    var qa, jc = qa || (qa = {});
    jc.MISSING_INPUT = "Input element is missing";
    jc.MISSING_COPY_BUTTON = "Copy button is missing";
    jc.SUCCESS_MESSAGE = "Copied to clipboard";
    jc.FAIL_MESSAGE = "Press Ctrl+C or \u2318+C to copy";
    __wpcc.f.inherits(sa, k);
    sa.prototype.init = function() {
        var a = this.root.getAttribute(fc.SUCCESS)
          , b = this.root.getAttribute(fc.FAIL);
        this.successMsg = a ? a : this.successMsg;
        this.failMsg = b ? b : this.failMsg;
        this.originLabel = this.copyButtonEl.textContent ? this.copyButtonEl.textContent : "";
        this.copyValueEl.disabled = !document.queryCommandSupported("copy");
        this.copyButtonEl.addEventListener(t.CLICK, this.clickHandler);
        this.copyButtonEl.addEventListener(t.KEYDOWN, this.keyDownHandler);
        this.hasPopoverParent && this.root.addEventListener(cc.CLOSE_EVENT, this.closeHandler)
    }
    ;
    sa.prototype.destroy = function() {
        this.reset();
        this.copyButtonEl.removeEventListener(t.CLICK, this.clickHandler);
        this.copyButtonEl.removeEventListener(t.KEYDOWN, this.keyDownHandler);
        this.hasPopoverParent && this.root.removeEventListener(cc.CLOSE_EVENT, this.closeHandler)
    }
    ;
    sa.prototype.copy = function() {
        var a, b;
        if (this.copyValueEl && this.copyValueEl.select && (this.copyValueEl.select(),
        navigator.userAgent.match(/ipad|iphone/i))) {
            var c = document.createRange();
            c.selectNodeContents(this.copyValueEl);
            null === (a = this.selection) || void 0 === a ? void 0 : a.removeAllRanges();
            null === (b = this.selection) || void 0 === b ? void 0 : b.addRange(c);
            this.copyValueEl.setSelectionRange(0, 999999)
        }
        try {
            document.execCommand(ic.COPY),
            this.copyButtonEl.textContent = this.successMsg,
            this.copyButtonEl.classList.add(ra.IS_COPIED),
            this.copyButtonEl.disabled = !0,
            this.copyValueEl.blur()
        } catch (d) {
            this.copyButtonEl.textContent = this.failMsg
        }
        this.copyValueEl.focus()
    }
    ;
    sa.prototype.reset = function() {
        var a;
        this.copyButtonEl.textContent = this.originLabel;
        this.copyButtonEl.classList.remove(ra.IS_COPIED);
        this.copyButtonEl.disabled = !1;
        this.copyValueEl.setSelectionRange(0, 0);
        null === (a = this.selection) || void 0 === a ? void 0 : a.removeAllRanges()
    }
    ;
    ta.prototype.debounce = function() {
        clearTimeout(this.timeoutId);
        this.timeoutId = window.setTimeout(this.fn, this.delay)
    }
    ;
    ta.prototype.cancel = function() {
        clearTimeout(this.timeoutId)
    }
    ;
    var w, kc = w || (w = {});
    kc.GROUP = "glue-expansion-panels";
    kc.PANEL = "glue-expansion-panel";
    kc.CONTENT = "glue-expansion-panel__content";
    kc.TOGGLE = "glue-expansion-panel__toggle";
    kc.BUTTON = "glue-expansion-panel__button";
    kc.HEADER_TEXT = "glue-expansion-panel__header-text";
    kc.TOGGLE_ALL = "glue-expansion-panels__toggle-all";
    kc.TOGGLE_ALL_TEXT = "glue-expansion-panels__toggle-text";
    kc.IS_EXPANDED = "glue-is-expanded";
    kc.IS_COLLAPSED = "glue-is-collapsed";
    kc.IS_MIXED = "glue-is-mixed";
    var ya, lc = ya || (ya = {});
    lc.KEY = "glueExpansionPanelsKey";
    lc.SMOOTHANIMTIMING = "glueExpansionPanelsSmoothAnimTiming";
    lc.TOGGLEFOR = "glueExpansionPanelToggleFor";
    lc.INITIAL = "glueExpansionPanelInitial";
    lc.EXPAND_TOOLTIP = "glueExpansionPanelExpandTooltip";
    lc.COLLAPSE_TOOLTIP = "glueExpansionPanelCollapseTooltip";
    var wa, mc = wa || (wa = {});
    mc.DEFAULT_INSTANCE_ID = "expansion_panels";
    mc.EXPANDED = "expanded";
    mc.COLLAPSED = "collapsed";
    mc.MIXED = "mixed";
    mc.TOOLTIP_EXPAND = "Press to expand";
    mc.TOOLTIP_COLLAPSE = "Press to collapse";
    var nc, oc = nc || (nc = {});
    oc.PANELGROUP_STATUS_CHANGED = "glueExpansionPanelsStatusChanged";
    oc.TOGGLE_CONTENT = "glueExpansionPanelsToggleContent";
    oc.EXPAND_ALL_CONTENT = "glueExpansionPanelsExpandAllContent";
    oc.COLLAPSE_ALL_CONTENT = "glueExpansionPanelsCollapseAllContent";
    var za, pc = za || (za = {});
    pc.TOGGLE_MISSING_CONTENT_ID = "[Glue Expansion Panels Toggle] - Toggle is not linked to a content element.";
    pc.TOGGLE_MISSING_CONTENT_ELEMENT = "[Glue Expansion Panels Toggle] - Cannot find content element to link toggle to.";
    pc.MISSING_CONTENT_ID = "[Glue Expansion Panels Content] - An ID must be set on the content element.";
    ua.prototype.dispatchEvent = function(a, b) {
        a = this.getListenersList(a);
        for (var c, d = 0; d < a.length; d++)
            c = a[d],
            c(b)
    }
    ;
    ua.prototype.listen = function(a, b) {
        this.getListenersList(a).push(b)
    }
    ;
    ua.prototype.unlisten = function(a, b) {
        a = this.getListenersList(a);
        for (var c = a.length - 1; 0 <= c; c--)
            a[c] === b && a.splice(c, 1)
    }
    ;
    ua.prototype.getListenersList = function(a) {
        this.listeners[a] || (this.listeners[a] = []);
        return this.listeners[a]
    }
    ;
    ua.prototype.removeAllListeners = function() {
        for (var a = this, b = {}, c = __wpcc.f.makeIterator(Object.keys(this.listeners)), d = c.next(); !d.done; b = {
            $jscomp$loop$prop$evtType$86: b.$jscomp$loop$prop$evtType$86
        },
        d = c.next())
            b.$jscomp$loop$prop$evtType$86 = d.value,
            Object.prototype.hasOwnProperty.call(this.listeners, b.$jscomp$loop$prop$evtType$86) && this.listeners[b.$jscomp$loop$prop$evtType$86].forEach(function(e) {
                return function(g) {
                    a.unlisten(e.$jscomp$loop$prop$evtType$86, g)
                }
            }(b))
    }
    ;
    va.prototype.updatePanelsStatus = function() {
        this.panelsStatus = 0 === this.panelsCount ? "" : this.panelsCount === this.panelsCollapsed ? wa.COLLAPSED : 0 === this.panelsCollapsed ? wa.EXPANDED : wa.MIXED;
        this.dispatchEvent(nc.PANELGROUP_STATUS_CHANGED)
    }
    ;
    va.prototype.listen = function(a, b) {
        this.eventTarget.listen(a, b)
    }
    ;
    va.prototype.unlisten = function(a, b) {
        this.eventTarget.unlisten(a, b)
    }
    ;
    va.prototype.dispatchEvent = function(a, b) {
        this.eventTarget.dispatchEvent(a, b)
    }
    ;
    __wpcc.f.global.Object.defineProperties(va, {
        defaults: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return {
                    isAnimated: !0,
                    panelsCount: 1
                }
            }
        }
    });
    xa.get = function(a, b) {
        a = void 0 === a ? wa.DEFAULT_INSTANCE_ID : a;
        b = void 0 === b ? va.defaults : b;
        var c = xa.instances[a];
        c || (c = new va(b),
        xa.instances[a] = c);
        return c
    }
    ;
    xa.clearSingle = function(a) {
        delete xa.instances[a]
    }
    ;
    xa.clearAll = function() {
        xa.instances = {}
    }
    ;
    xa.instances = {};
    __wpcc.f.inherits(Aa, k);
    Aa.prototype.init = function() {
        this.tabIndexArr = this.getTabIndexArray();
        "expanded" === this.root.dataset[ya.INITIAL] ? (this.isCollapsed = !1,
        this.updateHtmlAttributes(!1),
        this.setPanelHeight(""),
        this.updateStatus(!1)) : (this.isCollapsed = !0,
        this.updateHtmlAttributes(!0),
        this.setPanelHeight("0px"));
        this.model.listen(nc.TOGGLE_CONTENT, this.toggleContentHandler);
        this.model.listen(nc.EXPAND_ALL_CONTENT, this.expandHandler);
        this.model.listen(nc.COLLAPSE_ALL_CONTENT, this.collapseHandler);
        !0 === this.model.isAnimated && this.root.addEventListener(t.TRANSITIONEND, this.transitionendHandler);
        this.addA11yFeatures()
    }
    ;
    Aa.prototype.destroy = function() {
        var a;
        null === (a = this.panelEl) || void 0 === a ? void 0 : a.classList.remove(w.IS_COLLAPSED, w.IS_EXPANDED);
        this.setPanelHeight("");
        this.removeAriaAttributes();
        this.setFocusableElements(!1, this.tabIndexArr);
        this.tabIndexArr = [];
        this.model.unlisten(nc.TOGGLE_CONTENT, this.toggleContentHandler);
        this.model.unlisten(nc.EXPAND_ALL_CONTENT, this.expandHandler);
        this.model.unlisten(nc.COLLAPSE_ALL_CONTENT, this.collapseHandler);
        !0 === this.model.isAnimated && this.root.removeEventListener(t.TRANSITIONEND, this.transitionendHandler);
        this.removeA11yFeatures()
    }
    ;
    Aa.prototype.expand = function() {
        !1 !== this.isCollapsed && (this.updateHtmlAttributes(!1),
        this.updateHeight(!1),
        this.updateStatus(!1))
    }
    ;
    Aa.prototype.collapse = function() {
        !0 !== this.isCollapsed && (this.updateHtmlAttributes(!0),
        this.updateHeight(!0),
        this.updateStatus(!0))
    }
    ;
    Aa.prototype.toggleContent = function(a) {
        a === this.root.id && (this.isCollapsed ? this.expand() : this.collapse())
    }
    ;
    Aa.prototype.updateHtmlAttributes = function(a) {
        var b, c;
        this.setAriaAttributes(a);
        this.setFocusableElements(a, this.tabIndexArr);
        var d = a ? w.IS_COLLAPSED : w.IS_EXPANDED;
        a = a ? w.IS_EXPANDED : w.IS_COLLAPSED;
        null === (b = this.panelEl) || void 0 === b ? void 0 : b.classList.add(d);
        null === (c = this.panelEl) || void 0 === c ? void 0 : c.classList.remove(a)
    }
    ;
    Aa.prototype.updateHeight = function(a) {
        this.panelHeight = this.root.scrollHeight;
        !0 === this.model.isAnimated ? (this.setPanelHeight(this.panelHeight + "px"),
        a && (this.panelHeight = this.root.scrollHeight,
        window.setTimeout(this.setPanelHeight.bind(this), 1, "0px"))) : this.setPanelHeight(a ? "0px" : "")
    }
    ;
    Aa.prototype.updateStatus = function(a) {
        a ? this.model.panelsCollapsed++ : this.model.panelsCollapsed--;
        this.model.updatePanelsStatus();
        this.isCollapsed = a
    }
    ;
    Aa.prototype.getTabIndexArray = function() {
        return ja(this.root).map(function(a) {
            return a.tabIndex
        })
    }
    ;
    Aa.prototype.setPanelHeight = function(a) {
        this.root.style.height = a
    }
    ;
    Aa.prototype.unsetPanelHeight = function() {
        "0px" !== this.root.style.height && (this.root.style.height = "")
    }
    ;
    Aa.prototype.getTooltipText = function(a) {
        var b, c, d, e;
        return (void 0 === a ? 0 : a) ? null !== (c = null === (b = this.groupEl) || void 0 === b ? void 0 : b.dataset[ya.EXPAND_TOOLTIP]) && void 0 !== c ? c : wa.TOOLTIP_EXPAND : null !== (e = null === (d = this.groupEl) || void 0 === d ? void 0 : d.dataset[ya.COLLAPSE_TOOLTIP]) && void 0 !== e ? e : wa.TOOLTIP_COLLAPSE
    }
    ;
    Aa.prototype.setAriaAttributes = function(a) {
        this.root.hidden = a;
        this.toggleButton && (this.toggleButton.title = this.getTooltipText(a),
        this.toggleButton.setAttribute(x.ARIA_EXPANDED, String(!a)));
        a ? this.root.setAttribute(x.ARIA_HIDDEN, String(a)) : this.root.removeAttribute(x.ARIA_HIDDEN)
    }
    ;
    Aa.prototype.removeAriaAttributes = function() {
        var a, b;
        null === (a = this.toggleButton) || void 0 === a ? void 0 : a.removeAttribute(x.ARIA_EXPANDED);
        null === (b = this.toggleButton) || void 0 === b ? void 0 : b.removeAttribute("title");
        this.root.removeAttribute(x.ARIA_HIDDEN);
        this.root.hidden = !1
    }
    ;
    Aa.prototype.setFocusableElements = function(a, b) {
        var c = ja(this.root);
        if (a)
            for (b = __wpcc.f.makeIterator(c),
            c = b.next(); !c.done; c = b.next())
                c.value.tabIndex = B.NOT_TABBABLE;
        else
            for (a = 0; a < c.length; a++)
                c[a].tabIndex = b[a]
    }
    ;
    Aa.prototype.addA11yFeatures = function() {
        var a, b;
        this.root.setAttribute(x.ARIA_LABELLEDBY, null !== (b = null === (a = this.toggleButton) || void 0 === a ? void 0 : a.id) && void 0 !== b ? b : "");
        this.root.setAttribute(x.ROLE, A.REGION)
    }
    ;
    Aa.prototype.removeA11yFeatures = function() {
        this.root.removeAttribute(x.ARIA_LABELLEDBY);
        this.root.removeAttribute(x.ROLE)
    }
    ;
    __wpcc.f.inherits(Ba, k);
    Ba.prototype.init = function() {
        if (!document.querySelector("#" + this.contentId))
            throw Error(za.TOGGLE_MISSING_CONTENT_ELEMENT);
        this.addA11yFeatures();
        this.root.addEventListener(t.CLICK, this.clickHandler);
        this.root.addEventListener(t.KEYDOWN, this.keydownHandler)
    }
    ;
    Ba.prototype.destroy = function() {
        this.removeA11yFeatures();
        this.root.removeEventListener(t.CLICK, this.clickHandler);
        this.root.removeEventListener(t.KEYDOWN, this.keydownHandler)
    }
    ;
    Ba.prototype.toggle = function() {
        this.model.dispatchEvent(nc.TOGGLE_CONTENT, this.contentId)
    }
    ;
    Ba.prototype.handleKeydown = function(a) {
        if (a.key === n.ENTER || a.key === n.SPACE)
            a.preventDefault(),
            this.toggle()
    }
    ;
    Ba.prototype.addA11yFeatures = function() {
        this.root.setAttribute(x.ARIA_CONTROLS, this.contentId);
        this.root.setAttribute(x.ROLE, A.BUTTON);
        this.root.tabIndex = B.TABBABLE
    }
    ;
    Ba.prototype.removeA11yFeatures = function() {
        this.root.removeAttribute(x.ARIA_CONTROLS);
        this.root.removeAttribute(x.ROLE);
        this.root.removeAttribute(x.TAB_INDEX)
    }
    ;
    __wpcc.f.inherits(Ca, k);
    Ca.prototype.init = function() {
        this.addA11yFeatures();
        this.root.addEventListener(t.CLICK, this.clickHandler);
        this.root.addEventListener(t.KEYDOWN, this.keydownHandler);
        this.root.addEventListener(t.KEYUP, this.keyupHandler);
        this.model.listen(nc.PANELGROUP_STATUS_CHANGED, this.statusChangeHandler)
    }
    ;
    Ca.prototype.destroy = function() {
        this.removeA11yFeatures();
        this.root.removeEventListener(t.CLICK, this.clickHandler);
        this.root.removeEventListener(t.KEYDOWN, this.keydownHandler);
        this.root.removeEventListener(t.KEYUP, this.keyupHandler);
        this.model.unlisten(nc.PANELGROUP_STATUS_CHANGED, this.statusChangeHandler)
    }
    ;
    Ca.prototype.toggleAll = function() {
        this.model.panelsStatus === wa.EXPANDED ? this.model.dispatchEvent(nc.COLLAPSE_ALL_CONTENT) : this.model.dispatchEvent(nc.EXPAND_ALL_CONTENT);
        this.model.updatePanelsStatus()
    }
    ;
    Ca.prototype.handleKeydown = function(a) {
        if (a.key === n.ENTER || a.key === n.SPACE)
            a.preventDefault(),
            this.toggleAll()
    }
    ;
    Ca.prototype.handleKeyup = function(a) {
        a.key === n.SPACE && a.preventDefault()
    }
    ;
    Ca.prototype.addA11yFeatures = function() {
        this.root.setAttribute(x.ARIA_EXPANDED, this.model.panelsStatus === wa.EXPANDED ? "true" : "false");
        var a = Array.from(this.root.querySelectorAll("." + w.TOGGLE_ALL_TEXT));
        a = __wpcc.f.makeIterator(a);
        for (var b = a.next(); !b.done; b = a.next())
            b.value.setAttribute(x.ARIA_HIDDEN, "true")
    }
    ;
    Ca.prototype.removeA11yFeatures = function() {
        this.root.removeAttribute(x.ARIA_EXPANDED);
        var a = Array.from(this.root.querySelectorAll("." + w.TOGGLE_ALL_TEXT));
        a = __wpcc.f.makeIterator(a);
        for (var b = a.next(); !b.done; b = a.next())
            b.value.removeAttribute(x.ARIA_HIDDEN)
    }
    ;
    Ca.prototype.updateToggleAllStatus = function() {
        this.model.panelsStatus === wa.EXPANDED ? this.root.setAttribute(x.ARIA_EXPANDED, "true") : this.root.setAttribute(x.ARIA_EXPANDED, "false")
    }
    ;
    __wpcc.f.inherits(Da, k);
    Da.prototype.init = function() {
        this.model.panelsCount = this.root.getElementsByClassName(w.PANEL).length;
        this.model.panelsCollapsed = this.model.panelsCount;
        for (var a = __wpcc.f.makeIterator(this.root.querySelectorAll("." + w.TOGGLE_ALL)), b = a.next(); !b.done; b = a.next())
            this.toggleAllComponents.push(new Ca(b.value));
        a = __wpcc.f.makeIterator(this.root.querySelectorAll("." + w.CONTENT));
        for (b = a.next(); !b.done; b = a.next())
            this.panelContentComponents.push(new Aa(b.value));
        a = __wpcc.f.makeIterator(this.root.querySelectorAll("." + w.BUTTON));
        for (b = a.next(); !b.done; b = a.next())
            this.panelToggleComponents.push(new Ba(b.value));
        this.model.listen(nc.PANELGROUP_STATUS_CHANGED, this.statusChangeHandler);
        this.model.updatePanelsStatus()
    }
    ;
    Da.prototype.destroy = function() {
        for (var a; 0 < this.toggleAllComponents.length; )
            a = this.toggleAllComponents.pop(),
            a.destroy();
        for (; 0 < this.panelContentComponents.length; )
            a = this.panelContentComponents.pop(),
            a.destroy();
        for (; 0 < this.panelToggleComponents.length; )
            a = this.panelToggleComponents.pop(),
            a.destroy();
        this.model.panelsCount = 0;
        this.model.updatePanelsStatus();
        this.model.unlisten(nc.PANELGROUP_STATUS_CHANGED, this.statusChangeHandler);
        xa.clearSingle(this.modelKey)
    }
    ;
    Da.prototype.updateStatus = function() {
        this.root.classList.remove(w.IS_COLLAPSED, w.IS_MIXED, w.IS_EXPANDED);
        this.model.panelsStatus && this.root.classList.add("glue-is-" + this.model.panelsStatus)
    }
    ;
    var Ga, qc = Ga || (Ga = {});
    qc.CONTROL = "glue-filter-control";
    qc.IS_MATCHING = "glue-filter-is-matching";
    qc.ITEM = "glue-filter__item";
    qc.LABEL = "glue-filter-label";
    qc.LABEL_CLOSEBTN = "glue-filter-label__close-btn";
    qc.LABEL_GROUP = "glue-filter-label-group";
    qc.LABEL_SHOW = "glue-filter-label--show";
    qc.NUM_RESULTS = "glue-filter-num-results";
    qc.OPTION = "glueFilterOption";
    qc.RESULT = "glue-filter-result";
    qc.RESULT_ITEM = "glue-filter-result__item";
    var Fa, rc = Fa || (Fa = {});
    rc.ID = "glueFilterId";
    rc.IDS = "glueFilterIds";
    rc.PREFIX = "data-glue-filter-";
    rc.STRATEGY = "glueFilterStrategy";
    rc.INPUT_CHECKBOX_SELECTOR = "input[type='checkbox']";
    Ea.prototype.getModel = function(a) {
        return this.models[a]
    }
    ;
    Ea.prototype.getModels = function() {
        return this.models
    }
    ;
    Ea.prototype.setModel = function(a, b) {
        this.models[a] = b
    }
    ;
    Ea.reset = function() {
        Ea.instance = void 0
    }
    ;
    __wpcc.f.inherits(Ha, k);
    Ha.prototype.init = function() {
        var a;
        this.id = this.root.dataset[Fa.ID];
        if (!this.id)
            throw Error("Filter Id is not set on the element.");
        this.model = null !== (a = this.stateManager.getModel(this.id)) && void 0 !== a ? a : new ka({});
        this.selectEl && this.initSelect(this.selectEl);
        0 !== this.checkboxEls.length && this.initCheckbox(this.checkboxEls);
        this.stateManager.setModel(this.id, this.model)
    }
    ;
    Ha.prototype.destroy = function() {
        this.selectEl && this.root.removeEventListener(t.CHANGE, this.handleSelectChangeFunc);
        this.checkboxEls && this.root.removeEventListener(t.CHANGE, this.handleCheckboxChangeFunc)
    }
    ;
    Ha.prototype.reset = function() {
        for (var a = __wpcc.f.makeIterator(Object.keys(this.model.data)), b = a.next(); !b.done; b = a.next())
            this.model.data[b.value] = !1
    }
    ;
    Ha.prototype.initSelect = function(a) {
        var b = this
          , c = Array.from(a.querySelectorAll("option." + Ga.ITEM))
          , d = {};
        c = __wpcc.f.makeIterator(c.slice(1));
        for (var e = c.next(); !e.done; d = {
            $jscomp$loop$prop$el$88: d.$jscomp$loop$prop$el$88,
            $jscomp$loop$prop$filterOption$89: d.$jscomp$loop$prop$filterOption$89
        },
        e = c.next())
            if (d.$jscomp$loop$prop$el$88 = e.value,
            d.$jscomp$loop$prop$el$88.value)
                d.$jscomp$loop$prop$filterOption$89 = d.$jscomp$loop$prop$el$88.value,
                this.setModelProperty(d.$jscomp$loop$prop$filterOption$89, a.value === d.$jscomp$loop$prop$filterOption$89),
                this.model.listen(d.$jscomp$loop$prop$filterOption$89, function(g) {
                    return function() {
                        b.renderEl(g.$jscomp$loop$prop$el$88, b.model.data[g.$jscomp$loop$prop$filterOption$89])
                    }
                }(d)),
                this.labels[d.$jscomp$loop$prop$filterOption$89] = d.$jscomp$loop$prop$el$88.innerText;
            else
                throw Error('Attribute "value" is not set on the select element.');
        this.root.addEventListener(t.CHANGE, this.handleSelectChangeFunc)
    }
    ;
    Ha.prototype.initCheckbox = function(a) {
        var b = this, c, d, e = {};
        a = __wpcc.f.makeIterator(a);
        for (var g = a.next(); !g.done; e = {
            $jscomp$loop$prop$el$91: e.$jscomp$loop$prop$el$91,
            $jscomp$loop$prop$filterOption$92: e.$jscomp$loop$prop$filterOption$92
        },
        g = a.next())
            if (e.$jscomp$loop$prop$el$91 = g.value,
            e.$jscomp$loop$prop$filterOption$92 = e.$jscomp$loop$prop$el$91.value,
            e.$jscomp$loop$prop$filterOption$92)
                this.setModelProperty(e.$jscomp$loop$prop$filterOption$92, e.$jscomp$loop$prop$el$91.checked),
                this.model.listen(e.$jscomp$loop$prop$filterOption$92, function(h) {
                    return function() {
                        b.renderEl(h.$jscomp$loop$prop$el$91, b.model.data[h.$jscomp$loop$prop$filterOption$92])
                    }
                }(e)),
                this.labels[e.$jscomp$loop$prop$filterOption$92] = (null === (d = null === (c = e.$jscomp$loop$prop$el$91.parentNode) || void 0 === c ? void 0 : c.querySelector("label")) || void 0 === d ? void 0 : d.innerText) || "";
            else
                throw Error('Attribute "value" is not set on the checkbox element.');
        this.root.addEventListener(t.CHANGE, this.handleCheckboxChangeFunc)
    }
    ;
    Ha.prototype.handleSelectChange = function(a) {
        for (var b = __wpcc.f.makeIterator(Object.keys(this.model.data)), c = b.next(); !c.done; c = b.next())
            this.setModelProperty(c.value, !1);
        a.target instanceof HTMLSelectElement && a.target.value && this.setModelProperty(a.target.value, !0)
    }
    ;
    Ha.prototype.handleCheckboxChange = function(a) {
        a = a.target;
        a instanceof HTMLInputElement && a.classList.contains(Ga.ITEM) && (a = a.value,
        this.setModelProperty(a, !this.model.data[a]))
    }
    ;
    Ha.prototype.renderEl = function(a, b) {
        a instanceof HTMLInputElement ? a.checked = b : a instanceof HTMLOptionElement && (a.selected = b)
    }
    ;
    Ha.prototype.setModelProperty = function(a, b) {
        void 0 !== this.model.data[a] ? this.model.data[a] = b : this.model.defineReactive(this.model.data, a, b)
    }
    ;
    __wpcc.f.inherits(Ia, k);
    Ia.prototype.init = function() {
        for (var a = this, b = {}, c = __wpcc.f.makeIterator(Object.keys(this.data)), d = c.next(); !d.done; b = {
            $jscomp$loop$prop$model$96: b.$jscomp$loop$prop$model$96
        },
        d = c.next()) {
            d = d.value;
            b.$jscomp$loop$prop$model$96 = this.stateManager.getModel(d);
            for (var e = {}, g = __wpcc.f.makeIterator(Object.keys(this.data[d])), h = g.next(); !h.done; e = {
                $jscomp$loop$prop$labelEl$94: e.$jscomp$loop$prop$labelEl$94,
                $jscomp$loop$prop$filterOption$97: e.$jscomp$loop$prop$filterOption$97
            },
            h = g.next())
                e.$jscomp$loop$prop$filterOption$97 = h.value,
                e.$jscomp$loop$prop$labelEl$94 = this.generateLabels(d, e.$jscomp$loop$prop$filterOption$97),
                this.root.appendChild(e.$jscomp$loop$prop$labelEl$94),
                e.$jscomp$loop$prop$labelEl$94.addEventListener(t.CLICK, this.handleClickFun),
                this.labelArr.push(e.$jscomp$loop$prop$labelEl$94),
                null === b.$jscomp$loop$prop$model$96 || void 0 === b.$jscomp$loop$prop$model$96 ? void 0 : b.$jscomp$loop$prop$model$96.listen(e.$jscomp$loop$prop$filterOption$97, function(l, m) {
                    return function() {
                        a.render(l.$jscomp$loop$prop$labelEl$94, m.$jscomp$loop$prop$model$96.data[l.$jscomp$loop$prop$filterOption$97])
                    }
                }(e, b))
        }
    }
    ;
    Ia.prototype.generateLabels = function(a, b) {
        var c = document.createElement("button");
        c.classList.add(Ga.LABEL);
        c.dataset[Fa.ID] = a;
        c.dataset[Ga.OPTION] = b;
        c.setAttribute(x.ARIA_HIDDEN, "true");
        c.setAttribute(x.ARIA_LABEL, "Remove filter " + this.data[a][b] + ".");
        a = document.createTextNode(this.data[a][b]);
        c.appendChild(a);
        a = document.createElement("div");
        a.classList.add(Ga.LABEL_CLOSEBTN);
        c.appendChild(a);
        return c
    }
    ;
    Ia.prototype.handleClick = function(a) {
        var b;
        a = a.target;
        a instanceof HTMLElement && (a.classList.contains(Ga.LABEL) ? b = a : b = a.closest("." + Ga.LABEL),
        a = null === b || void 0 === b ? void 0 : b.dataset[Fa.ID],
        b = null === b || void 0 === b ? void 0 : b.dataset[Ga.OPTION],
        a && b && (a = this.stateManager.getModel(a)) && (a.data[b] = !1))
    }
    ;
    Ia.prototype.render = function(a, b) {
        a.classList.toggle(Ga.LABEL_SHOW, b);
        b ? a.removeAttribute(x.ARIA_HIDDEN) : a.setAttribute(x.ARIA_HIDDEN, "true")
    }
    ;
    Ia.prototype.destroy = function() {
        var a = this;
        this.labelArr.forEach(function(b) {
            b.removeEventListener(t.CLICK, a.handleClickFun)
        })
    }
    ;
    Ka.prototype.init = function() {
        var a = this, b;
        this.filterData.strategy = this.root.dataset[Fa.STRATEGY];
        var c = this.root.dataset[Fa.IDS];
        if (!c)
            throw Error("The filter Ids is not set on the result element.");
        this.filterIds = c.split(" ");
        if (!this.checkfilterIds(this.filterIds))
            throw Error("These filter ids are not valid.");
        c = __wpcc.f.makeIterator(this.filterIds);
        for (var d = c.next(); !d.done; d = c.next()) {
            d = d.value;
            d = (new Ea).getModel(d);
            var e = null !== (b = null === d || void 0 === d ? void 0 : d.data) && void 0 !== b ? b : {};
            e = __wpcc.f.makeIterator(Object.keys(e));
            for (var g = e.next(); !g.done; g = e.next())
                g = g.value,
                null === d || void 0 === d ? void 0 : d.listen(g, function() {
                    a.render()
                })
        }
        this.resultItems = Array.from(this.root.querySelectorAll("." + Ga.RESULT_ITEM));
        this.resultItems.forEach(function(h) {
            var l = {};
            a.filterIds.forEach(function(m) {
                var p = h.getAttribute(Fa.PREFIX + m);
                l[m] = p ? p.split(" ") : []
            });
            a.resultTags.push(l)
        });
        this.render()
    }
    ;
    Ka.prototype.checkfilterIds = function(a) {
        a = __wpcc.f.makeIterator(a);
        for (var b = a.next(); !b.done; b = a.next())
            if (b = b.value,
            !(new Ea).getModel(b))
                return !1;
        return !0
    }
    ;
    Ka.prototype.getFilterResults = function() {
        for (var a, b = {}, c = __wpcc.f.makeIterator(this.filterIds), d = c.next(); !d.done; d = c.next())
            d = d.value,
            b[d] = null === (a = (new Ea).getModel(d)) || void 0 === a ? void 0 : a.data;
        this.filterData = Object.assign({}, this.filterData, b);
        return Ja(this.resultTags, this.filterData)
    }
    ;
    Ka.prototype.render = function() {
        for (var a = this.getFilterResults(), b = __wpcc.f.makeIterator(this.resultItems.entries()), c = b.next(); !c.done; c = b.next()) {
            var d = __wpcc.f.makeIterator(c.value);
            c = d.next().value;
            d = d.next().value;
            d.classList.toggle(Ga.IS_MATCHING, a[c]);
            a[c] ? d.removeAttribute(x.ARIA_HIDDEN) : d.setAttribute(x.ARIA_HIDDEN, "true")
        }
        this.filteredItems = Array.from(this.root.querySelectorAll("." + Ga.IS_MATCHING));
        this.renderCounter()
    }
    ;
    Ka.prototype.renderCounter = function() {
        var a = this.filteredItems.length
          , b = this.root.querySelectorAll("." + Ga.NUM_RESULTS);
        if (b.length) {
            b = __wpcc.f.makeIterator(b);
            for (var c = b.next(); !c.done; c = b.next()) {
                for (c = c.value; c.firstChild; )
                    c.removeChild(c.firstChild);
                var d = document.createTextNode(a.toString());
                c.appendChild(d)
            }
        }
    }
    ;
    __wpcc.f.inherits(La, k);
    La.prototype.init = function() {
        this.initControls();
        this.initResults();
        this.initLabels()
    }
    ;
    La.prototype.initControls = function() {
        var a = Array.from(this.root.querySelectorAll("." + Ga.CONTROL));
        if (!a.length)
            throw Error("There is no filter control element found.");
        a = __wpcc.f.makeIterator(a);
        for (var b = a.next(); !b.done; b = a.next())
            b = new Ha(b.value),
            this.controls.push(b)
    }
    ;
    La.prototype.initResults = function() {
        var a = this.root.querySelector("." + Ga.RESULT);
        if (!a)
            throw Error("There is no filter result element found.");
        this.results = new Ka(a)
    }
    ;
    La.prototype.initLabels = function() {
        var a, b = this.root.querySelector("." + Ga.LABEL_GROUP);
        if (b) {
            for (var c = {}, d = __wpcc.f.makeIterator(Object.entries(this.controls)), e = d.next(); !e.done; e = d.next()) {
                var g = __wpcc.f.makeIterator(e.value);
                e = g.next().value;
                g = g.next().value;
                e = null !== (a = g.id) && void 0 !== a ? a : "glue-filter-control-" + e;
                c[e] = g.labels
            }
            this.labels = new Ia(b,c)
        }
    }
    ;
    La.prototype.destroy = function() {
        this.controls.forEach(function(a) {
            a.destroy()
        });
        this.labels && this.labels.destroy();
        Ea.reset()
    }
    ;
    La.prototype.reset = function(a) {
        a ? this.controls.filter(function(b) {
            return b.id === a
        })[0].reset() : this.controls.forEach(function(b) {
            b.reset()
        })
    }
    ;
    La.prototype.getFilteredItems = function() {
        return this.results.filteredItems
    }
    ;
    La.prototype.getStateManager = function() {
        return new Ea
    }
    ;
    var Na, sc = Na || (Na = {});
    sc.FOOTER_ROOT = "glue-footer";
    sc.FOOTER_PANELS_GROUP = "glue-footer__site-links-grid";
    sc.FOOTER_PANELS_PANEL = "glue-footer__site-links-column";
    sc.FOOTER_PANELS_TOGGLE = "glue-footer__site-links-header";
    sc.FOOTER_PANELS_BUTTON = "glue-footer__site-links-header-button";
    sc.FOOTER_PANELS_CONTENT = "glue-footer__site-links-list";
    var tc, uc = tc || (tc = {});
    uc.MODEL_NAME = "footer";
    uc.KEY = "glueExpansionPanelsKey";
    uc.TOGGLEFOR = "glueExpansionPanelToggleFor";
    __wpcc.f.inherits(Ma, k);
    Ma.prototype.destroy = function() {
        var a;
        this.panelsComponent && (this.panelsComponent.destroy(),
        this.configureExpansionPanels(!1));
        null === (a = this.responsiveSitelinks) || void 0 === a ? void 0 : a.destroy()
    }
    ;
    Ma.prototype.configureExpansionPanels = function(a) {
        if (this.panelGroupEl) {
            this.panelGroupEl.classList.toggle(w.GROUP, a);
            a ? this.panelGroupEl.dataset[tc.KEY] = tc.MODEL_NAME : delete this.panelGroupEl.dataset[tc.KEY];
            for (var b = __wpcc.f.makeIterator(this.panelGroupEl.querySelectorAll("." + Na.FOOTER_PANELS_PANEL)), c = b.next(); !c.done; c = b.next()) {
                c = c.value;
                var d = c.querySelector("." + Na.FOOTER_PANELS_TOGGLE)
                  , e = c.querySelector("." + Na.FOOTER_PANELS_BUTTON)
                  , g = c.querySelector("." + Na.FOOTER_PANELS_CONTENT);
                null === c || void 0 === c ? void 0 : c.classList.toggle(w.PANEL, a);
                null === d || void 0 === d ? void 0 : d.classList.toggle(w.TOGGLE, a);
                null === e || void 0 === e ? void 0 : e.classList.toggle(w.BUTTON, a);
                null === g || void 0 === g ? void 0 : g.classList.toggle(w.CONTENT, a);
                a && e && g ? e.dataset[tc.TOGGLEFOR] = g.id : null === e || void 0 === e ? void 0 : e.removeAttribute(tc.TOGGLEFOR)
            }
        }
    }
    ;
    __wpcc.f.global.Object.defineProperties(Ma, {
        defaults: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return {
                    panelsBreakpoints: ["sm"],
                    isAnimated: !0,
                    columnCount: 4
                }
            }
        }
    });
    var y, L = y || (y = {});
    L.ROOT = "glue-header";
    L.BAR = "glue-header__bar";
    L.TOGGLE_BTN = "glue-header__drawer-toggle-btn";
    L.DRAWER_EL = "glue-header__drawer";
    L.DRAWER_IS_SHOWN = "glue-is-showing-drawer";
    L.DOUBLE = "glue-header__bar--double";
    L.WHOLLY_SCROLLED = "glue-header-is-wholly-scrolled";
    L.LOCK_UP = "glue-header-lock-up";
    L.LINK_BAR = "glue-header__link-bar";
    L.LIST = "glue-header__list";
    L.LIST_ITEM = "glue-header__item";
    L.NESTED_LIST = "glue-header__list--nested";
    L.LINK_ITEM = "glue-header__link";
    L.LOGO_SVG = "glue-header__logo-svg";
    L.NO_DRAWER = "glue-header-no-drawer";
    L.STEPPED_NAV_ENABLE = "glue-header-stepped-nav-enabled";
    L.ACTIVE_MENU = "glue-header--is-active";
    L.ACTIVE_LINK = "glue-header__item--active";
    L.IS_ANIMATING = "glue-is-animating";
    L.BAR_DESKTOP = "glue-header__bar--desktop";
    L.BAR_MOBILE = "glue-header__bar--mobile";
    L.REWIND_SHADOW = "glue-header--rewind-box-shadow";
    L.HEADER_CONTAINER = "glue-header__container";
    L.SKIP_BTN = "glue-header__skip-content";
    L.DEEP_NAV = "glue-header__deep-nav";
    var cb, vc = cb || (cb = {});
    vc.MISSING_ROOT_ELEMENT = 'No element with "glue-header class" was found. Header component needs a root element.';
    vc.MISSING_HEADER_BAR_ELEMENT = 'No element with "glue-header__bar" class was found. This is required by Header component.';
    vc.MISSING_DRAWER_ELEMENT = 'No element with "glue-header__drawer" class was found. This is required by Header component.';
    vc.MISSING_TOGGLE_BTN_ELEMENT = 'No element with "glue-header__drawer-toggle-btn" class was found. This is required by Header component.';
    vc.MISSING_LINK_BAR_ELEMENT = 'No element with "glue-header__link-bar" class was found. This is required by Header component.';
    vc.SCROLL_UP = "up";
    vc.SCROLL_DOWN = "down";
    vc.INCORRECT_TYPE = "Incorrect data type";
    vc.SHOW_EVENT = "glueheadershow";
    vc.HIDE_EVENT = "glueheaderhide";
    var wc, xc = wc || (wc = {});
    xc[xc.MAX_PAGE_OFFSET = 500] = "MAX_PAGE_OFFSET";
    xc[xc.ANIMATING_STATE_BUFFER = 20] = "ANIMATING_STATE_BUFFER";
    xc[xc.SCROLL_THRESHOLD = 50] = "SCROLL_THRESHOLD";
    xc[xc.POSITION_CHANGE_BUFFER = 300] = "POSITION_CHANGE_BUFFER";
    var Ua, yc = Ua || (Ua = {});
    yc.ERROR_MSG_NO_CHILDREN = "has no element children.";
    yc.ERROR_PREFIX = "Menubar constructor argument el ";
    Oa.difference = function(a, b) {
        return new Oa(a.x - b.x,a.y - b.y)
    }
    ;
    var Qa;
    (Qa || (Qa = {})).MENU_OPEN = "glue-header__menu--open";
    var Ra;
    (Ra || (Ra = {})).NO_CHILDREN = "PopupMenu constructor argument el has no element children.";
    __wpcc.f.inherits(Pa, k);
    Pa.prototype.init = function() {
        this.root.tabIndex = -1;
        this.root.getAttribute(x.ROLE) || this.root.setAttribute(x.ROLE, A.MENUITEM);
        this.root.addEventListener(t.KEYDOWN, this.handleKeydown);
        this.root.addEventListener(t.CLICK, this.handleClick);
        this.root.addEventListener(t.FOCUS, this.handleFocus);
        this.root.addEventListener(t.BLUR, this.handleBlur);
        this.root.addEventListener(t.MOUSEENTER, this.handleMouseenter);
        this.root.addEventListener(t.MOUSELEAVE, this.handleMouseleave)
    }
    ;
    Pa.prototype.destroy = function() {
        this.root.removeAttribute(x.ROLE);
        this.root.removeAttribute(x.TAB_INDEX);
        this.root.removeEventListener(t.KEYDOWN, this.handleKeydown);
        this.root.removeEventListener(t.CLICK, this.handleClick);
        this.root.removeEventListener(t.FOCUS, this.handleFocus);
        this.root.removeEventListener(t.BLUR, this.handleBlur);
        this.root.removeEventListener(t.MOUSEENTER, this.handleMouseenter);
        this.root.removeEventListener(t.MOUSELEAVE, this.handleMouseleave)
    }
    ;
    Pa.prototype.controllerWithoutParentMenu = function(a) {
        return null === a.parentMenu
    }
    ;
    Pa.prototype.setExpanded = function(a) {
        a ? this.root.setAttribute(x.ARIA_EXPANDED, "true") : this.root.setAttribute(x.ARIA_EXPANDED, "false")
    }
    ;
    __wpcc.f.inherits(Sa, k);
    Sa.prototype.init = function() {
        var a;
        this.root.tabIndex = -1;
        this.root.setAttribute(x.ROLE, A.MENU);
        this.root.addEventListener(t.MOUSEENTER, this.handleMouseenter);
        this.root.addEventListener(t.MOUSELEAVE, this.handleMouseleave);
        var b = __wpcc.f.makeIterator(this.menuItems);
        for (a = b.next(); !a.done; a = b.next())
            a.value.setAttribute(x.ROLE, A.NONE);
        b = Array.from(this.root.querySelectorAll(":scope > .glue-header__item > .glue-header__link"));
        b = __wpcc.f.makeIterator(b);
        for (a = b.next(); !a.done; a = b.next()) {
            var c = a.value;
            a = new Pa(c,this);
            var d = a.root.nextElementSibling;
            d instanceof HTMLUListElement && (a.popupMenu = new Sa(d,a));
            this.menuItemCollection.push(a);
            this.addFirstChar(c)
        }
        b = this.menuItemCollection.length;
        0 < b && (this.firstItem = this.menuItemCollection[0],
        this.lastItem = this.menuItemCollection[b - 1])
    }
    ;
    Sa.prototype.destroy = function() {
        this.root.removeAttribute(x.ROLE);
        this.root.removeAttribute(x.TAB_INDEX);
        for (var a = __wpcc.f.makeIterator(this.menuItems), b = a.next(); !b.done; b = a.next())
            b.value.removeAttribute(x.ROLE);
        a = __wpcc.f.makeIterator(this.menuItemCollection);
        for (b = a.next(); !b.done; b = a.next())
            b.value.destroy();
        this.root.removeEventListener(t.MOUSEENTER, this.handleMouseenter);
        this.root.removeEventListener(t.MOUSELEAVE, this.handleMouseleave)
    }
    ;
    Sa.prototype.addFirstChar = function(a) {
        var b;
        a = null === (b = a.textContent) || void 0 === b ? void 0 : b.trim().charAt(0).toLowerCase();
        this.firstChars.push(null !== a && void 0 !== a ? a : "")
    }
    ;
    Sa.prototype.isInController = function(a) {
        var b = this.controller.root.getBoundingClientRect();
        return a.x >= b.left && a.x <= b.right && a.y >= b.top && a.y <= b.bottom
    }
    ;
    Sa.prototype.isMenuItem = function(a) {
        return null !== a.parentMenu && !1 === a.isMenubarItem
    }
    ;
    Sa.prototype.setFocusToMenubarItem = function(a) {
        for (; a; ) {
            if (a.isMenubarItem)
                return a.root.focus(),
                a;
            this.isMenuItem(a) && (a.parentMenu.hasFocus = !1,
            a = a.parentMenu.controller)
        }
        return null
    }
    ;
    Sa.prototype.setFocusToController = function(a) {
        var b, c, d, e, g;
        void 0 === a ? null === (c = null === (b = this.controller) || void 0 === b ? void 0 : b.root) || void 0 === c ? void 0 : c.focus() : this.controller.isMenubarItem ? "previous" === a ? null === (d = this.controller.parentMenu) || void 0 === d ? void 0 : d.setFocusToPreviousItem(this.controller) : "next" === a && (null === (e = this.controller.parentMenu) || void 0 === e ? void 0 : e.setFocusToNextItem(this.controller)) : (this.controller.root.focus(),
        this.close(),
        "next" === a && (a = this.setFocusToMenubarItem(this.controller),
        null === (g = null === a || void 0 === a ? void 0 : a.parentMenu) || void 0 === g ? void 0 : g.setFocusToNextItem(a)))
    }
    ;
    Sa.prototype.setFocusToFirstItem = function() {
        var a;
        null === (a = this.firstItem) || void 0 === a ? void 0 : a.root.focus()
    }
    ;
    Sa.prototype.setFocusToLastItem = function() {
        var a;
        null === (a = this.lastItem) || void 0 === a ? void 0 : a.root.focus()
    }
    ;
    Sa.prototype.setFocusToPreviousItem = function(a) {
        var b;
        a === this.firstItem ? null === (b = this.lastItem) || void 0 === b ? void 0 : b.root.focus() : (a = this.menuItemCollection.indexOf(a),
        this.menuItemCollection[a - 1].root.focus())
    }
    ;
    Sa.prototype.setFocusToNextItem = function(a) {
        var b;
        a === this.lastItem ? null === (b = this.firstItem) || void 0 === b ? void 0 : b.root.focus() : (a = this.menuItemCollection.indexOf(a),
        this.menuItemCollection[a + 1].root.focus())
    }
    ;
    Sa.prototype.close = function(a) {
        a = void 0 === a ? !1 : a;
        var b, c = !1, d = this.hasFocus;
        this.controller.isMenubarItem && (c = this.controller.hasHover);
        if (!d)
            for (var e = __wpcc.f.makeIterator(this.menuItemCollection), g = e.next(); !g.done; g = e.next())
                g = g.value,
                d = d || !(null === (b = g.popupMenu) || void 0 === b || !b.hasFocus);
        if (a || !d && !this.hasHover && !c)
            this.root.classList.remove(Qa.MENU_OPEN),
            this.controller.setExpanded(!1)
    }
    ;
    __wpcc.f.inherits(Ta, k);
    Ta.prototype.init = function() {
        this.root.tabIndex = -1;
        this.root.setAttribute(x.ROLE, A.MENUITEM);
        var a = this.root.nextElementSibling;
        a instanceof HTMLUListElement && (this.popupMenu = new Sa(a,this),
        this.root.setAttribute(x.ARIA_HASPOPUP, "true"),
        this.root.addEventListener(t.FOCUS, this.handleFocus),
        this.root.addEventListener(t.BLUR, this.handleBlur),
        this.root.addEventListener(t.MOUSEENTER, this.handleMouseenter),
        this.root.addEventListener(t.MOUSELEAVE, this.handleMouseleave));
        this.root.addEventListener(t.KEYDOWN, this.handleKeydown)
    }
    ;
    Ta.prototype.destroy = function() {
        this.root.removeAttribute(x.TAB_INDEX);
        this.root.removeAttribute(x.ARIA_HASPOPUP);
        this.root.removeEventListener(t.KEYDOWN, this.handleKeydown);
        this.root.removeEventListener(t.FOCUS, this.handleFocus);
        this.root.removeEventListener(t.BLUR, this.handleBlur);
        this.root.removeEventListener(t.MOUSEENTER, this.handleMouseenter);
        this.root.removeEventListener(t.MOUSELEAVE, this.handleMouseleave)
    }
    ;
    __wpcc.f.inherits(Va, k);
    Va.prototype.init = function() {
        var a, b = this.root.querySelectorAll(":scope > ." + y.LIST_ITEM);
        this.root.setAttribute(x.ROLE, A.MENUBAR);
        b = __wpcc.f.makeIterator(b);
        for (var c = b.next(); !c.done; c = b.next())
            c.value.setAttribute(x.ROLE, A.NONE);
        b = this.root.firstElementChild;
        for (var d; b; )
            d = b.firstElementChild,
            b && d instanceof HTMLAnchorElement && (c = new Ta(d,this),
            this.menubarItems.push(c),
            (c = null === (a = d.textContent) || void 0 === a ? void 0 : a.trim()) && this.firstChars.push(c.substring(0, 1).toLowerCase())),
            b = b.nextElementSibling;
        a = this.menubarItems.length;
        0 < a && (this.firstItem = this.menubarItems[0],
        this.lastItem = this.menubarItems[a - 1],
        this.firstItem.root.tabIndex = 0)
    }
    ;
    Va.prototype.destroy = function() {
        for (var a = __wpcc.f.makeIterator(this.menubarItems), b = a.next(); !b.done; b = a.next())
            b.value.destroy()
    }
    ;
    Va.prototype.setFocusToItem = function(a) {
        for (var b, c = !1, d = __wpcc.f.makeIterator(this.menubarItems), e = d.next(); !e.done; e = d.next())
            e = e.value,
            0 === e.root.tabIndex && (c = "true" === e.root.getAttribute(x.ARIA_EXPANDED)),
            e.root.tabIndex = -1,
            null === (b = e.popupMenu) || void 0 === b ? void 0 : b.close();
        a.root.focus();
        a.root.tabIndex = 0;
        c && a.popupMenu && a.popupMenu.open()
    }
    ;
    Va.prototype.setFocusToFirstItem = function() {
        this.setFocusToItem(this.firstItem)
    }
    ;
    Va.prototype.setFocusToLastItem = function() {
        this.setFocusToItem(this.lastItem)
    }
    ;
    Va.prototype.setFocusToPreviousItem = function(a) {
        a === this.firstItem ? a = this.lastItem : (a = this.menubarItems.indexOf(a),
        a = this.menubarItems[a - 1]);
        this.setFocusToItem(a)
    }
    ;
    Va.prototype.setFocusToNextItem = function(a) {
        a === this.lastItem ? a = this.firstItem : (a = this.menubarItems.indexOf(a),
        a = this.menubarItems[a + 1]);
        this.setFocusToItem(a)
    }
    ;
    Va.prototype.setFocusByFirstCharacter = function(a, b) {
        function c(e, g) {
            return e === b && g >= d
        }
        b = b.toLowerCase();
        var d = this.menubarItems.indexOf(a) + 1;
        d === this.menubarItems.length && (d = 0);
        a = this.firstChars.findIndex(c);
        -1 === a && (d = 0,
        a = this.firstChars.findIndex(c));
        -1 < a && this.setFocusToItem(this.menubarItems[a])
    }
    ;
    var Wa, zc = Wa || (Wa = {});
    zc.ROOT = "glue-header__drawer";
    zc.DRAWER_IS_OPEN = "glue-header__drawer--is-open";
    zc.TOGGLE_BTN = "glue-header__drawer-toggle-btn";
    zc.IS_ANIMATING = "glue-is-animating";
    zc.GLUE_BUTTON = "glue-button";
    zc.NO_SCROLL = "glue-no-scroll";
    zc.BACKDROP = "glue-header__drawer-backdrop";
    var Xa, Ac = Xa || (Xa = {});
    Ac.MISSING_DRAWER_ELEMENT = 'No element with "glue-header__drawer" class was found. Drawer component needs a root element.';
    Ac.MISSING_BACKDROP_ELEMENT = 'No element with "glue-header__drawer-backdrop" class was found.';
    Ac.OPEN = "glueHeaderDrawerOpen";
    Ac.CLOSE = "glueHeaderDrawerClose";
    Ac.TOGGLE_BTN = "toggleBtn";
    __wpcc.f.inherits(z, k);
    z.prototype.registerTouchEvents = function() {
        window.PointerEvent ? (this.root.addEventListener(t.POINTERDOWN, this.handleGestureStart, !0),
        this.root.addEventListener(t.POINTERMOVE, this.handleGestureMove, !0),
        this.root.addEventListener(t.POINTERUP, this.handleGestureEnd, !0),
        this.root.addEventListener(t.POINTERCANCEL, this.handleGestureEnd, !0)) : (this.root.addEventListener(t.TOUCHSTART, this.handleGestureStart, !0),
        this.root.addEventListener(t.TOUCHMOVE, this.handleGestureMove, !0),
        this.root.addEventListener(t.TOUCHEND, this.handleGestureEnd, !0),
        this.root.addEventListener(t.TOUCHCANCEL, this.handleGestureEnd, !0),
        this.root.addEventListener(t.MOUSEDOWN, this.handleGestureStart, !0))
    }
    ;
    z.prototype.deregisterTouchEvents = function() {
        window.PointerEvent ? (this.root.removeEventListener(t.POINTERDOWN, this.handleGestureStart, !0),
        this.root.removeEventListener(t.POINTERMOVE, this.handleGestureMove, !0),
        this.root.removeEventListener(t.POINTERUP, this.handleGestureEnd, !0),
        this.root.removeEventListener(t.POINTERCANCEL, this.handleGestureEnd, !0)) : (this.root.removeEventListener(t.TOUCHSTART, this.handleGestureStart, !0),
        this.root.removeEventListener(t.TOUCHMOVE, this.handleGestureMove, !0),
        this.root.removeEventListener(t.TOUCHEND, this.handleGestureEnd, !0),
        this.root.removeEventListener(t.TOUCHCANCEL, this.handleGestureEnd, !0),
        this.root.removeEventListener(t.MOUSEDOWN, this.handleGestureStart, !0))
    }
    ;
    z.prototype.destroy = function() {
        this.deregisterTouchEvents();
        this.root.removeEventListener(t.TRANSITIONEND, this.transitionEndHandler);
        document.body.removeEventListener(Xa.OPEN, this.handleOpen);
        document.body.removeEventListener(Xa.CLOSE, this.handleClose)
    }
    ;
    z.prototype.isTouchEvent = function(a) {
        return window.TouchEvent && a instanceof TouchEvent
    }
    ;
    z.prototype.isPointerEvent = function(a) {
        return window.PointerEvent && a instanceof PointerEvent
    }
    ;
    z.prototype.onAnimFrame = function() {
        if (this.rafPending && this.initialTouchPos && this.lastTouchPos) {
            var a = Oa.difference(this.lastTouchPos, this.initialTouchPos).x;
            this.root.style.transform = 0 < a ? "" : "translate3d(" + a + "px, 0, 0)";
            this.rafPending = !1
        }
    }
    ;
    z.prototype.getGesturePointFromEvent = function(a) {
        var b = new Oa(0,0);
        this.isTouchEvent(a) ? a.targetTouches && (b.x = a.targetTouches[0].clientX,
        b.y = a.targetTouches[0].clientY) : (b.x = a.clientX,
        b.y = a.clientY);
        return b
    }
    ;
    z.prototype.updateDrawerPosition = function() {
        this.root.style.transition = "";
        this.root.style.transform = "";
        if (this.lastTouchPos && this.initialTouchPos) {
            var a = Oa.difference(this.lastTouchPos, this.initialTouchPos).x
              , b = Math.abs(a) >= .5 * this.root.clientWidth;
            a = 300 > (new Date).getTime() - this.startTime && 10 < Math.abs(a);
            (b || a) && this.close()
        }
    }
    ;
    z.prototype.open = function() {
        this.closed && !this.isAnimating && (this.isAnimating = !0,
        this.emit(Xa.OPEN, {}, !0),
        this.root.classList.add(Wa.DRAWER_IS_OPEN),
        this.root.classList.add(Wa.IS_ANIMATING),
        this.setDefaultAttrs(),
        this.toggleEl.setAttribute(x.ARIA_EXPANDED, "true"),
        this.backdrop.setAttribute(x.ROLE, "button"),
        this.backdrop.tabIndex = B.TABBABLE,
        this.removeAriaHidden(),
        this.ariaHideElements(),
        this.root.focus(),
        this.removeKeyboardFocus(),
        this.registerTouchEvents())
    }
    ;
    z.prototype.removeKeyboardFocus = function() {
        var a = ja(window.document.body);
        this.focusableElements = [];
        a = __wpcc.f.makeIterator(a);
        for (var b = a.next(); !b.done; b = a.next())
            b = b.value,
            this.root.contains(b) || this.backdrop.contains(b) || -1 === b.tabIndex || (this.focusableElements.push(b),
            b.tabIndex = -1)
    }
    ;
    z.prototype.addKeyboardFocus = function() {
        for (var a = __wpcc.f.makeIterator(this.focusableElements), b = a.next(); !b.done; b = a.next())
            b.value.removeAttribute("tabindex")
    }
    ;
    z.prototype.close = function() {
        this.closed || this.isAnimating || (this.isAnimating = !0,
        this.emit(Xa.CLOSE, {}, !0),
        this.root.classList.add(Wa.IS_ANIMATING),
        this.removeDefaultAttrs(),
        this.toggleEl.setAttribute(x.ARIA_EXPANDED, "false"),
        this.toggleEl.focus(),
        this.setAriaHidden(),
        this.ariaUnhideElements(),
        this.addKeyboardFocus(),
        this.backdrop && (this.backdrop.removeAttribute(x.TAB_INDEX),
        this.backdrop.removeAttribute(x.ROLE)),
        this.deregisterTouchEvents())
    }
    ;
    z.prototype.setAttributes = function() {
        if (!this.root.id) {
            var a = Math.round(99999999 * Math.random()).toString(16);
            this.root.id = "glue-drawer-" + a
        }
        this.toggleEl.setAttribute(x.ARIA_CONTROLS, this.root.id);
        this.toggleEl.setAttribute(x.ARIA_EXPANDED, "false");
        this.toggleEl.setAttribute(x.ARIA_HASPOPUP, "true")
    }
    ;
    z.prototype.isOpen = function() {
        return this.root.classList.contains(Wa.DRAWER_IS_OPEN)
    }
    ;
    z.prototype.containsElement = function(a) {
        return a.target instanceof Node && this.root.contains(a.target)
    }
    ;
    z.prototype.isCtaElement = function(a) {
        return a.target instanceof Element && a.target.classList.contains(Wa.GLUE_BUTTON)
    }
    ;
    z.prototype.handleTransitionEndEvent = function() {
        this.isAnimating && (this.root.classList.remove(Wa.IS_ANIMATING),
        this.closed ? this.closed = !1 : (this.root.classList.remove(Wa.DRAWER_IS_OPEN),
        this.closed = !0),
        this.isAnimating = !1)
    }
    ;
    z.prototype.removeAriaHidden = function() {
        this.root.removeAttribute(x.ARIA_HIDDEN)
    }
    ;
    z.prototype.setAriaHidden = function() {
        this.root.setAttribute(x.ARIA_HIDDEN, "true")
    }
    ;
    z.prototype.setDefaultAttrs = function() {
        this.root.setAttribute(x.ARIA_LABEL, "Navigation drawer");
        this.root.tabIndex = B.TABBABLE
    }
    ;
    z.prototype.removeDefaultAttrs = function() {
        this.root.removeAttribute(x.ARIA_LABEL);
        this.root.removeAttribute(x.TAB_INDEX)
    }
    ;
    z.prototype.ariaHideElements = function() {
        for (var a = this.root; a && a.parentNode; ) {
            for (var b = __wpcc.f.makeIterator(Array.from(a.parentNode.children)), c = b.next(); !c.done; c = b.next())
                c = c.value,
                c !== a && c !== this.backdrop && "true" !== c.getAttribute(x.ARIA_HIDDEN) && (this.ariaHiddenElements.push(c),
                c.setAttribute(x.ARIA_HIDDEN, "true"));
            a = a.parentNode
        }
    }
    ;
    z.prototype.ariaUnhideElements = function() {
        this.ariaHiddenElements.forEach(function(a) {
            a.removeAttribute(x.ARIA_HIDDEN)
        });
        this.ariaHiddenElements = []
    }
    ;
    var Bc, Cc = Bc || (Bc = {});
    Cc.COMPONENT = "glue-header__site-switcher";
    Cc.MENU = "glue-header__site-switcher-menu";
    Cc.MENU_ITEM = "glue-header__item";
    Cc.MENU_LINK = "glue-header__link";
    var Ya, Dc = Ya || (Ya = {});
    Dc.NO_ARIA_CONTROL = "aria-control value is not set on the site switcher element.";
    Dc.NO_MENU = "Header Site Switcher could not find a menu element.";
    __wpcc.f.inherits(Za, k);
    Za.prototype.init = function() {
        var a = this;
        this.root.setAttribute(x.ARIA_HASPOPUP, "true");
        this.root.addEventListener(t.KEYDOWN, this.handleKeydown);
        this.root.addEventListener(t.CLICK, this.handleClick);
        this.root.addEventListener(t.FOCUS, this.handleFocus);
        this.root.addEventListener(t.BLUR, this.handleBlur);
        this.root.addEventListener(t.MOUSEENTER, this.handleMouseenter);
        this.root.addEventListener(t.MOUSELEAVE, this.handleMouseLeave);
        this.root.setAttribute(x.ROLE, A.BUTTON);
        this.root.tabIndex = 0;
        var b = this.root.closest("." + Wa.ROOT);
        null === b || void 0 === b ? void 0 : b.addEventListener(Xa.OPEN, function() {
            for (var c = __wpcc.f.makeIterator(a.popupMenu.menuItemCollection), d = c.next(); !d.done; d = c.next())
                d.value.destroy()
        });
        null === b || void 0 === b ? void 0 : b.addEventListener(Xa.CLOSE, function() {
            for (var c = __wpcc.f.makeIterator(a.popupMenu.menuItemCollection), d = c.next(); !d.done; d = c.next())
                d.value.init()
        })
    }
    ;
    Za.prototype.destroy = function() {
        this.root.removeAttribute(x.ARIA_HASPOPUP);
        this.root.removeAttribute(x.ROLE);
        this.root.removeAttribute(x.TAB_INDEX);
        this.root.removeEventListener(t.KEYDOWN, this.handleKeydown);
        this.root.removeEventListener(t.CLICK, this.handleClick);
        this.root.removeEventListener(t.FOCUS, this.handleFocus);
        this.root.removeEventListener(t.BLUR, this.handleBlur);
        this.root.removeEventListener(t.MOUSEENTER, this.handleMouseenter);
        this.root.removeEventListener(t.MOUSELEAVE, this.handleMouseLeave)
    }
    ;
    Za.prototype.setExpanded = function(a) {
        this.root.setAttribute(x.ARIA_EXPANDED, a.toString())
    }
    ;
    var Ec, Fc = Ec || (Ec = {});
    Fc.ROOT = "glue-header__stepped-nav";
    Fc.CONTROLS_CONTAINER = "glue-header__stepped-nav-controls-container";
    Fc.CONTROLS = "glue-header__stepped-nav-controls";
    Fc.CONTROLS_TITLE = "glue-header__stepped-nav-controls-title";
    Fc.MENU_CONTAINER = "glue-header__stepped-nav-menus";
    Fc.SUBNAV_ICON = "glue-header__stepped-nav-subnav-icon";
    Fc.PARENT_POSITION = "glue-header__stepped-nav-parent-position";
    Fc.PAGE = "glue-stepped-page";
    Fc.PAGES = "glue-stepped-pages";
    var Gc, Hc = Gc || (Gc = {});
    Hc.PARENT_INDEX = "data-glue-stepped-nav-parent-index";
    Hc.PARENT_INDEX_CAMEL = "glueSteppedNavParentIndex";
    Hc.STEPPED_PAGE = "data-glue-stepped-page";
    Hc.STEPPED_PAGE_CAMEL = "glueSteppedPage";
    Hc.STEPPEDNAV_LABEL = "glueSteppednavLabel";
    var ab, Ic = ab || (ab = {});
    Ic.CURRENT_PAGE = "currentPage";
    Ic.TOTAL_PAGES = "totalPages";
    Ic.NEXT_EVENT = "nextPage";
    Ic.CONTROLS_MODEL_ID = "stepped-nav-controls";
    Ic.MISSING_CONTROLS = "Some of the Stepped Nav controls elements are missing.";
    Ic.MISSING_PAGES_CONT = "The container element for Stepped Nav Pages is missing.";
    Ic.MISSING_LINK_BAR = "Stepped Nav can't find the Link Bar Header element.";
    Ic.STEPPED_PAGE = "glue-stepped-page";
    Ic.STEPPEDNAV_LABEL = "$glue_steppednav_label$, Navigate back to parent menu, $glue_steppednav_label$ opened";
    Ic.STEPPED_NAV_LABEL_VAR_NAME = "$glue_steppednav_label$";
    var Jc, Kc = Jc || (Jc = {});
    Kc.SHOW = "glue-is-shown";
    Kc.ACTIVE = "glue-is-active";
    __wpcc.f.inherits($a, k);
    $a.prototype.initialize = function() {
        this.observer.listen(ab.CURRENT_PAGE, this.handleUpdate);
        this.model = this.observer.data;
        this.initPageElementIDs();
        this.update()
    }
    ;
    $a.prototype.initPageElementIDs = function() {
        for (var a, b = __wpcc.f.makeIterator(this.pageEls.entries()), c = b.next(); !c.done; c = b.next()) {
            a = __wpcc.f.makeIterator(c.value);
            c = a.next().value;
            var d = a.next().value;
            a = ab.STEPPED_PAGE + "-" + Math.round(99999999 * Math.random());
            d.id = a;
            d.classList.add(ab.STEPPED_PAGE + "-" + (c + 1));
            this.elementIds[c + 1] || (this.elementIds[c + 1] = a)
        }
    }
    ;
    $a.prototype.update = function() {
        function a(g) {
            g = g.hasAttribute(Gc.STEPPED_PAGE) ? Number(g.dataset[Gc.STEPPED_PAGE_CAMEL]) : Number(g.dataset[Gc.PARENT_INDEX_CAMEL]);
            isNaN(g) || (g = b.pageEls[g - 1],
            null === g || void 0 === g ? void 0 : g.classList.add(Ec.PARENT_POSITION),
            a(g))
        }
        for (var b = this, c = this.pageEls[this.model.currentPage - 1], d = __wpcc.f.makeIterator(this.pageEls), e = d.next(); !e.done; e = d.next())
            e = e.value,
            e === c ? (e.classList.add(Jc.SHOW),
            e.removeAttribute(x.ARIA_HIDDEN)) : (e.classList.remove(Jc.SHOW, Ec.PARENT_POSITION),
            e.setAttribute(x.ARIA_HIDDEN, "true")),
            this.updatePageElements(e);
        c.classList.contains(Ec.CONTROLS) ? this.selectableElements = c.hasAttribute(Gc.PARENT_INDEX) ? [c] : [] : this.selectableElements = Array.from(c.querySelectorAll("." + y.LINK_ITEM));
        a(c)
    }
    ;
    $a.prototype.updatePageElements = function(a) {
        a = Array.from(a.children);
        a = __wpcc.f.makeIterator(a);
        for (var b = a.next(); !b.done; b = a.next())
            b = b.value,
            b.hasAttribute(Gc.STEPPED_PAGE) && (b.setAttribute(x.ARIA_HASPOPUP, "true"),
            b.setAttribute(x.ARIA_SELECTED, String(b.classList.contains(y.ACTIVE_MENU))),
            b instanceof HTMLElement && b.setAttribute(x.ARIA_CONTROLS, this.elementIds[Number(b.dataset[Gc.STEPPED_PAGE_CAMEL])]))
    }
    ;
    $a.prototype.getCurrentPageParentIndex = function() {
        var a = Number(this.pageEls[this.model.currentPage - 1].dataset[Gc.PARENT_INDEX_CAMEL]);
        return isNaN(a) ? 1 : a
    }
    ;
    $a.prototype.destroy = function() {
        for (var a = __wpcc.f.makeIterator(this.pageEls), b = a.next(); !b.done; b = a.next())
            b = b.value,
            b.classList.remove(Jc.SHOW, Ec.PARENT_POSITION),
            b.id = "";
        this.observer.unlisten(ab.CURRENT_PAGE, this.handleUpdate)
    }
    ;
    __wpcc.f.inherits(bb, k);
    bb.getSteppedNavElement = function(a) {
        return a.querySelector("." + Ec.ROOT)
    }
    ;
    bb.prototype.initMenuPages = function() {
        this.pagesContainer = this.root.querySelector("." + Ec.MENU_CONTAINER);
        if (!this.pagesContainer)
            throw Error(ab.MISSING_PAGES_CONT);
        this.pagesContainer.classList.add(Ec.PAGES)
    }
    ;
    bb.prototype.initControls = function() {
        this.steppedControlsContainer = this.root.querySelector("." + Ec.CONTROLS_CONTAINER);
        this.steppedControls = this.root.querySelector("." + Ec.CONTROLS);
        this.steppedControlsTitle = this.root.querySelector("." + Ec.CONTROLS_TITLE);
        if (!this.steppedControlsContainer || !this.steppedControls || !this.steppedControlsTitle)
            throw Error(ab.MISSING_CONTROLS);
        this.steppedControls.remove();
        (this.subnavIcon = this.steppedControls.querySelector("." + Ec.SUBNAV_ICON)) && this.subnavIcon.remove();
        this.steppedControls.classList.add(Ec.PAGE)
    }
    ;
    bb.prototype.buildPagesFromNav = function() {
        var a, b, c = null === (a = this.root.parentElement) || void 0 === a ? void 0 : a.querySelector("." + y.LINK_BAR);
        if (!c)
            throw Error(ab.MISSING_LINK_BAR);
        a = null === (b = c.firstElementChild) || void 0 === b ? void 0 : b.cloneNode(!0);
        a instanceof HTMLElement && this.harvestMenu(a);
        this.menuPages = new $a(this.pagesContainer,this.observer);
        this.controlsPages = new $a(this.steppedControlsContainer,this.observer);
        this.model.totalPages = this.pagesContainer.children.length
    }
    ;
    bb.prototype.harvestMenu = function(a, b, c) {
        c = void 0 === c ? "" : c;
        a.classList.add(Ec.PAGE);
        this.pagesContainer.appendChild(a);
        this.steppedControlsTitle.textContent = c;
        var d = this.steppedControls.cloneNode(!0);
        d.classList.add(y.LINK_ITEM);
        a.classList.contains(Ec.PARENT_POSITION) && d.classList.add(Ec.PARENT_POSITION);
        b && (d.dataset[Gc.PARENT_INDEX_CAMEL] = String(b),
        a.dataset[Gc.PARENT_INDEX_CAMEL] = String(b));
        d.tabIndex = Number(B.NOT_TABBABLE);
        this.steppedControlsContainer.appendChild(d);
        b = this.pagesContainer.children.length;
        for (var e = __wpcc.f.makeIterator(Array.from(a.children)), g = e.next(); !g.done; g = e.next())
            g = g.value,
            g instanceof HTMLElement && this.harvestListItem(b, g),
            g.classList.contains(y.ACTIVE_MENU) && (a.classList.add(Ec.PARENT_POSITION),
            d.classList.add(Ec.PARENT_POSITION));
        c && (a = (d.dataset[Gc.STEPPEDNAV_LABEL] || ab.STEPPEDNAV_LABEL).replaceAll(ab.STEPPED_NAV_LABEL_VAR_NAME, c),
        d.setAttribute(x.ARIA_LABEL, a),
        d.setAttribute(x.ROLE, A.BUTTON));
        return b
    }
    ;
    bb.prototype.harvestListItem = function(a, b) {
        var c, d = this.getChildOfNodeType(b, "UL"), e = this.getChildOfNodeType(b, "A");
        !d && b.classList.contains(y.ACTIVE_LINK) && (this.activeInitPageIndex = a);
        d && e && (e.tabIndex = Number(B.NOT_TABBABLE),
        d.remove(),
        a = this.harvestMenu(d, a, null === (c = e.textContent) || void 0 === c ? void 0 : c.trim()),
        b.dataset[Gc.STEPPED_PAGE_CAMEL] = String(a),
        b = this.getChildOfNodeType(e, "svg"),
        null === b || void 0 === b ? void 0 : b.remove(),
        this.subnavIcon && e.appendChild(this.subnavIcon.cloneNode(!0)))
    }
    ;
    bb.prototype.keyPress = function(a) {
        var b = a.target
          , c = !!this.root.closest("[dir=rtl]")
          , d = this.controlsPages.selectableElements.concat(this.menuPages.selectableElements)
          , e = d.indexOf(document.activeElement);
        switch (a.key) {
        case n.ENTER:
        case n.SPACE:
            this.selectPage(b);
            break;
        case n.LEFT:
            c ? this.selectSubPage(b) : this.selectParentPage();
            break;
        case n.RIGHT:
            c ? this.selectParentPage() : this.selectSubPage(b);
            break;
        case n.UP:
            0 < e ? d[e - 1].focus() : d[d.length - 1].focus();
            break;
        case n.DOWN:
            e >= d.length - 1 ? d[0].focus() : d[e + 1].focus();
            break;
        case n.HOME:
            d[0].focus();
            break;
        case n.END:
            d[d.length - 1].focus()
        }
    }
    ;
    bb.prototype.selectPage = function(a) {
        this.steppedControlsContainer.contains(a) ? this.selectParentPage() : this.selectSubPage(a)
    }
    ;
    bb.prototype.selectSubPage = function(a) {
        if (a = a.closest("[" + Gc.STEPPED_PAGE + "]"))
            this.model.currentPage = Number(null === a || void 0 === a ? void 0 : a.dataset[Gc.STEPPED_PAGE_CAMEL])
    }
    ;
    bb.prototype.selectParentPage = function() {
        var a = this.controlsPages.getCurrentPageParentIndex();
        this.model.currentPage = a
    }
    ;
    bb.prototype.getChildOfNodeType = function(a, b) {
        return Array.from(a.children).find(function(c) {
            return c.nodeName === b
        })
    }
    ;
    bb.prototype.destroy = function() {
        this.menuPages && this.menuPages.destroy();
        this.controlsPages && this.controlsPages.destroy();
        this.observer.unlisten(ab.CURRENT_PAGE, this.updateHandler);
        this.root.removeEventListener(t.CLICK, this.handleClick);
        this.root.removeEventListener(t.KEYDOWN, this.handleKeyPress);
        for (var a = __wpcc.f.makeIterator(this.pagesContainer.childNodes), b = a.next(); !b.done; b = a.next())
            this.pagesContainer.removeChild(b.value);
        a = __wpcc.f.makeIterator(this.steppedControlsContainer.childNodes);
        for (b = a.next(); !b.done; b = a.next())
            this.steppedControlsContainer.removeChild(b.value);
        this.steppedControls.removeEventListener(t.CLICK, this.handleClick);
        this.steppedControls.removeEventListener(t.KEYDOWN, this.handleKeyPress)
    }
    ;
    __wpcc.f.inherits(C, k);
    C.prototype.initialize = function() {
        var a = this;
        this.headerBar = this.getHeaderBarElement();
        this.headerBarMobile = this.getHeaderBarElement(!0);
        this.activeBarElement = this.getActiveBarElement();
        if (this.options.drawer) {
            var b = this.root.querySelector("." + y.DRAWER_EL)
              , c = this.headerBar.querySelector("." + y.LINK_BAR);
            if (null === b)
                throw Error(cb.MISSING_DRAWER_ELEMENT);
            if (null === c)
                throw Error(cb.MISSING_LINK_BAR_ELEMENT);
            this.toggleBtnEl = this.root.querySelector("." + y.TOGGLE_BTN);
            if (null === this.toggleBtnEl)
                throw Error(cb.MISSING_TOGGLE_BTN_ELEMENT);
            this.drawer = new z(b,this.toggleBtnEl)
        } else
            this.root.classList.add(y.NO_DRAWER);
        this.setPositionStyle();
        this.setActiveBarPosition(this.headerBar.style.position);
        this.root.setAttribute(x.ARIA_EXPANDED, "false");
        this.handleClick = function(d) {
            a.clickHandler(d)
        }
        ;
        this.handleKeydown = function(d) {
            a.keydownHandler(d)
        }
        ;
        this.handleScroll = function() {
            a.scrollThrottlerHandler()
        }
        ;
        this.handleDrawOpen = function() {
            a.handleDrawerOpenEvent()
        }
        ;
        this.handleDrawClose = function() {
            a.handleDrawerCloseEvent()
        }
        ;
        this.handleTransitionEnd = function() {
            a.handleTransitionEndEvent()
        }
        ;
        this.root.addEventListener(t.CLICK, this.handleClick);
        this.root.addEventListener(t.KEYDOWN, this.handleKeydown);
        this.options.drawer && this.root.addEventListener(Xa.OPEN, this.handleDrawOpen);
        this.options.drawer && this.root.addEventListener(Xa.CLOSE, this.handleDrawClose);
        window.addEventListener(t.SCROLL, this.handleScroll);
        this.headerBar.addEventListener(t.TRANSITIONEND, this.handleTransitionEnd);
        this.headerBarMobile.addEventListener(t.TRANSITIONEND, this.handleTransitionEnd);
        this.responsiveMonitorInit();
        this.injectVersion()
    }
    ;
    C.prototype.injectVersion = function() {
        document.documentElement.dataset.glue = "glue@26.0.0"
    }
    ;
    C.prototype.initializeNavigationSubcomponents = function() {
        var a = this.root.querySelector("." + Bc.COMPONENT);
        a && (this.siteSwitcher = new Za(a));
        if (a = document.querySelector("." + y.DEEP_NAV))
            this.deepNav = new Va(a);
        if (this.options.steppedNav && (a = bb.getSteppedNavElement(this.root))) {
            this.root.classList.add(y.STEPPED_NAV_ENABLE);
            try {
                this.steppedNav = new bb(a)
            } catch (b) {
                throw this.root.classList.remove(y.STEPPED_NAV_ENABLE),
                b;
            }
        }
    }
    ;
    C.prototype.destroy = function() {
        var a = this, b, c, d;
        this.root.removeEventListener(t.CLICK, this.handleClick);
        this.root.removeEventListener(t.KEYDOWN, this.handleKeydown);
        this.headerBar.removeEventListener(t.TRANSITIONEND, this.handleTransitionEnd);
        this.headerBarMobile.removeEventListener(t.TRANSITIONEND, this.handleTransitionEnd);
        window.removeEventListener(t.SCROLL, this.handleScroll);
        window.cancelAnimationFrame(this.animationsFrameId);
        this.rm.unlisten(function(e) {
            "sm" === e && a.setActiveBarPosition()
        });
        this.rm.destroy();
        this.options.drawer && (this.root.removeEventListener(Xa.OPEN, this.handleDrawOpen),
        this.root.removeEventListener(Xa.CLOSE, this.handleDrawClose),
        null === (b = this.drawer) || void 0 === b ? void 0 : b.destroy());
        null === (c = this.siteSwitcher) || void 0 === c ? void 0 : c.destroy();
        null === (d = this.deepNav) || void 0 === d ? void 0 : d.destroy();
        this.steppedNav && this.steppedNav.destroy()
    }
    ;
    C.prototype.getOptions = function() {
        for (var a = {}, b = __wpcc.f.makeIterator(Object.keys(C.defaultOptions)), c = b.next(); !c.done; c = b.next()) {
            c = c.value;
            var d = "glueHeader" + c.toUpperCase().slice(0, 1) + c.slice(1);
            this.root.dataset[d] && (a[c] = "true" === this.root.dataset[d])
        }
        return a
    }
    ;
    C.prototype.clickHandler = function(a) {
        var b, c, d, e, g, h;
        if (this.options.drawer)
            if (null === (b = this.drawer) || void 0 === b ? 0 : b.isOpen())
                if (null === (c = this.drawer) || void 0 === c || !c.containsElement(a))
                    null === (d = this.drawer) || void 0 === d ? void 0 : d.close();
                else {
                    if (null === (e = this.drawer) || void 0 === e ? 0 : e.isCtaElement(a))
                        null === (g = this.drawer) || void 0 === g ? void 0 : g.close()
                }
            else
                this.toggleBtnEl.contains(a.target) && (null === (h = this.drawer) || void 0 === h ? void 0 : h.open())
    }
    ;
    C.prototype.keydownHandler = function(a) {
        var b, c;
        a = a.key === n.ESC;
        this.options.drawer && (null === (b = this.drawer) || void 0 === b ? 0 : b.isOpen()) && a && (null === (c = this.drawer) || void 0 === c ? void 0 : c.close())
    }
    ;
    C.prototype.scrollThrottlerHandler = function() {
        var a = this;
        this.scrolling || (this.animationsFrameId = window.requestAnimationFrame(function() {
            a.scrollHandler();
            a.scrolling = !1
        }),
        this.scrolling = !0)
    }
    ;
    C.prototype.scrollHandler = function() {
        var a = this
          , b = this.activeBarElement.classList.contains(y.WHOLLY_SCROLLED)
          , c = this.getScrollDirection()
          , d = document.body.clientHeight - window.scrollY - window.innerHeight <= wc.SCROLL_THRESHOLD
          , e = c === cb.SCROLL_DOWN;
        c = c === cb.SCROLL_UP;
        this.atTopOfPage || !e || b || this.isAnimating ? this.atTopOfPage || !c || !b || this.isAnimating || d ? this.atTopOfPage && !this.isAnimating && b && this.show() : 0 !== this.lastPositionY - window.scrollY && this.show() : window.scrollY > this.activeBarElement.clientHeight && this.hide();
        this.atTopOfPage = 0 >= window.scrollY;
        this.lastPositionY = window.scrollY;
        this.rewindBoxShadow();
        this.blockFalseScroll = !1;
        this.atTopOfPage && this.setActiveBarPosition();
        this.isAnimating && window.pageYOffset <= wc.MAX_PAGE_OFFSET && window.requestAnimationFrame(function() {
            a.scrollThrottlerHandler()
        })
    }
    ;
    C.prototype.resetDesktopHeaderPosition = function() {
        "block" === window.getComputedStyle(this.headerBarMobile).display ? (this.headerBar.style.top = "0",
        this.headerBar.style.position = "fixed") : this.headerBar.style.position = "static"
    }
    ;
    C.prototype.setPositionStyle = function() {
        this.headerBar.style.position = 64 < window.scrollY ? "fixed" : "static"
    }
    ;
    C.prototype.setActiveBarPosition = function(a) {
        a = void 0 === a ? "static" : a;
        this.options.hideOnScroll || (a = "fixed");
        var b = this.activeBarElement;
        "block" === window.getComputedStyle(this.headerBarMobile).display && this.resetDesktopHeaderPosition();
        "static" === a ? b.style.top = "-" + b.clientHeight + "px" : setTimeout(function() {
            b.style.top = (0).toString()
        }, wc.POSITION_CHANGE_BUFFER);
        b.style.position = a
    }
    ;
    C.prototype.getHeaderBarElement = function(a) {
        var b = (void 0 === a ? 0 : a) ? y.BAR_MOBILE : y.BAR_DESKTOP;
        a = Array.from(this.root.querySelectorAll("." + y.BAR)).filter(function(c) {
            return c.classList.contains(b)
        });
        if (!a)
            throw Error(cb.MISSING_HEADER_BAR_ELEMENT);
        return a[0]
    }
    ;
    C.prototype.handleDrawerCloseEvent = function() {
        this.root.classList.remove(y.DRAWER_IS_SHOWN);
        this.root.setAttribute(x.ARIA_EXPANDED, "false")
    }
    ;
    C.prototype.handleDrawerOpenEvent = function() {
        this.root.classList.add(y.DRAWER_IS_SHOWN);
        this.root.setAttribute(x.ARIA_EXPANDED, "true")
    }
    ;
    C.prototype.handleTransitionEndEvent = function() {
        this.allowTransitionEndEvent && (this.allowTransitionEndEvent = this.isAnimating = !1,
        this.activeBarElement.classList.remove(y.IS_ANIMATING))
    }
    ;
    C.prototype.responsiveMonitorInit = function() {
        var a = this;
        this.rm = new u({
            breakpoint: ["md", "sm"],
            enter: function() {
                var b, c;
                a.activeBarElement = a.getActiveBarElement();
                a.setActiveBarPosition();
                null === (b = a.drawer) || void 0 === b ? void 0 : b.setAriaHidden();
                null === (c = a.siteSwitcher) || void 0 === c ? void 0 : c.destroy()
            },
            leave: function() {
                var b, c, d, e;
                a.options.drawer && (null === (b = a.drawer) || void 0 === b ? 0 : b.isOpen()) && (null === (c = a.drawer) || void 0 === c ? void 0 : c.close());
                null === (d = a.drawer) || void 0 === d ? void 0 : d.removeAriaHidden();
                a.activeBarElement = a.getActiveBarElement();
                a.setActiveBarPosition();
                null === (e = a.siteSwitcher) || void 0 === e ? void 0 : e.init()
            }
        });
        this.rm.listen(function(b) {
            "sm" === b && a.setActiveBarPosition()
        })
    }
    ;
    C.prototype.getScrollDirection = function() {
        return this.lastPositionY >= window.scrollY ? cb.SCROLL_UP : cb.SCROLL_DOWN
    }
    ;
    C.prototype.hide = function() {
        this.options.hideOnScroll && (this.allowTransitionEndEvent = this.isAnimating = !0,
        this.activeBarElement.classList.add(y.WHOLLY_SCROLLED, y.IS_ANIMATING),
        this.setActiveBarPosition("fixed"),
        this.emit(cb.HIDE_EVENT, {}))
    }
    ;
    C.prototype.show = function() {
        this.options.hideOnScroll && (this.allowTransitionEndEvent = this.isAnimating = !0,
        this.activeBarElement.classList.add(y.IS_ANIMATING),
        this.activeBarElement.classList.remove(y.WHOLLY_SCROLLED),
        this.emit(cb.SHOW_EVENT, {}))
    }
    ;
    C.prototype.rewindBoxShadow = function() {
        this.atTopOfPage ? this.activeBarElement.classList.remove(y.REWIND_SHADOW) : this.atTopOfPage || this.isAnimating || this.blockFalseScroll || window.scrollY > this.activeBarElement.clientHeight && this.activeBarElement.classList.add(y.REWIND_SHADOW)
    }
    ;
    C.prototype.getActiveBarElement = function() {
        return "block" === window.getComputedStyle(this.headerBarMobile).display ? this.headerBarMobile : this.headerBar
    }
    ;
    __wpcc.f.global.Object.defineProperties(C, {
        defaultOptions: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return {
                    drawer: !0,
                    hideOnScroll: !0,
                    steppedNav: !1
                }
            }
        }
    });
    var Lc = {
        easeInSine: function(a) {
            return 0 === a || 1 === a ? a : 1 - Math.cos(Math.PI / 2 * a)
        },
        easeOutSine: function(a) {
            return 0 === a || 1 === a ? a : Math.sin(Math.PI / 2 * a)
        },
        easeInOutSine: function(a) {
            return 0 === a || 1 === a ? a : -.5 * (Math.cos(Math.PI * a) - 1)
        },
        easeInQuad: function(a) {
            return 0 === a || 1 === a ? a : a * a
        },
        easeOutQuad: function(a) {
            return 0 === a || 1 === a ? a : a * (2 - a)
        },
        easeInOutQuad: function(a) {
            return 0 === a || 1 === a ? a : .5 > a ? 2 * a * a : -1 + (4 - 2 * a) * a
        },
        easeInCubic: function(a) {
            return 0 === a || 1 === a ? a : a * a * a
        },
        easeOutCubic: function(a) {
            return 0 === a || 1 === a ? a : --a * a * a + 1
        },
        easeInOutCubic: function(a) {
            return 0 === a || 1 === a ? a : .5 > a ? 4 * a * a * a : (a - 1) * (2 * a - 2) * (2 * a - 2) + 1
        },
        easeInQuart: function(a) {
            return 0 === a || 1 === a ? a : a * a * a * a
        },
        easeOutQuart: function(a) {
            return 0 === a || 1 === a ? a : 1 - --a * a * a * a
        },
        easeInOutQuart: db,
        easeInQuint: function(a) {
            return 0 === a || 1 === a ? a : a * a * a * a * a
        },
        easeOutQuint: function(a) {
            return 0 === a || 1 === a ? a : 1 + --a * a * a * a * a
        },
        easeInOutQuint: function(a) {
            return 0 === a || 1 === a ? a : .5 > a ? 16 * a * a * a * a * a : 1 + 16 * --a * a * a * a * a
        },
        easeInExpo: function(a) {
            return 0 === a || 1 === a ? a : Math.pow(2, 10 * (a - 1))
        },
        easeOutExpo: function(a) {
            return 0 === a || 1 === a ? a : 1 - Math.pow(2, -10 * a)
        },
        easeInOutExpo: function(a) {
            return 0 === a || 1 === a ? a : .5 > a ? .5 * Math.pow(2, 10 * (2 * a - 1)) : .5 * (2 - Math.pow(2, -10 * (2 * a - 1)))
        },
        easeInCirc: function(a) {
            return 0 === a || 1 === a ? a : 1 - Math.sqrt(1 - a * a)
        },
        easeOutCirc: function(a) {
            return 0 === a || 1 === a ? a : Math.sqrt(1 - (a - 1) * (a - 1))
        },
        easeInOutCirc: function(a) {
            return 0 === a || 1 === a ? a : .5 > a ? -.5 * (Math.sqrt(1 - a * a * 4) - 1) : .5 * (Math.sqrt(1 - 4 * (a - 1) * (a - 1)) + 1)
        },
        easeInBack: function(a) {
            return 0 === a || 1 === a ? a : a * a * (2.70158 * a - 1.70158)
        },
        easeOutBack: function(a) {
            return 0 === a || 1 === a ? a : (a - 1) * (a - 1) * (2.70158 * (a - 1) + 1.70158) + 1
        },
        easeInOutBack: function(a) {
            return 0 === a || 1 === a ? a : .5 > a ? 2 * a * a * (7.189819 * a - 2.5949095) : .5 * ((2 * a - 2) * (2 * a - 2) * (3.5949095 * (2 * a - 2) + 2.5949095) + 2)
        },
        easeInElastic: function(a) {
            return 0 === a || 1 === a ? a : -1 * Math.pow(2, 10 * (a - 1)) * Math.sin(2 * (a - 1.075) * Math.PI / .3)
        },
        easeOutElastic: function(a) {
            return 0 === a || 1 === a ? a : Math.pow(2, -10 * a) * Math.sin(2 * (a - .075) * Math.PI / .3) + 1
        },
        easeInOutElastic: function(a) {
            return 0 === a || 1 === a ? a : .5 > a ? -.5 * Math.pow(2, 10 * (2 * a - 1)) * Math.sin(2 * (2 * a - 1.1125) * Math.PI / .45) : .5 * Math.pow(2, -10 * (2 * a - 1)) * Math.sin(2 * (2 * a - 1.1125) * Math.PI / .45) + 1
        },
        easeInBounce: fb,
        easeOutBounce: eb,
        easeInOutBounce: function(a) {
            return 0 === a || 1 === a ? a : .5 > a ? .5 * fb(2 * a) : .5 * eb(2 * a - 1) + .5
        },
        linear: function(a) {
            return a
        }
    };
    var Mc, Nc = Mc || (Mc = {});
    Nc.STARTSCROLL = "glue.smoothScroll.start";
    Nc.ENDSCROLL = "glue.smoothScroll.end";
    var Oc, Pc = Oc || (Oc = {});
    Pc.MISSING_PAGE_ELEMENT = "Smooth Scrolling requires a valid page element.";
    Pc.DIRECTION_MALFORMED = 'Scroll direction value only accepts "x", "y" or "both"';
    var gb = {
        duration: 600,
        offset: {
            x: 0,
            y: 0
        },
        easing: db,
        hash: !0,
        direction: "both"
    };
    hb.prototype.startScroll = function(a, b) {
        var c;
        if (0 === this.animationFrame) {
            if (!(a instanceof Element))
                throw Error(Oc.MISSING_PAGE_ELEMENT);
            document.dispatchEvent(new Event(Mc.STARTSCROLL,{
                bubbles: !0,
                cancelable: !1
            }));
            b && (this.config = b);
            this.scrollElement = a;
            this.startPosition = this.getScrollPosition();
            this.endPosition = this.getEndPosition(this.scrollElement);
            this.distance = {
                x: this.endPosition.x - this.startPosition.x - this.config.offset.x,
                y: this.endPosition.y - this.startPosition.y - this.config.offset.y
            };
            this.easingFunction = "string" === typeof this.config.easing ? Lc[this.config.easing] : null !== (c = this.config.easing) && void 0 !== c ? c : Lc.linear;
            this.elapsedTime = 0;
            this.position = {
                x: 0,
                y: 0
            };
            window.addEventListener(t.MOUSEWHEEL, this.mousewheelHandlerFunc);
            this.animateScroll()
        }
    }
    ;
    hb.prototype.stopScroll = function() {
        document.dispatchEvent(new Event(Mc.ENDSCROLL,{
            bubbles: !0,
            cancelable: !1
        }));
        window.cancelAnimationFrame(this.animationFrame);
        this.startTime = this.animationFrame = 0;
        this.removeMousewheelListener();
        this.config = gb
    }
    ;
    hb.prototype.animateScroll = function() {
        var a = this;
        this.startTime || (this.startTime = Date.now());
        this.elapsedTime = Date.now() - this.startTime;
        this.calculatePosition();
        this.updatePosition();
        this.elapsedTime < this.config.duration ? this.animationFrame = window.requestAnimationFrame(function() {
            a.animateScroll()
        }) : this.stopScroll()
    }
    ;
    hb.prototype.calculatePosition = function() {
        var a, b;
        if (0 < this.config.duration) {
            var c = this.easingFunction(Math.min(this.elapsedTime / this.config.duration, 1));
            this.position.x = this.startPosition.x + (null === (a = this.distance) || void 0 === a ? NaN : a.x) * c;
            this.position.y = this.startPosition.y + (null === (b = this.distance) || void 0 === b ? NaN : b.y) * c
        } else
            this.position = this.endPosition
    }
    ;
    hb.prototype.getScrollPosition = function() {
        return window.pageYOffset ? {
            x: window.pageXOffset,
            y: window.pageYOffset
        } : {
            x: document.documentElement.scrollLeft,
            y: document.documentElement.scrollTop
        }
    }
    ;
    hb.prototype.getEndPosition = function(a) {
        var b = {
            left: 0,
            top: 0
        };
        a && "getBoundingClientRect"in a && (b = a.getBoundingClientRect());
        return {
            x: b.left + this.getScrollPosition().x,
            y: b.top + this.getScrollPosition().y
        }
    }
    ;
    hb.prototype.updatePosition = function() {
        switch (this.config.direction) {
        case "x":
            this.updateScrollLeft();
            break;
        case "y":
            this.updateScrollTop();
            break;
        case "both":
            this.updateScrollLeft();
            this.updateScrollTop();
            break;
        default:
            throw Error();
        }
    }
    ;
    hb.prototype.updateScrollLeft = function() {
        var a = this.position.x;
        document.body.scrollLeft = a;
        document.documentElement.scrollLeft = a
    }
    ;
    hb.prototype.updateScrollTop = function() {
        var a = this.position.y;
        document.body.scrollTop = a;
        document.documentElement.scrollTop = a
    }
    ;
    hb.prototype.mousewheelHandler = function() {
        this.animationFrame && this.stopScroll()
    }
    ;
    hb.prototype.removeMousewheelListener = function() {
        window.removeEventListener(t.MOUSEWHEEL, this.mousewheelHandlerFunc)
    }
    ;
    hb.prototype.destroy = function() {
        this.stopScroll()
    }
    ;
    var ib, Qc = ib || (ib = {});
    Qc.BUTTON = "glue-jumplinks__button";
    Qc.BUTTON_LEFT = "glue-jumplinks__button--prev";
    Qc.BUTTON_RIGHT = "glue-jumplinks__button--next";
    Qc.BUTTON_ACTIVE = "glue-jumplinks__button--active";
    Qc.LIST = "glue-jumplinks__list";
    Qc.ITEMS = "glue-jumplinks__list-item";
    Qc.LINK = "glue-jumplinks__link";
    Qc.LINK_ACTIVE = "glue-jumplinks__link--active";
    Qc.VIEWPORT = "glue-jumplinks__viewport";
    Qc.REWIND = "glue-jumplinks--rewind";
    var Rc, Sc = Rc || (Rc = {});
    Sc.LI_WIDTH = "liWidth";
    Sc.VIEWPORT = "viewport";
    Sc.PAGE_X = "pageX";
    Sc.SLIDES = "slides";
    Sc.ACTIVE_LINK = "activeLink";
    Sc.RTL = "rtl";
    Sc.TRANSFORM = "transform";
    Sc.BLOCK = "block";
    Sc.FIXED = "fixed";
    Sc.JUMPLINK_DEFAULT_LABEL = "Jump to section within page";
    Sc.NOT_FIXED = "absolute";
    Sc.NO_ANIMATION = "none";
    var jb, Tc = jb || (jb = {});
    Tc[Tc.DEFAULT_OFFSET = 144] = "DEFAULT_OFFSET";
    Tc[Tc.JUMPLINKS_MARGIN = 16] = "JUMPLINKS_MARGIN";
    Tc[Tc.JUMPLINKS_HEIGHT = 48] = "JUMPLINKS_HEIGHT";
    Tc[Tc.SCROLL_THRESHOLD = 130] = "SCROLL_THRESHOLD";
    var Uc;
    (Uc || (Uc = {})).JUMPLINK_LABEL = "glueJumplinkLabel";
    __wpcc.f.inherits(D, k);
    D.prototype.initialize = function() {
        this.setAttributes();
        this.updateButtons();
        this.getLinkTargets();
        this.registerListeners();
        this.createIntersectionObserver()
    }
    ;
    D.prototype.createIntersectionObserver = function() {
        for (var a = this, b = new IntersectionObserver(function(e) {
            var g = {};
            e = __wpcc.f.makeIterator(e);
            for (var h = e.next(); !h.done; g = {
                $jscomp$loop$prop$entry$99: g.$jscomp$loop$prop$entry$99
            },
            h = e.next())
                g.$jscomp$loop$prop$entry$99 = h.value,
                g.$jscomp$loop$prop$entry$99.isIntersecting ? a.setActiveLink(g.$jscomp$loop$prop$entry$99.target.id) : (h = a.links.find(function(l) {
                    return function(m) {
                        return m.hash === "#" + l.$jscomp$loop$prop$entry$99.target.id
                    }
                }(g)),
                null === h || void 0 === h ? void 0 : h.classList.remove(ib.LINK_ACTIVE),
                null === h || void 0 === h ? void 0 : h.removeAttribute(x.ARIA_CURRENT))
        }
        ,{
            root: null,
            rootMargin: "0px",
            threshold: .1
        }), c = __wpcc.f.makeIterator(this.linkTargets), d = c.next(); !d.done; d = c.next())
            b.observe(d.value)
    }
    ;
    D.prototype.destroy = function() {
        this.deregisterListeners()
    }
    ;
    D.prototype.setAttributes = function() {
        var a = this.root.querySelector("." + ib.LIST).dataset[Uc.JUMPLINK_LABEL] || Rc.JUMPLINK_DEFAULT_LABEL;
        this.root.setAttribute(x.ROLE, "navigation");
        for (var b = __wpcc.f.makeIterator(this.links), c = b.next(); !c.done; c = b.next())
            c = c.value,
            c.setAttribute(x.ARIA_LABEL, c.text + " - " + a);
        a = __wpcc.f.makeIterator([this.prevButton, this.nextButton]);
        for (b = a.next(); !b.done; b = a.next())
            b = b.value,
            b.tabIndex = B.NOT_TABBABLE,
            b.setAttribute(x.ARIA_HIDDEN, "true")
    }
    ;
    D.prototype.setActiveLink = function(a) {
        this.observer.data.activeLink = a
    }
    ;
    D.prototype.getActiveLink = function() {
        return this.observer.data.activeLink
    }
    ;
    D.prototype.getLinkTargets = function() {
        for (var a = __wpcc.f.makeIterator(this.links), b = a.next(); !b.done; b = a.next()) {
            b = b.value.hash.substring(1);
            var c = document.querySelector("#" + b);
            if (!c)
                throw Error('Element with id "' + b + '" does not exist.');
            this.linkTargets.push(c)
        }
    }
    ;
    D.prototype.registerListeners = function() {
        var a = this;
        this.root.addEventListener(t.CLICK, this.handleClick);
        document.addEventListener(t.SCROLL, function(d, e) {
            var g;
            return function(h) {
                for (var l = [], m = 0; m < arguments.length; ++m)
                    l[m - 0] = arguments[m];
                g || (d.apply(a, l),
                g = !0,
                setTimeout(function() {
                    return g = !1
                }, e))
            }
        }(this.handleScroll, 16));
        window.addEventListener(t.RESIZE, this.handleResize);
        this.observer.listen(Rc.ACTIVE_LINK, this.handleActiveLinkChange);
        document.addEventListener(Mc.ENDSCROLL, function() {
            a.isScrolling = !1;
            a.updateTopOffset()
        });
        for (var b = __wpcc.f.makeIterator(this.links), c = b.next(); !c.done; c = b.next())
            c.value.addEventListener(t.FOCUS, this.handleLinkFocus)
    }
    ;
    D.prototype.deregisterListeners = function() {
        this.root.removeEventListener(t.CLICK, this.handleClick);
        window.removeEventListener(t.SCROLL, this.handleScroll);
        window.removeEventListener(t.RESIZE, this.handleResize);
        this.observer.unlisten(Rc.ACTIVE_LINK, this.handleActiveLinkChange);
        for (var a = __wpcc.f.makeIterator(this.links), b = a.next(); !b.done; b = a.next())
            b.value.removeEventListener(t.FOCUS, this.handleLinkFocus)
    }
    ;
    D.prototype.focusLinkHandler = function(a) {
        a.target && a.target instanceof Element && (a.target.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
        }),
        this.updateButtons())
    }
    ;
    D.prototype.clickHandler = function(a) {
        a.preventDefault();
        a = a.target;
        if (a === this.prevButton)
            a = this.isRTL() ? this.getPartialLink("next") : this.getPartialLink("prev"),
            a.scrollIntoView({
                behavior: "auto",
                block: "nearest",
                inline: "end"
            });
        else if (a === this.nextButton)
            a = this.isRTL() ? this.getPartialLink("prev") : this.getPartialLink("next"),
            a.scrollIntoView({
                behavior: "auto",
                block: "nearest",
                inline: "start"
            });
        else if (a instanceof HTMLAnchorElement && this.links.includes(a)) {
            var b = a.hash.substring(1);
            this.setActiveLink(b);
            a.scrollIntoView({
                behavior: "auto",
                block: "nearest",
                inline: "center"
            });
            this.smoothScroll.startScroll(document.querySelector("#" + b), {
                duration: 600,
                easing: db,
                direction: "both",
                hash: !0,
                offset: {
                    x: 0,
                    y: this.options.offset + jb.JUMPLINKS_HEIGHT + jb.JUMPLINKS_MARGIN
                }
            });
            this.isScrolling = !0
        }
        this.updateButtons()
    }
    ;
    D.prototype.getPartialLink = function(a) {
        var b;
        "prev" === a ? b = this.leftWatchPoint : b = this.rightWatchPoint;
        a = __wpcc.f.makeIterator(this.links);
        for (var c = a.next(); !c.done; c = a.next()) {
            c = c.value;
            var d = c.getBoundingClientRect();
            if (d.x < b && d.x + d.width > b)
                return c
        }
        return this.links[0]
    }
    ;
    D.prototype.reset = function() {
        this.setActiveLink("")
    }
    ;
    D.prototype.activeLinkChangeHandler = function() {
        this.renderActiveLink();
        var a = this.getActiveLink();
        if ("" !== a) {
            var b = this.links.find(function(c) {
                return c.hash === "#" + a
            });
            null === b || void 0 === b ? void 0 : b.scrollIntoView({
                behavior: "auto",
                block: "nearest",
                inline: "center"
            })
        }
        this.updateButtons()
    }
    ;
    D.prototype.scrollHandler = function() {
        !0 !== this.isScrolling && this.updateTopOffset()
    }
    ;
    D.prototype.resizeHandler = function() {
        this.leftWatchPoint = this.root.getBoundingClientRect().x + this.prevButton.offsetWidth;
        this.rightWatchPoint = this.leftWatchPoint + this.list.offsetWidth;
        this.updateButtons()
    }
    ;
    D.prototype.updateButtons = function() {
        this.prevButton.classList.remove(ib.BUTTON_ACTIVE);
        this.nextButton.classList.remove(ib.BUTTON_ACTIVE);
        this.isRTL() ? (0 > this.list.scrollLeft && this.prevButton.classList.add(ib.BUTTON_ACTIVE),
        10 < this.list.scrollWidth + this.list.scrollLeft - this.list.clientWidth && this.nextButton.classList.add(ib.BUTTON_ACTIVE)) : (0 < this.list.scrollLeft && this.prevButton.classList.add(ib.BUTTON_ACTIVE),
        10 < this.list.scrollWidth - this.list.scrollLeft - this.list.clientWidth && this.nextButton.classList.add(ib.BUTTON_ACTIVE))
    }
    ;
    D.prototype.renderActiveLink = function() {
        var a = this.getActiveLink();
        a = document.querySelector('a[href$="' + a + '"]');
        var b = this.root.querySelector("." + ib.LINK_ACTIVE);
        null === b || void 0 === b ? void 0 : b.classList.remove(ib.LINK_ACTIVE);
        null === b || void 0 === b ? void 0 : b.removeAttribute(x.ARIA_CURRENT);
        null === a || void 0 === a ? void 0 : a.classList.add(ib.LINK_ACTIVE);
        null === a || void 0 === a ? void 0 : a.setAttribute(x.ARIA_CURRENT, "true")
    }
    ;
    D.prototype.updateTopOffset = function() {
        if (this.lastScrollPosition !== window.scrollY)
            if (document.body.clientHeight - window.scrollY - window.innerHeight <= jb.SCROLL_THRESHOLD)
                this.root.classList.remove(ib.REWIND),
                this.unsetOffset();
            else {
                var a = this.options.offset - jb.JUMPLINKS_MARGIN;
                window.scrollY <= a ? (this.root.classList.remove(ib.REWIND),
                this.unsetOffset()) : (window.scrollY > a && (window.scrollY < this.lastScrollPosition ? (this.root.classList.add(ib.REWIND),
                this.options.belowHeader ? (a = document.querySelector("header"),
                this.setOffset(((null === a || void 0 === a ? void 0 : a.clientHeight) || 0) + jb.JUMPLINKS_MARGIN)) : this.setOffset(this.options.offset)) : (this.root.classList.remove(ib.REWIND),
                this.unsetOffset())),
                this.lastScrollPosition = window.scrollY)
            }
    }
    ;
    D.prototype.setOffset = function(a) {
        this.root.style.top = a + "px"
    }
    ;
    D.prototype.unsetOffset = function() {
        this.root.style.top = ""
    }
    ;
    D.prototype.isRTL = function() {
        return document.documentElement.dir === Rc.RTL
    }
    ;
    var Vc = {};
    Vc.Jumplinks = D;
    var kb, Wc = kb || (kb = {});
    Wc.ROOT = "glue-modal";
    Wc.CLOSE_BTN = "glue-modal__close-btn";
    Wc.CLOSING = "glue-modal-closing";
    Wc.OPEN = "glue-modal-open";
    Wc.NO_SCROLL = "glue-no-scroll";
    var Xc, Yc = Xc || (Xc = {});
    Yc.OPENED_EVENT = "GlueModal:opened";
    Yc.CLOSED_EVENT = "GlueModal:closed";
    var Zc, $c = Zc || (Zc = {});
    $c.MISSING_CLOSE_BUTTON = "The close button is missing from the modal.";
    $c.MODAL_NOT_OPEN = "The modal is not open.";
    __wpcc.f.inherits(mb, k);
    mb.prototype.init = function() {
        if (!this.closeBtn)
            throw Error(Zc.MISSING_CLOSE_BUTTON);
    }
    ;
    mb.prototype.focusFirstDescendant = function(a) {
        for (var b = 0; b < a.children.length; b++) {
            var c = a.children[b];
            if (this.attemptFocus(c) || this.focusFirstDescendant(c))
                return !0
        }
        return !1
    }
    ;
    mb.prototype.focusLastDescendant = function(a) {
        for (var b = a.children.length - 1; 0 <= b; b--) {
            var c = a.children[b];
            if (this.attemptFocus(c) || this.focusLastDescendant(c))
                return !0
        }
        return !1
    }
    ;
    mb.prototype.attemptFocus = function(a) {
        if (!ia(a))
            return !1;
        this.ignoreFocusChange = !0;
        try {
            a.focus()
        } catch (b) {
            throw Error("" + b);
        }
        this.ignoreFocusChange = !1;
        return a === document.activeElement
    }
    ;
    mb.prototype.trapFocus = function(a) {
        this.ignoreFocusChange || (this.root.contains(a.target) ? this.lastFocus = a.target : (this.focusFirstDescendant(this.root),
        this.lastFocus === document.activeElement && this.focusLastDescendant(this.root),
        this.lastFocus = document.activeElement))
    }
    ;
    mb.prototype.open = function() {
        this.root.classList.add(kb.OPEN);
        this.emit(Xc.OPENED_EVENT, {});
        this.closeBtn.addEventListener(t.CLICK, this.handleCloseBtnClick);
        document.body.classList.add(kb.NO_SCROLL);
        document.addEventListener(t.KEYDOWN, this.handleKeyDown);
        document.addEventListener(t.FOCUS, this.handleFocus, !0);
        this.focusFirst ? this.focusFirst.focus() : this.focusFirstDescendant(this.root);
        this.ariaHideElements()
    }
    ;
    mb.prototype.close = function() {
        this.root.classList.remove(kb.OPEN);
        this.root.classList.add(kb.CLOSING);
        this.emit(Xc.CLOSED_EVENT, {});
        document.body.classList.remove(kb.NO_SCROLL);
        document.removeEventListener(t.FOCUS, this.handleFocus, !0);
        this.closeBtn.removeEventListener(t.CLICK, this.handleCloseBtnClick);
        document.removeEventListener(t.KEYDOWN, this.handleKeyDown);
        this.root.addEventListener(t.TRANSITIONEND, this.handleTransitionEnds);
        this.ariaUnhideElements()
    }
    ;
    mb.prototype.ariaHideElements = function() {
        for (var a = this, b = this.root; b && b.parentNode; )
            [].concat(__wpcc.f.arrayFromIterable(b.parentNode.children)).forEach(function(c) {
                c !== b && "true" !== c.getAttribute("aria-hidden") && (a.ariaHiddenElements.push(c),
                c.setAttribute("aria-hidden", "true"))
            }),
            b = b.parentNode
    }
    ;
    mb.prototype.ariaUnhideElements = function() {
        this.ariaHiddenElements.forEach(function(a) {
            a.removeAttribute("aria-hidden")
        });
        this.ariaHiddenElements = []
    }
    ;
    __wpcc.f.inherits(ob, k);
    ob.prototype.initInteractiveElements = function(a, b) {
        var c = this;
        this.buttonEl = a ? a : this.root.querySelector("." + nb.TRIGGER);
        if (!this.buttonEl)
            throw Error(pb.MISSING_TRIGGER);
        if (b)
            this.dialogEl = b;
        else if (this.dialogEl = this.root.querySelector("." + nb.DIALOG),
        !this.dialogEl)
            throw Error(pb.MISSING_DIALOG);
        this.closeEl = this.dialogEl.querySelector("." + nb.CLOSE_BTN);
        this.buttonClickHandler = function(d) {
            c.handleButtonClick(d)
        }
        ;
        this.keyDownHandler = function(d) {
            c.handleKeyDown(d)
        }
        ;
        this.buttonEl.addEventListener(t.CLICK, this.buttonClickHandler);
        this.buttonEl.addEventListener(t.KEYDOWN, this.keyDownHandler);
        this.dialogEl.addEventListener(t.KEYDOWN, this.keyDownHandler);
        this.dialogEl.addEventListener(t.CLICK, this.buttonClickHandler);
        this.setDefaultElAttr()
    }
    ;
    ob.prototype.destroy = function() {
        this.close();
        this.buttonEl.removeEventListener(t.CLICK, this.buttonClickHandler);
        document.removeEventListener(t.CLICK, this.clickOutsideDialogHandler);
        this.dialogEl.removeEventListener(t.KEYDOWN, this.keyDownHandler);
        this.buttonEl.removeEventListener(t.KEYDOWN, this.keyDownHandler);
        this.dialogEl.removeEventListener(t.CLICK, this.buttonClickHandler);
        this.mouseLeaveHandler && (this.buttonEl.removeEventListener(t.MOUSELEAVE, this.mouseLeaveHandler),
        this.dialogEl.removeEventListener(t.MOUSELEAVE, this.mouseLeaveHandler));
        this.blurHandler && window.removeEventListener(t.BLUR, this.blurHandler)
    }
    ;
    ob.prototype.checkEventFromChild = function(a, b) {
        return b.target instanceof Node && a.contains(b.target)
    }
    ;
    ob.prototype.getAttributeOptions = function() {
        var a = nb.PREFIX
          , b = pb
          , c = b.PLACEMENT;
        b = b.FOCUS;
        var d = {}
          , e = this.root.getAttribute(a + "-" + c);
        a = this.root.getAttribute(a + "-" + b);
        e && (d[c] = e);
        a && (d[b] = e);
        return d
    }
    ;
    ob.prototype.setDefaultElAttr = function() {
        this.dialogEl.setAttribute(x.ROLE, A.DIALOG);
        this.dialogEl.tabIndex = B.NOT_TABBABLE;
        this.dialogEl.setAttribute(x.ARIA_HIDDEN, "true");
        this.buttonEl.setAttribute(x.ROLE, A.BUTTON);
        this.buttonEl.tabIndex = B.TABBABLE;
        this.buttonEl.setAttribute(x.ARIA_EXPANDED, "false");
        this.buttonEl.setAttribute(x.ARIA_CONTROLS, this.dialogEl.id);
        this.dialogEl.id && 0 !== this.dialogEl.id.length || (this.dialogEl.id = "glue-popover-" + Math.round(99999999 * Math.random()));
        this.closeEl && (this.closeEl.setAttribute(x.ROLE, A.BUTTON),
        this.closeEl.tabIndex = B.TABBABLE)
    }
    ;
    ob.prototype.setElementFocus = function() {
        var a;
        this.options.takeFocus && (null === (a = this.buttonEl) || void 0 === a ? void 0 : a.focus())
    }
    ;
    ob.prototype.open = function() {
        this.isOpen() || (this.dialogEl.setAttribute(x.ARIA_HIDDEN, "false"),
        this.buttonEl.setAttribute(x.ARIA_EXPANDED, "true"),
        this.root.classList.add(nb.IS_SHOWN),
        this.dialogEl.classList.add(nb.DIALOG + "--" + this.options.placement),
        document.addEventListener(t.CLICK, this.clickOutsideDialogHandler),
        this.setElementFocus(),
        this.emit(cc.OPEN_EVENT, {}, !0))
    }
    ;
    ob.prototype.close = function() {
        this.isOpen() && (this.dialogEl.setAttribute(x.ARIA_HIDDEN, "true"),
        this.buttonEl.setAttribute(x.ARIA_EXPANDED, "false"),
        this.root.classList.remove(nb.IS_SHOWN),
        this.closeEl && this.closeEl.classList.remove(nb.IS_SHOWN),
        this.setElementFocus(),
        this.emit(cc.CLOSE_EVENT, {}, !0),
        0 < this.copyEls.length && this.copyEls.forEach(function(a) {
            var b = document.createEvent("CustomEvent");
            b.initEvent(cc.CLOSE_EVENT, !1, !1);
            a.dispatchEvent(b)
        }),
        document.removeEventListener(t.CLICK, this.clickOutsideDialogHandler))
    }
    ;
    ob.prototype.isOpen = function() {
        return this.root.classList.contains(nb.IS_SHOWN)
    }
    ;
    ob.prototype.handleButtonClick = function(a) {
        this.isOpen() ? this.checkEventFromChild(this.buttonEl, a) ? this.close() : !this.closeEl || !this.checkEventFromChild(this.closeEl, a) || a.key && a.key !== n.ENTER && a.key !== n.SPACE || this.close() : this.open()
    }
    ;
    ob.prototype.handleKeyDown = function(a) {
        var b, c;
        a.stopPropagation();
        a.key === n.ESC ? this.close() : this.closeEl && this.checkEventFromChild(this.closeEl, a) ? (a.preventDefault(),
        this.close()) : this.isOpen() && this.checkEventFromChild(this.buttonEl, a) && a.shiftKey && a.key === n.TAB ? (a.preventDefault(),
        this.close()) : this.isOpen() || !this.checkEventFromChild(this.buttonEl, a) || a.key !== n.ENTER && a.key !== n.SPACE || (a.preventDefault(),
        null === (b = this.closeEl) || void 0 === b ? void 0 : b.classList.add(nb.IS_SHOWN),
        this.open());
        a.key === n.TAB && this.checkEventFromChild(this.dialogEl, a) && (null === (c = this.closeEl) || void 0 === c ? void 0 : c.classList.add(nb.IS_SHOWN))
    }
    ;
    ob.prototype.handleClickOutsideDialog = function(a) {
        var b = a.target instanceof Node && this.root.contains(a.target);
        this.checkEventFromChild(this.dialogEl, a) || this.checkEventFromChild(this.buttonEl, a) || b || a.type !== t.CLICK || this.close()
    }
    ;
    __wpcc.f.global.Object.defineProperties(ob, {
        defaults: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return {
                    placement: Yb.BOTTOM,
                    takeFocus: !0
                }
            }
        }
    });
    qb.prototype.scrollToId = function(a, b) {
        a = void 0 === a ? "" : a;
        if ("" === a || "#" === a)
            var c = document.body.firstElementChild;
        else if (c = document.getElementById(a),
        !c)
            throw Error('The target element for id "' + a + '" does not exist.');
        this.currentScrollElementId = a;
        this.currentScrollElement = c;
        b = Object.assign({}, this.globalConfig, b);
        this.scrollManager.startScroll(this.currentScrollElement, b);
        a = window.scrollY;
        b.hash && window.location.hash !== "#" + this.currentScrollElementId && (window.location.hash = "#" + this.currentScrollElementId);
        document.documentElement.scrollTop = a
    }
    ;
    qb.prototype.destroy = function() {
        this.scrollManager.destroy()
    }
    ;
    var rb, ad = rb || (rb = {});
    ad.ROOT = "glue-tooltip";
    ad.ANIMATION = "glue-tooltip__content--animation";
    ad.CONTENT = "glue-tooltip__content";
    ad.LINK = "glue-tooltip__link";
    ad.RICH = "glue-tooltip--rich";
    ad.SHOW_TOOLTIP = "glue-tooltip__content--shown";
    ad.TRIGGER = "glue-tooltip__trigger";
    var bd, cd = bd || (bd = {});
    cd.CLOSE_EVENT = "gluetooltipclose";
    cd.SHOW_EVENT = "gluetooltipshow";
    var sb, dd = sb || (sb = {});
    dd.MISSING_CONTENT = "The tooltip content element is missing";
    dd.MISSING_TRIGGER = "The tooltip trigger element is missing";
    dd.INCORRECT_POSITION = "data-glue-tooltip-auto-position attribute only accepts true or false value.";
    var ed;
    (ed || (ed = {})).AUTO_POSITION = "glueTooltipAutoPosition";
    __wpcc.f.inherits(tb, k);
    tb.prototype.isTooltipChild = function(a) {
        return this.trigger.contains(a) || this.content.contains(a) ? !0 : !1
    }
    ;
    tb.prototype.getAttributeOptions = function(a) {
        var b = {}
          , c = this.root.dataset;
        if (ed.AUTO_POSITION in c) {
            if ("false" === c[ed.AUTO_POSITION])
                c = !1;
            else if ("true" === c[ed.AUTO_POSITION])
                c = !0;
            else
                throw Error(sb.INCORRECT_POSITION);
            b.autoPosition = c
        }
        return Object.assign({}, tb.defaultOptions, a, b)
    }
    ;
    tb.prototype.registerEvents = function() {
        this.root.addEventListener(t.MOUSEENTER, this.handleOpen, !0);
        this.root.addEventListener(t.FOCUS, this.handleOpen, !0);
        this.root.addEventListener(t.MOUSELEAVE, this.handleClose, !0);
        this.root.addEventListener(t.BLUR, this.handleClose, !0);
        document.addEventListener(t.KEYUP, this.handleKeyup);
        document.addEventListener(t.CLICK, this.handleClick);
        window.addEventListener(t.RESIZE, this.handleResize);
        this.content.addEventListener(t.TRANSITIONSTART, this.handleTransitionStart);
        this.content.addEventListener(t.TRANSITIONEND, this.handleTransitionEnd)
    }
    ;
    tb.prototype.getScrollableParent = function(a) {
        var b = getComputedStyle(a);
        return a === document.documentElement ? document.body : this.isOverflowSet(b.overflow) || this.isOverflowSet(b.overflowY) || this.isOverflowSet(b.overflowX) ? a : this.getScrollableParent(a.parentElement)
    }
    ;
    tb.prototype.isOverflowSet = function(a) {
        return /auto|hidden|scroll|overlay/.test(a)
    }
    ;
    tb.prototype.getTooltipPosition = function() {
        this.content.style.left = "0px";
        this.content.style.top = "0px";
        var a = this.getScrollableParent(this.root)
          , b = a.getBoundingClientRect()
          , c = "body" === a.tagName.toLowerCase() ? window.innerHeight : b.height;
        a = this.trigger.getBoundingClientRect();
        var d = this.content.getBoundingClientRect()
          , e = getComputedStyle(this.content)
          , g = !1
          , h = !1
          , l = Math.round(a.left + (a.width - d.width) / 2);
        l < b.left && (h = !0,
        l = 0);
        l + d.width > b.width && (g = !0,
        l = -d.width + a.width);
        b = a.top + a.height;
        b + d.height >= c ? (b = e.marginTop.slice(0, -2),
        b = -d.height - Number(b)) : (b = e.marginTop.slice(0, -2),
        b = a.height + Number(b));
        h || g || (l = a.width > d.width ? (a.width - d.width) / 2 : -((d.width - a.width) / 2));
        return [l, b]
    }
    ;
    tb.prototype.open = function() {
        if (!this.content.classList.contains(rb.SHOW_TOOLTIP)) {
            if (!0 === this.options.autoPosition) {
                var a = __wpcc.f.makeIterator(this.getTooltipPosition())
                  , b = a.next().value;
                a = a.next().value;
                this.content.style.left = b + "px";
                this.content.style.top = a + "px"
            }
            this.content.classList.add(rb.SHOW_TOOLTIP);
            this.content.setAttribute(x.ARIA_HIDDEN, "false");
            this.emit(bd.SHOW_EVENT, {}, !0)
        }
    }
    ;
    tb.prototype.close = function() {
        this.content.classList.contains(rb.SHOW_TOOLTIP) && (this.content.classList.remove(rb.SHOW_TOOLTIP),
        this.content.setAttribute(x.ARIA_HIDDEN, "true"),
        this.emit(bd.CLOSE_EVENT, {}, !0))
    }
    ;
    tb.prototype.destroy = function() {
        this.close();
        this.content.removeAttribute(x.ARIA_HIDDEN);
        this.trigger.removeAttribute(x.ARIA_CONTROLS);
        this.root.removeEventListener(t.MOUSEENTER, this.handleOpen, !0);
        this.root.removeEventListener(t.FOCUS, this.handleOpen, !0);
        this.root.removeEventListener(t.MOUSELEAVE, this.handleClose, !0);
        this.root.removeEventListener(t.BLUR, this.handleClose, !0);
        document.removeEventListener(t.KEYUP, this.handleKeyup);
        document.removeEventListener(t.CLICK, this.handleClick);
        window.removeEventListener(t.RESIZE, this.handleResize);
        this.content.removeEventListener(t.TRANSITIONSTART, this.handleTransitionStart);
        this.content.removeEventListener(t.TRANSITIONEND, this.handleTransitionEnd)
    }
    ;
    __wpcc.f.global.Object.defineProperties(tb, {
        defaultOptions: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return {
                    autoPosition: !0
                }
            }
        }
    });
    var E, fd = E || (E = {});
    fd.SOCIAL_ROOT = "glue-social";
    fd.SOCIAL_GROUP = "glue-social__group";
    fd.SOCIAL_LIST = "glue-social__list";
    fd.SOCIAL_TITLE = "glue-social__title";
    fd.SOCIAL_TITLE_ZIPPY = "glue-social__title--zippy";
    fd.COPY_ROOT = "glue-social__copy";
    fd.COPY_BUTTON = "glue-social__copy-btn";
    fd.COPY_INPUT = "glue-social__copy-input";
    fd.PANELS_VARIANT = "glue-social--zippy";
    fd.POPOVER_ROOT = "glue-social__popover";
    fd.POPOVER_CLOSE = "glue-social__close-btn";
    fd.POPOVER_DIALOG = "glue-social__dialog";
    fd.POPOVER_TRIGGER = "glue-social__icon-trigger";
    fd.PERSISTENT_VARIANT = "glue-social--persistent";
    fd.TOOLTIP_ROOT = "glue-social__tooltip";
    fd.TOOLTIP_TRIGGER = "glue-social__tooltip-trigger";
    fd.TOOLTIP_CONTENT = "glue-social__tooltip-content";
    __wpcc.f.inherits(ub, k);
    ub.prototype.initialize = function() {
        this.addCopy();
        this.addPopover();
        this.addPanels();
        this.addTooltips()
    }
    ;
    ub.prototype.destroy = function() {
        this.removeCopy();
        this.removePopover();
        this.removePanels();
        this.removeTooltips()
    }
    ;
    ub.prototype.addCopy = function() {
        var a, b, c = null === (a = this.copyEl) || void 0 === a ? void 0 : a.querySelector("." + E.COPY_INPUT);
        a = null === (b = this.copyEl) || void 0 === b ? void 0 : b.querySelector("." + E.COPY_BUTTON);
        this.copyEl && c && a && (this.copyEl.classList.add(ra.ROOT),
        c.classList.add(ra.VALUE),
        a.classList.add(ra.BUTTON),
        a.setAttribute(x.ARIA_LIVE, "polite"),
        this.copyComponent = new sa(this.copyEl))
    }
    ;
    ub.prototype.removeCopy = function() {
        var a, b, c, d = null === (a = this.copyEl) || void 0 === a ? void 0 : a.querySelector("." + E.COPY_INPUT);
        a = null === (b = this.copyEl) || void 0 === b ? void 0 : b.querySelector("." + E.COPY_BUTTON);
        this.copyEl && d && a && (null === (c = this.copyComponent) || void 0 === c ? void 0 : c.destroy(),
        this.copyEl.classList.remove(ra.ROOT),
        d.classList.remove(ra.VALUE),
        a.classList.remove(ra.BUTTON),
        a.removeAttribute(x.ARIA_LIVE))
    }
    ;
    ub.prototype.addPopover = function() {
        var a, b, c, d = null === (a = this.popoverEl) || void 0 === a ? void 0 : a.querySelector("." + E.POPOVER_TRIGGER);
        a = null === (b = this.popoverEl) || void 0 === b ? void 0 : b.querySelector("." + E.POPOVER_DIALOG);
        b = null === (c = this.popoverEl) || void 0 === c ? void 0 : c.querySelector("." + E.POPOVER_CLOSE);
        this.popoverEl && d && a && b && (this.popoverEl.classList.add(nb.ROOT),
        this.popoverEl.dataset[bc.TRIGGER] = "click",
        d.classList.add(nb.TRIGGER),
        a.classList.add(nb.DIALOG),
        b.classList.add(nb.CLOSE_BTN),
        this.popoverComponent = new ob(this.popoverEl))
    }
    ;
    ub.prototype.removePopover = function() {
        var a, b, c, d, e = null === (a = this.popoverEl) || void 0 === a ? void 0 : a.querySelector("." + E.POPOVER_TRIGGER);
        a = null === (b = this.popoverEl) || void 0 === b ? void 0 : b.querySelector("." + E.POPOVER_DIALOG);
        b = null === (c = this.popoverEl) || void 0 === c ? void 0 : c.querySelector("." + E.POPOVER_CLOSE);
        this.popoverEl && e && a && b && (null === (d = this.popoverComponent) || void 0 === d ? void 0 : d.destroy(),
        this.popoverEl.classList.remove(nb.ROOT),
        delete this.popoverEl.dataset[bc.TRIGGER],
        e.classList.remove(nb.TRIGGER),
        a.classList.remove(nb.DIALOG),
        b.classList.remove(nb.CLOSE_BTN))
    }
    ;
    ub.prototype.addPanels = function() {
        if (this.root.classList.contains(E.PANELS_VARIANT) && this.panelsEl && this.panelTitleEl && this.socialListEl) {
            var a = this.root.id ? this.root.id : "social-panels";
            this.root.classList.add("" + w.GROUP);
            this.root.dataset[ya.KEY] = a;
            this.panelsEl.classList.add("" + w.PANEL);
            var b = document.createElement("button");
            b.className = this.panelTitleEl.className;
            b.classList.add("" + w.BUTTON);
            b.id = a + "-toggle";
            b.dataset[ya.TOGGLEFOR] = a + "-content";
            b.replaceChildren.apply(b, __wpcc.f.arrayFromIterable(this.panelTitleEl.childNodes));
            this.panelTitleEl.replaceChildren();
            this.panelTitleEl.className = "";
            this.panelTitleEl.appendChild(b);
            this.panelTitleEl.classList.add("" + w.TOGGLE);
            b = document.createElement("div");
            b.classList.add("" + w.CONTENT);
            this.panelsEl.appendChild(b);
            b.appendChild(this.socialListEl);
            b.id = a + "-content";
            this.expanelsComponent = new Da(this.root)
        }
    }
    ;
    ub.prototype.removePanels = function() {
        var a;
        if (this.root.classList.contains(E.PANELS_VARIANT) && this.panelsEl && this.panelTitleEl && this.socialListEl) {
            null === (a = this.expanelsComponent) || void 0 === a ? void 0 : a.destroy();
            a = this.panelsEl.querySelector("." + w.CONTENT);
            this.panelsEl.appendChild(this.socialListEl);
            null === a || void 0 === a ? void 0 : a.remove();
            if (a = this.panelTitleEl.querySelector("." + w.BUTTON))
                a.classList.remove("" + w.BUTTON),
                this.panelTitleEl.className = a.className,
                this.panelTitleEl.replaceChildren.apply(this.panelTitleEl, __wpcc.f.arrayFromIterable(a.childNodes)),
                a.remove();
            this.root.classList.remove("" + w.GROUP);
            delete this.root.dataset[ya.KEY];
            this.panelsEl.classList.remove("" + w.PANEL)
        }
    }
    ;
    ub.prototype.addTooltips = function() {
        for (var a = __wpcc.f.makeIterator(this.tooltipEls), b = a.next(); !b.done; b = a.next()) {
            b = b.value;
            var c = b.querySelector("." + E.TOOLTIP_TRIGGER)
              , d = b.querySelector("." + E.TOOLTIP_CONTENT);
            c && d && (b.classList.add("" + rb.ROOT),
            b.dataset[ed.AUTO_POSITION] = "false",
            c.classList.add("" + rb.TRIGGER),
            d.classList.add("" + rb.CONTENT),
            d.setAttribute(x.ROLE, A.TOOLTIP),
            this.tooltipComponents.push(new tb(b)))
        }
    }
    ;
    ub.prototype.removeTooltips = function() {
        for (; 0 < this.tooltipComponents.length; ) {
            var a = this.tooltipComponents.pop();
            null === a || void 0 === a ? void 0 : a.destroy()
        }
        a = __wpcc.f.makeIterator(this.tooltipEls);
        for (var b = a.next(); !b.done; b = a.next()) {
            b = b.value;
            var c = b.querySelector("." + E.TOOLTIP_TRIGGER)
              , d = b.querySelector("." + E.TOOLTIP_CONTENT);
            b.classList.remove("" + rb.ROOT);
            delete b.dataset[ed.AUTO_POSITION];
            null === c || void 0 === c ? void 0 : c.classList.remove("" + rb.TRIGGER);
            null === d || void 0 === d ? void 0 : d.classList.remove("" + rb.CONTENT);
            null === d || void 0 === d ? void 0 : d.removeAttribute(x.ROLE)
        }
    }
    ;
    var gd;
    (gd || (gd = {})).CURRENT = "glueTabsCurrent";
    var vb, hd = vb || (vb = {});
    hd.ROOT = "glue-tabs";
    hd.TABLIST = "glue-tabs__tablist";
    hd.TAB = "glue-tab";
    hd.PANEL = "glue-tabs__panel";
    hd.IS_SHOWN = "glue-is-shown";
    var id, jd = id || (id = {});
    jd.TRIGGER = "trigger";
    jd.PLACEMENT = "placement";
    jd.FOCUS = "takeFocus";
    jd.ROOT = "root";
    jd.MISSING_TABLIST = "Tablist element is missing.";
    jd.MISSING_TABS = "Tabs element is missing.";
    jd.MISSING_TABPANELS = "Tab panels element is missing.";
    jd.DATA_CURRENT = "currentTab";
    __wpcc.f.inherits(wb, k);
    wb.prototype.validateElements = function() {
        if (!this.tablist)
            throw Error("" + id.MISSING_TABLIST);
        if (0 === this.tabs.length)
            throw Error("" + id.MISSING_TABS);
        if (0 === this.tabPanels.length)
            throw Error("" + id.MISSING_TABPANELS);
    }
    ;
    wb.prototype.getDataAttribute = function() {
        return Number(this.root.dataset[gd.CURRENT])
    }
    ;
    wb.prototype.render = function() {
        var a = this.getActiveTab();
        if (!(1 > a || a > this.totalTabs)) {
            for (var b = __wpcc.f.makeIterator(this.tabs.entries()), c = b.next(); !c.done; c = b.next()) {
                var d = __wpcc.f.makeIterator(c.value);
                c = d.next().value;
                d = d.next().value;
                c = c === a - 1;
                d.tabIndex = c ? B.TABBABLE : B.NOT_TABBABLE;
                d.setAttribute(x.ARIA_SELECTED, c.toString())
            }
            b = __wpcc.f.makeIterator(this.tabPanels);
            for (c = b.next(); !c.done; c = b.next())
                c.value.classList.remove(Jc.SHOW);
            this.tabPanels[a - 1].classList.add(Jc.SHOW)
        }
    }
    ;
    wb.prototype.setAriaRoles = function() {
        var a = this;
        this.tablist.setAttribute(x.ROLE, A.TABLIST);
        this.tabs.forEach(function(b, c) {
            b.setAttribute(x.ROLE, A.TAB);
            b.setAttribute(x.ARIA_CONTROLS, a.tabPanels[c].id)
        });
        this.tabPanels.forEach(function(b, c) {
            b.setAttribute(x.ARIA_LABELLEDBY, a.tabs[c].id);
            b.setAttribute(x.ROLE, A.TABPANEL)
        })
    }
    ;
    wb.prototype.removeAriaRoles = function() {
        this.tablist.removeAttribute(x.ROLE);
        for (var a = __wpcc.f.makeIterator(this.tabs), b = a.next(); !b.done; b = a.next())
            b = b.value,
            b.removeAttribute(x.ROLE),
            b.removeAttribute(x.ARIA_CONTROLS),
            b.removeAttribute(x.TAB_INDEX),
            b.removeAttribute(x.ARIA_SELECTED);
        a = __wpcc.f.makeIterator(this.tabPanels);
        for (b = a.next(); !b.done; b = a.next())
            b = b.value,
            b.removeAttribute(x.ARIA_LABELLEDBY),
            b.removeAttribute(x.ROLE)
    }
    ;
    wb.prototype.setActiveTab = function(a) {
        this.observer.data.currentTab = a
    }
    ;
    wb.prototype.getActiveTab = function() {
        return this.observer.data.currentTab
    }
    ;
    wb.prototype.isValidTab = function(a) {
        return Number.isInteger(a) && 1 <= a && a <= this.totalTabs
    }
    ;
    wb.prototype.destroy = function() {
        this.observer.unlisten("currentTab", this.currentTabChangeHandler);
        this.tablist.removeEventListener(t.CLICK, this.handleClick);
        this.tablist.removeEventListener(t.KEYDOWN, this.handleKeydown);
        this.removeAriaRoles();
        this.observer = new ka({
            currentTab: 1
        })
    }
    ;
    var F, kd = F || (F = {});
    kd.TABPANEL_CONTAINER = "glue-tabpanels";
    kd.TABPANEL_PAGE_LIST = "glue-tabpanels__page-list";
    kd.TABPANEL_PANEL_LIST = "glue-tabpanels__panel-list";
    kd.TABPANEL_PANEL_TOGGLE = "glue-tabpanels__panel-toggle";
    kd.TABPANEL_PANEL_BUTTON = "glue-tabpanels__panel-button";
    kd.TABPANEL_PANEL_TITLE = "glue-tabpanels__panel-title";
    kd.TABPANEL_PANEL_CONTENT = "glue-tabpanels__panel-content";
    kd.TABPANEL_ELEMENT_SCOPE = "glue-tabpanels__scope";
    kd.PANELS_TOGGLE_HEADER = "glue-expansion-panel__button-header";
    kd.TABSET_ROOT = "glue-tabs";
    kd.TABSET_TABLIST = "glue-tabs__tablist";
    kd.TABSET_TAB = "glue-tab";
    kd.TABSET_BUTTON = "glue-tabs__button";
    kd.TABSET_PANELCONTAINER = "glue-tabs__panelgroup";
    kd.TABSET_PAGE = "glue-tabs__panel";
    var ld, md = ld || (ld = {});
    md.PANELS_KEY = "glueExpansionPanelsKey";
    md.TOGGLEFOR = "glueExpansionPanelToggleFor";
    md.INITIAL = "glueExpansionPanelInitial";
    var nd, od = nd || (nd = {});
    od.MISSING_PAGE_LIST = "No element with glue-tabpanels__page-list class was found. TabPanels requires a Panels Page List";
    od.MISSING_PANEL_LIST = "No element with glue-tabpanels__panel-list class was found. TabPanels requires a Panel List";
    __wpcc.f.inherits(xb, k);
    xb.prototype.initialize = function() {
        var a = this;
        if (!this.tablistEl)
            throw Error(nd.MISSING_PAGE_LIST);
        if (!this.panelsEl)
            throw Error(nd.MISSING_PANEL_LIST);
        this.configureTabs(!0);
        this.tabsComponent = new wb(this.root);
        this.currentTab = this.tabsComponent.observer.data.currentTab;
        this.options.isResponsive && (this.responsiveTabsMonitor = new u({
            breakpoint: this.options.panelsBreakpoints,
            enter: function() {
                a.tabsComponent && (a.currentTab = a.tabsComponent.observer.data.currentTab,
                a.tabsComponent.destroy(),
                a.tabsComponent = void 0);
                a.configureTabs(!1);
                a.configureExpansionPanels(!0, a.currentTab);
                a.panelsComponent = new Da(a.panelsEl,a.panelsoptions)
            },
            leave: function() {
                a.panelsComponent && (a.panelsComponent.destroy(),
                a.panelsComponent = void 0);
                a.configureExpansionPanels(!1, 0);
                a.configureTabs(!0);
                a.tabsComponent = new wb(a.root);
                a.tabsComponent.observer.data.currentTab = a.currentTab
            }
        }))
    }
    ;
    xb.prototype.configureTabs = function(a) {
        this.root.classList.toggle(F.TABSET_ROOT, a);
        this.tablistEl.classList.toggle(F.TABSET_TABLIST, a);
        this.tablistEl.classList.add("" + F.TABPANEL_ELEMENT_SCOPE);
        var b = Array.from(this.tablistEl.querySelectorAll("." + F.TABPANEL_ELEMENT_SCOPE + " > div"));
        b = __wpcc.f.makeIterator(b);
        for (var c = b.next(); !c.done; c = b.next())
            c.value.classList.toggle(F.TABSET_TAB, a);
        this.tablistEl.classList.remove("" + F.TABPANEL_ELEMENT_SCOPE);
        this.panelsEl.classList.toggle(F.TABSET_PANELCONTAINER, a);
        this.panelsEl.classList.add("" + F.TABPANEL_ELEMENT_SCOPE);
        b = Array.from(this.panelsEl.querySelectorAll("." + F.TABPANEL_ELEMENT_SCOPE + " > div"));
        b = __wpcc.f.makeIterator(b);
        for (c = b.next(); !c.done; c = b.next())
            c.value.classList.toggle(F.TABSET_PAGE, a);
        this.panelsEl.classList.remove("" + F.TABPANEL_ELEMENT_SCOPE)
    }
    ;
    xb.prototype.configureExpansionPanels = function(a, b) {
        this.panelsEl.classList.toggle(w.GROUP, a);
        var c = 1;
        this.panelsEl.classList.add("" + F.TABPANEL_ELEMENT_SCOPE);
        var d = Array.from(this.panelsEl.querySelectorAll("." + F.TABPANEL_ELEMENT_SCOPE + " > div"));
        d = __wpcc.f.makeIterator(d);
        for (var e = d.next(); !e.done; e = d.next()) {
            e = e.value;
            e.classList.add("" + F.TABPANEL_ELEMENT_SCOPE);
            e.classList.toggle(w.PANEL, a);
            e.removeAttribute(x.ARIA_HIDDEN);
            var g = e.querySelector("." + F.TABPANEL_ELEMENT_SCOPE + " > ." + F.TABPANEL_PANEL_TOGGLE);
            g.classList.toggle(w.TOGGLE, a);
            var h = g.querySelector("." + F.TABPANEL_ELEMENT_SCOPE + " > ." + F.TABPANEL_PANEL_TOGGLE + " > :first-child");
            h.classList.toggle(w.BUTTON, a);
            g.querySelector("." + F.TABPANEL_ELEMENT_SCOPE + " ." + F.TABPANEL_PANEL_TITLE).classList.toggle(w.HEADER_TEXT, a);
            g = e.querySelector("." + F.TABPANEL_ELEMENT_SCOPE + " > ." + F.TABPANEL_PANEL_CONTENT);
            g.classList.toggle(w.CONTENT, a);
            a ? (h.dataset[ld.TOGGLEFOR] = g.id,
            c === b && (g.dataset[ld.INITIAL] = "expanded"),
            c++) : (delete h.dataset[ld.TOGGLEFOR],
            delete g.dataset[ld.INITIAL]);
            e.classList.remove("" + F.TABPANEL_ELEMENT_SCOPE)
        }
        this.panelsEl.classList.remove("" + F.TABPANEL_ELEMENT_SCOPE)
    }
    ;
    xb.prototype.destroy = function() {
        this.panelsComponent && (this.panelsComponent.destroy(),
        this.panelsComponent = void 0,
        this.configureExpansionPanels(!1, 0));
        this.tabsComponent && (this.tabsComponent.destroy(),
        this.tabsComponent = void 0,
        this.configureTabs(!1));
        this.responsiveTabsMonitor && this.responsiveTabsMonitor.destroy()
    }
    ;
    __wpcc.f.global.Object.defineProperties(xb, {
        defaults: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return {
                    panelsBreakpoints: ["sm"],
                    isPanelsAnimated: !0,
                    isResponsive: !0,
                    panelsCount: 2
                }
            }
        }
    });
    var pd;
    (pd || (pd = {})).IFRAME_SCRIPT_URL = "https://www.youtube.com/iframe_api";
    var qd, rd = qd || (qd = {});
    rd.VIDEO_ID = "glueYtVideoVid";
    rd.PLAYER_ID = "glueYtPlayerId";
    rd.HEIGHT = "glueYtVideoHeight";
    rd.WIDTH = "glueYtVideoWidth";
    rd.PLAYER_VARS = "glueYtVideoPlayerVars";
    var zb, sd = zb || (zb = {});
    sd.ASSET = "glue-video__preview-container";
    sd.DURATION = "glue-video__timestamp-duration";
    sd.HIDE_ELEMENT = "glue-video--hidden";
    sd.IMAGE_CONTAINER = "glue-video__preview-image";
    sd.TIMESTAMP = "glue-video__timestamp";
    sd.TIMESTAMP_SHOW = "glue-video__timestamp--visible";
    sd.VIDEO = "glue-video__container";
    sd.INLINE_VIDEO = "glue-video__preview-container--inline";
    sd.LABEL = "glue-video__label";
    var Ab;
    (Ab || (Ab = {})).MISSING_VIDEO = "The video element is missing";
    yb.getManager = function() {
        yb.instance || (yb.instance = new yb);
        return yb.instance
    }
    ;
    yb.destroyManager = function() {
        yb.instance = void 0
    }
    ;
    yb.prototype.registerYtPlayer = function(a, b) {
        this.videoObjects.set(a, b)
    }
    ;
    yb.prototype.unregisterYtPlayer = function(a) {
        var b = this.videoObjects.get(a);
        null === b || void 0 === b ? void 0 : b.destroy();
        this.videoObjects.delete(a);
        0 === this.videoObjects.size && yb.destroyManager()
    }
    ;
    yb.prototype.getYtPlayer = function(a) {
        return this.videoObjects.get(a)
    }
    ;
    yb.instance = void 0;
    __wpcc.f.inherits(Bb, k);
    Bb.prototype.destroy = function() {
        k.prototype.destroy.call(this);
        this.destroyPlayer()
    }
    ;
    Bb.prototype.initId = function() {
        var a = this.video.getAttribute("id") || "";
        this.isValidPlayerId(a) && (a = this.options.playerId || "youtube-player-" + Math.round(Math.random() * Math.pow(10, 6)),
        this.video.setAttribute("id", a));
        this.id = a
    }
    ;
    Bb.prototype.refreshPlayerOptions = function(a) {
        this.destroyPlayer();
        this.options = Object.assign({}, Bb.defaultOptions, a);
        this.options.playerId && (this.id = this.options.playerId);
        this.initializeVideo()
    }
    ;
    Bb.prototype.setPlayerOptions = function(a) {
        var b = {}
          , c = this.video.dataset;
        qd.VIDEO_ID in c && (b.videoId = c[qd.VIDEO_ID]);
        qd.PLAYER_ID in c && (b.playerId = c[qd.PLAYER_ID]);
        qd.HEIGHT in c && (b.height = c[qd.HEIGHT]);
        qd.WIDTH in c && (b.width = c[qd.WIDTH]);
        qd.PLAYER_VARS in c && (b.playerVars = c[qd.PLAYER_VARS]);
        a = Object.assign({}, Bb.defaultOptions, a, b);
        a.playerId && (this.id = a.playerId);
        return a
    }
    ;
    Bb.prototype.initializeVideo = function() {
        var a = this;
        this.isValidPlayerId(this.id) && this.initId();
        this.options.playerId = this.id;
        var b = this.video.appendChild(document.createElement("div"));
        if (this.options.events)
            if (void 0 === this.options.events.onReady)
                this.options.events.onReady = function() {
                    a.setVideoTimestamp()
                }
                ;
            else {
                var c = this.options.events.onReady;
                this.options.events.onReady = function(d) {
                    a.setVideoTimestamp();
                    c(d)
                }
            }
        b = new window.YT.Player(b,this.options);
        this.manager.registerYtPlayer(this.id, b)
    }
    ;
    Bb.prototype.setVideoTimestamp = function() {
        var a, b, c, d = this.root.querySelector("." + zb.DURATION);
        if (d) {
            var e = this.getPlayer();
            e = null !== (a = null === e || void 0 === e ? void 0 : e.getDuration()) && void 0 !== a ? a : 0;
            a = (new Date(1E3 * e)).toISOString();
            a = "00" === a.substring(11, 13) ? a.substring(14, 19) : a.substring(11, 19);
            d.textContent = a;
            null === (c = null === (b = this.trigger) || void 0 === b ? void 0 : b.querySelector("." + zb.TIMESTAMP)) || void 0 === c ? void 0 : c.classList.add("" + zb.TIMESTAMP_SHOW)
        }
    }
    ;
    Bb.prototype.getPlayer = function() {
        return this.manager.getYtPlayer(this.id)
    }
    ;
    Bb.prototype.destroyPlayer = function() {
        this.manager.unregisterYtPlayer(this.id)
    }
    ;
    Bb.prototype.getPlayerId = function() {
        this.isValidPlayerId(this.id) && this.initId();
        return this.id
    }
    ;
    Bb.prototype.isValidPlayerId = function(a) {
        return /^[\s\xa0]*$/.test(a)
    }
    ;
    __wpcc.f.global.Object.defineProperties(Bb, {
        defaultOptions: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return {
                    playerId: "",
                    width: "",
                    height: "",
                    videoId: "",
                    playerVars: {},
                    events: {}
                }
            }
        }
    });
    var M = {};
    M.AmbientVideo = da;
    M.Banner = fa;
    M.Carousel = v;
    M.Copy = sa;
    M.Debounce = ta;
    M.ExpansionPanels = Da;
    M.Filter = La;
    M.FilterStateManager = Ea;
    M.Footer = Ma;
    M.Header = C;
    M.Jumplinks = D;
    M.Modal = mb;
    M.Popover = ob;
    M.ResponsiveMonitor = u;
    M.ScrollManager = hb;
    M.SmoothScroll = qb;
    M.Social = ub;
    M.TabPanels = xb;
    M.Tabs = wb;
    M.Tooltip = tb;
    M.YoutubeVideo = Bb;
    var td = {};
    Object.defineProperty(td, "__esModule", {
        value: !0
    });
    td.AddLinkClass = void 0;
    var ud, vd = ud || (ud = {});
    vd.BLANK_STRING = "_blank";
    vd.HREF_STRING = "href";
    vd.TARGET_STRING = "target";
    vd.CLASS_INTERNAL_LINK = "theme-word";
    vd.CLASS_EXTERNAL_LINK = "external-link";
    vd.DEFAULT_CLASS_LINK = "main-outline";
    vd.DATA_SET_CLASS_LINK = "classLink";
    vd.SELECTOR_ANCHOR = "a";
    td.AddLinkClass = function() {
        this.externaLinksRegexp = "^(https?:)?//(?!" + location.host + ")";
        this.externalRegexp = RegExp(this.externaLinksRegexp)
    }
    ;
    td.AddLinkClass.getInstance = function() {
        td.AddLinkClass.instance || (td.AddLinkClass.instance = new td.AddLinkClass);
        return td.AddLinkClass.instance
    }
    ;
    td.AddLinkClass.prototype.addClass = function(a) {
        var b = this
          , c = a.dataset[ud.DATA_SET_CLASS_LINK] || ud.DEFAULT_CLASS_LINK;
        a.querySelectorAll(ud.SELECTOR_ANCHOR).forEach(function(d) {
            b.externalRegexp.test(d.getAttribute(ud.HREF_STRING)) ? (d.classList.add(ud.CLASS_EXTERNAL_LINK),
            d.setAttribute(ud.TARGET_STRING, ud.BLANK_STRING)) : d.classList.add(ud.CLASS_INTERNAL_LINK);
            c && d.classList.add(c)
        })
    }
    ;
    var wd = {};
    Object.defineProperty(wd, "__esModule", {
        value: !0
    });
    wd.AnalyticsGlobal = void 0;
    var xd = {
        TRACKING_PREFIX: "data-g",
        ATTRIBUTES_STRING: "attributes",
        CLICK_STRING: "click"
    };
    wd.AnalyticsGlobal = function(a) {
        a.addEventListener(xd.CLICK_STRING, function() {
            return wd.AnalyticsGlobal.handleSendDataLayer(a)
        })
    }
    ;
    wd.AnalyticsGlobal.getTrackingAttributes = function(a) {
        var b = {};
        a.getAttributeNames().forEach(function(c) {
            if (0 === c.indexOf(xd.TRACKING_PREFIX)) {
                var d = c.replace(xd.TRACKING_PREFIX + "-", "");
                b[d] = a.getAttribute(c)
            }
        });
        return b
    }
    ;
    wd.AnalyticsGlobal.handleSendDataLayer = function(a, b) {
        b = void 0 === b ? {} : b;
        a = wd.AnalyticsGlobal.getTrackingAttributes(a);
        window.dataLayer.push({
            event: a.event,
            event_params: Object.assign(Object.assign({}, a), b)
        }, {
            event_params: void 0
        })
    }
    ;
    var yd = {};
    Object.defineProperty(yd, "__esModule", {
        value: !0
    });
    yd.BirthdayDoodle = void 0;
    var zd, Ad = zd || (zd = {});
    Ad.BDAY_BUTTON = ".bday-button";
    Ad.SELECT_MONTH = ".select--month";
    Ad.MONTH_TARGET = ".calendar-month";
    Ad.SELECT_DAY = ".select--day";
    Ad.DAY_TARGET = ".calendar-day-layer--selected";
    Ad.CHANGE = "change";
    Ad.CLICK = "click";
    yd.BirthdayDoodle = function(a) {
        var b = a.querySelector(zd.BDAY_BUTTON)
          , c = a.querySelector(zd.SELECT_MONTH)
          , d = a.querySelector(zd.MONTH_TARGET)
          , e = a.querySelectorAll(".select--month option")
          , g = a.querySelector(zd.SELECT_DAY)
          , h = a.querySelector(zd.DAY_TARGET)
          , l = 1
          , m = 1;
        null === c || void 0 === c ? void 0 : c.addEventListener(zd.CHANGE, function(p) {
            var q = parseInt(p.currentTarget.value);
            d.innerHTML = e[q - 1].dataset.month;
            l = q;
            m = 1;
            h.innerHTML = "01";
            p = "";
            q = (new Date(2E3,q,0)).getDate();
            for (var r = 1; r < q + 1; r++)
                p += '<option value="' + r + '">' + (10 > r ? "0" + r : r) + "</option>";
            g.innerHTML = p
        });
        null === g || void 0 === g ? void 0 : g.addEventListener(zd.CHANGE, function(p) {
            p = p.currentTarget;
            var q = 10 > parseInt(p.value) ? "0" + p.value : p.value;
            h.innerHTML = q;
            m = parseInt(p.value)
        });
        null === b || void 0 === b ? void 0 : b.addEventListener(zd.CLICK, function() {
            window.open("/search/?date_like_month=" + l + "&date_like_day=" + m)
        })
    }
    ;
    var Bd = {};
    Object.defineProperty(Bd, "__esModule", {
        value: !0
    });
    Bd.CardsStack = void 0;
    var Cd, Dd = Cd || (Cd = {});
    Dd.CLASS_ACTIVE = "active";
    Dd.CLASS_SWAP = "swap";
    Dd.EVENT_CLICK = "click";
    Dd.SELECTOR_BUTTON_CHANGE = ".cards-stack-content-change";
    Dd.SELECTOR_CONTENT_CARD = ".content-card";
    Dd.SELECTOR_CONTENT_LIST = ".cards-stack-content-list";
    Dd.SELECTOR_DISCARD_CARD = ".discard-card";
    Bd.CardsStack = function(a) {
        var b = this;
        this.currentQuote = 0;
        this.cardsStackElement = a;
        this.contentCardElement = this.cardsStackElement.querySelector(Cd.SELECTOR_CONTENT_LIST);
        this.discardCardElement = this.cardsStackElement.querySelector(Cd.SELECTOR_DISCARD_CARD);
        this.cardsStackQuoteList = [].concat(__wpcc.f.arrayFromIterable(this.contentCardElement.querySelector(Cd.SELECTOR_CONTENT_CARD).children));
        (this.buttonChange = a.querySelector(Cd.SELECTOR_BUTTON_CHANGE)) && this.buttonChange.addEventListener(Cd.EVENT_CLICK, function() {
            return b.swapCards()
        });
        this.cardsStackQuoteList[this.currentQuote].classList.add(Cd.CLASS_ACTIVE);
        this.lenghtQuoteList = this.cardsStackQuoteList.length
    }
    ;
    Bd.CardsStack.prototype.swapCards = function() {
        var a = this;
        this.buttonChange.disabled = !0;
        this.buttonChange.classList.add(Cd.CLASS_SWAP);
        this.cardsStackQuoteList[this.currentQuote].classList.remove(Cd.CLASS_ACTIVE);
        var b = this.cardsStackQuoteList[this.currentQuote].cloneNode(!0);
        b.classList.add(Cd.CLASS_ACTIVE);
        this.discardCardElement.innerHTML = "";
        this.discardCardElement.appendChild(b);
        this.currentQuote = this.currentQuote == this.cardsStackQuoteList.length - 1 ? 1 : this.currentQuote + 1;
        this.cardsStackQuoteList[this.currentQuote].classList.add(Cd.CLASS_ACTIVE);
        this.contentCardElement.classList.add(Cd.CLASS_SWAP);
        setTimeout(function() {
            a.contentCardElement.classList.remove(Cd.CLASS_SWAP);
            a.buttonChange.disabled = !1;
            a.buttonChange.classList.remove(Cd.CLASS_SWAP);
            a.buttonChange.focus()
        }, 550)
    }
    ;
    var Ed = {}, Fd = this && Ed.__classPrivateFieldSet || function(a, b, c, d, e) {
        if ("m" === d)
            throw new TypeError("Private method is not writable");
        if ("a" === d && !e)
            throw new TypeError("Private accessor was defined without a setter");
        if ("function" === typeof b ? a !== b || !e : !b.has(a))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return "a" === d ? e.call(a, c) : e ? e.value = c : b.set(a, c),
        c
    }
    , Gd = this && Ed.__classPrivateFieldGet || function(a, b, c, d) {
        if ("a" === c && !d)
            throw new TypeError("Private accessor was defined without a getter");
        if ("function" === typeof b ? a !== b || !d : !b.has(a))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return "m" === c ? d : "a" === c ? d.call(a) : d ? d.value : b.get(a)
    }
    , Hd;
    Object.defineProperty(Ed, "__esModule", {
        value: !0
    });
    Ed.DoodlesModal = void 0;
    var Id, Jd = Id || (Id = {});
    Jd.GLUE_MODAL_OPENED = "GlueModal:opened";
    Jd.MODAL_CLOSE_BTN = "modal-close-btn";
    Ed.DoodlesModal = function(a, b) {
        Hd.set(this, void 0);
        (a = document.querySelector("." + a)) && Fd(this, Hd, new M.Modal(a,b), "f");
        null === a || void 0 === a ? void 0 : a.addEventListener(Id.GLUE_MODAL_OPENED, this.handleOpenModal)
    }
    ;
    Ed.DoodlesModal.prototype.open = function() {
        Gd(this, Hd, "f") && Gd(this, Hd, "f").open()
    }
    ;
    Ed.DoodlesModal.prototype.handleOpenModal = function() {
        setTimeout(function() {
            var a;
            null === (a = document.getElementById(Id.MODAL_CLOSE_BTN)) || void 0 === a ? void 0 : a.focus()
        }, 1)
    }
    ;
    Hd = new WeakMap;
    var Kd = {}, Ld = this && Kd.__classPrivateFieldSet || function(a, b, c, d, e) {
        if ("m" === d)
            throw new TypeError("Private method is not writable");
        if ("a" === d && !e)
            throw new TypeError("Private accessor was defined without a setter");
        if ("function" === typeof b ? a !== b || !e : !b.has(a))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return "a" === d ? e.call(a, c) : e ? e.value = c : b.set(a, c),
        c
    }
    , Md = this && Kd.__classPrivateFieldGet || function(a, b, c, d) {
        if ("a" === c && !d)
            throw new TypeError("Private accessor was defined without a getter");
        if ("function" === typeof b ? a !== b || !d : !b.has(a))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return "m" === c ? d : "a" === c ? d.call(a) : d ? d.value : b.get(a)
    }
    , Nd, Od;
    Object.defineProperty(Kd, "__esModule", {
        value: !0
    });
    Kd.EditorialModal = void 0;
    var Pd, Qd = Pd || (Pd = {});
    Qd.EDITORIAL_MODAL = ".editorial-modal";
    Qd.JUMPLINKS_LIST_ITEM_BTN = ".jumplinks__list-item-btn";
    Qd.CLICK = "click";
    Qd.DATA_TARGET = "data-target";
    Qd.SVG = "svg";
    Qd.SMOOTH = "smooth";
    Qd.START = "start";
    Kd.EditorialModal = function(a, b) {
        var c, d;
        var e = Ed.DoodlesModal.call(this, a, b) || this;
        Nd.set(e, null);
        Od.set(e, void 0);
        Ld(e, Nd, document.querySelector(Pd.EDITORIAL_MODAL), "f");
        Ld(e, Od, null === (c = Md(e, Nd, "f")) || void 0 === c ? void 0 : c.querySelectorAll(Pd.JUMPLINKS_LIST_ITEM_BTN), "f");
        null === (d = Md(e, Od, "f")) || void 0 === d ? void 0 : d.forEach(function(g) {
            return g.addEventListener(Pd.CLICK, function(h) {
                return e._handleJumplinkClick(h)
            })
        });
        return e
    }
    ;
    __wpcc.f.inherits(Kd.EditorialModal, Ed.DoodlesModal);
    Kd.EditorialModal.prototype._handleJumplinkClick = function(a) {
        var b, c, d = null === (b = a.target) || void 0 === b ? void 0 : b.getAttribute(Pd.DATA_TARGET);
        b = document.getElementById(d);
        null === (c = Md(this, Od, "f")) || void 0 === c ? void 0 : c.forEach(function(e) {
            if (e = e.querySelector(Pd.SVG))
                e.style.opacity = "0"
        });
        null === b || void 0 === b ? void 0 : b.scrollIntoView({
            behavior: Pd.SMOOTH,
            block: Pd.START
        });
        a.target.querySelector(Pd.SVG).style.opacity = 1
    }
    ;
    Nd = new WeakMap;
    Od = new WeakMap;
    var Rd = {};
    Object.defineProperty(Rd, "__esModule", {
        value: !0
    });
    Rd.ContentBlock = void 0;
    var Ud, Vd = Ud || (Ud = {});
    Vd.TRIGGER_MODAL_BTN = ".trigger-modal-btn";
    Vd.EDITORIAL_MODAL = "editorial-modal";
    Vd.CLICK = "click";
    Rd.ContentBlock = function() {
        this.init()
    }
    ;
    Rd.ContentBlock.prototype.init = function() {
        document.querySelectorAll(Ud.TRIGGER_MODAL_BTN).forEach(function(a) {
            var b = new Kd.EditorialModal(Ud.EDITORIAL_MODAL,a);
            a.addEventListener(Ud.CLICK, function() {
                b.open()
            })
        })
    }
    ;
    var N = {}
      , Wd = this && N.__awaiter || function(a, b, c, d) {
        function e(g) {
            return g instanceof c ? g : new c(function(h) {
                h(g)
            }
            )
        }
        return new (c || (c = Promise))(function(g, h) {
            function l(q) {
                try {
                    p(d.next(q))
                } catch (r) {
                    h(r)
                }
            }
            function m(q) {
                try {
                    p(d["throw"](q))
                } catch (r) {
                    h(r)
                }
            }
            function p(q) {
                q.done ? g(q.value) : e(q.value).then(l, m)
            }
            p((d = d.apply(a, b || [])).next())
        }
        )
    }
    ;
    Object.defineProperty(N, "__esModule", {
        value: !0
    });
    N.APIDoodles = N.Constants = void 0;
    var Xd = N.Constants || (N.Constants = {});
    Xd.API_PATH = "/live/api/v1/doodles";
    Xd.URL_BASE = "https://live-api-dot-doodles-website-prod.uc.r.appspot.com";
    Xd.URL_LOCALHOST = "localhost";
    Xd.PARAM_COLOR = "color_tags";
    Xd.PARAM_LIMIT = "limit";
    Xd.PARAM_NATIONALITY = "nationality_tags";
    Xd.PARAM_ART_STYLE_TAGS = "art_style_tags";
    Xd.PARAM_ORDER_BY = "order_by";
    Xd.PARAM_PAGE = "page";
    Xd.PARAM_SORT_DIRECTION = "sort_direction";
    Xd.PARAM_TITLE = "title_like";
    Xd.PARAM_YEAR = "date_like_year";
    Xd.PARAM_MONTH = "date_like_month";
    Xd.PARAM_DAY = "date_like_day";
    Xd.VALUE_SORT_DIRECTION_ASC = "asc";
    Xd.VALUE_SORT_DIRECTION_DESC = "desc";
    Xd.VALUE_ORDER_BY_DATE = "date";
    Xd.REQUEST_METHOD_METHOD_GET = "GET";
    Xd.REQUEST_METHOD_MODE_CORS = "cors";
    Xd.REQUEST_METHOD_CREDENTIALS_INCLUDE = "include";
    N.APIDoodles = function(a) {
        this.defaultParams = [[N.Constants.PARAM_ORDER_BY, N.Constants.VALUE_ORDER_BY_DATE], [N.Constants.PARAM_SORT_DIRECTION, N.Constants.VALUE_SORT_DIRECTION_DESC], [N.Constants.PARAM_PAGE, "1"], [N.Constants.PARAM_LIMIT, "16"]];
        this.defaultOptions = {
            method: N.Constants.REQUEST_METHOD_METHOD_GET,
            mode: N.Constants.REQUEST_METHOD_MODE_CORS,
            credentials: N.Constants.REQUEST_METHOD_CREDENTIALS_INCLUDE
        };
        this.url = a ? new URL(a) : this.setDefaultParams()
    }
    ;
    N.APIDoodles.prototype.setDefaultParams = function() {
        var a = new URL(N.Constants.API_PATH,"localhost" == window.location.hostname ? N.Constants.URL_BASE : window.location.origin);
        this.defaultParams.forEach(function(b) {
            return a.searchParams.set(b[0], b[1])
        });
        return this.url = a
    }
    ;
    N.APIDoodles.prototype.setParams = function(a) {
        var b = this;
        a && a.length && a.forEach(function(c) {
            Array.isArray(c[1]) ? c[1].forEach(function(d) {
                return b.addParam(c[0], d)
            }) : b.addParam(c[0], c[1])
        })
    }
    ;
    N.APIDoodles.prototype.fetch = function() {
        return Wd(this, void 0, void 0, function b() {
            var c = this, d;
            return __wpcc.f.generator.createGenerator(b, function(e) {
                d = c;
                return e.return(new Promise(function(g) {
                    grecaptcha.enterprise.ready(function() {
                        return Wd(d, void 0, void 0, function l() {
                            var m, p = this, q;
                            return __wpcc.f.generator.createGenerator(l, function(r) {
                                switch (r.nextAddress) {
                                case 1:
                                    return r.yield(grecaptcha.enterprise.execute("6Ld2VXUnAAAAAOmlNm2Lz5S1UddvU-mZWr4raoPI", {
                                        action: "get_api_data"
                                    }), 2);
                                case 2:
                                    return m = r.yieldResult,
                                    p.addParam("recaptcha_token", m),
                                    r.yield(fetch(p.url.toString(), p.defaultOptions), 3);
                                case 3:
                                    return q = r.yieldResult,
                                    r.yield(q.json(), 4);
                                case 4:
                                    p.response = {
                                        json: r.yieldResult,
                                        status: q.status
                                    },
                                    g(p),
                                    r.jumpToEnd()
                                }
                            })
                        })
                    })
                }
                ))
            })
        })
    }
    ;
    N.APIDoodles.prototype.addParam = function(a, b) {
        this.defaultParams.find(function(c) {
            return c[0] == a
        }) ? this.url.searchParams.set(a, b) : this.url.searchParams.append(a, b)
    }
    ;
    N.APIDoodles.prototype.getParamsArray = function() {
        return [].concat(__wpcc.f.arrayFromIterable(this.url.searchParams.entries()))
    }
    ;
    var Yd = {};
    Object.defineProperty(Yd, "__esModule", {
        value: !0
    });
    Yd.DiscoverColor = void 0;
    var Zd, $d = Zd || (Zd = {});
    $d.BY_COLOR_CHECK = ".by-color .check";
    $d.EVENT_CLICK = "click";
    $d.COLOR_PICKER = ".color-picker";
    $d.FILL = "fill";
    $d.LABEL_TEXT = ".label__text";
    $d.PATH = "path";
    $d.SELECTED = "selected";
    $d.SHOW = "show";
    $d.SELECTOR_RANDOM_BUTTON = ".discover-color_random-button";
    Yd.DiscoverColor = function(a) {
        var b = this;
        this.currentPosition = 0;
        this.initialLoad = !0;
        this.discoverColorElement = a;
        this.labelsElements = [].concat(__wpcc.f.arrayFromIterable(this.discoverColorElement.querySelectorAll(Zd.LABEL_TEXT)));
        this.checkMarkElement = this.discoverColorElement.querySelector(Zd.BY_COLOR_CHECK);
        this.colorPickerElement = this.discoverColorElement.querySelector(Zd.COLOR_PICKER);
        this.buttonRandomElement = this.discoverColorElement.querySelector(Zd.SELECTOR_RANDOM_BUTTON);
        this.slicesElements = [].concat(__wpcc.f.arrayFromIterable(this.colorPickerElement.querySelectorAll(Zd.PATH)));
        this.sliceDegree = 360 / this.slicesElements.length;
        this.observer = new Tb.Observer({
            colorPicked: null,
            locked: !1,
            showResults: !1
        });
        this.slicesElements.forEach(function(c, d) {
            c.addEventListener(Zd.EVENT_CLICK, function() {
                return b.handleColor(c, d)
            })
        });
        this.buttonRandomElement.addEventListener(Zd.EVENT_CLICK, function(c) {
            return b.handleRandomClick(c)
        })
    }
    ;
    Yd.DiscoverColor.prototype.handleColor = function(a, b) {
        var c;
        if (!this.observer.data.locked) {
            var d = Number(this.colorPickerElement.style.transform.split("(")[1].split("deg")[0]);
            this.initialLoad || this.currentPosition != b || (this.observer.data.showResults = !0);
            this.initialLoad = !1;
            if (this.currentPosition > b) {
                var e = this.currentPosition - b;
                e = e < this.slicesElements.length / 2 ? this.sliceDegree * e : -(this.sliceDegree * (this.slicesElements.length - e))
            } else
                e = b - this.currentPosition,
                e = e < this.slicesElements.length / 2 ? -(this.sliceDegree * e) : this.sliceDegree * (this.slicesElements.length - e);
            this.currentPosition = b;
            this.colorPickerElement.style.transform = "rotate(" + (d + e) + "deg)";
            this.slicesElements.forEach(function(g) {
                g.classList.remove(Zd.SELECTED)
            });
            a.classList.add(Zd.SELECTED);
            this.labelsElements.forEach(function(g) {
                g.classList.remove(Zd.SHOW)
            });
            null === (c = this.discoverColorElement.querySelector(Zd.LABEL_TEXT + "--" + a.dataset.color)) || void 0 === c ? void 0 : c.classList.add(Zd.SHOW);
            this.checkMarkElement.style.backgroundColor = a.getAttribute(Zd.FILL);
            this.observer.data.colorPicked = a.dataset.color
        }
    }
    ;
    Yd.DiscoverColor.prototype.handleRandomClick = function(a) {
        a.preventDefault();
        this.observer.data.locked || this.slicesElements[Math.floor(Math.random() * this.slicesElements.length)].dispatchEvent(new Event(Zd.EVENT_CLICK))
    }
    ;
    Yd.DiscoverColor.prototype.reset = function() {
        this.handleColor(this.slicesElements[0], 0)
    }
    ;
    var ae = {};
    Object.defineProperty(ae, "__esModule", {
        value: !0
    });
    ae.Discover = void 0;
    var O, P = O || (O = {});
    P.CLASS_ACTIVE = "active";
    P.CLASS_SHOW = "show";
    P.EVENT_CHANGE = "change";
    P.EVENT_CLICK = "click";
    P.OBSERVER_COLOR = "colorPicked";
    P.SCROLL_BEHAVIOR_SMOOTH = "smooth";
    P.SCROLL_BLOCK_CENTER = "center";
    P.SCROLL_BLOCK_START = "start";
    P.SELECTOR_CARD_TEMPLATE = "#discover-card-template";
    P.SELECTOR_DISCOVER_COLOR = ".discover-color";
    P.SELECTOR_CTA_ALL_RESULTS = ".cta-container .cta";
    P.SELECTOR_DOODLE_TYPE = ".doodle-type";
    P.SELECTOR_DOODLES_CONTAINER = ".doodles-container";
    P.SELECTOR_DOODLES_CONTAINER_CLOSE = ".doodles-container__close-button";
    P.SELECTOR_DOODLES_CONTAINER_CLOSE_LABEL = ".doodles-container__close-button-label";
    P.SELECTOR_DOODLES_CONTAINER_DOODLES = ".doodles-container__list";
    P.SELECTOR_DOODLES_CONTAINER_DOODLES_EMPTY = ".doodles-container__empty";
    P.SELECTOR_DOODLES_CONTAINER_DOODLES_LOADING = ".doodles-container__loading";
    P.SELECTOR_TEMPLATE_DATE = ".doodle-date";
    P.SELECTOR_TEMPLATE_EVENT = ".doodle-event";
    P.SELECTOR_TEMPLATE_IMG = "img";
    P.SELECTOR_TEMPLATE_LINK = "a.doodle-cta";
    P.SELECTOR_TEMPLATE_LINK_ANALYTICS_URL = "data-g-cta_url";
    P.SELECTOR_TEMPLATE_LINK_ANALYTICS_TEMPLATE_POSITION = "data-g-template_position";
    P.SELECTOR_TYPE_CONTAINER = ".type-container";
    P[P.DOODLES_TO_GET = 3] = "DOODLES_TO_GET";
    ae.Discover = function(a) {
        var b = this;
        this.firstFetch = !0;
        this.discoverModule = a;
        this.templateDoodleCard = (new DOMParser).parseFromString(this.discoverModule.querySelector(O.SELECTOR_CARD_TEMPLATE).innerHTML, "text/html").childNodes[0];
        this.doodlesContainerElement = this.discoverModule.querySelector(O.SELECTOR_DOODLES_CONTAINER);
        this.ctaShowAllElement = this.discoverModule.querySelector(O.SELECTOR_CTA_ALL_RESULTS);
        this.discoverModule.querySelector(O.SELECTOR_DOODLES_CONTAINER_CLOSE).addEventListener(O.EVENT_CLICK, function() {
            b.doodlesContainerElement.classList.remove(O.CLASS_ACTIVE)
        });
        this.discoverColor = {
            element: this.discoverModule.querySelector(O.SELECTOR_DISCOVER_COLOR)
        };
        this.discoverColor.object = new Yd.DiscoverColor(this.discoverColor.element);
        this.discoverColor.object.observer.listen(O.OBSERVER_COLOR, function() {
            return b.handleFetchDoodles({
                byColor: b.discoverColor.object.observer.data[O.OBSERVER_COLOR]
            })
        });
        this.discoverColor.object.observer.listen("showResults", function() {
            return b.showResultsColorHandle()
        });
        this.typeContainerElements = [].concat(__wpcc.f.arrayFromIterable(this.discoverModule.querySelectorAll(O.SELECTOR_TYPE_CONTAINER)));
        this.intersectionObserver = new IntersectionObserver(function(c, d) {
            c.forEach(function(e) {
                e.isIntersecting && (b.discoverColor.object.reset(),
                d.disconnect())
            })
        }
        ,{
            root: null,
            rootMargin: "-50% 0px -50% 0px",
            threshold: 0
        });
        this.intersectionObserver.observe(this.discoverModule)
    }
    ;
    ae.Discover.prototype.handleFetchDoodles = function(a, b) {
        var c = this
          , d = a.byColor;
        b = void 0 === b ? !0 : b;
        a = new N.APIDoodles;
        d && (a.addParam(N.Constants.PARAM_COLOR, d),
        this.discoverColor.object.observer.data.locked = !0);
        a.addParam(N.Constants.PARAM_LIMIT, String(O.DOODLES_TO_GET));
        var e = this.doodlesContainerElement.querySelector(O.SELECTOR_DOODLES_CONTAINER_DOODLES_EMPTY)
          , g = this.doodlesContainerElement.querySelector(O.SELECTOR_DOODLES_CONTAINER_DOODLES)
          , h = this.doodlesContainerElement.querySelector(O.SELECTOR_DOODLES_CONTAINER_DOODLES_LOADING);
        h.classList.add("active");
        e.classList.remove("active");
        for (g.classList.remove("active"); g.firstChild; )
            g.removeChild(g.firstChild);
        a.fetch().then(function(l) {
            h.classList.remove("active");
            200 == l.response.status && 0 < l.response.json.result.length ? (l.response.json.result.forEach(function(m, p) {
                var q = c.templateDoodleCard.cloneNode(!0)
                  , r = q.querySelector(O.SELECTOR_TEMPLATE_LINK);
                r.href = "" + r.getAttribute("data-base-href") + m.name + "/";
                r.setAttribute(O.SELECTOR_TEMPLATE_LINK_ANALYTICS_URL, r.href);
                r.setAttribute(O.SELECTOR_TEMPLATE_LINK_ANALYTICS_TEMPLATE_POSITION, p + 1 + "/" + O.DOODLES_TO_GET);
                r.addEventListener("click", function() {
                    wd.AnalyticsGlobal.handleSendDataLayer(r, {
                        "event-trigger": "click"
                    })
                });
                q.querySelector(O.SELECTOR_TEMPLATE_IMG).src = m.high_res_url;
                q.querySelector(O.SELECTOR_TEMPLATE_IMG).alt = m.title;
                q.querySelector(O.SELECTOR_TEMPLATE_DATE).innerHTML = (new Date(m.run_date_year,m.run_date_month - 1,m.run_date_day)).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    timeZone: "UTC"
                });
                q.querySelector(O.SELECTOR_TEMPLATE_EVENT).innerHTML = m.title;
                g.appendChild(q)
            }),
            g.classList.add("active")) : e.classList.add("active");
            l = ["", ""];
            d && (l = [N.Constants.PARAM_COLOR, d],
            c.discoverColor.object.observer.data.locked = !1);
            c.ctaShowAllElement.href = c.ctaShowAllElement.dataset.path + "?" + l[0] + "=" + l[1];
            b && c.showResults()
        })
    }
    ;
    ae.Discover.prototype.showResults = function() {
        var a = this;
        this.firstFetch ? this.firstFetch = !1 : 600 > window.innerWidth && setTimeout(function() {
            a.doodlesContainerElement.classList.add(O.CLASS_ACTIVE);
            a.discoverModule.scrollIntoView({
                behavior: O.SCROLL_BEHAVIOR_SMOOTH,
                block: O.SCROLL_BLOCK_START
            })
        }, 600)
    }
    ;
    ae.Discover.prototype.showResultsColorHandle = function() {
        this.discoverColor.object.observer.data.showResults && (this.showResults(),
        this.discoverColor.object.observer.data.showResults = !1)
    }
    ;
    var be = {};
    Object.defineProperty(be, "__esModule", {
        value: !0
    });
    be.FAQ = void 0;
    be.FAQ = function(a) {
        a && (this.module = a,
        new M.ExpansionPanels(this.module))
    }
    ;
    var Q = {};
    Object.defineProperty(Q, "__esModule", {
        value: !0
    });
    Q.Carousel = void 0;
    Q.Carousel = function(a, b) {
        Eb.Component.call(this, a);
        var c = this;
        this.dots = [];
        this.slidesPerPage = this.totalPages = 1;
        this.animationEnabled = !0;
        this.slideWidth = this.containerWidth = 0;
        this.isRtl = document.documentElement.dir === K.Strings.RTL;
        this.isShowingNavigation = this.isTabModel = !0;
        this.pagesX = [];
        this.initialTouchPos = null;
        this.isDragging = !1;
        this.lastTouchPos = null;
        this.rafPending = !1;
        this.currentXPosition = 0;
        this.handleCurrentSlideChange = function() {
            c.emit(K.Strings.SLIDE_CHANGE, c.getCurrentSlide());
            c.render()
        }
        ;
        this.handleResize = function() {
            c.animationEnabled = !1;
            c.calculate();
            c.render()
        }
        ;
        this.handleClick = function(d) {
            var e = d.target;
            if (e instanceof HTMLElement || e instanceof window.SVGElement)
                e.closest("." + K.CssClasses.BUTTON_NEXT) === c.nextBtn ? c.next() : e.closest("." + K.CssClasses.BUTTON_PREV) === c.prevBtn ? c.previous() : e instanceof HTMLButtonElement && c.dots.includes(e) ? c.setCurrentPage(Number(e.dataset[K.Strings.DATA_DOT])) : c.isCards && c.observer.data.isDragging && d.preventDefault()
        }
        ;
        this.handleKeydown = function(d) {
            var e = d.code === Jb.Key.LEFT
              , g = d.code === Jb.Key.RIGHT;
            if (e || g)
                e = c.isRtl ? e : g,
                d.target instanceof HTMLButtonElement && c.dots.includes(d.target) ? e ? c.next() : c.previous() : d.target instanceof HTMLElement && c.slides.includes(d.target) && (d = e ? 1 : -1,
                c.setCurrentSlide(c.getCurrentSlide() + d))
        }
        ;
        this.handleTransitionEnd = function(d) {
            d.target === c.slidesContainer && c.options.cyclical && (d = c.getCurrentSlide(),
            d > c.totalPages ? (c.animationEnabled = !1,
            c.setCurrentSlide(d - c.totalPages)) : 1 > d && (c.animationEnabled = !1,
            c.setCurrentSlide(d + c.totalPages)))
        }
        ;
        this.handleGestureStart = function(d) {
            d.preventDefault();
            c.isTouchEvent(d) && 1 < d.touches.length || (window.PointerEvent && d instanceof PointerEvent && d.target instanceof Element ? d.target.setPointerCapture(d.pointerId) : (document.addEventListener(I.EventType.MOUSEMOVE, c.handleGestureMove, !0),
            document.addEventListener(I.EventType.MOUSEUP, c.handleGestureEnd, !0)),
            c.initialTouchPos = c.getGesturePointFromEvent(d),
            c.slidesContainer.style.transition = "initial")
        }
        ;
        this.handleGestureMove = function(d) {
            d.preventDefault();
            c.initialTouchPos && (d = c.getGesturePointFromEvent(d),
            !c.observer.data.isDragging && Math.abs(c.getXDistance(c.initialTouchPos, d)) < K.Numbers.DRAGSTART_THRESHOLD_PX || (c.observer.data.isDragging = !0,
            c.lastTouchPos = d,
            c.rafPending || (c.rafPending = !0,
            window.requestAnimationFrame(function() {
                c.onAnimFrame()
            }))))
        }
        ;
        this.handleGestureEnd = function(d) {
            var e;
            d.preventDefault();
            c.isTouchEvent(d) && 0 < (null === (e = d.touches) || void 0 === e ? void 0 : e.length) || (c.rafPending = !1,
            window.PointerEvent && d instanceof PointerEvent && d.target instanceof Element ? d.target.releasePointerCapture(d.pointerId) : (document.removeEventListener(I.EventType.MOUSEMOVE, c.handleGestureMove, !0),
            document.removeEventListener(I.EventType.MOUSEUP, c.handleGestureEnd, !0)),
            c.updateSwipeRestPosition(),
            c.initialTouchPos = null,
            c.lastTouchPos = null,
            setTimeout(function() {
                c.observer.data.isDragging = !1
            }, 0))
        }
        ;
        this.handleNavigationClickAditionalCard = function(d, e) {
            c.observer.data.isDragging || (d = c.slides.indexOf(e) + 1,
            c.getCurrentSlide() != d && c.setCurrentSlide(d - c.slidesRef.length))
        }
        ;
        this.isCards = this.root.classList.contains(K.CssClasses.CARDS);
        this.viewport = this.root.querySelector("." + K.CssClasses.VIEWPORT);
        this.slidesContainer = this.root.querySelector("." + K.CssClasses.LIST);
        this.slides = Array.from(this.slidesContainer.querySelectorAll("." + K.CssClasses.ITEM));
        this.slidesRef = Array.from(this.slides);
        this.navigation = this.root.querySelector("." + K.CssClasses.NAVIGATION);
        this.prevBtn = this.root.querySelector("." + K.CssClasses.BUTTON_PREV);
        this.nextBtn = this.root.querySelector("." + K.CssClasses.BUTTON_NEXT);
        this.options = Object.assign(Object.assign(Object.assign({}, Q.Carousel.defaults), b), this.getDataAttrs());
        this.observer = new Tb.Observer({
            currentSlide: this.options.currentSlide,
            isDragging: this.isDragging,
            differenceInX: 0
        });
        this.responsiveMonitor = this.isCards ? new Ub.ResponsiveMonitor : null;
        this.setup();
        this.registerEvents()
    }
    ;
    __wpcc.f.inherits(Q.Carousel, Eb.Component);
    Q.Carousel.prototype.setup = function() {
        this.options.peekOut && this.root.classList.add(K.CssClasses.PEEK_OUT);
        1 >= this.slides.length && (this.options.navigation = !1,
        this.options.cyclical = !1);
        this.options.cyclical ? (this.options.cyclicalAditionalCards > this.slides.length && (this.options.cyclicalAditionalCards = this.slides.length),
        this.copyDummySlides()) : this.options.cyclicalAditionalCards = 0;
        this.slidesContainer.setAttribute(G.Attribute.ARIA_LIVE, "polite");
        this.nextBtn.setAttribute(G.Attribute.ARIA_CONTROLS, this.root.id);
        this.prevBtn.setAttribute(G.Attribute.ARIA_CONTROLS, this.root.id);
        this.animationEnabled = !1;
        this.calculate();
        this.currentXPosition = -1 * this.pagesX[this.getCurrentPage()];
        this.render()
    }
    ;
    Q.Carousel.prototype.registerEvents = function() {
        var a = this, b;
        this.root.addEventListener(I.EventType.CLICK, this.handleClick);
        this.root.addEventListener(I.EventType.KEYDOWN, this.handleKeydown);
        this.slidesContainer.addEventListener(I.EventType.TRANSITIONEND, this.handleTransitionEnd);
        window.addEventListener(I.EventType.RESIZE, this.handleResize);
        this.registerTouchEvents();
        this.observer.listen("currentSlide", this.handleCurrentSlideChange);
        null === (b = this.responsiveMonitor) || void 0 === b ? void 0 : b.listen(this.handleResize);
        this.options.navigationClickingCards && this.slides.forEach(function(c) {
            return c.addEventListener(I.EventType.CLICK, function(d) {
                return a.handleNavigationClickAditionalCard(d, c)
            })
        })
    }
    ;
    Q.Carousel.prototype.destroy = function() {
        var a;
        this.root.removeEventListener(I.EventType.CLICK, this.handleClick);
        this.root.removeEventListener(I.EventType.KEYDOWN, this.handleKeydown);
        this.slidesContainer.removeEventListener(I.EventType.TRANSITIONEND, this.handleTransitionEnd);
        window.removeEventListener(I.EventType.RESIZE, this.handleResize);
        this.deregisterTouchEvents();
        this.observer.unlisten("currentSlide", this.handleCurrentSlideChange);
        null === (a = this.responsiveMonitor) || void 0 === a ? void 0 : a.destroy()
    }
    ;
    Q.Carousel.prototype.reset = function() {
        this.setCurrentSlide(this.options.currentSlide)
    }
    ;
    Q.Carousel.prototype.calculate = function() {
        this.isCards ? this.calculateCardsProperties() : this.calculateProperties();
        this.calcScrollValue()
    }
    ;
    Q.Carousel.prototype.calculateProperties = function() {
        this.containerWidth = Cb(getComputedStyle(this.slidesContainer).width);
        this.slideWidth = Cb(getComputedStyle(this.slides[0]).width);
        var a = this.containerWidth / this.slideWidth;
        this.slidesPerPage = 1 - a % 1 < K.Numbers.ROUNDING_THRESHOLD ? Math.ceil(a) : Math.floor(a);
        this.totalPages = Math.ceil(this.slidesRef.length / this.slidesPerPage);
        this.isTabModel = (this.isShowingNavigation = this.options.navigation) && 1 === this.slidesPerPage
    }
    ;
    Q.Carousel.prototype.calculateCardsProperties = function() {
        var a, b = null === (a = this.responsiveMonitor) || void 0 === a ? void 0 : a.getCurrentBreakpoint();
        switch (b) {
        case "sm":
            a = 1;
            break;
        case "md":
            a = Math.max(1, this.options.cardsPerPage - 1);
            break;
        default:
            a = this.options.cardsPerPage
        }
        var c = this.slides.length / a
          , d = Cb(getComputedStyle(this.slidesContainer).gridColumnGap);
        this.slidesContainer.style.width = "calc(" + 100 * c + "% + " + (c - 1) * d + "px)";
        this.slidesContainer.style.gridTemplateColumns = "repeat(" + this.slides.length + ", 1fr)";
        var e = getComputedStyle(this.viewport);
        this.containerWidth = Cb(e.width) + d - Cb(e.paddingLeft) - Cb(e.paddingRight);
        this.slidesPerPage = a;
        this.slideWidth = this.containerWidth / a;
        this.totalPages = Math.ceil(c);
        this.isShowingNavigation = this.options.navigation && (this.options.navigationOnMobile ? !0 : "sm" !== b);
        this.isTabModel = !1
    }
    ;
    Q.Carousel.prototype.render = function() {
        this.renderSlides();
        this.renderButtons();
        this.renderNavigation()
    }
    ;
    Q.Carousel.prototype.getCurrentSlide = function() {
        return this.observer.data.currentSlide
    }
    ;
    Q.Carousel.prototype.getCurrentPage = function() {
        return Math.ceil(this.getCurrentSlide() / this.slidesPerPage)
    }
    ;
    Q.Carousel.prototype.setCurrentSlide = function(a) {
        var b = this.options.cyclical && this.options.animation ? this.options.cyclicalAditionalCards : 0
          , c = 1 - b;
        b = this.slidesRef.length + b;
        this.observer.data.currentSlide = this.options.cyclical ? Db(a, c, b) : Math.max(c, Math.min(b, a))
    }
    ;
    Q.Carousel.prototype.setCurrentPage = function(a) {
        this.setCurrentSlide((a - 1) * this.slidesPerPage + 1)
    }
    ;
    Q.Carousel.prototype.previous = function() {
        var a = this.getCurrentPage() - 1;
        this.setCurrentPage(a)
    }
    ;
    Q.Carousel.prototype.next = function() {
        var a = this.getCurrentPage() + 1;
        this.setCurrentPage(a)
    }
    ;
    Q.Carousel.prototype.renderSlides = function() {
        var a = this;
        this.transit();
        for (var b = Db(this.getCurrentSlide(), 1, this.slidesRef.length) - 1, c = this.getCurrentPage(), d = c - 1, e = document.activeElement instanceof HTMLElement && this.slides.includes(document.activeElement), g = __wpcc.f.makeIterator(this.slidesRef.entries()), h = g.next(); !h.done; h = g.next()) {
            var l = __wpcc.f.makeIterator(h.value);
            h = l.next().value;
            l = l.next().value;
            var m = h === b;
            m || Math.floor(h / this.slidesPerPage) === d || c === this.totalPages && h >= this.slidesRef.length - this.slidesPerPage ? l.removeAttribute(G.Attribute.ARIA_HIDDEN) : l.setAttribute(G.Attribute.ARIA_HIDDEN, "true");
            this.isTabModel ? l.setAttribute(G.Attribute.ROLE, G.Role.TABPANEL) : l.removeAttribute(G.Attribute.ROLE);
            l.tabIndex = m ? G.TabIndex.TABBABLE : G.TabIndex.NOT_TABBABLE;
            m && e && (l.focus({
                preventScroll: !0
            }),
            setTimeout(function() {
                a.viewport.scrollLeft = 0
            }, 0))
        }
        this.removeFocusOnHiddenElements()
    }
    ;
    Q.Carousel.prototype.removeFocusOnHiddenElements = function() {
        var a = Db(this.getCurrentSlide(), 1, this.slidesRef.length) - 1;
        a = this.options.cyclical ? a + 1 : a;
        for (var b = __wpcc.f.makeIterator(this.slides.entries()), c = b.next(); !c.done; c = b.next()) {
            var d = __wpcc.f.makeIterator(c.value);
            c = d.next().value;
            d = d.next().value;
            d = Sb.getFocusableElements(d);
            d = __wpcc.f.makeIterator(d);
            for (var e = d.next(); !e.done; e = d.next())
                e = e.value,
                c === a ? e.removeAttribute(G.Attribute.TAB_INDEX) : e.tabIndex = G.TabIndex.NOT_TABBABLE
        }
    }
    ;
    Q.Carousel.prototype.transit = function() {
        this.animationEnabled && this.options.animation || (this.slidesContainer.style.transition = "initial");
        var a = this.pagesX[this.getCurrentPage()];
        this.slidesContainer.style.transform = "translate3d(" + a + "px, 0, 0)";
        this.currentXPosition = a;
        this.options.animation && !this.animationEnabled && this.turnOnAnimation()
    }
    ;
    Q.Carousel.prototype.turnOnAnimation = function() {
        var a = this;
        this.animationEnabled = !0;
        setTimeout(function() {
            a.slidesContainer.style.transition = ""
        }, 0)
    }
    ;
    Q.Carousel.prototype.renderNavigation = function() {
        if (this.isShowingNavigation) {
            this.root.classList.add(K.CssClasses.HAS_NAVIGATION);
            this.isTabModel ? this.navigation.setAttribute(G.Attribute.ROLE, G.Role.TABLIST) : this.navigation.removeAttribute(G.Attribute.ROLE);
            this.dots.length !== this.totalPages && this.buildNavigation();
            for (var a = Db(this.getCurrentPage(), 1, this.totalPages) - 1, b = document.activeElement instanceof HTMLButtonElement && this.dots.includes(document.activeElement), c = __wpcc.f.makeIterator(this.dots.entries()), d = c.next(); !d.done; d = c.next()) {
                var e = __wpcc.f.makeIterator(d.value);
                d = e.next().value;
                e = e.next().value;
                d = d === a;
                e.classList.toggle(K.CssClasses.ACTIVE, d);
                e.tabIndex = d ? G.TabIndex.TABBABLE : G.TabIndex.NOT_TABBABLE;
                this.isTabModel ? e.setAttribute(G.Attribute.ARIA_SELECTED, "" + d) : e.setAttribute(G.Attribute.ARIA_CURRENT, "" + d);
                d && b && e.focus()
            }
        } else
            this.root.classList.remove(K.CssClasses.HAS_NAVIGATION)
    }
    ;
    Q.Carousel.prototype.renderButtons = function() {
        if (!this.options.cyclical) {
            var a = document.activeElement
              , b = this.getCurrentPage()
              , c = 1 === b;
            b = b === this.totalPages;
            this.prevBtn.classList.toggle(K.CssClasses.INACTIVE, c);
            this.nextBtn.classList.toggle(K.CssClasses.INACTIVE, b);
            b && a === this.nextBtn ? this.prevBtn.focus() : c && a === this.prevBtn && this.nextBtn.focus()
        }
    }
    ;
    Q.Carousel.prototype.buildNavigation = function() {
        for (var a, b; this.dots.length; )
            null === (a = this.dots.pop()) || void 0 === a ? void 0 : a.remove();
        for (a = 0; a < this.totalPages; a++) {
            var c = document.createElement("button");
            c.classList.add(K.CssClasses.NAVIGATION_DOT);
            c.dataset[K.Strings.DATA_DOT] = "" + (a + 1);
            if (this.isTabModel) {
                var d = null === (b = this.slidesRef[a * this.slidesPerPage]) || void 0 === b ? void 0 : b.id;
                c.setAttribute(G.Attribute.ARIA_CONTROLS, d);
                c.setAttribute(G.Attribute.ARIA_LABELLEDBY, d);
                c.setAttribute(G.Attribute.ROLE, G.Role.TAB)
            } else
                d = (this.navigation.dataset[K.Strings.DATA_NAVIGATION_LABEL] || K.Strings.NAVIGATION_LABEL_DEFAULT).replace(K.Strings.NAVIGATION_LABEL_VAR_NAME, "" + (a + 1)),
                c.setAttribute(G.Attribute.ARIA_CONTROLS, this.root.id),
                c.setAttribute(G.Attribute.ARIA_LABEL, d);
            this.navigation.appendChild(c);
            this.dots.push(c)
        }
    }
    ;
    Q.Carousel.prototype.copyDummySlides = function() {
        var a = this;
        if (this.options.cyclicalAditionalCards) {
            var b = this.slides.slice(0, this.options.cyclicalAditionalCards).map(function(d) {
                return a.cloneSlide(d)
            })
              , c = this.slides.slice(-1 * this.options.cyclicalAditionalCards).map(function(d) {
                return a.cloneSlide(d)
            });
            this.slidesContainer.append.apply(this.slidesContainer, __wpcc.f.arrayFromIterable(b));
            this.slidesContainer.prepend.apply(this.slidesContainer, __wpcc.f.arrayFromIterable(c));
            this.slides = [].concat(__wpcc.f.arrayFromIterable(c), __wpcc.f.arrayFromIterable(this.slides), __wpcc.f.arrayFromIterable(b))
        }
    }
    ;
    Q.Carousel.prototype.cloneSlide = function(a) {
        var b = a.cloneNode(!0);
        b.id = a.id + "-copy";
        b.setAttribute(G.Attribute.ARIA_HIDDEN, "true");
        b.tabIndex = G.TabIndex.NOT_TABBABLE;
        b.classList.add(K.CssClasses.ITEM + "__clone");
        return b
    }
    ;
    Q.Carousel.prototype.calcScrollValue = function() {
        var a = this.options.cyclical ? this.options.cyclicalAditionalCards : 0
          , b = this.totalPages + a
          , c = this.isRtl ? 1 : -1;
        this.pagesX = [];
        for (var d = 1 - a; d <= b; d++)
            this.pagesX[d] = (d < b ? (d - 1 + a) * this.slidesPerPage * this.slideWidth : this.slides.length * this.slideWidth - this.containerWidth) * c
    }
    ;
    Q.Carousel.prototype.registerTouchEvents = function() {
        window.PointerEvent ? (this.viewport.addEventListener(I.EventType.POINTERDOWN, this.handleGestureStart, !0),
        this.viewport.addEventListener(I.EventType.POINTERMOVE, this.handleGestureMove, !0),
        this.viewport.addEventListener(I.EventType.POINTERUP, this.handleGestureEnd, !0),
        this.viewport.addEventListener(I.EventType.POINTERCANCEL, this.handleGestureEnd, !0)) : (this.viewport.addEventListener(I.EventType.TOUCHSTART, this.handleGestureStart, !0),
        this.viewport.addEventListener(I.EventType.TOUCHMOVE, this.handleGestureMove, !0),
        this.viewport.addEventListener(I.EventType.TOUCHEND, this.handleGestureEnd, !0),
        this.viewport.addEventListener(I.EventType.TOUCHCANCEL, this.handleGestureEnd, !0),
        this.viewport.addEventListener(I.EventType.MOUSEDOWN, this.handleGestureStart, !0))
    }
    ;
    Q.Carousel.prototype.deregisterTouchEvents = function() {
        window.PointerEvent ? (this.viewport.removeEventListener(I.EventType.POINTERDOWN, this.handleGestureStart, !0),
        this.viewport.removeEventListener(I.EventType.POINTERMOVE, this.handleGestureMove, !0),
        this.viewport.removeEventListener(I.EventType.POINTERUP, this.handleGestureEnd, !0),
        this.viewport.removeEventListener(I.EventType.POINTERCANCEL, this.handleGestureEnd, !0)) : (this.viewport.removeEventListener(I.EventType.TOUCHSTART, this.handleGestureStart, !0),
        this.viewport.removeEventListener(I.EventType.TOUCHMOVE, this.handleGestureMove, !0),
        this.viewport.removeEventListener(I.EventType.TOUCHEND, this.handleGestureEnd, !0),
        this.viewport.removeEventListener(I.EventType.TOUCHCANCEL, this.handleGestureEnd, !0),
        this.viewport.removeEventListener(I.EventType.MOUSEDOWN, this.handleGestureStart, !0))
    }
    ;
    Q.Carousel.prototype.updateSwipeRestPosition = function() {
        var a = this.getXDistance(this.initialTouchPos, this.lastTouchPos);
        this.slidesContainer.style.transition = "";
        Math.abs(a) >= this.containerWidth * K.Numbers.DRAG_THRESHOLD && ((0 < a && !this.isRtl || 0 > a && this.isRtl) && this.next(),
        (0 > a && !this.isRtl || 0 < a && this.isRtl) && this.previous());
        this.transit()
    }
    ;
    Q.Carousel.prototype.getXDistance = function(a, b) {
        return a && b ? a.x - b.x : 0
    }
    ;
    Q.Carousel.prototype.getGesturePointFromEvent = function(a) {
        var b = {
            x: 0,
            y: 0
        };
        this.isTouchEvent(a) ? a.targetTouches && (b.x = a.targetTouches[0].clientX,
        b.y = a.targetTouches[0].clientY) : (b.x = a.clientX,
        b.y = a.clientY);
        return b
    }
    ;
    Q.Carousel.prototype.onAnimFrame = function() {
        this.rafPending && (this.observer.data.differenceInX = this.getXDistance(this.initialTouchPos, this.lastTouchPos),
        this.slidesContainer.style.transform = "translate3d(" + (this.currentXPosition - this.observer.data.differenceInX) + "px, 0, 0)",
        this.rafPending = !1)
    }
    ;
    Q.Carousel.prototype.isTouchEvent = function(a) {
        return window.TouchEvent && a instanceof TouchEvent
    }
    ;
    Q.Carousel.prototype.getDataAttrs = function() {
        for (var a = {}, b = __wpcc.f.makeIterator(Object.keys(Q.Carousel.defaults)), c = b.next(); !c.done; c = b.next()) {
            c = c.value;
            var d = "glueCarousel" + c.toUpperCase().slice(0, 1) + c.slice(1);
            this.root.dataset[d] && ("currentSlide" === c || "cardsPerPage" === c || "cyclicalAditionalCards" === c ? (d = Number(this.root.dataset[d]),
            isNaN(d) || (a[c] = d)) : a[c] = "true" === this.root.dataset[d])
        }
        return a
    }
    ;
    __wpcc.f.global.Object.defineProperties(Q.Carousel, {
        defaults: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return {
                    currentSlide: 1,
                    peekOut: !0,
                    navigation: !0,
                    navigationClickingCards: !1,
                    navigationOnMobile: !1,
                    animation: !0,
                    cyclical: !1,
                    cardsPerPage: 1,
                    cyclicalAditionalCards: 3
                }
            }
        }
    });
    var ce = {};
    Object.defineProperty(ce, "__esModule", {
        value: !0
    });
    ce.Constants = void 0;
    var de = ce.Constants || (ce.Constants = {});
    de.ATTR_DATA_COUNTRIES = "data-countries";
    de.NODE_INTERACTIVE = ".interactive";
    de.NODE_MAP_CHART = ".mapChart";
    de.NODE_CAROUSEL = ".glue-carousel.full-bleed-map-carousel";
    de.PREV_NAV_MOBILE_BUTTON = "prev-full-bleed-map-mobile-btn";
    de.NEXT_NAV_MOBILE_BUTTON = "next-full-bleed-map-mobile-btn";
    de.STYLE_BACKGROUND_TRANSPARENT = "transparent";
    de.STYLE_MAP_MARKERS_COLOR = "#4285f4";
    de.STYLE_GREY_300 = "#dadce0";
    de.STYLE_STROKE_WIDTH = "1";
    de.EVENT_CLICK = "click";
    de.EVENT_RESIZE = "resize";
    de.PROPERTY_BACKGROUND_COLOR = "background-color";
    de.MARKERS_DISPLAY_MODE = "markers";
    var ee = {};
    Object.defineProperty(ee, "__esModule", {
        value: !0
    });
    ee.FullBleedMap = void 0;
    ee.FullBleedMap = function(a) {
        var b;
        this.mapArray = [];
        this.module = a;
        this.map = this.module.querySelector(ce.Constants.NODE_MAP_CHART);
        a = JSON.parse(null === (b = this.map) || void 0 === b ? void 0 : b.getAttribute(ce.Constants.ATTR_DATA_COUNTRIES));
        this.mapArray = [["Lat", "Long", "Value"]].concat(__wpcc.f.arrayFromIterable(a.map(function(d) {
            return [d.latitude, d.longitude, d.doodle_title]
        })));
        google.charts.load("current", {
            packages: ["geochart"]
        });
        google.charts.setOnLoadCallback(this.loadConfig.bind(this));
        a = document.querySelector(ce.Constants.NODE_CAROUSEL);
        var c = null;
        a && (c = new Q.Carousel(a,{
            cardsPerPage: 3,
            navigationOnMobile: !0
        }),
        b = a.querySelector("#" + ce.Constants.PREV_NAV_MOBILE_BUTTON),
        a = a.querySelector("#" + ce.Constants.NEXT_NAV_MOBILE_BUTTON),
        null === b || void 0 === b ? void 0 : b.addEventListener(ce.Constants.EVENT_CLICK, function() {
            null === c || void 0 === c ? void 0 : c.previous()
        }),
        null === a || void 0 === a ? void 0 : a.addEventListener(ce.Constants.EVENT_CLICK, function() {
            null === c || void 0 === c ? void 0 : c.next()
        }))
    }
    ;
    ee.FullBleedMap.prototype.loadConfig = function() {
        var a = this;
        this.data = google.visualization.arrayToDataTable(this.mapArray);
        this.options = {
            backgroundColor: ce.Constants.STYLE_BACKGROUND_TRANSPARENT,
            defaultColor: ce.Constants.STYLE_MAP_MARKERS_COLOR,
            datalessRegionColor: ce.Constants.STYLE_GREY_300,
            displayMode: ce.Constants.MARKERS_DISPLAY_MODE
        };
        this.chart = new google.visualization.GeoChart(this.map);
        google.visualization.events.addListener(this.chart, "ready", this.eraseBorders.bind(this));
        this.drawMap();
        addEventListener(ce.Constants.EVENT_RESIZE, function() {
            a.chart.clearChart();
            a.drawMap()
        })
    }
    ;
    ee.FullBleedMap.prototype.drawMap = function() {
        this.chart.draw(this.data, this.options)
    }
    ;
    ee.FullBleedMap.prototype.eraseBorders = function() {
        var a = this;
        setTimeout(function() {
            a.module.querySelectorAll("path").forEach(function(b) {
                b.style.stroke = ce.Constants.STYLE_GREY_300;
                b.style.strokeWidth = ce.Constants.STYLE_STROKE_WIDTH
            })
        }, 10)
    }
    ;
    var fe = {};
    Object.defineProperty(fe, "__esModule", {
        value: !0
    });
    fe.FullWidthCardList = void 0;
    var ge, he = ge || (ge = {});
    he.CLICK = "click";
    he.ARTIST_CLASS = ".artist";
    he.MORE_CTA_CLASS = ".more-cta";
    he.HIDDEN = "hidden";
    he.HIDDEN_ARTIST_CLASS = ".artist.hidden";
    fe.FullWidthCardList = function(a) {
        var b = parseInt(a.dataset.initial)
          , c = parseInt(a.dataset.show)
          , d = a.querySelectorAll(ge.ARTIST_CLASS)
          , e = a.querySelector(ge.MORE_CTA_CLASS);
        d.forEach(function(g, h) {
            h + 1 > b && g.classList.add(ge.HIDDEN)
        });
        0 === a.querySelectorAll(ge.HIDDEN_ARTIST_CLASS).length && e.classList.add(ge.HIDDEN);
        null === e || void 0 === e ? void 0 : e.addEventListener(ge.CLICK, function() {
            var g = a.querySelectorAll(ge.HIDDEN_ARTIST_CLASS);
            g.forEach(function(h, l) {
                l + 1 <= c && h.classList.remove(ge.HIDDEN)
            });
            g = a.querySelectorAll(ge.HIDDEN_ARTIST_CLASS);
            0 === g.length && e.classList.add(ge.HIDDEN)
        })
    }
    ;
    var ie = {};
    Object.defineProperty(ie, "__esModule", {
        value: !0
    });
    ie.HeroDoodle = void 0;
    var je, ke = je || (je = {});
    ke.CLASS_HAS_MODAL = "has-modal";
    ke.CLASS_IS_INTERACTIVE = "is-interactive";
    ke.CLASS_IS_VIDEO_TEMPLATE = "is-video-template";
    ke.EVENT_CLICK = "click";
    ke.EVENT_GLUE_MODAL_CLOSED = "GlueModal:closed";
    ke.INTERACTIVE_PARAMETER = "doodle";
    ke.SELECTOR_DOODLE_IMAGE_CLICKEABLE = ".doodle-image.clickable";
    ke.SELECTOR_GLUE_MODAL = ".glue-modal";
    ke.SELECTOR_IFRAME_INTERACTIVE_MODULE = "iframe.interactive-module";
    ke.SELECTOR_MEDIA_CONTAINER = ".media-container";
    ke.SELECTOR_VIDEO_PLAYER = ".video-player";
    ie.HeroDoodle = function(a) {
        var b = this;
        this.module = a;
        this.mediaContainerModule = a.querySelector(je.SELECTOR_MEDIA_CONTAINER);
        this.mediaContainerModule.classList.contains(je.CLASS_HAS_MODAL) && (this.modalElement = this.module.querySelector(je.SELECTOR_GLUE_MODAL),
        this.imgElement = this.mediaContainerModule.querySelector(je.SELECTOR_DOODLE_IMAGE_CLICKEABLE),
        this.iframeElement = this.module.querySelector(je.SELECTOR_IFRAME_INTERACTIVE_MODULE),
        a = (new URLSearchParams(window.location.search)).get(je.INTERACTIVE_PARAMETER),
        this.modal = new M.Modal(this.modalElement,this.imgElement),
        this.iframeElement && a && (this.iframeElement.src = this.iframeElement.src + "?" + je.INTERACTIVE_PARAMETER + "=" + a,
        this.modal.open()),
        this.imgElement.addEventListener(je.EVENT_CLICK, function() {
            b.modal.open()
        }),
        this.modalElement.classList.contains(je.CLASS_IS_INTERACTIVE) && this.modalElement.addEventListener(je.EVENT_GLUE_MODAL_CLOSED, function() {
            return b.handleCloseInteractiveModal()
        }),
        this.modalElement.classList.contains(je.CLASS_IS_VIDEO_TEMPLATE) && (this.videoPlayerElement = this.module.querySelector(je.SELECTOR_VIDEO_PLAYER),
        this.videoPlayer = this.videoPlayerElement.videoPlayer,
        this.modalElement.addEventListener(je.EVENT_GLUE_MODAL_CLOSED, function() {
            return b.handleCloseVideoModal()
        })))
    }
    ;
    ie.HeroDoodle.prototype.handleCloseInteractiveModal = function() {
        this.iframeElement.src = this.iframeElement.src
    }
    ;
    ie.HeroDoodle.prototype.handleCloseVideoModal = function() {
        this.videoPlayer.getPlayer().pauseVideo()
    }
    ;
    var le = {};
    Object.defineProperty(le, "__esModule", {
        value: !0
    });
    le.HeroTagCarousel = void 0;
    var R, S = R || (R = {});
    S.ANIMATION_EASING_EASE_IN_CUSTOM = "cubic-bezier(.24,-0.43,.47,1.03)";
    S.ANIMATION_EASING_EASE_IN_OUT = "ease-in-out";
    S.ANIMATION_EASING_EASE_OUT_CUSTOM = "cubic-bezier(.25,.46,.45,.94)";
    S.ANIMATION_FILL_FORWARDS = "forwards";
    S.ANIMATION_FILL_BOTH = "both";
    S.ANIMATION_ITERATION_ACCUMULATE = "accumulate";
    S.ANIMATION_TRANSLATE_XY_0 = "translate(0%, 0%)";
    S.ATTR_TABINDEX = "tabindex";
    S.CLASS_ACTIVE = "active";
    S.CLASS_ANIMATE = "animate";
    S.CLASS_GLUE_CAROUSEL = ".glue-carousel";
    S.DIRECTION_LEFT = "left";
    S.DIRECTION_RIGHT = "right";
    S.EVENT_CLICK = "click";
    S.EVENT_FINISH = "finish";
    S.EVENT_MOUSEENTER = "mouseenter";
    S.EVENT_MOUSELEAVE = "mouseleave";
    S.LIST_ANIMATION_DESKTOP = "listAnimationDesktop";
    S.LIST_ANIMATION_MOBILE = "listAnimationMobile";
    S.LISTEN_CURRENT_SLIDE = "currentSlide";
    S.RESPONSIVE_QUERY_DESKTOP = "(min-width: 600px)";
    S.RESPONSIVE_QUERY_MOBILE = "(max-width: 599px)";
    S.SELECTOR_CAROUSEL_ANCHOR = "a";
    S.SELECTOR_CAROUSEL_COLLAGE = ".hero-tag-carousel__collage";
    S.SELECTOR_CAROUSEL_COLLAGE_CARD = ".hero-tag-carousel__collage-card";
    S.SELECTOR_CAROUSEL_CTA = ".hero-tag-carousel__main-cta-wrapper";
    S.SELECTOR_CAROUSEL_ITEM_NOT_COPY = '.glue-carousel__item:not([id$="copy"])';
    var me = {
        listAnimationDesktop: [{
            right: [75, -200],
            left: [-120, 65],
            offset: .15,
            easing: R.ANIMATION_EASING_EASE_IN_CUSTOM
        }, {
            right: [150, -115],
            left: [-180, 45],
            offset: .1,
            easing: R.ANIMATION_EASING_EASE_IN_CUSTOM
        }, {
            right: [180, 45],
            left: [-75, -200],
            offset: .25,
            easing: R.ANIMATION_EASING_EASE_IN_OUT
        }, {
            right: [120, 65],
            left: [-150, -115],
            offset: .2,
            easing: R.ANIMATION_EASING_EASE_IN_OUT
        }, {
            right: [30, 300],
            left: [-130, 30],
            offset: .2,
            easing: R.ANIMATION_EASING_EASE_IN_OUT
        }, {
            right: [130, 30],
            left: [-30, 300],
            offset: 0,
            easing: R.ANIMATION_EASING_EASE_IN_CUSTOM
        }, {
            right: [50, 150],
            left: [-60, 100],
            offset: .15,
            easing: R.ANIMATION_EASING_EASE_IN_OUT
        }, {
            right: [10, 130],
            left: [-10, 130],
            offset: .1,
            easing: R.ANIMATION_EASING_EASE_IN_CUSTOM
        }, {
            right: [60, 100],
            left: [-50, 150],
            offset: .1,
            easing: R.ANIMATION_EASING_EASE_IN_CUSTOM
        }],
        listAnimationMobile: [{
            right: [75, -200],
            left: [-170, -135],
            offset: .15,
            easing: R.ANIMATION_EASING_EASE_IN_CUSTOM
        }, {
            right: [180, -115],
            left: [-180, -285],
            offset: .1,
            easing: R.ANIMATION_EASING_EASE_IN_CUSTOM
        }, {
            right: [240, 45],
            left: [-200, 65],
            offset: .25,
            easing: R.ANIMATION_EASING_EASE_IN_OUT
        }, {
            right: [120, 65],
            left: [-300, 25],
            offset: .2,
            easing: R.ANIMATION_EASING_EASE_IN_OUT
        }, {
            right: [60, 350],
            left: [-130, 30],
            offset: .2,
            easing: R.ANIMATION_EASING_EASE_IN_OUT
        }, {
            right: [130, 30],
            left: [-30, 300],
            offset: 0,
            easing: R.ANIMATION_EASING_EASE_IN_CUSTOM
        }, {
            right: [180, 160],
            left: [-60, 100],
            offset: .15,
            easing: R.ANIMATION_EASING_EASE_IN_OUT
        }, {
            right: [190, 200],
            left: [-10, 130],
            offset: .1,
            easing: R.ANIMATION_EASING_EASE_IN_CUSTOM
        }, {
            right: [110, 170],
            left: [-50, 150],
            offset: .1,
            easing: R.ANIMATION_EASING_EASE_IN_CUSTOM
        }]
    };
    le.HeroTagCarousel = function(a) {
        var b = this;
        this.currentAnimation = "";
        this.dragAnimations = {
            animations: [],
            currentSlide: 0,
            delta: 0
        };
        this.rootElement = a;
        this.carouselElement = this.rootElement.querySelector(R.CLASS_GLUE_CAROUSEL);
        this.carouselObject = new Q.Carousel(this.carouselElement);
        this.currentSlideIndex = this.carouselObject.getCurrentSlide() - 1;
        this.carouselListSlides = [].concat(__wpcc.f.arrayFromIterable(this.rootElement.querySelectorAll("" + R.SELECTOR_CAROUSEL_ITEM_NOT_COPY))).map(function(c) {
            return {
                slideElement: c
            }
        });
        this.carouselListCTA = [].concat(__wpcc.f.arrayFromIterable(this.rootElement.querySelectorAll("" + R.SELECTOR_CAROUSEL_CTA)));
        this.allCTAElements = [].concat(__wpcc.f.arrayFromIterable(this.rootElement.querySelectorAll("" + R.SELECTOR_CAROUSEL_ANCHOR)));
        this.responsiveMonitorInstance = new Ub.ResponsiveMonitor([{
            media: R.RESPONSIVE_QUERY_MOBILE,
            transform: function() {
                b.currentAnimation = R.LIST_ANIMATION_MOBILE
            }
        }, {
            media: R.RESPONSIVE_QUERY_DESKTOP,
            transform: function() {
                b.currentAnimation = R.LIST_ANIMATION_DESKTOP
            }
        }]);
        this.debounceSlideOut = new M.Debounce(function() {
            return b.handleDebounceSlideOut()
        }
        ,200);
        this.debounceSlideIn = new M.Debounce(function() {
            return b.handleDebounceSlideIn()
        }
        ,200);
        this.debounceNextSlide = new M.Debounce(function() {
            return b.handleDebounceSlide()
        }
        ,7500);
        this.carouselObject.observer.listen(R.LISTEN_CURRENT_SLIDE, function() {
            return b.handleCurrentSlide(!0)
        });
        this.carouselObject.observer.listen("isDragging", function() {
            return b.handleCaraouselIsDragging()
        });
        this.carouselObject.observer.listen("differenceInX", function() {
            return b.handleDifferenceInX()
        });
        this.carouselListSlides.forEach(function(c) {
            c.cards = [].concat(__wpcc.f.arrayFromIterable(c.slideElement.querySelectorAll(R.SELECTOR_CAROUSEL_COLLAGE_CARD))).map(function(d) {
                return {
                    element: d,
                    animations: []
                }
            });
            c.cards.forEach(function(d) {
                return d.element.addEventListener(R.EVENT_CLICK, function(e) {
                    return b.handleCardClickEvent(e)
                })
            })
        });
        this.allCTAElements.forEach(function(c) {
            c.addEventListener(R.EVENT_MOUSEENTER, function() {
                return b.debounceNextSlide.cancel()
            });
            c.addEventListener(R.EVENT_MOUSELEAVE, function() {
                return b.debounceNextSlide.debounce()
            })
        });
        this.handleCurrentSlide(!1);
        this.debounceNextSlide.debounce()
    }
    ;
    le.HeroTagCarousel.prototype.animationKeyframeIn = function(a, b, c, d) {
        a = b.animate([{
            opacity: 0,
            transform: "translate(" + c[d][0] + "%, " + c[d][1] + "%)"
        }, {
            opacity: 1,
            offset: .25
        }, {
            transform: R.ANIMATION_TRANSLATE_XY_0
        }], {
            duration: 1E3,
            iterations: 1,
            fill: R.ANIMATION_FILL_FORWARDS,
            easing: R.ANIMATION_EASING_EASE_IN_OUT,
            iterationComposite: R.ANIMATION_ITERATION_ACCUMULATE
        });
        a.persist();
        return a
    }
    ;
    le.HeroTagCarousel.prototype.animationKeyframeOut = function(a, b, c, d) {
        a = b.animate([{
            transform: window.getComputedStyle(b).transform,
            offset: a.dragAnimations.delta ? 0 : c.offset
        }, {
            opacity: 1,
            offset: .85
        }, {
            transform: "translate(" + c[d][0] + "%, " + c[d][1] + "%)",
            opacity: 0
        }], {
            duration: 1400 - .85 * Math.abs(a.dragAnimations.delta),
            iterations: 1,
            fill: R.ANIMATION_FILL_FORWARDS,
            easing: R.ANIMATION_EASING_EASE_IN_OUT,
            iterationComposite: R.ANIMATION_ITERATION_ACCUMULATE
        });
        a.persist();
        return a
    }
    ;
    le.HeroTagCarousel.prototype.addAnimation = function(a, b, c) {
        var d = this, e;
        null === (e = this.carouselListSlides[a].cards) || void 0 === e ? void 0 : e.forEach(function(g, h) {
            var l = b(d, g.element, me[d.currentAnimation][h], c);
            switch (b) {
            case d.animationKeyframeIn:
                l.addEventListener(R.EVENT_FINISH, function() {
                    l.cancel();
                    d.debounceSlideIn.debounce();
                    d.debounceNextSlide.debounce()
                });
                break;
            case d.animationKeyframeOut:
                l.addEventListener(R.EVENT_FINISH, function() {
                    d.debounceSlideOut.debounce()
                })
            }
            g.animations.push(l);
            1 < g.animations.length && g.animations.shift().cancel()
        })
    }
    ;
    le.HeroTagCarousel.prototype.handleCurrentSlide = function(a) {
        var b = this;
        a = void 0 === a ? !0 : a;
        var c = this.carouselObject.getCurrentSlide() - 1;
        this.carouselListCTA[this.currentSlideIndex].classList.remove(R.CLASS_ACTIVE);
        this.carouselListCTA[c].classList.add(R.CLASS_ACTIVE);
        this.carouselListCTA[c].classList.add(R.CLASS_ANIMATE);
        this.carouselListCTA[this.currentSlideIndex].classList.add(R.CLASS_ANIMATE);
        this.carouselListCTA[this.currentSlideIndex].setAttribute(R.ATTR_TABINDEX, "-1");
        this.carouselListCTA[this.currentSlideIndex].querySelector(R.SELECTOR_CAROUSEL_ANCHOR).setAttribute(R.ATTR_TABINDEX, "-1");
        this.carouselListCTA[c].removeAttribute(R.ATTR_TABINDEX);
        this.carouselListCTA[c].querySelector(R.SELECTOR_CAROUSEL_ANCHOR).removeAttribute(R.ATTR_TABINDEX);
        this.carouselListSlides[this.currentSlideIndex].cards.forEach(function(e) {
            return e.element.setAttribute(R.ATTR_TABINDEX, "-1")
        });
        this.carouselListSlides[c].cards.forEach(function(e) {
            return e.element.removeAttribute(R.ATTR_TABINDEX)
        });
        if (a) {
            this.carouselElement.classList.add("disabled");
            this.debounceNextSlide.cancel();
            var d = 1 == Math.abs(this.currentSlideIndex - c) ? this.currentSlideIndex < c : this.currentSlideIndex > c;
            this.addAnimation(this.currentSlideIndex, this.animationKeyframeOut, d ? R.DIRECTION_LEFT : R.DIRECTION_RIGHT);
            setTimeout(function() {
                b.addAnimation(b.currentSlideIndex, b.animationKeyframeIn, d ? R.DIRECTION_RIGHT : R.DIRECTION_LEFT);
                b.carouselListSlides[b.currentSlideIndex].slideElement.querySelector(R.SELECTOR_CAROUSEL_COLLAGE).classList.add(R.CLASS_ACTIVE)
            }, 750)
        } else
            this.carouselListSlides[c].slideElement.querySelector(R.SELECTOR_CAROUSEL_COLLAGE).classList.add(R.CLASS_ACTIVE);
        this.currentSlideIndex = c
    }
    ;
    le.HeroTagCarousel.prototype.handleDebounceSlideOut = function() {
        this.clearDragAnimations();
        var a = this.carouselObject.observer.data.currentSlide;
        this.carouselListSlides.forEach(function(b, c) {
            b.slideElement.querySelector(R.SELECTOR_CAROUSEL_COLLAGE).classList.toggle(R.CLASS_ACTIVE, c + 1 == a)
        })
    }
    ;
    le.HeroTagCarousel.prototype.handleDebounceSlideIn = function() {
        this.carouselElement.classList.remove("disabled")
    }
    ;
    le.HeroTagCarousel.prototype.handleCaraouselIsDragging = function() {
        var a = this
          , b = this.carouselObject.observer.data.currentSlide;
        this.carouselObject.observer.data.isDragging ? (this.debounceNextSlide.cancel(),
        b = this.carouselObject.observer.data.currentSlide,
        this.dragAnimations = {
            currentSlide: b,
            delta: 0,
            animations: this.carouselListSlides[b - 1].cards.map(function(c, d) {
                c = c.element.animate([{
                    transform: "translate(" + me[a.currentAnimation][d].left[0] + "%, " + me[a.currentAnimation][d].left[1] + "%)"
                }, {
                    transform: "translate(0%, 0%)"
                }, {
                    transform: "translate(" + me[a.currentAnimation][d].right[0] + "%, " + me[a.currentAnimation][d].right[1] + "%)"
                }], {
                    duration: 4E3,
                    iterations: 1,
                    fill: "none",
                    easing: R.ANIMATION_EASING_EASE_IN_OUT,
                    iterationComposite: R.ANIMATION_ITERATION_ACCUMULATE
                });
                c.currentTime = 2E3;
                c.pause();
                return c
            })
        }) : b == this.dragAnimations.currentSlide ? (this.carouselListSlides[b - 1].cards.forEach(function(c) {
            var d = c.element.animate([{
                transform: window.getComputedStyle(c.element).transform
            }, {
                transform: "matrix(1, 0, 0, 1, 0, 0)"
            }], {
                duration: 500,
                iterations: 1,
                fill: R.ANIMATION_FILL_BOTH,
                easing: R.ANIMATION_EASING_EASE_IN_OUT,
                iterationComposite: R.ANIMATION_ITERATION_ACCUMULATE
            });
            d.play();
            d.addEventListener(R.EVENT_FINISH, function() {
                d.cancel();
                a.debounceNextSlide.debounce()
            })
        }),
        this.clearDragAnimations()) : this.dragAnimations.delta = 0
    }
    ;
    le.HeroTagCarousel.prototype.handleDifferenceInX = function() {
        var a = this;
        this.dragAnimations.delta = Math.min(Math.max(this.carouselObject.observer.data.differenceInX, -1E3), 1E3);
        this.dragAnimations.animations.forEach(function(b) {
            b.currentTime = 2E3 - a.dragAnimations.delta;
            b.pause()
        })
    }
    ;
    le.HeroTagCarousel.prototype.handleDebounceSlide = function() {
        this.carouselObject.next()
    }
    ;
    le.HeroTagCarousel.prototype.clearDragAnimations = function() {
        for (; this.dragAnimations.animations.length; )
            this.dragAnimations.animations.pop().cancel()
    }
    ;
    le.HeroTagCarousel.prototype.handleCardClickEvent = function(a) {
        this.carouselObject.observer.data.isDragging && a.preventDefault()
    }
    ;
    var ne = {};
    Object.defineProperty(ne, "__esModule", {
        value: !0
    });
    ne.ImageCarousel = void 0;
    var oe;
    (oe || (oe = {})).CLASS_GLUE_CAROUSEL = ".glue-carousel";
    ne.ImageCarousel = function(a) {
        this.rootElement = a;
        new Q.Carousel(this.rootElement.querySelector(oe.CLASS_GLUE_CAROUSEL))
    }
    ;
    var pe = {};
    Object.defineProperty(pe, "__esModule", {
        value: !0
    });
    pe.KeyThemes = void 0;
    var qe, re = qe || (qe = {});
    re.LINK_CLASS = ".key-themes-cta-link";
    re.HREF_ATTR = "href";
    re.CLICK_EVENT = "click";
    re.MIDDLE_CLICK_EVENT = "auxclick";
    pe.KeyThemes = function(a) {
        this.linkElement = a.querySelector(qe.LINK_CLASS);
        this.links = JSON.parse(this.linkElement.dataset.links);
        this.linkElement.addEventListener(qe.CLICK_EVENT, this.randomizeLink.bind(this));
        this.linkElement.addEventListener(qe.MIDDLE_CLICK_EVENT, this.randomizeLink.bind(this))
    }
    ;
    pe.KeyThemes.prototype.randomizeLink = function() {
        this.linkElement.setAttribute(qe.HREF_ATTR, this.links[Math.floor(Math.random() * this.links.length)])
    }
    ;
    var se = {};
    Object.defineProperty(se, "__esModule", {
        value: !0
    });
    se.Map = void 0;
    se.Map = function(a) {
        function b() {
            setTimeout(function() {
                a.querySelectorAll("path").forEach(function(T) {
                    T.style.stroke = c;
                    T.style.strokeWidth = "1"
                })
            }, 100)
        }
        var c = getComputedStyle(a.querySelector(".surface-1")).getPropertyValue("background-color")
          , d = getComputedStyle(a.querySelector(".surface-3")).getPropertyValue("background-color")
          , e = getComputedStyle(a.querySelector(".surface-4")).getPropertyValue("background-color")
          , g = getComputedStyle(a.querySelector(".interactive")).getPropertyValue("background-color");
        Array.from(a.getElementsByClassName("theme-word")).forEach(function(T) {
            return T.style.borderColor = e
        });
        var h = a.querySelector(".mapChart"), l = JSON.parse(h.getAttribute("data-countries")), m = [["Lat", "Long", "Value"]].concat(__wpcc.f.arrayFromIterable(l.map(function(T) {
            return [T.latitude, T.longitude, T.id]
        }))), p, q, r;
        google.charts.load("current", {
            packages: ["geochart"]
        });
        google.charts.setOnLoadCallback(function() {
            p = google.visualization.arrayToDataTable(m);
            q = {
                backgroundColor: d,
                defaultColor: g,
                datalessRegionColor: c,
                displayMode: "markers"
            };
            r = new google.visualization.GeoChart(h);
            google.visualization.events.addListener(r, "ready", b);
            r.draw(p, q)
        });
        addEventListener("resize", function() {
            r.clearChart();
            r.draw(p, q)
        })
    }
    ;
    var te = {};
    Object.defineProperty(te, "__esModule", {
        value: !0
    });
    te.QnACarousel = void 0;
    var ue;
    (ue || (ue = {})).CLASS_GLUE_CAROUSEL = ".glue-carousel";
    te.QnACarousel = function(a) {
        this.rootElement = a;
        new Q.Carousel(this.rootElement.querySelector(ue.CLASS_GLUE_CAROUSEL))
    }
    ;
    var ve = {};
    Object.defineProperty(ve, "__esModule", {
        value: !0
    });
    ve.Quiz = void 0;
    var we, xe = we || (we = {});
    xe.QUESTIONNAIRE = ".questionnaire";
    xe.SELECTS = "select";
    xe.NEXT_BTN = ".quiz-button";
    xe.MONTH = "month";
    xe.DAY = "day";
    xe.DAYS = ".select--day";
    xe.CHANGE = "change";
    xe.CLICK = "click";
    ve.Quiz = function(a) {
        a.querySelector(we.QUESTIONNAIRE);
        var b = a.querySelectorAll(we.SELECTS)
          , c = a.querySelector(we.DAYS);
        b.forEach(function(d) {
            var e = d.dataset.name;
            e === we.MONTH ? d.addEventListener(we.CHANGE, function(g) {
                var h = g.currentTarget;
                parseInt(h.value);
                g = "";
                h = parseInt(h.value);
                var l = (new Date).getFullYear();
                h = (new Date(l,h,0)).getDate();
                for (l = 1; l < h + 1; l++)
                    g += '<option value="' + l + '">' + (10 > l ? "0" + l : l) + "</option>";
                c.innerHTML = g
            }) : e === we.DAY && d.addEventListener(we.CHANGE, function(g) {
                parseInt(g.currentTarget.value)
            })
        })
    }
    ;
    var ye = {};
    Object.defineProperty(ye, "__esModule", {
        value: !0
    });
    ye.RevealImage = void 0;
    var ze, Ae = ze || (ze = {});
    Ae.NODE_BUTTON = ".reveal-image-button";
    Ae.NODE_CONTAINER = ".container";
    Ae.NODE_LEFT_ICON = ".left-icon";
    Ae.NODE_RIGHT_ICON = ".right-icon";
    Ae.REVEAL_CLASS = "reveal";
    Ae.STYLE_DISPLAY_BLOCK = "block";
    Ae.STYLE_DISPLAY_NONE = "none";
    Ae.STYLE_LEFT_NONE = "0";
    Ae.STYLE_LEFT_FULL = "100%";
    Ae.EVENT_CLICK = "click";
    ye.RevealImage = function(a) {
        var b = this, c, d;
        this.revealImageElement = a;
        this.button = null === (c = this.revealImageElement) || void 0 === c ? void 0 : c.querySelector(ze.NODE_BUTTON);
        this.container = null === a || void 0 === a ? void 0 : a.querySelector(ze.NODE_CONTAINER);
        this.revealImageObserver = new Tb.Observer({
            isRevealed: !1
        });
        this.revealImageObserver.listen("isRevealed", function() {
            return b.handleIsRevealed()
        });
        null === (d = this.button) || void 0 === d ? void 0 : d.addEventListener(ze.EVENT_CLICK, function(e) {
            return b.handleEventButton(e)
        })
    }
    ;
    ye.RevealImage.prototype.handleEventButton = function() {
        this.revealImageObserver.data.isRevealed = !this.revealImageObserver.data.isRevealed
    }
    ;
    ye.RevealImage.prototype.handleIsRevealed = function() {
        this.revealImageElement.classList.toggle(ze.REVEAL_CLASS, this.revealImageObserver.data.isRevealed)
    }
    ;
    var Be = {};
    Object.defineProperty(Be, "__esModule", {
        value: !0
    });
    Be.RevealImageCarousel = void 0;
    var Ce, De = Ce || (Ce = {});
    De.CLASS_GLUE_CAROUSEL = ".glue-carousel";
    De.CLASS_REVEAL_IMAGE = ".reveal-image";
    De.SELECTOR_CAROUSEL_ITEM_NOT_COPY = '.glue-carousel__item:not([id$="copy"])';
    Be.RevealImageCarousel = function(a) {
        var b = this;
        this.listRevealImage = [];
        this.rootElement = a;
        this.carouselObject = new Q.Carousel(this.rootElement.querySelector(Ce.CLASS_GLUE_CAROUSEL));
        this.rootElement.querySelectorAll(Ce.SELECTOR_CAROUSEL_ITEM_NOT_COPY + "         " + Ce.CLASS_REVEAL_IMAGE).forEach(function(c) {
            b.listRevealImage.push(new ye.RevealImage(c))
        });
        this.carouselObject.observer.listen("currentSlide", function() {
            return b.unrevealAll()
        });
        this.carouselObject.observer.listen("isDragging", function() {
            return b.unrevealAll()
        })
    }
    ;
    Be.RevealImageCarousel.prototype.unrevealAll = function() {
        this.listRevealImage.forEach(function(a) {
            a.revealImageObserver.data.isRevealed && (a.revealImageObserver.data.isRevealed = !1)
        })
    }
    ;
    var Ee = {};
    Object.defineProperty(Ee, "__esModule", {
        value: !0
    });
    Ee.SearchDoodleFilter = void 0;
    var U, V = U || (U = {});
    V.ATTRIBUE_DISABLED = "disabled";
    V.ATTRIBUE_HIDDEN = "hidden";
    V.CLASS_ACTIVE = "active";
    V.CLASS_HIDDEN = "hidden";
    V.EVENT_CHANGE = "change";
    V.EVENT_CLICK = "click";
    V.EVENT_RESIZE = "resize";
    V.SELECTOR_COLOR_LABEL = ".input-color";
    V.SELECTOR_COUNTRY_LABEL = ".input-country";
    V.SELECTOR_FILTER_MOBILE_CHECKBOX = ".search-doodle__filter_mobile-panel__checkbox";
    V.SELECTOR_FILTER_MOBILE_TOGGLE = ".search-doodle__filter_mobile-panel__toggle";
    V.SELECTOR_FILTER_MOBILE_WRAPPER = ".search-doodle__filter_mobile-wrapper";
    V.SELECTOR_FILTER_WRAPPER = ".search-doodle__filter-wrapper";
    V.SELECTOR_FORM = ".search-doodle__filter-form";
    V.SELECTOR_FORMAT_LABEL = ".input-format";
    V.SELECTOR_GLUE_EXPANSION_PANEL = ".glue-expansion-panel";
    V.SELECTOR_GLUE_EXPANSION_PANEL_BUTTON = ".glue-expansion-panel__button";
    V.SELECTOR_GLUE_EXPANSION_PANEL_HEADER_COUNTER = ".glue-expansion-panel__header-counter";
    V.SELECTOR_GLUE_EXPANSION_PANELS = ".glue-expansion-panels";
    V.SELECTOR_GLUE_IS_EXPANDED = ".glue-is-expanded";
    V.SELECTOR_INPUT = "input";
    V.SELECTOR_PANEL_CONTENT_DATE_ADD = ".search-doodle__filter-panel__content-date__add";
    V.SELECTOR_PANEL_CONTENT_DATE_DROPDOWN = ".search-doodle__filter-panel__content-date__dropdown";
    V.SELECTOR_PANEL_CONTENT_DATE_DROPDOWN_HIDE = ".search-doodle__filter-panel__content-date__dropdown-hide";
    V.SELECTOR_PANEL_CONTENT_DATE_DROPDOWN_SELECT = ".search-doodle__filter-panel__content-date__dropdown-select";
    V.SELECTOR_PANEL_CONTENT_DATE_LABEL = ".search-doodle__filter-panel__content-date__dropdown-label";
    V.SELECTOR_SORT_LABEL = ".input-sort";
    V.SELECTOR_STYLE_LABEL = ".input-style";
    V.SELECTOR_TOPIC_LABEL = ".input-topic";
    V.TAG_INPUT = "INPUT";
    V.TAG_SELECT = "SELECT";
    Ee.SearchDoodleFilter = function(a, b) {
        var c = this;
        this.currentWidth = 0;
        this.hasUpdatedFilters = !1;
        this.searchFilterModule = a;
        this.filtersObserver = b;
        this.formElement = this.searchFilterModule.querySelector(U.SELECTOR_FORM);
        this.inputCountriesElements = [].concat(__wpcc.f.arrayFromIterable(this.searchFilterModule.querySelectorAll(U.SELECTOR_COUNTRY_LABEL)));
        this.inputColorsElements = [].concat(__wpcc.f.arrayFromIterable(this.searchFilterModule.querySelectorAll(U.SELECTOR_COLOR_LABEL)));
        this.inputTopicsElements = [].concat(__wpcc.f.arrayFromIterable(this.searchFilterModule.querySelectorAll(U.SELECTOR_TOPIC_LABEL)));
        this.inputFormatElements = [].concat(__wpcc.f.arrayFromIterable(this.searchFilterModule.querySelectorAll(U.SELECTOR_FORMAT_LABEL)));
        this.inputStyleElements = [].concat(__wpcc.f.arrayFromIterable(this.searchFilterModule.querySelectorAll(U.SELECTOR_STYLE_LABEL)));
        this.inputSortElements = [].concat(__wpcc.f.arrayFromIterable(this.searchFilterModule.querySelectorAll(U.SELECTOR_SORT_LABEL)));
        this.expansionPanelMobileElement = this.searchFilterModule.querySelector(U.SELECTOR_FILTER_MOBILE_WRAPPER);
        this.expansionPanelMobileToggleElement = this.searchFilterModule.querySelector(U.SELECTOR_FILTER_MOBILE_TOGGLE);
        this.expansionPanelMobileCheckboxElement = this.expansionPanelMobileElement.querySelector(U.SELECTOR_FILTER_MOBILE_CHECKBOX);
        this.expansionPanelsElement = this.searchFilterModule.querySelector(U.SELECTOR_FILTER_WRAPPER);
        this.dateElements = [].concat(__wpcc.f.arrayFromIterable(this.searchFilterModule.querySelectorAll(U.SELECTOR_PANEL_CONTENT_DATE_DROPDOWN)));
        this.buttonDateHideElements = [].concat(__wpcc.f.arrayFromIterable(this.searchFilterModule.querySelectorAll(U.SELECTOR_PANEL_CONTENT_DATE_DROPDOWN_HIDE)));
        this.inputDateElements = [].concat(__wpcc.f.arrayFromIterable(this.searchFilterModule.querySelectorAll(U.SELECTOR_PANEL_CONTENT_DATE_DROPDOWN_SELECT)));
        this.counterFilter = [].concat(__wpcc.f.arrayFromIterable(this.expansionPanelsElement.children)).map(function(d) {
            return [d, 0]
        });
        this.expansionPanelMobileElement && (this.currentWidth = window.innerWidth,
        this.expansionPanelMobileCheckboxElement.addEventListener(U.EVENT_CHANGE, function(d) {
            return c.handleChangeCheckFilterMobile(d)
        }),
        window.addEventListener(U.EVENT_RESIZE, function() {
            c.currentWidth != window.innerWidth && c.expansionPanelMobileCheckboxElement.checked && (c.filtersObserver.data.forceCloseTabs = !0,
            c.currentWidth = window.innerWidth)
        }));
        this.expansionPanelsElement && (new M.ExpansionPanels(this.expansionPanelsElement),
        this.expansionPanelsElement.querySelectorAll(U.SELECTOR_GLUE_EXPANSION_PANEL_BUTTON).forEach(function(d) {
            d.addEventListener(U.EVENT_CLICK, function(e) {
                return c.handleClickTab(e, d)
            })
        }));
        this.formElement.reset();
        this.inputDateElements.forEach(function(d) {
            d.addEventListener(U.EVENT_CHANGE, function(e) {
                return c.handleChangeDate(e, d)
            })
        });
        this.inputCountriesElements.forEach(function(d) {
            var e;
            null === (e = d.querySelector(U.SELECTOR_INPUT)) || void 0 === e ? void 0 : e.addEventListener(U.EVENT_CHANGE, function(g) {
                return c.handleChangeCheckbox(g, d, !1, !1)
            })
        });
        this.inputColorsElements.forEach(function(d) {
            var e;
            null === (e = d.querySelector(U.SELECTOR_INPUT)) || void 0 === e ? void 0 : e.addEventListener(U.EVENT_CHANGE, function(g) {
                return c.handleChangeCheckbox(g, d, !1, !0)
            })
        });
        this.inputTopicsElements.forEach(function(d) {
            var e;
            null === (e = d.querySelector(U.SELECTOR_INPUT)) || void 0 === e ? void 0 : e.addEventListener(U.EVENT_CHANGE, function(g) {
                return c.handleChangeCheckbox(g, d, !1, !1)
            })
        });
        this.inputFormatElements.forEach(function(d) {
            var e;
            null === (e = d.querySelector(U.SELECTOR_INPUT)) || void 0 === e ? void 0 : e.addEventListener(U.EVENT_CHANGE, function(g) {
                return c.handleChangeCheckbox(g, d, !1, !1)
            })
        });
        this.inputStyleElements.forEach(function(d) {
            var e;
            null === (e = d.querySelector(U.SELECTOR_INPUT)) || void 0 === e ? void 0 : e.addEventListener(U.EVENT_CHANGE, function(g) {
                return c.handleChangeCheckbox(g, d, !1, !1)
            })
        });
        this.inputSortElements.forEach(function(d, e) {
            var g;
            null === (g = d.querySelector(U.SELECTOR_INPUT)) || void 0 === g ? void 0 : g.addEventListener(U.EVENT_CHANGE, function(h) {
                return c.handleChangeRadio(h, d, e)
            })
        });
        this.buttonDateHideElements.forEach(function(d) {
            d.addEventListener(U.EVENT_CLICK, function(e) {
                return c.handleClickRemoveDate(e, d)
            })
        });
        this.filtersObserver.listen("removeCheck", function() {
            return c.handleRemoveCheck()
        });
        this.filtersObserver.listen("forceCloseTabs", function() {
            return c.closeAllTabs()
        })
    }
    ;
    Ee.SearchDoodleFilter.prototype.handleChangeCheckbox = function(a, b, c, d) {
        var e, g = b.querySelector(U.SELECTOR_INPUT), h = {
            name: g.name,
            value: g.value,
            label: b.textContent.trim()
        };
        g.checked ? (h.input = [],
        c ? Object.keys(g.dataset).forEach(function(l) {
            var m;
            return null === (m = h.input) || void 0 === m ? void 0 : m.push({
                name: l.toLowerCase(),
                value: g.dataset[l]
            })
        }) : null === (e = h.input) || void 0 === e ? void 0 : e.push({
            name: g.name,
            value: g.value
        }),
        d && ((a = b.querySelector(".circle-color-bg")) ? h.node_bg = a.cloneNode(!0) : h.theme = g.value),
        this.addToListValues(h),
        this.handleCounterFilter(g, !0)) : (this.removeToListValues(h),
        this.handleCounterFilter(g, !1));
        this.hasUpdatedFilters = !0
    }
    ;
    Ee.SearchDoodleFilter.prototype.handleChangeDate = function(a, b) {
        a = this.inputDateElements.indexOf(b);
        var c = {
            name: b.name,
            value: b.value
        };
        this.removeToListValues(c, !0);
        this.handleCounterFilter(b, !1);
        "" != c.value ? (c.label = this.dateElements[a].querySelector(U.SELECTOR_PANEL_CONTENT_DATE_LABEL).innerText + ": " + [].concat(__wpcc.f.arrayFromIterable([].concat(__wpcc.f.arrayFromIterable(b.children)))).find(function(d) {
            return d.value == b.value
        }).innerText,
        c.input = [{
            name: b.name,
            value: b.value
        }],
        this.addToListValues(c),
        this.handleCounterFilter(b, !0),
        this.inputDateElements[a].firstElementChild.setAttribute(U.ATTRIBUE_HIDDEN, ""),
        this.buttonDateHideElements[a].classList.remove(U.CLASS_HIDDEN)) : (this.handleCounterFilter(b, !1),
        this.inputDateElements[a].firstElementChild.removeAttribute(U.ATTRIBUE_HIDDEN),
        this.buttonDateHideElements[a].classList.add(U.CLASS_HIDDEN));
        this.hasUpdatedFilters = !0
    }
    ;
    Ee.SearchDoodleFilter.prototype.handleChangeRadio = function(a, b, c) {
        var d = this;
        this.inputSortElements.forEach(function(e, g) {
            c !== g && d.handleChangeCheckbox(a, e, !0, !1)
        });
        this.handleChangeCheckbox(a, b, !0, !1)
    }
    ;
    Ee.SearchDoodleFilter.prototype.addToListValues = function(a) {
        this.filtersObserver.data.listValues.push(a);
        this.filtersObserver.data.listValuesLength = this.filtersObserver.data.listValues.length
    }
    ;
    Ee.SearchDoodleFilter.prototype.removeToListValues = function(a, b) {
        var c = this;
        this.filtersObserver.data.listValues = this.filtersObserver.data.listValues.filter(function(d) {
            return b ? c.filterSelect(d, a) : c.filterCheckbox(d, a)
        });
        this.filtersObserver.data.listValuesLength = this.filtersObserver.data.listValues.length
    }
    ;
    Ee.SearchDoodleFilter.prototype.filterCheckbox = function(a, b) {
        return !(a.name == b.name && a.value == b.value)
    }
    ;
    Ee.SearchDoodleFilter.prototype.filterSelect = function(a, b) {
        return a.name != b.name
    }
    ;
    Ee.SearchDoodleFilter.prototype.handleRemoveCheck = function() {
        if (this.filtersObserver.data.removeCheck)
            for (; 0 < this.filtersObserver.data.removeCheck.length; ) {
                var a = this.filtersObserver.data.removeCheck.shift()
                  , b = this.searchFilterModule.querySelector('[name="' + a.name + '"]');
                b.tagName == U.TAG_INPUT && (a = this.searchFilterModule.querySelector('input[name="' + a.name + '"][value="' + a.value + '"]'),
                a.checked = !1,
                a.dispatchEvent(new Event(U.EVENT_CHANGE)));
                b.tagName == U.TAG_SELECT && (b.value = "",
                b.dispatchEvent(new Event(U.EVENT_CHANGE)))
            }
    }
    ;
    Ee.SearchDoodleFilter.prototype.handleClickRemoveDate = function(a, b) {
        a = this.buttonDateHideElements.indexOf(b);
        this.inputDateElements[a].value = "";
        this.inputDateElements[a].dispatchEvent(new Event(U.EVENT_CHANGE))
    }
    ;
    Ee.SearchDoodleFilter.prototype.handleClickTab = function(a, b) {
        a = this.expansionPanelsElement.querySelectorAll("" + U.SELECTOR_GLUE_EXPANSION_PANEL + U.SELECTOR_GLUE_IS_EXPANDED);
        this.isMobileFilter() || (this.filtersObserver.data.isTabOpen = 0 < a.length);
        1 < a.length && a.forEach(function(c) {
            c = c.querySelector(U.SELECTOR_GLUE_EXPANSION_PANEL_BUTTON);
            c != b && c.dispatchEvent(new Event(U.EVENT_CLICK))
        });
        0 == a.length && this.hasUpdatedFilters && (this.filtersObserver.data.forceSearch = !0,
        this.hasUpdatedFilters = !1)
    }
    ;
    Ee.SearchDoodleFilter.prototype.closeAllTabs = function() {
        this.filtersObserver.data.forceCloseTabs && (this.expansionPanelsElement.querySelectorAll("" + U.SELECTOR_GLUE_EXPANSION_PANEL + U.SELECTOR_GLUE_IS_EXPANDED).forEach(function(a) {
            a.querySelector(U.SELECTOR_GLUE_EXPANSION_PANEL_BUTTON).dispatchEvent(new Event(U.EVENT_CLICK))
        }),
        this.expansionPanelMobileCheckboxElement.checked = !1,
        this.expansionPanelMobileCheckboxElement.dispatchEvent(new Event(U.EVENT_CHANGE)),
        this.filtersObserver.data.forceCloseTabs = !1)
    }
    ;
    Ee.SearchDoodleFilter.prototype.handleChangeCheckFilterMobile = function() {
        this.isMobileFilter() && (this.filtersObserver.data.isTabOpen = this.expansionPanelMobileCheckboxElement.checked,
        !this.expansionPanelMobileCheckboxElement.checked && this.hasUpdatedFilters && (this.filtersObserver.data.forceSearch = !0))
    }
    ;
    Ee.SearchDoodleFilter.prototype.isMobileFilter = function() {
        return 1024 > window.innerWidth
    }
    ;
    Ee.SearchDoodleFilter.prototype.handleCounterFilter = function(a, b) {
        var c = a.closest(U.SELECTOR_GLUE_EXPANSION_PANEL);
        a = this.counterFilter.findIndex(function(d) {
            return d[0] == c
        });
        this.counterFilter[a][1] += b ? 1 : 0 == this.counterFilter[a][1] ? 0 : -1;
        b = this.counterFilter[a][0].querySelector(U.SELECTOR_GLUE_EXPANSION_PANEL_HEADER_COUNTER);
        b.innerHTML = "" + this.counterFilter[a][1];
        b.classList.toggle(U.CLASS_ACTIVE, 0 < this.counterFilter[a][1]);
        b = this.searchFilterModule.querySelector(U.SELECTOR_GLUE_EXPANSION_PANEL_HEADER_COUNTER);
        b.innerHTML = "" + this.filtersObserver.data.listValuesLength;
        b.classList.toggle(U.CLASS_ACTIVE, 0 < this.counterFilter[a][1])
    }
    ;
    var Fe = {};
    Object.defineProperty(Fe, "__esModule", {
        value: !0
    });
    Fe.SearchDoodleForm = void 0;
    var W, Ge = W || (W = {});
    Ge.CLASS_ACTIVE = "active";
    Ge.DATASET_NAME = "name";
    Ge.DATASET_VALUE = "value";
    Ge.DEFAULT_THEME_COLOR = "blue";
    Ge.EVENT_CHANGE = "change";
    Ge.EVENT_CLICK = "click";
    Ge.EVENT_FOCUSOUT = "focusout";
    Ge.EVENT_INPUT = "input";
    Ge.EVENT_PROPERTYCHANGE = "propertychange";
    Ge.EVENT_SUBMIT = "submit";
    Ge.SELECTOR_BUTTON_RANDOM = ".search-doodle__box-button_random";
    Ge.SELECTOR_BUTTON_WRAPPER = ".search-doodle__box-button_wrapper";
    Ge.SELECTOR_INPUT = "input";
    Ge.SELECTOR_SEARCH_BOX_FORM = ".search-doodle__box-form";
    Ge.SELECTOR_SEARCH_BOX_INPUT = ".search-doodle__box-input";
    Ge.SELECTOR_SEARCH_BUTTON_SUBMMIT_ACTIVE = 'button.active[type="submit"]';
    Ge.SELECTOR_TAG = ".search-doodle__box__tag";
    Ge.SELECTOR_TAG_CLEAR = ".search-doodle__box__tag_clear";
    Ge.SELECTOR_TAG_TEMPLATE = ".search-doodle__box__tag-template";
    Ge.SELECTOR_TEMPLATE_TAG_ITEM = ".search-doodle__tag-item";
    Ge.SELECTOR_TEMPLATE_TAG_ITEM_ICON = ".search-doodle__tag-item-icon";
    Ge.SELECTOR_TEMPLATE_TAG_ITEM_LABEL = ".search-doodle__tag-item-label";
    Fe.SearchDoodleForm = function(a, b, c) {
        var d = this, e;
        this.searchFormModule = a;
        this.filtersObserver = b;
        this.formDataObserver = c;
        this.searchFormElement = this.searchFormModule.querySelector(W.SELECTOR_SEARCH_BOX_FORM);
        this.inputSearchElement = this.searchFormModule.querySelector(W.SELECTOR_SEARCH_BOX_INPUT);
        this.buttonSubmitElements = [].concat(__wpcc.f.arrayFromIterable(this.searchFormModule.querySelector(W.SELECTOR_BUTTON_WRAPPER).children));
        this.tagsElement = this.searchFormModule.querySelector(W.SELECTOR_TAG);
        this.tagsClearButtonElement = this.searchFormModule.querySelector(W.SELECTOR_TAG_CLEAR);
        this.templateTag = this.searchFormModule.querySelector(W.SELECTOR_TAG_TEMPLATE).content;
        this.buttonRandom = this.searchFormElement.querySelector(W.SELECTOR_BUTTON_RANDOM);
        new wd.AnalyticsGlobal(this.buttonRandom);
        this.searchFormElement.reset();
        this.searchFormElement.addEventListener(W.EVENT_SUBMIT, function(g) {
            return d.handleSubmit(g)
        });
        this.inputSearchElement.addEventListener(W.EVENT_INPUT, function() {
            return d.handleInputChange()
        });
        this.inputSearchElement.addEventListener(W.EVENT_FOCUSOUT, function() {
            return d.handleInputFocusOut()
        });
        this.tagsClearButtonElement.addEventListener(W.EVENT_CLICK, function() {
            return d.handleClearFilters()
        });
        null === (e = this.buttonSubmitElements.find(function(g) {
            return g.name == X.Constants.TYPE_SUBMIT_RANDOM
        })) || void 0 === e ? void 0 : e.addEventListener(W.EVENT_CLICK, function(g) {
            return d.handleSubmit(g, !0)
        });
        this.filtersObserver.listen("listValuesLength", function() {
            return d.handleFilters()
        });
        this.filtersObserver.listen("forceSearch", function() {
            return d.handleForceSearch()
        });
        this.filtersObserver.listen("listValuesLength", function() {
            return d.handleInputChange()
        });
        this.handleInputChange()
    }
    ;
    Fe.SearchDoodleForm.prototype.handleSubmit = function(a, b) {
        b = void 0 === b ? !1 : b;
        a.preventDefault();
        this.filtersObserver.data.forceCloseTabs = !0;
        a = new FormData(this.searchFormElement);
        b ? (this.formDataObserver.data.typeSubmit = X.Constants.TYPE_SUBMIT_RANDOM,
        this.genetateRandomDate()) : (this.formDataObserver.data.typeSubmit = X.Constants.TYPE_SUBMIT_SEARCH,
        this.formDataObserver.data.formData = [].concat(__wpcc.f.arrayFromIterable(a.entries())))
    }
    ;
    Fe.SearchDoodleForm.prototype.handleFilters = function() {
        this.tagsElement.children.length > this.filtersObserver.data.listValuesLength ? this.removeFilterTag() : this.addFilterTag();
        this.tagsElement.classList.toggle("has-one-element", 1 === this.filtersObserver.data.listValuesLength);
        this.tagsElement.classList.toggle("has-elements", 1 < this.filtersObserver.data.listValuesLength);
        this.tagsClearButtonElement.classList.toggle(W.CLASS_ACTIVE, 1 < this.filtersObserver.data.listValuesLength)
    }
    ;
    Fe.SearchDoodleForm.prototype.addFilterTag = function() {
        var a = this
          , b = this.filtersObserver.data.listValues[this.filtersObserver.data.listValues.length - 1]
          , c = this.templateTag.cloneNode(!0);
        c.querySelector(W.SELECTOR_TEMPLATE_TAG_ITEM).dataset[W.DATASET_NAME] = b.name;
        c.querySelector(W.SELECTOR_TEMPLATE_TAG_ITEM).dataset[W.DATASET_VALUE] = b.value;
        c.querySelector(W.SELECTOR_TEMPLATE_TAG_ITEM).classList.add("color-" + (b.theme ? b.theme : W.DEFAULT_THEME_COLOR));
        c.querySelector(W.SELECTOR_TEMPLATE_TAG_ITEM_LABEL).innerText = b.label;
        b.node_bg && c.querySelector(W.SELECTOR_TEMPLATE_TAG_ITEM_ICON).appendChild(b.node_bg);
        b.input.forEach(function(e) {
            var g = document.createElement("input");
            g.type = "hidden";
            g.name = e.name;
            g.value = e.value;
            c.querySelector(W.SELECTOR_TEMPLATE_TAG_ITEM).appendChild(g)
        });
        this.tagsElement.appendChild(c);
        var d = this.tagsElement.lastElementChild;
        d.addEventListener(W.EVENT_CLICK, function(e) {
            return a.handleTagClick(e, d)
        })
    }
    ;
    Fe.SearchDoodleForm.prototype.removeFilterTag = function() {
        var a = this;
        [].concat(__wpcc.f.arrayFromIterable(this.tagsElement.children)).forEach(function(b) {
            -1 == a.filtersObserver.data.listValues.findIndex(function(c) {
                return c.name == b.dataset[W.DATASET_NAME] && c.value == b.dataset[W.DATASET_VALUE]
            }) && b.remove()
        })
    }
    ;
    Fe.SearchDoodleForm.prototype.handleTagClick = function(a, b) {
        this.filtersObserver.data.removeCheck = [{
            name: b.dataset.name,
            value: b.dataset.value
        }];
        this.getFormHasValues() || (this.filtersObserver.data.forceSearch = !0)
    }
    ;
    Fe.SearchDoodleForm.prototype.handleInputChange = function() {
        var a = this.getFormHasValues();
        this.buttonSubmitElements[0].classList.toggle(W.CLASS_ACTIVE, a);
        this.buttonSubmitElements[1].classList.toggle(W.CLASS_ACTIVE, !a)
    }
    ;
    Fe.SearchDoodleForm.prototype.handleInputFocusOut = function() {
        !this.getFormHasValues() && this.formDataObserver.data.formData.find(function(a) {
            return a[0] == N.Constants.PARAM_TITLE
        }) && (this.filtersObserver.data.forceSearch = !0)
    }
    ;
    Fe.SearchDoodleForm.prototype.genetateRandomDate = function() {
        var a = new Date
          , b = a.getUTCFullYear()
          , c = Math.floor(Math.random() * (b - 1998) + 1998);
        a = Math.floor(Math.random() * ((c == b ? a.getMonth() + 1 : 12) - 1) + 1);
        this.formDataObserver.data.formData = [[N.Constants.PARAM_YEAR, "" + c], [N.Constants.PARAM_MONTH, "" + a]]
    }
    ;
    Fe.SearchDoodleForm.prototype.getFormHasValues = function() {
        return "" != this.inputSearchElement.value || 0 < this.filtersObserver.data.listValuesLength
    }
    ;
    Fe.SearchDoodleForm.prototype.handleForceSearch = function() {
        this.filtersObserver.data.forceSearch && (this.buttonSubmitElements.find(function(a) {
            return a.name = X.Constants.TYPE_SUBMIT_SEARCH
        }).click(),
        this.filtersObserver.data.forceSearch = !1)
    }
    ;
    Fe.SearchDoodleForm.prototype.handleClearFilters = function() {
        this.filtersObserver.data.removeCheck = [].concat(__wpcc.f.arrayFromIterable(this.tagsElement.children)).map(function(a) {
            return {
                name: a.dataset.name,
                value: a.dataset.value
            }
        });
        this.filtersObserver.data.forceSearch = !0
    }
    ;
    var He = {};
    Object.defineProperty(He, "__esModule", {
        value: !0
    });
    He.ResultsDoodleForm = void 0;
    var Y, Ie = Y || (Y = {});
    Ie.CLASS_ACTIVE = "active";
    Ie.CLASS_LIGHTS_OUT = "lights-out";
    Ie.CLASS_NO_RESULTS = "no-results";
    Ie.EVENT_CLICK = "click";
    Ie.SELECTOR_SEARCH_RESULTS_BUTTON = ".search-doodle__results-button";
    Ie.SELECTOR_SEARCH_RESULTS_EMPTY = ".search-doodle__results-empty";
    Ie.SELECTOR_SEARCH_RESULTS_LOADING = ".search-doodle__results-loading";
    Ie.SELECTOR_SEARCH_RESULTS_WRAPPER = ".search-doodle__results-wrapper";
    Ie.SELECTOR_TEMPLATE = "#search-doodle__card-template";
    Ie.SELECTOR_TEMPLATE_DATE = ".doodle-card-content__date";
    Ie.SELECTOR_TEMPLATE_EVENT = ".doodle-card-content__event";
    Ie.SELECTOR_TEMPLATE_IMG = ".doodle-card-img img";
    Ie.SELECTOR_TEMPLATE_LINK = "a.doodle-card-cta";
    Ie.DATA_G_CTA_URL = "data-g-cta_url";
    Ie.DATA_G_CTA_TEXT = "data-g-cta_text";
    He.ResultsDoodleForm = function(a, b, c, d) {
        var e = this;
        this.currentPage = 1;
        this.queryAPI = [];
        this.fnHandleClickResultsLightOut = function() {
            return e.handleClickResultsLightOut()
        }
        ;
        this.resultsModule = a;
        this.formDataObserver = b;
        this.filtersObserver = c;
        this.resultsDataObserver = d;
        this.resultsListElement = this.resultsModule.querySelector(Y.SELECTOR_SEARCH_RESULTS_WRAPPER);
        this.loadMoreButtonElement = this.resultsModule.querySelector(Y.SELECTOR_SEARCH_RESULTS_BUTTON);
        this.loadingElement = this.resultsModule.querySelector(Y.SELECTOR_SEARCH_RESULTS_LOADING);
        this.emptyElement = this.resultsModule.querySelector(Y.SELECTOR_SEARCH_RESULTS_EMPTY);
        this.templateDoodleCard = this.resultsModule.querySelector(Y.SELECTOR_TEMPLATE).content;
        this.loadMoreButtonElement.addEventListener(Y.EVENT_CLICK, function(g) {
            return e.handleClickLoadMore(g)
        });
        this.resultsDataObserver.listen("isLoading", function() {
            return e.handleLoading()
        });
        this.filtersObserver.listen("isTabOpen", function() {
            return e.handleIsTabOpen()
        })
    }
    ;
    He.ResultsDoodleForm.prototype.setResults = function(a, b) {
        this.appendResults(a);
        this.queryAPI = b
    }
    ;
    He.ResultsDoodleForm.prototype.appendResults = function(a) {
        var b = this;
        a.result && 0 < a.result.length ? (a.result.forEach(function(c) {
            var d = b.templateDoodleCard.cloneNode(!0)
              , e = d.querySelector(Y.SELECTOR_TEMPLATE_LINK);
            e.href += c.name + "/";
            d.querySelector(Y.SELECTOR_TEMPLATE_IMG).src = c.high_res_url;
            d.querySelector(Y.SELECTOR_TEMPLATE_IMG).alt = c.title;
            d.querySelector(Y.SELECTOR_TEMPLATE_DATE).innerHTML = (new Date(c.run_date_array[0],c.run_date_array[1] - 1,c.run_date_array[2])).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });
            d.querySelector(Y.SELECTOR_TEMPLATE_EVENT).innerHTML = c.title;
            e.setAttribute(Y.DATA_G_CTA_URL, e.href);
            e.setAttribute(Y.DATA_G_CTA_TEXT, c.title);
            new wd.AnalyticsGlobal(e);
            b.resultsListElement.appendChild(d)
        }),
        this.resultsDataObserver.data.resultsList.push(a.result),
        this.currentPage += 1,
        this.loadMoreButtonElement.classList.toggle(Y.CLASS_ACTIVE, !!a.next)) : this.loadMoreButtonElement.classList.remove(Y.CLASS_ACTIVE);
        this.handleResultsList()
    }
    ;
    He.ResultsDoodleForm.prototype.clearResults = function() {
        for (; this.resultsListElement.firstChild; )
            this.resultsListElement.removeChild(this.resultsListElement.firstChild);
        this.resultsDataObserver.data.resultsList = [];
        this.currentPage = 1
    }
    ;
    He.ResultsDoodleForm.prototype.handleClickLoadMore = function(a) {
        var b = this;
        a.preventDefault();
        this.formDataObserver.data.typeSubmit = X.Constants.TYPE_SUBMIT_APPEND;
        this.formDataObserver.data.formData = this.queryAPI.map(function(c) {
            return c[0] == N.Constants.PARAM_PAGE ? [c[0], "" + b.currentPage] : c
        })
    }
    ;
    He.ResultsDoodleForm.prototype.handleResultsList = function() {
        0 == this.resultsDataObserver.data.resultsList.length && (this.resultsModule.classList.toggle(Y.CLASS_NO_RESULTS),
        this.emptyElement.classList.toggle(Y.CLASS_ACTIVE))
    }
    ;
    He.ResultsDoodleForm.prototype.handleLoading = function() {
        this.loadingElement.classList.toggle(Y.CLASS_ACTIVE, this.resultsDataObserver.data.isLoading);
        this.resultsDataObserver.data.isLoading && (this.emptyElement.classList.remove(Y.CLASS_ACTIVE),
        this.resultsModule.classList.remove(Y.CLASS_NO_RESULTS),
        this.loadMoreButtonElement.classList.toggle(Y.CLASS_ACTIVE, !this.resultsDataObserver.data.isLoading))
    }
    ;
    He.ResultsDoodleForm.prototype.handleIsTabOpen = function() {
        this.resultsModule.classList.toggle(Y.CLASS_LIGHTS_OUT, this.filtersObserver.data.isTabOpen);
        this.filtersObserver.data.isTabOpen ? this.resultsModule.addEventListener(Y.EVENT_CLICK, this.fnHandleClickResultsLightOut) : this.resultsModule.removeEventListener(Y.EVENT_CLICK, this.fnHandleClickResultsLightOut)
    }
    ;
    He.ResultsDoodleForm.prototype.handleClickResultsLightOut = function() {
        this.filtersObserver.data.forceCloseTabs = !0
    }
    ;
    var X = {};
    Object.defineProperty(X, "__esModule", {
        value: !0
    });
    X.Constants = X.SearchDoodle = void 0;
    var Je = X.Constants || (X.Constants = {});
    Je.CLASS_ACTIVE = "active";
    Je.EVENT_CHANGE = "change";
    Je.EVENT_CLICK = "click";
    Je.EVENT_INPUT = "input";
    Je.EVENT_PAGESHOW = "pageshow";
    Je.EVENT_POPSTATE = "popstate";
    Je.SELECTOR_FORM = "form";
    Je.SELECTOR_SEARCH_BOX = ".search-doodle__box";
    Je.SELECTOR_SEARCH_FILTER = ".search-doodle__filter";
    Je.SELECTOR_SEARCH_RESULTS = ".search-doodle__results";
    Je.TAG_INPUT = "INPUT";
    Je.TAG_SELECT = "SELECT";
    Je.TYPE_SUBMIT_RANDOM = "random";
    Je.TYPE_SUBMIT_SEARCH = "search";
    Je.TYPE_SUBMIT_APPEND = "append";
    X.SearchDoodle = function(a) {
        var b = this;
        this.currentPage = 1;
        this.hasToSetParams = !0;
        this.searchModule = a;
        this.formElement = this.searchModule.querySelector(X.Constants.SELECTOR_SEARCH_BOX);
        this.filterElement = this.searchModule.querySelector(X.Constants.SELECTOR_SEARCH_FILTER);
        this.resultsElement = this.searchModule.querySelector(X.Constants.SELECTOR_SEARCH_RESULTS);
        this.filtersObserver = new Tb.Observer({
            listValues: [],
            listValuesLength: 0,
            removeCheck: [],
            forceSearch: !1,
            forceCloseTabs: !1,
            isTabOpen: !1
        });
        this.formDataObserver = new Tb.Observer({
            formData: null,
            typeSubmit: X.Constants.TYPE_SUBMIT_SEARCH
        });
        this.resultsDataObserver = new Tb.Observer({
            resultsList: [],
            isLoading: !1,
            formData: null
        });
        this.formDataObserver.listen("formData", function() {
            return b.loadContent()
        });
        this.searchDoodleForm = new Fe.SearchDoodleForm(this.formElement,this.filtersObserver,this.formDataObserver);
        this.searchDoodleFilter = new Ee.SearchDoodleFilter(this.filterElement,this.filtersObserver);
        this.resultsDoodleFilter = new He.ResultsDoodleForm(this.resultsElement,this.formDataObserver,this.filtersObserver,this.resultsDataObserver);
        window.addEventListener(X.Constants.EVENT_POPSTATE, function() {
            return b.handleInitialLoad()
        });
        window.addEventListener(X.Constants.EVENT_PAGESHOW, function(c) {
            c.persisted && b.formDataObserver.data.typeSubmit == X.Constants.TYPE_SUBMIT_RANDOM && (c.stopImmediatePropagation(),
            window.location.reload())
        });
        this.handleInitialLoad()
    }
    ;
    X.SearchDoodle.prototype.loadContent = function() {
        var a = this
          , b = Object.assign({}, this.formDataObserver.data);
        [X.Constants.TYPE_SUBMIT_RANDOM, X.Constants.TYPE_SUBMIT_SEARCH].includes(b.typeSubmit) && this.resultsDoodleFilter.clearResults();
        this.hasToSetParams && this.setParams();
        this.hasToSetParams = !0;
        this.resultsDataObserver.data.isLoading = !0;
        var c = new N.APIDoodles;
        b.formData && c.setParams(b.formData);
        c.fetch().then(function(d) {
            if (200 == d.response.status)
                switch (b.typeSubmit) {
                case X.Constants.TYPE_SUBMIT_SEARCH:
                    a.resultsDoodleFilter.setResults(d.response.json, d.getParamsArray());
                    break;
                case X.Constants.TYPE_SUBMIT_APPEND:
                    a.resultsDoodleFilter.appendResults(d.response.json);
                    break;
                case X.Constants.TYPE_SUBMIT_RANDOM:
                    a.redirectToRandom(d.response.json)
                }
            else
                400 == d.response.status && (a.resultsDataObserver.data.resultsList = []);
            b.typeSubmit != X.Constants.TYPE_SUBMIT_RANDOM && (a.resultsDataObserver.data.isLoading = !1)
        })
    }
    ;
    X.SearchDoodle.prototype.redirectToRandom = function(a) {
        0 < a.result.length ? window.location.href = "" + this.searchModule.dataset.doodleUrl + a.result[Math.floor(Math.random() * a.result.length)].name + "/" : this.searchDoodleForm.genetateRandomDate()
    }
    ;
    X.SearchDoodle.prototype.handleInitialLoad = function() {
        this.hasToSetParams = !1;
        this.loadParams() ? this.filtersObserver.data.forceSearch = !0 : this.loadContent()
    }
    ;
    X.SearchDoodle.prototype.setParams = function() {
        var a = ".";
        this.searchDoodleForm.getFormHasValues() && (a = "?" + this.filtersObserver.data.listValues.map(function(b) {
            return b.name + "=" + b.value
        }).concat(this.searchDoodleForm.inputSearchElement.value ? this.searchDoodleForm.inputSearchElement.name + "=" + this.searchDoodleForm.inputSearchElement.value : []).join("&"));
        history.pushState({
            page_id: history.length + 1
        }, "", a)
    }
    ;
    X.SearchDoodle.prototype.loadParams = function() {
        var a = this
          , b = new URL(window.location.href)
          , c = [].concat(__wpcc.f.arrayFromIterable(b.searchParams.entries()))
          , d = 0 < c.length;
        d && (this.filtersObserver.data.listValuesLength && (this.filtersObserver.data.listValues = [],
        this.filtersObserver.data.listValuesLength = 0,
        this.filterElement.querySelector(X.Constants.SELECTOR_FORM).reset(),
        this.formElement.querySelector(X.Constants.SELECTOR_FORM).reset()),
        c.forEach(function(e) {
            var g = e[1].toLowerCase();
            if (e[0] == N.Constants.PARAM_TITLE) {
                if (g = a.formElement.querySelector('[name="' + N.Constants.PARAM_TITLE + '"]'))
                    g.value = b.searchParams.get(e[0]),
                    g.dispatchEvent(new Event(X.Constants.EVENT_INPUT,{
                        bubbles: !0
                    }))
            } else {
                var h = a.filterElement.querySelector('[name="' + e[0] + '"]');
                h.tagName == X.Constants.TAG_INPUT && (e = a.filterElement.querySelector('[name="' + e[0] + '"][value="' + g + '"]')) && (e.checked = !0,
                e.dispatchEvent(new Event(X.Constants.EVENT_CHANGE)));
                h && h.tagName == X.Constants.TAG_SELECT && (h.value = g,
                h.dispatchEvent(new Event(X.Constants.EVENT_CHANGE)))
            }
        }),
        this.searchDoodleFilter.hasUpdatedFilters = !1);
        return d
    }
    ;
    var Ke = {};
    Object.defineProperty(Ke, "__esModule", {
        value: !0
    });
    Ke.SocialShare = void 0;
    Ke.SocialShare = function() {
        var a = document.querySelectorAll(".share-container")
          , b = document.querySelector(".glue-social");
        b && new M.Social(b);
        null === a || void 0 === a ? void 0 : a.forEach(function(c) {
            var d = c.querySelectorAll(".share-item")
              , e = c.querySelectorAll(".share-link");
            c = c.querySelector(".share-button");
            var g = null === c || void 0 === c ? void 0 : c.querySelector(".share-icon")
              , h = null === c || void 0 === c ? void 0 : c.querySelector(".close-icon");
            null === e || void 0 === e ? void 0 : e.forEach(function(l) {
                var m, p, q = window.location.href;
                l.href = null === (m = null === l || void 0 === l ? void 0 : l.href) || void 0 === m ? void 0 : m.replace("share_url", q);
                null === (p = l.querySelector("input")) || void 0 === p ? void 0 : p.setAttribute("value", q);
                l.classList.contains("copy-to-clipboard") && l.addEventListener("click", function() {
                    navigator.clipboard.writeText(q);
                    l.classList.contains("copied") || (l.classList.add("copied"),
                    setTimeout(function() {
                        l.classList.remove("copied")
                    }, 2E3))
                })
            });
            null === c || void 0 === c ? void 0 : c.addEventListener("click", function() {
                e && g && h && d && ("0" === g.style.opacity ? (e.forEach(function(l) {
                    return l.setAttribute("tabindex", "-1")
                }),
                g.style.opacity = "1",
                h.style.opacity = "0",
                d.forEach(function(l) {
                    l.classList.remove("show")
                })) : (e.forEach(function(l) {
                    return l.removeAttribute("tabindex")
                }),
                g.style.opacity = "0",
                h.style.opacity = "1",
                d.forEach(function(l) {
                    l.classList.add("show")
                })))
            })
        })
    }
    ;
    var Le = {};
    Object.defineProperty(Le, "__esModule", {
        value: !0
    });
    Le.SubNav = void 0;
    var Me, Ne = Me || (Me = {});
    Ne.A = "a";
    Ne.GLUE_JUMPLINKS_LIST = ".glue-jumplinks__list";
    Ne.GLUE_JUMPLINKS_LIST_ITEM = ".glue-jumplinks__list-item";
    Ne.HREF = "href";
    Ne.TEMPLATE = ".template";
    Le.SubNav = function(a) {
        var b = a.querySelector(Me.TEMPLATE).content.querySelectorAll(Me.GLUE_JUMPLINKS_LIST_ITEM)
          , c = a.querySelector(Me.GLUE_JUMPLINKS_LIST);
        (function() {
            b.forEach(function(d) {
                var e = d.querySelector(Me.A).getAttribute(Me.HREF);
                document.querySelector("" + e) && c.appendChild(d)
            })
        }
        )();
        new Vc.Jumplinks(a,{
            belowHeader: !0
        })
    }
    ;
    var Oe = {};
    Object.defineProperty(Oe, "__esModule", {
        value: !0
    });
    Oe.Constants = void 0;
    var Pe = Oe.Constants || (Oe.Constants = {});
    Pe.NODE_CAROUSEL = ".glue-carousel.timeline-carousel";
    Pe.PREV_NAV_MOBILE_BUTTON = "prev-mobile-btn";
    Pe.NEXT_NAV_MOBILE_BUTTON = "next-mobile-btn";
    Pe.EVENT_CLICK = "click";
    var Qe = {};
    Object.defineProperty(Qe, "__esModule", {
        value: !0
    });
    Qe.Timeline = void 0;
    Qe.Timeline = function() {
        var a = document.querySelectorAll(Oe.Constants.NODE_CAROUSEL);
        (null === a || void 0 === a ? 0 : a.length) && a.forEach(function(b) {
            var c = new M.Carousel(b)
              , d = b.querySelector("#" + Oe.Constants.PREV_NAV_MOBILE_BUTTON);
            b = b.querySelector("#" + Oe.Constants.NEXT_NAV_MOBILE_BUTTON);
            null === d || void 0 === d ? void 0 : d.addEventListener(Oe.Constants.EVENT_CLICK, function() {
                null === c || void 0 === c ? void 0 : c.previous()
            });
            null === b || void 0 === b ? void 0 : b.addEventListener(Oe.Constants.EVENT_CLICK, function() {
                null === c || void 0 === c ? void 0 : c.next()
            })
        })
    }
    ;
    var Re = {};
    Object.defineProperty(Re, "__esModule", {
        value: !0
    });
    Re.ToutCarousel = void 0;
    Re.ToutCarousel = function() {
        this.init()
    }
    ;
    Re.ToutCarousel.prototype.init = function() {
        var a = document.querySelector(".glue-carousel.tout-carousel")
          , b = null;
        if (a) {
            b = new M.Carousel(a);
            var c = a.querySelector("#prev-mobile-btn");
            a = a.querySelector("#next-mobile-btn");
            null === c || void 0 === c ? void 0 : c.addEventListener("click", function() {
                null === b || void 0 === b ? void 0 : b.previous()
            });
            null === a || void 0 === a ? void 0 : a.addEventListener("click", function() {
                null === b || void 0 === b ? void 0 : b.next()
            })
        }
    }
    ;
    var Se = {}
      , Te = this && Se.__awaiter || function(a, b, c, d) {
        function e(g) {
            return g instanceof c ? g : new c(function(h) {
                h(g)
            }
            )
        }
        return new (c || (c = Promise))(function(g, h) {
            function l(q) {
                try {
                    p(d.next(q))
                } catch (r) {
                    h(r)
                }
            }
            function m(q) {
                try {
                    p(d["throw"](q))
                } catch (r) {
                    h(r)
                }
            }
            function p(q) {
                q.done ? g(q.value) : e(q.value).then(l, m)
            }
            p((d = d.apply(a, b || [])).next())
        }
        )
    }
    ;
    Object.defineProperty(Se, "__esModule", {
        value: !0
    });
    Se.VideoCarousel = void 0;
    var Z, Ue = Z || (Z = {});
    Ue.CLASS_GLUE_CAROUSEL = ".glue-carousel";
    Ue.CLASS_GLUE_CAROUSEL_ITEM = ".glue-carousel__item";
    Ue.CLASS_GLUE_CAROUSEL_ITEM_CLONE = ".glue-carousel__item__clone";
    Ue.CLASS_PAUSE_ICON = ".pause-icon";
    Ue.CLASS_PLAY_BUTTON = ".play-button";
    Ue.CLASS_PLAY_BUTTON_CAROUSEL = ".play-button--carousel";
    Ue.CLASS_PLAY_ICON = ".play-icon";
    Ue.CLASS_VIDEO_CAROUSEL_SLIDE = ".video-carousel__slide";
    Ue.CLICK = "click";
    Ue.DISABLED = "disabled";
    Ue.GLUE_CAROUSEL_NAVIGATION = ".glue-carousel__navigation";
    Ue.GLUE_VIDEO = ".glue-video";
    Ue.HIDE = "hide";
    Ue.PLAYING = "playing";
    Ue.SMOOTH = "smooth";
    Ue.START = "start";
    Ue.STYLE_OPACITY_0 = "0";
    Ue.STYLE_OPACITY_1 = "1";
    Ue.TOUCHED = "touched";
    Se.VideoCarousel = function(a) {
        var b = this;
        this.isPlaying = !1;
        this.currentVideoIndex = 0;
        this.videoPlayers = [];
        this.triggerClickChangeSlide = !1;
        this.module = a;
        this.videoElements = [].concat(__wpcc.f.arrayFromIterable(this.module.querySelectorAll(Z.GLUE_VIDEO)));
        this.slides = this.module.querySelectorAll(Z.CLASS_VIDEO_CAROUSEL_SLIDE);
        this.carouselPlayButtons = [].concat(__wpcc.f.arrayFromIterable(this.module.querySelectorAll(Z.CLASS_PLAY_BUTTON_CAROUSEL)));
        this.videoElements.forEach(function(c, d) {
            var e, g = new M.YoutubeVideo(c,{
                events: {
                    onReady: function() {
                        c.querySelector(Z.CLASS_PLAY_BUTTON).removeAttribute(Z.DISABLED)
                    },
                    onStateChange: function(h) {
                        1 !== h.data && 2 !== h.data || b._handlePlayerEventChange(h, d)
                    }
                }
            });
            b.videoPlayers.push(g);
            null === (e = c.querySelector(Z.CLASS_PLAY_BUTTON)) || void 0 === e ? void 0 : e.addEventListener(Z.CLICK, function() {
                b.triggerPlayPause(g, d)
            });
            Array.from(b.carouselPlayButtons).filter(function(h) {
                return parseInt(h.dataset.index) == d + 1
            }).forEach(function(h) {
                h.addEventListener(Z.CLICK, function() {
                    return Te(b, void 0, void 0, function m() {
                        var p = this, q;
                        return __wpcc.f.generator.createGenerator(m, function(r) {
                            q = p;
                            p.swapVideo(d);
                            setTimeout(function() {
                                q.triggerPlayPause(g, d)
                            }, 0);
                            r.jumpToEnd()
                        })
                    })
                })
            })
        });
        this.carousel = new Q.Carousel(this.module.querySelector(Z.CLASS_GLUE_CAROUSEL));
        this.carousel.observer.listen("currentSlide", function() {
            return b.handleCurrentSlide()
        });
        this.allVideoElements = [].concat(__wpcc.f.arrayFromIterable(this.module.querySelectorAll(Z.CLASS_GLUE_CAROUSEL_ITEM)));
        this.allVideoElements.forEach(function(c) {
            c.querySelector(Z.CLASS_PLAY_BUTTON_CAROUSEL).addEventListener(Z.CLICK, function(d) {
                return b.handleAllPlayButtons(d, c)
            })
        });
        6 < this.slides.length && (this.module.querySelector(Z.GLUE_CAROUSEL_NAVIGATION).innerHTML = "")
    }
    ;
    Se.VideoCarousel.prototype._handlePlayerEventChange = function(a, b) {
        var c = this.videoElements[b].querySelector(Z.CLASS_PLAY_ICON)
          , d = this.videoElements[b].querySelector(Z.CLASS_PAUSE_ICON)
          , e = Array.from(this.slides).filter(function(g) {
            return parseInt(g.dataset.index) == b + 1
        });
        this.carouselPlayButtons;
        this.isPlaying = 1 !== a.data;
        this.module.classList.contains(Z.TOUCHED) || this.module.classList.add(Z.TOUCHED);
        this.isPlaying ? (d.style.opacity = Z.STYLE_OPACITY_0,
        c.style.opacity = Z.STYLE_OPACITY_1,
        e.forEach(function(g) {
            g.classList.remove(Z.PLAYING)
        })) : (c.style.opacity = Z.STYLE_OPACITY_0,
        d.style.opacity = Z.STYLE_OPACITY_1,
        e.forEach(function(g) {
            g.classList.add(Z.PLAYING)
        }))
    }
    ;
    Se.VideoCarousel.prototype.triggerPlayPause = function(a) {
        a = a.getPlayer();
        1 !== a.getPlayerState() ? (this.module.scrollIntoView({
            behavior: Z.SMOOTH,
            block: Z.START
        }),
        a.playVideo()) : a.pauseVideo()
    }
    ;
    Se.VideoCarousel.prototype.swapVideo = function(a) {
        a !== this.currentVideoIndex && (this.videoPlayers[this.currentVideoIndex].getPlayer().pauseVideo(),
        this.videoElements[this.currentVideoIndex].classList.add(Z.HIDE),
        this.videoElements[a].classList.remove(Z.HIDE),
        this.currentVideoIndex = a)
    }
    ;
    Se.VideoCarousel.prototype.handleAllPlayButtons = function(a, b) {
        a = this.allVideoElements.indexOf(b) - this.carousel.options.cyclicalAditionalCards + 1;
        a != this.carousel.getCurrentSlide() && (this.triggerClickChangeSlide = !0,
        this.carousel.setCurrentSlide(a))
    }
    ;
    Se.VideoCarousel.prototype.handleCurrentSlide = function() {
        var a = this.carousel.getCurrentSlide();
        !this.triggerClickChangeSlide || a > this.videoElements.length || 1 > a || (this.carouselPlayButtons[a - 1].click(),
        this.triggerClickChangeSlide = !1)
    }
    ;
    var Ve = {};
    Object.defineProperty(Ve, "__esModule", {
        value: !0
    });
    Ve.Constants = void 0;
    var We = Ve.Constants || (Ve.Constants = {});
    We.CLASS_GLUE_VIDEO_PREVIEW_CONTAINER = ".glue-video__preview-container";
    We.CLASS_GLUE_VIDEO_CONTAINER_INLINE = ".glue-video__container--inline";
    We.CLASS_PLAY_BUTTON = ".play-btn";
    We.CLASS_PAUSE_BUTTON = ".pause-btn";
    We.ID_PLAY_BUTTON = "play-button";
    We.STYLE_DISPLAY_BLOCK = "block";
    We.STYLE_DISPLAY_NONE = "none";
    We.STYLE_OPACITY_1 = "1";
    We.STYLE_OPACITY_0 = "0";
    We.DISABLED = "disabled";
    var Xe = {};
    Object.defineProperty(Xe, "__esModule", {
        value: !0
    });
    Xe.VideoPlayer = void 0;
    Xe.VideoPlayer = function(a) {
        var b = this, c;
        this.isPlaying = !1;
        this.videoContainer = this.imgPreview = this.pauseButton = this.playButton = this.playerButton = null;
        if (a) {
            var d = new M.YoutubeVideo(a,{
                events: {
                    onReady: function() {
                        return b._handlePlayerReady(d)
                    },
                    onStateChange: function(e) {
                        return b._handlePlayerEventChange(e)
                    }
                }
            });
            this.playerButton = document.getElementById(Ve.Constants.ID_PLAY_BUTTON);
            null === (c = this.playerButton) || void 0 === c ? void 0 : c.addEventListener("click", function() {
                b._handlePlayPause()
            });
            a.videoPlayer = d
        }
    }
    ;
    Xe.VideoPlayer.prototype._handlePlayerReady = function(a) {
        this.player = a.getPlayer();
        this.imgPreview = document.querySelector(Ve.Constants.CLASS_GLUE_VIDEO_PREVIEW_CONTAINER);
        this.videoContainer = document.querySelector(Ve.Constants.CLASS_GLUE_VIDEO_CONTAINER_INLINE);
        this.playerButton && (this.playButton = this.playerButton.querySelector(Ve.Constants.CLASS_PLAY_BUTTON),
        this.pauseButton = this.playerButton.querySelector(Ve.Constants.CLASS_PAUSE_BUTTON),
        this.playerButton.removeAttribute(Ve.Constants.DISABLED))
    }
    ;
    Xe.VideoPlayer.prototype._handlePlayPause = function() {
        !this.isPlaying && this.player ? (this.player.playVideo(),
        this.playButton && this.pauseButton && this.imgPreview && this.videoContainer && (this.isPlaying = !0,
        this.playButton.style.display = Ve.Constants.STYLE_DISPLAY_NONE,
        this.pauseButton.style.display = Ve.Constants.STYLE_DISPLAY_BLOCK,
        this.imgPreview.style.display = Ve.Constants.STYLE_DISPLAY_NONE,
        this.videoContainer.style.display = Ve.Constants.STYLE_DISPLAY_BLOCK,
        this.imgPreview.style.opacity = Ve.Constants.STYLE_OPACITY_0,
        this.videoContainer.style.opacity = Ve.Constants.STYLE_OPACITY_1)) : (this.player.pauseVideo(),
        this.playButton && this.pauseButton && this.imgPreview && this.videoContainer && (this.isPlaying = !1,
        this.playButton.style.display = Ve.Constants.STYLE_DISPLAY_BLOCK,
        this.pauseButton.style.display = Ve.Constants.STYLE_DISPLAY_NONE))
    }
    ;
    Xe.VideoPlayer.prototype._handlePlayerEventChange = function(a) {
        this.isPlaying = 2 === a.data ? !0 : !1;
        this._handlePlayPause()
    }
    ;
    Object.defineProperty({}, "__esModule", {
        value: !0
    });
    var Ye = document.querySelector(".glue-header");
    Ye && new M.Header(Ye);
    var Ze = document.querySelector(".glue-footer");
    Ze && new M.Footer(Ze);
    var $e = document.querySelector(".sub-nav");
    $e && new Le.SubNav($e);
    document.querySelectorAll(".full-bleed-map").forEach(function(a) {
        return new ee.FullBleedMap(a)
    });
    document.querySelectorAll(".map").forEach(function(a) {
        return new se.Map(a)
    });
    document.querySelectorAll(".discover").forEach(function(a) {
        return new ae.Discover(a)
    });
    document.querySelectorAll(".video-player").forEach(function(a) {
        return new Xe.VideoPlayer(a)
    });
    document.querySelectorAll(".qna-carousel").forEach(function(a) {
        return new te.QnACarousel(a)
    });
    document.querySelectorAll(".cards-stack.toggle-quote").forEach(function(a) {
        return new Bd.CardsStack(a)
    });
    document.querySelectorAll(".reveal-image-carousel").forEach(function(a) {
        return new Be.RevealImageCarousel(a)
    });
    document.querySelectorAll(".image-carousel").forEach(function(a) {
        return new ne.ImageCarousel(a)
    });
    document.querySelectorAll(".birthday-doodle").forEach(function(a) {
        return new yd.BirthdayDoodle(a)
    });
    document.querySelectorAll(".quiz").forEach(function(a) {
        return new ve.Quiz(a)
    });
    document.querySelectorAll(".hero-tag-carousel").forEach(function(a) {
        return new le.HeroTagCarousel(a)
    });
    document.querySelectorAll(".search-doodle").forEach(function(a) {
        return new X.SearchDoodle(a)
    });
    document.querySelectorAll(".faq-expansion-panels.glue-expansion-panels").forEach(function(a) {
        return new be.FAQ(a)
    });
    document.querySelectorAll(".video-carousel").forEach(function(a) {
        return new Se.VideoCarousel(a)
    });
    document.querySelectorAll(".timeline").forEach(function() {
        return new Qe.Timeline
    });
    document.querySelectorAll("[data-g-event-trigger]").forEach(function(a) {
        return new wd.AnalyticsGlobal(a)
    });
    document.querySelectorAll(".full-width-card-list").forEach(function(a) {
        return new fe.FullWidthCardList(a)
    });
    document.querySelectorAll(".hero-doodle.doodle-module").forEach(function(a) {
        return new ie.HeroDoodle(a)
    });
    document.querySelectorAll(".key-themes").forEach(function(a) {
        return new pe.KeyThemes(a)
    });
    var af = td.AddLinkClass.getInstance();
    document.querySelectorAll(".add_link_class").forEach(function(a) {
        return af.addClass(a)
    });
    new Rd.ContentBlock;
    new Ke.SocialShare;
    new Re.ToutCarousel;
}
).call(this || window, (window.__wpcc = window.__wpcc || {}));

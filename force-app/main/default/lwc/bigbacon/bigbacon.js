// (function (global, factory) {
// typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
// typeof define === 'function' && define.amd ? define(['exports'], factory) :
// (global = global || self, factory(global.Bacon = {}));
// }(this, (function (exports) { 'use strict';

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};
function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function nop() { }
var isArray = Array.isArray || function (xs) { return xs instanceof Array; };
function isObservable(x) {
    return x && x._isObservable;
}

function all(xs, f) {
    for (var i = 0, x; i < xs.length; i++) {
        x = xs[i];
        if (!f(x)) {
            return false;
        }
    }
    return true;
}
function always(x) { return function () { return x; }; }
function any(xs, f) {
    for (var i = 0, x; i < xs.length; i++) {
        x = xs[i];
        if (f(x)) {
            return true;
        }
    }
    return false;
}
function bind(fn, me) {
    return function () { return fn.apply(me, arguments); };
}
function contains(xs, x) { return indexOf(xs, x) !== -1; }
function each(xs, f) {
    for (var key in xs) {
        if (Object.prototype.hasOwnProperty.call(xs, key)) {
            var value = xs[key];
            f(key, value);
        }
    }
}
function empty(xs) { return xs.length === 0; }
function filter(f, xs) {
    var filtered = [];
    for (var i = 0, x; i < xs.length; i++) {
        x = xs[i];
        if (f(x)) {
            filtered.push(x);
        }
    }
    return filtered;
}
function flatMap(f, xs) {
    return fold(xs, [], (function (ys, x) {
        return ys.concat(f(x));
    }));
}
function flip(f) {
    return function (a, b) { return f(b, a); };
}
function fold(xs, seed, f) {
    for (var i = 0, x; i < xs.length; i++) {
        x = xs[i];
        seed = f(seed, x);
    }
    return seed;
}
function head(xs) {
    return xs[0];
}
function id(x) { return x; }
function indexOfDefault(xs, x) { return xs.indexOf(x); }
function indexOfFallback(xs, x) {
    for (var i = 0, y; i < xs.length; i++) {
        y = xs[i];
        if (x === y) {
            return i;
        }
    }
    return -1;
}
var indexOf = Array.prototype.indexOf ? indexOfDefault : indexOfFallback;
function indexWhere(xs, f) {
    for (var i = 0, y; i < xs.length; i++) {
        y = xs[i];
        if (f(y)) {
            return i;
        }
    }
    return -1;
}
function isFunction(f) { return typeof f === "function"; }
function last(xs) { return xs[xs.length - 1]; }
function map(f, xs) {
    var result = [];
    for (var i = 0, x; i < xs.length; i++) {
        x = xs[i];
        result.push(f(x));
    }
    return result;
}
function negate(f) { return function (x) { return !f(x); }; }
function remove(x, xs) {
    var i = indexOf(xs, x);
    if (i >= 0) {
        return xs.splice(i, 1);
    }
}
function tail(xs) {
    return xs.slice(1, xs.length);
}
function toArray(xs) { return (isArray(xs) ? xs : [xs]); }
function toFunction(f) {
    if (typeof f == "function") {
        return f;
    }
    return function (x) { return f; };
}
function toString(obj) {
    var hasProp = {}.hasOwnProperty;
    try {
        recursionDepth++;
        if (obj == null) {
            return "undefined";
        }
        else if (isFunction(obj)) {
            return "function";
        }
        else if (isArray(obj)) {
            if (recursionDepth > 5) {
                return "[..]";
            }
            return "[" + map(toString, obj).toString() + "]";
        }
        else if (((obj != null ? obj.toString : void 0) != null) && obj.toString !== Object.prototype.toString) {
            return obj.toString();
        }
        else if (typeof obj === "object") {
            if (recursionDepth > 5) {
                return "{..}";
            }
            var results = [];
            for (var key in obj) {
                if (!hasProp.call(obj, key))
                    continue;
                var value = (function () {
                    try {
                        return obj[key];
                    }
                    catch (error) {
                        return error;
                    }
                })();
                results.push(toString(key) + ":" + toString(value));
            }
            return "{" + results + "}";
        }
        else {
            return obj;
        }
    }
    finally {
        recursionDepth--;
    }
}
function without(x, xs) {
    return filter((function (y) { return y !== x; }), xs);
}
var _ = {
    indexOf: indexOf,
    indexWhere: indexWhere,
    head: head,
    always: always,
    negate: negate,
    empty: empty,
    tail: tail,
    filter: filter,
    map: map,
    each: each,
    toArray: toArray,
    contains: contains,
    id: id,
    last: last,
    all: all,
    any: any,
    without: without,
    remove: remove,
    fold: fold,
    flatMap: flatMap,
    bind: bind,
    isFunction: isFunction,
    toFunction: toFunction,
    toString: toString
};
var recursionDepth = 0;

var more = undefined;
var noMore = "<no-more>";

function assert(message, condition) {
    if (!condition) {
        throw new Error(message);
    }
}
function assertEventStream(event) {
    if (!(event != null ? event._isEventStream : void 0)) {
        throw new Error("not an EventStream : " + event);
    }
}
function assertObservable(observable) {
    if (!(observable != null ? observable._isObservable : void 0)) {
        throw new Error("not an Observable : " + observable);
    }
}
function assertFunction(f) {
    return assert("not a function : " + f, _.isFunction(f));
}
function assertArray(xs) {
    if (!isArray(xs)) {
        throw new Error("not an array : " + xs);
    }
}
function assertNoArguments(args) {
    return assert("no arguments supported", args.length === 0);
}

var defaultScheduler = {
    setTimeout: function (f, d) { return setTimeout(f, d); },
    setInterval: function (f, i) { return setInterval(f, i); },
    clearInterval: function (id) { return clearInterval(id); },
    clearTimeout: function (id) { return clearTimeout(id); },
    now: function () { return new Date().getTime(); }
};
var GlobalScheduler = {
    scheduler: defaultScheduler
};
function getScheduler() {
    return GlobalScheduler.scheduler;
}
function setScheduler(newScheduler) {
    GlobalScheduler.scheduler = newScheduler;
}

var rootEvent = undefined;
var waiterObs = [];
var waiters = {};
var aftersStack = [];
var aftersStackHeight = 0;
var flushed = {};
var processingAfters = false;
function toString$1() {
    return _.toString({ rootEvent: rootEvent, processingAfters: processingAfters, waiterObs: waiterObs, waiters: waiters, aftersStack: aftersStack, aftersStackHeight: aftersStackHeight, flushed: flushed });
}
function ensureStackHeight(h) {
    if (h <= aftersStackHeight)
        return;
    if (!aftersStack[h - 1]) {
        aftersStack[h - 1] = [[], 0];
    }
    aftersStackHeight = h;
}
function isInTransaction() {
    return rootEvent !== undefined;
}
function soonButNotYet(obs, f) {
    if (rootEvent) {
        whenDoneWith(obs, f);
    }
    else {
        GlobalScheduler.scheduler.setTimeout(f, 0);
    }
}
function afterTransaction(obs, f) {
    if (rootEvent || processingAfters) {
        ensureStackHeight(1);
        var stackIndexForThisObs = 0;
        while (stackIndexForThisObs < aftersStackHeight - 1) {
            if (containsObs(obs, aftersStack[stackIndexForThisObs][0])) {
                break;
            }
            stackIndexForThisObs++;
        }
        var listFromStack = aftersStack[stackIndexForThisObs][0];
        listFromStack.push([obs, f]);
        if (!rootEvent) {
            processAfters();
        }
    }
    else {
        return f();
    }
}
function containsObs(obs, aftersList) {
    for (var i = 0; i < aftersList.length; i++) {
        if (aftersList[i][0].id == obs.id)
            return true;
    }
    return false;
}
function processAfters() {
    var stackSizeAtStart = aftersStackHeight;
    if (!stackSizeAtStart)
        return;
    var isRoot = !processingAfters;
    processingAfters = true;
    try {
        while (aftersStackHeight >= stackSizeAtStart) { 
            var topOfStack = aftersStack[aftersStackHeight - 1];
            if (!topOfStack)
                throw new Error("Unexpected stack top: " + topOfStack);
            var topAfters = topOfStack[0], index = topOfStack[1];
            if (index < topAfters.length) {
                var _a = topAfters[index], after = _a[1];
                topOfStack[1]++;
                ensureStackHeight(aftersStackHeight + 1);
                var callSuccess = false;
                try {
                    after();
                    callSuccess = true;
                    while (aftersStackHeight > stackSizeAtStart && aftersStack[aftersStackHeight - 1][0].length == 0) {
                        aftersStackHeight--;
                    }
                }
                finally {
                    if (!callSuccess) {
                        aftersStack = [];
                        aftersStackHeight = 0; // reset state to prevent stale updates after error
                    }
                }
            }
            else {
                topOfStack[0] = [];
                topOfStack[1] = 0; // reset this level
                break;
            }
        }
    }
    finally {
        if (isRoot)
            processingAfters = false;
    }
}
function whenDoneWith(obs, f) {
    if (rootEvent) {
        var obsWaiters = waiters[obs.id];
        if (obsWaiters === undefined) {
            obsWaiters = waiters[obs.id] = [f];
            return waiterObs.push(obs);
        }
        else {
            return obsWaiters.push(f);
        }
    }
    else {
        return f();
    }
}
function flush() {
    while (waiterObs.length > 0) {
        flushWaiters(0, true);
    }
    flushed = {};
}
function flushWaiters(index, deps) {
    var obs = waiterObs[index];
    var obsId = obs.id;
    var obsWaiters = waiters[obsId];
    waiterObs.splice(index, 1);
    delete waiters[obsId];
    if (deps && waiterObs.length > 0) {
        flushDepsOf(obs);
    }
    for (var i = 0, f; i < obsWaiters.length; i++) {
        f = obsWaiters[i];
        f();
    }
}
function flushDepsOf(obs) {
    if (flushed[obs.id])
        return;
    var deps = obs.internalDeps();
    for (var i = 0, dep; i < deps.length; i++) {
        dep = deps[i];
        flushDepsOf(dep);
        if (waiters[dep.id]) {
            var index = _.indexOf(waiterObs, dep);
            flushWaiters(index, false);
        }
    }
    flushed[obs.id] = true;
}
function inTransaction(event, context, f, args) {
    if (rootEvent) {
        return f.apply(context, args);
    }
    else {
        rootEvent = event;
        try {
            var result = f.apply(context, args);
            flush();
        }
        finally {
            rootEvent = undefined;
            processAfters();
        }
        return result;
    }
}
function currentEventId() {
    return rootEvent ? rootEvent.id : undefined;
}
function wrappedSubscribe(obs, subscribe, sink) {
    assertFunction(sink);
    var unsubd = false;
    var shouldUnsub = false;
    var doUnsub = function () {
        shouldUnsub = true;
    };
    var unsub = function () {
        unsubd = true;
        doUnsub();
    };
    doUnsub = subscribe(function (event) {
        afterTransaction(obs, function () {
            if (!unsubd) {
                var reply = sink(event);
                if (reply === noMore) {
                    unsub();
                }
            }
        });
        return more;
    });
    if (shouldUnsub) {
        doUnsub();
    }
    return unsub;
}
function hasWaiters() { return waiterObs.length > 0; }
var UpdateBarrier = { toString: toString$1, whenDoneWith: whenDoneWith, hasWaiters: hasWaiters, inTransaction: inTransaction, currentEventId: currentEventId, wrappedSubscribe: wrappedSubscribe, afterTransaction: afterTransaction, soonButNotYet: soonButNotYet, isInTransaction: isInTransaction };

var Desc = (function () {
    function Desc(context, method, args) {
        if (args === void 0) { args = []; }
                this._isDesc = true;
        this.context = context;
        this.method = method;
        this.args = args;
    }
    Desc.prototype.deps = function () {
        if (!this.cachedDeps) {
            this.cachedDeps = findDeps([this.context].concat(this.args));
        }
        return this.cachedDeps;
    };
    Desc.prototype.toString = function () {
        var args = _.map(_.toString, this.args);
        return _.toString(this.context) + "." + _.toString(this.method) + "(" + args + ")";
    };
    return Desc;
}());
function describe(context, method) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var ref = context || method;
    if (ref && ref._isDesc) {
        return context || method;
    }
    else {
        return new Desc(context, method, args);
    }
}
function findDeps(x) {
    if (isArray(x)) {
        return _.flatMap(findDeps, x);
    }
    else if (isObservable(x)) {
        return [x];
    }
    else if ((typeof x !== "undefined" && x !== null) ? x._isSource : undefined) {
        return [x.obs];
    }
    else {
        return [];
    }
}

var nullSink = function () { return more; };
var nullVoidSink = function () { return more; };

function withStateMachine(initState, f, src) {
    return src.transform(withStateMachineT(initState, f), new Desc(src, "withStateMachine", [initState, f]));
}
function withStateMachineT(initState, f) {
    var state = initState;
    return function (event, sink) {
        var fromF = f(state, event);
        var newState = fromF[0], outputs = fromF[1];
        state = newState;
        var reply = more;
        for (var i = 0; i < outputs.length; i++) {
            var output = outputs[i];
            reply = sink(output);
            if (reply === noMore) {
                return reply;
            }
        }
        return reply;
    };
}

var Some = /** @class */ (function () {
    function Some(value) {
        this._isSome = true;
        this.isDefined = true;
        this.value = value;
    }
    Some.prototype.getOrElse = function (arg) { return this.value; };
    Some.prototype.get = function () { return this.value; };
    Some.prototype.filter = function (f) {
        if (f(this.value)) {
            return new Some(this.value);
        }
        else {
            return None;
        }
    };
    Some.prototype.map = function (f) {
        return new Some(f(this.value));
    };
    Some.prototype.forEach = function (f) {
        f(this.value);
    };
    Some.prototype.toArray = function () { return [this.value]; };
    Some.prototype.inspect = function () { return "Some(" + this.value + ")"; };
    Some.prototype.toString = function () { return this.inspect(); };
    return Some;
}());
var None = {
    _isNone: true,
    getOrElse: function (value) { return value; },
    get: function () { throw new Error("None.get()"); },
    filter: function () { return None; },
    map: function () { return None; },
    forEach: function () { },
    isDefined: false,
    toArray: function () { return []; },
    inspect: function () { return "None"; },
    toString: function () { return this.inspect(); }
};
function none() { return None; }
function toOption(v) {
    if (v && (v._isSome || v._isNone)) {
        return v;
    }
    else {
        return new Some(v);
    }
}
function isNone(object) {
    return ((typeof object !== "undefined" && object !== null) ? object._isNone : false);
}

var eventIdCounter = 0;
var Event = /** @class */ (function () {
    function Event() {
        this.id = ++eventIdCounter;
                this.isEvent = true;
                this._isEvent = true;
        this.isEnd = false;
        this.isInitial = false;
        this.isNext = false;
        this.isError = false;
        this.hasValue = false;
    }
        Event.prototype.filter = function (f) { return true; };
        Event.prototype.inspect = function () { return this.toString(); };
        Event.prototype.log = function () { return this.toString(); };
        Event.prototype.toNext = function () { return this; };
    return Event;
}());
var Value = /** @class */ (function (_super) {
    __extends(Value, _super);
    function Value(value) {
        var _this = _super.call(this) || this;
        _this.hasValue = true;
        if (value instanceof Event) {
            throw new Error$1("Wrapping an event inside other event");
        }
        _this.value = value;
        return _this;
    }
        Value.prototype.fmap = function (f) {
        return this.apply(f(this.value));
    };
        Value.prototype.filter = function (f) { return f(this.value); };
        Value.prototype.toString = function () { return _.toString(this.value); };
        Value.prototype.log = function () { return this.value; };
    return Value;
}(Event));
var Next = /** @class */ (function (_super) {
    __extends(Next, _super);
    function Next(value) {
        var _this = _super.call(this, value) || this;
        _this.isNext = true;
                _this._isNext = true; // some compatibility stuff?
        return _this;
    }
        Next.prototype.apply = function (value) { return new Next(value); };
    return Next;
}(Value));
var Initial = /** @class */ (function (_super) {
    __extends(Initial, _super);
    function Initial(value) {
        var _this = _super.call(this, value) || this;
        _this.isInitial = true;
                _this._isInitial = true;
        return _this;
    }
        Initial.prototype.apply = function (value) { return new Initial(value); };
        Initial.prototype.toNext = function () { return new Next(this.value); };
    return Initial;
}(Value));
var NoValue = /** @class */ (function (_super) {
    __extends(NoValue, _super);
    function NoValue() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hasValue = false;
        return _this;
    }
        NoValue.prototype.fmap = function (f) {
        return this;
    };
    return NoValue;
}(Event));
var End = /** @class */ (function (_super) {
    __extends(End, _super);
    function End() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isEnd = true;
        return _this;
    }
        End.prototype.toString = function () { return "<end>"; };
    return End;
}(NoValue));
var Error$1 = /** @class */ (function (_super) {
    __extends(Error, _super);
    function Error(error) {
        var _this = _super.call(this) || this;
        _this.isError = true;
        _this.error = error;
        return _this;
    }
        Error.prototype.toString = function () {
        return "<error> " + _.toString(this.error);
    };
    return Error;
}(NoValue));
function initialEvent(value) { return new Initial(value); }
function nextEvent(value) { return new Next(value); }
function endEvent() { return new End(); }
function toEvent(x) {
    if (x && x._isEvent) {
        return x;
    }
    else {
        return nextEvent(x);
    }
}
function isEvent(e) {
    return e && e._isEvent;
}
function isInitial(e) {
    return e && e._isInitial;
}
function isError(e) {
    return e.isError;
}
function hasValue(e) {
    return e.hasValue;
}
function isEnd(e) {
    return e.isEnd;
}
function isNext(e) {
    return e.isNext;
}

function equals(a, b) { return a === b; }
function skipDuplicates(src, isEqual) {
    if (isEqual === void 0) { isEqual = equals; }
    var desc = new Desc(src, "skipDuplicates", []);
    return withStateMachine(none(), function (prev, event) {
        if (!hasValue(event)) {
            return [prev, [event]];
        }
        else if (event.isInitial || isNone(prev) || !isEqual(prev.get(), event.value)) {
            return [new Some(event.value), [event]];
        }
        else {
            return [prev, []];
        }
    }, src).withDesc(desc);
}

function take(count, src, desc) {
    return src.transform(takeT(count), desc || new Desc(src, "take", [count]));
}
function takeT(count) {
    return function (e, sink) {
        if (!e.hasValue) {
            return sink(e);
        }
        else {
            count--;
            if (count > 0) {
                return sink(e);
            }
            else {
                if (count === 0) {
                    sink(e);
                }
                sink(endEvent());
                return noMore;
            }
        }
    };
}

function log(args, src) {
    src.subscribe(function (event) {
        if (typeof console !== "undefined" && typeof console.log === "function") {
            console.log.apply(console, args.concat([event.log()]));
        }
        return more;
    });
}

function doLogT(args) {
    return function (event, sink) {
        if (typeof console !== "undefined" && console !== null && typeof console.log === "function") {
            console.log.apply(console, args.concat([event.log()]));
        }
        return sink(event);
    };
}

function doEventT(args) {
    return function (event, sink) {
        f(event);
        return sink(event);
    };
}

function doErrorT(f) {
    return function (event, sink) {
        if (isError(event)) {
            f(event.error);
        }
        return sink(event);
    };
}

function doActionT(f) {
    return function (event, sink) {
        if (hasValue(event)) {
            f(event.value);
        }
        return sink(event);
    };
}

function doEndT(f) {
    return function (event, sink) {
        if (isEnd(event)) {
            f();
        }
        return sink(event);
    };
}

function scan(src, seed, f) {
    var resultProperty;
    var acc = seed;
    var initHandled = false;
    var subscribe = function (sink) {
        var initSent = false;
        var unsub = nop;
        var reply = more;
        var sendInit = function () {
            if (!initSent) {
                initSent = initHandled = true;
                reply = sink(new Initial(acc));
                if (reply === noMore) {
                    unsub();
                    unsub = nop;
                }
            }
            return reply;
        };
        unsub = src.subscribeInternal(function (event) {
            if (hasValue(event)) {
                if (initHandled && event.isInitial) {
                    return more; // init already sent, skip this one
                }
                else {
                    if (!event.isInitial) {
                        sendInit();
                    }
                    initSent = initHandled = true;
                    var prev = acc;
                    var next = f(prev, event.value);
                    acc = next;
                    return sink(event.apply(next));
                }
            }
            else {
                if (event.isEnd) {
                    reply = sendInit();
                }
                if (reply !== noMore) {
                    return sink(event);
                }
                return reply;
            }
        });
        UpdateBarrier.whenDoneWith(resultProperty, sendInit);
        return unsub;
    };
    return resultProperty = new Property(new Desc(src, "scan", [seed, f]), subscribe);
}

function mapEndT(f) {
    var theF = _.toFunction(f);
    return function (event, sink) {
        if (isEnd(event)) {
            sink(nextEvent(theF(event)));
            sink(endEvent());
            return noMore;
        }
        else {
            return sink(event);
        }
    };
}

function mapErrorT(f) {
    var theF = _.toFunction(f);
    return function (event, sink) {
        if (isError(event)) {
            return sink(nextEvent(theF(event.error)));
        }
        else {
            return sink(event);
        }
    };
}

function skipErrors(src) {
    return src.transform(function (event, sink) {
        if (isError(event)) {
            return more;
        }
        else {
            return sink(event);
        }
    }, new Desc(src, "skipErrors", []));
}

function last$1(src) {
    var lastEvent;
    return src.transform(function (event, sink) {
        if (isEnd(event)) {
            if (lastEvent) {
                sink(lastEvent);
            }
            sink(endEvent());
            return noMore;
        }
        else if (hasValue(event)) {
            lastEvent = event;
            return more;
        }
        else {
            return sink(event);
        }
    }).withDesc(new Desc(src, "last", []));
}

var CompositeUnsubscribe = /** @class */ (function () {
    function CompositeUnsubscribe(ss) {
        if (ss === void 0) { ss = []; }
        this.unsubscribed = false;
        this.unsubscribe = _.bind(this.unsubscribe, this);
        this.unsubscribed = false;
        this.subscriptions = [];
        this.starting = [];
        for (var i = 0, s; i < ss.length; i++) {
            s = ss[i];
            this.add(s);
        }
    }
    CompositeUnsubscribe.prototype.add = function (subscription) {
        var _this = this;
        if (!this.unsubscribed) {
            var ended = false;
            var unsub = nop;
            this.starting.push(subscription);
            var unsubMe = function () {
                if (_this.unsubscribed) {
                    return;
                }
                ended = true;
                _this.remove(unsub);
                _.remove(subscription, _this.starting);
            };
            unsub = subscription(this.unsubscribe, unsubMe);
            if (!(this.unsubscribed || ended)) {
                this.subscriptions.push(unsub);
            }
            else {
                unsub();
            }
            _.remove(subscription, this.starting);
        }
    };
    CompositeUnsubscribe.prototype.remove = function (unsub) {
        if (this.unsubscribed) {
            return;
        }
        if ((_.remove(unsub, this.subscriptions)) !== undefined) {
            return unsub();
        }
    };
    CompositeUnsubscribe.prototype.unsubscribe = function () {
        if (this.unsubscribed) {
            return;
        }
        this.unsubscribed = true;
        var iterable = this.subscriptions;
        for (var i = 0; i < iterable.length; i++) {
            iterable[i]();
        }
        this.subscriptions = [];
        this.starting = [];
    };
    CompositeUnsubscribe.prototype.count = function () {
        if (this.unsubscribed) {
            return 0;
        }
        return this.subscriptions.length + this.starting.length;
    };
    CompositeUnsubscribe.prototype.empty = function () {
        return this.count() === 0;
    };
    return CompositeUnsubscribe;
}());

function streamSubscribeToPropertySubscribe(initValue, streamSubscribe) {
    return function (sink) {
        var initSent = false;
        var subbed = false;
        var unsub = nop;
        var reply = more;
        var sendInit = function () {
            if (!initSent) {
                return initValue.forEach(function (value) {
                    initSent = true;
                    reply = sink(new Initial(value));
                    if (reply === noMore) {
                        unsub();
                        unsub = nop;
                        return nop;
                    }
                });
            }
        };
        unsub = streamSubscribe(function (event) {
            if (event instanceof Value) {
                if (event.isInitial && !subbed) {
                    initValue = new Some(event.value);
                    return more;
                }
                else {
                    if (!event.isInitial) {
                        sendInit();
                    }
                    initSent = true;
                    initValue = new Some(event.value);
                    return sink(event);
                }
            }
            else {
                if (event.isEnd) {
                    reply = sendInit();
                }
                if (reply !== noMore) {
                    return sink(event);
                }
                return reply;
            }
        });
        subbed = true;
        sendInit();
        return unsub;
    };
}

function propertyFromStreamSubscribe(desc, subscribe) {
    assertFunction(subscribe);
    return new Property(desc, streamSubscribeToPropertySubscribe(none(), subscribe));
}
function once(value) {
    var s = new EventStream(new Desc("Bacon", "once", [value]), function (sink) {
        UpdateBarrier.soonButNotYet(s, function () {
            sink(toEvent(value));
            sink(endEvent());
        });
        return nop;
    });
    return s;
}

function flatMap_(spawner, src, params) {
    if (params === void 0) { params = {}; }
    var root = src;
    var rootDep = [root];
    var childDeps = [];
    var isProperty = src._isProperty;
    var ctor = (isProperty ? propertyFromStreamSubscribe : newEventStreamAllowSync);
    var initialSpawned = false;
    var desc = params.desc || new Desc(src, "flatMap_", [spawner]);
    var result = ctor(desc, function (sink) {
        var composite = new CompositeUnsubscribe();
        var queue = [];
        function spawn(event) {
            if (isProperty && event.isInitial) {
                if (initialSpawned) {
                    return more;
                }
                initialSpawned = true;
            }
            var child = makeObservable(spawner(event));
            childDeps.push(child);
            return composite.add(function (unsubAll, unsubMe) {
                return child.subscribeInternal(function (event) {
                    if (event.isEnd) {
                        _.remove(child, childDeps);
                        checkQueue();
                        checkEnd(unsubMe);
                        return noMore;
                    }
                    else {
                        event = event.toNext(); // To support Property as the spawned stream
                        var reply = sink(event);
                        if (reply === noMore) {
                            unsubAll();
                        }
                        return reply;
                    }
                });
            });
        }
        function checkQueue() {
            var event = queue.shift();
            if (event) {
                spawn(event);
            }
        }
        function checkEnd(unsub) {
            unsub();
            if (composite.empty()) {
                return sink(endEvent());
            }
            return more;
        }
        composite.add(function (__, unsubRoot) {
            return root.subscribeInternal(function (event) {
                if (event.isEnd) {
                    return checkEnd(unsubRoot);
                }
                else if (event.isError && !params.mapError) {
                    return sink(event);
                }
                else if (params.firstOnly && composite.count() > 1) {
                    return more;
                }
                else {
                    if (composite.unsubscribed) {
                        return noMore;
                    }
                    if (params.limit && composite.count() > params.limit) {
                        queue.push(event);
                    }
                    else {
                        spawn(event);
                    }
                    return more;
                }
            });
        });
        return composite.unsubscribe;
    });
    result.internalDeps = function () {
        if (childDeps.length) {
            return rootDep.concat(childDeps);
        }
        else {
            return rootDep;
        }
    };
    return result;
}
function handleEventValueWith(f) {
    if (typeof f == "function") {
        return (function (event) {
            if (hasValue(event)) {
                return f(event.value);
            }
            return event;
        });
    }
    return (function (event) { return f; });
}
function makeObservable(x) {
    if (isObservable(x)) {
        return x;
    }
    else {
        return once(x);
    }
}

function flatMapEvent(src, f) {
    return flatMap_(f, src, {
        mapError: true,
        desc: new Desc(src, "flatMapEvent", [f])
    });
}

function endAsValue(src) {
    return src.transform(function (event, sink) {
        if (isEnd(event)) {
            sink(nextEvent({}));
            sink(endEvent());
            return noMore;
        }
        return more;
    });
}

function endOnError(src, predicate) {
    if (predicate === void 0) { predicate = function (x) { return true; }; }
    return src.transform(function (event, sink) {
        if (isError(event) && predicate(event.error)) {
            sink(event);
            return sink(endEvent());
        }
        else {
            return sink(event);
        }
    }, new Desc(src, "endOnError", []));
}

var Source = /** @class */ (function () {
    function Source(obs, sync) {
        this._isSource = true;
        this.flatten = true;
        this.ended = false;
        this.obs = obs;
        this.sync = sync;
    }
    Source.prototype.subscribe = function (sink) {
        return this.obs.subscribeInternal(sink);
    };
    Source.prototype.toString = function () {
        return this.obs.toString();
    };
    Source.prototype.markEnded = function () {
        this.ended = true;
    };
    Source.prototype.mayHave = function (count) { return true; };
    return Source;
}());
var DefaultSource = /** @class */ (function (_super) {
    __extends(DefaultSource, _super);
    function DefaultSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultSource.prototype.consume = function () {
        return this.value;
    };
    DefaultSource.prototype.push = function (x) {
        this.value = x;
    };
    DefaultSource.prototype.hasAtLeast = function (c) {
        return !!this.value;
    };
    return DefaultSource;
}(Source));
var ConsumingSource = /** @class */ (function (_super) {
    __extends(ConsumingSource, _super);
    function ConsumingSource(obs, sync) {
        var _this = _super.call(this, obs, sync) || this;
        _this.flatten = false;
        _this.queue = [];
        return _this;
    }
    ConsumingSource.prototype.consume = function () {
        return this.queue.shift();
    };
    ConsumingSource.prototype.push = function (x) {
        this.queue.push(x);
    };
    ConsumingSource.prototype.mayHave = function (count) {
        return !this.ended || this.queue.length >= count;
    };
    ConsumingSource.prototype.hasAtLeast = function (count) {
        return this.queue.length >= count;
    };
    return ConsumingSource;
}(Source));
var BufferingSource = /** @class */ (function (_super) {
    __extends(BufferingSource, _super);
    function BufferingSource(obs) {
        var _this = _super.call(this, obs, true) || this;
        _this.queue = [];
        return _this;
    }
    BufferingSource.prototype.consume = function () {
        var values = this.queue;
        this.queue = [];
        return {
            value: values
        };
    };
    BufferingSource.prototype.push = function (x) {
        return this.queue.push(x.value);
    };
    BufferingSource.prototype.hasAtLeast = function (count) {
        return true;
    };
    return BufferingSource;
}(Source));
function isTrigger(s) {
    if (s == null)
        return false;
    if (s._isSource) {
        return s.sync;
    }
    else {
        return s._isEventStream;
    }
}
function fromObservable(s) {
    if (s != null && s._isSource) {
        return s;
    }
    else if (s != null && s._isProperty) {
        return new DefaultSource(s, false);
    }
    else {
        return new ConsumingSource(s, true);
    }
}

/**
 Creates an EventStream that immediately ends.
 @typeparam V Type of stream elements
 */
function never() {
    return new EventStream(describe("Bacon", "never"), function (sink) {
        sink(endEvent());
        return nop;
    });
}
function when() {
    var patterns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        patterns[_i] = arguments[_i];
    }
    return when_(newEventStream, patterns);
}
function whenP() {
    var patterns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        patterns[_i] = arguments[_i];
    }
    return when_(propertyFromStreamSubscribe, patterns);
}
function when_(ctor, patterns) {
    if (patterns.length === 0) {
        return never();
    }
    var _a = processRawPatterns(extractRawPatterns(patterns)), sources = _a[0], ixPats = _a[1];
    if (!sources.length) {
        return never();
    }
    var needsBarrier = (any(sources, function (s) { return s.flatten; })) && containsDuplicateDeps(map((function (s) { return s.obs; }), sources));
    var desc = new Desc("Bacon", "when", Array.prototype.slice.call(patterns));
    var resultStream = ctor(desc, function (sink) {
        var triggers = [];
        var ends = false;
        function match(p) {
            for (var i = 0; i < p.ixs.length; i++) {
                var ix = p.ixs[i];
                if (!sources[ix.index].hasAtLeast(ix.count)) {
                    return false;
                }
            }
            return true;
        }
        function cannotMatch(p) {
            for (var i = 0; i < p.ixs.length; i++) {
                var ix = p.ixs[i];
                if (!sources[ix.index].mayHave(ix.count)) {
                    return true;
                }
            }
            return false;
        }
        function nonFlattened(trigger) { return !trigger.source.flatten; }
        function part(source) {
            return function (unsubAll) {
                function flushLater() {
                    return UpdateBarrier.whenDoneWith(resultStream, flush);
                }
                function flushWhileTriggers() {
                    var trigger;
                    if ((trigger = triggers.pop()) !== undefined) {
                        var reply = more;
                        for (var i = 0, p; i < ixPats.length; i++) {
                            p = ixPats[i];
                            if (match(p)) {
                                var values = [];
                                for (var j = 0; j < p.ixs.length; j++) {
                                    var event_1 = sources[p.ixs[j].index].consume();
                                    if (!event_1)
                                        throw new Error("Event was undefined");
                                    values.push(event_1.value);
                                }
                                var applied = p.f.apply(null, values);
                                reply = sink((trigger).e.apply(applied));
                                if (triggers.length) {
                                    triggers = filter(nonFlattened, triggers);
                                }
                                if (reply === noMore) {
                                    return reply;
                                }
                                else {
                                    return flushWhileTriggers();
                                }
                            }
                        }
                    }
                    return more;
                }
                function flush() {
                    var reply = flushWhileTriggers();
                    if (ends) {
                        if (all(sources, cannotSync) || all(ixPats, cannotMatch)) {
                            reply = noMore;
                            sink(endEvent());
                        }
                    }
                    if (reply === noMore) {
                        unsubAll();
                    }
                }
                return source.subscribe(function (e) {
                    var reply = more;
                    if (e.isEnd) {
                        ends = true;
                        source.markEnded();
                        flushLater();
                    }
                    else if (e.isError) {
                        reply = sink(e);
                    }
                    else {
                        var valueEvent = e;
                        source.push(valueEvent);
                        if (source.sync) {
                            triggers.push({ source: source, e: valueEvent });
                            if (needsBarrier || UpdateBarrier.hasWaiters()) {
                                flushLater();
                            }
                            else {
                                flush();
                            }
                        }
                    }
                    if (reply === noMore) {
                        unsubAll();
                    }
                    return reply;
                });
            };
        }
        return new CompositeUnsubscribe(map(part, sources)).unsubscribe;
    });
    return resultStream;
}
function processRawPatterns(rawPatterns) {
    var sources = [];
    var pats = [];
    for (var i = 0; i < rawPatterns.length; i++) {
        var _a = rawPatterns[i], patSources = _a[0], f = _a[1];
        var pat = { f: f, ixs: [] };
        var triggerFound = false;
        for (var j = 0, s; j < patSources.length; j++) {
            s = patSources[j];
            var index = indexOf(sources, s);
            if (!triggerFound) {
                triggerFound = isTrigger(s);
            }
            if (index < 0) {
                sources.push(s);
                index = sources.length - 1;
            }
            for (var k = 0; k < pat.ixs.length; k++) {
                var ix = pat.ixs[k];
                if (ix.index === index) {
                    ix.count++;
                }
            }
            pat.ixs.push({ index: index, count: 1 });
        }
        if (patSources.length > 0 && !triggerFound) {
            throw new Error("At least one EventStream required, none found in " + patSources);
        }
        if (patSources.length > 0) {
            pats.push(pat);
        }
    }
    return [map(fromObservable /* sorry */, sources), pats];
}
function extractLegacyPatterns(sourceArgs) {
    var i = 0;
    var len = sourceArgs.length;
    var rawPatterns = [];
    while (i < len) {
        var patSources = toArray(sourceArgs[i++]);
        var f = toFunction(sourceArgs[i++]);
        rawPatterns.push([patSources, f]);
    }
    var usage = "when: expecting arguments in the form (Observable+,function)+";
    assert(usage, (len % 2 === 0));
    return rawPatterns;
}
function isTypedOrRawPattern(pattern) {
    return (pattern instanceof Array) && (!isObservable(pattern[pattern.length - 1]));
}
function isRawPattern(pattern) {
    return pattern[0] instanceof Array;
}
function extractRawPatterns(patterns) {
    var rawPatterns = [];
    for (var i = 0; i < patterns.length; i++) {
        var pattern = patterns[i];
        if (!isTypedOrRawPattern(pattern)) {
            return extractLegacyPatterns(patterns);
        }
        if (isRawPattern(pattern)) {
            rawPatterns.push([pattern[0], toFunction(pattern[1])]);
        }
        else { // typed pattern, then
            var sources = pattern.slice(0, pattern.length - 1);
            var f = toFunction(pattern[pattern.length - 1]);
            rawPatterns.push([sources, f]);
        }
    }
    return rawPatterns;
}
function containsDuplicateDeps(observables, state) {
    if (state === void 0) { state = []; }
    function checkObservable(obs) {
        if (contains(state, obs)) {
            return true;
        }
        else {
            var deps = obs.internalDeps();
            if (deps.length) {
                state.push(obs);
                return any(deps, checkObservable);
            }
            else {
                state.push(obs);
                return false;
            }
        }
    }
    return any(observables, checkObservable);
}
function cannotSync(source) {
    return !source.sync || source.ended;
}

function withLatestFromE(sampler, samplee, f) {
    var result = when([new DefaultSource(samplee.toProperty(), false), new DefaultSource(sampler, true), flip(f)]);
    return result.withDesc(new Desc(sampler, "withLatestFrom", [samplee, f]));
}
function withLatestFromP(sampler, samplee, f) {
    var result = whenP([new DefaultSource(samplee.toProperty(), false), new DefaultSource(sampler, true), flip(f)]);
    return result.withDesc(new Desc(sampler, "withLatestFrom", [samplee, f]));
}
function withLatestFrom(sampler, samplee, f) {
    if (sampler instanceof Property) {
        return withLatestFromP(sampler, samplee, f);
    }
    else if (sampler instanceof EventStream) {
        return withLatestFromE(sampler, samplee, f);
    }
    else {
        throw new Error("Unknown observable: " + sampler);
    }
}

function map$1(src, f) {
    if (f instanceof Property) {
        return withLatestFrom(src, f, function (a, b) { return b; });
    }
    return src.transform(mapT(f), new Desc(src, "map", [f]));
}
function mapT(f) {
    var theF = _.toFunction(f);
    return function (e, sink) {
        return sink(e.fmap(theF));
    };
}

/**
 Creates a constant property with value `x`.
 */
function constant(x) {
    return new Property(new Desc("Bacon", "constant", [x]), function (sink) {
        sink(initialEvent(x));
        sink(endEvent());
        return nop;
    });
}

function argumentsToObservables(args) {
    args = (Array.prototype.slice.call(args));
    return _.flatMap(singleToObservables, args);
}
function singleToObservables(x) {
    if (isObservable(x)) {
        return [x];
    }
    else if (isArray(x)) {
        return argumentsToObservables(x);
    }
    else {
        return [constant(x)];
    }
}
function argumentsToObservablesAndFunction(args) {
    if (_.isFunction(args[0])) {
        return [argumentsToObservables(Array.prototype.slice.call(args, 1)), args[0]];
    }
    else {
        return [argumentsToObservables(Array.prototype.slice.call(args, 0, args.length - 1)), _.last(args)];
    }
}

function groupSimultaneous() {
    var streams = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        streams[_i] = arguments[_i];
    }
    return groupSimultaneous_(argumentsToObservables(streams));
}
function groupSimultaneous_(streams, options) {
    var sources = _.map(function (stream) { return new BufferingSource(stream); }, streams);
    var ctor = function (desc, subscribe) { return new EventStream(desc, subscribe, undefined, options); };
    return when_(ctor, [sources, (function () {
            var xs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                xs[_i] = arguments[_i];
            }
            return xs;
        })]).withDesc(new Desc("Bacon", "groupSimultaneous", streams));
}

function awaiting(src, other) {
    return groupSimultaneous_([src, other], allowSync)
        .map(function (values) { return values[1].length === 0; })
        .toProperty(false)
        .skipDuplicates()
        .withDesc(new Desc(src, "awaiting", [other]));
}

/**
 Combines Properties, EventStreams and constant values so that the result Property will have an array of the latest
 values from all sources as its value. The inputs may contain both Properties and EventStreams.


 ```js
 property = Bacon.constant(1)
 stream = Bacon.once(2)
 constant = 3
 Bacon.combineAsArray(property, stream, constant)
 # produces the value [1,2,3]
 ```

 * @param streams streams and properties to combine
 */
function combineAsArray() {
    var streams = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        streams[_i] = arguments[_i];
    }
    streams = argumentsToObservables(streams);
    if (streams.length) {
        var sources = [];
        for (var i = 0; i < streams.length; i++) {
            var stream = (isObservable(streams[i])
                ? streams[i]
                : constant(streams[i]));
            sources.push(wrap(stream));
        }
        return whenP([sources, function () {
                var xs = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    xs[_i] = arguments[_i];
                }
                return xs;
            }]).withDesc(new Desc("Bacon", "combineAsArray", streams));
    }
    else {
        return constant([]);
    }
}
function combineWith() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var _a = argumentsToObservablesAndFunction(arguments), streams = _a[0], f = _a[1];
    var desc = new Desc("Bacon", "combineWith", __spreadArrays([f], streams));
    return combineAsArray(streams).map(function (values) {
        return f.apply(void 0, values);
    }).withDesc(desc);
}
var combine = combineWith;
function combineTwo(left, right, f) {
    return whenP([[wrap(left), wrap(right)], f]).withDesc(new Desc(left, "combine", [right, f]));
}
function wrap(obs) {
    return new DefaultSource(obs, true);
}

function skip(src, count) {
    return src.transform(function (event, sink) {
        if (!event.hasValue) {
            return sink(event);
        }
        else if (count > 0) {
            count--;
            return more;
        }
        else {
            return sink(event);
        }
    }, new Desc(src, "skip", [count]));
}

function flatMapConcat(src, f) {
    return flatMap_(handleEventValueWith(f), src, {
        desc: new Desc(src, "flatMapConcat", [f]),
        limit: 1
    });
}

function fromBinder(binder, eventTransformer) {
    if (eventTransformer === void 0) { eventTransformer = _.id; }
    var desc = new Desc("Bacon", "fromBinder", [binder, eventTransformer]);
    return new EventStream(desc, function (sink) {
        var unbound = false;
        var shouldUnbind = false;
        var unbind = function () {
            if (!unbound) {
                if ((typeof unbinder !== "undefined" && unbinder !== null)) {
                    unbinder();
                    return unbound = true;
                }
                else {
                    return shouldUnbind = true;
                }
            }
        };
        var unbinder = binder(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var value_ = eventTransformer.apply(void 0, args);
            var valueArray = isArray(value_) && isEvent(_.last(value_))
                ? value_
                : [value_];
            var reply = more;
            for (var i = 0; i < valueArray.length; i++) {
                var event_1 = toEvent(valueArray[i]);
                reply = sink(event_1);
                if (reply === noMore || event_1.isEnd) {
                    unbind();
                    return reply;
                }
            }
            return reply;
        });
        if (shouldUnbind) {
            unbind();
        }
        return unbind;
    });
}

/**
 Polls given function with given interval.
 Function should return Events: either [`Bacon.Next`](classes/next.html) or [`Bacon.End`](classes/end.html). Polling occurs only
 when there are subscribers to the stream. Polling ends permanently when
 `f` returns [`Bacon.End`](classes/end.html).
 * @param delay poll interval in milliseconds
 * @param poll function to be polled
 * @typeparam V Type of stream elements
 */
function fromPoll(delay, poll) {
    var desc = new Desc("Bacon", "fromPoll", [delay, poll]);
    return fromBinder((function (handler) {
        var id = GlobalScheduler.scheduler.setInterval(handler, delay);
        return function () {
            return GlobalScheduler.scheduler.clearInterval(id);
        };
    }), poll).withDesc(desc);
}

/**
 Repeats the single element indefinitely with the given interval (in milliseconds)

 @param   delay   Repeat delay in milliseconds
 @param   value   The single value to repeat
 @typeparam V Type of stream elements
 */
function interval(delay, value) {
    return fromPoll(delay, function () {
        return nextEvent(value);
    }).withDesc(new Desc("Bacon", "interval", [delay, value]));
}

function makeCombinator(combinator) {
    if (typeof combinator == "function") {
        return combinator;
    }
    else {
        return _.id;
    }
}
function sampledBy(samplee, sampler, f) {
    if (samplee instanceof EventStream) {
        return sampledByE(samplee, sampler, f);
    }
    else {
        return sampledByP(samplee, sampler, f);
    }
}
function sampledByP(samplee, sampler, f) {
    var combinator = makeCombinator(f);
    var result = withLatestFrom(sampler, samplee, flip(combinator));
    return result.withDesc(new Desc(samplee, "sampledBy", [sampler]));
}
function sampledByE(samplee, sampler, f) {
    return sampledByP(samplee.toProperty(), sampler, f).withDesc(new Desc(samplee, "sampledBy", [sampler]));
}
function sampleP(samplee, samplingInterval) {
    return sampledByP(samplee, interval(samplingInterval, {}), function (a, b) { return a; }).withDesc(new Desc(samplee, "sample", [samplingInterval]));
}

function transformP(src, transformer, desc) {
    return new Property(new Desc(src, "transform", [transformer]), function (sink) {
        return src.subscribeInternal(function (e) {
            return transformer(e, sink);
        });
    }).withDesc(desc);
}
function transformE(src, transformer, desc) {
    return new EventStream(new Desc(src, "transform", [transformer]), function (sink) {
        return src.subscribeInternal(function (e) {
            return transformer(e, sink);
        });
    }, undefined, allowSync).withDesc(desc);
}
function composeT(t1, t2) {
    var finalSink; // mutation used to avoid closure creation while dispatching events
    var sink2 = function (event) {
        return t2(event, finalSink);
    };
    return function (event, sink) {
        finalSink = sink;
        return t1(event, sink2);
    };
}

function toPredicate(f) {
    if (typeof f == "boolean") {
        return _.always(f);
    }
    else if (typeof f != "function") {
        throw new Error("Not a function: " + f);
    }
    else {
        return f;
    }
}
function withPredicate(src, f, predicateTransformer, desc) {
    if (f instanceof Property) {
        return withLatestFrom(src, f, function (p, v) { return [p, v]; })
            .transform(composeT(predicateTransformer((function (tuple) { return tuple[1]; })), mapT(function (tuple) { return tuple[0]; })), desc);
    }
    return src.transform(predicateTransformer(toPredicate(f)), desc);
}

function filter$1(src, f) {
    return withPredicate(src, f, filterT, new Desc(src, "filter", [f]));
}
function filterT(f) {
    return function (e, sink) {
        if (e.filter(f)) {
            return sink(e);
        }
        else {
            return more;
        }
    };
}

function not(src) {
    return src.map(function (x) { return !x; }).withDesc(new Desc(src, "not", []));
}
function and(left, right) {
    return left.combine(toProperty(right), function (x, y) { return !!(x && y); }).withDesc(new Desc(left, "and", [right]));
}
function or(left, right) {
    return left.combine(toProperty(right), function (x, y) { return x || y; }).withDesc(new Desc(left, "or", [right]));
}
function toProperty(x) {
    if (isProperty(x)) {
        return x;
    }
    return constant(x);
}

function flatMapFirst(src, f) {
    return flatMap_(handleEventValueWith(f), src, {
        firstOnly: true,
        desc: new Desc(src, "flatMapFirst", [f])
    });
}

function concatE(left, right, options) {
    return new EventStream(new Desc(left, "concat", [right]), function (sink) {
        var unsubRight = nop;
        var unsubLeft = left.dispatcher.subscribe(function (e) {
            if (e.isEnd) {
                unsubRight = right.toEventStream().dispatcher.subscribe(sink);
                return more;
            }
            else {
                return sink(e);
            }
        });
        return function () {
            return unsubLeft(), unsubRight();
        };
    }, undefined, options);
}
/**
 Concatenates given array of EventStreams or Properties. Works by subscribing to the first source, and listeing to that
 until it ends. Then repeatedly subscribes to the next source, until all sources have ended.

 See [`concat`](#observable-concat)
 */
function concatAll() {
    var streams_ = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        streams_[_i] = arguments[_i];
    }
    var streams = argumentsToObservables(streams_);
    return (streams.length
        ? fold(tail(streams), head(streams).toEventStream(), function (a, b) { return a.concat(b); })
        : never()).withDesc(new Desc("Bacon", "concatAll", streams));
}

function transformPropertyChanges(property, f, desc) {
    var initValue;
    var comboSink;
    var changes = new EventStream(describe(property, "changes", []), function (sink) { return property.dispatcher.subscribe(function (event) {
        if (!initValue && isInitial(event)) {
            initValue = event;
            UpdateBarrier.whenDoneWith(combo, function () {
                if (!comboSink) {
                    throw new Error("Init sequence fail");
                }
                comboSink(initValue);
            });
        }
        if (!event.isInitial) {
            return sink(event);
        }
        return more;
    }); }, undefined, allowSync);
    var transformedChanges = f(changes);
    var combo = propertyFromStreamSubscribe(desc, function (sink) {
        comboSink = sink;
        return transformedChanges.dispatcher.subscribe(function (event) {
            sink(event);
        });
    });
    return combo;
}

function fold$1(src, seed, f) {
    return src.scan(seed, f)
        .last()
        .withDesc(new Desc(src, "fold", [seed, f]));
}

function startWithE(src, seed) {
    return once(seed).concat(src).withDesc(new Desc(src, "startWith", [seed]));
}
function startWithP(src, seed) {
    return src.scan(seed, function (prev, next) { return next; }).withDesc(new Desc(src, "startWith", [seed]));
}

var endMarker = {};
function takeUntil(src, stopper) {
    var endMapped = src.mapEnd(endMarker);
    var withEndMarker = groupSimultaneous_([endMapped, stopper.skipErrors()], allowSync);
    if (src instanceof Property)
        withEndMarker = withEndMarker.toProperty();
    return withEndMarker.transform(function (event, sink) {
        if (hasValue(event)) {
            var _a = event.value, data = _a[0], stopper = _a[1];
            if (stopper.length) {
                return sink(endEvent());
            }
            else {
                var reply = more;
                for (var i = 0; i < data.length; i++) {
                    var value = data[i];
                    if (value === endMarker) {
                        return sink(endEvent());
                    }
                    else {
                        reply = sink(nextEvent(value));
                    }
                }
                return reply;
            }
        }
        else {
            return sink(event);
        }
    }, new Desc(src, "takeUntil", [stopper]));
}

function flatMap$1(src, f) {
    return flatMap_(handleEventValueWith(f), src, { desc: new Desc(src, "flatMap", [f]) });
}

function flatMapError(src, f) {
    return flatMap_(function (x) {
        if (x instanceof Error$1) {
            var error = x.error;
            return f(error); // I don't understand why I need this little lie
        }
        else {
            return x;
        }
    }, src, {
        mapError: true,
        desc: new Desc(src, "flatMapError", [f])
    });
}

var spies = [];
var running = false;
function registerObs(obs) {
    if (spies.length) {
        if (!running) {
            try {
                running = true;
                spies.forEach(function (spy) {
                    spy(obs);
                });
            }
            finally {
                running = false;
            }
        }
    }
}
/**
 Adds your function as a "spy" that will get notified on all new Observables.
 This will allow a visualization/analytics tool to spy on all Bacon activity.
 */
var spy = function (spy) { return spies.push(spy); };

function flatMapLatest(src, f_) {
    var f = _.toFunction(f_);
    var stream = isProperty(src) ? src.toEventStream(allowSync) : src;
    var flatMapped = flatMap$1(stream, function (value) { return makeObservable(f(value)).takeUntil(stream); });
    if (isProperty(src))
        flatMapped = flatMapped.toProperty();
    return flatMapped.withDesc(new Desc(src, "flatMapLatest", [f]));
}

var Dispatcher = /** @class */ (function () {
    function Dispatcher(observable, _subscribe, _handleEvent) {
        this.pushing = false;
        this.ended = false;
        this.prevError = undefined;
        this.unsubSrc = undefined;
        this._subscribe = _subscribe;
        this._handleEvent = _handleEvent;
        this.subscribe = _.bind(this.subscribe, this);
        this.handleEvent = _.bind(this.handleEvent, this);
        this.subscriptions = [];
        this.observable = observable;
        this.queue = [];
    }
    Dispatcher.prototype.hasSubscribers = function () {
        return this.subscriptions.length > 0;
    };
    Dispatcher.prototype.removeSub = function (subscription) {
        this.subscriptions = _.without(subscription, this.subscriptions);
        return this.subscriptions;
    };
    Dispatcher.prototype.push = function (event) {
        if (event.isEnd) {
            this.ended = true;
        }
        return UpdateBarrier.inTransaction(event, this, this.pushIt, [event]);
    };
    Dispatcher.prototype.pushToSubscriptions = function (event) {
        try {
            var tmp = this.subscriptions;
            var len = tmp.length;
            for (var i = 0; i < len; i++) {
                var sub = tmp[i];
                var reply = sub.sink(event);
                if (reply === noMore || event.isEnd) {
                    this.removeSub(sub);
                }
            }
            return true;
        }
        catch (error) {
            this.pushing = false;
            this.queue = []; // ditch queue in case of exception to avoid unexpected behavior
            throw error;
        }
    };
    Dispatcher.prototype.pushIt = function (event) {
        if (!this.pushing) {
            if (event === this.prevError) {
                return;
            }
            if (event.isError) {
                this.prevError = event;
            }
            this.pushing = true;
            this.pushToSubscriptions(event);
            this.pushing = false;
            while (true) {
                var e = this.queue.shift();
                if (e) {
                    this.push(e);
                }
                else {
                    break;
                }
            }
            if (this.hasSubscribers()) {
                return more;
            }
            else {
                this.unsubscribeFromSource();
                return noMore;
            }
        }
        else {
            this.queue.push(event);
            return more;
        }
    };
    Dispatcher.prototype.handleEvent = function (event) {
        if (this._handleEvent) {
            return this._handleEvent(event);
        }
        else {
            return this.push(event);
        }
    };
    Dispatcher.prototype.unsubscribeFromSource = function () {
        if (this.unsubSrc) {
            this.unsubSrc();
        }
        this.unsubSrc = undefined;
    };
    Dispatcher.prototype.subscribe = function (sink) {
        var _this = this;
        if (this.ended) {
            sink(endEvent());
            return nop;
        }
        else {
            assertFunction(sink);
            var subscription_1 = {
                sink: sink
            };
            this.subscriptions.push(subscription_1);
            if (this.subscriptions.length === 1) {
                this.unsubSrc = this._subscribe(this.handleEvent);
                assertFunction(this.unsubSrc);
            }
            return function () {
                _this.removeSub(subscription_1);
                if (!_this.hasSubscribers()) {
                    return _this.unsubscribeFromSource();
                }
            };
        }
    };
    Dispatcher.prototype.inspect = function () {
        return this.observable.toString();
    };
    return Dispatcher;
}());

var PropertyDispatcher = /** @class */ (function (_super) {
    __extends(PropertyDispatcher, _super);
    function PropertyDispatcher(property, subscribe, handleEvent) {
        var _this = _super.call(this, property, subscribe, handleEvent) || this;
        _this.current = none();
        _this.propertyEnded = false;
        _this.subscribe = _.bind(_this.subscribe, _this);
        return _this;
    }
    PropertyDispatcher.prototype.push = function (event) {
        if (event.isEnd) {
            this.propertyEnded = true;
        }
        if (event instanceof Value) {
            this.current = new Some(event);
            this.currentValueRootId = UpdateBarrier.currentEventId();
        }
        else if (event.hasValue) {
            console.error("Unknown event, two Bacons loaded?", event.constructor);
        }
        return _super.prototype.push.call(this, event);
    };
    PropertyDispatcher.prototype.maybeSubSource = function (sink, reply) {
        if (reply === noMore) {
            return nop;
        }
        else if (this.propertyEnded) {
            sink(endEvent());
            return nop;
        }
        else {
            return _super.prototype.subscribe.call(this, sink);
        }
    };
    PropertyDispatcher.prototype.subscribe = function (sink) {
        var _this = this;
        var reply = more;
        if (this.current.isDefined && (this.hasSubscribers() || this.propertyEnded)) {
            var dispatchingId = UpdateBarrier.currentEventId();
            var valId = this.currentValueRootId;
            if (!this.propertyEnded && valId && dispatchingId && dispatchingId !== valId) {
                UpdateBarrier.whenDoneWith(this.observable, function () {
                    if (_this.currentValueRootId === valId) {
                        return sink(initialEvent(_this.current.get().value));
                    }
                });
                return this.maybeSubSource(sink, reply);
            }
            else {
                UpdateBarrier.inTransaction(undefined, this, function () {
                    reply = sink(initialEvent(_this.current.get().value));
                    return reply;
                }, []);
                return this.maybeSubSource(sink, reply);
            }
        }
        else {
            return this.maybeSubSource(sink, reply);
        }
    };
    PropertyDispatcher.prototype.inspect = function () {
        return this.observable + " current= " + this.current;
    };
    return PropertyDispatcher;
}(Dispatcher));

function flatMapWithConcurrencyLimit(src, limit, f) {
    return flatMap_(handleEventValueWith(f), src, {
        desc: new Desc(src, "flatMapWithConcurrencyLimit", [limit, f]),
        limit: limit
    });
}

function bufferWithTime(src, delay) {
    return bufferWithTimeOrCount(src, delay, Number.MAX_VALUE).withDesc(new Desc(src, "bufferWithTime", [delay]));
}
function bufferWithCount(src, count) {
    return bufferWithTimeOrCount(src, undefined, count).withDesc(new Desc(src, "bufferWithCount", [count]));
}
function bufferWithTimeOrCount(src, delay, count) {
    var delayFunc = toDelayFunction(delay);
    function flushOrSchedule(buffer) {
        if (buffer.values.length === count) {
            return buffer.flush();
        }
        else if (delayFunc !== undefined) {
            return buffer.schedule(delayFunc);
        }
    }
    var desc = new Desc(src, "bufferWithTimeOrCount", [delay, count]);
    return buffer(src, flushOrSchedule, flushOrSchedule).withDesc(desc);
}
var Buffer = /** @class */ (function () {
    function Buffer(onFlush, onInput) {
        this.push = function (e) { return more; };
        this.scheduled = null;
        this.end = undefined;
        this.values = [];
        this.onFlush = onFlush;
        this.onInput = onInput;
    }
    Buffer.prototype.flush = function () {
        if (this.scheduled) {
            GlobalScheduler.scheduler.clearTimeout(this.scheduled);
            this.scheduled = null;
        }
        if (this.values.length > 0) {
            var valuesToPush = this.values;
            this.values = [];
            var reply = this.push(nextEvent(valuesToPush));
            if ((this.end != null)) {
                return this.push(this.end);
            }
            else if (reply !== noMore) {
                return this.onFlush(this);
            }
        }
        else {
            if ((this.end != null)) {
                return this.push(this.end);
            }
        }
    };
    Buffer.prototype.schedule = function (delay) {
        var _this = this;
        if (!this.scheduled) {
            return this.scheduled = delay(function () {
                return _this.flush();
            });
        }
    };
    return Buffer;
}());
function toDelayFunction(delay) {
    if (delay === undefined) {
        return undefined;
    }
    if (typeof delay === "number") {
        var delayMs = delay;
        return function (f) {
            return GlobalScheduler.scheduler.setTimeout(f, delayMs);
        };
    }
    return delay;
}
function buffer(src, onInput, onFlush) {
    if (onInput === void 0) { onInput = nop; }
    if (onFlush === void 0) { onFlush = nop; }
    var reply = more;
    var buffer = new Buffer(onFlush, onInput);
    return src.transform(function (event, sink) {
        buffer.push = sink;
        if (hasValue(event)) {
            buffer.values.push(event.value);
            onInput(buffer);
        }
        else if (isError(event)) {
            reply = sink(event);
        }
        else if (isEnd(event)) {
            buffer.end = event;
            if (!buffer.scheduled) {
                buffer.flush();
            }
        }
        return reply;
    }).withDesc(new Desc(src, "buffer", []));
}

function asyncWrapSubscribe(obs, subscribe) {
    var subscribing = false;
    return function wrappedSubscribe(sink) {
        var inTransaction = UpdateBarrier.isInTransaction();
        subscribing = true;
        var asyncDeliveries;
        function deliverAsync() {
            var toDeliverNow = asyncDeliveries || [];
            asyncDeliveries = undefined;
            for (var i = 0; i < toDeliverNow.length; i++) {
                var event = toDeliverNow[i];
                sink(event);
            }
        }
        try {
            return subscribe(function wrappedSink(event) {
                if (subscribing || asyncDeliveries) {
                    if (!asyncDeliveries) {
                        asyncDeliveries = [event];
                        if (inTransaction) {
                            UpdateBarrier.soonButNotYet(obs, deliverAsync);
                        }
                        else {
                            GlobalScheduler.scheduler.setTimeout(deliverAsync, 0);
                        }
                    }
                    else {
                        asyncDeliveries.push(event);
                    }
                    return more;
                }
                else {
                    return sink(event);
                }
            });
        }
        finally {
            subscribing = false;
        }
    };
}
function mergeAll() {
    var streams = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        streams[_i] = arguments[_i];
    }
    var flattenedStreams = argumentsToObservables(streams);
    if (flattenedStreams.length) {
        return new EventStream(new Desc("Bacon", "mergeAll", flattenedStreams), function (sink) {
            var ends = 0;
            var smartSink = function (obs) {
                return function (unsubBoth) {
                    return obs.subscribeInternal(function (event) {
                        if (event.isEnd) {
                            ends++;
                            if (ends === flattenedStreams.length) {
                                return sink(endEvent());
                            }
                            else {
                                return more;
                            }
                        }
                        else {
                            event = event.toNext();
                            var reply = sink(event);
                            if (reply === noMore) {
                                unsubBoth();
                            }
                            return reply;
                        }
                    });
                };
            };
            var sinks = map(smartSink, flattenedStreams);
            return new CompositeUnsubscribe(sinks).unsubscribe;
        });
    }
    else {
        return never();
    }
}

function later(delay, value) {
    return fromBinder(function (sink) {
        var sender = function () {
            return sink([toEvent(value), endEvent()]);
        };
        var id = GlobalScheduler.scheduler.setTimeout(sender, delay);
        return function () {
            return GlobalScheduler.scheduler.clearTimeout(id);
        };
    }).withDesc(new Desc("Bacon", "later", [delay, value]));
}

function delay(src, delay) {
    return src.transformChanges(new Desc(src, "delay", [delay]), function (changes) {
        return changes.flatMap(function (value) {
            return later(delay, value);
        });
    });
}

function debounce(src, delay) {
    return src.transformChanges(new Desc(src, "debounce", [delay]), function (changes) {
        return changes.flatMapLatest(function (value) {
            return later(delay, value);
        });
    });
}
function debounceImmediate(src, delay) {
    return src.transformChanges(new Desc(src, "debounceImmediate", [delay]), function (changes) {
        return changes.flatMapFirst(function (value) {
            return once(value).concat(later(delay, value).errors());
        });
    });
}

function throttle(src, delay) {
    return src.transformChanges(new Desc(src, "throttle", [delay]), function (changes) {
        return changes.bufferWithTime(delay).map(function (values) { return values[values.length - 1]; });
    });
}

function bufferingThrottle(src, minimumInterval) {
    var desc = new Desc(src, "bufferingThrottle", [minimumInterval]);
    return src.transformChanges(desc, function (changes) { return changes.flatMapConcat(function (x) {
        return once(x).concat(later(minimumInterval, x).errors());
    }); });
}

function takeWhile(src, f) {
    return withPredicate(src, f, takeWhileT, new Desc(src, "takeWhile", [f]));
}
function takeWhileT(f) {
    return function (event, sink) {
        if (event.filter(f)) {
            return sink(event);
        }
        else {
            sink(endEvent());
            return noMore;
        }
    };
}

function skipUntil(src, starter) {
    var started = starter
        .transform(composeT(takeT(1), mapT(true)))
        .toProperty()
        .startWith(false);
    return src.filter(started).withDesc(new Desc(src, "skipUntil", [starter]));
}

function skipWhile(src, f) {
    return withPredicate(src, f, skipWhileT, new Desc(src, "skipWhile", [f]));
}
function skipWhileT(f) {
    var started = false;
    return function (event, sink) {
        if (started || !hasValue(event) || !f(event.value)) {
            if (event.hasValue) {
                started = true;
            }
            return sink(event);
        }
        else {
            return more;
        }
    };
}

function groupBy(src, keyF, limitF) {
    if (limitF === void 0) { limitF = _.id; }
    var streams = {};
    return src.transform(composeT(filterT(function (x) { return !streams[keyF(x)]; }), mapT(function (firstValue) {
        var key = keyF(firstValue);
        var similarValues = src.changes().filter(function (x) { return keyF(x) === key; });
        var data = once(firstValue).concat(similarValues);
        var limited = limitF(data, firstValue).toEventStream().transform(function (event, sink) {
            var reply = sink(event);
            if (event.isEnd) {
                delete streams[key];
            }
            return reply;
        });
        streams[key] = limited;
        return limited;
    })));
}

function slidingWindow(src, maxValues, minValues) {
    if (minValues === void 0) { minValues = 0; }
    return src.scan([], (function (window, value) {
        return window.concat([value]).slice(-maxValues);
    }))
        .filter((function (values) {
        return values.length >= minValues;
    })).withDesc(new Desc(src, "slidingWindow", [maxValues, minValues]));
}

var nullMarker = {};
function diff(src, start, f) {
    return transformP(scan(src, [start, nullMarker], (function (prevTuple, next) { return [next, f(prevTuple[0], next)]; })), composeT(filterT(function (tuple) { return tuple[1] !== nullMarker; }), mapT(function (tuple) { return tuple[1]; })), new Desc(src, "diff", [start, f]));
}

function flatScan(src, seed, f) {
    var current = seed;
    return src.flatMapConcat(function (next) {
        return makeObservable(f(current, next)).doAction(function (updated) { return current = updated; });
    }).toProperty().startWith(seed).withDesc(new Desc(src, "flatScan", [seed, f]));
}

function holdWhen(src, valve) {
    var onHold = false;
    var bufferedValues = [];
    var srcIsEnded = false;
    return new EventStream(new Desc(src, "holdWhen", [valve]), function (sink) {
        var composite = new CompositeUnsubscribe();
        var subscribed = false;
        var endIfBothEnded = function (unsub) {
            if (unsub) {
                unsub();
            }
            if (composite.empty() && subscribed) {
                return sink(endEvent());
            }
            return more;
        };
        composite.add(function (unsubAll, unsubMe) {
            return valve.subscribeInternal(function (event) {
                if (hasValue(event)) {
                    onHold = event.value;
                    var result = more;
                    if (!onHold) {
                        var toSend = bufferedValues;
                        bufferedValues = [];
                        for (var i = 0; i < toSend.length; i++) {
                            result = sink(nextEvent(toSend[i]));
                        }
                        if (srcIsEnded) {
                            sink(endEvent());
                            unsubMe();
                            result = noMore;
                        }
                    }
                    return result;
                }
                else if (event.isEnd) {
                    return endIfBothEnded(unsubMe);
                }
                else {
                    return sink(event);
                }
            });
        });
        composite.add(function (unsubAll, unsubMe) {
            return src.subscribeInternal(function (event) {
                if (onHold && hasValue(event)) {
                    bufferedValues.push(event.value);
                    return more;
                }
                else if (event.isEnd && bufferedValues.length) {
                    srcIsEnded = true;
                    return endIfBothEnded(unsubMe);
                }
                else {
                    return sink(event);
                }
            });
        });
        subscribed = true;
        endIfBothEnded();
        return composite.unsubscribe;
    });
}
function zipAsArray() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var streams = _.map((function (s) { return s.toEventStream(); }), argumentsToObservables(args));
    return when([streams, function () {
            var xs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                xs[_i] = arguments[_i];
            }
            return xs;
        }]).withDesc(new Desc("Bacon", "zipAsArray", args));
}
/**
 Like [`zipAsArray`](#bacon-zipasarray) but uses the given n-ary
 function to combine the n values from n sources, instead of returning them in an Array.
 */
function zipWith(f) {
    var streams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        streams[_i - 1] = arguments[_i];
    }
    var _a = argumentsToObservablesAndFunction(arguments), streams = _a[0], f = _a[1];
    streams = _.map((function (s) { return s.toEventStream(); }), streams);
    return when([streams, f]).withDesc(new Desc("Bacon", "zipWith", [f].concat(streams)));
}
function zip(left, right, f) {
    return zipWith(f || Array, left, right).withDesc(new Desc(left, "zip", [right]));
}

function combineTemplate(template) {
    function current(ctxStack) { return ctxStack[ctxStack.length - 1]; }
    function setValue(ctxStack, key, value) {
        current(ctxStack)[key] = value;
        return value;
    }
    function applyStreamValue(key, index) {
        return function (ctxStack, values) {
            setValue(ctxStack, key, values[index]);
        };
    }
    function constantValue(key, value) {
        return function (ctxStack) {
            setValue(ctxStack, key, value);
        };
    }
    function mkContext(template) {
        return isArray(template) ? [] : {};
    }
    function pushContext(key, value) {
        return function (ctxStack) {
            var newContext = mkContext(value);
            setValue(ctxStack, key, newContext);
            ctxStack.push(newContext);
        };
    }
    function containsObservables(value) {
        if (isObservable(value)) {
            return true;
        }
        else if (value && (value.constructor == Object || value.constructor == Array)) {
            for (var key in value) {
                if (Object.prototype.hasOwnProperty.call(value, key)) {
                    var child = value[key];
                    if (containsObservables(child))
                        return true;
                }
            }
        }
    }
    function compile(key, value) {
        if (isObservable(value)) {
            streams.push(value);
            funcs.push(applyStreamValue(key, streams.length - 1));
        }
        else if (containsObservables(value)) {
            var popContext = function (ctxStack) { ctxStack.pop(); };
            funcs.push(pushContext(key, value));
            compileTemplate(value);
            funcs.push(popContext);
        }
        else {
            funcs.push(constantValue(key, value));
        }
    }
    function combinator(values) {
        var rootContext = mkContext(template);
        var ctxStack = [rootContext];
        for (var i = 0, f; i < funcs.length; i++) {
            f = funcs[i];
            f(ctxStack, values);
        }
        return rootContext;
    }
    function compileTemplate(template) { _.each(template, compile); }
    var funcs = [];
    var streams = [];
    var resultProperty = containsObservables(template)
        ? (compileTemplate(template), combineAsArray(streams).map(combinator))
        : constant(template);
    return resultProperty.withDesc(new Desc("Bacon", "combineTemplate", [template]));
}

function decode(src, cases) {
    return src.combine(combineTemplate(cases), function (key, values) { return values[key]; })
        .withDesc(new Desc(src, "decode", [cases]));
}

function firstToPromise(src, PromiseCtr) {
    if (typeof PromiseCtr !== "function") {
        if (typeof Promise === "function") {
            PromiseCtr = function (f) { return new Promise(f); };
        }
        else {
            throw new Error("There isn't default Promise, use shim or parameter");
        }
    }
    return new PromiseCtr(function (resolve, reject) {
        return src.subscribe(function (event) {
            if (hasValue(event)) {
                resolve(event.value);
            }
            if (isError(event)) {
                reject(event.error);
            }
            return noMore;
        });
    });
}
function toPromise(src, PromiseCtr) {
    return src.last().firstToPromise(PromiseCtr);
}

var idCounter = 0;
/**
 Observable is the base class for [EventsStream](eventstream.html) and [Property](property.html)

 @typeparam V   Type of the elements/values in the stream/property
 */
var Observable = /** @class */ (function () {
    function Observable(desc) {
        /**
         * Unique numeric id of this Observable. Implemented using a simple counter starting from 1.
         */
        this.id = ++idCounter;
                this._isObservable = true;
        this.desc = desc;
        this.initialDesc = desc;
    }
    /**
  Creates a Property that indicates whether
  `observable` is awaiting `otherObservable`, i.e. has produced a value after the latest
  value from `otherObservable`. This is handy for keeping track whether we are
  currently awaiting an AJAX response:
  
  ```js
  var showAjaxIndicator = ajaxRequest.awaiting(ajaxResponse)
  ```
  
     */
    Observable.prototype.awaiting = function (other) {
        return awaiting(this, other);
    };
    /**
  Throttles the observable using a buffer so that at most one value event in minimumInterval is issued.
  Unlike [`throttle`](#observable-throttle), it doesn't discard the excessive events but buffers them instead, outputting
  them with a rate of at most one value per minimumInterval.
  
  Example:
  
  ```js
  var throttled = source.bufferingThrottle(2)
  ```
  
  ```
  source:    asdf----asdf----
  throttled: a-s-d-f-a-s-d-f-
  ```
     */
    Observable.prototype.bufferingThrottle = function (minimumInterval) {
        return bufferingThrottle(this, minimumInterval);
    };
    /**
  Combines the latest values of the two
  streams or properties using a two-arg function. Similarly to [`scan`](#scan), you can use a
  method name instead, so you could do `a.combine(b, ".concat")` for two
  properties with array value. The result is a [Property](property.html).
     */
    Observable.prototype.combine = function (right, f) {
        return combineTwo(this, right, f).withDesc(new Desc(this, "combine", [right, f]));
    };
    /**
  Throttles stream/property by given amount
  of milliseconds, but so that event is only emitted after the given
  "quiet period". Does not affect emitting the initial value of a [Property](property.html).
  The difference of [`throttle`](#throttle) and [`debounce`](#debounce) is the same as it is in the
  same methods in jQuery.
  
  Example:
  
  ```
  source:             asdf----asdf----
  source.debounce(2): -----f-------f--
  ```
  
     */
    Observable.prototype.debounce = function (minimumInterval) {
        return debounce(this, minimumInterval);
    };
    /**
  Passes the first event in the
  stream through, but after that, only passes events after a given number
  of milliseconds have passed since previous output.
  
  Example:
  
  ```
  source:                      asdf----asdf----
  source.debounceImmediate(2): a-d-----a-d-----
  ```
     */
    Observable.prototype.debounceImmediate = function (minimumInterval) {
        return debounceImmediate(this, minimumInterval);
    };
    /**
  Decodes input using the given mapping. Is a
  bit like a switch-case or the decode function in Oracle SQL. For
  example, the following would map the value 1 into the string "mike"
  and the value 2 into the value of the `who` property.
  
  ```js
  property.decode({1 : "mike", 2 : who})
  ```
  
  This is actually based on [`combineTemplate`](#combinetemplate) so you can compose static
  and dynamic data quite freely, as in
  
  ```js
  property.decode({1 : { type: "mike" }, 2 : { type: "other", whoThen : who }})
  ```
  
  The return value of [`decode`](#decode) is always a [`Property`](property.html).
  
     */
    Observable.prototype.decode = function (cases) {
        return decode(this, cases);
    };
    /**
  Delays the stream/property by given amount of milliseconds. Does not delay the initial value of a [`Property`](property.html).
  
  ```js
  var delayed = source.delay(2)
  ```
  
  ```
  source:    asdf----asdf----
  delayed:   --asdf----asdf--
  ```
  
     */
    Observable.prototype.delay = function (delayMs) {
        return delay(this, delayMs);
    };
    /**
     * Returns the an array of dependencies that the Observable has. For instance, for `a.map(function() {}).deps()`, would return `[a]`.
     This method returns the "visible" dependencies only, skipping internal details.  This method is thus suitable for visualization tools.
     Internally, many combinator functions depend on other combinators to create intermediate Observables that the result will actually depend on.
     The `deps` method will skip these internal dependencies. See also: [internalDeps](#internaldeps)
     */
    Observable.prototype.deps = function () {
        return this.desc.deps();
    };
    /**
  Returns a Property that represents the result of a comparison
  between the previous and current value of the Observable. For the initial value of the Observable,
  the previous value will be the given start.
  
  Example:
  
  ```js
  var distance = function (a,b) { return Math.abs(b - a) }
  Bacon.sequentially(1, [1,2,3]).diff(0, distance)
  ```
  
  This would result to following elements in the result stream:
  
      1 - 0 = 1
      2 - 1 = 1
      3 - 2 = 1
  
     */
    Observable.prototype.diff = function (start, f) {
        return diff(this, start, f);
    };
    /**
  Returns a stream/property where the function f
  is executed for each value, before dispatching to subscribers. This is
  useful for debugging, but also for stuff like calling the
  `preventDefault()` method for events. In fact, you can
  also use a property-extractor string instead of a function, as in
  `".preventDefault"`.
  
  Please note that for Properties, it's not guaranteed that the function will be called exactly once
  per event; when a Property loses all of its subscribers it will re-emit its current value when a
  new subscriber is added.
     */
    Observable.prototype.doAction = function (f) {
        return this.transform(doActionT(f), new Desc(this, "doAction", [f]));
    };
    Observable.prototype.doEnd = function (f) {
        return this.transform(doEndT(f), new Desc(this, "doEnd", [f]));
    };
    /**
  Returns a stream/property where the function f
  is executed for each error, before dispatching to subscribers.
  That is, same as [`doAction`](#observable-doaction) but for errors.
     */
    Observable.prototype.doError = function (f) {
        return this.transform(doErrorT(f), new Desc(this, "doError", [f]));
    };
    Observable.prototype.doLog = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.transform(doLogT(args), new Desc(this, "doLog", args));
    };
    Observable.prototype.doEvent = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.transform(doEventT(args), new Desc(this, "doEvent", args));
    };
    Observable.prototype.endAsValue = function () {
        return endAsValue(this);
    };
    Observable.prototype.endOnError = function (predicate) {
        if (predicate === void 0) { predicate = function (x) { return true; }; }
        return endOnError(this, predicate);
    };
    Observable.prototype.errors = function () {
        return this.filter(function (x) { return false; }).withDesc(new Desc(this, "errors"));
    };
    Observable.prototype.filter = function (f) {
        return filter$1(this, f);
    };
    Observable.prototype.first = function () {
        return take(1, this, new Desc(this, "first"));
    };
    Observable.prototype.firstToPromise = function (PromiseCtr) {
        return firstToPromise(this, PromiseCtr);
    };
    Observable.prototype.fold = function (seed, f) {
        return fold$1(this, seed, f);
    };
    Observable.prototype.forEach = function (f) {
        if (f === void 0) { f = nullSink; }
        return this.onValue(f);
    };
    Observable.prototype.holdWhen = function (valve) {
        return holdWhen(this, valve);
    };
    Observable.prototype.inspect = function () { return this.toString(); };
    Observable.prototype.internalDeps = function () {
        return this.initialDesc.deps();
    };
    Observable.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(args, this);
        return this;
    };
    Observable.prototype.mapEnd = function (f) {
        return this.transform(mapEndT(f), new Desc(this, "mapEnd", [f]));
    };
    Observable.prototype.mapError = function (f) {
        return this.transform(mapErrorT(f), new Desc(this, "mapError", [f]));
    };
    Observable.prototype.name = function (name) {
        this._name = name;
        return this;
    };
    Observable.prototype.onEnd = function (f) {
        if (f === void 0) { f = nullVoidSink; }
        return this.subscribe(function (event) {
            if (event.isEnd) {
                return f();
            }
            return more;
        });
    };
    Observable.prototype.onError = function (f) {
        if (f === void 0) { f = nullSink; }
        return this.subscribe(function (event) {
            if (isError(event)) {
                return f(event.error);
            }
            return more;
        });
    };
    Observable.prototype.onValue = function (f) {
        if (f === void 0) { f = nullSink; }
        return {
            unsubscribeOnDisconnect: (component) => {
                const unsubCallback = this.subscribe(function (event) {
                    if (hasValue(event)) {
                        return f(event.value);
                    }
                    return more;
                });

                component.addUnsubCallback(unsubCallback);
            }
        }
    };
    Observable.prototype.onValues = function (f) {
        return this.onValue(function (args) { return f.apply(void 0, args); });
    };
    Observable.prototype.reduce = function (seed, f) {
        return fold$1(this, seed, f);
    };
    Observable.prototype.sampledBy = function (sampler) {
        return sampledBy(this, sampler, arguments[1]); // TODO: combinator
    };
    Observable.prototype.scan = function (seed, f) {
        return scan(this, seed, f);
    };
    Observable.prototype.skip = function (count) {
        return skip(this, count);
    };
    Observable.prototype.skipDuplicates = function (isEqual) {
        return skipDuplicates(this, isEqual);
    };
    Observable.prototype.skipErrors = function () {
        return skipErrors(this);
    };
    Observable.prototype.skipUntil = function (starter) {
        return skipUntil(this, starter);
    };
    Observable.prototype.skipWhile = function (f) {
        return skipWhile(this, f);
    };
    Observable.prototype.slidingWindow = function (maxValues, minValues) {
        if (minValues === void 0) { minValues = 0; }
        return slidingWindow(this, maxValues, minValues);
    };
    Observable.prototype.subscribe = function (sink) {
        var _this = this;
        if (sink === void 0) { sink = nullSink; }
        return UpdateBarrier.wrappedSubscribe(this, function (sink) { return _this.subscribeInternal(sink); }, sink);
    };
    Observable.prototype.take = function (count) {
        return take(count, this);
    };
    Observable.prototype.takeUntil = function (stopper) {
        return takeUntil(this, stopper);
    };
    Observable.prototype.takeWhile = function (f) {
        return takeWhile(this, f);
    };
    Observable.prototype.throttle = function (minimumInterval) {
        return throttle(this, minimumInterval);
    };
    Observable.prototype.toPromise = function (PromiseCtr) {
        return toPromise(this, PromiseCtr);
    };
    Observable.prototype.toString = function () {
        if (this._name) {
            return this._name;
        }
        else {
            return this.desc.toString();
        }
    };
    Observable.prototype.withDesc = function (desc) {
        if (desc)
            this.desc = desc;
        return this;
    };
    Observable.prototype.withDescription = function (context, method) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.desc = describe.apply(void 0, __spreadArrays([context, method], args));
        return this;
    };
    Observable.prototype.zip = function (other, f) {
        return zip(this, other, f);
    };
    return Observable;
}());
var Property = /** @class */ (function (_super) {
    __extends(Property, _super);
    function Property(desc, subscribe, handler) {
        var _this = _super.call(this, desc) || this;
        /** @internal */
        _this._isProperty = true;
        assertFunction(subscribe);
        _this.dispatcher = new PropertyDispatcher(_this, subscribe, handler);
        registerObs(_this);
        return _this;
    }
    Property.prototype.and = function (other) {
        return and(this, other);
    };
    Property.prototype.changes = function () {
        var _this = this;
        return new EventStream(new Desc(this, "changes", []), function (sink) { return _this.dispatcher.subscribe(function (event) {
            if (!event.isInitial) {
                return sink(event);
            }
            return more;
        }); });
    };
    Property.prototype.concat = function (other) {
        return this.transformChanges(describe(this, "concat", other), function (changes) { return changes.concat(other); });
    };
        Property.prototype.transformChanges = function (desc, f) {
        return transformPropertyChanges(this, f, desc);
    };
    Property.prototype.flatMap = function (f) {
        return flatMap$1(this, f);
    };
    Property.prototype.flatMapConcat = function (f) {
        return flatMapConcat(this, f);
    };
    Property.prototype.flatMapError = function (f) {
        return flatMapError(this, f);
    };
    Property.prototype.flatMapEvent = function (f) {
        return flatMapEvent(this, f);
    };
    Property.prototype.flatMapFirst = function (f) {
        return flatMapFirst(this, f);
    };
    Property.prototype.flatMapLatest = function (f) {
        return flatMapLatest(this, f);
    };
    Property.prototype.flatMapWithConcurrencyLimit = function (limit, f) {
        return flatMapWithConcurrencyLimit(this, limit, f);
    };
    Property.prototype.groupBy = function (keyF, limitF) {
        return groupBy(this, keyF, limitF);
    };
    Property.prototype.map = function (f) {
        return map$1(this, f);
    };
    Property.prototype.not = function () {
        return not(this);
    };
    Property.prototype.or = function (other) {
        return or(this, other);
    };
    Property.prototype.sample = function (interval) {
        return sampleP(this, interval);
    };
    Property.prototype.startWith = function (seed) {
        return startWithP(this, seed);
    };
        Property.prototype.subscribeInternal = function (sink) {
        if (sink === void 0) { sink = nullSink; }
        return this.dispatcher.subscribe(sink);
    };
    Property.prototype.toEventStream = function (options) {
        var _this = this;
        return new EventStream(new Desc(this, "toEventStream", []), function (sink) { return _this.subscribeInternal(function (event) {
            return sink(event.toNext());
        }); }, undefined, options);
    };
    Property.prototype.toProperty = function () {
        assertNoArguments(arguments);
        return this;
    };
    Property.prototype.transform = function (transformer, desc) {
        return transformP(this, transformer, desc);
    };
    Property.prototype.withLatestFrom = function (samplee, f) {
        return withLatestFromP(this, samplee, f);
    };
    Property.prototype.withStateMachine = function (initState, f) {
        return withStateMachine(initState, f, this);
    };
    return Property;
}(Observable));
function isProperty(x) {
    return !!x._isProperty;
}
var allowSync = { forceAsync: false };
var EventStream = /** @class */ (function (_super) {
    __extends(EventStream, _super);
    function EventStream(desc, subscribe, handler, options) {
        var _this = _super.call(this, desc) || this;
                _this._isEventStream = true;
        if (options !== allowSync) {
            subscribe = asyncWrapSubscribe(_this, subscribe);
        }
        _this.dispatcher = new Dispatcher(_this, subscribe, handler);
        registerObs(_this);
        return _this;
    }
    EventStream.prototype.bufferWithTime = function (delay) {
        return bufferWithTime(this, delay);
    };
    EventStream.prototype.bufferWithCount = function (count) {
        return bufferWithCount(this, count);
    };
    EventStream.prototype.bufferWithTimeOrCount = function (delay, count) {
        return bufferWithTimeOrCount(this, delay, count);
    };
    EventStream.prototype.changes = function () {
        return this;
    };
    EventStream.prototype.concat = function (other, options) {
        return concatE(this, other, options);
    };
        EventStream.prototype.transformChanges = function (desc, f) {
        return f(this).withDesc(desc);
    };
    EventStream.prototype.flatMap = function (f) { return flatMap$1(this, f); };
    EventStream.prototype.flatMapConcat = function (f) { return flatMapConcat(this, f); };
    EventStream.prototype.flatMapError = function (f) { return flatMapError(this, f); };
    EventStream.prototype.flatMapFirst = function (f) { return flatMapFirst(this, f); };
    EventStream.prototype.flatMapLatest = function (f) { return flatMapLatest(this, f); };
    EventStream.prototype.flatMapWithConcurrencyLimit = function (limit, f) { return flatMapWithConcurrencyLimit(this, limit, f); };
    EventStream.prototype.flatMapEvent = function (f) { return flatMapEvent(this, f); };
    EventStream.prototype.flatScan = function (seed, f) {
        return flatScan(this, seed, f);
    };
    EventStream.prototype.groupBy = function (keyF, limitF) {
        return groupBy(this, keyF, limitF);
    };
    EventStream.prototype.map = function (f) {
        return map$1(this, f);
    };
    EventStream.prototype.merge = function (other) {
        assertEventStream(other);
        return mergeAll(this, other).withDesc(new Desc(this, "merge", [other]));
    };
    EventStream.prototype.not = function () { return not(this); };
    EventStream.prototype.startWith = function (seed) {
        return startWithE(this, seed);
    };
        EventStream.prototype.subscribeInternal = function (sink) {
        if (sink === void 0) { sink = nullSink; }
        return this.dispatcher.subscribe(sink);
    };
    EventStream.prototype.toEventStream = function () { return this; };
    EventStream.prototype.toProperty = function (initValue) {
        var usedInitValue = arguments.length
            ? toOption(initValue)
            : none();
        var disp = this.dispatcher;
        var desc = new Desc(this, "toProperty", Array.prototype.slice.apply(arguments));
        var streamSubscribe = disp.subscribe;
        return new Property(desc, streamSubscribeToPropertySubscribe(usedInitValue, streamSubscribe));
    };
    EventStream.prototype.transform = function (transformer, desc) {
        return transformE(this, transformer, desc);
    };
    EventStream.prototype.withLatestFrom = function (samplee, f) {
        return withLatestFromE(this, samplee, f);
    };
    EventStream.prototype.withStateMachine = function (initState, f) {
        return withStateMachine(initState, f, this);
    };
    return EventStream;
}(Observable));
function newEventStream(description, subscribe) {
    return new EventStream(description, subscribe);
}
function newEventStreamAllowSync(description, subscribe) {
    return new EventStream(description, subscribe, undefined, allowSync);
}

function symbol(key) {
    if (typeof Symbol !== "undefined" && Symbol[key]) {
        return Symbol[key];
    }
    else if (typeof Symbol !== "undefined" && typeof Symbol.for === "function") {
        return Symbol[key] = Symbol.for(key);
    }
    else {
        return "@@" + key;
    }
}

var ESObservable = /** @class */ (function () {
    function ESObservable(observable) {
        this.observable = observable;
    }
    ESObservable.prototype.subscribe = function (observerOrOnNext, onError, onComplete) {
        var observer = typeof observerOrOnNext === 'function'
            ? { next: observerOrOnNext, error: onError, complete: onComplete }
            : observerOrOnNext;
        var subscription = {
            closed: false,
            unsubscribe: function () {
                subscription.closed = true;
                cancel();
            }
        };
        var cancel = this.observable.subscribe(function (event) {
            if (hasValue(event) && observer.next) {
                observer.next(event.value);
            }
            else if (isError(event)) {
                if (observer.error)
                    observer.error(event.error);
                subscription.unsubscribe();
            }
            else if (event.isEnd) {
                subscription.closed = true;
                if (observer.complete)
                    observer.complete();
            }
        });
        return subscription;
    };
    return ESObservable;
}());
ESObservable.prototype[symbol('observable')] = function () {
    return this;
};
Observable.prototype.toESObservable = function () {
    return new ESObservable(this);
};
Observable.prototype[symbol('observable')] = Observable.prototype.toESObservable;

function update(initial) {
    var patterns = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        patterns[_i - 1] = arguments[_i];
    }
    var rawPatterns = extractRawPatterns(patterns);
    for (var i = 0; i < rawPatterns.length; i++) {
        var pattern = rawPatterns[i];
        pattern[1] = lateBindFirst(pattern[1]);
    }
    return when.apply(void 0, rawPatterns).scan(initial, (function (x, f) {
        return f(x);
    })).withDesc(new Desc("Bacon", "update", __spreadArrays([initial], patterns)));
}
function lateBindFirst(f) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return function (i) {
            return f.apply(void 0, [i].concat(args));
        };
    };
}

function fromArray(values) {
    assertArray(values);
    if (!values.length) {
        return never().withDesc(new Desc("Bacon", "fromArray", values));
    }
    else {
        var i = 0;
        var stream = new EventStream(new Desc("Bacon", "fromArray", [values]), function (sink) {
            var unsubd = false;
            var reply = more;
            var pushing = false;
            var pushNeeded = false;
            function push() {
                pushNeeded = true;
                if (pushing) {
                    return;
                }
                if (i === values.length) {
                    sink(endEvent());
                    return false;
                }
                pushing = true;
                while (pushNeeded) {
                    pushNeeded = false;
                    if ((reply !== noMore) && !unsubd) {
                        var value = values[i++];
                        reply = sink(toEvent(value));
                        if (reply !== noMore) {
                            if (i === values.length) {
                                sink(endEvent());
                            }
                            else {
                                UpdateBarrier.afterTransaction(stream, push);
                            }
                        }
                    }
                }
                pushing = false;
                return pushing;
            }
            UpdateBarrier.soonButNotYet(stream, push);
            return function () {
                unsubd = true;
                return unsubd;
            };
        });
        return stream;
    }
}

function isEventSourceFn(x) {
    return _.isFunction(x);
}
var eventMethods = [
    ["addEventListener", "removeEventListener"],
    ["addListener", "removeListener"],
    ["on", "off"],
    ["bind", "unbind"]
];
var findHandlerMethods = function (target) {
    var pair;
    for (var i = 0; i < eventMethods.length; i++) {
        pair = eventMethods[i];
        var methodPair = [target[pair[0]], target[pair[1]]];
        if (methodPair[0] && methodPair[1]) {
            return methodPair;
        }
    }
    for (var j = 0; j < eventMethods.length; j++) {
        pair = eventMethods[j];
        var addListener = target[pair[0]];
        if (addListener) {
            return [addListener, function () { }];
        }
    }
    throw new Error("No suitable event methods in " + target);
};
/**
 creates an EventStream from events
 on a DOM EventTarget or Node.JS EventEmitter object, or an object that supports event listeners using `on`/`off` methods.
 You can also pass an optional function that transforms the emitted
 events' parameters.

 The simple form:

 ```js
 Bacon.fromEvent(document.body, "click").onValue(function() { alert("Bacon!") })
 ```

 Using a binder function:

 ```js
 Bacon.fromEvent(
 window,
 function(binder, listener) {
    binder("scroll", listener, {passive: true})
  }
 ).onValue(function() {
  console.log(window.scrollY)
})
 ```

 @param target
 @param eventSource
 @param eventTransformer
 @typeparam V Type of stream elements

 */
function fromEvent(target, eventSource, eventTransformer) {
    var _a = findHandlerMethods(target), sub = _a[0], unsub = _a[1];
    var desc = new Desc("Bacon", "fromEvent", [target, eventSource]);
    return fromBinder(function (handler) {
        if (isEventSourceFn(eventSource)) {
            eventSource(sub.bind(target), handler);
            return function () {
                return eventSource(unsub.bind(target), handler);
            };
        }
        else {
            sub.call(target, eventSource, handler);
            return function () {
                return unsub.call(target, eventSource, handler);
            };
        }
    }, eventTransformer).withDesc(desc);
}

/**
 A shorthand for combining multiple
 sources (streams, properties, constants) as array and assigning the
 side-effect function f for the values. The following example would log
 the number 3.

 ```js
 function f(a, b) { console.log(a + b) }
 Bacon.onValues(Bacon.constant(1), Bacon.constant(2), f)
 ```
 */
function onValues() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return combineAsArray(args.slice(0, args.length - 1)).onValues(args[arguments.length - 1]);
}

/**
 Calls generator function which is expected to return an observable. The returned EventStream contains
 values and errors from the spawned observable. When the spawned observable ends, the generator is called
 again to spawn a new observable.

 This is repeated until the generator returns a falsy value
 (such as `undefined` or `false`).

 The generator function is called with one argument — iteration number starting from `0`.

 Here's an example:

```js
Bacon.repeat(function(i) {
if (i < 3) {
  return Bacon.once(i);
} else {
  return false;
}
}).log()
```

 The example will produce values 0, 1 and 2.

 @param {(number) => (Observable<V> | null)} generator
 @returns {EventStream<V>}
 @typeparam V Type of stream elements

 */
function repeat(generator) {
    var index = 0;
    return fromBinder(function (sink) {
        var flag = false;
        var reply = more;
        var unsub = function () { };
        function handleEvent(event) {
            if (event.isEnd) {
                if (!flag) {
                    flag = true;
                }
                else {
                    subscribeNext();
                }
                return more;
            }
            else {
                return reply = sink(event);
            }
        }
        function subscribeNext() {
            var next;
            flag = true;
            while (flag && reply !== noMore) {
                next = generator(index++);
                flag = false;
                if (next) {
                    unsub = next.subscribeInternal(handleEvent);
                }
                else {
                    sink(endEvent());
                }
            }
            flag = true;
        }
        subscribeNext();
        return function () { return unsub(); };
    }).withDesc(new Desc("Bacon", "repeat", [generator]));
}

function repeatedly(delay, values) {
    var index = 0;
    return fromPoll(delay, function () {
        return values[index++ % values.length];
    }).withDesc(new Desc("Bacon", "repeatedly", [delay, values]));
}

function silence(duration) {
    return later(duration, "")
        .filter(false)
        .withDesc(new Desc("Bacon", "silence", [duration]));
}

function retry(options) {
    if (!_.isFunction(options.source)) {
        throw new Error("'source' option has to be a function");
    }
    var source = options.source;
    var retries = options.retries || 0;
    var retriesDone = 0;
    var delay = options.delay || function () {
        return 0;
    };
    var isRetryable = options.isRetryable || function () {
        return true;
    };
    var finished = false;
    var errorEvent = null;
    return repeat(function (count) {
        function valueStream() {
            return source(count).endOnError().transform(function (event, sink) {
                if (isError(event)) {
                    errorEvent = event;
                    if (!(isRetryable(errorEvent.error) && (retries === 0 || retriesDone < retries))) {
                        finished = true;
                        return sink(event);
                    }
                    else {
                        return more;
                    }
                }
                else {
                    if (hasValue(event)) {
                        errorEvent = null;
                        finished = true;
                    }
                    return sink(event);
                }
            });
        }
        if (finished) {
            return undefined;
        }
        else if (errorEvent) {
            var context = {
                error: errorEvent.error,
                retriesDone: retriesDone
            };
            var pause = silence(delay(context));
            retriesDone++;
            return pause.concat(once(null).flatMap(valueStream));
        }
        else {
            return valueStream();
        }
    }).withDesc(new Desc("Bacon", "retry", [options]));
}
function sequentially(delay, values) {
    var index = 0;
    return fromPoll(delay, function () {
        var value = values[index++];
        if (index < values.length) {
            return value;
        }
        else if (index === values.length) {
            return [toEvent(value), endEvent()];
        }
        else {
            return endEvent();
        }
    }).withDesc(new Desc("Bacon", "sequentially", [delay, values]));
}

function valueAndEnd(value) {
    return [toEvent(value), endEvent()];
}
function fromPromise(promise, abort, eventTransformer) {
    if (eventTransformer === void 0) { eventTransformer = valueAndEnd; }
    return fromBinder(function (handler) {
        var bound = promise.then(handler, function (e) { return handler(new Error$1(e)); });
        if (bound && typeof bound.done === "function") {
            bound.done();
        }
        if (abort) {
            return function () {
                if (typeof promise.abort === "function") {
                    return promise.abort();
                }
            };
        }
        else {
            return function () {
            };
        }
    }, eventTransformer).withDesc(new Desc("Bacon", "fromPromise", [promise]));
}

function withMethodCallSupport(wrapped) {
    return function (f) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (typeof f === "object" && args.length) {
            var context = f;
            var methodName = args[0];
            f = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return context[methodName].apply(context, args);
            };
            args = args.slice(1);
        }
        return wrapped.apply(void 0, __spreadArrays([f], args));
    };
}
function partiallyApplied(f, applied) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return f.apply(void 0, (applied.concat(args)));
    };
}
var makeFunction_ = withMethodCallSupport(function (f) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (_.isFunction(f)) {
        if (args.length) {
            return partiallyApplied(f, args);
        }
        else {
            return f;
        }
    }
    else {
        return _.always(f);
    }
});
function makeFunction(f, args) {
    return makeFunction_.apply(void 0, __spreadArrays([f], args));
}

function fromCallback(f) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return fromBinder(function (handler) {
        makeFunction(f, args)(handler);
        return nop;
    }, function (value) {
        return [value, endEvent()];
    }).withDesc(new Desc("Bacon", "fromCallback", __spreadArrays([f], args)));
}
function fromNodeCallback(f) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return fromBinder(function (handler) {
        makeFunction(f, args)(handler);
        return nop;
    }, function (error, value) {
        if (error) {
            return [new Error$1(error), endEvent()];
        }
        return [value, endEvent()];
    }).withDesc(new Desc("Bacon", "fromNodeCallback", __spreadArrays([f], args)));
}

function fromESObservable(_observable) {
    var observable;
    if (_observable[symbol("observable")]) {
        observable = _observable[symbol("observable")]();
    }
    else {
        observable = _observable;
    }
    var desc = new Desc("Bacon", "fromESObservable", [observable]);
    return new EventStream(desc, function (sink) {
        var cancel = observable.subscribe({
            error: function (x) {
                sink(new Error$1(x));
                sink(new End());
            },
            next: function (value) { sink(new Next(value)); },
            complete: function () {
                sink(new End());
            }
        });
        if (cancel.unsubscribe) {
            return function () { cancel.unsubscribe(); };
        }
        else {
            return cancel;
        }
    });
}

/**
 An [`EventStream`](eventstream.html) that allows you to [`push`](#push) values into the stream.

 It also allows plugging other streams into the Bus, as inputs. The Bus practically
 merges all plugged-in streams and the values pushed using the [`push`](#push)
 method.
 */
var Bus = /** @class */ (function (_super) {
    __extends(Bus, _super);
    function Bus() {
        var _this = _super.call(this, new Desc("Bacon", "Bus", []), function (sink) { return _this.subscribeAll(sink); }) || this;
                _this.pushing = false;
                _this.pushQueue = undefined;
                _this.ended = false;
                _this.subscriptions = [];
        _this.unsubAll = _.bind(_this.unsubAll, _this);
        _this.push = _.bind(_this.push, _this);
        _this.subscriptions = []; // new array for each Bus instance
        _this.ended = false;
        return _this;
    }
    Bus.prototype.plug = function (input) {
        var _this = this;
        assertObservable(input);
        if (this.ended) {
            return;
        }
        var sub = { input: input, unsub: undefined };
        this.subscriptions.push(sub);
        if (typeof this.sink !== "undefined") {
            this.subscribeInput(sub);
        }
        return (function () { return _this.unsubscribeInput(input); });
    };
    Bus.prototype.end = function () {
        this.ended = true;
        this.unsubAll();
        if (typeof this.sink === "function") {
            return this.sink(endEvent());
        }
    };
    Bus.prototype.push = function (value) {
        if (!this.ended && typeof this.sink === "function") {
            var rootPush = !this.pushing;
            if (!rootPush) {
                if (!this.pushQueue)
                    this.pushQueue = [];
                this.pushQueue.push(value);
                return;
            }
            this.pushing = true;
            try {
                return this.sink(nextEvent(value));
            }
            finally {
                if (rootPush && this.pushQueue) {
                    var i = 0;
                    while (i < this.pushQueue.length) {
                        var v = this.pushQueue[i];
                        this.sink(nextEvent(v));
                        i++;
                    }
                    this.pushQueue = undefined;
                }
                this.pushing = false;
            }
        }
    };
    /**
     * Pushes an error to this stream.
     */
    Bus.prototype.error = function (error) {
        if (typeof this.sink === "function") {
            return this.sink(new Error$1(error));
        }
    };
        Bus.prototype.unsubAll = function () {
        var iterable = this.subscriptions;
        for (var i = 0, sub; i < iterable.length; i++) {
            sub = iterable[i];
            if (typeof sub.unsub === "function") {
                sub.unsub();
            }
        }
    };
        Bus.prototype.subscribeAll = function (newSink) {
        if (this.ended) {
            newSink(endEvent());
        }
        else {
            this.sink = newSink;
            var iterable = this.subscriptions.slice();
            for (var i = 0, subscription; i < iterable.length; i++) {
                subscription = iterable[i];
                this.subscribeInput(subscription);
            }
        }
        return this.unsubAll;
    };
        Bus.prototype.guardedSink = function (input) {
        var _this = this;
        return function (event) {
            if (event.isEnd) {
                _this.unsubscribeInput(input);
                return noMore;
            }
            else if (_this.sink) {
                return _this.sink(event);
            }
            else {
                return more;
            }
        };
    };
        Bus.prototype.subscribeInput = function (subscription) {
        subscription.unsub = subscription.input.subscribeInternal(this.guardedSink(subscription.input));
        return subscription.unsub;
    };
        Bus.prototype.unsubscribeInput = function (input) {
        var iterable = this.subscriptions;
        for (var i = 0, sub; i < iterable.length; i++) {
            sub = iterable[i];
            if (sub.input === input) {
                if (typeof sub.unsub === "function") {
                    sub.unsub();
                }
                this.subscriptions.splice(i, 1);
                return;
            }
        }
    };
    return Bus;
}(EventStream));

function tryF(f) {
    return function (value) {
        try {
            return once(f(value));
        }
        catch (e) {
            return once(new Error$1(e));
        }
    };
}

var $ = {
    asEventStream: function (eventName, selector, eventTransformer) {
        var _this = this;
        if (_.isFunction(selector)) {
            eventTransformer = selector;
            selector = undefined;
        }
        return fromBinder(function (handler) {
            _this.on(eventName, selector, handler);
            return (function () { return _this.off(eventName, selector, handler); });
        }, eventTransformer).withDesc(new Desc(this.selector || this, "asEventStream", [eventName]));
    },
    init: function (jQuery) {
        jQuery.fn.asEventStream = $.asEventStream;
    }
};

var version = '3.0.15';

const _$ = $;
export { _$ as $ };
const _Bus = Bus;
export { _Bus as Bus };
const _CompositeUnsubscribe = CompositeUnsubscribe;
export { _CompositeUnsubscribe as CompositeUnsubscribe };
const _Desc = Desc;
export { _Desc as Desc };
const _End = End;
export { _End as End };
export const Error = Error$1;
const _Event = Event;
export { _Event as Event };
const _EventStream = EventStream;
export { _EventStream as EventStream };
const _Initial = Initial;
export { _Initial as Initial };
const _Next = Next;
export { _Next as Next };
const _Observable = Observable;
export { _Observable as Observable };
const _Property = Property;
export { _Property as Property };
const _Value = Value;
export { _Value as Value };
const ___ = _;
export { ___ as _ };
const _combine = combine;
export { _combine as combine };
const _combineAsArray = combineAsArray;
export { _combineAsArray as combineAsArray };
const _combineTemplate = combineTemplate;
export { _combineTemplate as combineTemplate };
const _combineTwo = combineTwo;
export { _combineTwo as combineTwo };
const _combineWith = combineWith;
export { _combineWith as combineWith };
const _concatAll = concatAll;
export { _concatAll as concatAll };
const _constant = constant;
export { _constant as constant };
const _fromArray = fromArray;
export { _fromArray as fromArray };
const _fromBinder = fromBinder;
export { _fromBinder as fromBinder };
const _fromCallback = fromCallback;
export { _fromCallback as fromCallback };
const _fromESObservable = fromESObservable;
export { _fromESObservable as fromESObservable };
const _fromEvent = fromEvent;
export { _fromEvent as fromEvent };
export const fromEventTarget = fromEvent;
const _fromNodeCallback = fromNodeCallback;
export { _fromNodeCallback as fromNodeCallback };
const _fromPoll = fromPoll;
export { _fromPoll as fromPoll };
const _fromPromise = fromPromise;
export { _fromPromise as fromPromise };
const _getScheduler = getScheduler;
export { _getScheduler as getScheduler };
const _groupSimultaneous = groupSimultaneous;
export { _groupSimultaneous as groupSimultaneous };
const _hasValue = hasValue;
export { _hasValue as hasValue };
const _interval = interval;
export { _interval as interval };
const _isEnd = isEnd;
export { _isEnd as isEnd };
const _isError = isError;
export { _isError as isError };
const _isEvent = isEvent;
export { _isEvent as isEvent };
const _isInitial = isInitial;
export { _isInitial as isInitial };
const _isNext = isNext;
export { _isNext as isNext };
const _later = later;
export { _later as later };
const _mergeAll = mergeAll;
export { _mergeAll as mergeAll };
const _more = more;
export { _more as more };
const _never = never;
export { _never as never };
const _noMore = noMore;
export { _noMore as noMore };
const _nullSink = nullSink;
export { _nullSink as nullSink };
const _nullVoidSink = nullVoidSink;
export { _nullVoidSink as nullVoidSink };
const _onValues = onValues;
export { _onValues as onValues };
const _once = once;
export { _once as once };
const _repeat = repeat;
export { _repeat as repeat };
const _repeatedly = repeatedly;
export { _repeatedly as repeatedly };
const _retry = retry;
export { _retry as retry };
const _sequentially = sequentially;
export { _sequentially as sequentially };
const _setScheduler = setScheduler;
export { _setScheduler as setScheduler };
const _silence = silence;
export { _silence as silence };
const _spy = spy;
export { _spy as spy };
const _try = tryF;
export { _try as try };
const _update = update;
export { _update as update };
const _version = version;
export { _version as version };
const _when = when;
export { _when as when };
const _zipAsArray = zipAsArray;
export { _zipAsArray as zipAsArray };
const _zipWith = zipWith;
export { _zipWith as zipWith };

// Object.defineProperty(exports, '__esModule', { value: true });

// })));

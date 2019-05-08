require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
    'use strict';
    
    var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
    
    var React = require('react');
    var ReactDOM = require('react-dom');
    // var ImageMapper = require('react-image-mapper');
    var ImageMapper = require('../../src/ImageMapper');
    
    var MAP = {
        name: 'my-map',
        areas: [{ name: '1', shape: 'poly', coords: [25, 33, 27, 300, 128, 240, 128, 94], preFillColor: 'green', fillColor: 'blue' }, { name: '2', shape: 'poly', coords: [219, 118, 220, 210, 283, 210, 284, 119], preFillColor: 'pink' }, { name: '3', shape: 'poly', coords: [381, 241, 383, 94, 462, 53, 457, 282], fillColor: 'yellow' }, { name: '4', shape: 'poly', coords: [245, 285, 290, 285, 274, 239, 249, 238], preFillColor: 'red' }, { name: '5', shape: 'circle', coords: [170, 100, 25] }]
    };
    
    var URL = 'https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg';
    
    var App = React.createClass({
        displayName: 'App',
    
        getInitialState: function getInitialState() {
            return { hoveredArea: null, msg: null, moveMsg: null };
        },
        load: function load() {
            this.setState({ msg: 'Interact with image !' });
        },
        clicked: function clicked(area) {
            this.setState({ msg: 'You clicked on ' + area.shape + ' at coords ' + JSON.stringify(area.coords) + ' !' });
            console.log('${area.shape}');
        },
        clickedOutside: function clickedOutside(evt) {
            var coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
            this.setState({ msg: 'You clicked on the image at coords ' + JSON.stringify(coords) + ' !' });
        },
        moveOnImage: function moveOnImage(evt) {
            var coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
            this.setState({ moveMsg: 'You moved on the image at coords ' + JSON.stringify(coords) + ' !' });
        },
        enterArea: function enterArea(area) {
            this.setState({ hoveredArea: area, msg: 'You entered ' + area.shape + ' ' + area.name + ' at coords ' + JSON.stringify(area.coords) + ' !' });
        },
        leaveArea: function leaveArea(area) {
            this.setState({ hoveredArea: null, msg: 'You leaved ' + area.shape + ' ' + area.name + ' at coords ' + JSON.stringify(area.coords) + ' !' });
        },
        moveOnArea: function moveOnArea(area, evt) {
            var coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
            this.setState({ moveMsg: 'You moved on ' + area.shape + ' ' + area.name + ' at coords ' + JSON.stringify(coords) + ' !' });
        },
    
        getTipPosition: function getTipPosition(area) {
            return { top: area.center[1] + 'px', left: area.center[0] + 'px' };
        },
    
        render: function render() {
            var _this = this;
    
            return React.createElement(
                'div',
                { className: 'grid' },
                React.createElement('script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.24/browser.min.js' }),
                React.createElement(
                    'div',
                    { className: 'presenter' },
                    React.createElement(
                        'div',
                        { style: { position: 'relative' } },
                        React.createElement(ImageMapper, { src: URL, map: MAP, width: 500,
                            onLoad: function () {
                                return _this.load();
                            },
                            onClick: function (area) {
                                return _this.clicked(area);
                            },
                            onMouseEnter: function (area) {
                                return _this.enterArea(area);
                            },
                            onMouseLeave: function (area) {
                                return _this.leaveArea(area);
                            },
                            onMouseMove: function (area, _, evt) {
                                return _this.moveOnArea(area, evt);
                            },
                            onImageClick: function (evt) {
                                return _this.clickedOutside(evt);
                            },
                            onImageMouseMove: function (evt) {
                                return _this.moveOnImage(evt);
                            }
                        }),
                        this.state.hoveredArea && React.createElement(
                            'span',
                            { className: 'tooltip', style: _extends({}, this.getTipPosition(this.state.hoveredArea)) },
                            this.state.hoveredArea && this.state.hoveredArea.name
                        )
                    ),
                    React.createElement(
                        'pre',
                        { className: 'message' },
                        this.state.msg ? this.state.msg : null
                    ),
                    React.createElement(
                        'pre',
                        null,
                        this.state.moveMsg ? this.state.moveMsg : null
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'source' },
                    React.createElement(
                        'h2',
                        null,
                        'Example with custom tooltips :'
                    ),
                    React.createElement(
                        'p',
                        null,
                        '(message logic is not present, to keep it clear)'
                    ),
                    React.createElement(
                        'pre',
                        null,
                        React.createElement(
                            'code',
                            null,
                            '<div className="container">\n' + '    <ImageMapper src={URL} map={MAP} width={500}\n' + '    	onLoad={() => this.load()}\n' + '    	onClick={area => this.clicked(area)}\n' + '    	onMouseEnter={area => this.enterArea(area)}\n' + '    	onMouseLeave={area => this.leaveArea(area)}\n' + '    	onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}\n' + '    	onImageClick={evt => this.clickedOutside(evt)}\n' + '    	onImageMouseMove={evt => this.moveOnImage(evt)}\n' + '    />\n' + '    {\n' + '    	this.state.hoveredArea &&\n' + '    	<span className="tooltip"\n' + '    	    style={{ ...this.getTipPosition(this.state.hoveredArea)}}>\n' + '    		{ this.state.hoveredArea && this.state.hoveredArea.name}\n' + '    	</span>\n' + '    }\n' + '</div>\n'
                        )
                    ),
                    React.createElement(
                        'pre',
                        null,
                        React.createElement(
                            'code',
                            { className: 'json' },
                            'URL = "https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg"\n' + 'MAP = {\n' + '  name: "my-map",\n' + '  areas: [\n' + '    { name: "1", shape: "poly", coords: [25,33,27,300,128,240,128,94], preFillColor: "green", fillColor: "blue"  },\n' + '    { name: "2", shape: "poly", coords: [219,118,220,210,283,210,284,119], preFillColor: "pink"  },\n' + '    { name: "3", shape: "poly", coords: [381,241,383,94,462,53,457,282], fillColor: "yellow"  },\n' + '    { name: "4", shape: "poly", coords: [245,285,290,285,274,239,249,238], preFillColor: "red"  },\n' + '    { name: "5", shape: "circle", coords: [170, 100, 25 ] },\n' + '  ]\n}'
                        )
                    ),
                    'Handler details :  ',
                    React.createElement(
                        'span',
                        { onClick: function () {
                                return _this.setState({ codeDetails: !_this.state.codeDetails });
                            } },
                        this.state.codeDetails ? '[-]' : '[+]'
                    ),
                    React.createElement(
                        'pre',
                        null,
                        React.createElement(
                            'code',
                            { className: 'js', style: { display: this.state.codeDetails ? 'block' : 'none' } },
                            'enterArea(area) {\n' + '    this.setState({ hoveredArea: area });\n' + '}\n\n' + 'leaveArea(area) {\n' + '    this.setState({ hoveredArea: null });\n' + '}\n\n' + 'getTipPosition(area) {\n' + '    return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };\n' + '}\n\n'
                        )
                    ),
                    'Styling details :  ',
                    React.createElement(
                        'span',
                        { onClick: function () {
                                return _this.setState({ stylindDetails: !_this.state.stylindDetails });
                            } },
                        this.state.stylindDetails ? '[-]' : '[+]'
                    ),
                    React.createElement(
                        'pre',
                        null,
                        React.createElement(
                            'code',
                            { className: 'css', style: { display: this.state.stylindDetails ? 'block' : 'none' } },
                            '.container {\n' + '    position: relative;\n' + '}\n\n' + '.tooltip {\n' + '    position: absolute;\n' + '    color: #fff;\n' + '    padding: 10px;\n' + '    background: rgba(0,0,0,0.8);\n' + '    transform: translate3d(-50%, -50%, 0);\n' + '    border-radius: 5px;\n' + '    pointer-events: none;\n' + '    z-index: 1000;\n' + '}\n'
                        )
                    )
                )
            );
        }
    });
    
    ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
    
    },{"../../src/ImageMapper":13,"react":undefined,"react-dom":undefined}],2:[function(require,module,exports){
    "use strict";
    
    /**
     * Copyright (c) 2013-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     * 
     */
    
    function makeEmptyFunction(arg) {
      return function () {
        return arg;
      };
    }
    
    /**
     * This function accepts and discards inputs; it has no side effects. This is
     * primarily useful idiomatically for overridable function endpoints which
     * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
     */
    var emptyFunction = function emptyFunction() {};
    
    emptyFunction.thatReturns = makeEmptyFunction;
    emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
    emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
    emptyFunction.thatReturnsNull = makeEmptyFunction(null);
    emptyFunction.thatReturnsThis = function () {
      return this;
    };
    emptyFunction.thatReturnsArgument = function (arg) {
      return arg;
    };
    
    module.exports = emptyFunction;
    },{}],3:[function(require,module,exports){
    (function (process){
    /**
     * Copyright (c) 2013-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     */
    
    'use strict';
    
    /**
     * Use invariant() to assert state which your program assumes to be true.
     *
     * Provide sprintf-style format (only %s is supported) and arguments
     * to provide information about what broke and what you were
     * expecting.
     *
     * The invariant message will be stripped in production, but the invariant
     * will remain to ensure logic does not differ in production.
     */
    
    var validateFormat = function validateFormat(format) {};
    
    if (process.env.NODE_ENV !== 'production') {
      validateFormat = function validateFormat(format) {
        if (format === undefined) {
          throw new Error('invariant requires an error message argument');
        }
      };
    }
    
    function invariant(condition, format, a, b, c, d, e, f) {
      validateFormat(format);
    
      if (!condition) {
        var error;
        if (format === undefined) {
          error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
        } else {
          var args = [a, b, c, d, e, f];
          var argIndex = 0;
          error = new Error(format.replace(/%s/g, function () {
            return args[argIndex++];
          }));
          error.name = 'Invariant Violation';
        }
    
        error.framesToPop = 1; // we don't care about invariant's own frame
        throw error;
      }
    }
    
    module.exports = invariant;
    }).call(this,require('_process'))
    
    },{"_process":6}],4:[function(require,module,exports){
    (function (process){
    /**
     * Copyright (c) 2014-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     */
    
    'use strict';
    
    var emptyFunction = require('./emptyFunction');
    
    /**
     * Similar to invariant but only logs a warning if the condition is not met.
     * This can be used to log issues in development environments in critical
     * paths. Removing the logging code for production environments will keep the
     * same logic and follow the same code paths.
     */
    
    var warning = emptyFunction;
    
    if (process.env.NODE_ENV !== 'production') {
      var printWarning = function printWarning(format) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
    
        var argIndex = 0;
        var message = 'Warning: ' + format.replace(/%s/g, function () {
          return args[argIndex++];
        });
        if (typeof console !== 'undefined') {
          console.error(message);
        }
        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          throw new Error(message);
        } catch (x) {}
      };
    
      warning = function warning(condition, format) {
        if (format === undefined) {
          throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
        }
    
        if (format.indexOf('Failed Composite propType: ') === 0) {
          return; // Ignore CompositeComponent proptype check.
        }
    
        if (!condition) {
          for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = arguments[_key2];
          }
    
          printWarning.apply(undefined, [format].concat(args));
        }
      };
    }
    
    module.exports = warning;
    }).call(this,require('_process'))
    
    },{"./emptyFunction":2,"_process":6}],5:[function(require,module,exports){
    /*
    object-assign
    (c) Sindre Sorhus
    @license MIT
    */
    
    'use strict';
    /* eslint-disable no-unused-vars */
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    
    function toObject(val) {
        if (val === null || val === undefined) {
            throw new TypeError('Object.assign cannot be called with null or undefined');
        }
    
        return Object(val);
    }
    
    function shouldUseNative() {
        try {
            if (!Object.assign) {
                return false;
            }
    
            // Detect buggy property enumeration order in older V8 versions.
    
            // https://bugs.chromium.org/p/v8/issues/detail?id=4118
            var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
            test1[5] = 'de';
            if (Object.getOwnPropertyNames(test1)[0] === '5') {
                return false;
            }
    
            // https://bugs.chromium.org/p/v8/issues/detail?id=3056
            var test2 = {};
            for (var i = 0; i < 10; i++) {
                test2['_' + String.fromCharCode(i)] = i;
            }
            var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
                return test2[n];
            });
            if (order2.join('') !== '0123456789') {
                return false;
            }
    
            // https://bugs.chromium.org/p/v8/issues/detail?id=3056
            var test3 = {};
            'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
                test3[letter] = letter;
            });
            if (Object.keys(Object.assign({}, test3)).join('') !==
                    'abcdefghijklmnopqrst') {
                return false;
            }
    
            return true;
        } catch (err) {
            // We don't expect any of the above to throw, but better to be safe.
            return false;
        }
    }
    
    module.exports = shouldUseNative() ? Object.assign : function (target, source) {
        var from;
        var to = toObject(target);
        var symbols;
    
        for (var s = 1; s < arguments.length; s++) {
            from = Object(arguments[s]);
    
            for (var key in from) {
                if (hasOwnProperty.call(from, key)) {
                    to[key] = from[key];
                }
            }
    
            if (getOwnPropertySymbols) {
                symbols = getOwnPropertySymbols(from);
                for (var i = 0; i < symbols.length; i++) {
                    if (propIsEnumerable.call(from, symbols[i])) {
                        to[symbols[i]] = from[symbols[i]];
                    }
                }
            }
        }
    
        return to;
    };
    
    },{}],6:[function(require,module,exports){
    // shim for using process in browser
    var process = module.exports = {};
    
    // cached from whatever global is present so that test runners that stub it
    // don't break things.  But we need to wrap it in a try catch in case it is
    // wrapped in strict mode code which doesn't define any globals.  It's inside a
    // function because try/catches deoptimize in certain engines.
    
    var cachedSetTimeout;
    var cachedClearTimeout;
    
    function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
    }
    function defaultClearTimeout () {
        throw new Error('clearTimeout has not been defined');
    }
    (function () {
        try {
            if (typeof setTimeout === 'function') {
                cachedSetTimeout = setTimeout;
            } else {
                cachedSetTimeout = defaultSetTimout;
            }
        } catch (e) {
            cachedSetTimeout = defaultSetTimout;
        }
        try {
            if (typeof clearTimeout === 'function') {
                cachedClearTimeout = clearTimeout;
            } else {
                cachedClearTimeout = defaultClearTimeout;
            }
        } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
        }
    } ())
    function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
            //normal enviroments in sane situations
            return setTimeout(fun, 0);
        }
        // if setTimeout wasn't available but was latter defined
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
        }
        try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedSetTimeout(fun, 0);
        } catch(e){
            try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                return cachedSetTimeout.call(null, fun, 0);
            } catch(e){
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                return cachedSetTimeout.call(this, fun, 0);
            }
        }
    
    
    }
    function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
            //normal enviroments in sane situations
            return clearTimeout(marker);
        }
        // if clearTimeout wasn't available but was latter defined
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
        }
        try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedClearTimeout(marker);
        } catch (e){
            try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                return cachedClearTimeout.call(null, marker);
            } catch (e){
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                return cachedClearTimeout.call(this, marker);
            }
        }
    
    
    
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;
    
    function cleanUpNextTick() {
        if (!draining || !currentQueue) {
            return;
        }
        draining = false;
        if (currentQueue.length) {
            queue = currentQueue.concat(queue);
        } else {
            queueIndex = -1;
        }
        if (queue.length) {
            drainQueue();
        }
    }
    
    function drainQueue() {
        if (draining) {
            return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;
    
        var len = queue.length;
        while(len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
                if (currentQueue) {
                    currentQueue[queueIndex].run();
                }
            }
            queueIndex = -1;
            len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
    }
    
    process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
                args[i - 1] = arguments[i];
            }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
            runTimeout(drainQueue);
        }
    };
    
    // v8 likes predictible objects
    function Item(fun, array) {
        this.fun = fun;
        this.array = array;
    }
    Item.prototype.run = function () {
        this.fun.apply(null, this.array);
    };
    process.title = 'browser';
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = ''; // empty string to avoid regexp issues
    process.versions = {};
    
    function noop() {}
    
    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.prependListener = noop;
    process.prependOnceListener = noop;
    
    process.listeners = function (name) { return [] }
    
    process.binding = function (name) {
        throw new Error('process.binding is not supported');
    };
    
    process.cwd = function () { return '/' };
    process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
    };
    process.umask = function() { return 0; };
    
    },{}],7:[function(require,module,exports){
    (function (process){
    /**
     * Copyright (c) 2013-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    
    'use strict';
    
    if (process.env.NODE_ENV !== 'production') {
      var invariant = require('fbjs/lib/invariant');
      var warning = require('fbjs/lib/warning');
      var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
      var loggedTypeFailures = {};
    }
    
    /**
     * Assert that the values match with the type specs.
     * Error messages are memorized and will only be shown once.
     *
     * @param {object} typeSpecs Map of name to a ReactPropType
     * @param {object} values Runtime values that need to be type-checked
     * @param {string} location e.g. "prop", "context", "child context"
     * @param {string} componentName Name of the component for error messages.
     * @param {?Function} getStack Returns the component stack.
     * @private
     */
    function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
      if (process.env.NODE_ENV !== 'production') {
        for (var typeSpecName in typeSpecs) {
          if (typeSpecs.hasOwnProperty(typeSpecName)) {
            var error;
            // Prop type validation may throw. In case they do, we don't want to
            // fail the render phase where it didn't fail before. So we log it.
            // After these have been cleaned up, we'll let them throw.
            try {
              // This is intentionally an invariant that gets caught. It's the same
              // behavior as without this statement except with a better message.
              invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
              error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
            } catch (ex) {
              error = ex;
            }
            warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
            if (error instanceof Error && !(error.message in loggedTypeFailures)) {
              // Only monitor this failure once because there tends to be a lot of the
              // same error.
              loggedTypeFailures[error.message] = true;
    
              var stack = getStack ? getStack() : '';
    
              warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
            }
          }
        }
      }
    }
    
    module.exports = checkPropTypes;
    
    }).call(this,require('_process'))
    
    },{"./lib/ReactPropTypesSecret":11,"_process":6,"fbjs/lib/invariant":3,"fbjs/lib/warning":4}],8:[function(require,module,exports){
    /**
     * Copyright (c) 2013-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    
    'use strict';
    
    var emptyFunction = require('fbjs/lib/emptyFunction');
    var invariant = require('fbjs/lib/invariant');
    var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
    
    module.exports = function() {
      function shim(props, propName, componentName, location, propFullName, secret) {
        if (secret === ReactPropTypesSecret) {
          // It is still safe when called from React.
          return;
        }
        invariant(
          false,
          'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
          'Use PropTypes.checkPropTypes() to call them. ' +
          'Read more at http://fb.me/use-check-prop-types'
        );
      };
      shim.isRequired = shim;
      function getShim() {
        return shim;
      };
      // Important!
      // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
      var ReactPropTypes = {
        array: shim,
        bool: shim,
        func: shim,
        number: shim,
        object: shim,
        string: shim,
        symbol: shim,
    
        any: shim,
        arrayOf: getShim,
        element: shim,
        instanceOf: getShim,
        node: shim,
        objectOf: getShim,
        oneOf: getShim,
        oneOfType: getShim,
        shape: getShim,
        exact: getShim
      };
    
      ReactPropTypes.checkPropTypes = emptyFunction;
      ReactPropTypes.PropTypes = ReactPropTypes;
    
      return ReactPropTypes;
    };
    
    },{"./lib/ReactPropTypesSecret":11,"fbjs/lib/emptyFunction":2,"fbjs/lib/invariant":3}],9:[function(require,module,exports){
    (function (process){
    /**
     * Copyright (c) 2013-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    
    'use strict';
    
    var emptyFunction = require('fbjs/lib/emptyFunction');
    var invariant = require('fbjs/lib/invariant');
    var warning = require('fbjs/lib/warning');
    var assign = require('object-assign');
    
    var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
    var checkPropTypes = require('./checkPropTypes');
    
    module.exports = function(isValidElement, throwOnDirectAccess) {
      /* global Symbol */
      var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.
    
      /**
       * Returns the iterator method function contained on the iterable object.
       *
       * Be sure to invoke the function with the iterable as context:
       *
       *     var iteratorFn = getIteratorFn(myIterable);
       *     if (iteratorFn) {
       *       var iterator = iteratorFn.call(myIterable);
       *       ...
       *     }
       *
       * @param {?object} maybeIterable
       * @return {?function}
       */
      function getIteratorFn(maybeIterable) {
        var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
        if (typeof iteratorFn === 'function') {
          return iteratorFn;
        }
      }
    
      /**
       * Collection of methods that allow declaration and validation of props that are
       * supplied to React components. Example usage:
       *
       *   var Props = require('ReactPropTypes');
       *   var MyArticle = React.createClass({
       *     propTypes: {
       *       // An optional string prop named "description".
       *       description: Props.string,
       *
       *       // A required enum prop named "category".
       *       category: Props.oneOf(['News','Photos']).isRequired,
       *
       *       // A prop named "dialog" that requires an instance of Dialog.
       *       dialog: Props.instanceOf(Dialog).isRequired
       *     },
       *     render: function() { ... }
       *   });
       *
       * A more formal specification of how these methods are used:
       *
       *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
       *   decl := ReactPropTypes.{type}(.isRequired)?
       *
       * Each and every declaration produces a function with the same signature. This
       * allows the creation of custom validation functions. For example:
       *
       *  var MyLink = React.createClass({
       *    propTypes: {
       *      // An optional string or URI prop named "href".
       *      href: function(props, propName, componentName) {
       *        var propValue = props[propName];
       *        if (propValue != null && typeof propValue !== 'string' &&
       *            !(propValue instanceof URI)) {
       *          return new Error(
       *            'Expected a string or an URI for ' + propName + ' in ' +
       *            componentName
       *          );
       *        }
       *      }
       *    },
       *    render: function() {...}
       *  });
       *
       * @internal
       */
    
      var ANONYMOUS = '<<anonymous>>';
    
      // Important!
      // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
      var ReactPropTypes = {
        array: createPrimitiveTypeChecker('array'),
        bool: createPrimitiveTypeChecker('boolean'),
        func: createPrimitiveTypeChecker('function'),
        number: createPrimitiveTypeChecker('number'),
        object: createPrimitiveTypeChecker('object'),
        string: createPrimitiveTypeChecker('string'),
        symbol: createPrimitiveTypeChecker('symbol'),
    
        any: createAnyTypeChecker(),
        arrayOf: createArrayOfTypeChecker,
        element: createElementTypeChecker(),
        instanceOf: createInstanceTypeChecker,
        node: createNodeChecker(),
        objectOf: createObjectOfTypeChecker,
        oneOf: createEnumTypeChecker,
        oneOfType: createUnionTypeChecker,
        shape: createShapeTypeChecker,
        exact: createStrictShapeTypeChecker,
      };
    
      /**
       * inlined Object.is polyfill to avoid requiring consumers ship their own
       * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
       */
      /*eslint-disable no-self-compare*/
      function is(x, y) {
        // SameValue algorithm
        if (x === y) {
          // Steps 1-5, 7-10
          // Steps 6.b-6.e: +0 != -0
          return x !== 0 || 1 / x === 1 / y;
        } else {
          // Step 6.a: NaN == NaN
          return x !== x && y !== y;
        }
      }
      /*eslint-enable no-self-compare*/
    
      /**
       * We use an Error-like object for backward compatibility as people may call
       * PropTypes directly and inspect their output. However, we don't use real
       * Errors anymore. We don't inspect their stack anyway, and creating them
       * is prohibitively expensive if they are created too often, such as what
       * happens in oneOfType() for any type before the one that matched.
       */
      function PropTypeError(message) {
        this.message = message;
        this.stack = '';
      }
      // Make `instanceof Error` still work for returned errors.
      PropTypeError.prototype = Error.prototype;
    
      function createChainableTypeChecker(validate) {
        if (process.env.NODE_ENV !== 'production') {
          var manualPropTypeCallCache = {};
          var manualPropTypeWarningCount = 0;
        }
        function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
          componentName = componentName || ANONYMOUS;
          propFullName = propFullName || propName;
    
          if (secret !== ReactPropTypesSecret) {
            if (throwOnDirectAccess) {
              // New behavior only for users of `prop-types` package
              invariant(
                false,
                'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
                'Use `PropTypes.checkPropTypes()` to call them. ' +
                'Read more at http://fb.me/use-check-prop-types'
              );
            } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
              // Old behavior for people using React.PropTypes
              var cacheKey = componentName + ':' + propName;
              if (
                !manualPropTypeCallCache[cacheKey] &&
                // Avoid spamming the console because they are often not actionable except for lib authors
                manualPropTypeWarningCount < 3
              ) {
                warning(
                  false,
                  'You are manually calling a React.PropTypes validation ' +
                  'function for the `%s` prop on `%s`. This is deprecated ' +
                  'and will throw in the standalone `prop-types` package. ' +
                  'You may be seeing this warning due to a third-party PropTypes ' +
                  'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
                  propFullName,
                  componentName
                );
                manualPropTypeCallCache[cacheKey] = true;
                manualPropTypeWarningCount++;
              }
            }
          }
          if (props[propName] == null) {
            if (isRequired) {
              if (props[propName] === null) {
                return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
              }
              return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
            }
            return null;
          } else {
            return validate(props, propName, componentName, location, propFullName);
          }
        }
    
        var chainedCheckType = checkType.bind(null, false);
        chainedCheckType.isRequired = checkType.bind(null, true);
    
        return chainedCheckType;
      }
    
      function createPrimitiveTypeChecker(expectedType) {
        function validate(props, propName, componentName, location, propFullName, secret) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== expectedType) {
            // `propValue` being instance of, say, date/regexp, pass the 'object'
            // check, but we can offer a more precise error message here rather than
            // 'of type `object`'.
            var preciseType = getPreciseType(propValue);
    
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
    
      function createAnyTypeChecker() {
        return createChainableTypeChecker(emptyFunction.thatReturnsNull);
      }
    
      function createArrayOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== 'function') {
            return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
          }
          var propValue = props[propName];
          if (!Array.isArray(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
          }
          for (var i = 0; i < propValue.length; i++) {
            var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
            if (error instanceof Error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
    
      function createElementTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!isValidElement(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
    
      function createInstanceTypeChecker(expectedClass) {
        function validate(props, propName, componentName, location, propFullName) {
          if (!(props[propName] instanceof expectedClass)) {
            var expectedClassName = expectedClass.name || ANONYMOUS;
            var actualClassName = getClassName(props[propName]);
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
    
      function createEnumTypeChecker(expectedValues) {
        if (!Array.isArray(expectedValues)) {
          process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
          return emptyFunction.thatReturnsNull;
        }
    
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          for (var i = 0; i < expectedValues.length; i++) {
            if (is(propValue, expectedValues[i])) {
              return null;
            }
          }
    
          var valuesString = JSON.stringify(expectedValues);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
        }
        return createChainableTypeChecker(validate);
      }
    
      function createObjectOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== 'function') {
            return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
          }
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== 'object') {
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
          }
          for (var key in propValue) {
            if (propValue.hasOwnProperty(key)) {
              var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
              if (error instanceof Error) {
                return error;
              }
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
    
      function createUnionTypeChecker(arrayOfTypeCheckers) {
        if (!Array.isArray(arrayOfTypeCheckers)) {
          process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
          return emptyFunction.thatReturnsNull;
        }
    
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (typeof checker !== 'function') {
            warning(
              false,
              'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
              'received %s at index %s.',
              getPostfixForTypeWarning(checker),
              i
            );
            return emptyFunction.thatReturnsNull;
          }
        }
    
        function validate(props, propName, componentName, location, propFullName) {
          for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
            var checker = arrayOfTypeCheckers[i];
            if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
              return null;
            }
          }
    
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
        }
        return createChainableTypeChecker(validate);
      }
    
      function createNodeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          if (!isNode(props[propName])) {
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
    
      function createShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== 'object') {
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
          }
          for (var key in shapeTypes) {
            var checker = shapeTypes[key];
            if (!checker) {
              continue;
            }
            var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
    
      function createStrictShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== 'object') {
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
          }
          // We need to check all keys in case some are required but missing from
          // props.
          var allKeys = assign({}, props[propName], shapeTypes);
          for (var key in allKeys) {
            var checker = shapeTypes[key];
            if (!checker) {
              return new PropTypeError(
                'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
                '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
                '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
              );
            }
            var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
    
        return createChainableTypeChecker(validate);
      }
    
      function isNode(propValue) {
        switch (typeof propValue) {
          case 'number':
          case 'string':
          case 'undefined':
            return true;
          case 'boolean':
            return !propValue;
          case 'object':
            if (Array.isArray(propValue)) {
              return propValue.every(isNode);
            }
            if (propValue === null || isValidElement(propValue)) {
              return true;
            }
    
            var iteratorFn = getIteratorFn(propValue);
            if (iteratorFn) {
              var iterator = iteratorFn.call(propValue);
              var step;
              if (iteratorFn !== propValue.entries) {
                while (!(step = iterator.next()).done) {
                  if (!isNode(step.value)) {
                    return false;
                  }
                }
              } else {
                // Iterator will provide entry [k,v] tuples rather than values.
                while (!(step = iterator.next()).done) {
                  var entry = step.value;
                  if (entry) {
                    if (!isNode(entry[1])) {
                      return false;
                    }
                  }
                }
              }
            } else {
              return false;
            }
    
            return true;
          default:
            return false;
        }
      }
    
      function isSymbol(propType, propValue) {
        // Native Symbol.
        if (propType === 'symbol') {
          return true;
        }
    
        // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
        if (propValue['@@toStringTag'] === 'Symbol') {
          return true;
        }
    
        // Fallback for non-spec compliant Symbols which are polyfilled.
        if (typeof Symbol === 'function' && propValue instanceof Symbol) {
          return true;
        }
    
        return false;
      }
    
      // Equivalent of `typeof` but with special handling for array and regexp.
      function getPropType(propValue) {
        var propType = typeof propValue;
        if (Array.isArray(propValue)) {
          return 'array';
        }
        if (propValue instanceof RegExp) {
          // Old webkits (at least until Android 4.0) return 'function' rather than
          // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
          // passes PropTypes.object.
          return 'object';
        }
        if (isSymbol(propType, propValue)) {
          return 'symbol';
        }
        return propType;
      }
    
      // This handles more types than `getPropType`. Only used for error messages.
      // See `createPrimitiveTypeChecker`.
      function getPreciseType(propValue) {
        if (typeof propValue === 'undefined' || propValue === null) {
          return '' + propValue;
        }
        var propType = getPropType(propValue);
        if (propType === 'object') {
          if (propValue instanceof Date) {
            return 'date';
          } else if (propValue instanceof RegExp) {
            return 'regexp';
          }
        }
        return propType;
      }
    
      // Returns a string that is postfixed to a warning about an invalid type.
      // For example, "undefined" or "of type array"
      function getPostfixForTypeWarning(value) {
        var type = getPreciseType(value);
        switch (type) {
          case 'array':
          case 'object':
            return 'an ' + type;
          case 'boolean':
          case 'date':
          case 'regexp':
            return 'a ' + type;
          default:
            return type;
        }
      }
    
      // Returns class name of the object, if any.
      function getClassName(propValue) {
        if (!propValue.constructor || !propValue.constructor.name) {
          return ANONYMOUS;
        }
        return propValue.constructor.name;
      }
    
      ReactPropTypes.checkPropTypes = checkPropTypes;
      ReactPropTypes.PropTypes = ReactPropTypes;
    
      return ReactPropTypes;
    };
    
    }).call(this,require('_process'))
    
    },{"./checkPropTypes":7,"./lib/ReactPropTypesSecret":11,"_process":6,"fbjs/lib/emptyFunction":2,"fbjs/lib/invariant":3,"fbjs/lib/warning":4,"object-assign":5}],10:[function(require,module,exports){
    (function (process){
    /**
     * Copyright (c) 2013-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    
    if (process.env.NODE_ENV !== 'production') {
      var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
        Symbol.for &&
        Symbol.for('react.element')) ||
        0xeac7;
    
      var isValidElement = function(object) {
        return typeof object === 'object' &&
          object !== null &&
          object.$$typeof === REACT_ELEMENT_TYPE;
      };
    
      // By explicitly using `prop-types` you are opting into new development behavior.
      // http://fb.me/prop-types-in-prod
      var throwOnDirectAccess = true;
      module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
    } else {
      // By explicitly using `prop-types` you are opting into new production behavior.
      // http://fb.me/prop-types-in-prod
      module.exports = require('./factoryWithThrowingShims')();
    }
    
    }).call(this,require('_process'))
    
    },{"./factoryWithThrowingShims":8,"./factoryWithTypeCheckers":9,"_process":6}],11:[function(require,module,exports){
    /**
     * Copyright (c) 2013-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    
    'use strict';
    
    var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
    
    module.exports = ReactPropTypesSecret;
    
    },{}],12:[function(require,module,exports){
    'use strict';
    
    var isArray = Array.isArray;
    var keyList = Object.keys;
    var hasProp = Object.prototype.hasOwnProperty;
    var hasElementType = typeof Element !== 'undefined';
    
    function equal(a, b) {
      // fast-deep-equal index.js 2.0.1
      if (a === b) return true;
    
      if (a && b && typeof a == 'object' && typeof b == 'object') {
        var arrA = isArray(a)
          , arrB = isArray(b)
          , i
          , length
          , key;
    
        if (arrA && arrB) {
          length = a.length;
          if (length != b.length) return false;
          for (i = length; i-- !== 0;)
            if (!equal(a[i], b[i])) return false;
          return true;
        }
    
        if (arrA != arrB) return false;
    
        var dateA = a instanceof Date
          , dateB = b instanceof Date;
        if (dateA != dateB) return false;
        if (dateA && dateB) return a.getTime() == b.getTime();
    
        var regexpA = a instanceof RegExp
          , regexpB = b instanceof RegExp;
        if (regexpA != regexpB) return false;
        if (regexpA && regexpB) return a.toString() == b.toString();
    
        var keys = keyList(a);
        length = keys.length;
    
        if (length !== keyList(b).length)
          return false;
    
        for (i = length; i-- !== 0;)
          if (!hasProp.call(b, keys[i])) return false;
        // end fast-deep-equal
    
        // start react-fast-compare
        // custom handling for DOM elements
        if (hasElementType && a instanceof Element && b instanceof Element)
          return a === b;
    
        // custom handling for React
        for (i = length; i-- !== 0;) {
          key = keys[i];
          if (key === '_owner' && a.$$typeof) {
            // React-specific: avoid traversing React elements' _owner.
            //  _owner contains circular references
            // and is not needed when comparing the actual elements (and not their owners)
            // .$$typeof and ._store on just reasonable markers of a react element
            continue;
          } else {
            // all other properties should be traversed as usual
            if (!equal(a[key], b[key])) return false;
          }
        }
        // end react-fast-compare
    
        // fast-deep-equal index.js 2.0.1
        return true;
      }
    
      return a !== a && b !== b;
    }
    // end fast-deep-equal
    
    module.exports = function exportedEqual(a, b) {
      try {
        return equal(a, b);
      } catch (error) {
        if ((error.message && error.message.match(/stack|recursion/i)) || (error.number === -2146828260)) {
          // warn on circular references, don't crash
          // browsers give this different errors name and messages:
          // chrome/safari: "RangeError", "Maximum call stack size exceeded"
          // firefox: "InternalError", too much recursion"
          // edge: "Error", "Out of stack space"
          console.warn('Warning: react-fast-compare does not handle circular references.', error.name, error.message);
          return false;
        }
        // some other error. we should definitely know about these
        throw error;
      }
    };
    
    },{}],13:[function(require,module,exports){
    'use strict';
    
    Object.defineProperty(exports, '__esModule', {
        value: true
    });
    
    var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();
    
    var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
    
    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
    
    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
    
    function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }
    
    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
    
    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
    
    var _react = require('react');
    
    var _react2 = _interopRequireDefault(_react);
    
    var _propTypes = require('prop-types');
    
    var _propTypes2 = _interopRequireDefault(_propTypes);
    
    var _reactFastCompare = require("react-fast-compare");
    
    var _reactFastCompare2 = _interopRequireDefault(_reactFastCompare);
    
    var ImageMapper = (function (_Component) {
        _inherits(ImageMapper, _Component);
    
        function ImageMapper(props) {
            var _this = this;
    
            _classCallCheck(this, ImageMapper);
    
            _get(Object.getPrototypeOf(ImageMapper.prototype), 'constructor', this).call(this, props);
            ['drawrect', 'drawcircle', 'drawpoly', 'initCanvas', 'renderPrefilledAreas'].forEach(function (f) {
                return _this[f] = _this[f].bind(_this);
            });
            var absPos = { position: 'absolute', top: 0, left: 0 };
            this.styles = {
                container: { position: 'relative' },
                canvas: _extends({}, absPos, { pointerEvents: 'none', zIndex: 2 }),
                img: _extends({}, absPos, { zIndex: 1, userSelect: 'none' }),
                map: props.onClick && { cursor: 'pointer' } || undefined
            };
            // Props watched for changes to trigger update
            this.watchedProps = ['active', 'fillColor', 'height', 'imgWidth', 'lineWidth', 'src', 'strokeColor', 'width'];
        }
    
        _createClass(ImageMapper, [{
            key: 'shouldComponentUpdate',
            value: function shouldComponentUpdate(nextProps) {
                var _this2 = this;
    
                var propChanged = this.watchedProps.some(function (prop) {
                    return _this2.props[prop] !== nextProps[prop];
                });
                return !(0, _reactFastCompare2['default'])(this.props.map, this.state.map) || propChanged;
            }
        }, {
            key: 'componentWillMount',
            value: function componentWillMount() {
                this.updateCacheMap();
            }
        }, {
            key: 'updateCacheMap',
            value: function updateCacheMap() {
                this.setState({ map: JSON.parse(JSON.stringify(this.props.map)) }, this.initCanvas);
            }
        }, {
            key: 'componentDidUpdate',
            value: function componentDidUpdate() {
                this.updateCacheMap();
                this.initCanvas();
            }
        }, {
            key: 'drawrect',
            value: function drawrect(coords, fillColor) {
                var _coords = _slicedToArray(coords, 4);
    
                var left = _coords[0];
                var top = _coords[1];
                var right = _coords[2];
                var bot = _coords[3];
    
                this.ctx.fillStyle = fillColor;
                this.ctx.strokeRect(left, top, right - left, bot - top);
                this.ctx.fillRect(left, top, right - left, bot - top);
                this.ctx.fillStyle = this.props.fillColor;
            }
        }, {
            key: 'drawcircle',
            value: function drawcircle(coords, fillColor) {
                this.ctx.fillStyle = fillColor;
                this.ctx.beginPath();
                this.ctx.arc(coords[0], coords[1], coords[2], 0, 2 * Math.PI);
                this.ctx.closePath();
                this.ctx.stroke();
                this.ctx.fill();
                this.ctx.fillStyle = this.props.fillColor;
            }
        }, {
            key: 'drawpoly',
            value: function drawpoly(coords, fillColor) {
                var _this3 = this;
    
                coords = coords.reduce(function (a, v, i, s) {
                    return i % 2 ? a : [].concat(_toConsumableArray(a), [s.slice(i, i + 2)]);
                }, []);
                this.ctx.fillStyle = fillColor;
                this.ctx.beginPath();
                var first = coords.unshift();
                this.ctx.moveTo(first[0], first[1]);
                coords.forEach(function (c) {
                    return _this3.ctx.lineTo(c[0], c[1]);
                });
                this.ctx.closePath();
                this.ctx.stroke();
                this.ctx.fill();
                this.ctx.fillStyle = this.props.fillColor;
            }
        }, {
            key: 'initCanvas',
            value: function initCanvas() {
                if (this.props.width) this.img.width = this.props.width;
    
                if (this.props.height) this.img.height = this.props.height;
    
                this.canvas.width = this.props.width || this.img.clientWidth;
                this.canvas.height = this.props.height || this.img.clientHeight;
                this.container.style.width = (this.props.width || this.img.clientWidth) + 'px';
                this.container.style.height = (this.props.height || this.img.clientHeight) + 'px';
                this.ctx = this.canvas.getContext('2d');
                this.ctx.fillStyle = this.props.fillColor;
                this.ctx.strokeStyle = this.props.strokeColor;
                this.ctx.lineWidth = this.props.lineWidth;
    
                if (this.props.onLoad) this.props.onLoad();
    
                this.renderPrefilledAreas();
            }
        }, {
            key: 'hoverOn',
            value: function hoverOn(area, index, event) {
                var shape = event.target.getAttribute('shape');
    
                if (this.props.active && this['draw' + shape]) this['draw' + shape](event.target.getAttribute('coords').split(','), area.fillColor);
    
                if (this.props.onMouseEnter) this.props.onMouseEnter(area, index, event);
            }
        }, {
            key: 'hoverOff',
            value: function hoverOff(area, index, event) {
                if (this.props.active) {
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    this.renderPrefilledAreas();
                }
    
                if (this.props.onMouseLeave) this.props.onMouseLeave(area, index, event);
            }
        }, {
            key: 'click',
            value: function click(area, index, event) {
                if (this.props.onClick) {
                    event.preventDefault();
                    this.props.onClick(area, index, event);
                }
            }
        }, {
            key: 'imageClick',
            value: function imageClick(event) {
                if (this.props.onImageClick) {
                    event.preventDefault();
                    this.props.onImageClick(event);
                }
            }
        }, {
            key: 'mouseMove',
            value: function mouseMove(area, index, event) {
                if (this.props.onMouseMove) {
                    this.props.onMouseMove(area, index, event);
                }
            }
        }, {
            key: 'imageMouseMove',
            value: function imageMouseMove(area, index, event) {
                if (this.props.onImageMouseMove) {
                    this.props.onImageMouseMove(area, index, event);
                }
            }
        }, {
            key: 'scaleCoords',
            value: function scaleCoords(coords) {
                var _props = this.props;
                var imgWidth = _props.imgWidth;
                var width = _props.width;
    
                // calculate scale based on current 'width' and the original 'imgWidth'
                var scale = width && imgWidth && imgWidth > 0 ? width / imgWidth : 1;
                return coords.map(function (coord) {
                    return coord * scale;
                });
            }
        }, {
            key: 'renderPrefilledAreas',
            value: function renderPrefilledAreas() {
                var _this4 = this;
    
                this.state.map.areas.map(function (area) {
                    if (!area.preFillColor) return;
                    _this4['draw' + area.shape](_this4.scaleCoords(area.coords), area.preFillColor);
                });
            }
        }, {
            key: 'computeCenter',
            value: function computeCenter(area) {
                if (!area) return [0, 0];
    
                var scaledCoords = this.scaleCoords(area.coords);
    
                switch (area.shape) {
                    case "circle":
                        return [scaledCoords[0], scaledCoords[1]];
                    case "poly":
                    case "rect":
                    default:
                        {
                            var _ret = (function () {
                                // Calculate centroid
                                var n = scaledCoords.length / 2;
    
                                var _scaledCoords$reduce = scaledCoords.reduce(function (_ref, val, idx) {
                                    var y = _ref.y;
                                    var x = _ref.x;
    
                                    return !(idx % 2) ? { y: y, x: x + val / n } : { y: y + val / n, x: x };
                                }, { y: 0, x: 0 });
    
                                var y = _scaledCoords$reduce.y;
                                var x = _scaledCoords$reduce.x;
    
                                return {
                                    v: [x, y]
                                };
                            })();
    
                            if (typeof _ret === 'object') return _ret.v;
                        }
                }
            }
        }, {
            key: 'renderAreas',
            value: function renderAreas() {
                var _this5 = this;
    
                return this.state.map.areas.map(function (area, index) {
                    var scaledCoords = _this5.scaleCoords(area.coords);
                    var center = _this5.computeCenter(area);
                    var extendedArea = _extends({}, area, { scaledCoords: scaledCoords, center: center });
                    return _react2['default'].createElement('area', { key: area._id || index, shape: area.shape, coords: scaledCoords.join(','),
                        onMouseEnter: _this5.hoverOn.bind(_this5, extendedArea, index),
                        onMouseLeave: _this5.hoverOff.bind(_this5, extendedArea, index),
                        onMouseMove: _this5.mouseMove.bind(_this5, extendedArea, index),
                        onClick: _this5.click.bind(_this5, extendedArea, index), href: area.href });
                });
            }
        }, {
            key: 'render',
            value: function render() {
                var _this6 = this;
    
                return _react2['default'].createElement(
                    'div',
                    { style: this.styles.container, ref: function (node) {
                            return _this6.container = node;
                        } },
                    _react2['default'].createElement('img', { style: this.styles.img, src: this.props.src, useMap: '#' + this.state.map.name, alt: '',
                        ref: function (node) {
                            return _this6.img = node;
                        }, onLoad: this.initCanvas,
                        onClick: this.imageClick.bind(this),
                        onMouseMove: this.imageMouseMove.bind(this) }),
                    _react2['default'].createElement('canvas', { ref: function (node) {
                            return _this6.canvas = node;
                        }, style: this.styles.canvas }),
                    _react2['default'].createElement(
                        'map',
                        { name: this.state.map.name, style: this.styles.map },
                        this.renderAreas()
                    )
                );
            }
        }]);
    
        return ImageMapper;
    })(_react.Component);
    
    exports['default'] = ImageMapper;
    
    ImageMapper.defaultProps = {
        active: true,
        fillColor: 'rgba(255, 255, 255, 0.5)',
        lineWidth: 1,
        map: {
            areas: [],
            name: 'image-map-' + Math.random()
        },
        strokeColor: 'rgba(0, 0, 0, 0.5)'
    };
    
    ImageMapper.propTypes = {
        active: _propTypes2['default'].bool,
        fillColor: _propTypes2['default'].string,
        height: _propTypes2['default'].number,
        imgWidth: _propTypes2['default'].number,
        lineWidth: _propTypes2['default'].number,
        src: _propTypes2['default'].string.isRequired,
        strokeColor: _propTypes2['default'].string,
        width: _propTypes2['default'].number,
    
        onClick: _propTypes2['default'].func,
        onMouseMove: _propTypes2['default'].func,
        onImageClick: _propTypes2['default'].func,
        onImageMouseMove: _propTypes2['default'].func,
        onLoad: _propTypes2['default'].func,
        onMouseEnter: _propTypes2['default'].func,
        onMouseLeave: _propTypes2['default'].func,
    
        map: _propTypes2['default'].shape({
            areas: _propTypes2['default'].arrayOf(_propTypes2['default'].shape({
                area: _propTypes2['default'].shape({
                    coords: _propTypes2['default'].arrayOf(_propTypes2['default'].number),
                    href: _propTypes2['default'].string,
                    shape: _propTypes2['default'].string,
                    preFillColor: _propTypes2['default'].string,
                    fillColor: _propTypes2['default'].string
                })
            })),
            name: _propTypes2['default'].string
        })
    };
    module.exports = exports['default'];
    
    },{"prop-types":10,"react":undefined,"react-fast-compare":12}]},{},[1])
    //# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdmljaGkvRG9jdW1lbnRzL0dpdEh1Yi9yZWFjdC1pbWFnZS1tYXBwZXIvZXhhbXBsZS9zcmMvZXhhbXBsZS5qcyIsIm5vZGVfbW9kdWxlcy9mYmpzL2xpYi9lbXB0eUZ1bmN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2ZianMvbGliL2ludmFyaWFudC5qcyIsIm5vZGVfbW9kdWxlcy9mYmpzL2xpYi93YXJuaW5nLmpzIiwibm9kZV9tb2R1bGVzL29iamVjdC1hc3NpZ24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvY2hlY2tQcm9wVHlwZXMuanMiLCJub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMuanMiLCJub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFR5cGVDaGVja2Vycy5qcyIsIm5vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWZhc3QtY29tcGFyZS9pbmRleC5qcyIsIi9Vc2Vycy92aWNoaS9Eb2N1bWVudHMvR2l0SHViL3JlYWN0LWltYWdlLW1hcHBlci9zcmMvSW1hZ2VNYXBwZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFcEMsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7O0FBRW5ELElBQUksR0FBRyxHQUFHO0FBQ1QsS0FBSSxFQUFFLFFBQVE7QUFDZCxNQUFLLEVBQUUsQ0FDTixFQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFDLEVBQzNHLEVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFDLEVBQzNGLEVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFDLEVBQ3hGLEVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFDLEVBQzFGLEVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFFLEVBQUMsQ0FDckQ7Q0FDRCxDQUFDOztBQUVGLElBQUksR0FBRyxHQUFHLGdFQUFnRSxDQUFDOztBQUUzRSxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFD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Q25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN4TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDOWhCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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LENBQUM7QUFDckIsVUFBTSxFQUFFLHVCQUFVLE9BQU8sQ0FBQyx1QkFBVSxNQUFNLENBQUM7QUFDM0MsUUFBSSxFQUFFLHVCQUFVLE1BQU07QUFDdEIsU0FBSyxFQUFFLHVCQUFVLE1BQU07QUFDdkIsZ0JBQVksRUFBRSx1QkFBVSxNQUFNO0FBQzlCLGFBQVMsRUFBRSx1QkFBVSxNQUFNO0lBQzNCLENBQUM7R0FDRixDQUFDLENBQUM7QUFDSCxNQUFJLEVBQUUsdUJBQVUsTUFBTTtFQUN0QixDQUFDO0NBQ0YsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG4vLyB2YXIgSW1hZ2VNYXBwZXIgPSByZXF1aXJlKCdyZWFjdC1pbWFnZS1tYXBwZXInKTsgXG52YXIgSW1hZ2VNYXBwZXIgPSByZXF1aXJlKCcuLi8uLi9zcmMvSW1hZ2VNYXBwZXInKTsgXG5cbnZhciBNQVAgPSB7XG5cdG5hbWU6ICdteS1tYXAnLFxuXHRhcmVhczogW1xuXHRcdHtuYW1lOiAnMScsIHNoYXBlOiAncG9seScsIGNvb3JkczogWzI1LDMzLDI3LDMwMCwxMjgsMjQwLDEyOCw5NF0sIHByZUZpbGxDb2xvcjogJ2dyZWVuJywgZmlsbENvbG9yOiAnYmx1ZSd9LFxuXHRcdHtuYW1lOiAnMicsIHNoYXBlOiAncG9seScsIGNvb3JkczogWzIxOSwxMTgsMjIwLDIxMCwyODMsMjEwLDI4NCwxMTldLCBwcmVGaWxsQ29sb3I6ICdwaW5rJ30sXG5cdFx0e25hbWU6ICczJywgc2hhcGU6ICdwb2x5JywgY29vcmRzOiBbMzgxLDI0MSwzODMsOTQsNDYyLDUzLDQ1NywyODJdLCBmaWxsQ29sb3I6ICd5ZWxsb3cnfSxcblx0XHR7bmFtZTogJzQnLCBzaGFwZTogJ3BvbHknLCBjb29yZHM6IFsyNDUsMjg1LDI5MCwyODUsMjc0LDIzOSwyNDksMjM4XSwgcHJlRmlsbENvbG9yOiAncmVkJ30sXG5cdFx0e25hbWU6ICc1Jywgc2hhcGU6ICdjaXJjbGUnLCBjb29yZHM6IFsxNzAsIDEwMCwgMjUgXX0sXG5cdF1cbn07XG5cbnZhciBVUkwgPSAnaHR0cHM6Ly9jMS5zdGF0aWNmbGlja3IuY29tLzUvNDA1Mi80NTAzODk4MzkzXzMwM2NmYmM5ZmRfYi5qcGcnO1xuXG52YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRnZXRJbml0aWFsU3RhdGUoKSB7XG5cdFx0cmV0dXJuIHsgaG92ZXJlZEFyZWE6IG51bGwsIG1zZzogbnVsbCwgbW92ZU1zZzogbnVsbCB9O1xuXHR9LFxuXHRsb2FkKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoeyBtc2c6ICdJbnRlcmFjdCB3aXRoIGltYWdlICEnIH0pO1xuXHR9LFxuXHRjbGlja2VkKGFyZWEpIHtcblx0XHR0aGlzLnNldFN0YXRlKHsgbXNnOiBgWW91IGNsaWNrZWQgb24gJHthcmVhLnNoYXBlfSBhdCBjb29yZHMgJHtKU09OLnN0cmluZ2lmeShhcmVhLmNvb3Jkcyl9ICFgfSk7XG5cdFx0Y29uc29sZS5sb2coJyR7YXJlYS5zaGFwZX0nKTtcblx0fSxcblx0Y2xpY2tlZE91dHNpZGUoZXZ0KSB7XG5cdFx0Y29uc3QgY29vcmRzID0ge3g6IGV2dC5uYXRpdmVFdmVudC5sYXllclgsIHk6IGV2dC5uYXRpdmVFdmVudC5sYXllclkgfTtcblx0XHR0aGlzLnNldFN0YXRlKHsgbXNnOiBgWW91IGNsaWNrZWQgb24gdGhlIGltYWdlIGF0IGNvb3JkcyAke0pTT04uc3RyaW5naWZ5KGNvb3Jkcyl9ICFgIH0pO1xuXHR9LFxuXHRtb3ZlT25JbWFnZShldnQpIHtcblx0XHRjb25zdCBjb29yZHMgPSB7eDogZXZ0Lm5hdGl2ZUV2ZW50LmxheWVyWCwgeTogZXZ0Lm5hdGl2ZUV2ZW50LmxheWVyWSB9O1xuXHRcdHRoaXMuc2V0U3RhdGUoeyBtb3ZlTXNnOiBgWW91IG1vdmVkIG9uIHRoZSBpbWFnZSBhdCBjb29yZHMgJHtKU09OLnN0cmluZ2lmeShjb29yZHMpfSAhYCB9KTtcblx0fSxcblx0ZW50ZXJBcmVhKGFyZWEpIHtcblx0XHR0aGlzLnNldFN0YXRlKHsgaG92ZXJlZEFyZWE6IGFyZWEsIG1zZzogYFlvdSBlbnRlcmVkICR7YXJlYS5zaGFwZX0gJHthcmVhLm5hbWV9IGF0IGNvb3JkcyAke0pTT04uc3RyaW5naWZ5KGFyZWEuY29vcmRzKX0gIWAgfSk7XG5cdH0sXG5cdGxlYXZlQXJlYShhcmVhKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IGhvdmVyZWRBcmVhOiBudWxsLCBtc2c6IGBZb3UgbGVhdmVkICR7YXJlYS5zaGFwZX0gJHthcmVhLm5hbWV9IGF0IGNvb3JkcyAke0pTT04uc3RyaW5naWZ5KGFyZWEuY29vcmRzKX0gIWAgfSk7XG5cdH0sXG5cdG1vdmVPbkFyZWEoYXJlYSwgZXZ0KSB7XG5cdFx0Y29uc3QgY29vcmRzID0ge3g6IGV2dC5uYXRpdmVFdmVudC5sYXllclgsIHk6IGV2dC5uYXRpdmVFdmVudC5sYXllclkgfTtcblx0XHR0aGlzLnNldFN0YXRlKHsgbW92ZU1zZzogYFlvdSBtb3ZlZCBvbiAke2FyZWEuc2hhcGV9ICR7YXJlYS5uYW1lfSBhdCBjb29yZHMgJHtKU09OLnN0cmluZ2lmeShjb29yZHMpfSAhYCB9KTtcblx0fSxcblxuXHRnZXRUaXBQb3NpdGlvbihhcmVhKSB7XG5cdFx0cmV0dXJuIHsgdG9wOiBgJHthcmVhLmNlbnRlclsxXX1weGAsIGxlZnQ6IGAke2FyZWEuY2VudGVyWzBdfXB4YCB9O1xuXHR9LFxuXG5cdHJlbmRlciAoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9J2dyaWQnPlxuXHRcdFx0PHNjcmlwdCBzcmM9XCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9iYWJlbC1jb3JlLzUuOC4yNC9icm93c2VyLm1pbi5qc1wiPjwvc2NyaXB0PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInByZXNlbnRlclwiPlxuXHRcdFx0XHRcdDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdyZWxhdGl2ZScgfX0+XG5cdFx0XHRcdFx0XHQ8SW1hZ2VNYXBwZXIgc3JjPXtVUkx9IG1hcD17TUFQfSB3aWR0aD17NTAwfVxuXHRcdFx0XHRcdFx0XHRvbkxvYWQ9eygpID0+IHRoaXMubG9hZCgpfVxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXthcmVhID0+IHRoaXMuY2xpY2tlZChhcmVhKX1cblx0XHRcdFx0XHRcdFx0b25Nb3VzZUVudGVyPXthcmVhID0+IHRoaXMuZW50ZXJBcmVhKGFyZWEpfVxuXHRcdFx0XHRcdFx0XHRvbk1vdXNlTGVhdmU9e2FyZWEgPT4gdGhpcy5sZWF2ZUFyZWEoYXJlYSl9XG5cdFx0XHRcdFx0XHRcdG9uTW91c2VNb3ZlPXsoYXJlYSwgXywgZXZ0KSA9PiB0aGlzLm1vdmVPbkFyZWEoYXJlYSwgZXZ0KX1cblx0XHRcdFx0XHRcdFx0b25JbWFnZUNsaWNrPXtldnQgPT4gdGhpcy5jbGlja2VkT3V0c2lkZShldnQpfVxuXHRcdFx0XHRcdFx0XHRvbkltYWdlTW91c2VNb3ZlPXtldnQgPT4gdGhpcy5tb3ZlT25JbWFnZShldnQpfVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhpcy5zdGF0ZS5ob3ZlcmVkQXJlYSAmJlxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJ0b29sdGlwXCIgc3R5bGU9e3sgLi4udGhpcy5nZXRUaXBQb3NpdGlvbih0aGlzLnN0YXRlLmhvdmVyZWRBcmVhKX19PlxuXHRcdFx0XHRcdFx0XHRcdHsgdGhpcy5zdGF0ZS5ob3ZlcmVkQXJlYSAmJiB0aGlzLnN0YXRlLmhvdmVyZWRBcmVhLm5hbWV9XG5cdFx0XHRcdFx0XHRcdDwvc3Bhbj5cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8cHJlIGNsYXNzTmFtZT1cIm1lc3NhZ2VcIj57dGhpcy5zdGF0ZS5tc2cgPyB0aGlzLnN0YXRlLm1zZyA6IG51bGx9PC9wcmU+XG5cdFx0XHRcdFx0PHByZT57dGhpcy5zdGF0ZS5tb3ZlTXNnID8gdGhpcy5zdGF0ZS5tb3ZlTXNnIDogbnVsbH08L3ByZT5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic291cmNlXCI+XG5cdFx0XHRcdFx0PGgyPkV4YW1wbGUgd2l0aCBjdXN0b20gdG9vbHRpcHMgOjwvaDI+XG5cdFx0XHRcdFx0PHA+KG1lc3NhZ2UgbG9naWMgaXMgbm90IHByZXNlbnQsIHRvIGtlZXAgaXQgY2xlYXIpPC9wPlxuXHRcdFx0XHRcdDxwcmU+PGNvZGU+e1xuXHRcdFx0XHRcdFx0JzxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XFxuJyArXG5cdFx0XHRcdFx0XHQnICAgIDxJbWFnZU1hcHBlciBzcmM9e1VSTH0gbWFwPXtNQVB9IHdpZHRoPXs1MDB9XFxuJyArXG5cdFx0XHRcdFx0XHQnICAgIFx0b25Mb2FkPXsoKSA9PiB0aGlzLmxvYWQoKX1cXG4nICtcblx0XHRcdFx0XHRcdCcgICAgXHRvbkNsaWNrPXthcmVhID0+IHRoaXMuY2xpY2tlZChhcmVhKX1cXG4nICtcblx0XHRcdFx0XHRcdCcgICAgXHRvbk1vdXNlRW50ZXI9e2FyZWEgPT4gdGhpcy5lbnRlckFyZWEoYXJlYSl9XFxuJyArXG5cdFx0XHRcdFx0XHQnICAgIFx0b25Nb3VzZUxlYXZlPXthcmVhID0+IHRoaXMubGVhdmVBcmVhKGFyZWEpfVxcbicgK1xuXHRcdFx0XHRcdFx0JyAgICBcdG9uTW91c2VNb3ZlPXsoYXJlYSwgXywgZXZ0KSA9PiB0aGlzLm1vdmVPbkFyZWEoYXJlYSwgZXZ0KX1cXG4nICtcblx0XHRcdFx0XHRcdCcgICAgXHRvbkltYWdlQ2xpY2s9e2V2dCA9PiB0aGlzLmNsaWNrZWRPdXRzaWRlKGV2dCl9XFxuJyArXG5cdFx0XHRcdFx0XHQnICAgIFx0b25JbWFnZU1vdXNlTW92ZT17ZXZ0ID0+IHRoaXMubW92ZU9uSW1hZ2UoZXZ0KX1cXG4nICtcblx0XHRcdFx0XHRcdCcgICAgLz5cXG4nICtcblx0XHRcdFx0XHRcdCcgICAge1xcbicgK1xuXHRcdFx0XHRcdFx0JyAgICBcdHRoaXMuc3RhdGUuaG92ZXJlZEFyZWEgJiZcXG4nICtcblx0XHRcdFx0XHRcdCcgICAgXHQ8c3BhbiBjbGFzc05hbWU9XCJ0b29sdGlwXCJcXG4nICtcblx0XHRcdFx0XHRcdCcgICAgXHQgICAgc3R5bGU9e3sgLi4udGhpcy5nZXRUaXBQb3NpdGlvbih0aGlzLnN0YXRlLmhvdmVyZWRBcmVhKX19PlxcbicgK1xuXHRcdFx0XHRcdFx0JyAgICBcdFx0eyB0aGlzLnN0YXRlLmhvdmVyZWRBcmVhICYmIHRoaXMuc3RhdGUuaG92ZXJlZEFyZWEubmFtZX1cXG4nICtcblx0XHRcdFx0XHRcdCcgICAgXHQ8L3NwYW4+XFxuJyArXG5cdFx0XHRcdFx0XHQnICAgIH1cXG4nICtcblx0XHRcdFx0XHRcdCc8L2Rpdj5cXG4nXG5cdFx0XHRcdFx0fTwvY29kZT48L3ByZT5cblx0XHRcdFx0XHQ8cHJlPjxjb2RlIGNsYXNzTmFtZT1cImpzb25cIj57XG5cdFx0XHRcdFx0XHQnVVJMID0gXCJodHRwczovL2MxLnN0YXRpY2ZsaWNrci5jb20vNS80MDUyLzQ1MDM4OTgzOTNfMzAzY2ZiYzlmZF9iLmpwZ1wiXFxuJyArXG5cdFx0XHRcdFx0XHQnTUFQID0ge1xcbicgK1xuXHRcdFx0XHRcdFx0JyAgbmFtZTogXCJteS1tYXBcIixcXG4nICtcblx0XHRcdFx0XHRcdCcgIGFyZWFzOiBbXFxuJyArXG5cdFx0XHRcdFx0XHQnICAgIHsgbmFtZTogXCIxXCIsIHNoYXBlOiBcInBvbHlcIiwgY29vcmRzOiBbMjUsMzMsMjcsMzAwLDEyOCwyNDAsMTI4LDk0XSwgcHJlRmlsbENvbG9yOiBcImdyZWVuXCIsIGZpbGxDb2xvcjogXCJibHVlXCIgIH0sXFxuJyArXG5cdFx0XHRcdFx0XHQnICAgIHsgbmFtZTogXCIyXCIsIHNoYXBlOiBcInBvbHlcIiwgY29vcmRzOiBbMjE5LDExOCwyMjAsMjEwLDI4MywyMTAsMjg0LDExOV0sIHByZUZpbGxDb2xvcjogXCJwaW5rXCIgIH0sXFxuJyArXG5cdFx0XHRcdFx0XHQnICAgIHsgbmFtZTogXCIzXCIsIHNoYXBlOiBcInBvbHlcIiwgY29vcmRzOiBbMzgxLDI0MSwzODMsOTQsNDYyLDUzLDQ1NywyODJdLCBmaWxsQ29sb3I6IFwieWVsbG93XCIgIH0sXFxuJyArXG5cdFx0XHRcdFx0XHQnICAgIHsgbmFtZTogXCI0XCIsIHNoYXBlOiBcInBvbHlcIiwgY29vcmRzOiBbMjQ1LDI4NSwyOTAsMjg1LDI3NCwyMzksMjQ5LDIzOF0sIHByZUZpbGxDb2xvcjogXCJyZWRcIiAgfSxcXG4nICtcblx0XHRcdFx0XHRcdCcgICAgeyBuYW1lOiBcIjVcIiwgc2hhcGU6IFwiY2lyY2xlXCIsIGNvb3JkczogWzE3MCwgMTAwLCAyNSBdIH0sXFxuJyArXG5cdFx0XHRcdFx0XHQnICBdXFxufSdcblx0XHRcdFx0XHR9PC9jb2RlPjwvcHJlPlxuXG5cdFx0XHRcdFx0SGFuZGxlciBkZXRhaWxzIDogJm5ic3A7XG5cdFx0XHRcdFx0PHNwYW4gb25DbGljaz17KCkgPT7CoHRoaXMuc2V0U3RhdGUoeyBjb2RlRGV0YWlsczogIXRoaXMuc3RhdGUuY29kZURldGFpbHMgfSl9PlxuXHRcdFx0XHRcdFx0eyB0aGlzLnN0YXRlLmNvZGVEZXRhaWxzID8gJ1stXScgOiAnWytdJyB9XG5cdFx0XHRcdFx0PC9zcGFuPlxuXHRcdFx0XHRcdDxwcmU+PGNvZGUgY2xhc3NOYW1lPVwianNcIiBzdHlsZT17eyBkaXNwbGF5OiB0aGlzLnN0YXRlLmNvZGVEZXRhaWxzID8gJ2Jsb2NrJyA6ICdub25lJyB9fT57XG5cdFx0XHRcdFx0XHQnZW50ZXJBcmVhKGFyZWEpIHtcXG4nICtcblx0XHRcdFx0XHRcdCcgICAgdGhpcy5zZXRTdGF0ZSh7IGhvdmVyZWRBcmVhOiBhcmVhIH0pO1xcbicgK1xuXHRcdFx0XHRcdFx0J31cXG5cXG4nICtcblx0XHRcdFx0XHRcdCdsZWF2ZUFyZWEoYXJlYSkge1xcbicgK1xuXHRcdFx0XHRcdFx0JyAgICB0aGlzLnNldFN0YXRlKHsgaG92ZXJlZEFyZWE6IG51bGwgfSk7XFxuJyArXG5cdFx0XHRcdFx0XHQnfVxcblxcbicgK1xuXHRcdFx0XHRcdFx0J2dldFRpcFBvc2l0aW9uKGFyZWEpIHtcXG4nICtcblx0XHRcdFx0XHRcdCcgICAgcmV0dXJuIHsgdG9wOiBgJHthcmVhLmNlbnRlclsxXX1weGAsIGxlZnQ6IGAke2FyZWEuY2VudGVyWzBdfXB4YCB9O1xcbicgK1xuXHRcdFx0XHRcdFx0J31cXG5cXG4nXG5cdFx0XHRcdFx0fTwvY29kZT48L3ByZT5cblxuXHRcdFx0XHRcdFN0eWxpbmcgZGV0YWlscyA6ICZuYnNwO1xuXHRcdFx0XHRcdDxzcGFuIG9uQ2xpY2s9eygpID0+wqB0aGlzLnNldFN0YXRlKHsgc3R5bGluZERldGFpbHM6ICF0aGlzLnN0YXRlLnN0eWxpbmREZXRhaWxzIH0pfT5cblx0XHRcdFx0XHRcdHsgdGhpcy5zdGF0ZS5zdHlsaW5kRGV0YWlscyA/ICdbLV0nIDogJ1srXScgfVxuXHRcdFx0XHRcdDwvc3Bhbj5cblx0XHRcdFx0XHQ8cHJlPjxjb2RlIGNsYXNzTmFtZT1cImNzc1wiIHN0eWxlPXt7IGRpc3BsYXk6IHRoaXMuc3RhdGUuc3R5bGluZERldGFpbHMgPyAnYmxvY2snIDogJ25vbmUnIH19Pntcblx0XHRcdFx0XHRcdCcuY29udGFpbmVyIHtcXG4nICtcblx0XHRcdFx0XHRcdCcgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbicgK1xuXHRcdFx0XHRcdFx0J31cXG5cXG4nICtcblx0XHRcdFx0XHRcdCcudG9vbHRpcCB7XFxuJyArXG5cdFx0XHRcdFx0XHQnICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4nICtcblx0XHRcdFx0XHRcdCcgICAgY29sb3I6ICNmZmY7XFxuJyArXG5cdFx0XHRcdFx0XHQnICAgIHBhZGRpbmc6IDEwcHg7XFxuJyArXG5cdFx0XHRcdFx0XHQnICAgIGJhY2tncm91bmQ6IHJnYmEoMCwwLDAsMC44KTtcXG4nICtcblx0XHRcdFx0XHRcdCcgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgtNTAlLCAtNTAlLCAwKTtcXG4nICtcblx0XHRcdFx0XHRcdCcgICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbicgK1xuXHRcdFx0XHRcdFx0JyAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4nICtcblx0XHRcdFx0XHRcdCcgICAgei1pbmRleDogMTAwMDtcXG4nICtcblx0XHRcdFx0XHRcdCd9XFxuJ1xuXHRcdFx0XHRcdH08L2NvZGU+PC9wcmU+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cblJlYWN0RE9NLnJlbmRlcig8QXBwIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogXG4gKi9cblxuZnVuY3Rpb24gbWFrZUVtcHR5RnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGFyZztcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGFjY2VwdHMgYW5kIGRpc2NhcmRzIGlucHV0czsgaXQgaGFzIG5vIHNpZGUgZWZmZWN0cy4gVGhpcyBpc1xuICogcHJpbWFyaWx5IHVzZWZ1bCBpZGlvbWF0aWNhbGx5IGZvciBvdmVycmlkYWJsZSBmdW5jdGlvbiBlbmRwb2ludHMgd2hpY2hcbiAqIGFsd2F5cyBuZWVkIHRvIGJlIGNhbGxhYmxlLCBzaW5jZSBKUyBsYWNrcyBhIG51bGwtY2FsbCBpZGlvbSBhbGEgQ29jb2EuXG4gKi9cbnZhciBlbXB0eUZ1bmN0aW9uID0gZnVuY3Rpb24gZW1wdHlGdW5jdGlvbigpIHt9O1xuXG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zID0gbWFrZUVtcHR5RnVuY3Rpb247XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zRmFsc2UgPSBtYWtlRW1wdHlGdW5jdGlvbihmYWxzZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVHJ1ZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKHRydWUpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwgPSBtYWtlRW1wdHlGdW5jdGlvbihudWxsKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUaGlzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcztcbn07XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQgPSBmdW5jdGlvbiAoYXJnKSB7XG4gIHJldHVybiBhcmc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVtcHR5RnVuY3Rpb247IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgdmFsaWRhdGVGb3JtYXQgPSBmdW5jdGlvbiB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YWxpZGF0ZUZvcm1hdCA9IGZ1bmN0aW9uIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gaW52YXJpYW50KGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCk7XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcignTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pKTtcbiAgICAgIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50OyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCcuL2VtcHR5RnVuY3Rpb24nKTtcblxuLyoqXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIHdhcm5pbmcgPSBlbXB0eUZ1bmN0aW9uO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gcHJpbnRXYXJuaW5nKGZvcm1hdCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgIH0pO1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH07XG5cbiAgd2FybmluZyA9IGZ1bmN0aW9uIHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArICdtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuXG4gICAgaWYgKGZvcm1hdC5pbmRleE9mKCdGYWlsZWQgQ29tcG9zaXRlIHByb3BUeXBlOiAnKSA9PT0gMCkge1xuICAgICAgcmV0dXJuOyAvLyBJZ25vcmUgQ29tcG9zaXRlQ29tcG9uZW50IHByb3B0eXBlIGNoZWNrLlxuICAgIH1cblxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiA+IDIgPyBfbGVuMiAtIDIgOiAwKSwgX2tleTIgPSAyOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTIgLSAyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHByaW50V2FybmluZy5hcHBseSh1bmRlZmluZWQsIFtmb3JtYXRdLmNvbmNhdChhcmdzKSk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7IiwiLypcbm9iamVjdC1hc3NpZ25cbihjKSBTaW5kcmUgU29yaHVzXG5AbGljZW5zZSBNSVRcbiovXG5cbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuICB2YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcbiAgdmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbiAgdmFyIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xufVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IHRoZSB2YWx1ZXMgbWF0Y2ggd2l0aCB0aGUgdHlwZSBzcGVjcy5cbiAqIEVycm9yIG1lc3NhZ2VzIGFyZSBtZW1vcml6ZWQgYW5kIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0eXBlU3BlY3MgTWFwIG9mIG5hbWUgdG8gYSBSZWFjdFByb3BUeXBlXG4gKiBAcGFyYW0ge29iamVjdH0gdmFsdWVzIFJ1bnRpbWUgdmFsdWVzIHRoYXQgbmVlZCB0byBiZSB0eXBlLWNoZWNrZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvbiBlLmcuIFwicHJvcFwiLCBcImNvbnRleHRcIiwgXCJjaGlsZCBjb250ZXh0XCJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lIE5hbWUgb2YgdGhlIGNvbXBvbmVudCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gKiBAcGFyYW0gez9GdW5jdGlvbn0gZ2V0U3RhY2sgUmV0dXJucyB0aGUgY29tcG9uZW50IHN0YWNrLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2hlY2tQcm9wVHlwZXModHlwZVNwZWNzLCB2YWx1ZXMsIGxvY2F0aW9uLCBjb21wb25lbnROYW1lLCBnZXRTdGFjaykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGZvciAodmFyIHR5cGVTcGVjTmFtZSBpbiB0eXBlU3BlY3MpIHtcbiAgICAgIGlmICh0eXBlU3BlY3MuaGFzT3duUHJvcGVydHkodHlwZVNwZWNOYW1lKSkge1xuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIC8vIFByb3AgdHlwZSB2YWxpZGF0aW9uIG1heSB0aHJvdy4gSW4gY2FzZSB0aGV5IGRvLCB3ZSBkb24ndCB3YW50IHRvXG4gICAgICAgIC8vIGZhaWwgdGhlIHJlbmRlciBwaGFzZSB3aGVyZSBpdCBkaWRuJ3QgZmFpbCBiZWZvcmUuIFNvIHdlIGxvZyBpdC5cbiAgICAgICAgLy8gQWZ0ZXIgdGhlc2UgaGF2ZSBiZWVuIGNsZWFuZWQgdXAsIHdlJ2xsIGxldCB0aGVtIHRocm93LlxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxseSBhbiBpbnZhcmlhbnQgdGhhdCBnZXRzIGNhdWdodC4gSXQncyB0aGUgc2FtZVxuICAgICAgICAgIC8vIGJlaGF2aW9yIGFzIHdpdGhvdXQgdGhpcyBzdGF0ZW1lbnQgZXhjZXB0IHdpdGggYSBiZXR0ZXIgbWVzc2FnZS5cbiAgICAgICAgICBpbnZhcmlhbnQodHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdID09PSAnZnVuY3Rpb24nLCAnJXM6ICVzIHR5cGUgYCVzYCBpcyBpbnZhbGlkOyBpdCBtdXN0IGJlIGEgZnVuY3Rpb24sIHVzdWFsbHkgZnJvbSAnICsgJ3RoZSBgcHJvcC10eXBlc2AgcGFja2FnZSwgYnV0IHJlY2VpdmVkIGAlc2AuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBsb2NhdGlvbiwgdHlwZVNwZWNOYW1lLCB0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0pO1xuICAgICAgICAgIGVycm9yID0gdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0odmFsdWVzLCB0eXBlU3BlY05hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBudWxsLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgZXJyb3IgPSBleDtcbiAgICAgICAgfVxuICAgICAgICB3YXJuaW5nKCFlcnJvciB8fCBlcnJvciBpbnN0YW5jZW9mIEVycm9yLCAnJXM6IHR5cGUgc3BlY2lmaWNhdGlvbiBvZiAlcyBgJXNgIGlzIGludmFsaWQ7IHRoZSB0eXBlIGNoZWNrZXIgJyArICdmdW5jdGlvbiBtdXN0IHJldHVybiBgbnVsbGAgb3IgYW4gYEVycm9yYCBidXQgcmV0dXJuZWQgYSAlcy4gJyArICdZb3UgbWF5IGhhdmUgZm9yZ290dGVuIHRvIHBhc3MgYW4gYXJndW1lbnQgdG8gdGhlIHR5cGUgY2hlY2tlciAnICsgJ2NyZWF0b3IgKGFycmF5T2YsIGluc3RhbmNlT2YsIG9iamVjdE9mLCBvbmVPZiwgb25lT2ZUeXBlLCBhbmQgJyArICdzaGFwZSBhbGwgcmVxdWlyZSBhbiBhcmd1bWVudCkuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBsb2NhdGlvbiwgdHlwZVNwZWNOYW1lLCB0eXBlb2YgZXJyb3IpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhKGVycm9yLm1lc3NhZ2UgaW4gbG9nZ2VkVHlwZUZhaWx1cmVzKSkge1xuICAgICAgICAgIC8vIE9ubHkgbW9uaXRvciB0aGlzIGZhaWx1cmUgb25jZSBiZWNhdXNlIHRoZXJlIHRlbmRzIHRvIGJlIGEgbG90IG9mIHRoZVxuICAgICAgICAgIC8vIHNhbWUgZXJyb3IuXG4gICAgICAgICAgbG9nZ2VkVHlwZUZhaWx1cmVzW2Vycm9yLm1lc3NhZ2VdID0gdHJ1ZTtcblxuICAgICAgICAgIHZhciBzdGFjayA9IGdldFN0YWNrID8gZ2V0U3RhY2soKSA6ICcnO1xuXG4gICAgICAgICAgd2FybmluZyhmYWxzZSwgJ0ZhaWxlZCAlcyB0eXBlOiAlcyVzJywgbG9jYXRpb24sIGVycm9yLm1lc3NhZ2UsIHN0YWNrICE9IG51bGwgPyBzdGFjayA6ICcnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoZWNrUHJvcFR5cGVzO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gc2hpbShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgIGlmIChzZWNyZXQgPT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAvLyBJdCBpcyBzdGlsbCBzYWZlIHdoZW4gY2FsbGVkIGZyb20gUmVhY3QuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGludmFyaWFudChcbiAgICAgIGZhbHNlLFxuICAgICAgJ0NhbGxpbmcgUHJvcFR5cGVzIHZhbGlkYXRvcnMgZGlyZWN0bHkgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgJ1VzZSBQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoKSB0byBjYWxsIHRoZW0uICcgK1xuICAgICAgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnXG4gICAgKTtcbiAgfTtcbiAgc2hpbS5pc1JlcXVpcmVkID0gc2hpbTtcbiAgZnVuY3Rpb24gZ2V0U2hpbSgpIHtcbiAgICByZXR1cm4gc2hpbTtcbiAgfTtcbiAgLy8gSW1wb3J0YW50IVxuICAvLyBLZWVwIHRoaXMgbGlzdCBpbiBzeW5jIHdpdGggcHJvZHVjdGlvbiB2ZXJzaW9uIGluIGAuL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzYC5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICAgIGFycmF5OiBzaGltLFxuICAgIGJvb2w6IHNoaW0sXG4gICAgZnVuYzogc2hpbSxcbiAgICBudW1iZXI6IHNoaW0sXG4gICAgb2JqZWN0OiBzaGltLFxuICAgIHN0cmluZzogc2hpbSxcbiAgICBzeW1ib2w6IHNoaW0sXG5cbiAgICBhbnk6IHNoaW0sXG4gICAgYXJyYXlPZjogZ2V0U2hpbSxcbiAgICBlbGVtZW50OiBzaGltLFxuICAgIGluc3RhbmNlT2Y6IGdldFNoaW0sXG4gICAgbm9kZTogc2hpbSxcbiAgICBvYmplY3RPZjogZ2V0U2hpbSxcbiAgICBvbmVPZjogZ2V0U2hpbSxcbiAgICBvbmVPZlR5cGU6IGdldFNoaW0sXG4gICAgc2hhcGU6IGdldFNoaW0sXG4gICAgZXhhY3Q6IGdldFNoaW1cbiAgfTtcblxuICBSZWFjdFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcyA9IGVtcHR5RnVuY3Rpb247XG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eUZ1bmN0aW9uJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG52YXIgY2hlY2tQcm9wVHlwZXMgPSByZXF1aXJlKCcuL2NoZWNrUHJvcFR5cGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXNWYWxpZEVsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgLyogZ2xvYmFsIFN5bWJvbCAqL1xuICB2YXIgSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG4gIHZhciBGQVVYX0lURVJBVE9SX1NZTUJPTCA9ICdAQGl0ZXJhdG9yJzsgLy8gQmVmb3JlIFN5bWJvbCBzcGVjLlxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpdGVyYXRvciBtZXRob2QgZnVuY3Rpb24gY29udGFpbmVkIG9uIHRoZSBpdGVyYWJsZSBvYmplY3QuXG4gICAqXG4gICAqIEJlIHN1cmUgdG8gaW52b2tlIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBpdGVyYWJsZSBhcyBjb250ZXh0OlxuICAgKlxuICAgKiAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG15SXRlcmFibGUpO1xuICAgKiAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICogICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG15SXRlcmFibGUpO1xuICAgKiAgICAgICAuLi5cbiAgICogICAgIH1cbiAgICpcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBtYXliZUl0ZXJhYmxlXG4gICAqIEByZXR1cm4gez9mdW5jdGlvbn1cbiAgICovXG4gIGZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICAgIHZhciBpdGVyYXRvckZuID0gbWF5YmVJdGVyYWJsZSAmJiAoSVRFUkFUT1JfU1lNQk9MICYmIG1heWJlSXRlcmFibGVbSVRFUkFUT1JfU1lNQk9MXSB8fCBtYXliZUl0ZXJhYmxlW0ZBVVhfSVRFUkFUT1JfU1lNQk9MXSk7XG4gICAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gaXRlcmF0b3JGbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBtZXRob2RzIHRoYXQgYWxsb3cgZGVjbGFyYXRpb24gYW5kIHZhbGlkYXRpb24gb2YgcHJvcHMgdGhhdCBhcmVcbiAgICogc3VwcGxpZWQgdG8gUmVhY3QgY29tcG9uZW50cy4gRXhhbXBsZSB1c2FnZTpcbiAgICpcbiAgICogICB2YXIgUHJvcHMgPSByZXF1aXJlKCdSZWFjdFByb3BUeXBlcycpO1xuICAgKiAgIHZhciBNeUFydGljbGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIHByb3AgbmFtZWQgXCJkZXNjcmlwdGlvblwiLlxuICAgKiAgICAgICBkZXNjcmlwdGlvbjogUHJvcHMuc3RyaW5nLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHJlcXVpcmVkIGVudW0gcHJvcCBuYW1lZCBcImNhdGVnb3J5XCIuXG4gICAqICAgICAgIGNhdGVnb3J5OiBQcm9wcy5vbmVPZihbJ05ld3MnLCdQaG90b3MnXSkuaXNSZXF1aXJlZCxcbiAgICpcbiAgICogICAgICAgLy8gQSBwcm9wIG5hbWVkIFwiZGlhbG9nXCIgdGhhdCByZXF1aXJlcyBhbiBpbnN0YW5jZSBvZiBEaWFsb2cuXG4gICAqICAgICAgIGRpYWxvZzogUHJvcHMuaW5zdGFuY2VPZihEaWFsb2cpLmlzUmVxdWlyZWRcbiAgICogICAgIH0sXG4gICAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkgeyAuLi4gfVxuICAgKiAgIH0pO1xuICAgKlxuICAgKiBBIG1vcmUgZm9ybWFsIHNwZWNpZmljYXRpb24gb2YgaG93IHRoZXNlIG1ldGhvZHMgYXJlIHVzZWQ6XG4gICAqXG4gICAqICAgdHlwZSA6PSBhcnJheXxib29sfGZ1bmN8b2JqZWN0fG51bWJlcnxzdHJpbmd8b25lT2YoWy4uLl0pfGluc3RhbmNlT2YoLi4uKVxuICAgKiAgIGRlY2wgOj0gUmVhY3RQcm9wVHlwZXMue3R5cGV9KC5pc1JlcXVpcmVkKT9cbiAgICpcbiAgICogRWFjaCBhbmQgZXZlcnkgZGVjbGFyYXRpb24gcHJvZHVjZXMgYSBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lIHNpZ25hdHVyZS4gVGhpc1xuICAgKiBhbGxvd3MgdGhlIGNyZWF0aW9uIG9mIGN1c3RvbSB2YWxpZGF0aW9uIGZ1bmN0aW9ucy4gRm9yIGV4YW1wbGU6XG4gICAqXG4gICAqICB2YXIgTXlMaW5rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgb3IgVVJJIHByb3AgbmFtZWQgXCJocmVmXCIuXG4gICAqICAgICAgaHJlZjogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gICAqICAgICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgKiAgICAgICAgaWYgKHByb3BWYWx1ZSAhPSBudWxsICYmIHR5cGVvZiBwcm9wVmFsdWUgIT09ICdzdHJpbmcnICYmXG4gICAqICAgICAgICAgICAgIShwcm9wVmFsdWUgaW5zdGFuY2VvZiBVUkkpKSB7XG4gICAqICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAqICAgICAgICAgICAgJ0V4cGVjdGVkIGEgc3RyaW5nIG9yIGFuIFVSSSBmb3IgJyArIHByb3BOYW1lICsgJyBpbiAnICtcbiAgICogICAgICAgICAgICBjb21wb25lbnROYW1lXG4gICAqICAgICAgICAgICk7XG4gICAqICAgICAgICB9XG4gICAqICAgICAgfVxuICAgKiAgICB9LFxuICAgKiAgICByZW5kZXI6IGZ1bmN0aW9uKCkgey4uLn1cbiAgICogIH0pO1xuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG5cbiAgdmFyIEFOT05ZTU9VUyA9ICc8PGFub255bW91cz4+JztcblxuICAvLyBJbXBvcnRhbnQhXG4gIC8vIEtlZXAgdGhpcyBsaXN0IGluIHN5bmMgd2l0aCBwcm9kdWN0aW9uIHZlcnNpb24gaW4gYC4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzYC5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICAgIGFycmF5OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYXJyYXknKSxcbiAgICBib29sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYm9vbGVhbicpLFxuICAgIGZ1bmM6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdmdW5jdGlvbicpLFxuICAgIG51bWJlcjogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ251bWJlcicpLFxuICAgIG9iamVjdDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ29iamVjdCcpLFxuICAgIHN0cmluZzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N0cmluZycpLFxuICAgIHN5bWJvbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N5bWJvbCcpLFxuXG4gICAgYW55OiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpLFxuICAgIGFycmF5T2Y6IGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcixcbiAgICBlbGVtZW50OiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSxcbiAgICBpbnN0YW5jZU9mOiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyLFxuICAgIG5vZGU6IGNyZWF0ZU5vZGVDaGVja2VyKCksXG4gICAgb2JqZWN0T2Y6IGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIsXG4gICAgb25lT2Y6IGNyZWF0ZUVudW1UeXBlQ2hlY2tlcixcbiAgICBvbmVPZlR5cGU6IGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIsXG4gICAgc2hhcGU6IGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIsXG4gICAgZXhhY3Q6IGNyZWF0ZVN0cmljdFNoYXBlVHlwZUNoZWNrZXIsXG4gIH07XG5cbiAgLyoqXG4gICAqIGlubGluZWQgT2JqZWN0LmlzIHBvbHlmaWxsIHRvIGF2b2lkIHJlcXVpcmluZyBjb25zdW1lcnMgc2hpcCB0aGVpciBvd25cbiAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2lzXG4gICAqL1xuICAvKmVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSovXG4gIGZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgICAvLyBTYW1lVmFsdWUgYWxnb3JpdGhtXG4gICAgaWYgKHggPT09IHkpIHtcbiAgICAgIC8vIFN0ZXBzIDEtNSwgNy0xMFxuICAgICAgLy8gU3RlcHMgNi5iLTYuZTogKzAgIT0gLTBcbiAgICAgIHJldHVybiB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICAgIHJldHVybiB4ICE9PSB4ICYmIHkgIT09IHk7XG4gICAgfVxuICB9XG4gIC8qZXNsaW50LWVuYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuXG4gIC8qKlxuICAgKiBXZSB1c2UgYW4gRXJyb3ItbGlrZSBvYmplY3QgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgYXMgcGVvcGxlIG1heSBjYWxsXG4gICAqIFByb3BUeXBlcyBkaXJlY3RseSBhbmQgaW5zcGVjdCB0aGVpciBvdXRwdXQuIEhvd2V2ZXIsIHdlIGRvbid0IHVzZSByZWFsXG4gICAqIEVycm9ycyBhbnltb3JlLiBXZSBkb24ndCBpbnNwZWN0IHRoZWlyIHN0YWNrIGFueXdheSwgYW5kIGNyZWF0aW5nIHRoZW1cbiAgICogaXMgcHJvaGliaXRpdmVseSBleHBlbnNpdmUgaWYgdGhleSBhcmUgY3JlYXRlZCB0b28gb2Z0ZW4sIHN1Y2ggYXMgd2hhdFxuICAgKiBoYXBwZW5zIGluIG9uZU9mVHlwZSgpIGZvciBhbnkgdHlwZSBiZWZvcmUgdGhlIG9uZSB0aGF0IG1hdGNoZWQuXG4gICAqL1xuICBmdW5jdGlvbiBQcm9wVHlwZUVycm9yKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgfVxuICAvLyBNYWtlIGBpbnN0YW5jZW9mIEVycm9yYCBzdGlsbCB3b3JrIGZvciByZXR1cm5lZCBlcnJvcnMuXG4gIFByb3BUeXBlRXJyb3IucHJvdG90eXBlID0gRXJyb3IucHJvdG90eXBlO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZSA9IHt9O1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50ID0gMDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2hlY2tUeXBlKGlzUmVxdWlyZWQsIHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICBjb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICBwcm9wRnVsbE5hbWUgPSBwcm9wRnVsbE5hbWUgfHwgcHJvcE5hbWU7XG5cbiAgICAgIGlmIChzZWNyZXQgIT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAgIGlmICh0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gICAgICAgICAgLy8gTmV3IGJlaGF2aW9yIG9ubHkgZm9yIHVzZXJzIG9mIGBwcm9wLXR5cGVzYCBwYWNrYWdlXG4gICAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAnQ2FsbGluZyBQcm9wVHlwZXMgdmFsaWRhdG9ycyBkaXJlY3RseSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAnVXNlIGBQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoKWAgdG8gY2FsbCB0aGVtLiAnICtcbiAgICAgICAgICAgICdSZWFkIG1vcmUgYXQgaHR0cDovL2ZiLm1lL3VzZS1jaGVjay1wcm9wLXR5cGVzJ1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAvLyBPbGQgYmVoYXZpb3IgZm9yIHBlb3BsZSB1c2luZyBSZWFjdC5Qcm9wVHlwZXNcbiAgICAgICAgICB2YXIgY2FjaGVLZXkgPSBjb21wb25lbnROYW1lICsgJzonICsgcHJvcE5hbWU7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIW1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSAmJlxuICAgICAgICAgICAgLy8gQXZvaWQgc3BhbW1pbmcgdGhlIGNvbnNvbGUgYmVjYXVzZSB0aGV5IGFyZSBvZnRlbiBub3QgYWN0aW9uYWJsZSBleGNlcHQgZm9yIGxpYiBhdXRob3JzXG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA8IDNcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHdhcm5pbmcoXG4gICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAnWW91IGFyZSBtYW51YWxseSBjYWxsaW5nIGEgUmVhY3QuUHJvcFR5cGVzIHZhbGlkYXRpb24gJyArXG4gICAgICAgICAgICAgICdmdW5jdGlvbiBmb3IgdGhlIGAlc2AgcHJvcCBvbiBgJXNgLiBUaGlzIGlzIGRlcHJlY2F0ZWQgJyArXG4gICAgICAgICAgICAgICdhbmQgd2lsbCB0aHJvdyBpbiB0aGUgc3RhbmRhbG9uZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAgICdZb3UgbWF5IGJlIHNlZWluZyB0aGlzIHdhcm5pbmcgZHVlIHRvIGEgdGhpcmQtcGFydHkgUHJvcFR5cGVzICcgK1xuICAgICAgICAgICAgICAnbGlicmFyeS4gU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtd2FybmluZy1kb250LWNhbGwtcHJvcHR5cGVzICcgKyAnZm9yIGRldGFpbHMuJyxcbiAgICAgICAgICAgICAgcHJvcEZ1bGxOYW1lLFxuICAgICAgICAgICAgICBjb21wb25lbnROYW1lXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldID0gdHJ1ZTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09IG51bGwpIHtcbiAgICAgICAgaWYgKGlzUmVxdWlyZWQpIHtcbiAgICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkICcgKyAoJ2luIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGBudWxsYC4nKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgaW4gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYHVuZGVmaW5lZGAuJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNoYWluZWRDaGVja1R5cGUgPSBjaGVja1R5cGUuYmluZChudWxsLCBmYWxzZSk7XG4gICAgY2hhaW5lZENoZWNrVHlwZS5pc1JlcXVpcmVkID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgdHJ1ZSk7XG5cbiAgICByZXR1cm4gY2hhaW5lZENoZWNrVHlwZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKGV4cGVjdGVkVHlwZSkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gZXhwZWN0ZWRUeXBlKSB7XG4gICAgICAgIC8vIGBwcm9wVmFsdWVgIGJlaW5nIGluc3RhbmNlIG9mLCBzYXksIGRhdGUvcmVnZXhwLCBwYXNzIHRoZSAnb2JqZWN0J1xuICAgICAgICAvLyBjaGVjaywgYnV0IHdlIGNhbiBvZmZlciBhIG1vcmUgcHJlY2lzZSBlcnJvciBtZXNzYWdlIGhlcmUgcmF0aGVyIHRoYW5cbiAgICAgICAgLy8gJ29mIHR5cGUgYG9iamVjdGAnLlxuICAgICAgICB2YXIgcHJlY2lzZVR5cGUgPSBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByZWNpc2VUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdgJyArIGV4cGVjdGVkVHlwZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQW55VHlwZUNoZWNrZXIoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBhcnJheU9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIGFycmF5LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwgaSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICdbJyArIGkgKyAnXScsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIHNpbmdsZSBSZWFjdEVsZW1lbnQuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyKGV4cGVjdGVkQ2xhc3MpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghKHByb3BzW3Byb3BOYW1lXSBpbnN0YW5jZW9mIGV4cGVjdGVkQ2xhc3MpKSB7XG4gICAgICAgIHZhciBleHBlY3RlZENsYXNzTmFtZSA9IGV4cGVjdGVkQ2xhc3MubmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICAgIHZhciBhY3R1YWxDbGFzc05hbWUgPSBnZXRDbGFzc05hbWUocHJvcHNbcHJvcE5hbWVdKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgYWN0dWFsQ2xhc3NOYW1lICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdpbnN0YW5jZSBvZiBgJyArIGV4cGVjdGVkQ2xhc3NOYW1lICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIoZXhwZWN0ZWRWYWx1ZXMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZXhwZWN0ZWRWYWx1ZXMpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2YsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwZWN0ZWRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGlzKHByb3BWYWx1ZSwgZXhwZWN0ZWRWYWx1ZXNbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHZhbHVlc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KGV4cGVjdGVkVmFsdWVzKTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdmFsdWUgYCcgKyBwcm9wVmFsdWUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgb25lIG9mICcgKyB2YWx1ZXNTdHJpbmcgKyAnLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgb2JqZWN0T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gb2JqZWN0LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBwcm9wVmFsdWUpIHtcbiAgICAgICAgaWYgKHByb3BWYWx1ZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVVbmlvblR5cGVDaGVja2VyKGFycmF5T2ZUeXBlQ2hlY2tlcnMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXlPZlR5cGVDaGVja2VycykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgaWYgKHR5cGVvZiBjaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHdhcm5pbmcoXG4gICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLiBFeHBlY3RlZCBhbiBhcnJheSBvZiBjaGVjayBmdW5jdGlvbnMsIGJ1dCAnICtcbiAgICAgICAgICAncmVjZWl2ZWQgJXMgYXQgaW5kZXggJXMuJyxcbiAgICAgICAgICBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcoY2hlY2tlciksXG4gICAgICAgICAgaVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgICBpZiAoY2hlY2tlcihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KSA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVOb2RlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghaXNOb2RlKHByb3BzW3Byb3BOYW1lXSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBSZWFjdE5vZGUuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gc2hhcGVUeXBlcykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgICAgfVxuICAgICAgLy8gV2UgbmVlZCB0byBjaGVjayBhbGwga2V5cyBpbiBjYXNlIHNvbWUgYXJlIHJlcXVpcmVkIGJ1dCBtaXNzaW5nIGZyb21cbiAgICAgIC8vIHByb3BzLlxuICAgICAgdmFyIGFsbEtleXMgPSBhc3NpZ24oe30sIHByb3BzW3Byb3BOYW1lXSwgc2hhcGVUeXBlcyk7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gYWxsS2V5cykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKFxuICAgICAgICAgICAgJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGtleSBgJyArIGtleSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLicgK1xuICAgICAgICAgICAgJ1xcbkJhZCBvYmplY3Q6ICcgKyBKU09OLnN0cmluZ2lmeShwcm9wc1twcm9wTmFtZV0sIG51bGwsICcgICcpICtcbiAgICAgICAgICAgICdcXG5WYWxpZCBrZXlzOiAnICsgIEpTT04uc3RyaW5naWZ5KE9iamVjdC5rZXlzKHNoYXBlVHlwZXMpLCBudWxsLCAnICAnKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc05vZGUocHJvcFZhbHVlKSB7XG4gICAgc3dpdGNoICh0eXBlb2YgcHJvcFZhbHVlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAhcHJvcFZhbHVlO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBwcm9wVmFsdWUuZXZlcnkoaXNOb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcFZhbHVlID09PSBudWxsIHx8IGlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihwcm9wVmFsdWUpO1xuICAgICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChwcm9wVmFsdWUpO1xuICAgICAgICAgIHZhciBzdGVwO1xuICAgICAgICAgIGlmIChpdGVyYXRvckZuICE9PSBwcm9wVmFsdWUuZW50cmllcykge1xuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICBpZiAoIWlzTm9kZShzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJdGVyYXRvciB3aWxsIHByb3ZpZGUgZW50cnkgW2ssdl0gdHVwbGVzIHJhdGhlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05vZGUoZW50cnlbMV0pKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpIHtcbiAgICAvLyBOYXRpdmUgU3ltYm9sLlxuICAgIGlmIChwcm9wVHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ10gPT09ICdTeW1ib2wnXG4gICAgaWYgKHByb3BWYWx1ZVsnQEB0b1N0cmluZ1RhZyddID09PSAnU3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gRmFsbGJhY2sgZm9yIG5vbi1zcGVjIGNvbXBsaWFudCBTeW1ib2xzIHdoaWNoIGFyZSBwb2x5ZmlsbGVkLlxuICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHByb3BWYWx1ZSBpbnN0YW5jZW9mIFN5bWJvbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gRXF1aXZhbGVudCBvZiBgdHlwZW9mYCBidXQgd2l0aCBzcGVjaWFsIGhhbmRsaW5nIGZvciBhcnJheSBhbmQgcmVnZXhwLlxuICBmdW5jdGlvbiBnZXRQcm9wVHlwZShwcm9wVmFsdWUpIHtcbiAgICB2YXIgcHJvcFR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnYXJyYXknO1xuICAgIH1cbiAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAvLyBPbGQgd2Via2l0cyAoYXQgbGVhc3QgdW50aWwgQW5kcm9pZCA0LjApIHJldHVybiAnZnVuY3Rpb24nIHJhdGhlciB0aGFuXG4gICAgICAvLyAnb2JqZWN0JyBmb3IgdHlwZW9mIGEgUmVnRXhwLiBXZSdsbCBub3JtYWxpemUgdGhpcyBoZXJlIHNvIHRoYXQgL2JsYS9cbiAgICAgIC8vIHBhc3NlcyBQcm9wVHlwZXMub2JqZWN0LlxuICAgICAgcmV0dXJuICdvYmplY3QnO1xuICAgIH1cbiAgICBpZiAoaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnc3ltYm9sJztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gVGhpcyBoYW5kbGVzIG1vcmUgdHlwZXMgdGhhbiBgZ2V0UHJvcFR5cGVgLiBPbmx5IHVzZWQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICAvLyBTZWUgYGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyYC5cbiAgZnVuY3Rpb24gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9wVmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHByb3BWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnICsgcHJvcFZhbHVlO1xuICAgIH1cbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiAnZGF0ZSc7XG4gICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFJldHVybnMgYSBzdHJpbmcgdGhhdCBpcyBwb3N0Zml4ZWQgdG8gYSB3YXJuaW5nIGFib3V0IGFuIGludmFsaWQgdHlwZS5cbiAgLy8gRm9yIGV4YW1wbGUsIFwidW5kZWZpbmVkXCIgb3IgXCJvZiB0eXBlIGFycmF5XCJcbiAgZnVuY3Rpb24gZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSBnZXRQcmVjaXNlVHlwZSh2YWx1ZSk7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdhcnJheSc6XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICByZXR1cm4gJ2FuICcgKyB0eXBlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgIGNhc2UgJ3JlZ2V4cCc6XG4gICAgICAgIHJldHVybiAnYSAnICsgdHlwZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybnMgY2xhc3MgbmFtZSBvZiB0aGUgb2JqZWN0LCBpZiBhbnkuXG4gIGZ1bmN0aW9uIGdldENsYXNzTmFtZShwcm9wVmFsdWUpIHtcbiAgICBpZiAoIXByb3BWYWx1ZS5jb25zdHJ1Y3RvciB8fCAhcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICAgIHJldHVybiBBTk9OWU1PVVM7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZTtcbiAgfVxuXG4gIFJlYWN0UHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzID0gY2hlY2tQcm9wVHlwZXM7XG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIFN5bWJvbC5mb3IgJiZcbiAgICBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykpIHx8XG4gICAgMHhlYWM3O1xuXG4gIHZhciBpc1ZhbGlkRWxlbWVudCA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJlxuICAgICAgb2JqZWN0ICE9PSBudWxsICYmXG4gICAgICBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRTtcbiAgfTtcblxuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBkZXZlbG9wbWVudCBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICB2YXIgdGhyb3dPbkRpcmVjdEFjY2VzcyA9IHRydWU7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFR5cGVDaGVja2VycycpKGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKTtcbn0gZWxzZSB7XG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IHByb2R1Y3Rpb24gYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcycpKCk7XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gJ1NFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEJztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlc1NlY3JldDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xudmFyIGtleUxpc3QgPSBPYmplY3Qua2V5cztcbnZhciBoYXNQcm9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBoYXNFbGVtZW50VHlwZSA9IHR5cGVvZiBFbGVtZW50ICE9PSAndW5kZWZpbmVkJztcblxuZnVuY3Rpb24gZXF1YWwoYSwgYikge1xuICAvLyBmYXN0LWRlZXAtZXF1YWwgaW5kZXguanMgMi4wLjFcbiAgaWYgKGEgPT09IGIpIHJldHVybiB0cnVlO1xuXG4gIGlmIChhICYmIGIgJiYgdHlwZW9mIGEgPT0gJ29iamVjdCcgJiYgdHlwZW9mIGIgPT0gJ29iamVjdCcpIHtcbiAgICB2YXIgYXJyQSA9IGlzQXJyYXkoYSlcbiAgICAgICwgYXJyQiA9IGlzQXJyYXkoYilcbiAgICAgICwgaVxuICAgICAgLCBsZW5ndGhcbiAgICAgICwga2V5O1xuXG4gICAgaWYgKGFyckEgJiYgYXJyQikge1xuICAgICAgbGVuZ3RoID0gYS5sZW5ndGg7XG4gICAgICBpZiAobGVuZ3RoICE9IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspXG4gICAgICAgIGlmICghZXF1YWwoYVtpXSwgYltpXSkpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChhcnJBICE9IGFyckIpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBkYXRlQSA9IGEgaW5zdGFuY2VvZiBEYXRlXG4gICAgICAsIGRhdGVCID0gYiBpbnN0YW5jZW9mIERhdGU7XG4gICAgaWYgKGRhdGVBICE9IGRhdGVCKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGRhdGVBICYmIGRhdGVCKSByZXR1cm4gYS5nZXRUaW1lKCkgPT0gYi5nZXRUaW1lKCk7XG5cbiAgICB2YXIgcmVnZXhwQSA9IGEgaW5zdGFuY2VvZiBSZWdFeHBcbiAgICAgICwgcmVnZXhwQiA9IGIgaW5zdGFuY2VvZiBSZWdFeHA7XG4gICAgaWYgKHJlZ2V4cEEgIT0gcmVnZXhwQikgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChyZWdleHBBICYmIHJlZ2V4cEIpIHJldHVybiBhLnRvU3RyaW5nKCkgPT0gYi50b1N0cmluZygpO1xuXG4gICAgdmFyIGtleXMgPSBrZXlMaXN0KGEpO1xuICAgIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuXG4gICAgaWYgKGxlbmd0aCAhPT0ga2V5TGlzdChiKS5sZW5ndGgpXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspXG4gICAgICBpZiAoIWhhc1Byb3AuY2FsbChiLCBrZXlzW2ldKSkgcmV0dXJuIGZhbHNlO1xuICAgIC8vIGVuZCBmYXN0LWRlZXAtZXF1YWxcblxuICAgIC8vIHN0YXJ0IHJlYWN0LWZhc3QtY29tcGFyZVxuICAgIC8vIGN1c3RvbSBoYW5kbGluZyBmb3IgRE9NIGVsZW1lbnRzXG4gICAgaWYgKGhhc0VsZW1lbnRUeXBlICYmIGEgaW5zdGFuY2VvZiBFbGVtZW50ICYmIGIgaW5zdGFuY2VvZiBFbGVtZW50KVxuICAgICAgcmV0dXJuIGEgPT09IGI7XG5cbiAgICAvLyBjdXN0b20gaGFuZGxpbmcgZm9yIFJlYWN0XG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gIT09IDA7KSB7XG4gICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYgKGtleSA9PT0gJ19vd25lcicgJiYgYS4kJHR5cGVvZikge1xuICAgICAgICAvLyBSZWFjdC1zcGVjaWZpYzogYXZvaWQgdHJhdmVyc2luZyBSZWFjdCBlbGVtZW50cycgX293bmVyLlxuICAgICAgICAvLyAgX293bmVyIGNvbnRhaW5zIGNpcmN1bGFyIHJlZmVyZW5jZXNcbiAgICAgICAgLy8gYW5kIGlzIG5vdCBuZWVkZWQgd2hlbiBjb21wYXJpbmcgdGhlIGFjdHVhbCBlbGVtZW50cyAoYW5kIG5vdCB0aGVpciBvd25lcnMpXG4gICAgICAgIC8vIC4kJHR5cGVvZiBhbmQgLl9zdG9yZSBvbiBqdXN0IHJlYXNvbmFibGUgbWFya2VycyBvZiBhIHJlYWN0IGVsZW1lbnRcbiAgICAgICAgY29udGludWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhbGwgb3RoZXIgcHJvcGVydGllcyBzaG91bGQgYmUgdHJhdmVyc2VkIGFzIHVzdWFsXG4gICAgICAgIGlmICghZXF1YWwoYVtrZXldLCBiW2tleV0pKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGVuZCByZWFjdC1mYXN0LWNvbXBhcmVcblxuICAgIC8vIGZhc3QtZGVlcC1lcXVhbCBpbmRleC5qcyAyLjAuMVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGEgIT09IGEgJiYgYiAhPT0gYjtcbn1cbi8vIGVuZCBmYXN0LWRlZXAtZXF1YWxcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleHBvcnRlZEVxdWFsKGEsIGIpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZXF1YWwoYSwgYik7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKChlcnJvci5tZXNzYWdlICYmIGVycm9yLm1lc3NhZ2UubWF0Y2goL3N0YWNrfHJlY3Vyc2lvbi9pKSkgfHwgKGVycm9yLm51bWJlciA9PT0gLTIxNDY4MjgyNjApKSB7XG4gICAgICAvLyB3YXJuIG9uIGNpcmN1bGFyIHJlZmVyZW5jZXMsIGRvbid0IGNyYXNoXG4gICAgICAvLyBicm93c2VycyBnaXZlIHRoaXMgZGlmZmVyZW50IGVycm9ycyBuYW1lIGFuZCBtZXNzYWdlczpcbiAgICAgIC8vIGNocm9tZS9zYWZhcmk6IFwiUmFuZ2VFcnJvclwiLCBcIk1heGltdW0gY2FsbCBzdGFjayBzaXplIGV4Y2VlZGVkXCJcbiAgICAgIC8vIGZpcmVmb3g6IFwiSW50ZXJuYWxFcnJvclwiLCB0b28gbXVjaCByZWN1cnNpb25cIlxuICAgICAgLy8gZWRnZTogXCJFcnJvclwiLCBcIk91dCBvZiBzdGFjayBzcGFjZVwiXG4gICAgICBjb25zb2xlLndhcm4oJ1dhcm5pbmc6IHJlYWN0LWZhc3QtY29tcGFyZSBkb2VzIG5vdCBoYW5kbGUgY2lyY3VsYXIgcmVmZXJlbmNlcy4nLCBlcnJvci5uYW1lLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gc29tZSBvdGhlciBlcnJvci4gd2Ugc2hvdWxkIGRlZmluaXRlbHkga25vdyBhYm91dCB0aGVzZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgaXNFcXVhbCBmcm9tIFwicmVhY3QtZmFzdC1jb21wYXJlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltYWdlTWFwcGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0WydkcmF3cmVjdCcsICdkcmF3Y2lyY2xlJywgJ2RyYXdwb2x5JywgJ2luaXRDYW52YXMnLCAncmVuZGVyUHJlZmlsbGVkQXJlYXMnXS5mb3JFYWNoKGYgPT4gdGhpc1tmXSA9IHRoaXNbZl0uYmluZCh0aGlzKSk7XG5cdFx0bGV0IGFic1BvcyA9IHsgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogMCwgbGVmdDogMCB9O1xuXHRcdHRoaXMuc3R5bGVzID0ge1xuXHRcdFx0Y29udGFpbmVyOiB7IHBvc2l0aW9uOiAncmVsYXRpdmUnIH0sXG5cdFx0XHRjYW52YXM6IHsuLi5hYnNQb3MsIHBvaW50ZXJFdmVudHM6ICdub25lJywgekluZGV4OiAyIH0sXG5cdFx0XHRpbWc6IHsuLi5hYnNQb3MsIHpJbmRleDogMSwgdXNlclNlbGVjdDogJ25vbmUnIH0sXG5cdFx0XHRtYXA6IHByb3BzLm9uQ2xpY2sgJiYgeyBjdXJzb3I6ICdwb2ludGVyJyB9IHx8IHVuZGVmaW5lZFxuXHRcdH07XG5cdFx0Ly8gUHJvcHMgd2F0Y2hlZCBmb3IgY2hhbmdlcyB0byB0cmlnZ2VyIHVwZGF0ZVxuXHRcdHRoaXMud2F0Y2hlZFByb3BzID0gWyAnYWN0aXZlJywgJ2ZpbGxDb2xvcicsICdoZWlnaHQnLCAnaW1nV2lkdGgnLCAnbGluZVdpZHRoJywgJ3NyYycsICdzdHJva2VDb2xvcicsICd3aWR0aCcgXTtcblx0fVxuXG5cdHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMpIHtcblx0XHRjb25zdCBwcm9wQ2hhbmdlZCA9IHRoaXMud2F0Y2hlZFByb3BzLnNvbWUocHJvcCA9PsKgdGhpcy5wcm9wc1twcm9wXSAhPT0gbmV4dFByb3BzW3Byb3BdKTtcblx0XHRyZXR1cm4gIWlzRXF1YWwodGhpcy5wcm9wcy5tYXAsIHRoaXMuc3RhdGUubWFwKSB8fMKgcHJvcENoYW5nZWQ7XG5cdH1cblxuXHRjb21wb25lbnRXaWxsTW91bnQoKSB7XG5cdFx0dGhpcy51cGRhdGVDYWNoZU1hcCgpO1xuXHR9XG5cblx0dXBkYXRlQ2FjaGVNYXAoKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IG1hcDogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLnByb3BzLm1hcCkpIH0sIHRoaXMuaW5pdENhbnZhcyk7XG5cdH1cblxuXHRjb21wb25lbnREaWRVcGRhdGUoKSB7XG5cdFx0dGhpcy51cGRhdGVDYWNoZU1hcCgpO1xuXHRcdHRoaXMuaW5pdENhbnZhcygpO1xuXHR9XG5cblx0ZHJhd3JlY3QoY29vcmRzLCBmaWxsQ29sb3IpIHtcblx0XHRsZXQgW2xlZnQsIHRvcCwgcmlnaHQsIGJvdF0gPSBjb29yZHM7XG5cdFx0dGhpcy5jdHguZmlsbFN0eWxlID0gZmlsbENvbG9yO1xuXHRcdHRoaXMuY3R4LnN0cm9rZVJlY3QobGVmdCwgdG9wLCByaWdodCAtIGxlZnQsIGJvdCAtIHRvcCk7XG5cdFx0dGhpcy5jdHguZmlsbFJlY3QobGVmdCwgdG9wLCByaWdodCAtIGxlZnQsIGJvdCAtIHRvcCk7XG5cdFx0dGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5wcm9wcy5maWxsQ29sb3I7XG5cdH1cblxuXHRkcmF3Y2lyY2xlKGNvb3JkcywgZmlsbENvbG9yKSB7XG5cdFx0dGhpcy5jdHguZmlsbFN0eWxlID0gZmlsbENvbG9yO1xuXHRcdHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuXHRcdHRoaXMuY3R4LmFyYyhjb29yZHNbMF0sIGNvb3Jkc1sxXSwgY29vcmRzWzJdLCAwLCAyICogTWF0aC5QSSk7XG5cdFx0dGhpcy5jdHguY2xvc2VQYXRoKCk7XG5cdFx0dGhpcy5jdHguc3Ryb2tlKCk7XG5cdFx0dGhpcy5jdHguZmlsbCgpO1xuXHRcdHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMucHJvcHMuZmlsbENvbG9yO1xuXHR9XG5cblx0ZHJhd3BvbHkoY29vcmRzLCBmaWxsQ29sb3IpIHtcblx0XHRjb29yZHMgPSBjb29yZHMucmVkdWNlKChhLCB2LCBpLCBzKSA9PiAoaSAlIDIgPyBhIDogWy4uLmEsIHMuc2xpY2UoaSwgaSArIDIpXSksIFtdKTtcblx0XHR0aGlzLmN0eC5maWxsU3R5bGUgPSBmaWxsQ29sb3I7XG5cdFx0dGhpcy5jdHguYmVnaW5QYXRoKCk7XG5cdFx0bGV0IGZpcnN0ID0gY29vcmRzLnVuc2hpZnQoKTtcblx0XHR0aGlzLmN0eC5tb3ZlVG8oZmlyc3RbMF0sIGZpcnN0WzFdKTtcblx0XHRjb29yZHMuZm9yRWFjaChjID0+IHRoaXMuY3R4LmxpbmVUbyhjWzBdLCBjWzFdKSk7XG5cdFx0dGhpcy5jdHguY2xvc2VQYXRoKCk7XG5cdFx0dGhpcy5jdHguc3Ryb2tlKCk7XG5cdFx0dGhpcy5jdHguZmlsbCgpO1xuXHRcdHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMucHJvcHMuZmlsbENvbG9yO1xuXHR9XG5cblx0aW5pdENhbnZhcygpIHtcblx0XHRpZiAodGhpcy5wcm9wcy53aWR0aClcblx0XHRcdHRoaXMuaW1nLndpZHRoID0gdGhpcy5wcm9wcy53aWR0aDtcblxuXHRcdGlmICh0aGlzLnByb3BzLmhlaWdodClcblx0XHRcdHRoaXMuaW1nLmhlaWdodCA9IHRoaXMucHJvcHMuaGVpZ2h0O1xuXG5cdFx0dGhpcy5jYW52YXMud2lkdGggPSB0aGlzLnByb3BzLndpZHRoIHx8IHRoaXMuaW1nLmNsaWVudFdpZHRoO1xuXHRcdHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMucHJvcHMuaGVpZ2h0IHx8IHRoaXMuaW1nLmNsaWVudEhlaWdodDtcblx0XHR0aGlzLmNvbnRhaW5lci5zdHlsZS53aWR0aCA9ICh0aGlzLnByb3BzLndpZHRoIHx8IHRoaXMuaW1nLmNsaWVudFdpZHRoKSArICdweCc7XG5cdFx0dGhpcy5jb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gKHRoaXMucHJvcHMuaGVpZ2h0IHx8IHRoaXMuaW1nLmNsaWVudEhlaWdodCkgKyAncHgnO1xuXHRcdHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblx0XHR0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLnByb3BzLmZpbGxDb2xvcjtcblx0XHR0aGlzLmN0eC5zdHJva2VTdHlsZSA9IHRoaXMucHJvcHMuc3Ryb2tlQ29sb3I7XG5cdFx0dGhpcy5jdHgubGluZVdpZHRoID0gdGhpcy5wcm9wcy5saW5lV2lkdGg7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5vbkxvYWQpXG5cdFx0XHR0aGlzLnByb3BzLm9uTG9hZCgpO1xuXG5cdFx0dGhpcy5yZW5kZXJQcmVmaWxsZWRBcmVhcygpO1xuXHR9XG5cblx0aG92ZXJPbihhcmVhLCBpbmRleCwgZXZlbnQpIHtcblx0XHRjb25zdCBzaGFwZSA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ3NoYXBlJyk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5hY3RpdmUgJiYgdGhpc1snZHJhdycgKyBzaGFwZV0pXG5cdFx0XHR0aGlzWydkcmF3JyArIHNoYXBlXShldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdjb29yZHMnKS5zcGxpdCgnLCcpLCBhcmVhLmZpbGxDb2xvcik7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5vbk1vdXNlRW50ZXIpXG5cdFx0XHR0aGlzLnByb3BzLm9uTW91c2VFbnRlcihhcmVhLCBpbmRleCwgZXZlbnQpO1xuXHR9XG5cblx0aG92ZXJPZmYoYXJlYSwgaW5kZXgsIGV2ZW50KSB7XG5cdFx0aWYgKHRoaXMucHJvcHMuYWN0aXZlKSB7XG5cdFx0XHR0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG5cdFx0XHR0aGlzLnJlbmRlclByZWZpbGxlZEFyZWFzKCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMucHJvcHMub25Nb3VzZUxlYXZlKVxuXHRcdFx0dGhpcy5wcm9wcy5vbk1vdXNlTGVhdmUoYXJlYSwgaW5kZXgsIGV2ZW50KTtcblx0fVxuXG5cdGNsaWNrKGFyZWEsIGluZGV4LCBldmVudCkge1xuXHRcdGlmICh0aGlzLnByb3BzLm9uQ2xpY2spIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0aGlzLnByb3BzLm9uQ2xpY2soYXJlYSwgaW5kZXgsIGV2ZW50KTtcblx0XHR9XG5cdH1cblxuXHRpbWFnZUNsaWNrKGV2ZW50KSB7XG5cdFx0aWYgKHRoaXMucHJvcHMub25JbWFnZUNsaWNrKSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy5wcm9wcy5vbkltYWdlQ2xpY2soZXZlbnQpO1xuXHRcdH1cblx0fVxuXG5cdG1vdXNlTW92ZShhcmVhLCBpbmRleCwgZXZlbnQpIHtcblx0XHRpZiAodGhpcy5wcm9wcy5vbk1vdXNlTW92ZSkge1xuXHRcdFx0dGhpcy5wcm9wcy5vbk1vdXNlTW92ZShhcmVhLCBpbmRleCwgZXZlbnQpO1xuXHRcdH1cblx0fVxuXG5cdGltYWdlTW91c2VNb3ZlKGFyZWEsIGluZGV4LCBldmVudCkge1xuXHRcdGlmICh0aGlzLnByb3BzLm9uSW1hZ2VNb3VzZU1vdmUpIHtcblx0XHRcdHRoaXMucHJvcHMub25JbWFnZU1vdXNlTW92ZShhcmVhLCBpbmRleCwgZXZlbnQpO1xuXHRcdH1cblx0fVxuXG5cdHNjYWxlQ29vcmRzKGNvb3Jkcykge1xuXHRcdGNvbnN0IHsgaW1nV2lkdGgsIHdpZHRoIH0gPSB0aGlzLnByb3BzO1xuXHRcdC8vIGNhbGN1bGF0ZSBzY2FsZSBiYXNlZCBvbiBjdXJyZW50ICd3aWR0aCcgYW5kIHRoZSBvcmlnaW5hbCAnaW1nV2lkdGgnXG5cdFx0Y29uc3Qgc2NhbGUgPSB3aWR0aCAmJiBpbWdXaWR0aCAmJiBpbWdXaWR0aCA+IDAgPyB3aWR0aCAvIGltZ1dpZHRoIDogMTtcblx0XHRyZXR1cm4gY29vcmRzLm1hcChjb29yZCA9PiBjb29yZCAqIHNjYWxlKTtcblx0fVxuXG5cdHJlbmRlclByZWZpbGxlZEFyZWFzKCkge1xuXHRcdHRoaXMuc3RhdGUubWFwLmFyZWFzLm1hcCgoYXJlYSkgPT4ge1xuXHRcdFx0aWYgKCFhcmVhLnByZUZpbGxDb2xvcikgcmV0dXJuO1xuXHRcdFx0dGhpc1snZHJhdycgKyBhcmVhLnNoYXBlXSh0aGlzLnNjYWxlQ29vcmRzKGFyZWEuY29vcmRzKSwgYXJlYS5wcmVGaWxsQ29sb3IpO1xuXHRcdH0pO1xuXHR9XG5cblx0Y29tcHV0ZUNlbnRlcihhcmVhKSB7XG5cdFx0aWYgKCFhcmVhKSByZXR1cm4gWzAsIDBdO1xuXG5cdFx0Y29uc3Qgc2NhbGVkQ29vcmRzID0gdGhpcy5zY2FsZUNvb3JkcyhhcmVhLmNvb3Jkcyk7XG5cblx0XHRzd2l0Y2ggKGFyZWEuc2hhcGUpIHtcblx0XHRcdGNhc2UgXCJjaXJjbGVcIjogcmV0dXJuIFtzY2FsZWRDb29yZHNbMF0sIHNjYWxlZENvb3Jkc1sxXV07XG5cdFx0XHRjYXNlIFwicG9seVwiOlxuXHRcdFx0Y2FzZSBcInJlY3RcIjpcblx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0Ly8gQ2FsY3VsYXRlIGNlbnRyb2lkXG5cdFx0XHRcdGNvbnN0IG4gPSBzY2FsZWRDb29yZHMubGVuZ3RoIC8gMjtcblx0XHRcdFx0Y29uc3Qge8KgeSwgeCB9ID0gc2NhbGVkQ29vcmRzLnJlZHVjZSgoeyB5LCB4IH0sIHZhbCwgaWR4KSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuICEoaWR4ICUgMikgPyB7IHksIHg6IHggKyAodmFsIC8gbikgfSA6IHsgeTogeSArICh2YWwgLyBuKSwgeCB9O1xuXHRcdFx0XHR9LCB7IHk6IDAsIHg6IDAgfSk7XG5cdFx0XHRcdHJldHVybiBbeCwgeV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyQXJlYXMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUubWFwLmFyZWFzLm1hcCgoYXJlYSwgaW5kZXgpID0+IHtcblx0XHRcdGNvbnN0IHNjYWxlZENvb3JkcyA9IHRoaXMuc2NhbGVDb29yZHMoYXJlYS5jb29yZHMpO1xuXHRcdFx0Y29uc3QgY2VudGVyID0gdGhpcy5jb21wdXRlQ2VudGVyKGFyZWEpO1xuXHRcdFx0Y29uc3QgZXh0ZW5kZWRBcmVhID0geyAuLi5hcmVhLCBzY2FsZWRDb29yZHMsIGNlbnRlciB9O1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGFyZWEga2V5PXthcmVhLl9pZCB8fCBpbmRleH0gc2hhcGU9e2FyZWEuc2hhcGV9IGNvb3Jkcz17c2NhbGVkQ29vcmRzLmpvaW4oJywnKX1cblx0XHRcdFx0XHRvbk1vdXNlRW50ZXI9e3RoaXMuaG92ZXJPbi5iaW5kKHRoaXMsIGV4dGVuZGVkQXJlYSwgaW5kZXgpfVxuXHRcdFx0XHRcdG9uTW91c2VMZWF2ZT17dGhpcy5ob3Zlck9mZi5iaW5kKHRoaXMsIGV4dGVuZGVkQXJlYSwgaW5kZXgpfVxuXHRcdFx0XHRcdG9uTW91c2VNb3ZlPXt0aGlzLm1vdXNlTW92ZS5iaW5kKHRoaXMsIGV4dGVuZGVkQXJlYSwgaW5kZXgpfVxuXHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuY2xpY2suYmluZCh0aGlzLCBleHRlbmRlZEFyZWEsIGluZGV4KX0gaHJlZj17YXJlYS5ocmVmfSAvPlxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBzdHlsZT17dGhpcy5zdHlsZXMuY29udGFpbmVyfSByZWY9e25vZGUgPT4gdGhpcy5jb250YWluZXIgPSBub2RlfT5cblx0XHRcdFx0PGltZyBzdHlsZT17dGhpcy5zdHlsZXMuaW1nfSBzcmM9e3RoaXMucHJvcHMuc3JjfSB1c2VNYXA9e2AjJHt0aGlzLnN0YXRlLm1hcC5uYW1lfWB9IGFsdD1cIlwiXG5cdFx0XHRcdFx0IHJlZj17bm9kZSA9PiB0aGlzLmltZyA9IG5vZGV9IG9uTG9hZD17dGhpcy5pbml0Q2FudmFzfVxuXHRcdFx0XHRcdCBvbkNsaWNrPXt0aGlzLmltYWdlQ2xpY2suYmluZCh0aGlzKX1cblx0XHRcdFx0XHQgb25Nb3VzZU1vdmU9e3RoaXMuaW1hZ2VNb3VzZU1vdmUuYmluZCh0aGlzKX0vPlxuXHRcdFx0XHQ8Y2FudmFzIHJlZj17bm9kZSA9PiB0aGlzLmNhbnZhcyA9IG5vZGV9IHN0eWxlPXt0aGlzLnN0eWxlcy5jYW52YXN9IC8+XG5cdFx0XHRcdDxtYXAgbmFtZT17dGhpcy5zdGF0ZS5tYXAubmFtZX0gc3R5bGU9e3RoaXMuc3R5bGVzLm1hcH0+eyB0aGlzLnJlbmRlckFyZWFzKCkgfTwvbWFwPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5JbWFnZU1hcHBlci5kZWZhdWx0UHJvcHMgPSB7XG5cdGFjdGl2ZTogdHJ1ZSxcblx0ZmlsbENvbG9yOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpJyxcblx0bGluZVdpZHRoOiAxLFxuXHRtYXA6IHtcblx0XHRhcmVhczogW10sXG5cdFx0bmFtZTogJ2ltYWdlLW1hcC0nICsgTWF0aC5yYW5kb20oKSxcblx0fSxcblx0c3Ryb2tlQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuNSknLFxufTtcblxuSW1hZ2VNYXBwZXIucHJvcFR5cGVzID0ge1xuXHRhY3RpdmU6IFByb3BUeXBlcy5ib29sLFxuXHRmaWxsQ29sb3I6IFByb3BUeXBlcy5zdHJpbmcsXG5cdGhlaWdodDogUHJvcFR5cGVzLm51bWJlcixcblx0aW1nV2lkdGg6IFByb3BUeXBlcy5udW1iZXIsXG5cdGxpbmVXaWR0aDogUHJvcFR5cGVzLm51bWJlcixcblx0c3JjOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cdHN0cm9rZUNvbG9yOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHR3aWR0aDogUHJvcFR5cGVzLm51bWJlcixcblxuXHRvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcblx0b25Nb3VzZU1vdmU6IFByb3BUeXBlcy5mdW5jLFxuXHRvbkltYWdlQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuXHRvbkltYWdlTW91c2VNb3ZlOiBQcm9wVHlwZXMuZnVuYyxcblx0b25Mb2FkOiBQcm9wVHlwZXMuZnVuYyxcblx0b25Nb3VzZUVudGVyOiBQcm9wVHlwZXMuZnVuYyxcblx0b25Nb3VzZUxlYXZlOiBQcm9wVHlwZXMuZnVuYyxcblxuXHRtYXA6IFByb3BUeXBlcy5zaGFwZSh7XG5cdFx0YXJlYXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG5cdFx0XHRhcmVhOiBQcm9wVHlwZXMuc2hhcGUoe1xuXHRcdFx0XHRjb29yZHM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpLFxuXHRcdFx0XHRocmVmOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdFx0XHRzaGFwZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRcdFx0cHJlRmlsbENvbG9yOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdFx0XHRmaWxsQ29sb3I6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0XHR9KVxuXHRcdH0pKSxcblx0XHRuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHR9KSxcbn07XG4iXX0=
    
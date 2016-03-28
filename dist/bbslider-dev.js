;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.BBSlider = factory();
  }
}(this, function () {
  // browserify module start
  (function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.BBSlider = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _modulesBar = require('./modules/bar');

var _modulesBar2 = _interopRequireDefault(_modulesBar);

var BBSlider = (function () {
  // This class handles all public api.

  function BBSlider() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, BBSlider);

    this._validateOptions(options);
    this._bar = new _modulesBar2['default'](options);

    this.el = document.createElement('div');
    this.el.className = 'bbslider-slider';
    this.el.appendChild(this._bar.el);
  }

  _createClass(BBSlider, [{
    key: '_validateOptions',
    value: function _validateOptions(options) {
      var _arr = ['min', 'max', 'step'];

      for (var _i = 0; _i < _arr.length; _i++) {
        var key = _arr[_i];
        var value = options[key];
        if (value === undefined) {
          throw new Error(key + ' option is mandatory');
        }
        if (!Number.isInteger(value)) {
          throw new Error(key + ' option should be integer');
        }
      }
      if (options.max <= options.min) {
        throw new Error('max should be greater than min');
      }
      if ((options.max - options.min) % options.step !== 0) {
        throw new Error('there should be an integer number of steps between min and max');
      }

      if (options.maxRanges !== undefined) {
        if (!Number.isInteger(options.maxRanges)) {
          throw new Error('maxRanges should be integer');
        }
      }

      if ([true, false, undefined].indexOf(options.readOnly) === -1) {
        throw new Error('readOnly option should be true, false or undefined');
      }
    }
  }, {
    key: '_validateRangeValue',
    value: function _validateRangeValue(value, options) {
      if (!Array.isArray(value) || value.length != 2) {
        throw Error;
      }
    }
  }, {
    key: '_validateValue',
    value: function _validateValue(value, options) {
      if (!Array.isArray(value)) {
        throw Error;
      }
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = value[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var range_value = _step.value;

          this._validateRangeValue(range_value);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'addRange',
    value: function addRange(value, options) {
      options = Object.assign({}, options);
      this._validateRangeValue(value, options);

      if (options.id !== undefined && this._bar.rangeList.find(function (x) {
        return x.id === options.id;
      })) {
        throw new Error('range with this id already exists');
      }
      if (this._bar.isInsideRange(value[0]) || this._bar.isInsideRange(value[1])) {
        throw new Error('intersection');
      }
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this._bar.rangeList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var range = _step2.value;

          if (value[0] <= range.left && range.right <= value[1]) {
            throw new Error('intersection');
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return this._bar.addRange(value, options);
    }
  }, {
    key: 'removeRange',
    value: function removeRange(options) {
      if (typeof options !== 'object') {
        throw new Error('wrong data');
      }
      if (options.id === undefined) {
        throw new Error('wrong data');
      }
      return this._bar.removeRange(options);
    }
  }, {
    key: 'rangeValue',
    value: function rangeValue(rangeId, value) {
      if (!Number.isInteger(rangeId)) {
        throw 'rangeId should be integer';
      }
      var range = this._bar.rangeList.find(function (x) {
        return x.id === rangeId;
      });
      if (!range) {
        return false;
      }
      if (value === undefined) {
        return range.getValue();
      } else {
        return range.setValue(value);
      }
    }
  }, {
    key: 'val',
    value: function val() {
      return this._bar.getValue();
    }
  }, {
    key: 'data',
    value: function data() {
      var rangeList = [];
      var totalLength = 0;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this._bar.rangeList[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var range = _step3.value;

          var value = range.getValue();
          totalLength += value[1] - value[0];
          rangeList.push({
            id: range.id,
            val: value
          });
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3['return']) {
            _iterator3['return']();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return {
        totalLength: totalLength,
        rangeList: rangeList
      };
    }
  }, {
    key: 'on',
    value: function on(subject, cb) {
      this._bar.emitter.addListener(subject, cb);
    }
  }, {
    key: 'off',
    value: function off(subject, cb) {
      this._bar.emitter.removeListener(subject, cb);
    }
  }]);

  return BBSlider;
})();

exports['default'] = BBSlider;
module.exports = exports['default'];

},{"./modules/bar":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ghost = require('./ghost');

var _ghost2 = _interopRequireDefault(_ghost);

var _range = require('./range');

var _range2 = _interopRequireDefault(_range);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _emitter = require('./emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _utils = require('./utils');

var Bar = (function (_Base) {
  _inherits(Bar, _Base);

  function Bar() {
    var _this = this;

    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Bar);

    _get(Object.getPrototypeOf(Bar.prototype), 'constructor', this).call(this);
    this.options = Object.assign({
      allowRemove: false,
      maxRanges: Infinity,
      ghostLabel: function ghostLabel(value) {
        return '+';
      },
      rangeLabel: function rangeLabel(value) {
        return value[0].toString() + '-' + value[1].toString();
      }
    }, options);

    this.el = document.createElement('div');
    this.el.className = 'bbslider-bar';
    if (this.options.readOnly === true) {
      (0, _utils.addClass)(this.el, 'bbslider-readonly');
    }
    this.el.addEventListener('mousemove', function (event) {
      return _this.mousemove(event);
    });
    this.el.addEventListener('mouseleave', function (event) {
      return _this.mouseleave(event);
    });
    this.el.addEventListener('mouseup', function (event) {
      return _this.mouseup(event);
    });
    this.el.addEventListener('mousedown', function (event) {
      return _this.mousedown(event);
    });
    this.el.ondragstart = function () {
      return false;
    };

    this.rangeIdCount = 0;
    this.rangeList = [];

    this.emitter = new _emitter2['default']();
  }

  _createClass(Bar, [{
    key: 'getRangeId',
    value: function getRangeId() {
      // Just return some unique number
      this.rangeIdCount += 1;
      return this.rangeIdCount;
    }
  }, {
    key: 'addRange',
    value: function addRange(value, options) {
      var _this2 = this;

      if (this.rangeList.length >= this.options.maxRanges) {
        return false;
      }
      options = Object.assign({
        id: this.getRangeId()
      }, options);
      options.bar = this;
      var range = new _range2['default'](options);
      this.el.appendChild(range.el);

      range.setValue(value);
      this.rangeList.push(range);
      this.removeGhost();

      var rangeId = range.id;

      range.emitter.addListener('range:remove', function (options) {
        _this2.removeRange({ id: rangeId });
        _this2.emitter.emit('range:remove', {
          rangeId: rangeId,
          val: _this2.getValue()
        });
        _this2.emitter.emit('change', {
          rangeId: rangeId,
          val: _this2.getValue()
        });
      });

      range.emitter.addListener('range:changing', function (options) {
        _this2.emitter.emit('changing', {
          rangeId: rangeId,
          val: _this2.getValue()
        });
        _this2.emitter.emit('range:changing', options);
      });

      range.emitter.addListener('range:change', function (options) {
        _this2.emitter.emit('change', {
          rangeId: rangeId,
          val: _this2.getValue()
        });
        _this2.emitter.emit('range:change', options);
      });

      range.emitter.addListener('range:click', function (options) {
        _this2.emitter.emit('range:click', options);
      });

      this.emitter.emit('change', {
        rangeId: rangeId,
        val: this.getValue()
      });
      this.emitter.emit('changing', {
        rangeId: rangeId,
        val: this.getValue()
      });

      return range;
    }
  }, {
    key: 'removeRange',
    value: function removeRange(options) {
      var range = this.rangeList.find(function (x) {
        return x.id == options.id;
      });
      if (range) {
        range.removeEvents();
        this.el.removeChild(range.el);
        this.rangeList = this.rangeList.filter(function (x) {
          return x.id !== options.id;
        });
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'removeGhost',
    value: function removeGhost() {
      if (this.ghost) {
        this.ghost.removeEvents();
        this.el.removeChild(this.ghost.el);
        delete this.ghost;
      }
    }
  }, {
    key: 'mousedown',
    value: function mousedown(event) {}
  }, {
    key: 'mouseup',
    value: function mouseup(event) {
      if (this.ghost) {
        this.addRange([this.ghost.left, this.ghost.right]);
      }
    }
  }, {
    key: 'mouseleave',
    value: function mouseleave(event) {
      this.removeGhost();
    }
  }, {
    key: 'isInsideRange',
    value: function isInsideRange(cursor) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.rangeList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var range = _step.value;

          if (range.left < cursor && cursor < range.right) {
            return true;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    }
  }, {
    key: 'mousemove',
    value: function mousemove(event) {
      if (this.ghost) {
        return;
      }
      if (this.options.readOnly) {
        return;
      }
      if (this.rangeList.length >= this.options.maxRanges) {
        return;
      }
      if (this.rangeList.filter(function (x) {
        return x.pressed;
      }).length > 0) {
        return;
      }

      var cursor = this.getCursor(event);
      if (this.isInsideRange(cursor)) {
        return;
      }

      this.ghost = new _ghost2['default']({ bar: this });
      this.el.appendChild(this.ghost.el);
      var left = this.roundUserValue(cursor);
      this.ghost.setValue([left, left + this.options.step]);
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      var result = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.rangeList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var range = _step2.value;

          var value = range.getValue();
          result.push(value);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return result;
    }
  }]);

  return Bar;
})(_base2['default']);

exports['default'] = Bar;
module.exports = exports['default'];

},{"./base":3,"./emitter":4,"./ghost":5,"./range":6,"./utils":7}],3:[function(require,module,exports){
//http://stackoverflow.com/a/850995/752397
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function isInDOMTree(node) {
  return !!findUltimateAncestor(node).body;
}
function findUltimateAncestor(node) {
  var ancestor = node;
  while (ancestor.parentNode) {
    ancestor = ancestor.parentNode;
  }
  return ancestor;
}

var Base = (function () {
  function Base() {
    _classCallCheck(this, Base);
  }

  _createClass(Base, [{
    key: 'pixelToUnit',

    // This class contains methods to calculate different measurements for Bar class
    value: function pixelToUnit(value) {
      if (!isInDOMTree(this.el)) {
        throw new Error('element is not in dom!');
      }
      var rect = this.el.getBoundingClientRect();
      var width = rect.width;
      if (width == 0) {
        throw new Error('element width is 0 or element is not attached to dom');
      }
      return value / width;
    }
  }, {
    key: 'unitToPixel',
    value: function unitToPixel(value) {
      var rect = this.el.getBoundingClientRect();
      var width = rect.width;
      return value * width;
    }
  }, {
    key: 'unitToUser',
    value: function unitToUser(value) {
      return (this.options.max - this.options.min) * value + this.options.min;
    }
  }, {
    key: 'userToUnit',
    value: function userToUnit(value) {
      return (value - this.options.min) / (this.options.max - this.options.min);
    }
  }, {
    key: 'roundUserValue',
    value: function roundUserValue(value) {
      return this.options.min + Math.floor((value - this.options.min) / this.options.step) * this.options.step;
    }
  }, {
    key: 'getCursor',
    value: function getCursor(event) {
      // event is mousemove event
      // returns unitValue of place where the event has been made

      var rect = this.el.getBoundingClientRect();
      var x = event.clientX - rect.left;
      return this.unitToUser(this.pixelToUnit(x));
    }
  }]);

  return Base;
})();

exports['default'] = Base;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
//https://gist.github.com/datchley/37353d6a2cb629687eb9

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var isFunction = function isFunction(obj) {
  return typeof obj == 'function' || false;
};

var Emitter = (function () {
  function Emitter() {
    _classCallCheck(this, Emitter);

    this.listeners = new Map();
  }

  _createClass(Emitter, [{
    key: 'addListener',
    value: function addListener(label, callback) {
      this.listeners.has(label) || this.listeners.set(label, []);
      this.listeners.get(label).push(callback);
    }
  }, {
    key: 'removeListener',
    value: function removeListener(label, callback) {
      var listeners = this.listeners.get(label),
          index = undefined;

      if (listeners && listeners.length) {
        index = listeners.reduce(function (i, listener, index) {
          return isFunction(listener) && listener === callback ? i = index : i;
        }, -1);

        if (index > -1) {
          listeners.splice(index, 1);
          this.listeners.set(label, listeners);
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'emit',
    value: function emit(label) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var listeners = this.listeners.get(label);

      if (listeners && listeners.length) {
        listeners.forEach(function (listener) {
          listener.apply(undefined, args);
        });
        return true;
      }
      return false;
    }
  }]);

  return Emitter;
})();

exports['default'] = Emitter;
module.exports = exports['default'];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _emitter = require('./emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var Ghost = (function () {
  function Ghost(options) {
    var _this = this;

    _classCallCheck(this, Ghost);

    this.bar = options.bar;

    this.el = document.createElement('div');
    this.el.className = 'bbslider-ghost';

    this.label = document.createElement('div');
    this.label.className = 'bbslider-label';
    this.el.appendChild(this.label);

    this.pressed = false;

    this._mousemove = function (event) {
      return _this.mousemove(event);
    };
    this._mousedown = function (event) {
      return _this.mousedown(event);
    };
    this._mouseup = function (event) {
      return _this.mouseup(event);
    };

    this.bar.el.addEventListener('mousemove', this._mousemove);
    this.bar.el.addEventListener('mousedown', this._mousedown);
    this.bar.el.addEventListener('mouseup', this._mouseup);
  }

  _createClass(Ghost, [{
    key: 'removeEvents',
    value: function removeEvents() {
      this.bar.el.removeEventListener('mousemove', this._mousemove);
      this.bar.el.removeEventListener('mousedown', this._mousedown);
      this.bar.el.removeEventListener('mouseup', this._mouseup);
    }
  }, {
    key: 'mousedown',
    value: function mousedown(event) {
      if ([this.el, this.label].indexOf(event.target) !== -1) {
        this.pressed = true;
      }
    }
  }, {
    key: 'mouseup',
    value: function mouseup(event) {
      this.pressed = false;
    }
  }, {
    key: 'mousemove',
    value: function mousemove(event) {
      var cursor = this.bar.getCursor(event);

      if (this.bar.isInsideRange(cursor) && !this.pressed) {
        this.bar.removeGhost();
      }

      cursor = this.bar.roundUserValue(cursor);
      var left = this.left;
      var right = this.right;

      if (this.pressed) {
        if (cursor <= left) {
          left = cursor;
        } else {
          right = cursor + this.bar.options.step;
        }
      } else {
        left = cursor;
        right = cursor + this.bar.options.step;
      }

      if (this.bar.options.max < right) {
        right = this.bar.options.max;
        if (right - left < this.bar.options.step) {
          left = this.bar.options.max - this.bar.options.step;
        }
      }

      if (this.bar.options.min > left) {
        left = this.bar.options.min;
        if (right - left < this.bar.options.step) {
          right = this.bar.options.min + this.bar.options.step;
        }
      }

      if (this.bar.isInsideRange(left) || this.bar.isInsideRange(right)) {
        if (!this.pressed) {
          this.bar.removeGhost();
        }
      } else {
        this.setValue([left, right]);
      }
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      this.left = value[0];
      this.right = value[1];
      var pixelLeft = parseInt(this.bar.unitToPixel(this.bar.userToUnit(this.left)));
      var pixelRight = parseInt(this.bar.unitToPixel(this.bar.userToUnit(this.right)));
      this.el.style.left = pixelLeft + 'px';
      this.el.style.width = pixelRight - pixelLeft + 'px';
      this.label.innerHTML = this.bar.options.ghostLabel(value);
    }
  }]);

  return Ghost;
})();

exports['default'] = Ghost;
module.exports = exports['default'];

},{"./emitter":4}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utils = require('./utils');

var _emitter = require('./emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var Range = (function () {
  function Range(options) {
    var _this = this;

    _classCallCheck(this, Range);

    this.bar = options.bar;
    this.id = options.id;

    this.el = document.createElement('div');
    this.el.className = 'bbslider-range';

    this.label = document.createElement('div');
    this.label.className = 'bbslider-label';
    this.el.appendChild(this.label);

    this.right_handler = document.createElement('div');
    this.right_handler.className = 'bbslider-right-handler';
    this.el.appendChild(this.right_handler);

    this.left_handler = document.createElement('div');
    this.left_handler.className = 'bbslider-left-handler';
    this.el.appendChild(this.left_handler);

    this.pressed = false;
    this.isRemoving = false;

    this._mousemove = function (event) {
      return _this.mousemove(event);
    };
    this._mouseup = function (event) {
      return _this.mouseup(event);
    };
    this._mousedown = function (event) {
      return _this.mousedown(event);
    };

    document.addEventListener('mousemove', this._mousemove);
    this.bar.el.addEventListener('mousedown', this._mousedown);
    document.addEventListener('mouseup', this._mouseup);
    this.el.ondragstart = function () {
      return false;
    };

    this.emitter = new _emitter2['default']();
  }

  _createClass(Range, [{
    key: 'removeEvents',
    value: function removeEvents() {
      this.bar.el.removeEventListener('mousedown', this._mousedown);
      document.removeEventListener('mousemove', this._mousemove);
      document.removeEventListener('mouseup', this._mouseup);
    }
  }, {
    key: 'mousedown',
    value: function mousedown(event) {
      if (this.bar.options.readOnly) {
        return;
      }
      if ([this.el, this.label].indexOf(event.target) !== -1) {
        this.pressed = true;
        this.pressedMode = 'this';
      }
      if (event.target == this.right_handler) {
        this.pressed = true;
        this.pressedMode = 'right';
      }
      if (event.target == this.left_handler) {
        this.pressed = true;
        this.pressedMode = 'left';
      }

      if (this.pressed) {
        (0, _utils.addClass)(this.el, 'bbslider-pressed');
        (0, _utils.addClass)(this.el, 'bbslider-pressed-' + this.pressedMode);
        this.pressedPosition = this.bar.roundUserValue(this.bar.getCursor(event));
        this.emitter.emit('range:click', {
          id: this.id
        });
      }
    }
  }, {
    key: 'renderRemovePopup',
    value: function renderRemovePopup() {
      this.isRemoving = true;
      (0, _utils.addClass)(this.el, 'bbslider-is-removing');

      this.elRemovePopup = document.createElement('div');
      this.elRemovePopup.innerHTML = '×';
      this.elRemovePopup.className = 'bbslider-remove-popup';

      this.el.appendChild(this.elRemovePopup);
    }
  }, {
    key: 'removeRemovingPopup',
    value: function removeRemovingPopup() {
      this.isRemoving = false;
      (0, _utils.removeClass)(this.el, 'bbslider-is-removing');

      this.el.removeChild(this.elRemovePopup);
    }
  }, {
    key: 'mousemove',
    value: function mousemove(event) {
      if (this.pressed) {
        var cursor = this.bar.getCursor(event);
        var difference = cursor - this.pressedPosition;
        var roundDifference = this.bar.roundUserValue(difference);

        if (roundDifference == 0) {
          return;
        }

        var newRight = this.right;
        var newLeft = this.left;

        if (this.pressedMode == 'this') {
          newRight += roundDifference;
          newLeft += roundDifference;
        }
        if (this.pressedMode == 'right') {
          newRight += roundDifference;
        }
        if (this.pressedMode == 'left') {
          newLeft += roundDifference;
        }

        if (newRight < newLeft) {
          return;
        }

        if (this.bar.options.allowRemove) {
          if (newRight == newLeft) {
            if (!this.isRemoving) {
              this.renderRemovePopup();
            }
          } else {
            if (this.isRemoving) {
              this.removeRemovingPopup();
            }
          }
        } else {
          if (newRight == newLeft) {
            return;
          }
        }

        if (newLeft < this.bar.options.min) {
          return;
        }
        if (newRight > this.bar.options.max) {
          return;
        }

        var intersection = false;

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.bar.rangeList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var range = _step.value;

            if (intersection) {
              break;
            }
            if (range == this) {
              continue;
            }
            if (range.left < newRight && newRight <= range.right) {
              intersection = true;
            }
            if (range.left <= newLeft && newLeft < range.right) {
              intersection = true;
            }
            if (newLeft <= range.left && range.right <= newRight) {
              intersection = true;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (intersection) {
          return;
        }
        this.pressedPosition += roundDifference;
        this.setValue([newLeft, newRight]);
        this.emitter.emit('range:changing', {
          id: this.id,
          val: this.getValue()
        });
      }
    }
  }, {
    key: 'mouseup',
    value: function mouseup(event) {
      this.pressed = false;
      if (this.isRemoving) {
        this.removeRemovingPopup();
        this.emitter.emit('range:remove', {
          id: this.id
        });
      }
      this.pressedPosition = undefined;
      (0, _utils.removeClass)(this.el, 'bbslider-pressed');
      (0, _utils.removeClass)(this.el, 'bbslider-pressed-' + this.pressedMode);
      if ([this.el, this.left_handler, this.right_handler, this.label].indexOf(event.target) === -1) {
        return;
      }
      this.emitter.emit('range:change', {
        id: this.id,
        val: this.getValue()
      });
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      this.left = value[0];
      this.right = value[1];
      var pixelLeft = parseInt(this.bar.unitToPixel(this.bar.userToUnit(this.left)));
      var pixelRight = parseInt(this.bar.unitToPixel(this.bar.userToUnit(this.right)));
      this.el.style.left = pixelLeft + 'px';
      this.el.style.width = pixelRight - pixelLeft + 'px';
      this.label.innerHTML = this.bar.options.rangeLabel(value, this.data());
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return [this.left, this.right];
    }
  }, {
    key: 'data',
    value: function data() {
      return {
        id: this.id,
        val: this.getValue()
      };
    }
  }]);

  return Range;
})();

exports['default'] = Range;
module.exports = exports['default'];

},{"./emitter":4,"./utils":7}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var hasClass = function hasClass(elem, className) {
  return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
};

var addClass = function addClass(elem, className) {
  if (!hasClass(elem, className)) {
    elem.className += ' ' + className;
  }
};

var removeClass = function removeClass(elem, className) {
  var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
  if (hasClass(elem, className)) {
    while (newClass.indexOf(' ' + className + ' ') >= 0) {
      newClass = newClass.replace(' ' + className + ' ', ' ');
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  }
};

exports.hasClass = hasClass;
exports.addClass = addClass;
exports.removeClass = removeClass;

},{}]},{},[1])(1)
});
  // browserify module finish
  return BBSlider;
}));
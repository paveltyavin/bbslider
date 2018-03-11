(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.multirangeslider = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _modulesBar = _dereq_('./modules/bar');

var _modulesBar2 = _interopRequireDefault(_modulesBar);

var multirangeslider = (function () {
  // This class handles all public api.

  function multirangeslider() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, multirangeslider);

    options = this._transformOptions(options);
    this._validateOptions(options);
    this._bar = new _modulesBar2['default'](options);

    this.el = document.createElement('div');
    this.el.className = 'multirangeslider-slider';
    this.el.appendChild(this._bar.el);
  }

  _createClass(multirangeslider, [{
    key: '_transformOptions',
    value: function _transformOptions(options) {
      if (options.valueParse) {
        var _arr = ['min', 'max', 'step', 'minWidth'];

        for (var _i = 0; _i < _arr.length; _i++) {
          var key = _arr[_i];
          options[key] = options.valueParse(options[key]);
        }
      }
      return options;
    }
  }, {
    key: '_validateOptions',
    value: function _validateOptions(options) {
      var _arr2 = ['min', 'max', 'step'];

      for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
        var key = _arr2[_i2];
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

      if (options.minWidth === undefined) {
        options.minWidth = options.step;
      }
      if (options.minWidth % options.step !== 0) {
        throw new Error('there should be an integer number of steps in minWidth');
      }

      if (options.maxRanges !== undefined) {
        if (!Number.isInteger(options.maxRanges)) {
          throw new Error('maxRanges should be integer');
        }
      }

      var _arr3 = ['allowChange', 'allowAdd', 'allowRemove'];
      for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
        var key = _arr3[_i3];
        var value = options[key];
        if ([true, false, undefined].indexOf(value) === -1) {
          throw new Error(key + ' option should be true, false or undefined');
        }
      }
    }
  }, {
    key: '_transformValue',
    value: function _transformValue(value) {
      if (this._bar.options.valueParse) {
        value = value.map(this._bar.options.valueParse);
      }
      return value;
    }
  }, {
    key: '_validateValue',
    value: function _validateValue(value) {
      if (!Array.isArray(value) || value.length != 2) {
        throw Error;
      }
    }
  }, {
    key: 'add',
    value: function add(value, options) {
      options = Object.assign({}, options);
      value = this._transformValue(value);
      this._validateValue(value);

      if (options.id !== undefined && this._bar.rangeList.find(function (x) {
        return x.id === options.id;
      })) {
        throw new Error('range with this id already exists');
      }
      if (this._bar.getInsideRange(value[0]) || this._bar.getInsideRange(value[1])) {
        throw new Error('intersection');
      }
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._bar.rangeList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var range = _step.value;

          if (value[0] <= range.left && range.right <= value[1]) {
            throw new Error('intersection');
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

      return this._bar.add(value, options);
    }
  }, {
    key: 'remove',
    value: function remove(rangeId) {
      if (!Number.isInteger(rangeId)) {
        throw new Error('wrong data');
      }
      return this._bar.remove(rangeId);
    }
  }, {
    key: 'removeAll',
    value: function removeAll() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this._bar.rangeList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var range = _step2.value;

          this._bar.remove(range.id);
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
    key: 'rangeData',
    value: function rangeData(rangeId, data) {
      if (!Number.isInteger(rangeId)) {
        throw 'rangeId should be integer';
      }
      var range = this._bar.rangeList.find(function (x) {
        return x.id === rangeId;
      });
      if (!range) {
        return false;
      }
      return range.data(data);
    }
  }, {
    key: 'render',
    value: function render() {
      this._bar.render();
    }
  }, {
    key: 'val',
    value: function val() {
      return this._bar.getValue();
    }
  }, {
    key: 'data',
    value: function data() {
      return this._bar.data();
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

  return multirangeslider;
})();

exports['default'] = multirangeslider;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXZlbC9wcm9qZWN0cy9sZWFybi9tdWx0aXJhbmdlc2xpZGVyL2Rldi9tdWx0aXJhbmdlc2xpZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OzswQkFBZ0IsZUFBZTs7OztJQUV6QixnQkFBZ0I7OztBQUdULFdBSFAsZ0JBQWdCLEdBR007UUFBZCxPQUFPLHlEQUFHLEVBQUU7OzBCQUhwQixnQkFBZ0I7O0FBSWxCLFdBQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDMUMsUUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLFFBQUksQ0FBQyxJQUFJLEdBQUcsNEJBQVEsT0FBTyxDQUFDLENBQUM7O0FBRTdCLFFBQUksQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QyxRQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsR0FBRyx5QkFBeUIsQ0FBQztBQUM5QyxRQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0dBQ25DOztlQVhHLGdCQUFnQjs7V0FhSCwyQkFBQyxPQUFPLEVBQUU7QUFDekIsVUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFO21CQUNOLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDOztBQUFsRCxpREFBb0Q7QUFBL0MsY0FBSSxHQUFHLFdBQUEsQ0FBQTtBQUNWLGlCQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNqRDtPQUNGO0FBQ0QsYUFBTyxPQUFPLENBQUE7S0FDZjs7O1dBRWUsMEJBQUMsT0FBTyxFQUFFO2tCQUNSLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUM7O0FBQXRDLG1EQUF3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RUFBRSxFQUFFO0FBQ2QsVUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztLQUM1Qzs7O1dBRUUsYUFBQyxPQUFPLEVBQUUsRUFBRSxFQUFFO0FBQ2YsVUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztLQUMvQzs7O1NBdEpHLGdCQUFnQjs7O3FCQXlKUCxnQkFBZ0IiLCJmaWxlIjoiL1VzZXJzL3BhdmVsL3Byb2plY3RzL2xlYXJuL211bHRpcmFuZ2VzbGlkZXIvZGV2L211bHRpcmFuZ2VzbGlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFyIGZyb20gJy4vbW9kdWxlcy9iYXInXG5cbmNsYXNzIG11bHRpcmFuZ2VzbGlkZXIge1xuICAvLyBUaGlzIGNsYXNzIGhhbmRsZXMgYWxsIHB1YmxpYyBhcGkuXG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgb3B0aW9ucyA9IHRoaXMuX3RyYW5zZm9ybU9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5fdmFsaWRhdGVPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuX2JhciA9IG5ldyBCYXIob3B0aW9ucyk7XG5cbiAgICB0aGlzLmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5lbC5jbGFzc05hbWUgPSAnbXVsdGlyYW5nZXNsaWRlci1zbGlkZXInO1xuICAgIHRoaXMuZWwuYXBwZW5kQ2hpbGQodGhpcy5fYmFyLmVsKTtcbiAgfVxuXG4gIF90cmFuc2Zvcm1PcHRpb25zKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy52YWx1ZVBhcnNlKSB7XG4gICAgICBmb3IgKGxldCBrZXkgb2YgWydtaW4nLCAnbWF4JywgJ3N0ZXAnLCAnbWluV2lkdGgnXSkge1xuICAgICAgICBvcHRpb25zW2tleV0gPSBvcHRpb25zLnZhbHVlUGFyc2Uob3B0aW9uc1trZXldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbnNcbiAgfVxuXG4gIF92YWxpZGF0ZU9wdGlvbnMob3B0aW9ucykge1xuICAgIGZvciAobGV0IGtleSBvZiBbJ21pbicsICdtYXgnLCAnc3RlcCddKSB7XG4gICAgICBsZXQgdmFsdWUgPSBvcHRpb25zW2tleV07XG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyhuZXcgRXJyb3IoYCR7a2V5fSBvcHRpb24gaXMgbWFuZGF0b3J5YCkpO1xuICAgICAgfVxuICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKSkge1xuICAgICAgICB0aHJvdyhuZXcgRXJyb3IoYCR7a2V5fSBvcHRpb24gc2hvdWxkIGJlIGludGVnZXJgKSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcHRpb25zLm1heCA8PSBvcHRpb25zLm1pbikge1xuICAgICAgdGhyb3cobmV3IEVycm9yKCdtYXggc2hvdWxkIGJlIGdyZWF0ZXIgdGhhbiBtaW4nKSk7XG4gICAgfVxuICAgIGlmICgob3B0aW9ucy5tYXggLSBvcHRpb25zLm1pbikgJSBvcHRpb25zLnN0ZXAgIT09IDApIHtcbiAgICAgIHRocm93KG5ldyBFcnJvcigndGhlcmUgc2hvdWxkIGJlIGFuIGludGVnZXIgbnVtYmVyIG9mIHN0ZXBzIGJldHdlZW4gbWluIGFuZCBtYXgnKSk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMubWluV2lkdGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgb3B0aW9ucy5taW5XaWR0aCA9IG9wdGlvbnMuc3RlcDtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMubWluV2lkdGggJSBvcHRpb25zLnN0ZXAgIT09IDApIHtcbiAgICAgIHRocm93KG5ldyBFcnJvcigndGhlcmUgc2hvdWxkIGJlIGFuIGludGVnZXIgbnVtYmVyIG9mIHN0ZXBzIGluIG1pbldpZHRoJykpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLm1heFJhbmdlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIob3B0aW9ucy5tYXhSYW5nZXMpKSB7XG4gICAgICAgIHRocm93KG5ldyBFcnJvcignbWF4UmFuZ2VzIHNob3VsZCBiZSBpbnRlZ2VyJykpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGtleSBvZiBbJ2FsbG93Q2hhbmdlJywgJ2FsbG93QWRkJywgJ2FsbG93UmVtb3ZlJ10pIHtcbiAgICAgIGxldCB2YWx1ZSA9IG9wdGlvbnNba2V5XTtcbiAgICAgIGlmIChbdHJ1ZSwgZmFsc2UsIHVuZGVmaW5lZF0uaW5kZXhPZih2YWx1ZSkgPT09IC0xKSB7XG4gICAgICAgIHRocm93KG5ldyBFcnJvcihgJHtrZXl9IG9wdGlvbiBzaG91bGQgYmUgdHJ1ZSwgZmFsc2Ugb3IgdW5kZWZpbmVkYCkpO1xuICAgICAgfVxuICAgIH1cblxuICB9XG5cbiAgX3RyYW5zZm9ybVZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuX2Jhci5vcHRpb25zLnZhbHVlUGFyc2UpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUubWFwKHRoaXMuX2Jhci5vcHRpb25zLnZhbHVlUGFyc2UpXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgX3ZhbGlkYXRlVmFsdWUodmFsdWUpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpIHx8IHZhbHVlLmxlbmd0aCAhPSAyKSB7XG4gICAgICB0aHJvdyBFcnJvcjtcbiAgICB9XG4gIH1cblxuICBhZGQodmFsdWUsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyk7XG4gICAgdmFsdWUgPSB0aGlzLl90cmFuc2Zvcm1WYWx1ZSh2YWx1ZSk7XG4gICAgdGhpcy5fdmFsaWRhdGVWYWx1ZSh2YWx1ZSk7XG5cbiAgICBpZiAob3B0aW9ucy5pZCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuX2Jhci5yYW5nZUxpc3QuZmluZCh4ID0+IHguaWQgPT09IG9wdGlvbnMuaWQpKSB7XG4gICAgICB0aHJvdyggbmV3IEVycm9yKCdyYW5nZSB3aXRoIHRoaXMgaWQgYWxyZWFkeSBleGlzdHMnKSk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9iYXIuZ2V0SW5zaWRlUmFuZ2UodmFsdWVbMF0pIHx8IHRoaXMuX2Jhci5nZXRJbnNpZGVSYW5nZSh2YWx1ZVsxXSkpIHtcbiAgICAgIHRocm93KCBuZXcgRXJyb3IoJ2ludGVyc2VjdGlvbicpKTtcbiAgICB9XG4gICAgZm9yIChsZXQgcmFuZ2Ugb2YgdGhpcy5fYmFyLnJhbmdlTGlzdCkge1xuICAgICAgaWYgKHZhbHVlWzBdIDw9IHJhbmdlLmxlZnQgJiYgcmFuZ2UucmlnaHQgPD0gdmFsdWVbMV0pIHtcbiAgICAgICAgdGhyb3coIG5ldyBFcnJvcignaW50ZXJzZWN0aW9uJykpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fYmFyLmFkZCh2YWx1ZSwgb3B0aW9ucyk7XG4gIH1cblxuICByZW1vdmUocmFuZ2VJZCkge1xuICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihyYW5nZUlkKSkge1xuICAgICAgdGhyb3cobmV3IEVycm9yKCd3cm9uZyBkYXRhJykpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fYmFyLnJlbW92ZShyYW5nZUlkKTtcbiAgfVxuXG4gIHJlbW92ZUFsbCgpIHtcbiAgICBmb3IgKGxldCByYW5nZSBvZiB0aGlzLl9iYXIucmFuZ2VMaXN0KSB7XG4gICAgICB0aGlzLl9iYXIucmVtb3ZlKHJhbmdlLmlkKTtcbiAgICB9XG4gIH1cblxuICByYW5nZVZhbHVlKHJhbmdlSWQsIHZhbHVlKSB7XG4gICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHJhbmdlSWQpKSB7XG4gICAgICB0aHJvdygncmFuZ2VJZCBzaG91bGQgYmUgaW50ZWdlcicpO1xuICAgIH1cbiAgICBsZXQgcmFuZ2UgPSB0aGlzLl9iYXIucmFuZ2VMaXN0LmZpbmQoeCA9PiB4LmlkID09PSByYW5nZUlkKTtcbiAgICBpZiAoIXJhbmdlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gcmFuZ2UuZ2V0VmFsdWUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJhbmdlLnNldFZhbHVlKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByYW5nZURhdGEocmFuZ2VJZCwgZGF0YSkge1xuICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihyYW5nZUlkKSkge1xuICAgICAgdGhyb3coJ3JhbmdlSWQgc2hvdWxkIGJlIGludGVnZXInKTtcbiAgICB9XG4gICAgbGV0IHJhbmdlID0gdGhpcy5fYmFyLnJhbmdlTGlzdC5maW5kKHggPT4geC5pZCA9PT0gcmFuZ2VJZCk7XG4gICAgaWYgKCFyYW5nZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gcmFuZ2UuZGF0YShkYXRhKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLl9iYXIucmVuZGVyKCk7XG4gIH1cblxuICB2YWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Jhci5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgZGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYmFyLmRhdGEoKTtcbiAgfVxuXG4gIG9uKHN1YmplY3QsIGNiKSB7XG4gICAgdGhpcy5fYmFyLmVtaXR0ZXIuYWRkTGlzdGVuZXIoc3ViamVjdCwgY2IpO1xuICB9XG5cbiAgb2ZmKHN1YmplY3QsIGNiKSB7XG4gICAgdGhpcy5fYmFyLmVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIoc3ViamVjdCwgY2IpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG11bHRpcmFuZ2VzbGlkZXI7Il19
},{"./modules/bar":2}],2:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ghost = _dereq_('./ghost');

var _ghost2 = _interopRequireDefault(_ghost);

var _range = _dereq_('./range');

var _range2 = _interopRequireDefault(_range);

var _base = _dereq_('./base');

var _base2 = _interopRequireDefault(_base);

var _emitter = _dereq_('./emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _utils = _dereq_('./utils');

var Bar = (function (_Base) {
  _inherits(Bar, _Base);

  function Bar() {
    var _this = this;

    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Bar);

    _get(Object.getPrototypeOf(Bar.prototype), 'constructor', this).call(this);
    this.options = Object.assign({
      allowRemove: true,
      allowAdd: true,
      allowChange: true,
      maxRanges: Infinity,
      ghostLabel: function ghostLabel(value) {
        return '+';
      },
      label: function label(value) {
        return value[0].toString() + '-' + value[1].toString();
      },
      valueParse: function valueParse(value) {
        return value;
      },
      valueFormat: function valueFormat(value) {
        return value;
      }
    }, options);

    this.el = document.createElement('div');
    this.el.className = 'multirangeslider-bar';
    if (this.options.allowChange === false) {
      (0, _utils.addClass)(this.el, 'multirangeslider-allowChangeFalse');
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
    this.clicked = false;

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
    key: 'proxyRangeEvent',
    value: function proxyRangeEvent(eventName, range) {
      var _this2 = this;

      range.emitter.addListener(eventName, function () {
        _this2.emitter.emit(eventName, {
          data: _this2.data(),
          range: range.data()
        });
      });
    }
  }, {
    key: 'add',
    value: function add(value, options) {
      var _this3 = this;

      if (this.rangeList.length >= this.options.maxRanges) {
        return false;
      }
      options = Object.assign({
        id: this.getRangeId(),
        value: value,
        allowChange: this.options.allowChange
      }, options, {
        bar: this
      });
      var range = new _range2['default'](options);
      this.el.appendChild(range.el);

      this.rangeList.push(range);
      this.removeGhost();

      var rangeId = range.id;

      var _arr = ['remove', 'changing', 'change', 'click'];
      for (var _i = 0; _i < _arr.length; _i++) {
        var eventName = _arr[_i];
        this.proxyRangeEvent(eventName, range);
      }

      range.emitter.addListener('remove', function () {
        _this3.remove(rangeId);
      });

      var _arr2 = ['change', 'add'];
      for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
        var eventName = _arr2[_i2];
        this.emitter.emit(eventName, {
          data: this.data(),
          range: range.data()
        });
      }

      return range;
    }
  }, {
    key: 'remove',
    value: function remove(rangeId) {
      var range = this.rangeList.find(function (x) {
        return x.id == rangeId;
      });
      if (range) {
        range.removeEvents();
        this.el.removeChild(range.el);
        this.rangeList = this.rangeList.filter(function (x) {
          return x.id !== rangeId;
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
    value: function mousedown(event) {
      this.clicked = true;
    }
  }, {
    key: 'mouseup',
    value: function mouseup(event) {
      if (this.ghost && this.clicked) {
        this.add([this.ghost.left, this.ghost.right]);
        this.clicked = false;
      }
    }
  }, {
    key: 'mouseleave',
    value: function mouseleave(event) {
      this.removeGhost();
      this.clicked = false;
    }
  }, {
    key: 'getInsideRange',
    value: function getInsideRange(cursor) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.rangeList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var range = _step.value;

          if (range.left < cursor && cursor < range.right) {
            return range;
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
    key: 'isOverRange',
    value: function isOverRange(left, right) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.rangeList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var range = _step2.value;

          if (left <= range.left && range.right <= right) {
            return true;
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

      return false;
    }
  }, {
    key: 'getNewGhostValue',
    value: function getNewGhostValue(cursor) {
      if (this.getInsideRange(cursor)) {
        return null;
      }

      cursor = this.roundUserValue(cursor);
      var h = this.options.minWidth / this.options.step;
      var dLeft = Math.floor(h / 2) * this.options.step;
      var dRight = Math.floor((h + 1) / 2) * this.options.step;

      var left = cursor - dLeft;
      var right = cursor + dRight;

      if (this.options.max < right) {
        right = this.options.max;
        if (right - left < this.options.minWidth) {
          left = this.options.max - this.options.minWidth;
        }
      }

      if (left < this.options.min) {
        left = this.options.min;
        if (right - left < this.options.minWidth) {
          right = this.options.min + this.options.minWidth;
        }
      }

      var rangeLeft = this.getInsideRange(left);
      if (rangeLeft) {
        left = rangeLeft.getValue()[1];
        right = left + this.options.minWidth;
      }

      var rangeRight = this.getInsideRange(right);
      if (rangeRight) {
        right = rangeRight.getValue()[0];
        left = right - this.options.minWidth;
      }

      if (this.getInsideRange(left) || this.getInsideRange(right)) {
        return null;
      }

      if (left < this.options.min) {
        return null;
      }

      if (this.options.max < right) {
        return null;
      }

      return [left, right];
    }
  }, {
    key: 'mousemove',
    value: function mousemove(event) {
      if (this.ghost) {
        return;
      }
      if (this.options.allowAdd == false) {
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
      var newGhostValue = this.getNewGhostValue(cursor);
      if (newGhostValue == null) {
        return;
      }

      this.ghost = new _ghost2['default']({ bar: this });
      this.el.appendChild(this.ghost.el);
      this.ghost.setValue(newGhostValue);
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      var result = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.rangeList[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var range = _step3.value;

          var value = range.getValue();
          result.push(value);
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

      return result;
    }
  }, {
    key: 'data',
    value: function data() {
      return this.rangeList.map(function (x) {
        return x.data();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.rangeList[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var range = _step4.value;

          range.render();
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4['return']) {
            _iterator4['return']();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }
  }]);

  return Bar;
})(_base2['default']);

exports['default'] = Bar;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXZlbC9wcm9qZWN0cy9sZWFybi9tdWx0aXJhbmdlc2xpZGVyL2Rldi9tb2R1bGVzL2Jhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O3FCQUFrQixTQUFTOzs7O3FCQUNULFNBQVM7Ozs7b0JBQ1YsUUFBUTs7Ozt1QkFDTCxXQUFXOzs7O3FCQUd4QixTQUFTOztJQUVWLEdBQUc7WUFBSCxHQUFHOztBQUNJLFdBRFAsR0FBRyxHQUNtQjs7O1FBQWQsT0FBTyx5REFBRyxFQUFFOzswQkFEcEIsR0FBRzs7QUFFTCwrQkFGRSxHQUFHLDZDQUVHO0FBQ1IsUUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQzNCLGlCQUFXLEVBQUUsSUFBSTtBQUNqQixjQUFRLEVBQUUsSUFBSTtBQUNkLGlCQUFXLEVBQUUsSUFBSTtBQUNqQixlQUFTLEVBQUUsUUFBUTtBQUNuQixnQkFBVSxFQUFFLG9CQUFDLEtBQUssRUFBSztBQUNyQixlQUFPLEdBQUcsQ0FBQztPQUNaO0FBQ0QsV0FBSyxFQUFFLGVBQUMsS0FBSyxFQUFLO0FBQ2hCLGVBQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7T0FDeEQ7QUFDRCxnQkFBVSxFQUFFLG9CQUFDLEtBQUssRUFBSztBQUNyQixlQUFPLEtBQUssQ0FBQztPQUNkO0FBQ0QsaUJBQVcsRUFBRSxxQkFBQyxLQUFLLEVBQUs7QUFDdEIsZUFBTyxLQUFLLENBQUM7T0FDZDtLQUNGLEVBQUUsT0FBTyxDQUFDLENBQUM7O0FBRVosUUFBSSxDQUFDLEVBQUUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hDLFFBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxHQUFHLHNCQUFzQixDQUFDO0FBQzNDLFFBQUksSUFBSSxDQUFDLE9B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a0IsSUFBSSxDQUFDLFNBQVMsbUlBQUU7Y0FBekIsS0FBSzs7QUFDWixlQUFLLENBQUMsTUFBTSxFQUFFLENBQUE7U0FDZjs7Ozs7Ozs7Ozs7Ozs7O0tBQ0Y7OztTQTFQRyxHQUFHOzs7cUJBNlBNLEdBQUciLCJmaWxlIjoiL1VzZXJzL3BhdmVsL3Byb2plY3RzL2xlYXJuL211bHRpcmFuZ2VzbGlkZXIvZGV2L21vZHVsZXMvYmFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdob3N0IGZyb20gJy4vZ2hvc3QnXG5pbXBvcnQgUmFuZ2UgZnJvbSAnLi9yYW5nZSdcbmltcG9ydCBCYXNlIGZyb20gJy4vYmFzZSdcbmltcG9ydCBFbWl0dGVyIGZyb20gJy4vZW1pdHRlcidcbmltcG9ydCB7XG4gIGFkZENsYXNzXG59IGZyb20gJy4vdXRpbHMnXG5cbmNsYXNzIEJhciBleHRlbmRzIEJhc2Uge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgYWxsb3dSZW1vdmU6IHRydWUsXG4gICAgICBhbGxvd0FkZDogdHJ1ZSxcbiAgICAgIGFsbG93Q2hhbmdlOiB0cnVlLFxuICAgICAgbWF4UmFuZ2VzOiBJbmZpbml0eSxcbiAgICAgIGdob3N0TGFiZWw6ICh2YWx1ZSkgPT4ge1xuICAgICAgICByZXR1cm4gJysnO1xuICAgICAgfSxcbiAgICAgIGxhYmVsOiAodmFsdWUpID0+IHtcbiAgICAgICAgcmV0dXJuIHZhbHVlWzBdLnRvU3RyaW5nKCkgKyAnLScgKyB2YWx1ZVsxXS50b1N0cmluZygpO1xuICAgICAgfSxcbiAgICAgIHZhbHVlUGFyc2U6ICh2YWx1ZSkgPT4ge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9LFxuICAgICAgdmFsdWVGb3JtYXQ6ICh2YWx1ZSkgPT4ge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgfSwgb3B0aW9ucyk7XG5cbiAgICB0aGlzLmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5lbC5jbGFzc05hbWUgPSAnbXVsdGlyYW5nZXNsaWRlci1iYXInO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuYWxsb3dDaGFuZ2UgPT09IGZhbHNlKSB7XG4gICAgICBhZGRDbGFzcyh0aGlzLmVsLCAnbXVsdGlyYW5nZXNsaWRlci1hbGxvd0NoYW5nZUZhbHNlJylcbiAgICB9XG4gICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZXZlbnQpPT4gdGhpcy5tb3VzZW1vdmUoZXZlbnQpKTtcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoZXZlbnQpPT4gdGhpcy5tb3VzZWxlYXZlKGV2ZW50KSk7XG4gICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGV2ZW50KT0+IHRoaXMubW91c2V1cChldmVudCkpO1xuICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGV2ZW50KT0+IHRoaXMubW91c2Vkb3duKGV2ZW50KSk7XG4gICAgdGhpcy5lbC5vbmRyYWdzdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgdGhpcy5yYW5nZUlkQ291bnQgPSAwO1xuICAgIHRoaXMucmFuZ2VMaXN0ID0gW107XG4gICAgdGhpcy5jbGlja2VkPWZhbHNlO1xuXG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXI7XG4gIH1cblxuICBnZXRSYW5nZUlkKCkge1xuICAgIC8vIEp1c3QgcmV0dXJuIHNvbWUgdW5pcXVlIG51bWJlclxuICAgIHRoaXMucmFuZ2VJZENvdW50ICs9IDE7XG4gICAgcmV0dXJuIHRoaXMucmFuZ2VJZENvdW50O1xuICB9XG5cbiAgcHJveHlSYW5nZUV2ZW50KGV2ZW50TmFtZSwgcmFuZ2UpIHtcbiAgICByYW5nZS5lbWl0dGVyLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgKCkgPT4ge1xuICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoZXZlbnROYW1lLCB7XG4gICAgICAgIGRhdGE6IHRoaXMuZGF0YSgpLFxuICAgICAgICByYW5nZTogcmFuZ2UuZGF0YSgpXG4gICAgICB9KTtcbiAgICB9KVxuICB9XG5cbiAgYWRkKHZhbHVlLCBvcHRpb25zKSB7XG4gICAgaWYgKHRoaXMucmFuZ2VMaXN0Lmxlbmd0aCA+PSB0aGlzLm9wdGlvbnMubWF4UmFuZ2VzKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGlkOiB0aGlzLmdldFJhbmdlSWQoKSxcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGFsbG93Q2hhbmdlOiB0aGlzLm9wdGlvbnMuYWxsb3dDaGFuZ2VcbiAgICB9LCBvcHRpb25zLCB7XG4gICAgICBiYXI6IHRoaXNcbiAgICB9KTtcbiAgICBsZXQgcmFuZ2UgPSBuZXcgUmFuZ2Uob3B0aW9ucyk7XG4gICAgdGhpcy5lbC5hcHBlbmRDaGlsZChyYW5nZS5lbCk7XG5cbiAgICB0aGlzLnJhbmdlTGlzdC5wdXNoKHJhbmdlKTtcbiAgICB0aGlzLnJlbW92ZUdob3N0KCk7XG5cbiAgICBsZXQgcmFuZ2VJZCA9IHJhbmdlLmlkO1xuXG4gICAgZm9yIChsZXQgZXZlbnROYW1lIG9mIFtcbiAgICAgICdyZW1vdmUnLFxuICAgICAgJ2NoYW5naW5nJyxcbiAgICAgICdjaGFuZ2UnLFxuICAgICAgJ2NsaWNrJ1xuICAgIF0pIHtcbiAgICAgIHRoaXMucHJveHlSYW5nZUV2ZW50KGV2ZW50TmFtZSwgcmFuZ2UpO1xuICAgIH1cblxuICAgIHJhbmdlLmVtaXR0ZXIuYWRkTGlzdGVuZXIoJ3JlbW92ZScsICgpID0+IHtcbiAgICAgIHRoaXMucmVtb3ZlKHJhbmdlSWQpO1xuICAgIH0pO1xuXG4gICAgZm9yIChsZXQgZXZlbnROYW1lIG9mIFsnY2hhbmdlJywgJ2FkZCddKSB7XG4gICAgICB0aGlzLmVtaXR0ZXIuZW1pdChldmVudE5hbWUsIHtcbiAgICAgICAgZGF0YTogdGhpcy5kYXRhKCksXG4gICAgICAgIHJhbmdlOiByYW5nZS5kYXRhKClcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiByYW5nZTtcblxuICB9XG5cbiAgcmVtb3ZlKHJhbmdlSWQpIHtcbiAgICBsZXQgcmFuZ2UgPSB0aGlzLnJhbmdlTGlzdC5maW5kKHggPT4geC5pZCA9PSByYW5nZUlkKTtcbiAgICBpZiAocmFuZ2UpIHtcbiAgICAgIHJhbmdlLnJlbW92ZUV2ZW50cygpO1xuICAgICAgdGhpcy5lbC5yZW1vdmVDaGlsZChyYW5nZS5lbCk7XG4gICAgICB0aGlzLnJhbmdlTGlzdCA9IHRoaXMucmFuZ2VMaXN0LmZpbHRlcih4ID0+IHguaWQgIT09IHJhbmdlSWQpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVHaG9zdCgpIHtcbiAgICBpZiAodGhpcy5naG9zdCkge1xuICAgICAgdGhpcy5naG9zdC5yZW1vdmVFdmVudHMoKTtcbiAgICAgIHRoaXMuZWwucmVtb3ZlQ2hpbGQodGhpcy5naG9zdC5lbCk7XG4gICAgICBkZWxldGUgdGhpcy5naG9zdDtcbiAgICB9XG4gIH1cblxuICBtb3VzZWRvd24oZXZlbnQpIHtcbiAgICB0aGlzLmNsaWNrZWQ9dHJ1ZTtcbiAgfVxuXG4gIG1vdXNldXAoZXZlbnQpIHtcbiAgICBpZiAodGhpcy5naG9zdCAmJiB0aGlzLmNsaWNrZWQpIHtcbiAgICAgIHRoaXMuYWRkKFt0aGlzLmdob3N0LmxlZnQsIHRoaXMuZ2hvc3QucmlnaHRdKTtcbiAgICAgIHRoaXMuY2xpY2tlZD1mYWxzZVxuICAgIH1cbiAgfVxuXG4gIG1vdXNlbGVhdmUoZXZlbnQpIHtcbiAgICB0aGlzLnJlbW92ZUdob3N0KCk7XG4gICAgdGhpcy5jbGlja2VkPWZhbHNlO1xuICB9XG5cbiAgZ2V0SW5zaWRlUmFuZ2UoY3Vyc29yKSB7XG4gICAgZm9yIChsZXQgcmFuZ2Ugb2YgdGhpcy5yYW5nZUxpc3QpIHtcbiAgICAgIGlmIChyYW5nZS5sZWZ0IDwgY3Vyc29yICYmIGN1cnNvciA8IHJhbmdlLnJpZ2h0KSB7XG4gICAgICAgIHJldHVybiByYW5nZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc092ZXJSYW5nZShsZWZ0LCByaWdodCkge1xuICAgIGZvciAobGV0IHJhbmdlIG9mIHRoaXMucmFuZ2VMaXN0KSB7XG4gICAgICBpZiAobGVmdCA8PSByYW5nZS5sZWZ0ICYmIHJhbmdlLnJpZ2h0IDw9IHJpZ2h0KSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldE5ld0dob3N0VmFsdWUoY3Vyc29yKSB7XG4gICAgaWYgKHRoaXMuZ2V0SW5zaWRlUmFuZ2UoY3Vyc29yKSkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICBjdXJzb3IgPSB0aGlzLnJvdW5kVXNlclZhbHVlKGN1cnNvcik7XG4gICAgbGV0IGggPSB0aGlzLm9wdGlvbnMubWluV2lkdGggLyAodGhpcy5vcHRpb25zLnN0ZXApO1xuICAgIGxldCBkTGVmdCA9IE1hdGguZmxvb3IoaCAvIDIpICogdGhpcy5vcHRpb25zLnN0ZXA7XG4gICAgbGV0IGRSaWdodCA9IE1hdGguZmxvb3IoKGggKyAxKSAvIDIpICogdGhpcy5vcHRpb25zLnN0ZXA7XG5cbiAgICBsZXQgbGVmdCA9IGN1cnNvciAtIGRMZWZ0O1xuICAgIGxldCByaWdodCA9IGN1cnNvciArIGRSaWdodDtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMubWF4IDwgcmlnaHQpIHtcbiAgICAgIHJpZ2h0ID0gdGhpcy5vcHRpb25zLm1heDtcbiAgICAgIGlmIChyaWdodCAtIGxlZnQgPCB0aGlzLm9wdGlvbnMubWluV2lkdGgpIHtcbiAgICAgICAgbGVmdCA9IHRoaXMub3B0aW9ucy5tYXggLSB0aGlzLm9wdGlvbnMubWluV2lkdGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGxlZnQgPCB0aGlzLm9wdGlvbnMubWluKSB7XG4gICAgICBsZWZ0ID0gdGhpcy5vcHRpb25zLm1pbjtcbiAgICAgIGlmIChyaWdodCAtIGxlZnQgPCB0aGlzLm9wdGlvbnMubWluV2lkdGgpIHtcbiAgICAgICAgcmlnaHQgPSB0aGlzLm9wdGlvbnMubWluICsgdGhpcy5vcHRpb25zLm1pbldpZHRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCByYW5nZUxlZnQgPSB0aGlzLmdldEluc2lkZVJhbmdlKGxlZnQpO1xuICAgIGlmIChyYW5nZUxlZnQpIHtcbiAgICAgIGxlZnQgPSByYW5nZUxlZnQuZ2V0VmFsdWUoKVsxXTtcbiAgICAgIHJpZ2h0ID0gbGVmdCArIHRoaXMub3B0aW9ucy5taW5XaWR0aDtcbiAgICB9XG5cbiAgICBsZXQgcmFuZ2VSaWdodCA9IHRoaXMuZ2V0SW5zaWRlUmFuZ2UocmlnaHQpO1xuICAgIGlmIChyYW5nZVJpZ2h0KSB7XG4gICAgICByaWdodCA9IHJhbmdlUmlnaHQuZ2V0VmFsdWUoKVswXTtcbiAgICAgIGxlZnQgPSByaWdodCAtIHRoaXMub3B0aW9ucy5taW5XaWR0aDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5nZXRJbnNpZGVSYW5nZShsZWZ0KSB8fCB0aGlzLmdldEluc2lkZVJhbmdlKHJpZ2h0KSkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICBpZiAobGVmdCA8IHRoaXMub3B0aW9ucy5taW4pIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5tYXggPCByaWdodCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICByZXR1cm4gW2xlZnQsIHJpZ2h0XVxuICB9XG5cbiAgbW91c2Vtb3ZlKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuZ2hvc3QpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLmFsbG93QWRkID09IGZhbHNlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKHRoaXMucmFuZ2VMaXN0Lmxlbmd0aCA+PSB0aGlzLm9wdGlvbnMubWF4UmFuZ2VzKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKHRoaXMucmFuZ2VMaXN0LmZpbHRlcih4ID0+IHgucHJlc3NlZCkubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IGN1cnNvciA9IHRoaXMuZ2V0Q3Vyc29yKGV2ZW50KTtcbiAgICBsZXQgbmV3R2hvc3RWYWx1ZSA9IHRoaXMuZ2V0TmV3R2hvc3RWYWx1ZShjdXJzb3IpO1xuICAgIGlmIChuZXdHaG9zdFZhbHVlID09IG51bGwpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuZ2hvc3QgPSBuZXcgR2hvc3Qoe2JhcjogdGhpc30pO1xuICAgIHRoaXMuZWwuYXBwZW5kQ2hpbGQodGhpcy5naG9zdC5lbCk7XG4gICAgdGhpcy5naG9zdC5zZXRWYWx1ZShuZXdHaG9zdFZhbHVlKTtcbiAgfVxuXG4gIGdldFZhbHVlKCkge1xuICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICBmb3IgKGxldCByYW5nZSBvZiB0aGlzLnJhbmdlTGlzdCkge1xuICAgICAgbGV0IHZhbHVlID0gcmFuZ2UuZ2V0VmFsdWUoKTtcbiAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgZGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy5yYW5nZUxpc3QubWFwKCh4KSA9PiB7cmV0dXJuIHguZGF0YSgpfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgZm9yIChsZXQgcmFuZ2Ugb2YgdGhpcy5yYW5nZUxpc3QpIHtcbiAgICAgIHJhbmdlLnJlbmRlcigpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhcjsiXX0=
},{"./base":3,"./emitter":4,"./ghost":5,"./range":6,"./utils":7}],3:[function(_dereq_,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXZlbC9wcm9qZWN0cy9sZWFybi9tdWx0aXJhbmdlc2xpZGVyL2Rldi9tb2R1bGVzL2Jhc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxTQUFTLFdBQVcsQ0FBQyxJQUFJLEVBQUU7QUFDekIsU0FBTyxDQUFDLENBQUUsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxBQUFDLENBQUM7Q0FDNUM7QUFDRCxTQUFTLG9CQUFvQixDQUFDLElBQUksRUFBRTtBQUNsQyxNQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDcEIsU0FBTyxRQUFRLENBQUMsVUFBVSxFQUFFO0FBQzFCLFlBQVEsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0dBQ2hDO0FBQ0QsU0FBTyxRQUFRLENBQUM7Q0FDakI7O0lBRUssSUFBSTtXQUFKLElBQUk7MEJBQUosSUFBSTs7O2VBQUosSUFBSTs7OztXQUVHLHFCQUFDLEtBQUssRUFBRTtBQUNqQixVQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBQztBQUN4QixjQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7T0FDM0M7QUFDRCxVQUFJLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLHFCQUFxQixFQUFFLENBQUM7QUFDM0MsVUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUN2QixVQUFJLEtBQUssSUFBSSxDQUFDLEVBQUU7QUFDZCxjQUFNLElBQUksS0FBSyxDQUFDLHNEQUFzRCxDQUFDLENBQUE7T0FDeEU7QUFDRCxhQUFPLEtBQUssR0FBRyxLQUFLLENBQUM7S0FDdEI7OztXQUVVLHFCQUFDLEtBQUssRUFBRTtBQUNqQixVQUFJLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLHFCQUFxQixFQUFFLENBQUM7QUFDM0MsVUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUN2QixhQUFPLEtBQUssR0FBRyxLQUFLLENBQUM7S0FDdEI7OztXQUVTLG9CQUFDLEtBQUssRUFBRTtBQUNoQixhQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUEsR0FBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7S0FDekU7OztXQUVTLG9CQUFDLEtBQUssRUFBRTtBQUNoQixhQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFBLElBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUEsQUFBQyxDQUFDO0tBQzNFOzs7V0FFYSx3QkFBQyxLQUFLLEVBQUU7QUFDcEIsYUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFBLEdBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztLQUMxRzs7O1dBRVEsbUJBQUMsS0FBSyxFQUFFOzs7O0FBSWYsVUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0FBQzNDLFVBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztBQUNsQyxhQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzdDOzs7U0F2Q0csSUFBSTs7O3FCQTBDSyxJQUFJIiwiZmlsZSI6Ii9Vc2Vycy9wYXZlbC9wcm9qZWN0cy9sZWFybi9tdWx0aXJhbmdlc2xpZGVyL2Rldi9tb2R1bGVzL2Jhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL2h0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzg1MDk5NS83NTIzOTdcbmZ1bmN0aW9uIGlzSW5ET01UcmVlKG5vZGUpIHtcbiAgcmV0dXJuICEhKGZpbmRVbHRpbWF0ZUFuY2VzdG9yKG5vZGUpLmJvZHkpO1xufVxuZnVuY3Rpb24gZmluZFVsdGltYXRlQW5jZXN0b3Iobm9kZSkge1xuICB2YXIgYW5jZXN0b3IgPSBub2RlO1xuICB3aGlsZSAoYW5jZXN0b3IucGFyZW50Tm9kZSkge1xuICAgIGFuY2VzdG9yID0gYW5jZXN0b3IucGFyZW50Tm9kZTtcbiAgfVxuICByZXR1cm4gYW5jZXN0b3I7XG59XG5cbmNsYXNzIEJhc2Uge1xuICAvLyBUaGlzIGNsYXNzIGNvbnRhaW5zIG1ldGhvZHMgdG8gY2FsY3VsYXRlIGRpZmZlcmVudCBtZWFzdXJlbWVudHMgZm9yIEJhciBjbGFzc1xuICBwaXhlbFRvVW5pdCh2YWx1ZSkge1xuICAgIGlmICghaXNJbkRPTVRyZWUodGhpcy5lbCkpe1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdlbGVtZW50IGlzIG5vdCBpbiBkb20hJyk7XG4gICAgfVxuICAgIGxldCByZWN0ID0gdGhpcy5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBsZXQgd2lkdGggPSByZWN0LndpZHRoO1xuICAgIGlmICh3aWR0aCA9PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2VsZW1lbnQgd2lkdGggaXMgMCBvciBlbGVtZW50IGlzIG5vdCBhdHRhY2hlZCB0byBkb20nKVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWUgLyB3aWR0aDtcbiAgfVxuXG4gIHVuaXRUb1BpeGVsKHZhbHVlKSB7XG4gICAgbGV0IHJlY3QgPSB0aGlzLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCB3aWR0aCA9IHJlY3Qud2lkdGg7XG4gICAgcmV0dXJuIHZhbHVlICogd2lkdGg7XG4gIH1cblxuICB1bml0VG9Vc2VyKHZhbHVlKSB7XG4gICAgcmV0dXJuICh0aGlzLm9wdGlvbnMubWF4IC0gdGhpcy5vcHRpb25zLm1pbikgKiB2YWx1ZSArIHRoaXMub3B0aW9ucy5taW47XG4gIH1cblxuICB1c2VyVG9Vbml0KHZhbHVlKSB7XG4gICAgcmV0dXJuICh2YWx1ZSAtIHRoaXMub3B0aW9ucy5taW4pIC8gKHRoaXMub3B0aW9ucy5tYXggLSB0aGlzLm9wdGlvbnMubWluKTtcbiAgfVxuXG4gIHJvdW5kVXNlclZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5taW4gKyBNYXRoLmZsb29yKCh2YWx1ZSAtIHRoaXMub3B0aW9ucy5taW4pIC8gdGhpcy5vcHRpb25zLnN0ZXApICogdGhpcy5vcHRpb25zLnN0ZXA7XG4gIH1cblxuICBnZXRDdXJzb3IoZXZlbnQpIHtcbiAgICAvLyBldmVudCBpcyBtb3VzZW1vdmUgZXZlbnRcbiAgICAvLyByZXR1cm5zIHVuaXRWYWx1ZSBvZiBwbGFjZSB3aGVyZSB0aGUgZXZlbnQgaGFzIGJlZW4gbWFkZVxuXG4gICAgbGV0IHJlY3QgPSB0aGlzLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCB4ID0gZXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICByZXR1cm4gdGhpcy51bml0VG9Vc2VyKHRoaXMucGl4ZWxUb1VuaXQoeCkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2U7Il19
},{}],4:[function(_dereq_,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXZlbC9wcm9qZWN0cy9sZWFybi9tdWx0aXJhbmdlc2xpZGVyL2Rldi9tb2R1bGVzL2VtaXR0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSSxVQUFVLEdBQUcsU0FBYixVQUFVLENBQWEsR0FBRyxFQUFFO0FBQzlCLFNBQU8sT0FBTyxHQUFHLElBQUksVUFBVSxJQUFJLEtBQUssQ0FBQztDQUMxQyxDQUFDOztJQUVJLE9BQU87QUFDQSxXQURQLE9BQU8sR0FDRzswQkFEVixPQUFPOztBQUVULFFBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztHQUM1Qjs7ZUFIRyxPQUFPOztXQUtBLHFCQUFDLEtBQUssRUFBRSxRQUFRLEVBQUU7QUFDM0IsVUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzNELFVBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUMxQzs7O1dBRWEsd0JBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRTtBQUM5QixVQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7VUFDdkMsS0FBSyxZQUFBLENBQUM7O0FBRVIsVUFBSSxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRTtBQUNqQyxhQUFLLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFLO0FBQy9DLGlCQUFPLEFBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLFFBQVEsS0FBSyxRQUFRLEdBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDeEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUVQLFlBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQ2QsbUJBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzNCLGNBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNyQyxpQkFBTyxJQUFJLENBQUM7U0FDYjtPQUNGO0FBQ0QsYUFBTyxLQUFLLENBQUM7S0FDZDs7O1dBRUcsY0FBQyxLQUFLLEVBQVc7d0NBQU4sSUFBSTtBQUFKLFlBQUk7OztBQUNqQixVQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFMUMsVUFBSSxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRTtBQUNqQyxpQkFBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQVEsRUFBSztBQUM5QixrQkFBUSxrQkFBSSxJQUFJLENBQUMsQ0FBQztTQUNuQixDQUFDLENBQUM7QUFDSCxlQUFPLElBQUksQ0FBQztPQUNiO0FBQ0QsYUFBTyxLQUFLLENBQUM7S0FDZDs7O1NBdENHLE9BQU87OztxQkF5Q0UsT0FBTyIsImZpbGUiOiIvVXNlcnMvcGF2ZWwvcHJvamVjdHMvbGVhcm4vbXVsdGlyYW5nZXNsaWRlci9kZXYvbW9kdWxlcy9lbWl0dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9odHRwczovL2dpc3QuZ2l0aHViLmNvbS9kYXRjaGxleS8zNzM1M2Q2YTJjYjYyOTY4N2ViOVxuXG5sZXQgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT0gJ2Z1bmN0aW9uJyB8fCBmYWxzZTtcbn07XG5cbmNsYXNzIEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxpc3RlbmVycyA9IG5ldyBNYXAoKTtcbiAgfVxuXG4gIGFkZExpc3RlbmVyKGxhYmVsLCBjYWxsYmFjaykge1xuICAgIHRoaXMubGlzdGVuZXJzLmhhcyhsYWJlbCkgfHwgdGhpcy5saXN0ZW5lcnMuc2V0KGxhYmVsLCBbXSk7XG4gICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGxhYmVsKS5wdXNoKGNhbGxiYWNrKTtcbiAgfVxuXG4gIHJlbW92ZUxpc3RlbmVyKGxhYmVsLCBjYWxsYmFjaykge1xuICAgIGxldCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVycy5nZXQobGFiZWwpLFxuICAgICAgaW5kZXg7XG5cbiAgICBpZiAobGlzdGVuZXJzICYmIGxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgIGluZGV4ID0gbGlzdGVuZXJzLnJlZHVjZSgoaSwgbGlzdGVuZXIsIGluZGV4KSA9PiB7XG4gICAgICAgIHJldHVybiAoaXNGdW5jdGlvbihsaXN0ZW5lcikgJiYgbGlzdGVuZXIgPT09IGNhbGxiYWNrKSA/IGkgPSBpbmRleCA6IGk7XG4gICAgICB9LCAtMSk7XG5cbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB0aGlzLmxpc3RlbmVycy5zZXQobGFiZWwsIGxpc3RlbmVycyk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBlbWl0KGxhYmVsLCAuLi5hcmdzKSB7XG4gICAgbGV0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzLmdldChsYWJlbCk7XG5cbiAgICBpZiAobGlzdGVuZXJzICYmIGxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgIGxpc3RlbmVycy5mb3JFYWNoKChsaXN0ZW5lcikgPT4ge1xuICAgICAgICBsaXN0ZW5lciguLi5hcmdzKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFbWl0dGVyIl19
},{}],5:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _emitter = _dereq_('./emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var Ghost = (function () {
  function Ghost(options) {
    var _this = this;

    _classCallCheck(this, Ghost);

    this.bar = options.bar;

    this.el = document.createElement('div');
    this.el.className = 'multirangeslider-ghost';

    this.label = document.createElement('div');
    this.label.className = 'multirangeslider-label';
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

      if (this.bar.getInsideRange(cursor)) {
        if (!this.pressed) {
          this.bar.removeGhost();
        }
        return;
      }

      var center = (this.left + this.right) / 2;
      cursor = this.bar.roundUserValue(cursor);

      var h = this.bar.options.minWidth / this.bar.options.step;
      var dLeft = Math.floor(h / 2) * this.bar.options.step;
      var dRight = Math.floor((h + 1) / 2) * this.bar.options.step;

      var newLeft = this.left;
      var newRight = this.right;

      if (this.pressed) {
        if (cursor < center) {
          newLeft = cursor - dLeft;
        }
        if (cursor > center) {
          newRight = cursor + dRight;
        }
      } else {
        newLeft = cursor - dLeft;
        newRight = cursor + dRight;
      }

      if (newRight > this.bar.options.max) {
        newRight = this.bar.options.max;
        if (!this.pressed) {
          newLeft = newRight - this.bar.options.minWidth;
        }
      }
      if (newLeft < this.bar.options.min) {
        newLeft = this.bar.options.min;
        if (!this.pressed) {
          newRight = newLeft + this.bar.options.minWidth;
        }
      }

      if (this.bar.getInsideRange(newLeft) || this.bar.getInsideRange(newRight)) {
        return;
      }

      if (this.bar.isOverRange(newLeft, newRight)) {
        return;
      }

      this.setValue([newLeft, newRight]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXZlbC9wcm9qZWN0cy9sZWFybi9tdWx0aXJhbmdlc2xpZGVyL2Rldi9tb2R1bGVzL2dob3N0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozt1QkFBcUIsV0FBVzs7OztJQUcxQixLQUFLO0FBQ0UsV0FEUCxLQUFLLENBQ0csT0FBTyxFQUFFOzs7MEJBRGpCLEtBQUs7O0FBRVAsUUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDOztBQUV2QixRQUFJLENBQUMsRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEMsUUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsd0JBQXdCLENBQUM7O0FBRTdDLFFBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMzQyxRQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyx3QkFBd0IsQ0FBQztBQUNoRCxRQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRWhDLFFBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDOztBQUVyQixRQUFJLENBQUMsVUFBVSxHQUFHLFVBQUMsS0FBSzthQUFJLE1BQUssU0FBUyxDQUFDLEtBQUssQ0FBQztLQUFBLENBQUM7QUFDbEQsUUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFDLEtBQUs7YUFBSSxNQUFLLFNBQVMsQ0FBQyxLQUFLLENBQUM7S0FBQSxDQUFDO0FBQ2xELFFBQUksQ0FBQyxRQUFRLEdBQUcsVUFBQyxLQUFLO2FBQUksTUFBSyxPQUFPLENBQUMsS0FBSyxDQUFDO0tBQUEsQ0FBQzs7QUFFOUMsUUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMzRCxRQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzNELFFBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7R0FDeEQ7O2VBcEJHLEtBQUs7O1dBdUJHLHdCQUFHO0FBQ2IsVUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM5RCxVQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzlELFVBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDM0Q7OztXQUVRLG1CQUFDLEtBQUssRUFBRTtBQUNmLFVBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQ3RELFlBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBO09BQ3BCO0tBQ0Y7OztXQUVNLGlCQUFDLEtBQUssRUFBRTtBQUNiLFVBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0tBQ3RCOzs7V0FDUSxtQkFBQyxLQUFLLEVBQUU7QUFDZixVQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFdkMsVUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUNuQyxZQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtBQUNqQixjQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3hCO0FBQ0QsZUFBTTtPQUNQOztBQUVELFVBQUksTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBLEdBQUksQ0FBQyxDQUFDO0FBQzFDLFlBQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFekMsVUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQUFBQyxDQUFDO0FBQzVELFVBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztBQUN0RCxVQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQSxHQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzs7VUFFeEQsT0FBTyxHQUFlLElBQUksQ0FBQyxJQUFJO1VBQXRCLFFBQVEsR0FBZ0IsSUFBSSxDQUFDLEtBQUs7O0FBRWhELFVBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtBQUNoQixZQUFJLE1BQU0sR0FBRyxNQUFNLEVBQUU7QUFDbkIsaUJBQU8sR0FBRyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQzFCO0FBQ0QsWUFBSSxNQUFNLEdBQUcsTUFBTSxFQUFFO0FBQ25CLGtCQUFRLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQztTQUM1QjtPQUNGLE1BQU07QUFDSixlQUFPLEdBQWUsTUFBTSxHQUFHLEtBQUs7QUFBM0IsZ0JBQVEsR0FBcUIsTUFBTSxHQUFHLE1BQU07T0FDdkQ7O0FBRUQsVUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO0FBQ25DLGdCQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBQ2hDLFlBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQ2pCLGlCQUFPLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztTQUNoRDtPQUNGO0FBQ0QsVUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO0FBQ2xDLGVBQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDL0IsWUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDakIsa0JBQVEsR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1NBQ2hEO09BQ0Y7O0FBRUQsVUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUN6RSxlQUFNO09BQ1A7O0FBRUQsVUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLEVBQUU7QUFDM0MsZUFBTTtPQUNQOztBQUVELFVBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztLQUNwQzs7O1dBQ08sa0JBQUMsS0FBSyxFQUFFO0FBQ2QsVUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckIsVUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEIsVUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0UsVUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakYsVUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFNLFNBQVMsT0FBSSxDQUFDO0FBQ3RDLFVBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBTSxVQUFVLEdBQUcsU0FBUyxPQUFJLENBQUM7QUFDcEQsVUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzNEOzs7U0FuR0csS0FBSzs7O3FCQXNHSSxLQUFLIiwiZmlsZSI6Ii9Vc2Vycy9wYXZlbC9wcm9qZWN0cy9sZWFybi9tdWx0aXJhbmdlc2xpZGVyL2Rldi9tb2R1bGVzL2dob3N0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICBFbWl0dGVyIGZyb20gJy4vZW1pdHRlcic7XG5cblxuY2xhc3MgR2hvc3Qge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5iYXIgPSBvcHRpb25zLmJhcjtcblxuICAgIHRoaXMuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLmVsLmNsYXNzTmFtZSA9ICdtdWx0aXJhbmdlc2xpZGVyLWdob3N0JztcblxuICAgIHRoaXMubGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLmxhYmVsLmNsYXNzTmFtZSA9ICdtdWx0aXJhbmdlc2xpZGVyLWxhYmVsJztcbiAgICB0aGlzLmVsLmFwcGVuZENoaWxkKHRoaXMubGFiZWwpO1xuXG4gICAgdGhpcy5wcmVzc2VkID0gZmFsc2U7XG5cbiAgICB0aGlzLl9tb3VzZW1vdmUgPSAoZXZlbnQpPT4gdGhpcy5tb3VzZW1vdmUoZXZlbnQpO1xuICAgIHRoaXMuX21vdXNlZG93biA9IChldmVudCk9PiB0aGlzLm1vdXNlZG93bihldmVudCk7XG4gICAgdGhpcy5fbW91c2V1cCA9IChldmVudCk9PiB0aGlzLm1vdXNldXAoZXZlbnQpO1xuXG4gICAgdGhpcy5iYXIuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5fbW91c2Vtb3ZlKTtcbiAgICB0aGlzLmJhci5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9tb3VzZWRvd24pO1xuICAgIHRoaXMuYmFyLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9tb3VzZXVwKTtcbiAgfVxuXG5cbiAgcmVtb3ZlRXZlbnRzKCkge1xuICAgIHRoaXMuYmFyLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX21vdXNlbW92ZSk7XG4gICAgdGhpcy5iYXIuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5fbW91c2Vkb3duKTtcbiAgICB0aGlzLmJhci5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5fbW91c2V1cCk7XG4gIH1cblxuICBtb3VzZWRvd24oZXZlbnQpIHtcbiAgICBpZiAoW3RoaXMuZWwsIHRoaXMubGFiZWxdLmluZGV4T2YoZXZlbnQudGFyZ2V0KSAhPT0gLTEpIHtcbiAgICAgIHRoaXMucHJlc3NlZCA9IHRydWVcbiAgICB9XG4gIH1cblxuICBtb3VzZXVwKGV2ZW50KSB7XG4gICAgdGhpcy5wcmVzc2VkID0gZmFsc2U7XG4gIH1cbiAgbW91c2Vtb3ZlKGV2ZW50KSB7XG4gICAgbGV0IGN1cnNvciA9IHRoaXMuYmFyLmdldEN1cnNvcihldmVudCk7XG5cbiAgICBpZiAodGhpcy5iYXIuZ2V0SW5zaWRlUmFuZ2UoY3Vyc29yKSkge1xuICAgICAgaWYgKCF0aGlzLnByZXNzZWQpIHtcbiAgICAgICAgdGhpcy5iYXIucmVtb3ZlR2hvc3QoKTtcbiAgICAgIH1cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBjZW50ZXIgPSAodGhpcy5sZWZ0ICsgdGhpcy5yaWdodCkgLyAyO1xuICAgIGN1cnNvciA9IHRoaXMuYmFyLnJvdW5kVXNlclZhbHVlKGN1cnNvcik7XG5cbiAgICBsZXQgaCA9IHRoaXMuYmFyLm9wdGlvbnMubWluV2lkdGggLyAodGhpcy5iYXIub3B0aW9ucy5zdGVwKTtcbiAgICBsZXQgZExlZnQgPSBNYXRoLmZsb29yKGggLyAyKSAqIHRoaXMuYmFyLm9wdGlvbnMuc3RlcDtcbiAgICBsZXQgZFJpZ2h0ID0gTWF0aC5mbG9vcigoaCArIDEpIC8gMikgKiB0aGlzLmJhci5vcHRpb25zLnN0ZXA7XG5cbiAgICBsZXQgW25ld0xlZnQsIG5ld1JpZ2h0XSA9IFt0aGlzLmxlZnQsIHRoaXMucmlnaHRdO1xuXG4gICAgaWYgKHRoaXMucHJlc3NlZCkge1xuICAgICAgaWYgKGN1cnNvciA8IGNlbnRlcikge1xuICAgICAgICBuZXdMZWZ0ID0gY3Vyc29yIC0gZExlZnQ7XG4gICAgICB9XG4gICAgICBpZiAoY3Vyc29yID4gY2VudGVyKSB7XG4gICAgICAgIG5ld1JpZ2h0ID0gY3Vyc29yICsgZFJpZ2h0O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBbbmV3TGVmdCwgbmV3UmlnaHRdID0gW2N1cnNvciAtIGRMZWZ0LCBjdXJzb3IgKyBkUmlnaHRdO1xuICAgIH1cblxuICAgIGlmIChuZXdSaWdodCA+IHRoaXMuYmFyLm9wdGlvbnMubWF4KSB7XG4gICAgICBuZXdSaWdodCA9IHRoaXMuYmFyLm9wdGlvbnMubWF4O1xuICAgICAgaWYgKCF0aGlzLnByZXNzZWQpIHtcbiAgICAgICAgbmV3TGVmdCA9IG5ld1JpZ2h0IC0gdGhpcy5iYXIub3B0aW9ucy5taW5XaWR0aDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG5ld0xlZnQgPCB0aGlzLmJhci5vcHRpb25zLm1pbikge1xuICAgICAgbmV3TGVmdCA9IHRoaXMuYmFyLm9wdGlvbnMubWluO1xuICAgICAgaWYgKCF0aGlzLnByZXNzZWQpIHtcbiAgICAgICAgbmV3UmlnaHQgPSBuZXdMZWZ0ICsgdGhpcy5iYXIub3B0aW9ucy5taW5XaWR0aDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5iYXIuZ2V0SW5zaWRlUmFuZ2UobmV3TGVmdCkgfHwgdGhpcy5iYXIuZ2V0SW5zaWRlUmFuZ2UobmV3UmlnaHQpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAodGhpcy5iYXIuaXNPdmVyUmFuZ2UobmV3TGVmdCwgbmV3UmlnaHQpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLnNldFZhbHVlKFtuZXdMZWZ0LCBuZXdSaWdodF0pO1xuICB9XG4gIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5sZWZ0ID0gdmFsdWVbMF07XG4gICAgdGhpcy5yaWdodCA9IHZhbHVlWzFdO1xuICAgIHZhciBwaXhlbExlZnQgPSBwYXJzZUludCh0aGlzLmJhci51bml0VG9QaXhlbCh0aGlzLmJhci51c2VyVG9Vbml0KHRoaXMubGVmdCkpKTtcbiAgICB2YXIgcGl4ZWxSaWdodCA9IHBhcnNlSW50KHRoaXMuYmFyLnVuaXRUb1BpeGVsKHRoaXMuYmFyLnVzZXJUb1VuaXQodGhpcy5yaWdodCkpKTtcbiAgICB0aGlzLmVsLnN0eWxlLmxlZnQgPSBgJHtwaXhlbExlZnR9cHhgO1xuICAgIHRoaXMuZWwuc3R5bGUud2lkdGggPSBgJHtwaXhlbFJpZ2h0IC0gcGl4ZWxMZWZ0fXB4YDtcbiAgICB0aGlzLmxhYmVsLmlubmVySFRNTCA9IHRoaXMuYmFyLm9wdGlvbnMuZ2hvc3RMYWJlbCh2YWx1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2hvc3Q7Il19
},{"./emitter":4}],6:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utils = _dereq_('./utils');

var _emitter = _dereq_('./emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var Range = (function () {
  function Range(options) {
    var _this = this;

    _classCallCheck(this, Range);

    this.bar = options.bar;
    this.id = options.id;
    this.allowChange = options.allowChange;

    this.el = document.createElement('div');
    this.el.className = 'multirangeslider-range';

    this.label = document.createElement('div');
    this.label.className = 'multirangeslider-label';
    this.el.appendChild(this.label);

    this.right_handler = document.createElement('div');
    this.right_handler.className = 'multirangeslider-right-handler';
    this.el.appendChild(this.right_handler);

    this.left_handler = document.createElement('div');
    this.left_handler.className = 'multirangeslider-left-handler';
    this.el.appendChild(this.left_handler);

    this.pressed = false;
    this.isRemoving = false;
    this._value = options.value;

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
    this.setValue(options.value);
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
      if (this.allowChange === false) {
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
        (0, _utils.addClass)(this.el, 'multirangeslider-pressed');
        (0, _utils.addClass)(this.el, 'multirangeslider-pressed-' + this.pressedMode);
        this.pressedPosition = this.bar.roundUserValue(this.bar.getCursor(event));
        this.emitter.emit('click', this.data());
      }
    }
  }, {
    key: 'renderRemovePopup',
    value: function renderRemovePopup() {
      this.isRemoving = true;

      this.elRemovePopup = document.createElement('div');
      this.elRemovePopup.className = 'multirangeslider-remove-popup';

      this.elRemoveLabel = document.createElement('div');
      this.elRemoveLabel.className = 'multirangeslider-remove-label';
      this.elRemoveLabel.innerHTML = '×';

      this.elRemovePopup.appendChild(this.elRemoveLabel);
      this.el.appendChild(this.elRemovePopup);
    }
  }, {
    key: 'removeRemovingPopup',
    value: function removeRemovingPopup() {
      this.isRemoving = false;
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

        if (newLeft < this.bar.options.min) {
          return;
        }
        if (newRight > this.bar.options.max) {
          return;
        }

        if (newRight < newLeft) {
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

        if (this.bar.options.allowRemove) {
          if (newRight - newLeft < this.bar.options.minWidth) {
            if (!this.isRemoving) {
              this.renderRemovePopup();
            }
          } else {
            if (this.isRemoving) {
              this.removeRemovingPopup();
            }
          }
        } else {
          if (newRight - newLeft < this.bar.options.minWidth) {
            return;
          }
        }

        if (newRight == newLeft) {
          (0, _utils.addClass)(this.el, 'multirangeslider-zero-width');
        } else {
          (0, _utils.removeClass)(this.el, 'multirangeslider-zero-width');
        }

        this.setValue([newLeft, newRight]);
        this.emitter.emit('changing', this.data());
      }
    }
  }, {
    key: 'mouseup',
    value: function mouseup(event) {
      if (this.isRemoving) {
        this.removeRemovingPopup();
        this.emitter.emit('remove', this.data());
      }
      (0, _utils.removeClass)(this.el, 'multirangeslider-pressed');
      (0, _utils.removeClass)(this.el, 'multirangeslider-pressed-' + this.pressedMode);
      if ([this.el, this.left_handler, this.right_handler, this.label].indexOf(event.target) === -1 && !this.pressed) {
        return;
      }

      this.pressed = false;
      this.pressedPosition = undefined;

      var old_value = this._value;
      var new_value = this.data().val;
      if (new_value[0] != old_value[0] || new_value[1] != old_value[1]) {
        this.emitter.emit('change', this.data());
        this._value = [new_value[0], new_value[1]];
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var pixelLeft = parseInt(this.bar.unitToPixel(this.bar.userToUnit(this.left)));
      var pixelRight = parseInt(this.bar.unitToPixel(this.bar.userToUnit(this.right)));
      this.el.style.left = pixelLeft + 'px';
      this.el.style.width = pixelRight - pixelLeft + 'px';
      if (this.right - this.left < this.bar.options.minWidth) {
        this.label.innerHTML = '';
      } else {
        this.label.innerHTML = this.bar.options.label([this.left, this.right], this.data());
      }
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      this.left = value[0];
      this.right = value[1];
      this.render();
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return [this.left, this.right].map(this.bar.options.valueFormat);
    }
  }, {
    key: 'data',
    value: function data(_data) {
      if (_data !== undefined) {
        if (_data.val !== undefined) {
          this.setValue(_data.val);
        }
        if (_data.allowChange !== undefined) {
          this.allowChange = _data.allowChange;
        }
      }
      return {
        id: this.id,
        val: this.getValue(),
        el: this.el,
        allowChange: this.allowChange
      };
    }
  }]);

  return Range;
})();

exports['default'] = Range;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXZlbC9wcm9qZWN0cy9sZWFybi9tdWx0aXJhbmdlc2xpZGVyL2Rldi9tb2R1bGVzL3JhbmdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztxQkFHUSxTQUFTOzt1QkFDSSxXQUFXOzs7O0lBRTFCLEtBQUs7QUFDRSxXQURQLEtBQUssQ0FDRyxPQUFPLEVBQUU7OzswQkFEakIsS0FBSzs7QUFFUCxRQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDdkIsUUFBSSxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDO0FBQ3JCLFFBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQzs7QUFFdkMsUUFBSSxDQUFDLEVBQUUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hDLFFBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxHQUFHLHdCQUF3QixDQUFDOztBQUU3QyxRQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDM0MsUUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsd0JBQXdCLENBQUM7QUFDaEQsUUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUVoQyxRQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbkQsUUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsZ0NBQWdDLENBQUM7QUFDaEUsUUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDOztBQUV4QyxRQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbEQsUUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsK0JB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QUMsQ0FBQztBQUN0QixVQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDZjs7O1dBRU8sb0JBQUc7QUFDVCxhQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ2xFOzs7V0FFRyxjQUFDLEtBQUksRUFBRTtBQUNULFVBQUksS0FBSSxLQUFLLFNBQVMsRUFBRTtBQUN0QixZQUFJLEtBQUksQ0FBQyxHQUFHLEtBQUssU0FBUyxFQUFFO0FBQzFCLGNBQUksQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQ3hCO0FBQ0QsWUFBSSxLQUFJLENBQUMsV0FBVyxLQUFLLFNBQVMsRUFBRTtBQUNsQyxjQUFJLENBQUMsV0FBVyxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUE7U0FDcEM7T0FDRjtBQUNELGFBQU87QUFDTCxVQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7QUFDWCxXQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUNwQixVQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7QUFDWCxtQkFBVyxFQUFFLElBQUksQ0FBQyxXQUFXO09BQzlCLENBQUE7S0FDRjs7O1NBN09HLEtBQUs7OztxQkFnUEksS0FBSyIsImZpbGUiOiIvVXNlcnMvcGF2ZWwvcHJvamVjdHMvbGVhcm4vbXVsdGlyYW5nZXNsaWRlci9kZXYvbW9kdWxlcy9yYW5nZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGFkZENsYXNzLFxuICByZW1vdmVDbGFzcyxcbn0gZnJvbSAgJy4vdXRpbHMnO1xuaW1wb3J0ICBFbWl0dGVyIGZyb20gJy4vZW1pdHRlcic7XG5cbmNsYXNzIFJhbmdlIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuYmFyID0gb3B0aW9ucy5iYXI7XG4gICAgdGhpcy5pZCA9IG9wdGlvbnMuaWQ7XG4gICAgdGhpcy5hbGxvd0NoYW5nZSA9IG9wdGlvbnMuYWxsb3dDaGFuZ2U7XG5cbiAgICB0aGlzLmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5lbC5jbGFzc05hbWUgPSAnbXVsdGlyYW5nZXNsaWRlci1yYW5nZSc7XG5cbiAgICB0aGlzLmxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5sYWJlbC5jbGFzc05hbWUgPSAnbXVsdGlyYW5nZXNsaWRlci1sYWJlbCc7XG4gICAgdGhpcy5lbC5hcHBlbmRDaGlsZCh0aGlzLmxhYmVsKTtcblxuICAgIHRoaXMucmlnaHRfaGFuZGxlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucmlnaHRfaGFuZGxlci5jbGFzc05hbWUgPSAnbXVsdGlyYW5nZXNsaWRlci1yaWdodC1oYW5kbGVyJztcbiAgICB0aGlzLmVsLmFwcGVuZENoaWxkKHRoaXMucmlnaHRfaGFuZGxlcik7XG5cbiAgICB0aGlzLmxlZnRfaGFuZGxlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMubGVmdF9oYW5kbGVyLmNsYXNzTmFtZSA9ICdtdWx0aXJhbmdlc2xpZGVyLWxlZnQtaGFuZGxlcic7XG4gICAgdGhpcy5lbC5hcHBlbmRDaGlsZCh0aGlzLmxlZnRfaGFuZGxlcik7XG5cbiAgICB0aGlzLnByZXNzZWQgPSBmYWxzZTtcbiAgICB0aGlzLmlzUmVtb3ZpbmcgPSBmYWxzZTtcbiAgICB0aGlzLl92YWx1ZSA9IG9wdGlvbnMudmFsdWU7XG5cbiAgICB0aGlzLl9tb3VzZW1vdmUgPSAoZXZlbnQpPT4gdGhpcy5tb3VzZW1vdmUoZXZlbnQpO1xuICAgIHRoaXMuX21vdXNldXAgPSAoZXZlbnQpPT4gdGhpcy5tb3VzZXVwKGV2ZW50KTtcbiAgICB0aGlzLl9tb3VzZWRvd24gPSAoZXZlbnQpPT4gdGhpcy5tb3VzZWRvd24oZXZlbnQpO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5fbW91c2Vtb3ZlKTtcbiAgICB0aGlzLmJhci5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9tb3VzZWRvd24pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9tb3VzZXVwKTtcbiAgICB0aGlzLmVsLm9uZHJhZ3N0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuICAgIHRoaXMuc2V0VmFsdWUob3B0aW9ucy52YWx1ZSk7XG4gIH1cblxuICByZW1vdmVFdmVudHMoKSB7XG4gICAgdGhpcy5iYXIuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5fbW91c2Vkb3duKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9tb3VzZW1vdmUpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9tb3VzZXVwKTtcbiAgfVxuXG4gIG1vdXNlZG93bihldmVudCkge1xuICAgIGlmICh0aGlzLmFsbG93Q2hhbmdlID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoW3RoaXMuZWwsIHRoaXMubGFiZWxdLmluZGV4T2YoZXZlbnQudGFyZ2V0KSAhPT0gLTEpIHtcbiAgICAgIHRoaXMucHJlc3NlZCA9IHRydWU7XG4gICAgICB0aGlzLnByZXNzZWRNb2RlID0gJ3RoaXMnO1xuICAgIH1cbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMucmlnaHRfaGFuZGxlcikge1xuICAgICAgdGhpcy5wcmVzc2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMucHJlc3NlZE1vZGUgPSAncmlnaHQnO1xuICAgIH1cbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMubGVmdF9oYW5kbGVyKSB7XG4gICAgICB0aGlzLnByZXNzZWQgPSB0cnVlO1xuICAgICAgdGhpcy5wcmVzc2VkTW9kZSA9ICdsZWZ0JztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcmVzc2VkKSB7XG4gICAgICBhZGRDbGFzcyh0aGlzLmVsLCAnbXVsdGlyYW5nZXNsaWRlci1wcmVzc2VkJyk7XG4gICAgICBhZGRDbGFzcyh0aGlzLmVsLCBgbXVsdGlyYW5nZXNsaWRlci1wcmVzc2VkLSR7dGhpcy5wcmVzc2VkTW9kZX1gKTtcbiAgICAgIHRoaXMucHJlc3NlZFBvc2l0aW9uID0gdGhpcy5iYXIucm91bmRVc2VyVmFsdWUodGhpcy5iYXIuZ2V0Q3Vyc29yKGV2ZW50KSk7XG4gICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnY2xpY2snLCB0aGlzLmRhdGEoKSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyUmVtb3ZlUG9wdXAoKSB7XG4gICAgdGhpcy5pc1JlbW92aW5nID0gdHJ1ZTtcblxuICAgIHRoaXMuZWxSZW1vdmVQb3B1cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuZWxSZW1vdmVQb3B1cC5jbGFzc05hbWUgPSAnbXVsdGlyYW5nZXNsaWRlci1yZW1vdmUtcG9wdXAnO1xuXG4gICAgdGhpcy5lbFJlbW92ZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5lbFJlbW92ZUxhYmVsLmNsYXNzTmFtZSA9ICdtdWx0aXJhbmdlc2xpZGVyLXJlbW92ZS1sYWJlbCc7XG4gICAgdGhpcy5lbFJlbW92ZUxhYmVsLmlubmVySFRNTCA9ICfDlyc7XG5cbiAgICB0aGlzLmVsUmVtb3ZlUG9wdXAuYXBwZW5kQ2hpbGQodGhpcy5lbFJlbW92ZUxhYmVsKTtcbiAgICB0aGlzLmVsLmFwcGVuZENoaWxkKHRoaXMuZWxSZW1vdmVQb3B1cCk7XG4gIH1cblxuICByZW1vdmVSZW1vdmluZ1BvcHVwKCkge1xuICAgIHRoaXMuaXNSZW1vdmluZyA9IGZhbHNlO1xuICAgIHRoaXMuZWwucmVtb3ZlQ2hpbGQodGhpcy5lbFJlbW92ZVBvcHVwKTtcbiAgfVxuXG4gIG1vdXNlbW92ZShldmVudCkge1xuICAgIGlmICh0aGlzLnByZXNzZWQpIHtcbiAgICAgIGxldCBjdXJzb3IgPSB0aGlzLmJhci5nZXRDdXJzb3IoZXZlbnQpO1xuICAgICAgbGV0IGRpZmZlcmVuY2UgPSBjdXJzb3IgLSB0aGlzLnByZXNzZWRQb3NpdGlvbjtcbiAgICAgIGxldCByb3VuZERpZmZlcmVuY2UgPSB0aGlzLmJhci5yb3VuZFVzZXJWYWx1ZShkaWZmZXJlbmNlKTtcblxuICAgICAgaWYgKHJvdW5kRGlmZmVyZW5jZSA9PSAwKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBsZXQgbmV3UmlnaHQgPSB0aGlzLnJpZ2h0O1xuICAgICAgbGV0IG5ld0xlZnQgPSB0aGlzLmxlZnQ7XG5cbiAgICAgIGlmICh0aGlzLnByZXNzZWRNb2RlID09ICd0aGlzJykge1xuICAgICAgICBuZXdSaWdodCArPSByb3VuZERpZmZlcmVuY2U7XG4gICAgICAgIG5ld0xlZnQgKz0gcm91bmREaWZmZXJlbmNlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucHJlc3NlZE1vZGUgPT0gJ3JpZ2h0Jykge1xuICAgICAgICBuZXdSaWdodCArPSByb3VuZERpZmZlcmVuY2U7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wcmVzc2VkTW9kZSA9PSAnbGVmdCcpIHtcbiAgICAgICAgbmV3TGVmdCArPSByb3VuZERpZmZlcmVuY2U7XG4gICAgICB9XG5cblxuICAgICAgaWYgKG5ld0xlZnQgPCB0aGlzLmJhci5vcHRpb25zLm1pbikge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGlmIChuZXdSaWdodCA+IHRoaXMuYmFyLm9wdGlvbnMubWF4KSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAobmV3UmlnaHQgPCBuZXdMZWZ0KSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBsZXQgaW50ZXJzZWN0aW9uID0gZmFsc2U7XG5cbiAgICAgIGZvciAobGV0IHJhbmdlIG9mIHRoaXMuYmFyLnJhbmdlTGlzdCkge1xuICAgICAgICBpZiAoaW50ZXJzZWN0aW9uKSB7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmFuZ2UgPT0gdGhpcykge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhbmdlLmxlZnQgPCBuZXdSaWdodCAmJiBuZXdSaWdodCA8PSByYW5nZS5yaWdodCkge1xuICAgICAgICAgIGludGVyc2VjdGlvbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhbmdlLmxlZnQgPD0gbmV3TGVmdCAmJiBuZXdMZWZ0IDwgcmFuZ2UucmlnaHQpIHtcbiAgICAgICAgICBpbnRlcnNlY3Rpb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdMZWZ0IDw9IHJhbmdlLmxlZnQgJiYgcmFuZ2UucmlnaHQgPD0gbmV3UmlnaHQpIHtcbiAgICAgICAgICBpbnRlcnNlY3Rpb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpbnRlcnNlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLnByZXNzZWRQb3NpdGlvbiArPSByb3VuZERpZmZlcmVuY2U7XG5cbiAgICAgIGlmICh0aGlzLmJhci5vcHRpb25zLmFsbG93UmVtb3ZlKSB7XG4gICAgICAgIGlmIChuZXdSaWdodCAtIG5ld0xlZnQgPCB0aGlzLmJhci5vcHRpb25zLm1pbldpZHRoKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLmlzUmVtb3ZpbmcpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyUmVtb3ZlUG9wdXAoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy5pc1JlbW92aW5nKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVJlbW92aW5nUG9wdXAoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChuZXdSaWdodCAtIG5ld0xlZnQgPCB0aGlzLmJhci5vcHRpb25zLm1pbldpZHRoKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXdSaWdodCA9PSBuZXdMZWZ0KSB7XG4gICAgICAgIGFkZENsYXNzKHRoaXMuZWwsICdtdWx0aXJhbmdlc2xpZGVyLXplcm8td2lkdGgnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuZWwsICdtdWx0aXJhbmdlc2xpZGVyLXplcm8td2lkdGgnKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRWYWx1ZShbbmV3TGVmdCwgbmV3UmlnaHRdKTtcbiAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdjaGFuZ2luZycsIHRoaXMuZGF0YSgpKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZXVwKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuaXNSZW1vdmluZykge1xuICAgICAgdGhpcy5yZW1vdmVSZW1vdmluZ1BvcHVwKCk7XG4gICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgncmVtb3ZlJywgdGhpcy5kYXRhKCkpO1xuICAgIH1cbiAgICByZW1vdmVDbGFzcyh0aGlzLmVsLCAnbXVsdGlyYW5nZXNsaWRlci1wcmVzc2VkJyk7XG4gICAgcmVtb3ZlQ2xhc3ModGhpcy5lbCwgYG11bHRpcmFuZ2VzbGlkZXItcHJlc3NlZC0ke3RoaXMucHJlc3NlZE1vZGV9YCk7XG4gICAgaWYgKChbdGhpcy5lbCwgdGhpcy5sZWZ0X2hhbmRsZXIsIHRoaXMucmlnaHRfaGFuZGxlciwgdGhpcy5sYWJlbF0uaW5kZXhPZihldmVudC50YXJnZXQpID09PSAtMSkgJiYgKCF0aGlzLnByZXNzZWQpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLnByZXNzZWQgPSBmYWxzZTtcbiAgICB0aGlzLnByZXNzZWRQb3NpdGlvbiA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBvbGRfdmFsdWUgPSB0aGlzLl92YWx1ZTtcbiAgICBsZXQgbmV3X3ZhbHVlID0gdGhpcy5kYXRhKCkudmFsO1xuICAgIGlmICgobmV3X3ZhbHVlWzBdICE9IG9sZF92YWx1ZVswXSkgfHwgKG5ld192YWx1ZVsxXSAhPSBvbGRfdmFsdWVbMV0pKSB7XG4gICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnY2hhbmdlJywgdGhpcy5kYXRhKCkpO1xuICAgICAgdGhpcy5fdmFsdWUgPSBbbmV3X3ZhbHVlWzBdLCBuZXdfdmFsdWVbMV1dO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgcGl4ZWxMZWZ0ID0gcGFyc2VJbnQodGhpcy5iYXIudW5pdFRvUGl4ZWwodGhpcy5iYXIudXNlclRvVW5pdCh0aGlzLmxlZnQpKSk7XG4gICAgdmFyIHBpeGVsUmlnaHQgPSBwYXJzZUludCh0aGlzLmJhci51bml0VG9QaXhlbCh0aGlzLmJhci51c2VyVG9Vbml0KHRoaXMucmlnaHQpKSk7XG4gICAgdGhpcy5lbC5zdHlsZS5sZWZ0ID0gYCR7cGl4ZWxMZWZ0fXB4YDtcbiAgICB0aGlzLmVsLnN0eWxlLndpZHRoID0gYCR7cGl4ZWxSaWdodCAtIHBpeGVsTGVmdH1weGA7XG4gICAgaWYgKHRoaXMucmlnaHQgLSB0aGlzLmxlZnQgPCB0aGlzLmJhci5vcHRpb25zLm1pbldpZHRoKSB7XG4gICAgICB0aGlzLmxhYmVsLmlubmVySFRNTCA9ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxhYmVsLmlubmVySFRNTCA9IHRoaXMuYmFyLm9wdGlvbnMubGFiZWwoW3RoaXMubGVmdCwgdGhpcy5yaWdodF0sIHRoaXMuZGF0YSgpKTtcbiAgICB9XG4gIH1cblxuICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMubGVmdCA9IHZhbHVlWzBdO1xuICAgIHRoaXMucmlnaHQgPSB2YWx1ZVsxXTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgZ2V0VmFsdWUoKSB7XG4gICAgcmV0dXJuIFt0aGlzLmxlZnQsIHRoaXMucmlnaHRdLm1hcCh0aGlzLmJhci5vcHRpb25zLnZhbHVlRm9ybWF0KTtcbiAgfVxuXG4gIGRhdGEoZGF0YSkge1xuICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChkYXRhLnZhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuc2V0VmFsdWUoZGF0YS52YWwpXG4gICAgICB9XG4gICAgICBpZiAoZGF0YS5hbGxvd0NoYW5nZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuYWxsb3dDaGFuZ2UgPSBkYXRhLmFsbG93Q2hhbmdlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBpZDogdGhpcy5pZCxcbiAgICAgIHZhbDogdGhpcy5nZXRWYWx1ZSgpLFxuICAgICAgZWw6IHRoaXMuZWwsXG4gICAgICBhbGxvd0NoYW5nZTogdGhpcy5hbGxvd0NoYW5nZVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSYW5nZTsiXX0=
},{"./emitter":4,"./utils":7}],7:[function(_dereq_,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXZlbC9wcm9qZWN0cy9sZWFybi9tdWx0aXJhbmdlc2xpZGVyL2Rldi9tb2R1bGVzL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBSSxRQUFRLEdBQUcsU0FBWCxRQUFRLENBQWEsSUFBSSxFQUFFLFNBQVMsRUFBRTtBQUN4QyxTQUFPLElBQUksTUFBTSxDQUFDLEdBQUcsR0FBRyxTQUFTLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0NBQzNFLENBQUM7O0FBRUYsSUFBSSxRQUFRLEdBQUcsU0FBWCxRQUFRLENBQWEsSUFBSSxFQUFFLFNBQVMsRUFBRTtBQUN4QyxNQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsRUFBRTtBQUM5QixRQUFJLENBQUMsU0FBUyxJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUM7R0FDbkM7Q0FDRixDQUFDOztBQUVGLElBQUksV0FBVyxHQUFHLFNBQWQsV0FBVyxDQUFhLElBQUksRUFBRSxTQUFTLEVBQUU7QUFDM0MsTUFBSSxRQUFRLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDcEUsTUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxFQUFFO0FBQzdCLFdBQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsU0FBUyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNuRCxjQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsU0FBUyxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztLQUN6RDtBQUNELFFBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7R0FDckQ7Q0FDRixDQUFDOztRQUlBLFFBQVEsR0FBUixRQUFRO1FBQ1IsUUFBUSxHQUFSLFFBQVE7UUFDUixXQUFXLEdBQVgsV0FBVyIsImZpbGUiOiIvVXNlcnMvcGF2ZWwvcHJvamVjdHMvbGVhcm4vbXVsdGlyYW5nZXNsaWRlci9kZXYvbW9kdWxlcy91dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBoYXNDbGFzcyA9IGZ1bmN0aW9uIChlbGVtLCBjbGFzc05hbWUpIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoJyAnICsgY2xhc3NOYW1lICsgJyAnKS50ZXN0KCcgJyArIGVsZW0uY2xhc3NOYW1lICsgJyAnKTtcbn07XG5cbnZhciBhZGRDbGFzcyA9IGZ1bmN0aW9uIChlbGVtLCBjbGFzc05hbWUpIHtcbiAgaWYgKCFoYXNDbGFzcyhlbGVtLCBjbGFzc05hbWUpKSB7XG4gICAgZWxlbS5jbGFzc05hbWUgKz0gJyAnICsgY2xhc3NOYW1lO1xuICB9XG59O1xuXG52YXIgcmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbiAoZWxlbSwgY2xhc3NOYW1lKSB7XG4gIHZhciBuZXdDbGFzcyA9ICcgJyArIGVsZW0uY2xhc3NOYW1lLnJlcGxhY2UoL1tcXHRcXHJcXG5dL2csICcgJykgKyAnICc7XG4gIGlmIChoYXNDbGFzcyhlbGVtLCBjbGFzc05hbWUpKSB7XG4gICAgd2hpbGUgKG5ld0NsYXNzLmluZGV4T2YoJyAnICsgY2xhc3NOYW1lICsgJyAnKSA+PSAwKSB7XG4gICAgICBuZXdDbGFzcyA9IG5ld0NsYXNzLnJlcGxhY2UoJyAnICsgY2xhc3NOYW1lICsgJyAnLCAnICcpO1xuICAgIH1cbiAgICBlbGVtLmNsYXNzTmFtZSA9IG5ld0NsYXNzLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbiAgfVxufTtcblxuXG5leHBvcnQge1xuICBoYXNDbGFzcyxcbiAgYWRkQ2xhc3MsXG4gIHJlbW92ZUNsYXNzLFxufTtcbiJdfQ==
},{}]},{},[1])(1)
});
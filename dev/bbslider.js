import Bar from './modules/bar'

class BBSlider {
  // this class handles public api for the whole project.
  // all methods should have data validation

  constructor(options={}) {
    this._bar = new Bar(options);
    this.el = this._bar.el;
  }

  _validateRangeValue(value, options) {
    if (!Array.isArray(value) || value.length != 2) {
      throw Error;
    }
    return true;
  }

  _validateValue(value, options) {
    if (!Array.isArray(value)) {
      throw Error;
    }
    for (let range_value of value) {
      this._validateRangeValue(range_value);
    }
    return true;
  }

  addRange(value, options) {
    options = Object.assign({
      id: undefined
    }, options);

    if (this._validateRangeValue(value, options)) {
      if (options.id !== undefined && this._bar.rangeList.find(x => x.id === options.id)) {
        throw( new Error('range with this id already exists'));
      }
      if (this._bar.isInsideRange(value[0]) || this._bar.isInsideRange(value[1])) {
        throw( new Error('intersection'));
      }
      for (let range of this._bar.rangeList) {
        if (value[0] <= range.left && range.right <= value[1]) {
          throw( new Error('intersection'));
        }
      }
      this._bar.addRange(value, options);
    }
  }

  removeRange(options) {
    if (typeof options !== 'object') {
      throw(new Error('wrong data'));
    }
    if (options.id === undefined) {
      throw(new Error('wrong data'));
    }
    return this._bar.removeRange(options);
  }

  val(value, options) {
    if (value === undefined) {
      return this._bar.getValue();
    } else {
      if (this._validateValue(value, options)) {
        this._bar.setValue(value, options);
      }
    }
  }

  on(subject, cb) {
    this._bar.emitter.addListener(subject, cb);
  }
  off(subject, cb) {
    this._bar.emitter.removeListener(subject, cb);
  }
}

export default BBSlider;
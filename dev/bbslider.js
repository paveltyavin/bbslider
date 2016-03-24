import Bar from './modules/bar'

class BBSlider {
  // this class handles public api for the whole project.
  // all methods should have data validation

  constructor(options={}) {
    this._validateOptions(options);
    this._bar = new Bar(options);
    this.el = this._bar.el;
  }

  _validateOptions(options) {
    for (let key of ['min', 'max', 'step']) {
      let value = options[key];
      if (value === undefined) {
        throw(new Error(`${key} option is mandatory`));
      }
      if (!Number.isInteger(value)) {
        throw(new Error(`${key} option should be integer`));
      }
    }
    if (options.max <= options.min) {
      throw(new Error('max should be greater than min'));
    }
    if ((options.max - options.min) % options.step !== 0) {
      throw(new Error('there should be an integer number of steps between min and max'));
    }

  }

  _validateRangeValue(value, options) {
    if (!Array.isArray(value) || value.length != 2) {
      throw Error;
    }
  }

  _validateValue(value, options) {
    if (!Array.isArray(value)) {
      throw Error;
    }
    for (let range_value of value) {
      this._validateRangeValue(range_value);
    }
  }

  addRange(value, options) {
    options = Object.assign({}, options);
    this._validateRangeValue(value, options);

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
      this._validateValue(value, options);
      this._bar.setValue(value, options);
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
import Bar from './modules/bar'

class multirangeslider {
  // This class handles all public api.

  constructor(options={}) {
    options = this._transformOptions(options);
    this._validateOptions(options);
    this._bar = new Bar(options);

    this.el = document.createElement('div');
    this.el.className = 'multirangeslider-slider';
    this.el.appendChild(this._bar.el);
  }

  _transformOptions(options) {
    if (options.valueParse) {
      for (let key of ['min', 'max', 'step', 'minWidth']) {
        options[key] = options.valueParse(options[key]);
      }
    }
    return options
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

    if (options.minWidth === undefined) {
      options.minWidth = options.step;
    }
    if (options.minWidth % options.step !== 0) {
      throw(new Error('there should be an integer number of steps in minWidth'));
    }

    if(options.maxRanges !== undefined ){
      if (!Number.isInteger(options.maxRanges)) {
        throw(new Error('maxRanges should be integer'));
      }
    }

    if ([true, false, undefined].indexOf(options.readOnly) === -1) {
      throw(new Error('readOnly option should be true, false or undefined'));
    }

  }

  _transformValue(value) {
    if (this._bar.options.valueParse) {
      value = value.map(this._bar.options.valueParse)
    }
    return value
  }

  _validateValue(value) {
    if (!Array.isArray(value) || value.length != 2) {
      throw Error;
    }
  }

  add(value, options) {
    options = Object.assign({}, options);
    value = this._transformValue(value);
    this._validateValue(value);

    if (options.id !== undefined && this._bar.rangeList.find(x => x.id === options.id)) {
      throw( new Error('range with this id already exists'));
    }
    if (this._bar.getInsideRange(value[0]) || this._bar.getInsideRange(value[1])) {
      throw( new Error('intersection'));
    }
    for (let range of this._bar.rangeList) {
      if (value[0] <= range.left && range.right <= value[1]) {
        throw( new Error('intersection'));
      }
    }
    return this._bar.add(value, options);
  }

  remove(rangeId) {
    if (!Number.isInteger(rangeId)) {
      throw(new Error('wrong data'));
    }
    return this._bar.remove(rangeId);
  }

  removeAll() {
    for (let range of this._bar.rangeList) {
      this._bar.remove(range.id);
    }
  }

  rangeValue(rangeId, value) {
    if (!Number.isInteger(rangeId)) {
      throw('rangeId should be integer');
    }
    let range = this._bar.rangeList.find(x => x.id === rangeId);
    if (!range) {
      return false;
    }
    if (value === undefined) {
      return range.getValue();
    } else {
      return range.setValue(value);
    }
  }


  val() {
    return this._bar.getValue();
  }

  data() {
    return this._bar.data();
  }

  on(subject, cb) {
    this._bar.emitter.addListener(subject, cb);
  }
  off(subject, cb) {
    this._bar.emitter.removeListener(subject, cb);
  }
}

export default multirangeslider;
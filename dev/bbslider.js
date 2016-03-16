import Bar from './modules/bar'

class BBSlider {
  // this class handles public api for the whole project.
  // all methods should have data validation

  constructor(options={}) {
    this._bar = new Bar(options);
    this.el = this._bar.el;
  }

  val(value) {
    if (value == undefined) {
      return this._bar.getValue();
    } else {
      this._bar.setValue(value);
    }
  }
}

export default BBSlider;
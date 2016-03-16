class Base {
  // This class contains methods to calculate different measurements for Bar class
  pixelToUnit(value) {
    let rect = this.el.getBoundingClientRect();
    let width = rect.width;
    if (width == 0) {
      throw new Error('element width is 0 or element is not attached to dom')
    }
    return value / width;
  }

  unitToPixel(value) {
    let rect = this.el.getBoundingClientRect();
    let width = rect.width;
    return value * width;
  }

  unitToUser(value) {
    return (this.options.max - this.options.min) * value + this.options.min;
  }

  userToUnit(value) {
    return (value - this.options.min) / (this.options.max - this.options.min);
  }

  roundUserValue(value) {
    return this.options.min + Math.floor((value - this.options.min) / this.options.step) * this.options.step;
  }

  getCursor(event) {
    // event is mousemove event
    // returns unitValue of place where the event has been made

    let rect = this.el.getBoundingClientRect();
    let x = event.clientX - rect.left;
    return this.unitToUser(this.pixelToUnit(x));
  }
}

export default Base;
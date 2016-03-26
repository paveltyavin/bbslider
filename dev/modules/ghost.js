import  Emitter from './emitter';


class Ghost {
  constructor(options) {
    this.bar = options.bar;

    this.el = document.createElement('div');
    this.el.className = 'bbslider-ghost';

    this.pressed = false;

    this._mousemove = (event)=> this.mousemove(event);
    this._mousedown = (event)=> this.mousedown(event);
    this._mouseup = (event)=> this.mouseup(event);

    this.bar.el.addEventListener('mousemove', this._mousemove);
    this.bar.el.addEventListener('mousedown', this._mousedown);
    this.bar.el.addEventListener('mouseup', this._mouseup);
  }


  removeEvents() {
    this.bar.el.removeEventListener('mousemove', this._mousemove);
    this.bar.el.removeEventListener('mousedown', this._mousedown);
    this.bar.el.removeEventListener('mouseup', this._mouseup);
  }

  mousedown(event) {
    if (this.el == event.target) {
      this.pressed = true
    }
  }

  mouseup(event) {
    this.pressed = false;
  }
  mousemove(event) {
    let cursor = this.bar.getCursor(event);

    if (this.bar.isInsideRange(cursor) && !this.pressed) {
      this.bar.removeGhost();
    }

    cursor = this.bar.roundUserValue(cursor);
    let left = this.left;
    let right = this.right;

    if (this.pressed) {
      if (cursor <= left) {
        left = cursor;
       } else {
        right = cursor + this.bar.options.step;
      }
    } else {
      [left, right] = [cursor, cursor + this.bar.options.step];
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
  setValue(value) {
    this.left = value[0];
    this.right = value[1];
    var pixelLeft = parseInt(this.bar.unitToPixel(this.bar.userToUnit(this.left)));
    var pixelRight = parseInt(this.bar.unitToPixel(this.bar.userToUnit(this.right)));
    this.el.style.left = `${pixelLeft}px`;
    this.el.style.width = `${pixelRight - pixelLeft}px`;
  }
}

export default Ghost;
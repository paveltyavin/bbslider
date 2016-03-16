import  Emitter from './emitter';


class Ghost {
  constructor(options) {
    this.bar = options.bar;

    this.el = document.createElement('div');
    this.el.className = 'bbslider-ghost';

    this.pressed = false;
    this.bar.el.addEventListener('mousemove', (event)=> this.mousemove(event));
    this.bar.el.addEventListener('mousedown', (event)=> this.mousedown(event));
    this.bar.el.addEventListener('mouseup', (event)=> this.mouseup(event));
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
      this.setValue(left, right);
    }
  }
  setValue(left, right) {
    this.left = left;
    this.right = right;
    var percentLeft = this.bar.userToUnit(left) * 100;
    var percentRight = this.bar.userToUnit(right) * 100;
    this.el.style.left = `${percentLeft}%`;
    this.el.style.width = `${percentRight - percentLeft}%`;
  }
}

export default Ghost;
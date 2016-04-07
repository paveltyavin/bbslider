import  Emitter from './emitter';


class Ghost {
  constructor(options) {
    this.bar = options.bar;

    this.el = document.createElement('div');
    this.el.className = 'multirangeslider-ghost';

    this.label = document.createElement('div');
    this.label.className = 'multirangeslider-label';
    this.el.appendChild(this.label);

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
    if ([this.el, this.label].indexOf(event.target) !== -1) {
      this.pressed = true
    }
  }

  mouseup(event) {
    this.pressed = false;
  }
  mousemove(event) {
    let cursor = this.bar.getCursor(event);

    if (this.bar.getInsideRange(cursor)) {
      if (!this.pressed) {
        this.bar.removeGhost();
      }
      return
    }

    let center = (this.left + this.right) / 2;
    cursor = this.bar.roundUserValue(cursor);

    let h = this.bar.options.minWidth / (this.bar.options.step);
    let dLeft = Math.floor(h / 2) * this.bar.options.step;
    let dRight = Math.floor((h + 1) / 2) * this.bar.options.step;

    let [newLeft, newRight] = [this.left, this.right];

    if (this.pressed) {
      if (cursor < center) {
        newLeft = cursor - dLeft;
      }
      if (cursor > center) {
        newRight = cursor + dRight;
      }
    } else {
      [newLeft, newRight] = [cursor - dLeft, cursor + dRight];
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
      return
    }

    if (this.bar.isOverRange(newLeft, newRight)) {
      return
    }

    this.setValue([newLeft, newRight]);
  }
  setValue(value) {
    this.left = value[0];
    this.right = value[1];
    var pixelLeft = parseInt(this.bar.unitToPixel(this.bar.userToUnit(this.left)));
    var pixelRight = parseInt(this.bar.unitToPixel(this.bar.userToUnit(this.right)));
    this.el.style.left = `${pixelLeft}px`;
    this.el.style.width = `${pixelRight - pixelLeft}px`;
    this.label.innerHTML = this.bar.options.ghostLabel(value);
  }
}

export default Ghost;
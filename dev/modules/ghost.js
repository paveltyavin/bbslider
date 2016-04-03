import  Emitter from './emitter';


class Ghost {
  constructor(options) {
    this.bar = options.bar;

    this.el = document.createElement('div');
    this.el.className = 'bbslider-ghost';

    this.label = document.createElement('div');
    this.label.className = 'bbslider-label';
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

    cursor = this.bar.roundUserValue(cursor);

    let newGhostValue = this.bar.getNewGhostValue(cursor);

    if (newGhostValue == null) {
      if (!this.pressed) {
        this.bar.removeGhost();
      }
      return
    }

    let center = (this.left + this.right) / 2;

    let [newLeft, newRight] = newGhostValue;

    if (this.pressed) {
      if (cursor < center) {
        newRight = this.right;
      }
      if (cursor > center) {
        newLeft = this.left;
      }
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
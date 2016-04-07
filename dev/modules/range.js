import {
  addClass,
  removeClass,
} from  './utils';
import  Emitter from './emitter';

class Range {
  constructor(options) {
    this.bar = options.bar;
    this.id = options.id;

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

    this._mousemove = (event)=> this.mousemove(event);
    this._mouseup = (event)=> this.mouseup(event);
    this._mousedown = (event)=> this.mousedown(event);

    document.addEventListener('mousemove', this._mousemove);
    this.bar.el.addEventListener('mousedown', this._mousedown);
    document.addEventListener('mouseup', this._mouseup);
    this.el.ondragstart = function () {
      return false;
    };

    this.emitter = new Emitter();
  }

  removeEvents() {
    this.bar.el.removeEventListener('mousedown', this._mousedown);
    document.removeEventListener('mousemove', this._mousemove);
    document.removeEventListener('mouseup', this._mouseup);
  }

  mousedown(event) {
    if (this.bar.options.readOnly) {
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
      addClass(this.el, 'multirangeslider-pressed');
      addClass(this.el, `multirangeslider-pressed-${this.pressedMode}`);
      this.pressedPosition = this.bar.roundUserValue(this.bar.getCursor(event));
      this.emitter.emit('range:click', {
        id: this.id
      });
    }
  }

  renderRemovePopup() {
    this.isRemoving = true;

    this.elRemovePopup = document.createElement('div');
    this.elRemovePopup.className = 'multirangeslider-remove-popup';

    this.elRemoveLabel = document.createElement('div');
    this.elRemoveLabel.className = 'multirangeslider-remove-label';
    this.elRemoveLabel.innerHTML = '×';

    this.elRemovePopup.appendChild(this.elRemoveLabel);
    this.el.appendChild(this.elRemovePopup);
  }

  removeRemovingPopup() {
    this.isRemoving = false;
    this.el.removeChild(this.elRemovePopup);
  }

  mousemove(event) {
    if (this.pressed) {
      let cursor = this.bar.getCursor(event);
      let difference = cursor - this.pressedPosition;
      let roundDifference = this.bar.roundUserValue(difference);

      if (roundDifference == 0) {
        return
      }

      let newRight = this.right;
      let newLeft = this.left;

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
        return
      }
      if (newRight > this.bar.options.max) {
        return
      }

      if (newRight < newLeft) {
        return
      }

      let intersection = false;

      for (let range of this.bar.rangeList) {
        if (intersection) {
          break
        }
        if (range == this) {
          continue
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

      if (intersection) {
        return
      }
      this.pressedPosition += roundDifference;

      if (this.bar.options.allowRemove) {
        if (newRight - newLeft < this.bar.options.minWidth) {
          if (!this.isRemoving) {
            this.renderRemovePopup()
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
        addClass(this.el, 'multirangeslider-zero-width');
      } else {
        removeClass(this.el, 'multirangeslider-zero-width');
      }

      this.setValue([newLeft, newRight]);
      this.emitter.emit('range:changing', {
        id: this.id,
        val: this.getValue()
      });
    }
  }

  mouseup(event) {
    this.pressed = false;
    if (this.isRemoving) {
      this.removeRemovingPopup();
      this.emitter.emit('range:remove', {
        id: this.id
      });
    }
    this.pressedPosition = undefined;
    removeClass(this.el, 'multirangeslider-pressed');
    removeClass(this.el, `multirangeslider-pressed-${this.pressedMode}`);
    if ([this.el, this.left_handler, this.right_handler, this.label].indexOf(event.target) === -1) {
      return
    }
    this.emitter.emit('range:change', {
      id: this.id,
      val: this.getValue()
    });
  }

  setValue(value) {
    this.left = value[0];
    this.right = value[1];
    var pixelLeft = parseInt(this.bar.unitToPixel(this.bar.userToUnit(this.left)));
    var pixelRight = parseInt(this.bar.unitToPixel(this.bar.userToUnit(this.right)));
    this.el.style.left = `${pixelLeft}px`;
    this.el.style.width = `${pixelRight - pixelLeft}px`;
    if (this.right - this.left < this.bar.options.minWidth) {
      this.label.innerHTML = '';
    } else {
      this.label.innerHTML = this.bar.options.rangeLabel(value, this.data());
    }
  }

  getValue() {
    return [this.left, this.right];
  }

  data() {
    return {
      id: this.id,
      val: this.getValue()
    }
  }
}

export default Range;
import {
  addClass,
  removeClass,
} from  './utils';
import  Emitter from './emitter';

class Range {
  constructor(options) {
    this.bar = options.bar;

    this.el = document.createElement('div');
    this.el.className = 'bbslider-range';

    this.right_handler = document.createElement('div');
    this.right_handler.className = 'bbslider-right-handler';
    this.el.appendChild(this.right_handler);

    this.left_handler = document.createElement('div');
    this.left_handler.className = 'bbslider-left-handler';
    this.el.appendChild(this.left_handler);

    this.pressed = false;

    this.bar.el.addEventListener('mousemove', (event)=> this.mousemove(event));
    this.bar.el.addEventListener('mousedown', (event)=> this.mousedown(event));
    this.bar.el.addEventListener('mouseup', (event)=> this.mouseup(event));
  }

  mousedown(event) {
    if (event.target == this.el) {
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
      addClass(this.el, 'pressed');
      this.pressedPosition = this.bar.roundUserValue(this.bar.getCursor(event));
    }
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

      if (newRight < newLeft) {
        return;
      }

      // not supported yet
      //if (newRight == newLeft && !this.bar.options.allowRemove){
      //  return
      //}

      if (newLeft < this.bar.options.min) {
        return
      }
      if (newRight > this.bar.options.max) {
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
      this.setValue(newLeft, newRight);
    }
  }

  mouseup(event) {
    this.pressed = false;
    this.pressedPosition = undefined;
    removeClass(this.el, 'pressed');
  }

  setValue(left, right) {
    this.left = left;
    this.right = right;
    var percentLeft = this.bar.userToUnit(left) * 100;
    var percentRight = this.bar.userToUnit(right) * 100;
    this.el.style.left = `${percentLeft}%`;
    this.el.style.width = `${percentRight - percentLeft}%`;
  }

  getValue() {
    return [this.left, this.right];
  }
}

export default Range;
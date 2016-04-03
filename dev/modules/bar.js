import Ghost from './ghost'
import Range from './range'
import Base from './base'
import Emitter from './emitter'
import {
  addClass
} from './utils'

class Bar extends Base {
  constructor(options = {}) {
    super();
    this.options = Object.assign({
      allowRemove: false,
      maxRanges: Infinity,
      ghostLabel: (value) => {
        return '+';
      },
      rangeLabel: (value) => {
        return value[0].toString() + '-' + value[1].toString();
      }
    }, options);

    this.el = document.createElement('div');
    this.el.className = 'bbslider-bar';
    if (this.options.readOnly === true) {
      addClass(this.el, 'bbslider-readonly')
    }
    this.el.addEventListener('mousemove', (event)=> this.mousemove(event));
    this.el.addEventListener('mouseleave', (event)=> this.mouseleave(event));
    this.el.addEventListener('mouseup', (event)=> this.mouseup(event));
    this.el.addEventListener('mousedown', (event)=> this.mousedown(event));
    this.el.ondragstart = function () {
      return false;
    };

    this.rangeIdCount = 0;
    this.rangeList = [];

    this.emitter = new Emitter;
  }

  getRangeId() {
    // Just return some unique number
    this.rangeIdCount += 1;
    return this.rangeIdCount;
  }

  addRange(value, options) {
    if (this.rangeList.length >= this.options.maxRanges) {
      return false;
    }
    options = Object.assign({
      id: this.getRangeId()
    }, options);
    options.bar = this;
    let range = new Range(options);
    this.el.appendChild(range.el);

    range.setValue(value);
    this.rangeList.push(range);
    this.removeGhost();

    let rangeId = range.id;

    range.emitter.addListener('range:remove', (options) => {
      this.removeRange({id: rangeId});
      this.emitter.emit('range:remove', {
        rangeId: rangeId,
        val: this.getValue()
      });
      this.emitter.emit('change', {
        rangeId: rangeId,
        val: this.getValue()
      });
    });

    range.emitter.addListener('range:changing', (options) => {
      this.emitter.emit('changing', {
        rangeId: rangeId,
        val: this.getValue()
      });
      this.emitter.emit('range:changing', options);
    });

    range.emitter.addListener('range:change', (options) =>{
      this.emitter.emit('change', {
        rangeId: rangeId,
        val: this.getValue()
      });
      this.emitter.emit('range:change', options);
    });

    range.emitter.addListener('range:click', (options) =>{
      this.emitter.emit('range:click', options);
    });

    this.emitter.emit('change', {
      rangeId: rangeId,
      val: this.getValue()
    });
    this.emitter.emit('changing', {
      rangeId: rangeId,
      val: this.getValue()
    });

    return range;

  }

  removeRange(options) {
    let range = this.rangeList.find(x => x.id == options.id);
    if (range) {
      range.removeEvents();
      this.el.removeChild(range.el);
      this.rangeList = this.rangeList.filter(x => x.id !== options.id);
      return true;
    } else {
      return false;
    }
  }

  removeGhost() {
    if (this.ghost) {
      this.ghost.removeEvents();
      this.el.removeChild(this.ghost.el);
      delete this.ghost;
    }
  }

  mousedown(event) {
  }

  mouseup(event) {
    if (this.ghost) {
      this.addRange([this.ghost.left, this.ghost.right])
    }
  }

  mouseleave(event) {
    this.removeGhost();
  }

  getInsideRange(cursor) {
    for (let range of this.rangeList) {
      if (range.left < cursor && cursor < range.right) {
        return range
      }
    }
    return false;
  }

  isOverRange(left, right) {
    for (let range of this.rangeList) {
      if (left <= range.left && range.right <= right) {
        return true
      }
    }
    return false;
  }

  getNewGhostValue(cursor) {
    if (this.getInsideRange(cursor)) {
      return null
    }

    cursor = this.roundUserValue(cursor);
    let h = this.options.minWidth / (this.options.step);
    let dLeft = Math.floor(h / 2) * this.options.step;
    let dRight = Math.floor((h + 1) / 2) * this.options.step;

    let left = cursor - dLeft;
    let right = cursor + dRight;

    if (this.options.max < right) {
      right = this.options.max;
      if (right - left < this.options.minWidth) {
        left = this.options.max - this.options.minWidth;
      }
    }

    if (left < this.options.min) {
      left = this.options.min;
      if (right - left < this.options.minWidth) {
        right = this.options.min + this.options.minWidth;
      }
    }

    let rangeLeft = this.getInsideRange(left);
    if (rangeLeft) {
      left = rangeLeft.getValue()[1];
      right = left + this.options.minWidth;
    }

    let rangeRight = this.getInsideRange(right);
    if (rangeRight) {
      right = rangeRight.getValue()[0];
      left = right - this.options.minWidth;
    }

    if (this.getInsideRange(left) || this.getInsideRange(right)) {
      return null
    }

    return [left, right]
  }

  mousemove(event) {
    if (this.ghost) {
      return
    }
    if (this.options.readOnly) {
      return
    }
    if (this.rangeList.length >= this.options.maxRanges) {
      return
    }
    if (this.rangeList.filter(x => x.pressed).length > 0) {
      return
    }

    let cursor = this.getCursor(event);
    let newGhostValue = this.getNewGhostValue(cursor);
    if (newGhostValue == null) {
      return
    }

    this.ghost = new Ghost({bar: this});
    this.el.appendChild(this.ghost.el);
    this.ghost.setValue(newGhostValue);
  }

  getValue() {
    let result = [];
    for (let range of this.rangeList) {
      let value = range.getValue();
      result.push(value);
    }
    return result
  }
}

export default Bar;
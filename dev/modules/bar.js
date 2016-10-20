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
      allowRemove: true,
      allowAdd: true,
      allowChange: true,
      maxRanges: Infinity,
      ghostLabel: (value) => {
        return '+';
      },
      label: (value) => {
        return value[0].toString() + '-' + value[1].toString();
      },
      valueParse: (value) => {
        return value;
      },
      valueFormat: (value) => {
        return value;
      }
    }, options);

    this.el = document.createElement('div');
    this.el.className = 'multirangeslider-bar';
    if (this.options.allowChange === false) {
      addClass(this.el, 'multirangeslider-allowChangeFalse')
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

  proxyRangeEvent(eventName, range) {
    range.emitter.addListener(eventName, () => {
      this.emitter.emit(eventName, {
        data: this.data(),
        range: range.data()
      });
    })
  }

  add(value, options) {
    if (this.rangeList.length >= this.options.maxRanges) {
      return false;
    }
    options = Object.assign({
      id: this.getRangeId(),
      value: value,
      allowChange: this.options.allowChange
    }, options, {
      bar: this
    });
    let range = new Range(options);
    this.el.appendChild(range.el);

    this.rangeList.push(range);
    this.removeGhost();

    let rangeId = range.id;

    for (let eventName of [
      'remove',
      'changing',
      'change',
      'click'
    ]) {
      this.proxyRangeEvent(eventName, range);
    }

    range.emitter.addListener('remove', () => {
      this.remove(rangeId);
    });

    for (let eventName of ['change', 'add']) {
      this.emitter.emit(eventName, {
        data: this.data(),
        range: range.data()
      });
    }

    return range;

  }

  remove(rangeId) {
    let range = this.rangeList.find(x => x.id == rangeId);
    if (range) {
      range.removeEvents();
      this.el.removeChild(range.el);
      this.rangeList = this.rangeList.filter(x => x.id !== rangeId);
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
      this.add([this.ghost.left, this.ghost.right])
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

    if (left < this.options.min) {
      return null
    }
    if (this.options.max < right) {
      return null
    }

    return [left, right]
  }

  mousemove(event) {
    if (this.ghost) {
      return
    }
    if (this.options.allowAdd == false) {
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

  data() {
    return this.rangeList.map((x) => {return x.data()});
  }

  render() {
    for (let range of this.rangeList) {
      range.render()
    }
  }
}

export default Bar;
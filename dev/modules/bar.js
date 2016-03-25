import Ghost from './ghost'
import Range from './range'
import Base from './base'
import Emitter from './emitter'

class Bar extends Base {
  constructor(options = {}) {
    super();
    this.options = Object.assign({
      allowRemove: false,
      maxRanges: Infinity
    }, options);

    this.el = document.createElement('div');
    this.el.className = 'bbslider-bar';
    this.el.addEventListener('mousemove', (event)=> this.mousemove(event));
    this.el.addEventListener('mouseleave', (event)=> this.mouseleave(event));
    this.el.addEventListener('mouseup', (event)=> this.mouseup(event));
    this.el.addEventListener('mousedown', (event)=> this.mousedown(event));

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

    range.setValue(value[0], value[1]);
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
      this.el.removeChild(range.el);
      this.rangeList = this.rangeList.filter(x => x.id !== options.id);
      return true;
    } else {
      return false;
    }
  }

  removeGhost() {
    if (this.ghost) {
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

  isInsideRange(cursor) {
    for (let range of this.rangeList) {
      if (range.left < cursor && cursor < range.right) {
        return true
      }
    }
    return false;
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
    if (this.isInsideRange(cursor)) {
      return
    }

    this.ghost = new Ghost({bar: this});
    this.el.appendChild(this.ghost.el);
    let left = this.roundUserValue(cursor);
    this.ghost.setValue(left, left + this.options.step);
  }

  setValue(value) {
    for (let range_value of value) {
      this.addRange(range_value);
    }
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
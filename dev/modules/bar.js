import Ghost from './ghost'
import Range from './range'
import Base from './base'

class Bar extends Base {
  constructor(options = {}) {
    super();
    this.options = Object.assign({
      allowRemove: false
    }, options);

    this.el = document.createElement('div');
    this.el.className = 'bbslider-bar';
    this.el.addEventListener('mousemove', (event)=> this.mousemove(event));
    this.el.addEventListener('mouseleave', (event)=> this.mouseleave(event));
    this.el.addEventListener('mouseup', (event)=> this.mouseup(event));
    this.el.addEventListener('mousedown', (event)=> this.mousedown(event));
    this.rangeList = [];
  }

  createRange(start, finish) {
    let range = new Range({bar: this});
    this.el.appendChild(range.el);

    range.setValue(start, finish);
    this.rangeList.push(range);
    this.removeGhost();
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
      this.createRange(this.ghost.left, this.ghost.right)
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
    let cursor = this.getCursor(event);
    let insideRange = this.isInsideRange(cursor);
    let rangePressed = this.rangeList.filter(x => x.pressed).length > 0;

    if (!rangePressed && !insideRange && !this.ghost) {
      this.ghost = new Ghost({bar: this});
      this.el.appendChild(this.ghost.el);
      let left = this.roundUserValue(cursor);
      this.ghost.setValue(left, left + this.options.step);
    }
  }

  setValue(value) {
    for (let range_value of value) {
      this.createRange(range_value[0], range_value[1]);
    }
  }

  getValue() {
    let result = [];
    for (let range of this.rangeList) {
      result.push(range.getValue())
    }
    return result
  }
}

export default Bar;
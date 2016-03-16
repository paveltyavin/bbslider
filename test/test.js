QUnit.test("Common", function (assert) {
  var s = new BBSlider({
    min: 0,
    max: 100,
    step: 10,
    allowRemove: true
  });
  var target = document.getElementById('common');
  target.appendChild(s.el);
  assert.ok(target.querySelectorAll('.bbslider-bar').length == 1, 'Main element should attach to dom');

  target.removeChild(s.el);
});


QUnit.module("BBSlider", function (hooks) {
  hooks.beforeEach(function (assert) {
    var options = {
      min: 0,
      max: 100,
      step: 10
    };
    this.s = new BBSlider(options);
    this.bar_el = this.s.el;
    this.target = document.getElementById('target');
    this.target.appendChild(this.s.el);
    this.width = this.s.el.clientWidth;
    this.step_width = (options.step / (options.max - options.min)) * this.width;
  });

  hooks.afterEach(function () {
    this.target.removeChild(this.s.el);
  });

  QUnit.module('Method', function (hooks) {
    QUnit.test('val()', function (assert) {
      this.s.val([[0, 10], [20, 30]]);
      assert.deepEqual([[0, 10], [20, 30]], this.s.val(),
        'val should return the same result');
    });
  });


  QUnit.module("Ghost", function (hooks) {
    hooks.beforeEach(function (assert) {
      move(this.s.el);
      this.ghost_el = this.target.querySelector('.bbslider-ghost');
      this.ghost_rect = this.ghost_el.getBoundingClientRect();
    });
    hooks.afterEach(function (assert) {
      leave(this.s.el);
      assert.ok(target.querySelectorAll('.bbslider-ghost').length == 0,
        'element should be removed from the DOM when mouse leaved the bar');
    });

    QUnit.test("exists", function (assert) {
      move(this.s.el);
      var el_list = target.querySelectorAll('.bbslider-ghost');
      assert.ok(el_list.length == 1,
        'Only one element should attach to dom');
    });

    QUnit.test("width", function (assert) {
      assert.ok(this.ghost_el.getBoundingClientRect().width > 0, 'Ghost width should be >0');
    });

    QUnit.test("Move", function (assert) {
      move(this.s.el, {moveX: this.step_width});
      assert.ok(this.ghost_el.getBoundingClientRect().left - this.ghost_rect.left == this.step_width,
        'element should move after the cursor with a step distance');
    });

    QUnit.test("Mousedown and move", function (assert) {
      down(this.ghost_el);
      move(this.s.el, {startX: this.step_width, moveX: this.step_width});
      assert.ok(this.ghost_el.getBoundingClientRect().width > this.ghost_rect.width,
        "element should increase its width if pressed and mousemoved");
    });

    QUnit.test("Mousedown and move", function (assert) {
      down(this.ghost_el);
      move(this.s.el, {startX: this.step_width, endX: this.width});
      var rect_1 = this.ghost_el.getBoundingClientRect();
      move(this.s.el, {startX: this.width, endX: this.width + 1});
      var rect_2 = this.ghost_el.getBoundingClientRect();
      assert.ok(rect_1.width == rect_2.width,
        "element should not cross the limits of bar");
    });
  });

  QUnit.module("Range", function (hooks) {
    hooks.beforeEach(function (assert) {
      this.s.val([[40, 50]]);
      this.range_el = this.target.querySelector('.bbslider-range');
      this.range_rect = this.range_el.getBoundingClientRect();
    });

    QUnit.test("click", function (assert) {
      move(this.bar_el, {startX: 0});
      up(this.bar_el);
      assert.ok(this.target.querySelectorAll('.bbslider-range').length == 2,
        'element should attach to dom');
    });

    QUnit.test("move right", function (assert) {
      down(this.range_el);
      move(this.range_el, {moveX: this.step_width});
      var rect = this.range_el.getBoundingClientRect();
      assert.ok(target.querySelector('.pressed'),
        'after mousedown should contain class pressed');
      assert.ok(rect.width == this.range_rect.width,
        'after dragging range should not increase its width');
      assert.ok(rect.left > this.range_rect.left,
        'after dragging right range should move right ');
      up(this.range_el);
      assert.ok(target.querySelector('.pressed') == undefined,
        'after mouseup shouldn`t contain class pressed');
    });

    QUnit.test("move left", function (assert) {
      down(this.range_el);
      move(this.range_el, {moveX: -this.step_width});
      var rect = this.range_el.getBoundingClientRect();
      assert.ok(rect.left < this.range_rect.left,
        'after dragging left range should move left ');
    });

    QUnit.test("move far right beyond the slider", function (assert) {
      down(this.range_el);
      move(this.range_el, {moveX: 2 * this.width});
      var rect = this.range_el.getBoundingClientRect();
      assert.ok(rect.right == this.s.el.getBoundingClientRect().right,
        'element should not cross the limits of bar');
    });

    QUnit.test("drag left handler", function (assert) {
      var handler = this.range_el.querySelector('.bbslider-left-handler');
      assert.ok(handler,
        'should contain left handler');

      down(handler);
      move(handler, {moveX: -this.step_width});
      up(handler);
      var range_width = this.range_el.getBoundingClientRect().width;
      assert.ok(range_width > this.range_rect.width,
        'after dragging left handler to left should increase width');

      down(handler);
      move(handler, {moveX: +this.step_width});
      up(handler);
      assert.ok(this.range_el.getBoundingClientRect().width < range_width,
        'after dragging left handler to right should decrease width');
    });

    QUnit.test("drag right handler", function (assert) {
      var handler = this.range_el.querySelector('.bbslider-right-handler');
      down(handler);
      move(handler, {moveX: +this.step_width});
      up(handler);
      var range_width = this.range_el.getBoundingClientRect().width;
      assert.ok(range_width > this.range_rect.width,
        'after dragging right handler to left should decrease width');

      down(handler);
      move(handler, {moveX: -this.step_width});
      up(handler);
      assert.ok(this.range_el.getBoundingClientRect().width < range_width,
        'after dragging right handler to right should increase width');
    });
  });
});
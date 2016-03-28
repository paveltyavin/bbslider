QUnit.test("Common", function (assert) {
  var s = new BBSlider({
    min: 0,
    max: 100,
    step: 10
  });
  var target = document.getElementById('common');
  target.appendChild(s.el);
  assert.equal(target.querySelectorAll('.bbslider-bar').length, 1, 'Main element should attach to dom');

  target.removeChild(s.el);
});


QUnit.module('Options', function (hooks) {
  QUnit.test('allowRemove', function (assert) {
    var options = {
      min: 0,
      max: 100,
      step: 5,
      allowRemove: true
    };
    var s = new BBSlider(options);
    var target = document.getElementById('target');
    target.appendChild(s.el);
    var width = s.el.clientWidth;
    var step_width = parseInt((options.step / (options.max - options.min)) * width);

    s.addRange([20, 40], {id: 100});
    var handler = s.el.querySelector('.bbslider-left-handler');
    down(handler);
    move(handler, {moveX: step_width * 4});
    move(handler, {moveX: -step_width});
    assert.equal(s.val().length, 1,
      'decreasing width to zero and then increasing again without mouseup should not remove the range');

    move(handler, {moveX: step_width});
    up(handler);
    assert.equal(s.val().length, 0,
      'decreasing width to zero and then mouseup should remove the range');
    target.removeChild(s.el);
  });


  QUnit.test('maxRanges', function (assert) {
    var options = {
      min: 0,
      max: 100,
      step: 5,
      maxRanges: 3
    };
    var s = new BBSlider(options);
    var target = document.getElementById('target');
    target.appendChild(s.el);

    s.addRange([20, 40], {id: 100});
    s.addRange([50, 60], {id: 200});
    s.addRange([70, 75], {id: 300});
    assert.throws(function () {
      s.addRange([80, 90], {id: 300});
    }, "there should be no more ranges than maxRanges");

    move(s._bar.el);
    assert.equal(s.el.querySelectorAll('.bbslider-ghost').length, 0,
      'after number of ranges is maxRanges there should be no ghost element');
    target.removeChild(s.el);
  });

  QUnit.test('readOnly', function (assert) {
    var options = {
      min: 0,
      max: 100,
      step: 5,
      readOnly: true
    };
    var s = new BBSlider(options);
    var target = document.getElementById('target');
    target.appendChild(s.el);

    var width = s.el.clientWidth;
    var step_width = parseInt((options.step / (options.max - options.min)) * width);

    var range_1 = s.addRange([20, 40], {id: 100});

    var handler = range_1.el.querySelector('.bbslider-left-handler');
    down(handler);
    move(handler, {moveX: -step_width});
    up(handler);

    assert.deepEqual(range_1.getValue(), [20, 40],
      'range value should not change');
    assert.equal(target.querySelectorAll('.bbslider-pressed').length, 0,
      'range should not be pressed');

    target.removeChild(s.el);
  });

  QUnit.test('rangeLabel', function (assert) {
    var options = {
      min: 0,
      max: 100,
      step: 5,
      rangeLabel: function (value) {
        return value[0] + '::' + value[1]
      }
    };
    var s = new BBSlider(options);
    s.addRange([20, 30]);
    var target = document.getElementById('target');
    target.appendChild(s.el);
    var label = target.querySelector('.bbslider-label');
    assert.equal(label.innerText, '20::30',
      'text in range label should consider the rangeLabel function');

    target.removeChild(s.el);
  });
});


QUnit.module("BBSlider", function (hooks) {
  hooks.beforeEach(function (assert) {
    var options = {
      min: 0,
      max: 100,
      step: 10
    };
    this.s = new BBSlider(options);
    this.bar_el = this.s.el.querySelector('.bbslider-bar');
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
      var s = this.s;
      s.addRange([0, 10]);
      s.addRange([20, 30]);
      assert.deepEqual([[0, 10], [20, 30]], s.val(),
        'val should return the same result');
    });
    QUnit.test('addRange(data, options)', function (assert) {
      var s = this.s;
      s.addRange([0, 10]);
      s.addRange([20, 30]);
      assert.deepEqual([[0, 10], [20, 30]], this.s.val(),
        'should add Range');

      assert.throws(function () {
        s.addRange(null);
      }, "throws an error in case bad data");

      s.addRange([50, 70], {id: 100});

      assert.throws(function () {
        s.addRange([80, 90], {id: 100});
      }, "throws an error in case not unique id");
      assert.throws(function () {
        s.addRange([60, 80], {id: 200});
      }, "throws an error in case of intersection");
      assert.throws(function () {
        s.addRange([40, 80], {id: 200});
      }, "throws an error in case of intersection");

    });
    QUnit.test('removeRange(options)', function (assert) {
      var s = this.s;
      s.addRange([20, 30], {id: 10});
      assert.throws(function () {
        s.removeRange(null);
      }, "throws an error in case bad data");
      assert.equal(s.removeRange({id: 20}), false,
        'return false if range wasn`t removed');
      assert.equal(s.removeRange({id: 10}), true,
        'return true if range was removed');
      var value = this.s.val();
      assert.equal(value.length, 0,
        'value should be empty');
    });

    QUnit.test('rangeValue', function (assert) {
      var s = this.s;
      s.addRange([20, 30], {id: 10});
      assert.deepEqual([20, 30], s.rangeValue(10));
      s.rangeValue(10, [40, 50]);
      assert.deepEqual([[40, 50]], s.val());
    });

    QUnit.test('data', function (assert) {
      var s = this.s;
      s.addRange([20, 30], {id: 10});
      s.addRange([40, 60], {id: 20});
      assert.deepEqual(s.data(), {
        totalLength: 30,
        rangeList: [
          {
            id: 10,
            val: [20, 30]
          },
          {
            id: 20,
            val: [40, 60]
          }
        ]
      });
    });
  });


  QUnit.module('Events', function (hooks) {
    QUnit.test('changing', function (assert) {
      var s = this.s;
      s.addRange(([0, 10]));
      var handler = s.el.querySelector('.bbslider-right-handler');
      var callback = function () {
        assert.ok(true, 'call en event');
      };

      s.on('changing', callback);

      down(handler);
      move(handler, {moveX: this.step_width}); // event emit
      move(handler, {moveX: this.step_width}); // event emit
      up(handler);

      s.off('changing', callback);

      down(handler);
      move(handler, {moveX: this.step_width});
      up(handler);

      assert.expect(2);
    });

    QUnit.test('change', function (assert) {
      var s = this.s;
      s.addRange(([0, 10]));
      var handler = s.el.querySelector('.bbslider-right-handler');
      var callback = function () {
        assert.ok(true, 'call en event');
      };

      s.on('change', callback);

      down(handler);
      move(handler, {moveX: this.step_width});
      move(handler, {moveX: this.step_width});
      up(handler); // emit

      s.off('change', callback);

      down(handler);
      move(handler, {moveX: this.step_width});
      up(handler);

      assert.expect(1);
    });

    QUnit.test('range:changing', function (assert) {
      var s = this.s;
      s.addRange([0, 10], {id: 100});
      var handler = s.el.querySelector('.bbslider-right-handler');
      s.addRange([90, 100], {id: 200});
      var callback = function (value, options) {
        assert.ok(true, 'call en event');
      };

      s.on('range:change', callback);

      down(handler);
      move(handler, {moveX: this.step_width});
      move(handler, {moveX: this.step_width});
      up(handler); // emit

      s.off('range:change', callback);

      down(handler);
      move(handler, {moveX: this.step_width});
      up(handler);

      assert.expect(1);
    });

    QUnit.test('range:change', function (assert) {
      var s = this.s;
      s.addRange([0, 10], {id: 100});
      var handler = s.el.querySelector('.bbslider-right-handler');
      s.addRange([90, 100], {id: 200});
      var callback = function (value, options) {
        assert.ok(true, 'call en event');
      };

      s.on('range:changing', callback);

      down(handler);
      move(handler, {moveX: this.step_width}); // emit
      move(handler, {moveX: this.step_width}); // emit
      up(handler);

      s.off('range:changing', callback);

      down(handler);
      move(handler, {moveX: this.step_width});
      up(handler);

      assert.expect(2);
    });

    QUnit.test('range:click', function (assert) {
      var s = this.s;
      s.addRange([0, 10], {id: 100});
      var handler = s.el.querySelector('.bbslider-right-handler');
      s.addRange([90, 100], {id: 200});
      var callback = function (value, options) {
        assert.ok(true, 'call en event');
      };

      s.on('range:click', callback);

      down(handler); //emit
      up(handler);
      down(handler); //emit
      up(handler);

      s.off('range:click', callback);

      down(handler);
      up(handler);

      assert.expect(2);
    });
  });


  QUnit.module("Ghost", function (hooks) {
    hooks.beforeEach(function (assert) {
      move(this.bar_el);
      this.ghost_el = this.target.querySelector('.bbslider-ghost');
      this.ghost_rect = this.ghost_el.getBoundingClientRect();
    });
    hooks.afterEach(function (assert) {
      leave(this.bar_el);
      assert.equal(this.target.querySelectorAll('.bbslider-ghost').length, 0,
        'element should be removed from the DOM when mouse leaved the bar');
    });

    QUnit.test("exists", function (assert) {
      move(this.bar_el);
      var el_list = this.target.querySelectorAll('.bbslider-ghost');
      assert.equal(el_list.length, 1,
        'Only one element should attach to dom');
    });

    QUnit.test("has label", function (assert) {
      move(this.bar_el);
      var el_list = this.target.querySelectorAll('.bbslider-ghost .bbslider-label');
      assert.equal(el_list.length, 1,
        'Only one element should attach to dom');
    });
    QUnit.test("benchmark ghost create", function (assert) {
      for (var i = 0; i < 100; i++) {
        move(this.bar_el);
        leave(this.bar_el);
      }
      assert.ok(true);
    });

    QUnit.test("width", function (assert) {
      assert.ok(this.ghost_el.getBoundingClientRect().width > 0, 'Ghost width should be >0');
    });

    QUnit.test("Move", function (assert) {
      move(this.bar_el, {moveX: this.step_width});
      assert.ok(Math.abs(this.ghost_el.getBoundingClientRect().left - this.ghost_rect.left - this.step_width) <= 1,
        'element should move after the cursor with a step distance');
    });

    QUnit.test("Mousedown and move", function (assert) {
      down(this.ghost_el);
      move(this.bar_el, {startX: this.step_width, moveX: this.step_width});
      assert.ok(this.ghost_el.getBoundingClientRect().width > this.ghost_rect.width,
        "element should increase its width if pressed and mousemoved");
      up(this.ghost_el);
    });

    QUnit.test("Mousedown and move", function (assert) {
      down(this.ghost_el);
      move(this.bar_el, {startX: this.step_width, endX: this.width, stepX: 4});
      var rect_1 = this.ghost_el.getBoundingClientRect();
      move(this.bar_el, {startX: this.width, endX: this.width + 1, stepX: 4});
      var rect_2 = this.ghost_el.getBoundingClientRect();
      assert.ok(Math.abs(rect_1.width - rect_2.width) <= 1,
        "element should not cross the limits of bar");
    });
  });


  QUnit.module("Range", function (hooks) {
    hooks.beforeEach(function (assert) {
      this.s.addRange(([40, 50]));
      this.range_el = this.target.querySelector('.bbslider-range');
      this.range_rect = this.range_el.getBoundingClientRect();
    });


    QUnit.test("benchmark range create", function (assert) {
      for (var i = 0; i < 100; i++) {
        this.s.addRange([90, 100], {id: 200});
        this.s.removeRange({id: 200});
      }
      assert.ok(true);
    });

    QUnit.test("click", function (assert) {
      move(this.bar_el, {startX: 0});
      up(this.bar_el);
      assert.equal(this.target.querySelectorAll('.bbslider-range').length, 2,
        'element should attach to dom');
      assert.equal(this.target.querySelectorAll('.bbslider-range .bbslider-label').length, 2,
        'label should attach to dom');
    });

    QUnit.test("press", function (assert) {
      this.s.addRange([70, 80]);
      down(this.range_el);
      assert.equal(this.target.querySelectorAll('.bbslider-pressed').length, 1,
        'only one range should be pressed');
      up(this.range_el);
    });

    QUnit.test("move right", function (assert) {
      down(this.range_el);
      move(this.range_el, {moveX: this.step_width});
      var rect = this.range_el.getBoundingClientRect();
      assert.ok(this.target.querySelector('.bbslider-pressed'),
        'after mousedown should contain class pressed');
      assert.ok(Math.abs(rect.width - this.range_rect.width) <= 1,
        'after dragging range should not increase its width');
      assert.ok(rect.left > this.range_rect.left,
        'after dragging right range should move right ');
      up(this.range_el);
      assert.equal(this.target.querySelector('.pressed'), undefined,
        'after mouseup shouldn`t contain class pressed');
    });

    QUnit.test("move left", function (assert) {
      down(this.range_el);
      move(this.range_el, {moveX: -this.step_width});
      var rect = this.range_el.getBoundingClientRect();
      assert.ok(rect.left < this.range_rect.left,
        'after dragging left range should move left ');
      up(this.range_el);
    });

    QUnit.test("move far right beyond the slider", function (assert) {
      down(this.range_el);
      move(this.range_el, {moveX: 2 * this.width, stepX: this.step_width / 2});
      var rect = this.range_el.getBoundingClientRect();
      assert.ok(Math.abs(rect.right - this.s.el.getBoundingClientRect().right) <= 1,
        'element should not cross the limits of bar');
      up(this.range_el);
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
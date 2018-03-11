QUnit.module('Common', function (hooks) {
  QUnit.test("Common", function (assert) {
    var s = new multirangeslider({
      min: 0,
      max: 100,
      step: 10
    });
    var target = document.getElementById('common_1');
    target.appendChild(s.el);
    assert.equal(target.querySelectorAll('.multirangeslider-bar').length, 1, 'Main element should attach to dom');

    target.removeChild(s.el);
  });

});


QUnit.module('Options', function (hooks) {
  QUnit.test('allowRemove', function (assert) {
    var options = {
      min: 0,
      max: 96,
      step: 3,
      minWidth: 12,
      allowRemove: true
    };
    var s = new multirangeslider(options);
    var target = document.getElementById('target_1');
    target.appendChild(s.el);
    var width = s.el.clientWidth;
    var range_width = Math.floor(options.minWidth / (options.max - options.min) * width) + 1;

    var left = 0;
    var right = options.minWidth;

    s.add([left, right], {id: 100});
    var handler = s.el.querySelector('.multirangeslider-left-handler');
    down(handler);
    move(handler, {moveX: range_width / 2});
    move(handler, {moveX: -range_width / 2});
    up(handler);
    assert.equal(s.val().length, 1,
      'decreasing width to zero and then increasing again without mouseup should not remove the range');

    down(handler);
    move(handler, {moveX: range_width / 2});
    up(handler);
    assert.equal(s.val().length, 0,
      'decreasing width to zero and then mouseup should remove the range');
    target.removeChild(s.el);
  });

  QUnit.test('allowAdd', function (assert) {
    var options = {
      min: 0,
      max: 100,
      step: 10,
      allowAdd: false
    };
    var s = new multirangeslider(options);
    var target = document.getElementById('target_1');
    target.appendChild(s.el);

    move(s._bar.el);
    target.querySelector('.multirangeslider-ghost');
    assert.equal(s.el.querySelectorAll('.multirangeslider-ghost').length, 0,
      'with allowAdd disabled there should be no ghost elements');
    target.removeChild(s.el);
  });

  QUnit.test('maxRanges', function (assert) {
    var options = {
      min: 0,
      max: 100,
      step: 5,
      maxRanges: 3
    };
    var s = new multirangeslider(options);
    var target = document.getElementById('target_1');
    target.appendChild(s.el);

    s.add([20, 40], {id: 100});
    s.add([50, 60], {id: 200});
    s.add([70, 75], {id: 300});
    assert.throws(function () {
      s.add([80, 90], {id: 300});
    }, "there should be no more ranges than maxRanges");

    move(s._bar.el);
    assert.equal(s.el.querySelectorAll('.multirangeslider-ghost').length, 0,
      'after number of ranges is maxRanges there should be no ghost element');
    target.removeChild(s.el);
  });

  QUnit.test('allowChange', function (assert) {
    var options = {
      min: 0,
      max: 100,
      step: 5,
      allowChange: false
    };
    var s = new multirangeslider(options);
    var target = document.getElementById('target_1');
    target.appendChild(s.el);

    var width = s.el.clientWidth;
    var step_width = parseInt((options.step / (options.max - options.min)) * width);

    var range_1 = s.add([20, 40], {id: 100});

    var handler = range_1.el.querySelector('.multirangeslider-left-handler');
    down(handler);
    move(handler, {moveX: -step_width});
    up(handler);

    assert.deepEqual(range_1.getValue(), [20, 40],
      'range value should not change');
    assert.equal(target.querySelectorAll('.multirangeslider-pressed').length, 0,
      'range should not be pressed');

    target.removeChild(s.el);
  });

  QUnit.test('label', function (assert) {
    var options = {
      min: 0,
      max: 100,
      step: 5,
      label: function (value) {
        return value[0] + '::' + value[1]
      }
    };
    var s = new multirangeslider(options);
    s.add([20, 30]);
    var target = document.getElementById('target_1');
    target.appendChild(s.el);
    var label = target.querySelector('.multirangeslider-label');
    assert.equal(label.innerHTML, '20::30',
      'text in range label should consider the label function');

    target.removeChild(s.el);
  });
});


QUnit.module("multirangeslider", function (hooks) {
  hooks.beforeEach(function (assert) {
    var options = {
      min: 0,
      max: 100,
      step: 2
    };
    this.s = new multirangeslider(options);
    this.bar_el = this.s.el.querySelector('.multirangeslider-bar');
    this.target = document.getElementById('target_1');
    this.target.appendChild(this.s.el);
    this.width = this.s.el.clientWidth;
    this.height = this.s.el.clientHeight;
    this.step_width = (options.step / (options.max - options.min)) * this.width;

    this.s_2 = new multirangeslider(options);
    this.bar_el_2 = this.s_2.el.querySelector('.multirangeslider-bar');
    this.target_2 = document.getElementById('target_2');
    this.target_2.appendChild(this.s_2.el);
  });

  hooks.afterEach(function () {
    this.target.removeChild(this.s.el);
    this.target_2.removeChild(this.s_2.el);
  });

  QUnit.module('Method', function (hooks) {
    QUnit.test('removeAll', function (assert) {
      var s = this.s;
      s.add([0, 10]);
      s.add([20, 30]);
      s.removeAll();
      assert.deepEqual([], s.val(),
        'val should be empty');
    });

    QUnit.test('val()', function (assert) {
      var s = this.s;
      s.add([0, 10]);
      s.add([20, 30]);
      assert.deepEqual([[0, 10], [20, 30]], s.val(),
        'val should return the same result');
    });
    QUnit.test('add(data, options)', function (assert) {
      var s = this.s;
      s.add([0, 10]);
      s.add([20, 30]);
      assert.deepEqual([[0, 10], [20, 30]], this.s.val(),
        'should add Range');

      assert.throws(function () {
        s.add(null);
      }, "throws an error in case bad data");

      s.add([50, 70], {id: 100});

      assert.throws(function () {
        s.add([80, 90], {id: 100});
      }, "throws an error in case not unique id");
      assert.throws(function () {
        s.add([60, 80], {id: 200});
      }, "throws an error in case of intersection");
      assert.throws(function () {
        s.add([40, 80], {id: 200});
      }, "throws an error in case of intersection");

    });
    QUnit.test('remove(options)', function (assert) {
      var s = this.s;
      s.add([20, 30], {id: 10});
      assert.throws(function () {
        s.remove(null);
      }, "throws an error in case bad data");
      assert.equal(s.remove(20), false,
        'return false if range wasn`t removed');
      assert.equal(s.remove(10), true,
        'return true if range was removed');
      var value = this.s.val();
      assert.equal(value.length, 0,
        'value should be empty');
    });

    QUnit.test('render', function (assert) {
      var s = this.s;
      s.el.style.display = 'none';
      s.add([0, 10]);
      s.el.style.display = 'block';
      s.render();

      var range_el = this.target.querySelector('.multirangeslider-range');
      var range_rect = range_el.getBoundingClientRect();

      assert.ok(range_rect.width > 0,
        'width should be greater than zero');
    });

    QUnit.test('rangeValue', function (assert) {
      var s = this.s;
      s.add([20, 30], {id: 10});
      assert.deepEqual([20, 30], s.rangeValue(10));
      s.rangeValue(10, [40, 50]);
      assert.deepEqual([[40, 50]], s.val());
    });

    QUnit.test('data', function (assert) {
      var s = this.s;
      var range_1 = s.add([20, 30], {id: 10});
      var range_2 = s.add([40, 60], {id: 20});
      assert.deepEqual(s.data(), [
        {
          allowChange: true,
          el: range_1.el,
          id: 10,
          val: [20, 30]
        },
        {
          allowChange: true,
          el: range_2.el,
          id: 20,
          val: [40, 60]
        }
      ]);
    });

    QUnit.test('rangeData', function (assert) {
      var s = this.s;
      var range_1 = s.add([20, 30], {
        id: 10,
        allowChange:false
      });
      assert.deepEqual(s.rangeData(10), {
        allowChange: false,
        el: range_1.el,
        id: 10,
        val: [20, 30]
      });

      assert.deepEqual(s.rangeData(10, {
        allowChange: true
      }), {
        allowChange: true,
        el: range_1.el,
        id: 10,
        val: [20, 30]
      });
    });
  });


  QUnit.module('Events', function (hooks) {
    QUnit.test('changing', function (assert) {
      var s = this.s;
      s.add(([0, 10]));
      var handler = s.el.querySelector('.multirangeslider-right-handler');
      var callback = function () {
        assert.ok(true, 'call an event');
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
      s.add(([0, 10]));
      var handler = s.el.querySelector('.multirangeslider-right-handler');
      var callback = function () {
        assert.ok(true, 'call an event');
      };

      s.on('change', callback);

      down(handler);
      move(handler, {moveX: this.step_width});
      move(handler, {moveX: this.step_width});
      up(handler); // emit

      down(handler);
      move(handler, {moveY: this.height * 10});
      move(handler, {moveX: this.step_width});
      up(handler); // emit

      s.off('change', callback);

      down(handler);
      move(handler, {moveX: this.step_width});
      up(handler);

      assert.expect(2);
    });

    QUnit.test('click', function (assert) {
      var s = this.s;
      s.add([0, 10], {id: 100});
      var handler = s.el.querySelector('.multirangeslider-right-handler');
      s.add([90, 100], {id: 200});
      var callback = function (value, options) {
        assert.ok(true, 'call a click event');
      };
      var changeCallback = function (value, options) {
        assert.ok(true, 'call a change event');
      };

      s.on('click', callback);
      s.on('change', changeCallback);

      down(handler); //emit
      up(handler);
      down(handler); //emit
      up(handler);

      s.off('click', callback);
      s.off('click', changeCallback);

      down(handler);
      up(handler);

      assert.expect(2);
    });
  });


  QUnit.module("Ghost", function (hooks) {
    hooks.beforeEach(function (assert) {
      move(this.bar_el);
      this.ghost_el = this.target.querySelector('.multirangeslider-ghost');
      this.ghost_rect = this.ghost_el.getBoundingClientRect();
    });
    hooks.afterEach(function (assert) {
      leave(this.bar_el);
      assert.equal(this.target.querySelectorAll('.multirangeslider-ghost').length, 0,
        'element should be removed from the DOM when mouse leaved the bar');
    });

    QUnit.test("exists", function (assert) {
      move(this.bar_el);
      var el_list = this.target.querySelectorAll('.multirangeslider-ghost');
      assert.equal(el_list.length, 1,
        'Only one element should attach to dom');
    });

    QUnit.test("has label", function (assert) {
      move(this.bar_el);
      var el_list = this.target.querySelectorAll('.multirangeslider-ghost .multirangeslider-label');
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
      this.s.add(([40, 50]));
      this.range_el = this.target.querySelector('.multirangeslider-range');
      this.range_rect = this.range_el.getBoundingClientRect();
    });


    QUnit.test("benchmark range create", function (assert) {
      for (var i = 0; i < 100; i++) {
        this.s.add([90, 100], {id: 200});
        this.s.remove(200);
      }
      assert.ok(true);
    });

    QUnit.test("click", function (assert) {
      down(this.bar_el);
      move(this.bar_el, {startX: 0});
      up(this.bar_el);
      assert.equal(this.target.querySelectorAll('.multirangeslider-range').length, 2,
        'element should attach to dom');
      assert.equal(this.target.querySelectorAll('.multirangeslider-range .multirangeslider-label').length, 2,
        'label should attach to dom');
    });

    QUnit.test("press", function (assert) {
      this.s.add([70, 80]);
      down(this.range_el);
      assert.equal(this.target.querySelectorAll('.multirangeslider-pressed').length, 1,
        'only one range should be pressed');
      up(this.range_el);
    });

    QUnit.test("press and move to another slider", function (assert) {

      assert.deepEqual([[40, 50]], this.s.val());

      down(this.range_el);
      move(this.range_el, {moveX: 0.5*this.step_width});
      move(this.range_el, {moveY: this.height});

      assert.deepEqual([[42, 52]], this.s.val());
      
      move(this.bar_el_2, {moveX: this.step_width});
      up(this.bar_el_2);

      var v_1 = this.s.val();

      down(this.bar_el_2);
      move(this.bar_el_2, {moveX: this.step_width});
      up(this.bar_el_2);

      assert.deepEqual(v_1, this.s.val());

    });

    QUnit.test("move right", function (assert) {
      down(this.range_el);
      move(this.range_el, {moveX: this.step_width});
      var rect = this.range_el.getBoundingClientRect();
      assert.ok(this.target.querySelector('.multirangeslider-pressed'),
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
      var handler = this.range_el.querySelector('.multirangeslider-left-handler');
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
      var handler = this.range_el.querySelector('.multirangeslider-right-handler');
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
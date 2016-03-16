QUnit.test("simple method", function (assert) {
  var b = new bbslider();
  assert.ok(b.test() == "test");
});

QUnit.test("attach element", function (assert) {
  var b = new bbslider();
  var target = document.getElementById('target');
  target.appendChild(b.el);
  assert.ok(document.getElementsByClassName('bbslider').length == 1)
});
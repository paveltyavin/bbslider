;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.multirangeslider = factory();
  }
}(this, function () {
  // browserify module start
  <%= contents %>
  // browserify module finish
  return multirangeslider;
}));
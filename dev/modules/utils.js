var test = function () {
  return 'testStr';
};

var log = function (string) {
  if (window && window.console) {
    window.console.log('bbslider: ' + string);
  }
};


export {
  log,
  test,
};

;(function(window, document, undefined) {
  "use strict";

  <%= contents %>

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return bbslider;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.bbslider;
  }

})(window, document);
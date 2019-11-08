'use strict';

(function () {

  var ESC_KEY = 27;
  var ENTER_KEY = 13;

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.util = {
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
    getRandomInt: getRandomInt
  };

})();

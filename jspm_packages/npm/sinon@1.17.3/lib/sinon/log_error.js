/* */ 
"format cjs";
(function(sinonGlobal) {
  "use strict";
  var realSetTimeout = setTimeout;
  function makeApi(sinon) {
    function log() {}
    function logError(label, err) {
      var msg = label + " threw exception: ";
      function throwLoggedError() {
        err.message = msg + err.message;
        throw err;
      }
      sinon.log(msg + "[" + err.name + "] " + err.message);
      if (err.stack) {
        sinon.log(err.stack);
      }
      if (logError.useImmediateExceptions) {
        throwLoggedError();
      } else {
        logError.setTimeout(throwLoggedError, 0);
      }
    }
    logError.useImmediateExceptions = false;
    logError.setTimeout = function(func, timeout) {
      realSetTimeout(func, timeout);
    };
    var exports = {};
    exports.log = sinon.log = log;
    exports.logError = sinon.logError = logError;
    return exports;
  }
  function loadDependencies(require, exports, module) {
    var sinon = require('./util/core');
    module.exports = makeApi(sinon);
  }
  var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
  var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
  if (isAMD) {
    define(loadDependencies);
    return;
  }
  if (isNode) {
    loadDependencies(require, module.exports, module);
    return;
  }
  if (sinonGlobal) {
    makeApi(sinonGlobal);
  }
}(typeof sinon === "object" && sinon));

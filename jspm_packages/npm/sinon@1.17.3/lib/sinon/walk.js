/* */ 
"format cjs";
(function(sinonGlobal) {
  "use strict";
  function makeApi(sinon) {
    function walkInternal(obj, iterator, context, originalObj, seen) {
      var proto,
          prop;
      if (typeof Object.getOwnPropertyNames !== "function") {
        for (prop in obj) {
          iterator.call(context, obj[prop], prop, obj);
        }
        return;
      }
      Object.getOwnPropertyNames(obj).forEach(function(k) {
        if (!seen[k]) {
          seen[k] = true;
          var target = typeof Object.getOwnPropertyDescriptor(obj, k).get === "function" ? originalObj : obj;
          iterator.call(context, target[k], k, target);
        }
      });
      proto = Object.getPrototypeOf(obj);
      if (proto) {
        walkInternal(proto, iterator, context, originalObj, seen);
      }
    }
    function walk(obj, iterator, context) {
      return walkInternal(obj, iterator, context, obj, {});
    }
    sinon.walk = walk;
    return sinon.walk;
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

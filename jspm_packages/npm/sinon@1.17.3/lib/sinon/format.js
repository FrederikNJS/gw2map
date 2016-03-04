/* */ 
"format cjs";
(function(sinonGlobal, formatio) {
  "use strict";
  function makeApi(sinon) {
    function valueFormatter(value) {
      return "" + value;
    }
    function getFormatioFormatter() {
      var formatter = formatio.configure({
        quoteStrings: false,
        limitChildrenCount: 250
      });
      function format() {
        return formatter.ascii.apply(formatter, arguments);
      }
      return format;
    }
    function getNodeFormatter() {
      try {
        var util = require('util');
      } catch (e) {}
      function format(v) {
        var isObjectWithNativeToString = typeof v === "object" && v.toString === Object.prototype.toString;
        return isObjectWithNativeToString ? util.inspect(v) : v;
      }
      return util ? format : valueFormatter;
    }
    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
    var formatter;
    if (isNode) {
      try {
        formatio = require('formatio');
      } catch (e) {}
    }
    if (formatio) {
      formatter = getFormatioFormatter();
    } else if (isNode) {
      formatter = getNodeFormatter();
    } else {
      formatter = valueFormatter;
    }
    sinon.format = formatter;
    return sinon.format;
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
}(typeof sinon === "object" && sinon, typeof formatio === "object" && formatio));

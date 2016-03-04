/* */ 
var flag = require('./flag'),
    getActual = require('./getActual'),
    inspect = require('./inspect'),
    objDisplay = require('./objDisplay');
module.exports = function(obj, args) {
  var negate = flag(obj, 'negate'),
      val = flag(obj, 'object'),
      expected = args[3],
      actual = getActual(obj, args),
      msg = negate ? args[2] : args[1],
      flagMsg = flag(obj, 'message');
  if (typeof msg === "function")
    msg = msg();
  msg = msg || '';
  msg = msg.replace(/#\{this\}/g, function() {
    return objDisplay(val);
  }).replace(/#\{act\}/g, function() {
    return objDisplay(actual);
  }).replace(/#\{exp\}/g, function() {
    return objDisplay(expected);
  });
  return flagMsg ? flagMsg + ': ' + msg : msg;
};

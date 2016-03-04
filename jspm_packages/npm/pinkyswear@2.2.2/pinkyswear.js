/* */ 
(function(process) {
  (function(target) {
    var undef;
    function isFunction(f) {
      return typeof f == 'function';
    }
    function isObject(f) {
      return typeof f == 'object';
    }
    function defer(callback) {
      if (typeof setImmediate != 'undefined')
        setImmediate(callback);
      else if (typeof process != 'undefined' && process['nextTick'])
        process['nextTick'](callback);
      else
        setTimeout(callback, 0);
    }
    target[0][target[1]] = function pinkySwear(extend) {
      var state;
      var values = [];
      var deferred = [];
      var set = function(newState, newValues) {
        if (state == null && newState != null) {
          state = newState;
          values = newValues;
          if (deferred.length)
            defer(function() {
              for (var i = 0; i < deferred.length; i++)
                deferred[i]();
            });
        }
        return state;
      };
      set['then'] = function(onFulfilled, onRejected) {
        var promise2 = pinkySwear(extend);
        var callCallbacks = function() {
          try {
            var f = (state ? onFulfilled : onRejected);
            if (isFunction(f)) {
              function resolve(x) {
                var then,
                    cbCalled = 0;
                try {
                  if (x && (isObject(x) || isFunction(x)) && isFunction(then = x['then'])) {
                    if (x === promise2)
                      throw new TypeError();
                    then['call'](x, function() {
                      if (!cbCalled++)
                        resolve.apply(undef, arguments);
                    }, function(value) {
                      if (!cbCalled++)
                        promise2(false, [value]);
                    });
                  } else
                    promise2(true, arguments);
                } catch (e) {
                  if (!cbCalled++)
                    promise2(false, [e]);
                }
              }
              resolve(f.apply(undef, values || []));
            } else
              promise2(state, values);
          } catch (e) {
            promise2(false, [e]);
          }
        };
        if (state != null)
          defer(callCallbacks);
        else
          deferred.push(callCallbacks);
        return promise2;
      };
      if (extend) {
        set = extend(set);
      }
      return set;
    };
  })(typeof module == 'undefined' ? [window, 'pinkySwear'] : [module, 'exports']);
})(require('process'));

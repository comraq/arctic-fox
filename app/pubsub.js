module.exports = function() {
  var events = {};

  return {
    on: function on(eventName, func) {
      events[eventName] = events[eventName] || [];
      events[eventName].push(func);
    },
    off: function off(eventName, func) {
      if (events[eventName]) {
        events[eventName] = events[eventName].filter(function(handler) {
          return !(func === handler);
        })
      }
    },
    emit: function emit(eventName, data) {
      if (events[eventName]) {
        events[eventName].forEach(function(handler) {
          handler(data);
        });
      }
    }
  };
};

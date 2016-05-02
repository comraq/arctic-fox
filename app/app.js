(function(window, document) {
  var events = require("./pubsub")(),
      models = require("./models"),
      controllers = require("./controllers"),
      views = require("./views");

  var controllerInterface = {
    events: events,
    ajax: ajax,
    loadTemplate: loadTemplate
  };

  (function init() {
    var model, controller, view;

    models.modelFactory(controllerInterface)
      .then(function success(data) {
        model = data;

        for (var prop in controllers) {
          controller = controllers[prop](controllerInterface, model);
          view = views[prop](controller);
        }
      }, function error(err) {
        alert(err);

      });
  })();
})(window, document);

function ajax(path) {
  return new Promise(function(resolve, reject) {
    var xmlhttp = new XMLHttpRequest();
 
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200)
          resolve(xmlhttp.responseText);
        else
          reject(xmlhttp.status);
      }
    }

    xmlhttp.open("GET", path);
    xmlhttp.send();
  });
}

function loadTemplate(viewGroup, templatePath) {
  var promise = ajax(templatePath);

  return promise.then(function success(data) {
    viewGroup.innerHTML = data;
    return viewGroup;

  }, function error(err) {
    var msg = "Failed to load template!";
    viewGroup.innerHTML = msg;
    alert("Status: " + err + "! " + msg);
  });
}

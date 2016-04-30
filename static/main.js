(function(window, document) {
  var events = require("./pubsub")(),
      models = require("./models"),
      controllers = require("./controllers"),
      views = require("./views");

  var controllerInterface = {
    events: events,
    getFile: getFile
  };

  (function init() {
    var model, controller, view;
    for (var prop in models) {
      model = models[prop]();
      controller = controllers[prop](controllerInterface, model);
      view = views[prop](controller).init();
    }
  })();

  function getFile(path) {
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
})(window, document)

// Sample Code for testing promises and pubsub module
function testCode() {
  var test = document.getElementById("test");
  test.innerHTML = "Ashley";

  var myPromise = new Promise(function(resolve, reject) {
    console.log("Setting timeout: 5s");
    setTimeout(resolve, 5000);

    events.on("testing", function(data) {
      reject("reject reason with data: " + data);
    });

  });

  myPromise.then(function success(data) {
    console.log("success! arguments:")
    console.log(arguments);

  }, function error(data) {
    console.log("error! arguments:")
    console.log(arguments);

  });

  test.addEventListener("click", function() {
    events.emit("testing", "11111");
  });
}

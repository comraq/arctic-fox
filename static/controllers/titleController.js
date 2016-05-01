module.exports = function(controllerInterface, model) {
  var controller = Object.create(controllerInterface);
  var foxes;

  function getFoxes() {
    foxes = model.getFoxes();
    foxes.forEach(function (fox) {
      fox.display = false;
    });
  }

  controller.getTitle = function getTitle() {
    return model.title;
  };

  var index = 0;
  controller.getNextImage = function getNextImage(currImg) {
    var fox;
    do {
      fox = foxes[index];
      index = (index + 1) % foxes.length;
    } while (fox.display);

    for (var i = 0; i < foxes.length; ++i) {
      if (foxes[i].imgUrl == currImg) {
        foxes[i].display = false;
        break;
      }
    }

    var img = fox.imgUrl;
    fox.display = true;
    return img;
  };

  // Initialization of this instance
  (function init() {
    getFoxes();
  })();
  return controller;
}

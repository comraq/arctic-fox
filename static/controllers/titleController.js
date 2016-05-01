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
  controller.getNextFox = function getNextFox(i) {
    var indexVal = parseInt(i);
    if (!isNaN(indexVal)) {
      foxes[indexVal].display = false;
      index = (indexVal + 1) % foxes.length;
    }

    var fox, id;
    do {
      fox = foxes[index];
      id = index;
      index = (index + 1) % foxes.length;
    } while (fox.display);

    fox.display = true;
    return {
      name: fox.name,
      imgUrl: fox.imgUrl,
      facts: fox.facts,
      sound: fox.sound,
      id: id 
    };
  };

  // Initialization of this instance
  (function init() {
    getFoxes();
  })();
  return controller;
}

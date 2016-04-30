module.exports = function(controllerInterface, model) {
  var controller = Object.create(controllerInterface);

  controller.getTitle = function getTitle() {
    return model.title;
  };

  var index = 0;
  controller.getNextImage = function getNextImage() {
    var img = model.images[index];
    index = (index + 1) % model.images.length;
    return img;
  };

  return controller;
}

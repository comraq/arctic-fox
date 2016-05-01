module.exports = function(controllerInterface, model) {
  var controller = Object.create(controllerInterface);

  controller.getInfo = function getInfo() {
    return model.getInfo();
  };

  return controller;
};

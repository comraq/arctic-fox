module.exports = function(controllerInterface, model) {
  var controller = Object.create(controllerInterface);
  return controller;
};

module.exports = function(controllerInterface, model) {
  var controller = Object.create(controllerInterface);

  controller.getCountServer = function() {
    return this.ajax(model.getCountServer()).then(
      function success(data) {
        data = JSON.parse(data);
        return data.count;
  
      }, function error(err) {
        throw new Error("Could not retrieve views count!");
      });
  };

  return controller;
};

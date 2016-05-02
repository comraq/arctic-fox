exports.modelFactory = function(controller) {
  var imgPath = "static/img/";
  var soundPath = "static/sounds/";
  var dataFile = "static/data.json";
  var data;

  return controller.ajax(dataFile).then(function success(result) {
      data = JSON.parse(result);
      data.foxes.forEach(function(fox) {
        fox.imgUrl = imgPath + fox.imgUrl;
        fox.sound = soundPath + fox.sound;
      });

      data.info.imgUrl = imgPath + data.info.imgUrl;

      return {
        getTitle: function getTitle() {
          return data.title;
        },
        getFoxes: function getFoxes() {
          return data.foxes;
          //return foxes;
        },
        getInfo: function getInfo() {
          return data.info;
        },
        getCountServer: function getCountServer() {
          return data.countServer.host + data.countServer.url;
        }
      };

    }, function error(err) {
      var msg = "Failed to Retrieve Data from json!";
      console.log(msg);

      throw new Error(msg);
    });
};

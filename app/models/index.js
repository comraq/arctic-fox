exports.modelFactory = function() {
  var imgPath = "static/img/";
  var soundPath = "static/sounds/";

  var images = [
    "fox0.gif",
    "fox1.jpg",
    "fox2.jpg",
    "fox3.jpg",
    "fox4.jpg"
  ];

  var sounds = [
    "fox-barks.mp3",
    "fox-howls.mp3",
    "fox-cubs.mp3",
    "fox-warning-alarm.mp3",
    "fox-playfighting.mp3"
  ];

  var foxes = [];
  images.forEach(function(img, i) {
    var name = img.match(/(^.+)\./)[1];

    foxes.push({
      name: name,
      imgUrl: imgPath + img,
      facts: name + " facts",
      sound: soundPath + sounds[i]
    });
  });

  var info = "Some basic information regarding arctic foxes.";

  return {
    title: "Welcome To Ashley's Arctic Fox Website",
    getFoxes: function getFoxes() {
      return foxes;
    },
    getInfo: function getInfo() {
      return info;
    }
  };
};

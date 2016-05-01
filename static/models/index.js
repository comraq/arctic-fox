exports.modelFactory = function() {
  var path = "static/img/";
  var images = [
    "fox0.gif",
    "fox1.jpg",
    "fox2.jpg",
    "fox3.jpg",
    "fox4.jpg"
  ];

  var foxes = [];
  images.forEach(function(img) {
    var fox = {
      caption: img.match(/(^.+)\./)[1],
      imgUrl: path + img
    };
    foxes.push(fox);
  });

  return {
    title: "Welcome To Ashley's Arctic Fox Project",
    getFoxes: function getFoxes() {
      return foxes;
    }
  };
};

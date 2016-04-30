module.exports = function(controller) {
  var id = "view-title";
  var viewGroup;
  
  function onTemplateLoaded(root) {
    var imgGroupView, titleView;
  
    for (var i = 0; i < root.children.length; ++i) {
      child = root.children[i];
      switch(child.id) {
        case "img-group":
          imgGroupView = child;
          break;
  
        case "title":
          titleView = child;
          break;

        default:
          // Default
      }
    }
    titleView.innerHTML = controller.getTitle();
    for (var i = 0; i < imgGroupView.children.length; ++i) {
/*
      var $img = $(imgGroupView.children[i]);
      $img.on("click", function() {
        $(this).fadeOut(500);
      })
*/
      var img = imgGroupView.children[i];
      img.setAttribute("src", controller.getNextImage());
    }
  }

  return {
    init: function init() {
      viewGroup = document.getElementById(id);
      controller.getFile("static/views/title/title.html")
        .then(function success(data) {
        viewGroup.innerHTML = data;
        return viewGroup;

      }, function error(err) {
        var msg = "Could not load title template!";
        viewGroup.innerHTML = msg;
        alert("Status: " + err + "! " + msg);
    
      }).then(onTemplateLoaded);

      return this;
    }
  };
};


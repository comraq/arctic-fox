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
      var img = imgGroupView.children[i]; 
      (function(img) {
        initImg(img, function() {
          return controller.getNextImage(img.getAttribute("src"));
        });
      })(img);
    }
  }

  function initImg(img, getPathFunc) {
    img.setAttribute("src", getPathFunc());
  
    var $img = $(img);
    $img.on("click", function() {
      var dfd = $.Deferred();

      $(this).fadeOut(500, function() {
        controller.events.emit("title-picture-clicked",
                               img.getAttribute("src"));
        dfd.resolve();
      });

      dfd.then(function success() {
        img.setAttribute("src", getPathFunc());
        $img.fadeIn(500);            
      })
    })
  }

  (function init() {
    viewGroup = document.getElementById(id);
    controller.loadTemplate(viewGroup, "static/views/title/title.html")
      .then(onTemplateLoaded);
  })();
  
  return this;
};

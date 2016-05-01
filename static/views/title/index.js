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
          return controller.getNextFox(img.getAttribute("fox-id"));
        });
      })(img);
    }
  }

  function initImg(img, getFox) {
    var fox = getFox();
    img.setAttribute("src", fox.imgUrl);
    img.setAttribute("fox-id", fox.id);
  
    var $img = $(img);
    $img.on("click", function() {
      var dfd = $.Deferred();

      $(this).fadeOut(500, function() {
        controller.events.emit("title-picture-clicked", fox);
        dfd.resolve();
      });

      dfd.then(function success() {
        fox = getFox();
        img.setAttribute("src", fox.imgUrl);
        img.setAttribute("fox-id", fox.id);
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

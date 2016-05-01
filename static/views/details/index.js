module.exports = function(controller) {
  var id = "view-details";
  var viewGroup, nameView, imgView;
  

  function onTemplateLoaded(root) {
    for (var i = 0; i < root.children.length; ++i) {
      child = root.children[i];
      switch(child.id) {
        case "name-view":
          nameView = child;
          break;

        case "img-view":
          imgView = child;
          break;
  
        default:
          // Default
      }
    }
    controller.events.on("title-picture-clicked", function(imgUrl) {
      nameView.innerHTML = imgUrl;
      imgView.setAttribute("src", imgUrl);
    }); 
  }

  (function init() {
    viewGroup = document.getElementById(id);
    controller.loadTemplate(viewGroup, "static/views/details/details.html")
      .then(onTemplateLoaded);
  })();
  return this;
};

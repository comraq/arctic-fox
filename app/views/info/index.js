module.exports = function(controller) {
  var id = "view-info";
  var viewGroup, listView, imgView;

  var info;
  function onTemplateLoaded(root) {
    listView = $("#" + id + "-list")[0];
    imgView = $("#" + id + "-img")[0];
    info = controller.getInfo();

    info.facts.forEach(function(fact, i) {
      var a = listView.children[0];
      var text = a.innerHTML;
      if (i > 0) {
        a = a.cloneNode();
        a.innerHTML = text;
        listView.appendChild(a);
      }
      a.setAttribute("data-content", fact); 
      $(a).popover();
    });

    imgView.setAttribute("src", info.imgUrl);
    imgView.setAttribute("title", info.imgCaption);

    controller.events.on("title-picture-clicked", function(fox) {
      $(viewGroup).addClass("view-info-hide");
    });

    controller.events.on("details-closed", function() {
      $(viewGroup).removeClass("view-info-hide");
    });
  }

  (function init() {
    viewGroup = document.getElementById(id);
    controller.loadTemplate(viewGroup, "app/views/info/info.html")
      .then(onTemplateLoaded);
  })();
  return this;
};

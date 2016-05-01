module.exports = function(controller) {
  var id = "view-info";
  var viewGroup, contentView;

  function onTemplateLoaded(root) {
    contentView = $("#" + id + "-content")[0];
    contentView.innerHTML = controller.getInfo();

    controller.events.on("title-picture-clicked", function(fox) {
      $(viewGroup).addClass("view-info-hide");
    });

    controller.events.on("details-closed", function() {
      $(viewGroup).removeClass("view-info-hide");
    });
  }

  (function init() {
    viewGroup = document.getElementById(id);
    controller.loadTemplate(viewGroup, "static/views/info/info.html")
      .then(onTemplateLoaded);
  })();
  return this;
};

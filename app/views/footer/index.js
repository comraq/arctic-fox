module.exports = function(controller) {
  var id = "view-footer";
  var viewGroup, countView

  function onTemplateLoaded(root) {
    countView = $("#" + id + "-visits-count")[0];

    controller.getCountServer()
      .then(function success(count) {
        countView.innerHTML = count;
  
      }, function error(err) {
        countView.innerHTML = "n/a";
   
      });
  }

  (function init() {
    viewGroup = document.getElementById(id);
    controller.loadTemplate(viewGroup, "app/views/footer/footer.html")
      .then(onTemplateLoaded);
  })();
  return this;
}


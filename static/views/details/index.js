module.exports = function(controller) {
  var id = "view-details";
  var viewGroup, nameView, imgView, factsView, backButton, soundButton;
  var currFox;
  var sound;
  
  function onTemplateLoaded(root) {
    nameView = $("#" + id + "-name")[0];
    imgView = $("#" + id + "-img-view")[0];
    factsView = $("#" + id + "-facts-body")[0];
    backButton = $("#" + id + "-back-button")[0];
    soundButton = $("#" + id + "-sound-button")[0];

    controller.events.on("title-picture-clicked", function(fox) {
      if (sound)
        sound.pause();

      currFox = fox;
      $(viewGroup).addClass("view-details-show");

      nameView.innerHTML = fox.name;
      imgView.setAttribute("src", fox.imgUrl);
      factsView.innerHTML = fox.facts;

    }); 

    controller.events.on("details-closed", function() {
      if (sound)
        sound.pause();

      $(viewGroup).removeClass("view-details-show");
    });

    soundButton.addEventListener("click", function() {
      if (!sound || sound.paused) {
        sound = new Audio(currFox.sound);
        sound.play();
      }
    });

    backButton.addEventListener("click", function() {
      controller.events.emit("details-closed");
    });
  }

  (function init() {
    viewGroup = document.getElementById(id);
    controller.loadTemplate(viewGroup, "static/views/details/details.html")
      .then(onTemplateLoaded);
  })();
  return this;
};

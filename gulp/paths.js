module.exports = function(wagner) {
  wagner.constant("BIN_PATH", "./bin");
  wagner.constant("JS_SRC", "./app/app.js");
  wagner.constant("JS_SRC_GLOB", [
                    "./app/**/*.js"
                  ]);
  wagner.constant("JS_DEST", "scripts.min.js");
  
  wagner.constant("CSS_SRC_GLOB", [
                    "./static/css/*.css",
                    "./app/**/*.css"
                  ]);
  wagner.constant("CSS_DEST", "styles.min.css");
  
  wagner.constant("CSS_VEND_SRC_GLOB", [
                    "./node_modules/bootstrap/dist/**/*.css"
                  ]);
  wagner.constant("CSS_VEND_DEST", "vendors.min.css");
};

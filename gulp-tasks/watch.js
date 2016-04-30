module.exports = function(gulp, plugins, BIN_PATH, production) {
  return function() {
    var colour = (production)?
                   plugins.util.colors.bgGreen
                 :
                   plugins.util.colors.bgYellow;
  
    plugins.util.log("Production", colour(production));
    gulp.watch([
                 "./static/**/*.js"
               ],
               [ "minify-js" ]);
    gulp.watch([
                 "./static/**/*.css"
               ],
               [ "minify-css" ]);
  };
};


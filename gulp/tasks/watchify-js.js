var browserify = require("browserify"),
    watchify = require("watchify"),
    buffer = require("vinyl-buffer"),
    source = require("vinyl-source-stream");

module.exports = function(gulp, plugins, production,
                          BIN_PATH, JS_SRC, JS_DEST) {
  var browserifyOpts = {
    entries: [ JS_SRC ],
    debug: true
  };

  var opts = {};
  for (var prop in watchify.args)
    opts[prop] = watchify.args[prop];

  for (var prop in browserifyOpts)
    opts[prop] = browserifyOpts[prop];
  
  var b = watchify(browserify(opts));

  b.on("update", bundleFunc);
  b.on("log", function() {
    var cyan = plugins.util.colors.cyan;
    var magenta = plugins.util.colors.magenta;

    var msg = "Finished '" + cyan("Watchify Native") + "' " + arguments[0];
    return plugins.util.log(msg);
  });

  function bundleFunc() {
    return b
      .bundle()
      .on("error", function(err) {
        plugins.util.log(err);
        this.emit("end");
      })
      .pipe(source("bundle.js"))
      .pipe(buffer())
      .pipe(plugins.rename(JS_DEST))
      .pipe((!production)?
              plugins.sourcemaps.init({ loadMaps: true }) : plugins.util.noop())
        .pipe(plugins.uglify())
      .pipe((!production)?
              plugins.sourcemaps.write("./scripts") : plugins.util.noop())
      .pipe(gulp.dest(BIN_PATH));
  };

  return bundleFunc;
};

var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var nano = require('cssnano');
var prefix = require('autoprefixer');

var browserSync = require("browser-sync").create();

function compile() {
  // Where should gulp look for the sass files?
  // My .sass files are stored in the styles folder
  // (If you want to use scss files, simply look for *.scss files instead)
  return (
    gulp
      .src("sass/**/*.scss")

      // Use sass with the files found, and log any errors
      .pipe(sass())
      .on("error", sass.logError)
      .pipe(postcss([prefix(), nano()]))

      // What is the destination for the compiled file?
      .pipe(gulp.dest("css"))

      // hopefully reload the css into the page
      .pipe(browserSync.stream())
  );
}

function reload(done) {
  browserSync.reload();
  done();
}

function squashImages() {
  gulp.src('./images/**')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/miniimages'))
}

function watch() {
  browserSync.init({
    // You can tell browserSync to use this directory and serve it as a mini-server
    server: {
      baseDir: "./"
    }
    // If you are already serving your website locally using something like apache
    // You can use the proxy setting to proxy that instead
    // proxy: "yourlocal.dev"
  });
  gulp.watch("sass/**/*.scss", compile);
  gulp.watch("index.html", reload)
}

// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
exports.watch = watch;
exports.squash = squashImages;

import gulp from "gulp";
import sass from "gulp-sass";
import browserSync from "browser-sync";

const server = browserSync.create();
const reload = server.reload;

const compileSass = function(done) {
  gulp.src("scss/*.scss")
  .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
  .pipe(gulp.dest("css"));
  done();
}

const watch = function() {
  gulp.watch("scss/*.scss", compileSass);
  gulp.watch(["*.html", "css/*.css", "js/*.js"]).on("change", reload);
}

const serve = function(done) {
  server.init({
    server: {
      baseDir: "./"
    }
  });
  done();
}

const web = gulp.series(serve, watch);
export default web;
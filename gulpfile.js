// Gulp استدعاء
const gulp = require("gulp");
// Concat استدعاء
const concat = require("gulp-concat");
// AutoPrefixer استدعاء
const autoprefixer = require("gulp-autoprefixer");
// Sass استدعاء
const sass = require("gulp-sass")(require("sass"));
// Pug استدعاء
const pug = require("gulp-pug");
// live Reload استدعاء
const livereload = require("gulp-livereload");
// Source Maps استدعاء
const sourcemaps = require("gulp-sourcemaps");
// Uglify استدعاء
const uglify = require("gulp-uglify");
// Notify استدعاء
const notify = require("gulp-notify");
// Babel استدعاء
const babel = require("gulp-babel");
// Zip استدعاء
const zip = require("gulp-zip");
// Vinyl-Ftp استدعاء
const ftp = require("vinyl-ftp");
// webp استدعاء
const webp = require("gulp-webp");

// ===== Task Html =====
gulp.task("html", function () {
  return gulp
    .src("project/pug/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("dist"))
    .pipe(livereload())
    .pipe(notify("Html Task Is Done"));
});

// ===== Task Scss  =====
gulp.task("scss", function () {
  return gulp
    .src("project/css/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer("last 2 versions"))
    .pipe(concat("style.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(livereload())
    .pipe(notify("Scss Task Is Done"));
});

// ===== Task Libs Css =====
gulp.task("libs-css", function () {
  return gulp
    .src("project/libs-css/**/*")
    .pipe(gulp.dest("dist/css/libs"))
    .pipe(livereload())
    .pipe(notify("Libs Css Task Is Done"));
});

// ===== Task Js =====
gulp.task("js", function () {
  return gulp
    .src("project/js/**/*.js")
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(sourcemaps.init())
    .pipe(concat("script.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/js"))
    .pipe(notify("Js Task Is Done"))
    .pipe(livereload());
});

// ===== Task Zpi Compress =====
gulp.task("compress", function () {
  return gulp
    .src("dist/**/*")
    .pipe(zip("website.zip"))
    .pipe(gulp.dest("."))
    .pipe(notify("Files Is Compressed To Zip "));
});

// ===== Task Libs Js =====
gulp.task("libs-js", function () {
  return gulp
    .src("project/libs-js/**/*")
    .pipe(gulp.dest("dist/js/libs"))
    .pipe(livereload())
    .pipe(notify("Libs js Task Is Done"));
});

// ===== Task Images Compress =====
gulp.task("compressImages", function () {
  return gulp
    .src("project/images/**/*")

    .pipe(webp())
    .pipe(gulp.dest("dist/images"));
});

// ===== Task Zpi Compress =====
gulp.task("compress", function () {
  return gulp
    .src("dist/**/*")
    .pipe(zip("website.zip"))
    .pipe(gulp.dest("."))
    .pipe(notify("Files Is Compressed To Zip "));
});

// ===== Task Ftp =====
gulp.task("deploy", function () {
  var conn = ftp.create({
    host: "ftpupload.net",
    user: "epiz_29431807",
    password: "vz5QI9xYpD",
    parallel: 10,
  });

  return (
    gulp
      .src(["dist/**/*.*"], { base: ".", buffer: false })
      // .pipe(conn.newer("/public_html"))
      // .pipe(conn.newer("/htdocs/output"))
      .pipe(conn.newer("/htdocs"))
      //   .pipe(conn.dest("/public_html"))
      // .pipe(conn.dest("/htdocs/output"))
      .pipe(conn.dest("/htdocs"))

      .pipe(livereload())
      .pipe(notify("Files Is Upload To Host "))
  );
});

// ===== Task Watch =====
gulp.task("watch", function () {
  require("./server.js");
  livereload.listen();
  // = Html
  gulp.watch("project/pug/**/*.pug", gulp.series("html"));
  // = Css
  gulp.watch("project/css/scss/**/*.scss", gulp.series("scss"));
  gulp.watch("project/libs-css/**/*", gulp.series("libs-css"));
  // = Javascript
  gulp.watch("project/js/**/*.js", gulp.series("js"));
  // gulp.watch("project/ts/**\/*.ts", gulp.series("ts"));
  gulp.watch("project/libs-js/**/*", gulp.series("libs-js"));
  // = Images
  gulp.watch("project/images/**/*", gulp.series("compressImages"));
  // = Zip
  gulp.watch("dist/**/*.*", gulp.series("compress"));
  // = Upload
  // gulp.watch("dist/**\/*.*", gulp.series("deploy"));
});
// = Default
gulp.task("default", gulp.series("watch"));

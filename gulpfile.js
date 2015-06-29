var gulp = require('gulp'),
  browserify = require('browserify');
  babelify = require('babelify')
  fs = require('fs')
  $ = require('gulp-load-plugins')();

gulp.task('html', function () {
  gulp.src('src/hp-ml.html')
    // .pipe($.vulcanize({
    //   abspath: '',
    //   excludes: [],
    //   stripExcludes: false
    // }))
    .pipe(gulp.dest('dist'));
})

gulp.task('js', function () {
  browserify({ debug: true })
    .transform(babelify)
    .require("./src/hp-ml.js", { entry: true })
    .bundle()
    .on("error", function (err) { console.log("Error: " + err.message); })
    .pipe(fs.createWriteStream("dist/hp-ml.js"))
    // .pipe(gulp.dest('dist'));
});

gulp.task('copy', function () {
  gulp.src([
    'bower_components/three.js/three.js',
    'bower_components/webvr-polyfill/index.js',
    'bower_components/webvr-manager/index.js',
    'bower_components/threejs-vreffect/index.js',
    'bower_components/threejs-vrcontrolls/index.js',
  ])
  .pipe($.concat("deps.js"))
  .pipe(gulp.dest('dist'));

  gulp.src([
    'bower_components/polymer/polymer*',
  ])
  .pipe(gulp.dest('dist'));
});

gulp.task('build', [
  'copy',
  'html',
  'js'
]);

gulp.task('default', ['build'], function () {
  gulp.watch(['src/*.html'], ['html']);
  gulp.watch(['bower_components'], ['copy']);
  gulp.watch(['src/*.*js'], ['js']);
})
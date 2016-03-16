var gulp = require('gulp');
var glob = require('glob');
var path = require('path');
var gutil = require('gulp-util');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var wrap = require('gulp-wrap');
var qunit = require('gulp-qunit');
var babel = require('gulp-babel');
var livereload = require('gulp-livereload');

gulp.task('less', function () {
  gulp.src(['dev/bbslider.less'])
    .pipe(less())
    .pipe(gulp.dest('dist'));
});

var b = browserify({
  entries: './dev/bbslider.es6.js',
  debug: true
}).transform(babelify);

var w = watchify(b);

var watch_bundle = function () {
  w.bundle()
    .on("error", function (error) {
      gutil.log(error.message);
      gutil.beep();
      this.emit('end');
    })
    .pipe(source('bbslider-dev.js'))
    .pipe(wrap({
      src: './dev/gulpfile-wrap-template.js'
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(livereload())
};

w.on('update', watch_bundle);
w.on('time', function (time) {
  gutil.log("browserify", time, 'ms');
});


gulp.task('build:js', function () {
  var b = browserify({entries: './dev/bbslider.es6.js'});

  return b
    .transform(babelify)
    .bundle()
    .pipe(source('bbslider-dev.js'))
    .pipe(wrap({
      src: './dev/gulpfile-wrap-template.js'
    }))
    .pipe(gulp.dest('dist'))

    .pipe(rename('bbslider.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.watch(['dev/*.js', 'dev/*/*.js'], ['scripts']);
  gulp.watch(['dev/*.less', 'dev/*.css'], ['less']);
  watch_bundle();
});

gulp.task('build', ['less']);
gulp.task('default', ['watch', 'build']);

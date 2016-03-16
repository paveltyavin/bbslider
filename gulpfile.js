var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var qunit = require('node-qunit-phantomjs');
var babel = require('gulp-babel');
var livereload = require('gulp-livereload');
var wrap = require('gulp-wrap');

gulp.task('less', function () {
  gulp.src(['dev/bbslider.less'])
    .pipe(less())
    .pipe(gulp.dest('dist'));
});

var b = browserify({
  entries: './dev/bbslider.es6.js',
  standalone: 'bbslider'
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
    .pipe(wrap({src: './dev/gulpfile-wrap-template.js'}))
    .pipe(gulp.dest('./dist/'))
    .pipe(livereload())
};

w.on('update', watch_bundle);
w.on('time', function (time) {
  gutil.log("browserify", time, 'ms');
});


gulp.task('build:js', function () {
  var b = browserify({
    entries: './dev/bbslider.es6.js',
    standalone: 'bbslider'
  });

  return b
    .transform(babelify)
    .bundle()
    .pipe(source('bbslider-dev.js'))
    .pipe(wrap({src: './dev/gulpfile-wrap-template.js'}))
    .pipe(gulp.dest('dist'))

    .pipe(rename('bbslider.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  livereload.listen({start: true});
  gulp.watch(['dev/*.less'], ['less']);
  gulp.watch(['test/test.js'], function () {
    livereload.reload();
  });
  watch_bundle();
});

gulp.task('test', ['build'], function () {
  qunit('./test/index.html', {verbose: true});
});

gulp.task('build', ['less', 'build:js']);
gulp.task('default', ['watch', 'build']);

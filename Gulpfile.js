var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var es6 = require('gulp-babel');
var inject = require('gulp-inject');
var uglyify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var del = require('del');

function errorHandler (error) {
  console.log(error.toString());
}

gulp.task('connect', ['html', 'scripts', 'styles'], function () {
  connect.server({
    root: 'tmp',
    livereload: true
  });
});

gulp.task('html', ['inject'], function () {
  return gulp.src(['app/**/*.html', '!app/index.html'])
  .pipe(gulp.dest('tmp'))
  .pipe(connect.reload());
});

gulp.task('inject', function () {
  gulp.src('./app/index.html')
    .pipe(inject(gulp.src('./app/js/**/*', {read: false}), {relative: true}))
    .pipe(gulp.dest('./tmp'))
});

gulp.task('scripts', function () {
  return gulp.src('app/js/**/*.js')
  .pipe(es6().on('error', errorHandler))
  .pipe(gulp.dest('tmp/js'))
  .pipe(connect.reload());
});

gulp.task('styles', function () {
  gulp.src('app/styles/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('tmp/styles'))
  .pipe(connect.reload())
});

gulp.task('watch', function () {
  gulp.watch('app/**/*.html', ['html']);
  gulp.watch('app/js/**/*.js', ['scripts', 'html']);
  gulp.watch('app/styles/**/*.scss', ['styles']);
})

function cleaner (directory, cb) {
  return del(directory, function (err, path) {
    if(err === null) {
      return cb();
    }
    cb(err);
  });
}

gulp.task('clean', function (cb) {
  return cleaner('tmp', cb);
})

gulp.task('dist:clean', function (cb) {
  return cleaner('dist', cb);
})



gulp.task('dist',['dist:clean'], function () {
  gulp.src('app/js/**/*.js')
  .pipe(es6())
  .pipe(concat('main.js'))
  .pipe(uglyify())
  .pipe(gulp.dest('dist/js'));

  gulp.src('app/styles/**/*.scss')
  .pipe(sass())
  .pipe(minifyCSS())
  .pipe(gulp.dest('dist/styles'));

  gulp.src('app/images/**/*')
  .pipe(gulp.dest('dist/images'));

});

gulp.task('default', ['connect', 'watch'],function () {});

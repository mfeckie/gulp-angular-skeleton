var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('connect', ['index', 'scripts'], function () {
  connect.server({
    root: 'tmp',
    livereload: true
  });
});

gulp.task('index', function () {
  return gulp.src('app/index.html')
  .pipe(gulp.dest('tmp'))
  .pipe(connect.reload());
});

gulp.task('scripts', function () {
  return gulp.src('app/js/**/*.js')
  .pipe(gulp.dest('tmp/js'))
  .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch('app/index.html', ['index']);
  gulp.watch('app/js/**/*.js', ['scripts']);
})

gulp.task('default', ['connect', 'watch'],function () {});

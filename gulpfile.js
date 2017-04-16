var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task("client", function() {
  return gulp.src("app/core/client/*.js").
  pipe(babel({
    plugins: ['transform-react-jsx']
  })).
  pipe(gulp.dest("app/dist/client/"));
});

gulp.task("server", function() {
  return gulp.src("app/core/server/*.js").
  pipe(babel({
    plugins: ['transform-react-jsx']
  })).
  pipe(gulp.dest("app/dist/server/"));
});
gulp.task("crypto", function() {
  return gulp.src("app/core/crypt/*.js").
  pipe(babel({
    plugins: ['transform-react-jsx']
  })).
  pipe(gulp.dest("app/dist/crypt/"));
});

gulp.task("watch", ['client', 'server','crypto'], function() {
  gulp.watch('app/core/client/*', ['client']);
  gulp.watch('app/core/server/*', ['server']);
  gulp.watch('app/core/crypt/*', ['crypto']);
});


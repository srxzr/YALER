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

gulp.task("watch", ['client', 'server'], function() {
  gulp.watch('app/core/client/*', ['client']);
  gulp.watch('app/core/server/*', ['server']);
});


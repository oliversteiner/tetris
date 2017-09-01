var gulp = require('gulp');
var server = require('gulp-server-livereload');

gulp.task('start', function() {
  gulp.src('app')
      .pipe(server({
        livereload: true,
        directoryListing: false,
        defaultFile:'index.html',
        open: true,
        log: 'error'
      }));
});
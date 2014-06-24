var 
  gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify')
  ;

gulp.task('default', function() {
  gulp.src('../src/*.js')
    .pipe(concat('htmlimports.js'))
    .pipe(uglify({
      mangle: false,
      compress: false,
      output: {
        beautify: true
      }
    }))
    .pipe(gulp.dest('../../dist/'))
  ;
  gulp.src('../src/*.js')
    .pipe(concat('htmlimports.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('../../dist/'))
  ;
});
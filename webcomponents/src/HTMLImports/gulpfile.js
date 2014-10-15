var 
  gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify')
  ;

var module = 'HTMLImports';
var srcs = require('./build.json');

gulp.task('default', function() {

  gulp.src(srcs)
    .pipe(concat(module + '.js'))
    .pipe(uglify({
      mangle: false,
      compress: false,
      output: {
        beautify: true
      }
    }))
    .pipe(gulp.dest('../../dist/'))
  ;
  
  gulp.src(srcs)
    .pipe(concat(module + '.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('../../dist/'))
  ;

});
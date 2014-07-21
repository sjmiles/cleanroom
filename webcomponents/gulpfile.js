var 
  gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify')
  ;

var srcs = [
  'dist/ShadowDOM.js',
  'dist/HTMLImports.js',
  'dist/CustomElements.js'
];

gulp.task('default', function() {
  gulp.src(srcs)
    .pipe(concat('webcomponents.js'))
    .pipe(uglify({
      mangle: false,
      compress: false,
      output: {
        beautify: true
      }
    }))
    .pipe(gulp.dest('dist/'))
  ;
  
  gulp.src(srcs)
    .pipe(concat('webcomponents.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'))
  ;
});
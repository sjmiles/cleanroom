var 
  gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  path = require('path'),
  uconcat = require('unique-concat')
  ;

var srcs = sources([
  'ShadowDOM',
  'HTMLImports'
]);

var module = 'webcomponents';

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
    .pipe(gulp.dest('dist/'))
  ;
  
  gulp.src(srcs)
    .pipe(concat(module + '.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'))
  ;
});


function addSources(base, srcs) {
  var more = require(base + 'build.json');
  more = more.map(function(p) {
    return path.normalize(path.join(base, p));
  });
  return uconcat(srcs, more);
}

function sources(modules) {
  var srcs = [];
  modules.forEach(function(m) {
    srcs = addSources('./src/' + m + '/', srcs);
  });
  return srcs;
}
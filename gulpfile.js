var gulp = require('gulp');
var wrap = require('gulp-wrap');
var header = require('gulp-header');
var footer = require('gulp-footer');
var concat = require('gulp-concat');
var cached = require('gulp-cached');
var sourcemaps = require('gulp-sourcemaps');
var remember = require('gulp-remember');
var uglify = require('gulp-uglify');

var scriptsGlob = [
  'src/init.js',
  'src/**/*.js'
];

gulp.task('concat', function() {
  return gulp.src(scriptsGlob)
    .pipe(sourcemaps.init())
      .pipe(cached('scripts'))        // only pass through changed files
      .pipe(remember('scripts'))      // add back all files to the stream
      .pipe(concat('transition.js'))  // do things that require all files
      .pipe(header('(function () {\n'))
      .pipe(footer('})();'))
    .pipe(sourcemaps.write('../public'))
    .pipe(gulp.dest('public/'));
});

gulp.task('uglify', function () {
  return gulp.src(scriptsGlob)
        .pipe(cached('scripts'))        // only pass through changed files
        .pipe(remember('scripts'))      // add back all files to the stream
        .pipe(concat('transition.min.js'))  // do things that require all files
        .pipe(wrap('(function(){<%= contents %>}());'))
        .pipe(uglify())  // do things that require all files
      .pipe(gulp.dest('public/'));
});

gulp.task('watch', function () {
  var watcher = gulp.watch(scriptsGlob, ['default']); // watch the same files in our scripts task
  watcher.on('change', function (event) {
    if (event.type === 'deleted') {                   // if a file is deleted, forget about it
      delete cached.caches.scripts[event.path];       // gulp-cached remove api
      remember.forget('default', event.path);         // gulp-remember remove api
    }
  });
});

gulp.task('default', [ 'concat', 'uglify', 'watch' ]);

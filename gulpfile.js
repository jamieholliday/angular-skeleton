var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

// Modules for webserver and livereload
var embedlr = require('gulp-embedlr'),
    refresh = require('gulp-livereload'),
    lrserver = require('tiny-lr')(),
    express = require('express'),
    livereload = require('connect-livereload'),
    livereloadport = 35729,
    serverport = 8080;

// Set up an express server (not starting it yet)
var server = express();
// Add live reload
server.use(livereload({port: livereloadport}));
// Use our 'public' folder as rootfolder
server.use(express.static('./public'));
// Because I like HTML5 pushstate .. this redirects everything back to our index.html
server.all('/*', function(req, res) {
  res.sendfile('index.html', { root: 'public' });
});

// Dev task
gulp.task('dev', ['views', 'styles', 'lint', 'browserify'], function() {
  // Start webserver
  server.listen(serverport);
  // Start live reload
  lrserver.listen(livereloadport);
  // Run the watch task, to keep taps on changes
  gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'],[
    'lint',
    'browserify'
  ]);
  // Watch our sass files
  gulp.watch(['app/styles/**/*.scss'], [
    'styles'
  ]);

  gulp.watch(['app/**/*.html'], [
        'views'
    ]);
});

// JSHint task
gulp.task('lint', function() {
  gulp.src('app/scripts/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

// Styles task
gulp.task('styles', function() {
  gulp.src('app/styles/*.scss')
  // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
  .pipe(sass({onError: function(e) { console.log(e); } }))
  // Optionally add autoprefixer
  .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
  // These last two should look familiar now :)
  .pipe(gulp.dest('public/css/'))
  .pipe(refresh(lrserver));
});

// Browserify task
gulp.task('browserify', function() {
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out)
  gulp.src(['app/scripts/main.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  // Bundle to a single file
  .pipe(concat('bundle.js'))
  // Output it to our public folder
  .pipe(gulp.dest('public/js'));
});

// Views task
gulp.task('views', function() {
    // Get our index.html
    gulp.src('app/index.html')
    // And put it in the public folder
    .pipe(gulp.dest('public/'))
    .pipe(refresh(lrserver));

    // Any other view files from app/views
    gulp.src('app/views/**/*')
    // Will be put in the public/views folder
    .pipe(gulp.dest('public/views/'))
    .pipe(refresh(lrserver));
});

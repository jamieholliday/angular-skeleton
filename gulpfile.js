;(function(){
    'use strict';
    
    var gulp        = require('gulp'),
        browserSync = require('browser-sync'),
        reload      = browserSync.reload,
        sass        = require('gulp-sass'),
        minifyCss   = require('gulp-minify-css'),
        concat      = require('gulp-concat'),
        ngAnnotate  = require('gulp-ng-annotate'),
        uglify      = require('gulp-uglify'),
        minifyHtml  = require('gulp-minify-html'),
        flatten     = require('gulp-flatten'),
        sourceMaps  = require('gulp-sourcemaps'),
        plumber     = require('gulp-plumber'),
        paths;
    
    paths = {
        js : [
            'node_modules/angular/angular.js',
            'node_modules/ui-router/angular-ui-router.js',
            'app/main.js',
            'app/modules/**/*.js'
        ]
    };
        

    // Default task to be run with `gulp`
    gulp.task('default', ['views', 'styles', 'js', 'browser-sync'], function () {
        gulp.watch(['app/main.js', 'app/modules/**/*.js'], ['js']);
            // Watch our scss files
            gulp.watch(['app/main.scss', 'app/modules/**/*.scss'], [
                'styles'
            ]);

            gulp.watch(['app/index.html', 'app/modules/**/*.html'], [
                'views'
            ]);
    });

    // browser-sync task for starting the server.
    gulp.task('browser-sync', function() {
        browserSync({
            server: {
                baseDir: './public',
                ghostMode: false
            }
        });
    });

    // Styles
    gulp.task('styles', function () {
        return gulp.src('app/main.scss')
            .pipe(sourceMaps.init())
            .pipe(sass({
                errorLogToConsole: true
            }))
            .pipe(sourceMaps.write())
            .pipe(gulp.dest('public/'))
            .pipe(reload({stream:true}));
    });

    //JS
    gulp.task('js', function() {
        return gulp.src(paths.js)
            .pipe(plumber())
            .pipe(sourceMaps.init())
            .pipe(concat('app.js'))
            .pipe(sourceMaps.write())
            .pipe(gulp.dest('public/'))
            .pipe(reload({stream:true}));
    });

    //Views
    gulp.task('views', function() {
        // Get our index.html
        gulp.src('app/index.html')
            .pipe(plumber())
            // And put it in the public folder
            .pipe(gulp.dest('public/'))
            .pipe(reload({stream:true}));

            // Any other view files from app/views
            gulp.src('app/modules/**/*.html')
            // Will be put in the public/views folder
            .pipe(flatten())
            .pipe(gulp.dest('public/views/'))
            .pipe(reload({stream:true}));
    });
})();
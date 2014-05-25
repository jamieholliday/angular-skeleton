var gulp = require('gulp'),
	refresh = require('gulp-livereload'),
	sass = require('gulp-sass'),
	connect = require('gulp-connect');

var paths = {
	styles: {
		src: 'public/modules/styles/**/*.scss',
		dest: 'public/css'
	},
	html: {
		src: ['public/index.html', 'public/partials/**/*.html']
	},
	js: {
		src: 'public/modules/**/*.js'
	}
};

gulp.task('default', ['connectDev', 'watch']);

gulp.task('connectDev', function() {
	connect.server({
		livereload: true,
		port: 8080
	})
});

gulp.task('watch', function() {
	gulp.watch(paths.styles.src, ['styles']);
	gulp.watch(paths.html.src, ['html']);
	gulp.watch(paths.js.src, ['js']);
});

//runs sass task and live reload on scss changes
gulp.task('styles', function() {
	return gulp.src(paths.styles.src)
		.pipe(sass({
				sourceComments: 'map',
				includePaths : [paths.styles.src]
			}
		))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(connect.reload());
});

//runs livereload on html changes
gulp.task('html', function() {
	return gulp.src(paths.html.src)
		.pipe(connect.reload());
});

//runs livereload on all js changes
gulp.task('js', function() {
	return gulp.src(paths.js.src)
	.pipe(connect.reload());
});

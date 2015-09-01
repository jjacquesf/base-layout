var gulp = require('gulp'),
	jade = require('gulp-jade'),
	stylus = require('gulp-stylus')
	watch = require('gulp-watch'),
	concat = require('gulp-concat'),
	webserver = require('gulp-webserver'),
	dirSync = require('gulp-dir-sync');



gulp.task('vender-concat', function() {
	gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
		.pipe(concat('vendor.css'))
		.pipe(gulp.dest('public/css/'));
});


gulp.task('compile-styl', function() {

	gulp.src('client/*.styl')
		.pipe(watch('client/*.styl'))
		.pipe(stylus())
		.pipe(gulp.dest('public/css/'));
});

gulp.task('compile-jd', function() {
	gulp.src('client/*.jade')
		.pipe(watch('client/*.jade'))
		.pipe(jade())
		.pipe(gulp.dest('public/'));
});


gulp.task('webserver', function() {
	gulp.src('./public')
		.pipe(webserver({
			livereload: true,
			directoryListing: false,
			open: true
		}));
});

gulp.task('sync-images', function() {
	dirSync('client/images', 'public/img')
});

gulp.task('default', ['sync-images', 'vender-concat', 'compile-styl', 'compile-jd', 'webserver']);

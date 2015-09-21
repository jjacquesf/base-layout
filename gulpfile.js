var gulp = require('gulp'),
	jade = require('gulp-jade'),
	stylus = require('gulp-stylus')
	concat = require('gulp-concat'),
	webserver = require('gulp-webserver'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	minifyCSS = require('gulp-minify-css');

gulp.task('css', function () {
    gulp.src('lib/styl/style.styl')
        .pipe(stylus({compress: true, paths: ['lib/styl']}))
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        .pipe(rename('style.css'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('html', function() {
  gulp.src('lib/jade/*.jade')
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('public'))
});

gulp.task('webserver', function() {
	gulp.src('./public')
		.pipe(webserver({
			livereload: true,
      open: true,
			directoryListing: false
		}));
});

gulp.task('js', function() {
  // gulp.src([
  //   'bower_components/jquery/dist/jquery.js',
  //   'bower_components/modernizr/modernizr.js'
  // ])
  //   .pipe( concat('vendors.js') ) // concat pulls all our files together before minifying them
  //   .pipe(uglify())
  //   .pipe(gulp.dest('public/js'))
});

gulp.task('copy-folder', function() {  
  gulp.src('lib/img/*')
    .pipe(gulp.dest('public/img'));
});

gulp.task('watch', function () {
   gulp.watch('lib/styl/*.styl', ['css']);
   gulp.watch(['lib/jade/*.jade', 'lib/templates/*.jade'], ['html']);
   gulp.watch('lib/js/*.js', ['js']);
   gulp.watch('lib/img/*', ['copy-folder']);
});

gulp.task('default', ['css', 'html', 'js', 'copy-folder', 'webserver', 'watch']);

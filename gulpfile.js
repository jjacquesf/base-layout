var gulp = require('gulp'),
	jade = require('gulp-jade'),
	stylus = require('gulp-stylus')
	concat = require('gulp-concat'),
	webserver = require('gulp-webserver'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	minifyCSS = require('gulp-minify-css'),
  dirSync = require('gulp-directory-sync'),
  uglify = require('gulp-uglify');

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

gulp.task('img', function() {  
  gulp.src( '' )
    .pipe(dirSync('lib/img', 'public/img'));
});

gulp.task('js', function(){
    return gulp.src(['lib/js/*'])
        .pipe(concat('concat.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(rename('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

gulp.task('webserver', function() {
  gulp.src('./public')
    .pipe(webserver({
      livereload: true,
      open: true,
      directoryListing: false
    }));
});

gulp.task('watch', function () {
   gulp.watch(['lib/styl/*.styl', 'lib/styl/*/*.css'], ['css']);
   gulp.watch(['lib/jade/*.jade', 'lib/jade/*/*.jade'], ['html']);
   gulp.watch(['lib/img/*'], ['img']);
   gulp.watch(['lib/js/*.js'], ['js']);
   
});

gulp.task('default', ['css', 'html', 'img', 'js','webserver', 'watch']);

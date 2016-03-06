var gulp   = require('gulp');
var coffee = require("gulp-coffee");
var del = require('del');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var uncss = require('gulp-uncss');
var nano = require('gulp-cssnano');

gulp.task('coffee', function() {
  return gulp.src(['./src/chromatic/views/**.coffee', './src/chromatic/plugin.coffee'])
    .pipe(coffee())
    .pipe(concat('plugin.js'))
    .pipe(gulp.dest('./src/chromatic/build'))
})

gulp.task('chromatic', ['coffee'], function() {
  return gulp.src(['./src/chromatic/lib/*.js', './src/chromatic/build/plugin.js'])
   // .pipe(uglify())
    .pipe(concat('chromatic.js'))
    .pipe(gulp.dest('./src/lib/'))
})

gulp.task('javascripttop', ['chromatic'], function() {
  return gulp.src(['./src/lib/jquery.modal.min.js', './src/lib/chromatic.js'])
    .pipe(uglify())
    .pipe(concat('odysseytop.js'))
    .pipe(gulp.dest('./dist/assets/js/'))
})

gulp.task('javascriptbottom', function() {
  return gulp.src(['./src/lib/main.js', './src/lib/util.js'])
    .pipe(uglify())
    .pipe(concat('odysseybottom.js'))
    .pipe(gulp.dest('./dist/assets/js/'))
})

gulp.task('css', function () {
  return gulp.src(['./src/sass/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(uncss({
        html: ['./dist/index.html'],
        ignore: [/chromatic-.*/, /iglobe-.*/, '#map', '.modal', /modal-.*/, '.modal a.close-modal', '.blocker', '.blocker:before', '#titleBar', '#gallery div']
    }))
    .pipe(nano())
    .pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('build-and-clean', ['javascripttop', 'javascriptbottom', 'css'], function() {
  del(['./src/chromatic/build']);
})

gulp.task('default', ['build-and-clean'])
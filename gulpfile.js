'use strict';
var gulp = require('gulp'),
    changed = require('gulp-changed'),
    sass = require('gulp-sass'),
    autoPrefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    mocha = require('gulp-mocha'),
    pump = require('pump'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    s2j = require('gulp-sheets2json'),
    bs = require('browser-sync').create();

var sassFile = 'build/sass/*.scss',
    sassFileSrc = 'build/sass/',
    cssFile = 'build/css/*.css',
    cssFileSrc = 'build/css',
    jsFile = 'build/js/*.js',
    distCssSrc = 'dist/css',
    distJsSrc = 'dist/js',
    excelFile = 'build/excel/*.xlsx',
    excelSrc = 'build/excel',
    jsonFile = 'json/*.json',
    jsonSrc = 'json';

// sass to css
gulp.task('sass-to-css', function(){
  return gulp.src(sassFile)
      .pipe(changed(sassFile))
      .pipe(sass().on('error', function (e) {
        console.error(e.message);
      }))
      .pipe(autoPrefixer({
        browsers: ['last 99 versions']
      }))
      .pipe(concat('style.css'))
      .pipe(gulp.dest(cssFileSrc));
});

// css minify
gulp.task('minify-css', function() {
  return gulp.src([cssFile])
      .pipe(changed(cssFile))
      .pipe(cleanCSS({ compatibility: 'ie8' }))
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(distCssSrc));
});

// js minify
gulp.task('jscompress', function (cb) {
  pump([
        gulp.src(jsFile),
        uglify(),
        rename({ suffix: '.min' }),
        gulp.dest(distJsSrc)
      ],
      cb
  );
});

// to json
gulp.task('tojson', function() {
  return gulp.src([excelFile])
      .pipe(changed(excelFile))
      .pipe(s2j())
      .pipe(gulp.dest(jsonSrc));
});

// watch sass
gulp.task('watch-sass', function (done) {
  gulp.watch(sassFile, ['sass-to-css'])
      .on('end', done);
});
// watch css
gulp.task('watch-css', function (done) {
  gulp.watch(cssFile, ['minify-css'])
      .on('end', done);
});
// watch js
gulp.task('watch-js', function (done) {
  gulp.watch(jsFile, ['jscompress'])
      .on('end', done);
});
// watch excel
gulp.task('watch-excel', function (done) {
  gulp.watch(excelFile, ['tojson'])
      .on('end', done);
});

// watch
gulp.task('watch', ['watch-sass', 'watch-css', 'watch-js', 'watch-excel']);

// browser-sync
gulp.task('browser-sync',function() {
  bs.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("./dist/**/*.*").on('change', bs.reload);
});

//gulp
gulp.task('default',['watch','browser-sync']);

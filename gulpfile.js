/* =====================================================
   Settings
======================================================== */

'use strict';

// Paths
var src = './src';
var dest = './dist';

// Settings
var settings = {
  /* filename for the Js concatenation */
  jsConcatTo: 'main.js',
  /* browserSync server */
  browserSync: {
    server: {
      baseDir: dest
    }
  },
  /* browserSync server, root and directory listing
  browserSync: {
    server: {
      baseDir: './',
      directory: true
    }
  },*/
  /* browserSync proxy to webserver, keep trailing / or it bugs
  browserSync: {
    proxy: 'http://192.168.1.183/git/gulp-starter-kit/' + dest + '/',
    host: '192.168.1.183',
    open: 'external'
  },*/
  /* ftp options
  ftp: {
    host: 'website.com',
    port: 21,
    user: 'johndoe',
    pass: '1234',
    remotePath: '/',
    src: dest + "/**"
  },*/
  /* image options */
  imagemin: {
    progressive: true,
    interlaced: true
  }
};

/* =====================================================
   Includes
======================================================== */

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var cache = require('gulp-cache');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var flatten = require('gulp-flatten');
var ftp = require('gulp-ftp');
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');
var less = require('gulp-less');
var jshint = require('gulp-jshint');
var minifycss = require('gulp-minify-css');
var rename = require("gulp-rename");
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass')
var stylish = require('jshint-stylish');
var mergeStream = require('merge-stream');
var runSequence = require('run-sequence');

/* =====================================================
   Default Task
======================================================== */

gulp.task('default', function(callback) {
  runSequence(['build'], ['connect'], callback);
});

/* =====================================================
   Build Tasks
======================================================== */

gulp.task('build', ['build-js', 'build-css', 'build-less', 'build-sass', 'build-markup', 'build-images', 'build-fonts']);

// Concat & Uglify & Sourcemaps Js
gulp.task('build-js', ['compile-js'], function() {
  gulp.watch([src + '/scripts/**/*.js'], ['build-js', reload]);
  return gulp.src([src + '/scripts/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat(settings.jsConcatTo))
    .pipe(gulp.dest(dest + '/scripts'))
    .pipe(rename({suffix: ".min"}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest + '/scripts'));
});

// Compile & Uglify Js
gulp.task('compile-js', ['lint-js'], function() {
  return gulp.src([src + '/scripts/**/[!_]*.js'])
    .pipe(gulp.dest(dest + '/scripts'))
    .pipe(rename({suffix: ".min"}))
    .pipe(uglify())
    .pipe(gulp.dest(dest + '/scripts'));
});

// JS Lint
gulp.task('lint-js', function() {
  return gulp.src([src + '/scripts/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// Copy Css
gulp.task('build-css', function() {
  gulp.watch([src + '/styles/**/*.css'], ['build-css', reload]);
  return gulp.src([src + '/styles/**/[!_]*.css'])
    .pipe(changed(dest + '/styles'))
    .pipe(gulp.dest(dest + '/styles'));
});

// Compile & Minify & Sourcemaps Less
gulp.task('build-less', function() {
  gulp.watch([src + '/styles/**/*.less'], ['build-less', reload]);
  return gulp.src([src + '/styles/**/[!_]*.less'])
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write({includeContent: false})) // fix
    .pipe(sourcemaps.init({loadMaps: true})) // fix
    .pipe(gulp.dest(dest + '/styles'))
    .pipe(minifycss())
    .pipe(rename({suffix: ".min"}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest + '/styles'));
});

// Compile & Minify & Sourcemaps Sass
gulp.task('build-sass', function() {
  gulp.watch([src + '/styles/**/*.scss'], ['build-sass', reload]);
  return gulp.src([src + '/styles/**/[!_]*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write({includeContent: false})) // fix
    .pipe(sourcemaps.init({loadMaps: true})) // fix
    .pipe(gulp.dest(dest + '/styles'))
    .pipe(minifycss())
    .pipe(rename({suffix: ".min"}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest + '/styles'));
});

// Copy Markup
gulp.task('build-markup', function() {
  var markupFiles = [src + '/*', src + '/**/*.{html,php}', src + '/.htaccess'];
  gulp.watch(markupFiles, ['build-markup', reload]);
  return gulp.src(markupFiles)
    .pipe(changed(dest))
    .pipe(gulp.dest(dest));
});

// Copy Images
gulp.task('build-images', function() {
  gulp.watch([src + '/images/**'], ['build-images', reload]);
  return gulp.src([src + '/images/**'])
    .pipe(changed(dest + '/images'))
    .pipe(gulpif(settings && settings.imagemin, cache(imagemin(settings.imagemin))))
    .pipe(gulp.dest(dest + '/images'));
});

// Copy Fonts
gulp.task('build-fonts', function() {
  gulp.watch([src + '/fonts/**'], ['build-fonts', reload]);
  return gulp.src([src + '/fonts/**'])
    .pipe(changed(dest + '/fonts'))
    .pipe(gulp.dest(dest + '/fonts'));
});

/* =====================================================
   Connect Tasks
======================================================== */

gulp.task('connect', ['connect-sync', 'ftp']);

// Start Browser Sync
gulp.task('connect-sync', function() {
  if (settings && settings.browserSync) {
    return browserSync(settings.browserSync);
  }
});

// Upload to ftp
gulp.task('ftp', function() {
  if (settings && settings.ftp) {
    return gulp.src(settings.ftp.src)
      .pipe(ftp(settings.ftp));
  }
});

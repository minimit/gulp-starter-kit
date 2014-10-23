/* =====================================================
   Settings
======================================================== */
'use strict';

// Paths
var src = './app';
var dest = './dist';
var bowerrc = './.bowerrc';

// Install
var fs = require('fs');
var bower = JSON.parse(fs.readFileSync(bowerrc)).directory;
var install = {
  // copy variables.less for customization
  variables: {
    filter: bower + '/bootstrap/less/variables.less',
    dest: src + '/styles/bootstrap'
  },
  // copy font files
  fonts: {
    filter: bower + '/bootstrap/fonts/**',
    dest: src + '/fonts'
  }
};

// Settings
var settings = {
  /* browserSync server, html only
  browserSync: {
    server: {
      baseDir: './' + dest
    }
  },*/
  /* proxy to webserver, keep trailing / or bugs */
  browserSync: {
    proxy: 'http://192.168.1.183/git/mt-gulp/' + dest + '/',
    host: '192.168.1.183',
    open: 'external'
  },
  /* ftp upload
  ftp: {
    host: 'website.com',
    port: 21,
    user: 'johndoe',
    pass: '1234',
    remotePath: '/',
    src: dest + "/**"
  },*/
  imagemin: {
    progressive: true,
    svgoPlugins: [{
      removeViewBox: false
    }]
  },
};

// Config
var config = {
  js: {
    compileFiles: [src + '/scripts/main.js'],
    src: src + '/scripts/**/*.js',
    dest: dest + '/scripts'
  },
  less: {
    compileFiles: [src + '/styles/main.less'],
    src: src + '/styles/**/*.less',
    dest: dest + '/styles'
  },
  css: {
    src: src + '/styles/**/*.css',
    dest: dest + '/styles'
  },
  images: {
    src: src + '/images/**',
    dest: dest + "/images"
  },
  fonts: {
    src: src + '/fonts/**',
    dest: dest + '/fonts'
  },
  markup: {
    src: src + '/**/*.{html,ico,txt,php}',
    dest: dest
  }
};

/* =====================================================
   Includes
======================================================== */
var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var del = require('del');
var changed = require('gulp-changed');
var flatten = require('gulp-flatten');
var ftp = require('gulp-ftp');
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');
var include = require('gulp-include');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var minifycss = require('gulp-minify-css');
var rename = require("gulp-rename");
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var stylish = require('jshint-stylish');
var mergeStream = require('merge-stream');
var runSequence = require('run-sequence');

/* =====================================================
   Tasks
======================================================== */
gulp.task('rebuild', function(callback) {
  runSequence(['clean'], ['default'], callback);
});
gulp.task('default', function(callback) {
  runSequence(['install'], ['build'], ['connect'], callback);
});

/* =====================================================
   Clean Tasks
======================================================== */
gulp.task('clean', ['clean-dest']);

// Remove Dest Folder
gulp.task('clean-dest', function(cb) {
  return del(dest, cb);
});

/* =====================================================
   Install Tasks
======================================================== */
gulp.task('install', ['install-copy']);

// Copy External Files
gulp.task('install-copy', function() {
  if (install) {
    var merged = mergeStream();
    for (var key in install) {
      var key = install[key];
      var stream = gulp.src(key.filter, {
          base: key.base
        })
        .pipe(gulpif(!key.base, flatten()))
        .pipe(changed(key.dest))
        .pipe(gulp.dest(key.dest))
      merged.add(stream);
    }
    return merged;
  }
});

/* =====================================================
   Build Tasks
======================================================== */
gulp.task('build', ['build-js', 'build-css', 'build-less', 'build-markup', 'build-images', 'build-fonts']);

// Compile & Uglify Js
gulp.task('build-js', ['lint-js'], function() {
  if (config && config.js && config.js.compileFiles) {
    gulp.watch(config.js.src, ['build-js', reload]);
    return gulp.src(config.js.compileFiles)
      .pipe(sourcemaps.init())
      .pipe(include())
      .pipe(gulp.dest(config.js.dest))
      .pipe(rename({suffix: ".min"}))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(config.js.dest));
  }
});

// JS Lint
gulp.task('lint-js', function() {
  if (config && config.js && config.js.src) {
    return gulp.src(config.js.src)
      .pipe(jshint())
      .pipe(jshint.reporter(stylish));
  }
});

// Copy Css
gulp.task('build-css', function() {
  if (config && config.css && config.css.src) {
    gulp.watch(config.css.src, ['build-css', reload]);
    return gulp.src(config.css.src)
      .pipe(changed(config.css.dest))
      .pipe(gulp.dest(config.css.dest));
  }
});

// Compile & Minify Less
gulp.task('build-less', function() {
  if (config && config.less && config.less.compileFiles) {
    gulp.watch(config.less.src, ['build-less', reload]);
    return gulp.src(config.less.compileFiles)
      .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(gulp.dest(config.less.dest))
      .pipe(rename({suffix: ".min"}))
      .pipe(minifycss())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(config.less.dest));
  }
});

// Copy Markup
gulp.task('build-markup', function() {
  if (config && config.markup && config.markup.src) {
    gulp.watch(config.markup.src, ['build-markup', reload]);
    return gulp.src(config.markup.src)
      .pipe(changed(config.markup.dest))
      .pipe(gulp.dest(config.markup.dest));
  }
});

// Copy Images
gulp.task('build-images', function() {
  if (config && config.images && config.images.src) {
    gulp.watch(config.images.src, ['build-images', reload]);
    return gulp.src(config.images.src)
      .pipe(changed(config.images.dest))
      .pipe(gulpif(settings && settings.imagemin, imagemin(settings.imagemin)))
      .pipe(gulp.dest(config.images.dest));
  }
});

// Copy Fonts
gulp.task('build-fonts', function() {
  if (config && config.fonts && config.fonts.src) {
    gulp.watch(config.fonts.src, ['build-fonts', reload]);
    return gulp.src(config.fonts.src)
      .pipe(changed(config.fonts.dest))
      .pipe(gulp.dest(config.fonts.dest));
  }
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

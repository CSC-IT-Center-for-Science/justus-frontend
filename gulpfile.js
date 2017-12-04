'use strict';
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const gulpNgConfig = require('gulp-ng-config');
const size = require('gulp-size');
const templateCache = require('gulp-angular-templatecache');
const RevAll = require('gulp-rev-all');
const runSequence = require('run-sequence');
const del = require('del');
const gutil = require('gulp-util');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

const SOURCE_PATH = 'src';
const BUILD_PATH = 'build';
const DIST_PATH = 'dist';

// Use command line flag to trigger this, eg. 'gulp build --production'
const isProduction = gutil.env.production ? true : false;
const buildDestinationPath = gutil.env.production || gutil.env.qa ? DIST_PATH : BUILD_PATH;

const config = {

  assets: {
    appHtmlSrc: [
      SOURCE_PATH + '/app/**/*.html'
    ],

    // App app javascript source
    appSrc: [
      SOURCE_PATH + '/app/**/*.js'
    ],

    // App style source
    appStyleSrc: [
      'node_modules/bootstrap-sass/assets/stylesheets/*.scss',
      'node_modules/font-awesome/scss/**/*.scss',
      SOURCE_PATH + '/app/scss/main.scss'
    ],

    // Dependencies
    libSrc: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/bluebird/js/browser/bluebird.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-animate/angular-animate.js',
      'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
      'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
      'node_modules/angular-sanitize/angular-sanitize.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      'node_modules/ng-tags-input/build/ng-tags-input.js',
      'node_modules/ui-select/dist/select.js',
      'node_modules/angular-touch/angular-touch.js',
      'node_modules/ng-csv/build/ng-csv.js'
    ],

    // Define lib styles here
    libStyleSrc: [
      'node_modules/ui-select/dist/select.css',
      'node_modules/ng-tags-input/build/ng-tags-input.css',
      'node_modules/ng-tags-input/build/ng-tags-input.bootstrap.css'
    ],

    // Define path for fonts
    fontSrc: [
      SOURCE_PATH + '/assets/fonts/*',
      SOURCE_PATH + '/**/*.ttf',
      'node_modules/font-awesome/fonts/**/*'
    ],

    // Define path for images
    imageSrc: [
      SOURCE_PATH + '/assets/img/*'
    ],

    rootAssetSrc: [
      SOURCE_PATH + '/assets/root/*'
    ],

    // Bundle files
    appScriptsBundleFileSrc: buildDestinationPath + '/js/app-bundle.js',
    libScriptsBundleFileSrc: buildDestinationPath + '/js/lib-bundle.js',
    appStylesBundleFileSrc: buildDestinationPath + '/css/style-bundle.css',
    libStylesBundleFileSrc: buildDestinationPath + '/css/libstyle-bundle.css'
  }
};

// Files to revision
var revSourceFiles = [
  config.assets.appScriptsBundleFileSrc,
  config.assets.libScriptsBundleFileSrc,
  config.assets.libStylesBundleFileSrc,
  config.assets.appStylesBundleFileSrc
];

// Renames files after build
gulp.task('rev-all', function (callback) {
  if (isProduction === false) {
    return gutil.noop();
  }

  var revAll = new RevAll({
    dontRenameFile: ['index.html', 'config.js'],
    dontUpdateReference: ['index.html', 'config.js']
  });
  return gulp.src(
    revSourceFiles
    .concat(buildDestinationPath + '/index.html')
    .concat(buildDestinationPath + '/config.js')
  )
  .pipe(revAll.revision())
  .pipe(size({
    title: 'rev'
  }))
  .pipe(gulp.dest(buildDestinationPath));
});

gulp.task('templatecache', function () {
  return gulp.src(config.assets.appHtmlSrc)
  .pipe(size({
    title: 'html'
  }))
  .pipe(templateCache({
    standalone: true
  }))
  .pipe(gulp.dest(SOURCE_PATH + '/app'));
});

// Copy additional html files
gulp.task('html', function () {
  return gulp.src([SOURCE_PATH + '/index.html', SOURCE_PATH + '/config.js'])
  .pipe(gulp.dest(buildDestinationPath))
  .on('error', function(e) {
    gutil.log(e);
  });
});

// Deletes all files generated in the build
gulp.task('clean', [], function () {
  return del([buildDestinationPath]);
});

gulp.task('del-lib-js', function () {
  return del([config.assets.libScriptsBundleFileSrc]);
});

gulp.task('del-app-js', function () {
  return del([config.assets.appScriptsBundleFileSrc]);
});

gulp.task('del-app-css', function () {
  return del([config.assets.appStylesBundleFileSrc]);
});

gulp.task('del-lib-css', function () {
  return del([config.assets.libStylesBundleFileSrc]);
});

gulp.task('app-js', function () {
  return gulp.src(config.assets.appSrc)
    .pipe(isProduction ? sourcemaps.init() : gutil.noop())
    .pipe(
      babel({ presets: ['es2015'], comments: false })
      .on('error', function(e) {
        gutil.log(e);
      })
    )
    .pipe(concat('app-bundle.js'))
    .pipe(isProduction ? uglify().on('error', function(e) {
      gutil.log(e);
    }) : gutil.noop())
    .pipe(isProduction ? sourcemaps.write('/') : gutil.noop())
    .pipe(gulp.dest(buildDestinationPath + '/js'))
    .on('error', function(e) {
      gutil.log(e);
    });
});

gulp.task('app-css', function () {
  return gulp.src(config.assets.appStyleSrc)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style-bundle.css'))
    .pipe(isProduction ? cleanCSS().on('error', function(e) {
      gutil.log(e);
    }) : gutil.noop())
    .pipe(gulp.dest(buildDestinationPath + '/css'));
});

gulp.task('lib-js', function () {
  return gulp.src(config.assets.libSrc)
    .pipe(isProduction ? sourcemaps.init() : gutil.noop())
    .pipe(concat('lib-bundle.js'))
    .pipe(isProduction ? uglify().on('error', function(e) {
      gutil.log(e);
    }) : gutil.noop())
    .pipe(isProduction ? sourcemaps.write('/') : gutil.noop())
    .pipe(gulp.dest(buildDestinationPath + '/js'));
});

gulp.task('lib-css', [], function () {
  return gulp.src(config.assets.libStyleSrc)
    .pipe(concat('libstyle-bundle.css'))
    .pipe(isProduction ? cleanCSS().on('error', function(e) {
      gutil.log(e);
    }) : gutil.noop())
    .pipe(gulp.dest(buildDestinationPath + '/css'));
});

gulp.task('fonts', function () {
  gulp.src(config.assets.fontSrc)
    .pipe(gulp.dest(buildDestinationPath + '/fonts'));
});

gulp.task('images', function () {
  gulp.src(config.assets.imageSrc)
    .pipe(gulp.dest(buildDestinationPath + '/img'));
});

gulp.task('rootAssets', function () {
  gulp.src(config.assets.rootAssetSrc)
    .pipe(gulp.dest(buildDestinationPath + '/'));
});

gulp.task('generate-config', () => {
  let environment = isProduction ? 'production' : 'development';
  if (gutil.env.qa) {
    environment = 'qa';
  }
  gutil.log(gutil.colors.yellow(`Generating app config for ${environment} environment`));
  gulp.src(SOURCE_PATH + '/environment_config.json')
    .pipe(gulpNgConfig('appConfig', { environment: environment }))
    .pipe(gulp.dest(SOURCE_PATH + '/app/js'))
    .on('error', function(e) {
      gutil.log(e);
    });
});

gulp.task('build', function (callback) {
  runSequence(
    'clean',
    'generate-config',
    'templatecache',
    ['app-js', 'lib-js', 'app-css', 'lib-css', 'fonts', 'images', 'rootAssets', 'html'],
    'rev-all',
    callback
  );
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*.html', ['default']);
  gulp.watch('./src/**/*.js', ['app-js']);
  gulp.watch('./src/**/*.scss', ['app-css']);
});

gulp.task('dev', function () {
  runSequence(
    'clean',
    'generate-config',
    'templatecache',
    ['app-js', 'lib-js', 'app-css', 'lib-css', 'fonts', 'images', 'rootAssets', 'html'],
    'watch',
    function() {
      gutil.log(gutil.colors.green('Build successful, waiting for changes...'));
    }
  );
});

// Set a default task
gulp.task('default', ['dev']);

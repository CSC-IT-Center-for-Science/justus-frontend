const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const minifyCss = require('gulp-minify-css');
const gulpNgConfig = require('gulp-ng-config');
const size = require('gulp-size');
const templateCache = require('gulp-angular-templatecache');
const RevAll = require('gulp-rev-all');
const runSequence = require('run-sequence');
const del = require('del');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

const SOURCE_PATH = 'src';
const BUILD_PATH = 'build';
const DIST_PATH = 'dist';

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
      'node_modules/angular/angular.js',
      'node_modules/angular-animate/angular-animate.js',
      'node_modules/angular-bootstrap/ui-bootstrap.js',
      'node_modules/angular-sanitize/angular-sanitize.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      'node_modules/ng-tags-input/build/ng-tags-input.js',
      'node_modules/ui-select/dist/select.js'
    ],

    // Define lib styles here
    libStyleSrc: [
      'node_modules/ui-select/dist/select.css',
      'node_modules/ng-tags-input/ng-tags-input.css',
      'node_modules/ng-tags-input/ng-tags-input.bootstrap.css',
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
    appScriptsBundleFileSrc: BUILD_PATH + '/js/app-bundle.min.js',
    libScriptsBundleFileSrc: BUILD_PATH + '/js/lib-bundle.min.js',
    appStylesBundleFileSrc: BUILD_PATH + '/css/style-bundle.min.css',
    libStylesBundleFileSrc: BUILD_PATH + '/css/libstyle-bundle.min.css',
  }
};

// Revisioned files
var revFiles = [
  config.assets.appScriptsBundleFileSrc,
  config.assets.libScriptsBundleFileSrc,
  config.assets.libStylesBundleFileSrc,
  config.assets.appStylesBundleFileSrc
];

// Use command line flag to trigger this, eg. 'gulp build --production'
var isProduction = gutil.env.production ? true : false;

// Renames files after build
gulp.task('rev-all', function () {
  var revAll = new RevAll({ dontRenameFile: ['index.html'] });
  return gulp.src(
    revFiles
    .concat(BUILD_PATH + '/index.html')
  )
  .pipe(revAll.revision())
  .pipe(size({
    title: 'rev'
  }))
  .pipe(gulp.dest(BUILD_PATH));
});

gulp.task('templatecache', function () {
  return gulp.src(config.assets.appHtmlSrc)
  .pipe(size({
    title: 'html'
  }))
  .pipe(templateCache({
    standalone: true,
  }))
  .pipe(isProduction ? uglify() : gutil.noop())
  .pipe(gulp.dest(SOURCE_PATH + '/app'));
});

// Copy additional html files
gulp.task('html', function () {
  return gulp.src([SOURCE_PATH + '/index.html', SOURCE_PATH + '/robots.txt'])
  .pipe(gulp.dest(BUILD_PATH));
});

// Deletes all build files
gulp.task('clean', [], function () {
  return del([
    BUILD_PATH + '/index.html',
    BUILD_PATH + '/css',
    BUILD_PATH + '/js',
    BUILD_PATH + '/fonts',
    BUILD_PATH + '/img'
  ]);
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

gulp.task('del-temp', function () {
  return del(
    revFiles
  .concat(BUILD_PATH + '/js/templates.js')
  );
});

gulp.task('app-js', function () {
  return gulp.src(config.assets.appSrc)
    .pipe(gutil.env.production ? gutil.noop() : sourcemaps.init())
    .pipe(babel({ presets: ['es2015'], comments: false })) 
    .pipe(concat('app-bundle.js'))
    .pipe(gulp.dest(BUILD_PATH + '/js'))
    .pipe(uglify().on('error', function(e){ console.log(e); }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gutil.env.production ? gutil.noop() : sourcemaps.write('/'))
    .pipe(gulp.dest(BUILD_PATH + '/js'));
});

gulp.task('app-css', function () {
  return gulp.src(config.assets.appStyleSrc)
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('style-bundle.css'))
  .pipe(gulp.dest(BUILD_PATH + '/css'))
  .pipe(minifyCss({
    keepSpecialComments: 0
  }))
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest(BUILD_PATH + '/css'));
});

gulp.task('lib-js', function () {
  return gulp.src(config.assets.libSrc)
  .pipe(gutil.env.production ? gutil.noop() : sourcemaps.init())
  .pipe(concat('lib-bundle.js'))
  .pipe(gulp.dest(BUILD_PATH + '/js'))
  .pipe(uglify())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gutil.env.production ? gutil.noop() : sourcemaps.write('/'))
  .pipe(gulp.dest(BUILD_PATH + '/js'));
});

gulp.task('lib-css', [], function () {
  return gulp.src(config.assets.libStyleSrc)
 .pipe(concat('libstyle-bundle.css'))
 .pipe(gulp.dest(BUILD_PATH + '/css'))
 .pipe(minifyCss())
 .pipe(concat('libstyle-bundle.min.css'))
 .pipe(gulp.dest(BUILD_PATH + '/css'));
});

gulp.task('fonts', function () {
  gulp.src(config.assets.fontSrc)
    .pipe(gulp.dest(BUILD_PATH + '/fonts'));
});

gulp.task('images', function () {
  gulp.src(config.assets.imageSrc)
    .pipe(gulp.dest(BUILD_PATH + '/img'));
});

gulp.task('rootAssets', function () {
  gulp.src(config.assets.rootAssetSrc)
    .pipe(gulp.dest(BUILD_PATH + '/'));
});

gulp.task('set-production-env', function () {
  gulp.src('config.json')
    .pipe(gulpNgConfig('appConfig', { environment: 'production' }))
    .pipe(gulp.dest(SOURCE_PATH + '/config'));
});

gulp.task('set-dev-env', function () {
  gulp.src('config.json')
    .pipe(gulpNgConfig('appConfig', { environment: 'development' }))
    .pipe(gulp.dest(SOURCE_PATH + '/config'));
});

gulp.task('build', function (callback) {
  runSequence(
    'clean',
    'templatecache',
    isProduction ? 'set-production-env' : 'set-dev-env',
    ['app-js', 'lib-js', 'app-css', 'lib-css', 'fonts', 'images', 'rootAssets', 'html'],
    'rev-all',
    'del-temp',
    callback
  );
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*.html', ['default']);
  gulp.watch('./src/**/*.js', ['app-js']);
  gulp.watch('./src/**/*.scss', ['app-css']);
});

//Set a default task
gulp.task('default', function (callback) {
  runSequence(
    'clean',
    'templatecache',
    isProduction ? 'set-production-env' : 'set-dev-env',
    ['app-js', 'lib-js', 'app-css', 'lib-css', 'fonts', 'images', 'rootAssets', 'html'],
    'rev-all',
    'del-temp',
    'watch',
    callback
  );
});
// require
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const debug = require('gulp-debug');
const nano = require('gulp-cssnano');
const ts = require("gulp-typescript");
const merge = require('merge2');
const inject = require('gulp-inject');
const copy = require('copy');
const systemjsBuilder = require('gulp-systemjs-builder');


// SASS
const input_sass = 'src/sass/**/*.scss';
const output_sass = 'app/css/';

var sassOptions = {
  errLogToConsole: true
  // outputStyle: 'expanded'
};


// Typescript
var input_ts = 'src/ts/**/*.ts';
var output_ts = 'app/js';
var output_tsd = 'app/definitions';

var tsProject = ts.createProject("tsconfig.json");

gulp.task('typescript', function () {
  var tsResult = gulp.src(input_ts)
      .pipe(sourcemaps.init()) // This means sourcemaps will be generated 
      .pipe(tsProject());

  return merge([ // Merge the two output streams, so this task is finished when the IO of both
    // operations is done.
    tsResult.dts.pipe(gulp.dest(output_tsd)),
    tsResult.js.pipe(gulp.dest(output_ts))
  ]);
});


// SASS
gulp.task('sass', function () {
  return gulp.src(input_sass)
      .pipe(debug({title: 'sass:'}))
      .pipe(sourcemaps.init())
      .pipe(sass(sassOptions).on('error', sass.logError))
      .pipe(nano())
      .pipe(sourcemaps.write('./maps'))
      //  .pipe(autoprefixer(autoprefixerOptions))
      .pipe(gulp.dest(output_sass));
});


// HTML
var html_watch = './src/html/**/*.html';
var html_views = './src/html/views/**/*.html';
var html_panels = './src/html/panels/**/*.html';
var source_html = './src/html/index.html';
var output_html = './app';
var input_js_includes = [
//  'app/js/**/*.js',
  'app/vendor/**/*.js'
];


gulp.task('html-inject', function () {

  // MAIN
  gulp.src(source_html)
  // Views
      .pipe(inject(
          gulp.src([html_views]), {
            starttag : '<!-- inject:{{path}} -->',
            relative : true,
            transform: function (filePath, file) {
              // return file contents as string
              return file.contents.toString('utf8')
            }
          }))
      // Panels
      .pipe(inject(
          gulp.src([html_panels]), {
            starttag : '<!-- inject-panel:{{path}} -->',
            relative : true,
            transform: function (filePath, file) {
              // return file contents as string
              return file.contents.toString('utf8')
            }
          }))

      // JS includes
      .pipe(inject(
          gulp.src(input_js_includes, {read: false}),
          {ignorePath: 'app/', addRootSlash: false})
      )

      .pipe(gulp.dest(output_html));
});


// Copy Images
var images_watch = './src/images/**/*';
var images_src = ['./src/images/**/*.{jpg,png,svg}'];
var images_dest = 'app/images';

gulp.task('copy-images', function (cb) {
  copy(images_src, images_dest, cb);
});


// Copy Data
var data_watch = './src/data/**/*';
var data_src = './src/data/**/*.json';
var data_dest = 'app/data';

gulp.task('copy-data', function (cb) {
  copy(data_src, data_dest, cb);
});


// Copy libraries
const node_modules = './node_modules/';
const vendor_watch = node_modules;
const libraries_dest = 'app/vendor';
const libraries_list = [
  node_modules + 'jquery/dist/jquery.min.js',
  node_modules + 'velocity-animate/velocity.min.js',
  node_modules + 'systemjs/dist/system-production.js'
];


gulp.task('copy-vendor', function (cb) {
  copy(libraries_list, libraries_dest, {'base': node_modules}, cb);
});




gulp.task('build-sjs', function () {
  var builder = systemjsBuilder();
  builder.loadConfigSync('./system.config.js');

//  builder.reset();

  builder.buildStatic('app/js/main.js', {
    minify: false,
    mangle: false
  })
      .pipe(gulp.dest('./build'));
});


// Watch task
gulp.task('default', function ()  {
  gulp.watch(input_sass, ['sass']);
  gulp.watch(input_ts, ['typescript']);
  gulp.watch(html_watch, ['html-inject']);
  gulp.watch(images_watch, ['copy-images']);
  gulp.watch(data_watch, ['copy-data']);
  gulp.watch(vendor_watch, ['copy-vendor']);

});


/*
var path = require("path");
var Builder = require('systemjs-builder');

// optional constructor options
// sets the baseURL and loads the configuration file
var builder = new Builder('path/to/baseURL', 'path/to/system/config-file.js');

builder
    .bundle('local/module.js', 'outfile.js')
    .then(function() {
      console.log('Build complete');
    })
    .catch(function(err) {
      console.log('Build error');
      console.log(err);
    });*/

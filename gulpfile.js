var clean = require('gulp-clean');
var gulp = require('gulp');
var gulpWebpack = require('gulp-webpack');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var s3 = require('gulp-s3-upload')({});

var SETTINGS = require('./settings');

var webpackConfig = require('./webpack.config');

gulp.task('clean', function() {
  return gulp.src('dist/', { read: false })
    .pipe(clean({ force: true }));
});


gulp.task('build', ['clean'], function(callback) {
  return gulp.src('src/js/entry.js')
    .pipe(gulpWebpack(webpackConfig))
    .pipe(gulp.dest('dist/'));
});

gulp.task('webpack-dev-server', ['clean', 'build'], function(callback) {
  var compiler = webpack(webpackConfig);
  new WebpackDevServer(compiler, {
    // server and middleware options
  }).listen(8080, "localhost", function(err) {
    if (err) throw new gutil.PluginError("webpack-dev-server", err);
    // Server listening
    gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

    // keep the server alive or continue?
    // callback();
  });
});

gulp.task('upload', ['clean', 'build'], function() {
  return gulp.src('./dist/**')
    .pipe(s3({
      Bucket: SETTINGS.bucketName,
      ACL: 'public-read'
    }));
});




// BUILD TASKS
gulp.task('default', ['build']);
gulp.task('server', ['webpack-dev-server']);
gulp.task('deploy', ['upload']);

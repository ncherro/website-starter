var del = require('del');
var gulp = require('gulp');
var gulpWebpack = require('gulp-webpack');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

// deploy
var RevAll = require('gulp-rev-all');
var awspublish = require('gulp-awspublish');
var s3_index = require("gulp-s3-index");

// config
var SETTINGS = require('./settings');
var webpackConfig = require('./webpack.config');

// tasks
gulp.task('clean', function() {
  return del(['dist/**/*']);
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
  });
});

gulp.task('upload', ['clean', 'build'], function() {
  var aws = {
    key: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: SETTINGS.bucketName,
    region: SETTINGS.region
  };
  aws['Bucket'] = aws.bucket;
  var publisher = awspublish.create({ params: aws });
  var headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
  };
  var revAll = new RevAll({
    dontRenameFile: [/^\/favicon\.ico$/g, /^\/robots\.txt/g]
  });
  return gulp.src('./dist/**')
    .pipe(revAll.revision())
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter())
    .pipe(s3_index(aws));
});

gulp.task('default', ['build']);
gulp.task('server', ['webpack-dev-server']);
gulp.task('deploy', ['upload']);

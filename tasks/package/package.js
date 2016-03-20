'use strict';

var Q = require('q');
var gulp = require('gulp');
var argv = require('yargs').argv;
var appPackager = require('./app-packager');

gulp.task('package', ['build'], function () {

  var targetPlatform = argv.platform || 'ALL';

  if (targetPlatform === 'ALL') {
    return Q.all([
      appPackager('darwin'),
      appPackager('win32'),
      appPackager('linux')
    ]).then(function () {
      console.log('Packaging is DONE !');
    });
  } else {
    return Q.all([
      appPackager(targetPlatform)
    ]).then(function () {
      console.log('Packaging is DONE !');
    });
  }
});

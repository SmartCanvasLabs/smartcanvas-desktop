'use strict';

var gulp = require('gulp');
var argv = require('yargs').argv;
var utils = require('../utils');

var releaseForOs = {
    osx: require('./osx'),
    linux: require('./linux'),
    windows: require('./windows'),
};

gulp.task('release', ['build', 'package'], function () {
  
  var releasePlatform = argv.platform || 'current';
  
  if (releasePlatform === 'darwin') {
    return releaseForOs.osx();
  } else if (releasePlatform === 'win32') {
    return releaseForOs.windows();
  } else if (releasePlatform === 'linux') {
    return releaseForOs.linux();
  //} else if (releasePlatform === 'all') {
  //  return releaseForOs[utils.os()]();
  } else {
    return releaseForOs[utils.os()](); 
  }    
});

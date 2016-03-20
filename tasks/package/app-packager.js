'use strict';

var Q = require('q');
var packager = require('electron-packager');
var pathUtil = require('path');
var jetpack = require('fs-jetpack');
var argv = require('yargs').argv;
var gulp = require('gulp');
var utils = require('../utils');

var buildPath = pathUtil.resolve('./build');
var packageOutPath = pathUtil.resolve('./packages');
var electronVersion = "0.37.2";

var init = function (platform) {
  return Q(platform);
};

var packagerExecutor = function (platform) {
  var deferred = Q.defer();
  
  var manifest = jetpack.read('app/package.json', 'json');
  var iconPath = pathUtil.resolve('./resources/icon.png');

  if (platform === 'darwin') {
    iconPath = pathUtil.resolve('./resources/osx/icon');
  } else if (platform === 'win32') {
    iconPath = pathUtil.resolve('./resources/windows/icon.ico');
  } else if (platform === 'linux') {
    iconPath = pathUtil.resolve('./resources/icon.png');
  }

  packager({
    "arch": "all",
    "dir": buildPath,
    "platform": platform,
    "app-bundle-id": manifest.identifier,
    "app-category-type": "public.app-category.business",
    "version": electronVersion,
    "app-version": manifest.version,
    "build-version": manifest.version,
    "asar": true,
    "icon": iconPath,
    "ignore": "((^/dist$)|(^/node_modules/(electron-packager|electron-prebuilt))|(^/electron-packager$))",
    "name": manifest.productName,
    "out": packageOutPath,
    "overwrite": true,
  }, function (err, appPath) {
    if (err) {
      console.error('Error on package (' + platform + '):', err);
    } else {
      console.log('Packaging for (' + platform + ') is DONE !');
    }
    
    deferred.resolve();
  });
  
  return deferred.promise;
};

module.exports = function (platform) {
  return init(platform)
    .then(packagerExecutor)
    .catch(console.error);
};
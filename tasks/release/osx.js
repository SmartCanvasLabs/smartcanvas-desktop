'use strict';

var Q = require('q');
var gulpUtil = require('gulp-util');
var jetpack = require('fs-jetpack');
var asar = require('asar');
var utils = require('../utils');
var child_process = require('child_process');

var projectDir;
var tmpDir;
var releasesDir;
var manifest;
var finalAppPath;

var init = function () {
    projectDir = jetpack;
    tmpDir = projectDir.dir('./tmp', { empty: true });
    manifest = projectDir.read('app/package.json', 'json');
    releasesDir = projectDir.dir('./releases');
    finalAppPath = projectDir.path('packages/' + manifest.productName + '-darwin-x64/' + manifest.productName + '.app');

    return Q();
};

var signApp = function () {
    var identity = utils.getSigningId();
    if (identity) {
        var cmd = 'codesign --deep --force --sign "' + identity + '" "' + finalAppPath + '"';
        gulpUtil.log('Signing with:', cmd);
        return Q.nfcall(child_process.exec, cmd);
    } else {
        return Q();
    }
};

var packToDmgFile = function () {
    var deferred = Q.defer();

    var appdmg = require('appdmg');
    var dmgName = manifest.name + '_' + manifest.version + '.dmg';

    // Prepare appdmg config
    var dmgManifest = projectDir.read('resources/osx/appdmg.json');
    dmgManifest = utils.replace(dmgManifest, {
        productName: manifest.productName,
        appPath: finalAppPath,
        dmgIcon: projectDir.path("resources/osx/dmg-icon.icns"),
        dmgBackground: projectDir.path("resources/osx/dmg-background.png")
    });
    tmpDir.write('appdmg.json', dmgManifest);

    // Delete DMG file with this name if already exists
    releasesDir.remove(dmgName);

    gulpUtil.log('Packaging to DMG file...');

    var readyDmgPath = releasesDir.path(dmgName);

    gulpUtil.log('DMG: ', tmpDir.path('appdmg.json'), readyDmgPath);

    appdmg({
        source: tmpDir.path('appdmg.json'),
        target: readyDmgPath
    })
    .on('error', function (err) {
        console.error('Error: ', err);
    })
    .on('finish', function () {
        gulpUtil.log('DMG file ready!', readyDmgPath);
        deferred.resolve();
    });

    return deferred.promise;
};

var cleanClutter = function () {
    return tmpDir.removeAsync('.');
};

module.exports = function () {
    return init()
        .then(signApp)
        .then(packToDmgFile)
        .then(cleanClutter)
        .catch(console.error);
};

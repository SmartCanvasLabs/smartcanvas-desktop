(function() {
  'use strict';
  require('electron-cookies');
  var contextMenu = require('./contextmenu/main');
  var externalLinks = require('./external_links/main');
  var linkWatcher = require('./link_watcher/main');

  contextMenu.initialize();
  externalLinks.initialize();
  linkWatcher.initialize();
} ());
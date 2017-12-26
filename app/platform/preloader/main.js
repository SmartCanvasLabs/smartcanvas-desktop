
(function() {
  'use strict';
  require('electron-cookies');
  var contextMenu = require('./contextmenu/main');
  var externalLinks = require('./external_links/main');
  var linkWatcher = require('./link_watcher/main');
  
  window.SmartCanvas = window.SmartCanvas || {};
  window.SmartCanvas.DesktopAppContext = window.SmartCanvas.DesktopAppContext || {};

  contextMenu.initialize();
  externalLinks.initialize();
  linkWatcher.initialize();
} ());
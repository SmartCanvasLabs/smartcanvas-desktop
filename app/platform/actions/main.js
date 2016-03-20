'use strict';

var platformUtils = {
  copyTextToClipboard: function(text) {
    var clipboard = require('electron').clipboard;
    clipboard.writeText(text);
  }
};

var urlParser = require('url-parse');

module.exports = {
  copyUrlToClipboard: {
    label: 'Copy current page address',
    action: function(url) {
      platformUtils.copyTextToClipboard(url);
    }
  },
  searchWithSmartCanvas: {
    label: 'Search into Smart Canvas...',
    action: function(curUrl, searchQuery) {
      var parsedUrl = urlParser(curUrl);
      
      var searchUrl = parsedUrl.protocol + '//' + parsedUrl.host + '/s/' + searchQuery;
      
      return searchUrl;
    }
  }
};
var remote = require('electron').remote;
var Menu = remote.Menu;
var platformUtils = require('../utils/main');

module.exports = {
  ctxMenuSelectedText: require('./ctx_menu_selected_text').build(),
  initialize: function() {
    var that = this;

    document.addEventListener('contextmenu', function(e) {
      var selectedText = platformUtils.getSelectionText();

      if (selectedText.length > 0) {
        that.ctxMenuSelectedText.popup(remote.getCurrentWindow());
      }
    }, false);
  }
};
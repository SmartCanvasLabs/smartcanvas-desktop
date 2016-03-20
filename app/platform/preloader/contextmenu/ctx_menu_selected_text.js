var remote = require('electron').remote;
var Menu = remote.Menu;
var MenuItem = remote.MenuItem;

module.exports = {
  template: function() {
    var platformUtils = require('../utils/main');
    var platformActions = require('../../actions/main');
    
    var getSearchWithSmartCanvas = function () {
      return {
        label: platformActions.searchWithSmarCanvas.label,
        click: function() {
          var selectedText = platformUtils.getSelectionText();
          platformActions.searchWithSmarCanvas.action(document.URL, selectedText);
        }
      };
    };
    
    return [
      /*
      getSearchWithSmartCanvas(),
      {
        type: 'separator'
      },*/
      {
        label: "Cut",
        role: 'cut',
      },
      {
        label: "Copy",
        role: 'copy',
      },
      {
        label: "Paste",
        role: 'paste',
      }
    ];
  },
  build: function() {
    return Menu.buildFromTemplate(this.template());
  },
};
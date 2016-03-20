import { app, Menu, BrowserWindow } from 'electron';

var getDevMenu = function() {
  return {
    label: 'Development',
    submenu: [{
      label: 'Reload',
      accelerator: 'CmdOrCtrl+R',
      click: function() {
        BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
      }
    }, {
        label: 'Toggle DevTools',
        accelerator: 'Alt+CmdOrCtrl+I',
        click: function() {
          BrowserWindow.getFocusedWindow().toggleDevTools();
        }
      }, {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click: function() {
          app.quit();
        }
      }]
  };
};

var setDevMenu = function() {
  var devMenu = Menu.buildFromTemplate([getDevMenu()]);
  Menu.setApplicationMenu(devMenu);
};

export default {
  getDevMenu: getDevMenu,
  setDevMenu: setDevMenu
}

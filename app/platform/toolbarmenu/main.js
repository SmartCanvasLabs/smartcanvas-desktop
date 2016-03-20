import { app, Menu, BrowserWindow, shell, clipboard } from 'electron';
import devHelper from './dev_helper';
import pathUtil from 'path';

var platformActions = require(pathUtil.join(__dirname, 'platform/actions/main'));

var setToolbarMenu = function(env, manifest) {

  var template = [
    {
      label: 'Edit',
      submenu: [
        /*{
          label: platformActions.searchWithSmartCanvas.label,
          click: function (item, focusedWindow) {
            var webContents = focusedWindow.webContents;
            var searchUrl = platformActions.searchWithSmartCanvas.action(webContents.getURL(), clipboard.readText('selection'));
            
            var win = new BrowserWindow({ width: 800, height: 600 });
            win.loadURL(searchUrl);
          }
        },
        {
          type: 'separator'
        },*/
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          role: 'undo'
        },
        {
          label: 'Redo',
          accelerator: 'Shift+CmdOrCtrl+Z',
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          role: 'cut'
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy'
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          role: 'paste'
        },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          role: 'selectall'
        },
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: function(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.reload();
          }
        },
        {
          label: 'Toggle Full Screen',
          accelerator: (function() {
            if (process.platform == 'darwin')
              return 'Ctrl+Command+F';
            else
              return 'F11';
          })(),
          click: function(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
          }
        },
      ]
    },
    {
      label: 'Window',
      role: 'window',
      submenu: [
        {
          label: platformActions.copyUrlToClipboard.label,
          click: function (item, focusedWindow) {
            var webContents = focusedWindow.webContents;
            platformActions.copyUrlToClipboard.action(webContents.getURL());            
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        },
      ]
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: function() {
            shell.openExternal('http://wwww.smartcanvas.com/');
          }
        },
        {
          label: 'Documentation',
          click: function() {
            shell.openExternal('http://wwww.smartcanvas.com/');
          }
        }
      ]
    },
  ];

  if (process.platform == 'darwin') {
    template.unshift({
      label: manifest.productName,
      submenu: [
        {
          label: 'About ' + manifest.productName,
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: 'Services',
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          label: 'Hide ' + manifest.productName,
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Alt+H',
          role: 'hideothers'
        },
        {
          label: 'Show All',
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: function() { app.quit(); }
        },
      ]
    });

    template[3].submenu.push(
      {
        type: 'separator'
      },
      {
        label: 'Bring All to Front',
        role: 'front'
      }
    );
  }

  if (env.name !== 'PRD') {
    template.push(devHelper.getDevMenu());
  }

  var menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

export default {
  setToolbarMenu: setToolbarMenu,
};

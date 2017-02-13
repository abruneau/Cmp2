'use strict';
var app, electron, dialog;

electron = require('electron');
var GhReleases = require('electron-gh-releases');

app = electron.app;

dialog = electron.dialog;

var options = {
  repo: 'abruneau/Cmp2',
  currentVersion: app.getVersion()
};

var updater = new GhReleases(options);

var mainWindow = null;

function createWindow() {
  // Create the browser window.
  mainWindow = new electron.BrowserWindow({
    width: 800,
    height: 600
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/app/index.html`);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

}

app.on('ready', function() {
  createWindow();
  // Check for updates
  // `status` returns true if there is a new update available
  updater.check(function(err, status) {
    if (err) {
      dialog.showErrorBox('Error occured', err);
      return;
    } else if (!status) {
      dialog.showMessageBox(null, {
        title: 'Your app is latest',
        message: 'No update available.\nThis app is latest',
        buttons: ['OK']
      });
      return;
    }

    var response = dialog.showMessageBox(null, {
      title: 'Update available',
      message: 'An update is available.\nWould you like to update ?',
      buttons: ['OK', 'Cancel']
    });
    if (response !== 0) { // Canceled
      return;
    }
    updater.download();
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// When an update has been downloaded
updater.on('update-downloaded', function() {
  dialog.showMessageBox(null, {
    type: 'info',
    title: 'Updating',
    message: 'A new version has been downloaded.\nThe app will restart.',
    buttons: ['OK']
  });
  // Restart the app and install the update
  updater.install();
});

// Access electrons autoUpdater
updater.autoUpdater;

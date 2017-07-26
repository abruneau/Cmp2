import { app, BrowserWindow, screen, Menu } from 'electron';
import * as path from 'path';
import * as runJxa from 'run-jxa';
import * as ipcPromise from 'ipc-promise';
import * as whereAmI from '@rainder/where-am-i';
import * as jxa from './electron/jxa';
import setApplicationMenu from './electron/menu';


let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

if (serve) {
  require('electron-reload')(__dirname, {
  });
}

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height
  });

  // and load the index.html of the app.
  win.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  if (serve) {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
    createWindow()
    if (!serve) {
      setApplicationMenu();
    }
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}

ipcPromise.on('jxa-evernote-createNotebook', (params) => {
  return runJxa(jxa.createNotebook, [params.title])
})

ipcPromise.on('jxa-evernote-getNoteList', (params) => {
  return runJxa(jxa.getNoteList, [params.notebook])
})

ipcPromise.on('jxa-evernote-getHtml', (params) => {
  return runJxa(jxa.getHtml, [params.note])
})

ipcPromise.on('jxa-evernote-updateHtml', (params) => {
  return runJxa(jxa.updateHtml, [params.note, params.newHtml])
})

ipcPromise.on('jxa-evernote-createNoteWithHtml', (params) => {
  return runJxa(jxa.createNoteWithHtml, [params.title, params.notebook, params.html])
})

ipcPromise.on('jxa-evernote-deleteNote', (params) => {
  return runJxa(jxa.deleteNote, [params.note])
})

ipcPromise.on('location', () => {
  return whereAmI.getLocation();
})

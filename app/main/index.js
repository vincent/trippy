import os from 'os';
import { app, ipcMain, dialog } from 'electron';
import pify from 'pify';
import createMainWindow from './createMainWindow';
import createMenuBarWindow from './createMenuBarWindow';
import fileCacheHandler from './fileCacheHandler';

import configureStore from '../shared/store/configureStore';
import tray from './tray';
import tasks from './tasks';

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
}

fileCacheHandler();

async function start() {
  // set-up menu bar
  const appIcon = tray();

  const store = configureStore(global.state, 'main');

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    createMainWindow();
  });

  appIcon.on('click', (event, trayBounds) => {
    createMenuBarWindow({ trayBounds });
  });

  // init
  createMainWindow();

  tasks(store);
}

app.on('ready', () => {
  start()
  .catch((err) => {
    dialog.showErrorBox('There\'s been an error', err.message);
  });
});

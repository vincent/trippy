import os from 'os';
import { app, ipcMain, dialog } from 'electron';
import pify from 'pify';
import jsonStorage from 'electron-json-storage';
import createMainWindow from './createMainWindow';
import createMenuBarWindow from './createMenuBarWindow';
import configureStore from '../shared/store/configureStore';
import tray from './tray';
import tasks from './tasks';

const storage = pify(jsonStorage);

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
}


async function start() {
  // set-up menu bar
  const appIcon = tray();

  const store = configureStore(global.state, 'main');

  store.subscribe(async () => {
    // persist store changes
    // TODO: should this be blocking / wait? _.throttle?
    await storage.set('state', store.getState());
  });

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

export const APP_STARTUP = 'APP_STARTUP';
export const CHECKING_FOR_UPDATE = 'CHECKING_FOR_UPDATE';
export const UPDATE_AVAILABLE = 'UPDATE_AVAILABLE';
export const UPDATE_DOWNLOADED = 'UPDATE_DOWNLOADED';
export const UPDATE_ERROR = 'UPDATE_ERROR';
export const UPDATE_NOT_AVAILABLE = 'UPDATE_NOT_AVAILABLE';
export const SHOW_MENUBAR_WINDOW = 'SHOW_MENUBAR_WINDOW';
export const RESTORE_ACCOUNTS = 'RESTORE_ACCOUNTS';
export const UPDATE_OWNED_GAMES = 'UPDATE_OWNED_GAMES';
export const LAUNCH_GAME = 'LAUNCH_GAME';

import { api as steamApi } from './steam';

export function appStartup() {
  return {
    type: APP_STARTUP,
  };
}

export function checkingForUpdate() {
  return {
    type: CHECKING_FOR_UPDATE,
  };
}

export function updateAvailable() {
  return {
    type: UPDATE_AVAILABLE,
  };
}

export function updateDownloaded(releaseNotes, releaseName, releaseDate, updateURL) {
  return {
    type: UPDATE_DOWNLOADED,
    payload: {
      releaseNotes,
      releaseName,
      releaseDate,
      updateURL,
    },
  };
}

export function updateError(error) {
  return {
    type: UPDATE_ERROR,
    error: true,
    payload: error.message,
  }
}

export function updateNotAvailable() {
  return {
    type: UPDATE_NOT_AVAILABLE,
  }
}

export function showMenubarWindow(path = '/') {
  return {
    type: SHOW_MENUBAR_WINDOW,
    payload: path,
  }
}

export const restoreAccounts = function () {
  return function (dispatch) {
    dispatch(steamApi.RESTORE_ACCOUNT());
  }
}

export const launchGame = function (game) {
  return function (dispatch) {
    dispatch(steamApi.LAUNCH_GAME(game));
  }
}

export const updateGames = function () {
  return function (dispatch) {
    dispatch(steamApi.UPDATE_OWNED_GAMES());
  }
}

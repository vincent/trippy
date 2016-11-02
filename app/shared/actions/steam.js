import steamAuth from '../../main/api/requestSteamToken';
import listSteamGames from '../../main/api/listSteamGames';
import { createAliasedAction } from 'electron-redux';
import storage from 'electron-json-storage';
import {shell} from 'electron';


export const CANCEL_STEAM_ACCOUNT = 'CANCEL_STEAM_ACCOUNT';

export const cancelSteamAccount = function () {
  return {
    type: CANCEL_STEAM_ACCOUNT,
    payload: new Promise(function(resolve, reject) {
      storage.remove('steam_id');
      setImmediate(() => resolve({ steam_id: undefined }));
    })
  };
}


export const RESTORE_STEAM_ACCOUNT = 'RESTORE_STEAM_ACCOUNT';

export const restoreSteamAccount = createAliasedAction(
  RESTORE_STEAM_ACCOUNT,
  () => ({
    type: AUTHENTICATE_STEAM,
    payload: new Promise(function(resolve, reject) {
      storage.get('steam_id', function(error, data) {
        if (error) return reject();
        resolve({
          steam_id: data
        })
      });
    })
  })
)

export const AUTHENTICATE_STEAM = 'AUTHENTICATE_STEAM';

export const authenticateSteam = createAliasedAction(
  AUTHENTICATE_STEAM,
  () => ({
    type: AUTHENTICATE_STEAM,
    payload: steamAuth()
              .then(function (account) {
                storage.set('steam_id', account.steam_id);
              })
              .then(getSteamGames)
  })
);

export const UPDATE_STEAM_GAMES = 'UPDATE_STEAM_GAMES';

export const getSteamGames = createAliasedAction(
  UPDATE_STEAM_GAMES,
  function () {
    return function (dispatch, getState) {
      dispatch({
        type: UPDATE_STEAM_GAMES,
        payload: listSteamGames(getState().steam.steam_id)
      })
    }
  }
);

export const LAUNCH_STEAM_GAME = 'LAUNCH_STEAM_GAME';

export const launchSteamGame = createAliasedAction(
  LAUNCH_STEAM_GAME,
  (game) => ({
    type: AUTHENTICATE_STEAM,
    payload: new Promise(function(resolve, reject) {
      resolve(shell.openExternal(`steam://run/${game.appid}`));
    })
  })
)



export const api = {
  RESTORE_ACCOUNT: restoreSteamAccount,
  CANCEL_ACCOUNT: cancelSteamAccount,
  AUTHENTICATE: authenticateSteam,
  UPDATE_OWNED_GAMES: getSteamGames,
  LAUNCH_GAME: launchSteamGame,
};

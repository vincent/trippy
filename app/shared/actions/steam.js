import steamAuth from '../../main/api/requestSteamToken';
import steamListOwnedGames from '../../main/api/steamListOwnedGames';
import steamGameAchievements from '../../main/api/steamGameAchievements';
import { createAliasedAction } from 'electron-redux';
import jsonStorage from 'electron-json-storage';
import {shell} from 'electron';

export const CANCEL_STEAM_ACCOUNT = 'steam/CANCEL_ACCOUNT';
export const RESTORE_STEAM_ACCOUNT = 'steam/RESTORE_ACCOUNT';
export const AUTHENTICATE_STEAM = 'steam/AUTHENTICATE';
export const UPDATE_STEAM_OWNED_GAMES = 'steam/UPDATE_OWNED_GAMES';
export const LAUNCH_STEAM_GAME = 'steam/LAUNCH_GAME';
export const UPDATE_STEAM_GAME_DETAILS = 'steam/UPDATE_GAME_DETAILS';


require('./games').addProviderHandler('steam', function steamProviderHandler (source) {
  switch (source.type) {
    case UPDATE_STEAM_GAME_DETAILS: return updateSteamGameDetails(source.payload);
    case RESTORE_STEAM_ACCOUNT: return restoreSteamAccount();
    case CANCEL_STEAM_ACCOUNT: return cancelSteamAccount();
    case UPDATE_STEAM_OWNED_GAMES: return getSteamGames();
    case AUTHENTICATE_STEAM: return authenticateSteam();
    case LAUNCH_STEAM_GAME: return launchSteamGame(source.payload);
  }
});


export const cancelSteamAccount = createAliasedAction(
  `${CANCEL_STEAM_ACCOUNT}_MAIN`,
  () => ({
    type: CANCEL_STEAM_ACCOUNT,
    payload:  new Promise(function(resolve, reject) {
                jsonStorage.remove('steam_id');
                setImmediate(() => resolve({ steam_id: undefined }));
              })
  })
)

export const restoreSteamAccount = createAliasedAction(
  `${RESTORE_STEAM_ACCOUNT}_MAIN`,
  () => ({
    type: AUTHENTICATE_STEAM,
    payload:  new Promise(function(resolve, reject) {
                    jsonStorage.get('steam_id', function(error, data) {
                      if (error) return reject();
                      resolve({
                        steam_id: data
                      })
                    });
                  })
  })
)

export const authenticateSteam = createAliasedAction(
  `${AUTHENTICATE_STEAM}_MAIN`,
  () => ({
    type: AUTHENTICATE_STEAM,
    payload: steamAuth()
              .then(function (account) {
                jsonStorage.set('steam_id', account.steam_id);
              })
              .then(getSteamGames)
  })
);

export const getSteamGames = createAliasedAction(
  `${UPDATE_STEAM_OWNED_GAMES}_MAIN`,
  () => function (dispatch, getState) {
    dispatch({
      type: UPDATE_STEAM_OWNED_GAMES,
      payload: steamListOwnedGames(getState().steam.steam_id)
    })
  }
);

export const launchSteamGame = createAliasedAction(
  `${LAUNCH_STEAM_GAME}_MAIN`,
  (game) => ({
    type: LAUNCH_STEAM_GAME,
    payload: new Promise(function(resolve, reject) {
      resolve(shell.openExternal(`steam://run/${game.appid}`));
    })
  })
)

export const updateSteamGameDetails = createAliasedAction(
  `${UPDATE_STEAM_GAME_DETAILS}_MAIN`,
  (game) => function (dispatch, getState) {
    dispatch({
      type: UPDATE_STEAM_GAME_DETAILS,
      payload: steamGameAchievements(getState().steam.steam_id, game.appid)
    })
  }
)


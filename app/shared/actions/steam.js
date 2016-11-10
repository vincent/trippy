import * as API from '../../main/api/steam';

import { createAliasedAction } from 'electron-redux';
import settings from '../store/settings';

import {
  UPDATE_GAME_ACHIEVEMENTS,
  UPDATE_GAME_DETAILS,
  UPDATE_OWNED_GAMES,
  UPDATE_GAME_NEWS,
  RESTORE_ACCOUNT,
  LAUNCH_GAME
} from '../actions/games';

export const UPDATE_STEAM_API_KEY = 'steam/UPDATE_STEAM_API_KEY';
export const CANCEL_STEAM_ACCOUNT = 'steam/CANCEL_ACCOUNT';
export const RESTORE_STEAM_ACCOUNT = 'steam/RESTORE_ACCOUNT';
export const AUTHENTICATE_STEAM = 'steam/AUTHENTICATE';
export const UPDATE_STEAM_OWNED_GAMES = 'steam/UPDATE_OWNED_GAMES';
export const LAUNCH_STEAM_GAME = 'steam/LAUNCH_GAME';
export const UPDATE_STEAM_GAME_DETAILS = 'steam/UPDATE_GAME_DETAILS';
export const UPDATE_STEAM_GAME_ACHIEVEMENTS = 'steam/UPDATE_GAME_ACHIEVEMENTS';
export const UPDATE_STEAM_GAME_NEWS = 'steam/UPDATE_GAME_NEWS';


require('./games').addProviderHandler('steam', function steamProviderHandler (source) {
  switch (source.type) {
    case UPDATE_STEAM_GAME_ACHIEVEMENTS: return updateSteamGameAchievements(source.payload);
    case UPDATE_STEAM_GAME_DETAILS: return updateSteamGameDetails(source.payload);
    case UPDATE_STEAM_GAME_NEWS: return updateSteamGameNews(source.payload);
    case LAUNCH_STEAM_GAME: return launchSteamGame(source.payload);
    case RESTORE_STEAM_ACCOUNT: return restoreSteamAccount();
    case CANCEL_STEAM_ACCOUNT: return cancelSteamAccount();
    case UPDATE_STEAM_OWNED_GAMES: return getSteamGames();
    case AUTHENTICATE_STEAM: return authenticateSteam();
  }
});


export const updateSteamApiKey = function (apiKey) {
  settings.set('steam.api_key', apiKey);
  return {
    type: UPDATE_STEAM_API_KEY,
    payload: { api_key: apiKey }
  }
}

export const cancelSteamAccount = createAliasedAction(
  `${CANCEL_STEAM_ACCOUNT}_MAIN`,
  () => ({
    type: CANCEL_STEAM_ACCOUNT,
    payload: settings.delete('steam.steam_id')
                     .then(() => ({ steam_id: undefined }))
  })
)

export const restoreSteamAccount = createAliasedAction(
  `${RESTORE_STEAM_ACCOUNT}_MAIN`,
  () => ({
    type: RESTORE_STEAM_ACCOUNT,
    payload: settings.get('steam')
  })
)

export const authenticateSteam = createAliasedAction(
  `${AUTHENTICATE_STEAM}_MAIN`,
  () => ({
    type: AUTHENTICATE_STEAM,
    payload: API.requestToken()
              .then(function (account) {
                settings.set('steam.steam_id', account.steam_id);
                return { steam_id: account.steam_id };
              })
  })
);

export const getSteamGames = createAliasedAction(
  `${UPDATE_STEAM_OWNED_GAMES}_MAIN`,
  () => function (dispatch, getState) {
    dispatch({
      type: UPDATE_OWNED_GAMES,
      payload: API.listOwnedGames(getState().steam.api_key, getState().steam.steam_id)
    })
  }
);

export const launchSteamGame = createAliasedAction(
  `${LAUNCH_STEAM_GAME}_MAIN`,
  (game) => ({
    type: LAUNCH_STEAM_GAME,
    payload: API.launchGame(game)
  })
)

export const updateSteamGameAchievements = createAliasedAction(
  `${UPDATE_STEAM_GAME_ACHIEVEMENTS}_MAIN`,
  (game) => function (dispatch, getState) {
    dispatch({
      type: UPDATE_GAME_ACHIEVEMENTS,
      payload: API.gameAchievements(getState().steam.api_key, getState().steam.steam_id, game.appid)
    })
  }
)

export const updateSteamGameDetails = createAliasedAction(
  `${UPDATE_STEAM_GAME_DETAILS}_MAIN`,
  (game) => function (dispatch, getState) {
    dispatch({
      type: UPDATE_GAME_DETAILS,
      payload: API.gameDetails(game.appid)
    })
  }
)

export const updateSteamGameNews = createAliasedAction(
  `${UPDATE_STEAM_GAME_NEWS}_MAIN`,
  (game) => function (dispatch, getState) {
    dispatch({
      type: UPDATE_GAME_NEWS,
      payload: API.gameNews(game.appid)
    })
  }
)



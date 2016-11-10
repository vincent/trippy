import settings from '../store/settings';

export const GAME_LIST_ZOOM_CHANGED = 'GAME_LIST_ZOOM_CHANGED';
export const GAMES_FILTER_CHANGED = 'GAMES_FILTER_CHANGED';
export const UPDATE_GAME_ACHIEVEMENTS = 'UPDATE_GAME_ACHIEVEMENTS';
export const UPDATE_GAME_DETAILS = 'UPDATE_GAME_DETAILS';
export const UPDATE_OWNED_GAMES = 'UPDATE_OWNED_GAMES';
export const UPDATE_GAME_NEWS = 'UPDATE_GAME_NEWS';
export const RESTORE_ACCOUNT = 'RESTORE_ACCOUNT';
export const LAUNCH_GAME = 'LAUNCH_GAME';

export const providers = {};

export const addProviderHandler = function (pName, handler) {
  providers[pName] = handler;
}

const forwardActionToProvider = function (pName, action) {
  if (! providers[pName]) {
    throw new Error(`${pName} is not a known provider`);
  }
  return providers[pName]({
    ...action,
    type: `${pName}/${action.type}`
  });
}


export const restoreAccounts = function () {
  return function (dispatch) {
    Object.keys(providers).forEach(function (p) {
      dispatch(forwardActionToProvider(p, {
        type: RESTORE_ACCOUNT
      }));
    })
  }
}

export const launchGame = function (game) {
  return forwardActionToProvider(game.provider, {
    type: LAUNCH_GAME,
    payload: game
  });
}

export const updateOwnedGames = function () {
  return function (dispatch) {
    Object.keys(providers).forEach(function (p) {
      dispatch(forwardActionToProvider(p, {
        type: UPDATE_OWNED_GAMES
      }));
    })
  }
}

export function updateGamesFilter(filter = '') {
  return {
    type: GAMES_FILTER_CHANGED,
    payload: filter
  };
}

export function setGameListZoom(zoom = 33.3333) {
  settings.set('games.gameListZoom', zoom);
  return {
    type: GAME_LIST_ZOOM_CHANGED,
    payload: zoom
  };
}

export const updateGameAchievements = function (game) {
  return forwardActionToProvider(game.provider, {
    type: UPDATE_GAME_ACHIEVEMENTS,
    payload: game
  });
}

export const updateGameDetails = function (game) {
  return forwardActionToProvider(game.provider, {
    type: UPDATE_GAME_DETAILS,
    payload: game
  });
}

export const updateGameNews = function (game) {
  return forwardActionToProvider(game.provider, {
    type: UPDATE_GAME_NEWS,
    payload: game
  });
}


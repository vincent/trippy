export const GAMES_FILTER_CHANGED = 'GAMES_FILTER_CHANGED';

const providers = [
  require('./steam').api
];

export const restoreAccounts = function () {
  return function (dispatch) {
    providers.forEach(function (p) {
      dispatch(p.RESTORE_ACCOUNT())
    })
  }
}

export const launchGame = function (game) {
  return function (dispatch) {
    providers.forEach(function (p) {
      dispatch(p.LAUNCH_GAME(game))
    })
  }
}

export const updateOwnedGames = function () {
  return function (dispatch) {
    providers.forEach(function (p) {
      dispatch(p.UPDATE_OWNED_GAMES())
    })
  }
}

export function updateGamesFilter(filter = '') {
  return {
    type: GAMES_FILTER_CHANGED,
    payload: filter
  };
}

export const updateGameDetails = function (game) {
  return function (dispatch) {
    providers.forEach(function (p) {
      dispatch(p.UPDATE_GAME_DETAILS(game))
    })
  }
}

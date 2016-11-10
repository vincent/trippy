/* eslint-disable no-param-reassign */
import {
  GAME_LIST_ZOOM_CHANGED,
  GAMES_FILTER_CHANGED,
  UPDATE_GAME_ACHIEVEMENTS,
  UPDATE_GAME_DETAILS,
  UPDATE_OWNED_GAMES,
  UPDATE_GAME_NEWS,
  RESTORE_ACCOUNT,
  LAUNCH_GAME
} from '../actions/games';

import {
  APP_STARTUP,
 } from '../actions/system'

const initialState = {
  gameListZoom: 33.33333,
  gamesFilter: '',
  ownedGames: []
};

export default function games(state = initialState, action) {
  const { type, payload, error, meta } = action;

  switch (type) {

    case GAMES_FILTER_CHANGED:
      return {
        ...state,
        gamesFilter: payload
      }

    case GAME_LIST_ZOOM_CHANGED:
      return {
        ...state,
        gameListZoom: payload
      }

    case UPDATE_OWNED_GAMES: {
      if (error) return state;
      const ownedGames = payload.response.games.map(game => {
        const found = state.ownedGames.reduce(
          (previous, current) => (game.id === current.id ? current : previous),
          {}
        );
        return {
          // update if already existing
          ...found,
          ...game,
        };
      });
      return {
        ...state,
        ownedGames
      };
    }

    case UPDATE_GAME_ACHIEVEMENTS: {
      if (error) return state;
      const ownedGames = state.ownedGames.map(function (game) {
        if (game.id === payload.gameId) {
          return {
            ...game,
            achievements: payload.achievements
          };
        }
        return game;
      })
      return {
        ...state,
        ownedGames
      };
    }

    case UPDATE_GAME_NEWS: {
      if (error) return state;
      const ownedGames = state.ownedGames.map(function (game) {
        if (game.id === payload.gameId) {
          return {
            ...game,
            details: payload.details
          };
        }
        return game;
      })
      return {
        ...state,
        ownedGames
      };
    }

    case UPDATE_GAME_NEWS: {
      if (error) return state;
      const ownedGames = state.ownedGames.map(function (game) {
        if (game.id === payload.gameId) {
          return {
            ...game,
            news: payload.news
          };
        }
        return game;
      })
      return {
        ...state,
        ownedGames
      };
    }

    default:
      return state;
  }
}

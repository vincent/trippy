/* eslint-disable no-param-reassign */
import {
  UPDATE_STEAM_API_KEY,
  CANCEL_STEAM_ACCOUNT,
  RESTORE_STEAM_ACCOUNT,
  AUTHENTICATE_STEAM,
  UPDATE_STEAM_OWNED_GAMES,
  UPDATE_STEAM_GAME_DETAILS,
  LAUNCH_STEAM_GAME
} from '../actions/steam';

const initialState = {
  steam_id: 0,
  games: [],
};

export default function steam(state = initialState, action) {
  const { type, payload, error, meta } = action;

  if (state.steam_id && !state.steam_id.length) {
    state.steam_id = undefined;
  }

  switch (type) {
    case UPDATE_STEAM_API_KEY:
      return {
        ...state,
        api_key: payload.api_key
      };

    case LAUNCH_STEAM_GAME:
      return {
        ...state,
      };

    case CANCEL_STEAM_ACCOUNT:
      return {
        ...state,
        games: [],
        error: false,
        steam_id: undefined
      };

    case RESTORE_STEAM_ACCOUNT:
      if (error) {
        return {
          ...state,
          error: true
        };
      }
      return {
        ...state,
        error: false,
        api_key: payload.api_key,
        steam_id: payload.steam_id,
      };

    case AUTHENTICATE_STEAM:
      if (error) {
        return {
          ...state,
          error: true
        };
      }
      return {
        ...state,
        error: false,
        steam_id: payload.steam_id,
      };

    case UPDATE_STEAM_OWNED_GAMES: {
      if (error) return state;
      const games = payload.response.games.map(game => {
        const found = state.games.reduce(
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
        games
      };
    }

    case UPDATE_STEAM_GAME_DETAILS:
      const games = state.games.map(function (game) {
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
        games
      };

    default:
      return state;
  }
}

/* eslint-disable no-param-reassign */
import {
  CANCEL_STEAM_ACCOUNT,
  RESTORE_STEAM_ACCOUNT,
  AUTHENTICATE_STEAM,
  UPDATE_STEAM_GAMES,
  LAUNCH_STEAM_GAME
} from '../actions/steam';

import {
  UPDATE_GAMES,
  LAUNCH_GAME
} from '../actions/system';

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
    case LAUNCH_GAME:
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

    case AUTHENTICATE_STEAM:
    case RESTORE_STEAM_ACCOUNT:
      if (error) {
        return {
          ...state,
          error: true,
          steam_id: undefined
        };
      }
      return {
        ...state,
        error: false,
        steam_id: payload.steam_id,
      };

    case UPDATE_GAMES:
    case UPDATE_STEAM_GAMES: {
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
        games,
      };
    }

    default:
      return state;
  }
}

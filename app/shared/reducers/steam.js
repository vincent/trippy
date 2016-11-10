/* eslint-disable no-param-reassign */
import {
  UPDATE_STEAM_API_KEY,
  CANCEL_STEAM_ACCOUNT,
  RESTORE_STEAM_ACCOUNT,
  AUTHENTICATE_STEAM
} from '../actions/steam';

const initialState = {
  steam_id: 0,
  games: [],
};

export default function steam(state = initialState, action) {
  const { type, payload, error, meta } = action;

  switch (type) {
    case UPDATE_STEAM_API_KEY:
      return {
        ...state,
        api_key: payload.api_key
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

    default:
      return state;
  }
}

/* eslint-disable no-param-reassign */
import { GAMES_FILTER_CHANGED } from '../actions/games';

const initialState = {
  gamesFilter: '',
  ownedGames: []
};

export default function games(state = initialState, action) {
  switch (action.type) {

    case GAMES_FILTER_CHANGED:
      return {
        ...state,
        gamesFilter: action.payload
      }

    default:
      return state;
  }
}

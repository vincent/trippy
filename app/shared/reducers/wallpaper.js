/* eslint-disable no-param-reassign */
import { INIT_WALLPAPER, UPDATE_WALLPAPER } from '../actions/wallpaper';

const initialState = {
  name: 'solid',
  settings: {
    color: 'black'
  }
};

export default function games(state = initialState, action) {
  switch (action.type) {

    case INIT_WALLPAPER:
    case UPDATE_WALLPAPER:
      return {
        ...state,
        name: action.payload.name,
        settings: action.payload.settings,
      }

    default:
      return state;
  }
}

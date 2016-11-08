export const INIT_WALLPAPER = 'INIT_WALLPAPER';
export const UPDATE_WALLPAPER = 'UPDATE_WALLPAPER';

import userSettings from '../store/settings';

export function initWallpaper(wallpaper) {
  return {
    type: INIT_WALLPAPER,
    payload: {
      name: 'solid',
      settings: { color:'#fff' },
    }
  };
}

export function updateWallpaper(wallpaper) {
  return {
    type: UPDATE_WALLPAPER,
    payload: wallpaper
  };
}

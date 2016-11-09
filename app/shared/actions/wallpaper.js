export const INIT_WALLPAPER = 'INIT_WALLPAPER';
export const UPDATE_WALLPAPER = 'UPDATE_WALLPAPER';

import settings from '../store/settings';

export function initWallpaper(wallpaper) {
  return {
    type: INIT_WALLPAPER,
    payload: settings.get('wallpaper'),
    meta: {
      scope: 'local',
    },
  };
}

export function updateWallpaper(wallpaper) {
  settings.set('wallpaper', wallpaper);
  return {
    type: UPDATE_WALLPAPER,
    payload: wallpaper,
    meta: {
      scope: 'local',
    },
  };
}

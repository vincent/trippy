import * as Bing from '../../main/api/bing';
import * as Nasa from '../../main/api/nasa';

import { createAliasedAction } from 'electron-redux';

export const INIT_WALLPAPER = 'INIT_WALLPAPER';
export const UPDATE_WALLPAPER = 'UPDATE_WALLPAPER';
export const FETCH_IMAGE_FROM_BING = 'FETCH_IMAGE_FROM_BING';
export const FETCH_IMAGE_FROM_NASA = 'FETCH_IMAGE_FROM_NASA';

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

export function setTemporaryWallpaper(wallpaper) {
  return {
    type: UPDATE_WALLPAPER,
    payload: wallpaper,
    meta: {
      scope: 'local',
    },
  };
}

export const fetchBingImage = createAliasedAction(
  `${FETCH_IMAGE_FROM_BING}_MAIN`,
  () => ({
    type: UPDATE_WALLPAPER,
    payload: Bing.dailyImage().then((data) => {
      return {
        name: 'bing',
        settings: data
      }
    })
  })
)

export const fetchApodImage = createAliasedAction(
  `${FETCH_IMAGE_FROM_NASA}_MAIN`,
  () => ({
    type: UPDATE_WALLPAPER,
    payload: Nasa.dailyImage().then((data) => {
      return {
        name: 'apod',
        settings: data
      }
    })
  })
)
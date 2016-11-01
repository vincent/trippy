export const GAMES_FILTER_CHANGED = 'GAMES_FILTER_CHANGED';

export function updateGamesFilter(filter = '') {
  return {
    type: GAMES_FILTER_CHANGED,
    payload: filter
  };
}

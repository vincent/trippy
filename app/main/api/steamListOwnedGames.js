import { fetchCached, status, json, transform } from '../../shared/helpers/fetch';
import fetch from 'node-fetch';

const normalizeGameData = transform(function(payload) {
  payload.response.games.forEach(function (game) {
    game.id = game.appid;
    game.provider = 'steam';
    game.cover_small = `http://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/header.jpg`;
  })
  return payload;
})

export default function steamListOwnedGames(apiKey, steamId) {
  return fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&include_appinfo=1&format=json`, {
    method: 'GET'
  })
  .then(status)
  .then(json)
  .then(normalizeGameData);
}
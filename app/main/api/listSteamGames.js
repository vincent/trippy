import fetch from 'node-fetch';
import { status, json } from '../../shared/helpers/fetch';

const apiKey = process.env.STEAM_API_KEY;

export default function listSteamGames(steamId) {
  return fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&include_appinfo=1&format=json`, {
    method: 'GET'
  })
  .then(status)
  .then(json);
}
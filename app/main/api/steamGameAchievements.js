import { fetchCached, status, json } from '../../shared/helpers/fetch';
import fetch from 'node-fetch';
import config from '../../config';

const apiKey = process.env.STEAM_API_KEY;

export function steamGameAllAchievements(appId) {
  return fetch(`http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v0002/?key=${apiKey}&appId=${appId}&format=json`, {
    method: 'GET'
  })
  .then(status)
  .then(json)
}

export function steamGameUserAchievements(steamId, appId) {
  return fetch(`http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?key=${apiKey}&appId=${appId}&steamid=${steamId}&format=json`, {
    method: 'GET'
  })
  .then(status)
  .then(json);
}

export default function steamGameAchievements(steamId, appId) {
  let owned;
  let payload = {
    achievements: [],
    gameId: appId
  }
  return steamGameAllAchievements(appId)
    .then(function (sgaResponse) {
      payload.achievements = sgaResponse.game.availableGameStats.achievements;
      return steamGameUserAchievements(steamId, appId)
    })
    .then(function (sguResponse) {
      return owned = sguResponse.playerstats.achievements;
    })
    .then(function () {
      payload.achievements.forEach(function (ach) {
        const ownAchievment = owned.find((o) => (o.apiname === ach.name));
        ach.owned = ownAchievment ? ownAchievment.achieved : false;
      })
      return payload;
    });
}
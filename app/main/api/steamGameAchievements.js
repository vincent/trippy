import { fetchCached, status, json } from '../../shared/helpers/fetch';
import fetch from 'node-fetch';

export function steamGameAllAchievements(apiKey, appId) {
  return fetchCached(`http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v0002/?key=${apiKey}&appId=${appId}&format=json`, {
    method: 'GET'
  })
  .then(status)
  .then(json)
}

export function steamGameUserAchievements(apiKey, steamId, appId) {
  return fetchCached(`http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?key=${apiKey}&appId=${appId}&steamid=${steamId}&format=json`, {
    method: 'GET'
  })
  .then(status)
  .then(json);
}

export default function steamGameAchievements(apiKey, steamId, appId) {
  let owned;
  let payload = {
    achievements: [],
    gameId: appId
  }
  return steamGameAllAchievements(apiKey, appId)
    .then(function (sgaResponse) {
      payload.achievements = sgaResponse.game.availableGameStats.achievements;
      return steamGameUserAchievements(apiKey, steamId, appId)
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
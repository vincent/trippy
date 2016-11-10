import { fetchCached, status, json, tap, transform } from '../../../shared/helpers/fetch';
import fetch from 'node-fetch';

const normalizeGameData = transform(function(data) {
  return data
})

export default function gameDetails(appId) {
  return fetchCached(`http://store.steampowered.com/api/appdetails?appids=${appId}`, {
    method: 'GET'
  })
  .then(status)
  .then(json)
  .then(function (data) {
    return {
      details: data[appId].data,
      gameId: appId
    };
  })
  .then(normalizeGameData);
}
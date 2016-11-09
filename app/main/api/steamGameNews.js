import { fetchCached, status, json, tap, transform } from '../../shared/helpers/fetch';
import fetch from 'node-fetch';

const normalizeGameData = transform(function(data) {
  return {
    gameId: data.appnews.appid,
    news: data.appnews.newsitems
  }
})

export default function steamGameNews(appId) {
  console.log('steamGameNews', appId);
  return fetchCached(`http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appId=${appId}&count=5&maxlength=300&format=json`, {
    method: 'GET'
  })
  .then(status)
  .then(json)
  .then(normalizeGameData);
}
import { fetchCached, status, json, tap, transform } from '../../../shared/helpers/fetch';
import fetch from 'node-fetch';

const normalizeGameData = transform(function(data) {
  data.images.forEach((img) => {
    img.urlbase = 'http://www.bing.com' + img.urlbase;
    img.url = 'http://www.bing.com' + img.url;
  })
  return data;
})

export function dailyImage() {
  const d = new Date();
  const today = d.toUTCString().replace(/:.*$/g, '');
  return fetchCached(`http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US&today=${today}`)
  .then(status)
  .then(json)
  .then(normalizeGameData);
}


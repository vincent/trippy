import { fetchCached, status, json, tap, transform } from '../../../shared/helpers/fetch';
import fetch from 'node-fetch';

const NASA_API_KEY = 'DEMO_KEY';

export function dailyImage() {
  const d = new Date();
  const year  = d.getFullYear()
  const day   = d.getDate()
  const month = d.getMonth()
  return fetchCached(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${year}-${month}-${day}`)
  .then(status)
  .then(json);
}


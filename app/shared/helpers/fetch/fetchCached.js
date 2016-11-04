import jsonStorage from 'electron-json-storage';
import fetchCachedModule from 'fetch-cached';
import nodeFetch from 'node-fetch';
import pify from 'pify';

const storage = pify(jsonStorage);

const fetchCached = fetchCachedModule({
  fetch: nodeFetch,
  cache: {
    get: (k) => storage.get(k),
    set: (k, v) => storage.set(k, v)
  }
})

export default fetchCached;

import settings from '../store/settings';
import crypto from 'crypto';
import fs from 'fs';

var md5sum = crypto.createHash('md5');

export default function cachedUrl(url) {
  return 'app://cache/' + encodeURIComponent(url);
}
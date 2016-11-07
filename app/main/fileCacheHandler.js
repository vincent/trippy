import settings from '../shared/store/settings';
import {app, protocol} from 'electron';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import http from 'http';
import mkdirp from 'mkdirp';
const md5sum = crypto.createHash('md5');

const fileCacheDir = path.dirname(settings.getSettingsFilePath()) + '/FileCache/';

export default function fileCacheHandler() {

  protocol.registerStandardSchemes(['app']);

  app.on('ready', () => {

    protocol.registerFileProtocol('app', (request, callback) => {
      const remotePath = decodeURIComponent(request.url.replace('app://cache/', ''));
      const localPath  = fileCacheDir + remotePath.replace(/^.*:\/\//, '');
      openLocalFileForCache(localPath, remotePath, (error, url) => {
        callback({ path:url });
      });
    }, (error) => {
      if (error) console.error('Failed to register protocol')
    })

  })
}

function openLocalFileForCache (localPath, remotePath, callback) {
  fs.open(localPath, 'wx', (err, fd) => {
    if (err && err.code === 'EEXIST') {
      return callback(null, localPath);
    }
    mkdirp(path.dirname(localPath), function (error) {
      if (error) return callback(error);
      const file = fs.createWriteStream(localPath);
      const request = http.get(remotePath, function(response) {
        response.pipe(file);
        file.on('finish', function() {
          file.close(function () {
            return callback(null, localPath);
          });
        });
      });
    });
  });
}

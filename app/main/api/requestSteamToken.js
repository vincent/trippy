import { status, json } from '../../shared/helpers/fetch';
import steamAuth from 'electron-steam-openid';

export default function requestSteamToken() {
  var config = {
    redirectUri: 'http://localhost'
  };
  const windowParams = {
    alwaysOnTop: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false
    }
  }
  return steamAuth(config, windowParams).authenticate();
}

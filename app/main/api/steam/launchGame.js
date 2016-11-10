import {shell} from 'electron';

export default function launchGame() {
  return new Promise.resolve(shell.openExternal(`steam://run/${game.appid}`));
}
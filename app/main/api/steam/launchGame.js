import {shell} from 'electron';

export default function launchGame(game) {
  return Promise.resolve(shell.openExternal(`steam://run/${game.appid}`));
}

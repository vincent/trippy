import fs from 'fs';
import path from 'path';
import { Tray } from 'electron';
import pkg from '../../package.json';

const trayIcon = path.join(__dirname, '../renderer/assets/images/logo.png');
let appIcon = null;

export default function create() {
  if (appIcon !== null) return appIcon;

  appIcon = new Tray(trayIcon);
  appIcon.setToolTip(pkg.name);

  return appIcon;
}

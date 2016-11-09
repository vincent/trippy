import ElectronSettings from 'electron-settings';

ElectronSettings.defaults({
  games: {
    gameListZoom: 33.33333,
  },
  wallpaper: {
    name: 'solid',
    settings: { color:'#fff', speed:0.0002 },
  }
});

export default ElectronSettings;

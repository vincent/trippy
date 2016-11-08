
import React, { PropTypes } from 'react';
import SolidWallpaper from './SolidWallpaper';
import FssWallpaper from './FssWallpaper';

var styles = {
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: -1,
    left: 0,
    top: 0,
  }
};

export default function Wallpaper({ wallpaper }) {
  return (
    <div className="background" style={styles.container}>
      {wallpaper.name == 'solid' && <SolidWallpaper settings={wallpaper.settings} />}
      {wallpaper.name == 'fss' && <FssWallpaper settings={wallpaper.settings} />}
    </div>
  );
}

Wallpaper.propTypes = {
  wallpaper: PropTypes.object.isRequired,
};

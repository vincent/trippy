
import React, { PropTypes } from 'react';
import SolidWallpaper from './SolidWallpaper';
import FssWallpaper from './FssWallpaper';
import BingWallpaper from './BingWallpaper';
import ApodWallpaper from './ApodWallpaper';

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

export default function Wallpaper({ wallpaper, fetchBingImage, fetchApodImage }) {
  return (
    <div className="background" style={styles.container}>
      {wallpaper.name == 'solid' && <SolidWallpaper settings={wallpaper.settings} />}
      {wallpaper.name == 'fss'   && <FssWallpaper settings={wallpaper.settings} />}
      {wallpaper.name == 'bing'  && <BingWallpaper settings={wallpaper.settings} fetchBingImage={fetchBingImage}/>}
      {wallpaper.name == 'apod'  && <ApodWallpaper settings={wallpaper.settings} fetchApodImage={fetchApodImage}/>}
    </div>
  );
}

Wallpaper.propTypes = {
  wallpaper: PropTypes.object.isRequired,
};

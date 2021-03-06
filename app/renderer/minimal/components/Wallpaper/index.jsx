
import React, { Component, PropTypes } from 'react';

import './wallpaper.css';
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

class Wallpaper extends Component {

  render() {
    const { wallpaper, fetchBingImage, fetchApodImage } = this.props;
    return (
      <div className="background" style={styles.container}>
            {wallpaper.name == 'solid'  && <SolidWallpaper settings={wallpaper.settings} />}
            {wallpaper.name == 'fss'    && <FssWallpaper settings={wallpaper.settings} />}
            {wallpaper.name == 'bing'   && <BingWallpaper settings={wallpaper.settings} fetchBingImage={fetchBingImage}/>}
            {wallpaper.name == 'apod'   && <ApodWallpaper settings={wallpaper.settings} fetchApodImage={fetchApodImage}/>}
            {wallpaper.name == 'custom' && <ApodWallpaper settings={wallpaper.settings} />}
      </div>
    );
  }

}

Wallpaper.propTypes = {
  wallpaper: PropTypes.object.isRequired,
};

export default Wallpaper;

import React, { Component, PropTypes } from 'react';
import TransitionGroup from 'react-addons-css-transition-group';

import './wallpaper.css';
import SolidWallpaper from './SolidWallpaper';
import FssWallpaper from './FssWallpaper';
import BingWallpaper from './BingWallpaper';
import ApodWallpaper from './ApodWallpaper';

var styles = {
  container: {
    backgroundColor: 'rgb(55,71,79)',
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
        <TransitionGroup
          transitionName="fading"
          transitionAppear={true}
          transitionAppearTimeout={100}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {wallpaper.name == 'solid'  && <SolidWallpaper settings={wallpaper.settings} />}
          {wallpaper.name == 'fss'    && <FssWallpaper settings={wallpaper.settings} />}
          {wallpaper.name == 'bing'   && <BingWallpaper settings={wallpaper.settings} fetchBingImage={fetchBingImage}/>}
          {wallpaper.name == 'apod'   && <ApodWallpaper settings={wallpaper.settings} fetchApodImage={fetchApodImage}/>}
          {wallpaper.name == 'custom' && <ApodWallpaper settings={wallpaper.settings} />}
        </TransitionGroup>
      </div>
    );
  }

}

Wallpaper.propTypes = {
  wallpaper: PropTypes.object.isRequired,
};

export default Wallpaper;
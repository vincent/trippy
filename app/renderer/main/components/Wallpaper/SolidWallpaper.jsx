import React, { PropTypes } from 'react';

export default function SolidWallpaper({ settings }) {
  return (
    <div style={{ backgroundColor:settings.color, width:'100%', height:'100%' }}></div>
  );
}

SolidWallpaper.propTypes = {
  settings: PropTypes.object.isRequired,
};


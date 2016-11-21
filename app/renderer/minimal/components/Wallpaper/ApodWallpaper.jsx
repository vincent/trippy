import React, { PropTypes } from 'react';
import { Cell } from 'react-mdl';

export default function ApodWallpaper({ settings, fetchApodImage }) {
  if (! settings.url) fetchApodImage();
  const cssImage = !settings.url ? 'none' : `url(${settings.url}) center / cover`;
  return (
    <div style={{ background:cssImage, width:'100%', height:'100%' }}></div>
  );
}

ApodWallpaper.propTypes = {
  settings: PropTypes.object.isRequired,
};

export function ApodWallpaperForm({ settings, onChange }) {
  function onChangeColor (color) {
    onChange({ target:{
      name: 'settings',
      value: {color:color.hex},
    }});
  }
  return (
    <Cell col={12}>
    </Cell>
  );
}
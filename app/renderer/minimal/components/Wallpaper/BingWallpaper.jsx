import React, { PropTypes } from 'react';
import { Cell } from 'react-mdl';

export default function BingWallpaper({ settings, fetchBingImage }) {
  if (! settings.images) fetchBingImage();
  const cssImage = !settings.images ? 'none' : `url(${settings.images[0].url}) center / cover`;
  return (
    <div style={{ background:cssImage, width:'100%', height:'100%' }}></div>
  );
}

BingWallpaper.propTypes = {
  settings: PropTypes.object.isRequired,
};

export function BingWallpaperForm({ settings, onChange }) {
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
import React, { PropTypes } from 'react';
import { GithubPicker } from 'react-color';
import { Cell } from 'react-mdl';

export default function SolidWallpaper({ settings }) {
  return (
    <div style={{ backgroundColor:settings.color, width:'100%', height:'100%' }}></div>
  );
}

SolidWallpaper.propTypes = {
  settings: PropTypes.object.isRequired,
};

export function SolidWallpaperForm({ settings, onChange }) {
  function onChangeColor (color) {
    onChange({ target:{
      name: 'settings',
      value: {color:color.hex},
    }});
  }
  return (
    <Cell col={12}>
      <GithubPicker
          color={settings.color}
          onChangeComplete={onChangeColor}
      />
    </Cell>
  );
}
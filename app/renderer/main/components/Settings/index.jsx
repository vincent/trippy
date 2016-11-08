import React, { PropTypes } from 'react';
import { Grid, Cell } from 'react-mdl';
import SettingsForm from './SettingsForm';
import WallpaperForm from '../Wallpaper/WallpaperForm';

function Settings({
  // reminders
  settings,
  setRemindersEnabled,
  setRemindersFromTime,
  setRemindersToTime,
  setRemindersWeekdays,
  // wallpaper
  wallpaper,
  updateWallpaper
}) {
  /* eslint-disable react/prop-types */
  function handleSubmit({
    // reminders
    remindersEnabled,
    remindersFromTime,
    remindersToTime,
    remindersWeekdays,
  }) {
    // reminders
    setRemindersEnabled(remindersEnabled);
    setRemindersFromTime(remindersFromTime);
    setRemindersToTime(remindersToTime);
    setRemindersWeekdays(remindersWeekdays);
  }

  return (
    <Grid>
      <Cell col={12}>
        <h1>Settings</h1>
        <Grid>
          <Cell col={12}>
            User data will be written in {settings.userSettingsPath}
          </Cell>
        </Grid>
        <SettingsForm settings={settings} onSubmit={handleSubmit} initialValues={settings} />
        <WallpaperForm wallpaper={wallpaper} onSubmit={updateWallpaper} initialValues={wallpaper} />
      </Cell>
    </Grid>
  );
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  // reminders
  setRemindersEnabled: PropTypes.func.isRequired,
  setRemindersFromTime: PropTypes.func.isRequired,
  setRemindersToTime: PropTypes.func.isRequired,
  setRemindersWeekdays: PropTypes.func.isRequired,
  // wallpaper
  wallpaper: PropTypes.object.isRequired,
  updateWallpaper: PropTypes.func.isRequired,
};

export default Settings;

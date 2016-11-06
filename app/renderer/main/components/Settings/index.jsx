import React, { PropTypes } from 'react';
import { Grid, Cell } from 'react-mdl';
import SettingsForm from './SettingsForm';

function Settings({
  // reminders
  settings,
  setRemindersEnabled,
  setRemindersFromTime,
  setRemindersToTime,
  setRemindersWeekdays,
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
        <SettingsForm settings={settings} onSubmit={handleSubmit} initialValues={settings} />
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
};

export default Settings;

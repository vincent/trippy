export const SET_REMINDERS_ENABLED = 'SET_REMINDERS_ENABLED';
export const SET_REMINDERS_FROM_TIME = 'SET_REMINDERS_FROM_TIME';
export const SET_REMINDERS_TO_TIME = 'SET_REMINDERS_TO_TIME';
export const SET_REMINDERS_WEEKDAYS = 'SET_REMINDERS_WEEKDAYS';
export const SET_POMODORO_ENABLED = 'SET_POMODORO_ENABLED';
export const SET_STEAM_ENABLED = 'SET_STEAM_ENABLED';


export function setRemindersEnabled(flag) {
  return {
    type: SET_REMINDERS_ENABLED,
    payload: flag,
  };
}

export function setRemindersFromTime(time) {
  return {
    type: SET_REMINDERS_FROM_TIME,
    payload: time,
  };
}

export function setRemindersToTime(time) {
  return {
    type: SET_REMINDERS_TO_TIME,
    payload: time,
  };
}

export function setRemindersWeekdays(days) {
  return {
    type: SET_REMINDERS_WEEKDAYS,
    payload: days,
  };
}

import { types } from '../types/types';

export const calendarEventAddNew = (calendar) => ({
  type: types.calendarEventAddNew,
  payload: calendar,
});

export const calendarUpdated = (calendar) => ({
  type: types.calendarEventUpdated,
  payload: calendar,
});

export const calendarDeleted = (calendar) => ({
  type: types.calendarEventDeleted,
});

export const calendarSetActive = (calendar) => ({
  type: types.calendarEventSetActive,
  payload: calendar,
});

export const calendarCleanActive = () => ({
  type: types.calendarEventCleanActive,
});

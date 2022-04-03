import Swal from 'sweetalert2';

import { fetchWithToken } from '../helpers/fetch';
import { prepareCalendarEvents } from '../helpers/prepareCalendarEvents';
import { types } from '../types/types';

export const startCalendarEventLoading = () => {
  return async (dispatch) => {
    try {
      const res = await fetchWithToken('calendar-events');
      const bodyRes = await res.json();

      if (res.ok) {
        const calendarEvents = prepareCalendarEvents(bodyRes.events);

        dispatch(calendarEventLoading(calendarEvents));
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', 'A ocurrido un error', 'error');
    }
  };
};

export const calendarEventStartAddNew = (calendarEvent) => {
  return async (dispatch, getState) => {
    try {
      const res = await fetchWithToken('calendar-events', calendarEvent, 'POST');
      const bodyRes = await res.json();

      if (res.ok) {
        const { uid, name } = getState().auth;

        calendarEvent.id = bodyRes.event.uid;
        calendarEvent.user = {
          _id: uid,
          name,
        };

        dispatch(calendarEventAddNew(calendarEvent));
      } else {
        if (bodyRes.msg) {
          Swal.fire('Error', bodyRes.msg, 'error');
        } else {
          return bodyRes;
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', 'A ocurrido un error', 'error');
    }
  };
};

export const calendarEventStartUpdate = (calendarEvent) => {
  return async (dispatch) => {
    try {
      const res = await fetchWithToken(`calendar-events/${calendarEvent.uid}`, calendarEvent, 'PUT');
      const bodyRes = await res.json();

      if (res.ok) {
        dispatch(calendarUpdated(calendarEvent));
      } else {
        if (bodyRes.msg) {
          Swal.fire('Error', bodyRes.msg, 'error');
        } else {
          return bodyRes;
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', 'A ocurrido un error', 'error');
    }
  };
};

export const calendarEventStartDelete = () => {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().calendar.activeEvent;
      const res = await fetchWithToken(`calendar-events/${uid}`, {}, 'DELETE');
      const bodyRes = await res.json();

      if (res.ok) {
        dispatch(calendarDeleted());
      } else {
        if (bodyRes.msg) {
          Swal.fire('Error', bodyRes.msg, 'error');
        } else {
          return bodyRes;
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', 'A ocurrido un error', 'error');
    }
  };
};

export const calendarSetActive = (calendarEvent) => ({
  type: types.calendarEventSetActive,
  payload: calendarEvent,
});

export const calendarCleanActive = () => ({
  type: types.calendarEventCleanActive,
});

export const calendarReset = () => ({ type: types.calendarEventsReset });

const calendarEventLoading = (events) => ({
  type: types.calendarEventsLoaded,
  payload: events,
});

const calendarEventAddNew = (calendarEvent) => ({
  type: types.calendarEventAddNew,
  payload: calendarEvent,
});

const calendarUpdated = (calendarEvent) => ({
  type: types.calendarEventUpdated,
  payload: calendarEvent,
});

const calendarDeleted = () => ({
  type: types.calendarEventDeleted,
});

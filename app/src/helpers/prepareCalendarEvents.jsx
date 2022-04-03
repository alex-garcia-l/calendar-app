import moment from 'moment';

export const prepareCalendarEvents = (calendarEvents) => {
  return calendarEvents.map((calendarEvent) => ({
    ...calendarEvent,
    start: moment(calendarEvent.start).toDate(),
    end: moment(calendarEvent.end).toDate(),
  }));
};

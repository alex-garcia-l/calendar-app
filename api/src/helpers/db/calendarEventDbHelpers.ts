const { CalendarEvent } = require('../../models');

export const existCalendarEventById = async (id = '') => {
  const event = await CalendarEvent.findById(id);

  if (!event) {
    throw new Error('The event not exists.');
  }

  return event;
};

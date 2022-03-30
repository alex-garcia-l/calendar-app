import moment from 'moment';

import { types } from '../types/types';

const initialState = {
  events: [
    {
      id: new Date().getTime(),
      title: 'Cumpleaños',
      start: moment().toDate(),
      end: moment().add(2, 'hours').toDate(),
      bgcolor: '#fafafa',
      notes: 'Comprar pastel',
      user: {
        id: '1234',
        name: 'User',
      },
    },
  ],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.calendarEventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload],
      };

    case types.calendarEventUpdated:
      return {
        ...state,
        events: state.events.map((event) => (event.id === action.payload.id ? action.payload : event)),
      };

    case types.calendarEventDeleted:
      return {
        ...state,
        events: state.events.filter((event) => event.id !== state.activeEvent.id),
        activeEvent: null,
      };

    case types.calendarEventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };

    case types.calendarEventCleanActive:
      return {
        ...state,
        activeEvent: null,
      };

    default:
      return state;
  }
};

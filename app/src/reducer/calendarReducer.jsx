import { types } from '../types/types';

const initialState = {
  events: [],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.calendarEventsLoaded:
      return {
        ...state,
        events: [...action.payload],
      };

    case types.calendarEventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload],
      };

    case types.calendarEventUpdated:
      return {
        ...state,
        events: state.events.map((event) => (event.uid === action.payload.uid ? action.payload : event)),
      };

    case types.calendarEventDeleted:
      return {
        ...state,
        events: state.events.filter((event) => event.uid !== state.activeEvent.uid),
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

    case types.calendarEventsReset:
      return {
        initialState,
      };

    default:
      return state;
  }
};

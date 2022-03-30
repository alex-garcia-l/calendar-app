import moment from 'moment';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { calendarMessagesES } from '../../config/translate/Calendar';
import { calendarCleanActive, calendarSetActive } from '../../actions/calendar';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteFab } from '../ui/DeleteFab';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';

moment.locale('es');

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const eventStyleGetter = ({ event, start, end, isSelected }) => {
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white',
    };

    return {
      style,
    };
  };

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const onDoubleClick = (evt) => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (evt) => {
    dispatch(calendarSetActive(evt));
  };

  const onViewChange = (evt) => {
    setLastView(evt);
    localStorage.setItem('lastView', evt);
  };

  const onSelectSlot = (evt) => {
    dispatch(calendarCleanActive());
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="calendar-screen">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            messages={calendarMessagesES}
            eventPropGetter={eventStyleGetter}
            onDoubleClickEvent={onDoubleClick}
            onSelectEvent={onSelectEvent}
            onView={onViewChange}
            onSelectSlot={onSelectSlot}
            selectable={true}
            view={lastView}
            components={{ event: CalendarEvent }}
          />
        </div>
      </div>

      <AddNewFab />
      {activeEvent && <DeleteFab />}
      <CalendarModal />
    </>
  );
};

import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CustomEvent from './CustomEvent';

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events, onSelectEvent, onNavigate, view, onView, date }) => {
  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height:690 }}
      onSelectEvent={onSelectEvent}
      view={view}
      onView={onView}
      onNavigate={onNavigate}
      date={date}
      components={{
        event: (props) => (
          <CustomEvent {...props} view={view} onNavigate={onNavigate} />
        ),
      }}
    />
  );
};

export default MyCalendar;

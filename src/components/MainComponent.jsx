import React, { useState, useCallback, useMemo } from 'react';
import MyCalendar from './MyCalendar';
import EventModal from './EventModal';
import eventsData from '../data/calendarFromToEndDate.json';
import moment from 'moment';

const MainComponent = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date()); 
  const [view, setView] = useState('month');   

  const handleSelectEvent = useCallback((event) => {
    setSelectedEvent(event);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleNavigate = useCallback((newDate, newView) => {
    setDate(newDate);
    setView(newView); 
  }, []);

  const handleViewChange = useCallback((newView) => {
    console.log('View changed to:', newView);
    setView(newView);
  }, []);

  const transformedEvents = useMemo(() => {
    const eventMap = {};

    eventsData.forEach(event => {
      const dateKey = moment(event.start).format('YYYY-MM-DD');
      if (!eventMap[dateKey]) {
        eventMap[dateKey] = [];
      }
      eventMap[dateKey].push(event);
    });

    return eventsData.map(event => {
      const dateKey = moment(event.start).format('YYYY-MM-DD');
      const eventCount = eventMap[dateKey].length;

      return {
        id: event.id,
        title: event.summary,
        desc: event.desc,
        start: new Date(event.start),
        end: new Date(event.end),
        user_det: event.user_det,
        job_id: event.job_id,
        link: event.link,
        attachments: event.attachments || [],
        extraEvents: eventCount > 2 ? eventCount - 1 : 0
      };
    });
  }, []);

  return (
    <div>
      <MyCalendar
        events={transformedEvents}
        onSelectEvent={handleSelectEvent}
        onNavigate={(newDate, newView) => {
          handleNavigate(newDate, newView);
        }}
        view={view}
        onView={handleViewChange}
        date={date} 
      />
      {selectedEvent && (
        <EventModal
          show={showModal}
          event={selectedEvent}
          handleClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default MainComponent;

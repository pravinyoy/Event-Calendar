import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal, Button } from 'react-bootstrap';
import calendarFromToEndDate from '../data/calendarFromToEndDate.json';
import calendarMeetings from '../data/calendarMeetings.json';

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filterEventsByDateRange = (events, startDate, endDate) => {
    return events.filter(event => {
        const eventStartDate = new Date(event.start);
        return eventStartDate >= new Date(startDate) && eventStartDate <= new Date(endDate);
    });
};

const getMonthStartEndDates = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth() - 1, 25); 
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 5);
    return { start, end };
};


  const getEventDetailsById = (eventId, detailedEvents) => {
    return detailedEvents.find(event => event.id === eventId);
  };

 

  useEffect(() => {
    const { start, end } = getMonthStartEndDates();

    const filteredEvents = filterEventsByDateRange(calendarFromToEndDate, start, end);

    const detailedEvents = filteredEvents.map(event => ({
      ...event,
      ...getEventDetailsById(event.id, calendarMeetings),
    }));

    const formattedEvents = detailedEvents.map(event => ({
      id: event.id,
      title: event.summary,
      start: event.start,
      end: event.end,
      extendedProps: {
        description: event.desc,
        link: event.link,
        user: event.user_det?.candidate || {}
      }
    }));

    setEvents(formattedEvents);
  }, []);

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
      />
      {selectedEvent && (
        <Modal show={show} onHide={handleClose} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedEvent.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{selectedEvent.extendedProps.description}</p>
            <p><a href={selectedEvent.extendedProps.link} target="_blank" rel="noopener noreferrer">Event Link</a></p>
            {selectedEvent.extendedProps.user && (
              <>
                <img src={selectedEvent.extendedProps.user.candidateProfileImage} alt="Candidate" style={{ width: '100px', borderRadius: '50%' }} />
                <p>Name: {selectedEvent.extendedProps.user.candidate_firstName} {selectedEvent.extendedProps.user.candidate_lastName}</p>
                <p>Email: {selectedEvent.extendedProps.user.candidate_email}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default CalendarComponent;

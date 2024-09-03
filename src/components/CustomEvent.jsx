import React from 'react';
import moment from 'moment';

const CustomEvent = ({ event, view, onNavigate }) => {
  const handleCountClick = (e) => {
    e.stopPropagation();
    onNavigate(event.start, 'day');
  };

  const formattedStartTime = moment(event.start).format('h:mm A');
  const formattedEndTime = moment(event.end).format('h:mm A');

  return (
    <div style={{ position: 'relative', cursor: 'pointer' }}>
      <p>{event.job_id.jobRequest_Title}</p>
      <span onClick={() => onNavigate(event.start, 'day')}>{event.title}</span>
      <p>{formattedStartTime} <span>-</span> {formattedEndTime}</p>
      {event.extraEvents > 0 && view === 'month' && (
        <div
          className="event-count-circle"
          onClick={handleCountClick}>
          <span className="event-count">{`${event.extraEvents}`}</span>
        </div>
      )}
    </div>
  );
};

export default React.memo(CustomEvent);

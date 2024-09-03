import React from 'react';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

const EventModal = ({ show, event, handleClose }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{event.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p><strong>Description:</strong> {event.desc}</p>
      <p><strong>Start:</strong> {event.start.toString()}</p>
      <p><strong>End:</strong> {event.end.toString()}</p>
      <p><strong>Candidate:</strong> {event.user_det.candidate.candidate_firstName} {event.user_det.candidate.candidate_lastName}</p>
      <p><strong>Role:</strong> {event.job_id.jobRequest_Role}</p>
      <p><strong>Handled by:</strong> {event.user_det.handled_by.firstName} {event.user_det.handled_by.lastName}</p>
      <p><strong>Handled by Email:</strong> {event.user_det.handled_by.userEmail}</p>
      <p><strong>Link:</strong> <a href={event.link} target="_blank" rel="noopener noreferrer">{event.link}</a></p>
      <p><strong>Attachments:</strong></p>
      {event.attachments.map((file, index) => (
        <div key={index}>
          <a href={file.url} target="_blank" rel="noopener noreferrer">
            {file.name}
          </a>
        </div>
      ))}
    </Modal.Body>
    <Modal.Footer>
      <button onClick={handleClose}>Close</button>
    </Modal.Footer>
  </Modal>
);

export default React.memo(EventModal);

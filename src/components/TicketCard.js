import React from 'react';

const TicketCard = ({ ticket, users }) => {
  const user = users.find(user => user.id === ticket.userId);

  return (
    <div className="ticket-card">
      <h5>{ticket.id}</h5>
      <h4>{ticket.title}</h4>
      <p>{ticket.tag}</p>
      {/* <p>Priority: {ticket.priority}</p> */}
      {/* <p>Assigned to: {user ? user.name : 'Unknown User'}</p> */}
    </div>
  );
};

export default TicketCard;

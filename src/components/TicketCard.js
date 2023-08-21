import React from 'react';

const TicketCard = ({ ticket, users }) => {
  const user = users.find(user => user.id === ticket.userId);

  return (
    <div className="ticket-card">
      <h3>{ticket.title}</h3>
      <p>Status: {ticket.status}</p>
      <p>Priority: {ticket.priority}</p>
      <p>Assigned to: {user ? user.name : 'Unknown User'}</p>
    </div>
  );
};

export default TicketCard;

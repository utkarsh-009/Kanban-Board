import './App.css';
import DisplayBar from './components/DisplayBar';
import TicketCard from './components/TicketCard';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState('');
  const [orderBy, setOrderBy] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
    };
    fetchData();
  }, []);

  const groupAndSortTickets = () => {
    let groupedTickets = [];
    if (groupBy === 'Status') {
      groupedTickets = groupByStatus();
    } else if (groupBy === 'User') {
      groupedTickets = groupTicketsByUser();
    } else if (groupBy === 'Priority') {
      groupedTickets = groupTicketsByPriority();
    } else {
      // Default behavior: no grouping
      groupedTickets = [{ name: 'All Tickets', tickets: tickets }];
    }

    // Sort the grouped tickets
    if (orderBy === 'Priority') {
      groupedTickets.forEach(group => {
        group.tickets.sort((a, b) => b.priority - a.priority);
      });
    } else if (orderBy === 'Title') {
      groupedTickets.forEach(group => {
        group.tickets.sort((a, b) => a.title.localeCompare(b.title));
      });
    }

    // Sort the grouped tickets by user name
    groupedTickets.sort((a, b) => a.name.localeCompare(b.name));

    return groupedTickets;
  };

  const groupByStatus = () => {
    const statusGroups = {
      'Backlog': [],
      'Todo': [],
      'In progress': [],
      'Done': [],
      'Cancelled': []
    };

    tickets.forEach(ticket => {
      statusGroups[ticket.status].push(ticket);
    });

    return Object.entries(statusGroups).map(([name, tickets]) => ({ name, tickets }));
  };

  const groupTicketsByUser = () => {
    const grouped = {};

    users.forEach(user => {
      grouped[user.name] = [];
    });

    tickets.forEach(ticket => {
      const user = users.find(u => u.id === ticket.userId);
      if (user) {
        grouped[user.name].push(ticket);
      }
    });

    return Object.entries(grouped).map(([name, tickets]) => ({ name, tickets }));
  };

  const groupTicketsByPriority = () => {
    const priorityGroups = {
      4: 'Urgent',
      3: 'High',
      2: 'Medium',
      1: 'Low',
      0: 'No priority'
    };

    const grouped = {};

    tickets.forEach(ticket => {
      const priorityName = priorityGroups[ticket.priority] || 'Unknown';
      if (!grouped[priorityName]) {
        grouped[priorityName] = [];
      }
      grouped[priorityName].push(ticket);
    });

    return Object.entries(grouped).map(([name, tickets]) => ({ name, tickets }));
  };

  const handleGroupByChange = event => {
    setGroupBy(event.target.value);
  };

  const handleOrderByChange = event => {
    setOrderBy(event.target.value);
  };

  return (
    <>
      <div className="topBar">
        <div className="app">
          <DisplayBar
            groupBy={groupBy}
            orderBy={orderBy}
            handleGroupByChange={handleGroupByChange}
            handleOrderByChange={handleOrderByChange}
          />
        </div>

      </div>
      <div className="kanbanBoard">
        <div className="tickets">
          {groupAndSortTickets().map((group, index) => (
            <div key={index} className="ticket-group">
              <h2>{group.name}</h2>
              <div className="tasks">
                {group.tickets.map(ticket => (
                  <TicketCard key={ticket.id} ticket={ticket} users={users} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;

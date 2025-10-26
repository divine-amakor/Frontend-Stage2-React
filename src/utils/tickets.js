import { auth } from './auth';

const TICKETS_KEY = 'ticketapp_tickets';

const getTickets = () => {
  const tickets = localStorage.getItem(TICKETS_KEY);
  return tickets ? JSON.parse(tickets) : [];
};

const saveTickets = (tickets) => {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
};

const getUserTickets = (userId) => {
  return getTickets().filter(ticket => ticket.userId === userId);
};

export const ticketService = {
  getAll: () => {
    const currentUser = auth.getCurrentUser();
    return currentUser ? getUserTickets(currentUser.userId) : [];
  },

  getById: (id) => {
    const currentUser = auth.getCurrentUser();
    if (!currentUser) return null;
    
    const tickets = getUserTickets(currentUser.userId);
    return tickets.find(ticket => ticket.id === id);
  },

  create: (ticketData) => {
    const currentUser = auth.getCurrentUser();
    if (!currentUser) return null;
    
    const tickets = getTickets();
    const newTicket = {
      id: Date.now().toString(),
      userId: currentUser.userId,
      ...ticketData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    tickets.push(newTicket);
    saveTickets(tickets);
    return newTicket;
  },

  update: (id, ticketData) => {
    const currentUser = auth.getCurrentUser();
    if (!currentUser) return null;
    
    const tickets = getTickets();
    const index = tickets.findIndex(ticket => ticket.id === id && ticket.userId === currentUser.userId);
    if (index !== -1) {
      tickets[index] = {
        ...tickets[index],
        ...ticketData,
        updatedAt: new Date().toISOString()
      };
      saveTickets(tickets);
      return tickets[index];
    }
    return null;
  },

  delete: (id) => {
    const currentUser = auth.getCurrentUser();
    if (!currentUser) return false;
    
    const tickets = getTickets();
    const filteredTickets = tickets.filter(ticket => !(ticket.id === id && ticket.userId === currentUser.userId));
    saveTickets(filteredTickets);
    return true;
  },

  getStats: () => {
    const currentUser = auth.getCurrentUser();
    if (!currentUser) return { total: 0, open: 0, inProgress: 0, closed: 0 };
    
    const tickets = getUserTickets(currentUser.userId);
    return {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'open').length,
      inProgress: tickets.filter(t => t.status === 'in_progress').length,
      closed: tickets.filter(t => t.status === 'closed').length
    };
  }
};
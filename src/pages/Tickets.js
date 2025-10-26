import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ticketService } from '../utils/tickets';
import Toast from '../components/Toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [toast, setToast] = useState({ message: '', type: '' });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = () => {
    setTickets(ticketService.getAll());
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      ticketService.delete(id);
      loadTickets();
      setToast({ message: 'Ticket deleted successfully!', type: 'success' });
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    if (filter === 'all') return true;
    return ticket.status === filter;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'open': return 'status-open';
      case 'in_progress': return 'status-in_progress';
      case 'closed': return 'status-closed';
      default: return 'status-open';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <Navbar />
      
      <div style={{minHeight: '80vh', padding: '40px 0'}}>
        <div className="container">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '16px'}}>
            <div>
              <h1 style={{fontSize: '2.5rem', marginBottom: '8px'}}>Tickets</h1>
              <p style={{color: '#6b7280'}}>Manage and track all your support tickets</p>
            </div>
            <Link to="/tickets/new" className="btn btn-primary">
              Create New Ticket
            </Link>
          </div>

          {/* Filter Buttons */}
          <div style={{marginBottom: '32px'}}>
            <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
              <button 
                onClick={() => setFilter('all')}
                className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              >
                All ({tickets.length})
              </button>
              <button 
                onClick={() => setFilter('open')}
                className={`btn ${filter === 'open' ? 'btn-primary' : 'btn-secondary'}`}
              >
                Open ({tickets.filter(t => t.status === 'open').length})
              </button>
              <button 
                onClick={() => setFilter('in_progress')}
                className={`btn ${filter === 'in_progress' ? 'btn-primary' : 'btn-secondary'}`}
              >
                In Progress ({tickets.filter(t => t.status === 'in_progress').length})
              </button>
              <button 
                onClick={() => setFilter('closed')}
                className={`btn ${filter === 'closed' ? 'btn-primary' : 'btn-secondary'}`}
              >
                Closed ({tickets.filter(t => t.status === 'closed').length})
              </button>
            </div>
          </div>

          {/* Tickets Grid */}
          {filteredTickets.length === 0 ? (
            <div className="card" style={{textAlign: 'center', padding: '60px 24px'}}>
              <h3 style={{marginBottom: '16px', color: '#6b7280'}}>No tickets found</h3>
              <p style={{color: '#9ca3af', marginBottom: '24px'}}>
                {filter === 'all' 
                  ? "You haven't created any tickets yet." 
                  : `No tickets with status "${filter}" found.`
                }
              </p>
              <Link to="/tickets/new" className="btn btn-primary">
                Create Your First Ticket
              </Link>
            </div>
          ) : (
            <div className="grid grid-2">
              {filteredTickets.map(ticket => (
                <div key={ticket.id} className="card">
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px'}}>
                    <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px'}}>
                      {ticket.title}
                    </h3>
                    <span className={`status-badge ${getStatusClass(ticket.status)}`}>
                      {ticket.status.replace('_', ' ')}
                    </span>
                  </div>
                  
                  {ticket.description && (
                    <p style={{color: '#6b7280', marginBottom: '16px', lineHeight: '1.5'}}>
                      {ticket.description.length > 100 
                        ? `${ticket.description.substring(0, 100)}...` 
                        : ticket.description
                      }
                    </p>
                  )}
                  
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
                    <span style={{fontSize: '14px', color: '#9ca3af'}}>
                      Created: {formatDate(ticket.createdAt)}
                    </span>
                    {ticket.priority && (
                      <span style={{fontSize: '14px', color: '#6b7280'}}>
                        Priority: {ticket.priority}
                      </span>
                    )}
                  </div>
                  
                  <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                    <Link 
                      to={`/tickets/${ticket.id}`} 
                      className="btn btn-secondary"
                      style={{fontSize: '14px', padding: '8px 16px'}}
                    >
                      View
                    </Link>
                    <Link 
                      to={`/tickets/${ticket.id}/edit`} 
                      className="btn btn-primary"
                      style={{fontSize: '14px', padding: '8px 16px'}}
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(ticket.id)}
                      className="btn btn-danger"
                      style={{fontSize: '14px', padding: '8px 16px'}}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
      
      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: '' })} 
      />
    </div>
  );
};

export default Tickets;
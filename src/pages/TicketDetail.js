import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ticketService } from '../utils/tickets';
import Toast from '../components/Toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => {
    const ticketData = ticketService.getById(id);
    if (ticketData) {
      setTicket(ticketData);
    } else {
      setToast({ message: 'Ticket not found', type: 'error' });
      setTimeout(() => navigate('/tickets'), 2000);
    }
  }, [id, navigate]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      ticketService.delete(id);
      setToast({ message: 'Ticket deleted successfully!', type: 'success' });
      setTimeout(() => navigate('/tickets'), 1000);
    }
  };

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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!ticket) {
    return (
      <div>
        <Navbar />
        <div style={{minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div>Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      <div style={{minHeight: '80vh', padding: '40px 0'}}>
        <div className="container">
          <div style={{marginBottom: '32px'}}>
            <Link to="/tickets" style={{color: '#4f46e5', textDecoration: 'none', marginBottom: '16px', display: 'inline-block'}}>
              ← Back to Tickets
            </Link>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px'}}>
              <div>
                <h1 style={{fontSize: '2.5rem', marginBottom: '8px'}}>{ticket.title}</h1>
                <span className={`status-badge ${getStatusClass(ticket.status)}`}>
                  {ticket.status.replace('_', ' ')}
                </span>
              </div>
              <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                <Link to={`/tickets/${ticket.id}/edit`} className="btn btn-primary">
                  Edit Ticket
                </Link>
                <button onClick={handleDelete} className="btn btn-danger">
                  Delete Ticket
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-2">
            {/* Main Content */}
            <div>
              <div className="card">
                <h2 style={{marginBottom: '16px'}}>Description</h2>
                {ticket.description ? (
                  <p style={{lineHeight: '1.6', color: '#374151'}}>
                    {ticket.description}
                  </p>
                ) : (
                  <p style={{color: '#9ca3af', fontStyle: 'italic'}}>
                    No description provided
                  </p>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="card">
                <h3 style={{marginBottom: '20px'}}>Ticket Details</h3>
                
                <div style={{marginBottom: '16px'}}>
                  <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '4px'}}>
                    Status
                  </label>
                  <span className={`status-badge ${getStatusClass(ticket.status)}`}>
                    {ticket.status.replace('_', ' ')}
                  </span>
                </div>

                {ticket.priority && (
                  <div style={{marginBottom: '16px'}}>
                    <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '4px'}}>
                      Priority
                    </label>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      background: ticket.priority === 'urgent' ? '#fef3c7' : 
                                 ticket.priority === 'high' ? '#fed7d7' :
                                 ticket.priority === 'medium' ? '#e0f2fe' : '#f3f4f6',
                      color: ticket.priority === 'urgent' ? '#92400e' : 
                             ticket.priority === 'high' ? '#c53030' :
                             ticket.priority === 'medium' ? '#0369a1' : '#374151'
                    }}>
                      {ticket.priority}
                    </span>
                  </div>
                )}

                <div style={{marginBottom: '16px'}}>
                  <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '4px'}}>
                    Created
                  </label>
                  <p style={{fontSize: '14px', color: '#374151'}}>
                    {formatDate(ticket.createdAt)}
                  </p>
                </div>

                {ticket.updatedAt !== ticket.createdAt && (
                  <div style={{marginBottom: '16px'}}>
                    <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '4px'}}>
                      Last Updated
                    </label>
                    <p style={{fontSize: '14px', color: '#374151'}}>
                      {formatDate(ticket.updatedAt)}
                    </p>
                  </div>
                )}

                <div style={{marginBottom: '16px'}}>
                  <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '4px'}}>
                    Ticket ID
                  </label>
                  <p style={{fontSize: '14px', color: '#374151', fontFamily: 'monospace'}}>
                    #{ticket.id}
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card">
                <h3 style={{marginBottom: '16px'}}>Quick Actions</h3>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  <Link to={`/tickets/${ticket.id}/edit`} className="btn btn-primary">
                    Edit Ticket
                  </Link>
                  <Link to="/tickets" className="btn btn-secondary">
                    View All Tickets
                  </Link>
                  <Link to="/tickets/new" className="btn btn-secondary">
                    Create New Ticket
                  </Link>
                </div>
              </div>
            </div>
          </div>
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

export default TicketDetail;
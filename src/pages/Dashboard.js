import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ticketService } from '../utils/tickets';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0
  });

  useEffect(() => {
    setStats(ticketService.getStats());
  }, []);

  return (
    <div>
      <Navbar />
      
      <div style={{minHeight: '80vh', padding: '40px 0'}}>
        <div className="container">
          <div style={{marginBottom: '40px'}}>
            <h1 style={{fontSize: '2.5rem', marginBottom: '16px'}}>Dashboard</h1>
            <p style={{color: '#6b7280', fontSize: '1.125rem'}}>
              Welcome back! Here's an overview of your ticket management system.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-2" style={{marginBottom: '40px'}}>
            <div className="card">
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div>
                  <h3 style={{fontSize: '2rem', fontWeight: 'bold', color: '#4f46e5'}}>
                    {stats.total}
                  </h3>
                  <p style={{color: '#6b7280'}}>Total Tickets</p>
                </div>
                <div style={{width: '60px', height: '60px', background: '#4f46e5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <span style={{color: 'white', fontSize: '24px'}}>📋</span>
                </div>
              </div>
            </div>

            <div className="card">
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div>
                  <h3 style={{fontSize: '2rem', fontWeight: 'bold', color: '#10b981'}}>
                    {stats.open}
                  </h3>
                  <p style={{color: '#6b7280'}}>Open Tickets</p>
                </div>
                <div style={{width: '60px', height: '60px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <span style={{color: 'white', fontSize: '24px'}}>🟢</span>
                </div>
              </div>
            </div>

            <div className="card">
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div>
                  <h3 style={{fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b'}}>
                    {stats.inProgress}
                  </h3>
                  <p style={{color: '#6b7280'}}>In Progress</p>
                </div>
                <div style={{width: '60px', height: '60px', background: '#f59e0b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <span style={{color: 'white', fontSize: '24px'}}>🟡</span>
                </div>
              </div>
            </div>

            <div className="card">
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div>
                  <h3 style={{fontSize: '2rem', fontWeight: 'bold', color: '#6b7280'}}>
                    {stats.closed}
                  </h3>
                  <p style={{color: '#6b7280'}}>Resolved Tickets</p>
                </div>
                <div style={{width: '60px', height: '60px', background: '#6b7280', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <span style={{color: 'white', fontSize: '24px'}}>✅</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h2 style={{marginBottom: '24px'}}>Quick Actions</h2>
            <div style={{display: 'flex', gap: '16px', flexWrap: 'wrap'}}>
              <Link to="/tickets" className="btn btn-primary">
                View All Tickets
              </Link>
              <Link to="/tickets/new" className="btn btn-secondary">
                Create New Ticket
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h2 style={{marginBottom: '24px'}}>Getting Started</h2>
            <div className="grid grid-2">
              <div>
                <h3 style={{marginBottom: '16px'}}>📝 Create Your First Ticket</h3>
                <p style={{color: '#6b7280', marginBottom: '16px'}}>
                  Start by creating a new support ticket to track customer issues or internal tasks.
                </p>
                <Link to="/tickets/new" className="btn btn-primary">
                  Create Ticket
                </Link>
              </div>
              <div>
                <h3 style={{marginBottom: '16px'}}>📊 Manage Tickets</h3>
                <p style={{color: '#6b7280', marginBottom: '16px'}}>
                  View, edit, and update the status of your tickets to keep your workflow organized.
                </p>
                <Link to="/tickets" className="btn btn-secondary">
                  Manage Tickets
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
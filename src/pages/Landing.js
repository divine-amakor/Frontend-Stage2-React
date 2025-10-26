import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Landing = () => {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="decorative-circle circle-1"></div>
        <div className="decorative-circle circle-2"></div>
        <div className="container">
          <div style={{maxWidth: '600px', zIndex: 10, position: 'relative'}}>
            <h1 style={{fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '24px'}}>
              TicketFlow
            </h1>
            <p style={{fontSize: '1.25rem', marginBottom: '32px', opacity: 0.9}}>
              Streamline your support workflow with our powerful ticket management system. 
              Track, manage, and resolve customer issues efficiently.
            </p>
            <div style={{display: 'flex', gap: '16px', flexWrap: 'wrap'}}>
              <Link to="/auth/login" className="btn btn-secondary">
                Login
              </Link>
              <Link to="/auth/signup" className="btn btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{padding: '80px 0'}}>
        <div className="container">
          <h2 style={{textAlign: 'center', fontSize: '2.5rem', marginBottom: '48px'}}>
            Why Choose TicketFlow?
          </h2>
          <div className="grid grid-3">
            <div className="card">
              <div style={{width: '60px', height: '60px', background: '#4f46e5', borderRadius: '50%', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span style={{color: 'white', fontSize: '24px'}}>📋</span>
              </div>
              <h3 style={{marginBottom: '16px'}}>Easy Ticket Management</h3>
              <p>Create, update, and track tickets with our intuitive interface. Never lose track of customer issues again.</p>
            </div>
            <div className="card">
              <div style={{width: '60px', height: '60px', background: '#10b981', borderRadius: '50%', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span style={{color: 'white', fontSize: '24px'}}>⚡</span>
              </div>
              <h3 style={{marginBottom: '16px'}}>Real-time Updates</h3>
              <p>Get instant notifications and updates on ticket status changes. Stay informed at all times.</p>
            </div>
            <div className="card">
              <div style={{width: '60px', height: '60px', background: '#f59e0b', borderRadius: '50%', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span style={{color: 'white', fontSize: '24px'}}>👥</span>
              </div>
              <h3 style={{marginBottom: '16px'}}>Team Collaboration</h3>
              <p>Work together seamlessly with your team. Assign tickets and collaborate on solutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{background: '#f8fafc', padding: '80px 0'}}>
        <div className="container">
          <div className="card" style={{textAlign: 'center', maxWidth: '600px', margin: '0 auto'}}>
            <h2 style={{fontSize: '2rem', marginBottom: '16px'}}>Ready to Get Started?</h2>
            <p style={{marginBottom: '32px', color: '#6b7280'}}>
              Join thousands of teams who trust TicketFlow to manage their support workflow.
            </p>
            <Link to="/auth/signup" className="btn btn-primary" style={{fontSize: '18px', padding: '16px 32px'}}>
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
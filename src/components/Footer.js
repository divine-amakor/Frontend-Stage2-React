import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid grid-3">
          <div>
            <h3 style={{marginBottom: '16px'}}>TicketFlow</h3>
            <p>Streamline your support workflow with our powerful ticket management system.</p>
          </div>
          <div>
            <h4 style={{marginBottom: '16px'}}>Features</h4>
            <ul style={{listStyle: 'none'}}>
              <li style={{marginBottom: '8px'}}>Ticket Management</li>
              <li style={{marginBottom: '8px'}}>Real-time Updates</li>
              <li style={{marginBottom: '8px'}}>Team Collaboration</li>
            </ul>
          </div>
          <div>
            <h4 style={{marginBottom: '16px'}}>Support</h4>
            <ul style={{listStyle: 'none'}}>
              <li style={{marginBottom: '8px'}}>Documentation</li>
              <li style={{marginBottom: '8px'}}>Help Center</li>
              <li style={{marginBottom: '8px'}}>Contact Us</li>
            </ul>
          </div>
        </div>
        <div style={{textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #374151'}}>
          <p>&copy; 2024 TicketFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
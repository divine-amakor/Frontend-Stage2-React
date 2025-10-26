# TicketFlow - React Ticket Management System

A robust ticket management web application built with React, featuring a complete CRUD system for managing support tickets with authentication and responsive design.

## 🚀 Features

### Core Functionality

- **Landing Page**: Hero section with wavy SVG background, decorative circles, and call-to-action buttons
- **Authentication**: Login and Signup with form validation and session management
- **Dashboard**: Statistics overview with ticket counts and quick actions
- **Ticket Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Responsive Design**: Mobile-first approach with max-width 1440px container

### Technical Features

- **Form Validation**: Real-time validation with inline error messages
- **Toast Notifications**: Success and error feedback system
- **Protected Routes**: Authentication-based route protection
- **Local Storage**: Session and data persistence
- **Status Management**: Color-coded ticket statuses (open, in_progress, closed)

## 🛠️ Technologies Used

- **React** 18.2.0 - Frontend framework
- **React Router DOM** 6.8.0 - Client-side routing
- **CSS3** - Custom styling with responsive design
- **Local Storage** - Data persistence and session management

## 📦 Installation & Setup

1. **Clone or navigate to the project directory**

   ```bash
   cd "Frontend Stage2 React"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔐 Authentication

### Test Credentials

- **Email**: admin@ticketflow.com
- **Password**: admin123

### Session Management

- Sessions are stored in localStorage with key: `ticketapp_session`
- Automatic redirect to login for unauthorized access
- Logout clears session and redirects to landing page

## 🎨 Design System

### Layout Rules

- **Max Width**: 1440px centered container on large screens
- **Hero Section**: Wavy SVG background with decorative circles
- **Card Design**: Rounded corners with shadows for content sections
- **Responsive**: Mobile-first with tablet and desktop breakpoints

### Color Scheme

- **Open Status**: Green tones (#dcfce7, #166534)
- **In Progress**: Amber tones (#fef3c7, #92400e)
- **Closed Status**: Gray tones (#f3f4f6, #374151)
- **Primary**: Indigo (#4f46e5)
- **Secondary**: Gray (#e5e7eb)

## 📱 Responsive Behavior

- **Mobile**: Stacked layout, full-width buttons, collapsible navigation
- **Tablet**: Multi-column grid with consistent spacing
- **Desktop**: Full grid layout with sidebar elements

## 🎯 Validation Rules

### Ticket Fields

- **Title**: Required, max 100 characters
- **Status**: Required, must be one of: "open", "in_progress", "closed"
- **Description**: Optional, max 500 characters
- **Priority**: Optional, one of: "low", "medium", "high", "urgent"

### Authentication

- **Email**: Required, valid email format
- **Password**: Required, minimum 6 characters
- **Name**: Required for signup

## 🔧 Error Handling

- **Form Validation**: Inline error messages below fields
- **Network Errors**: Toast notifications for failed operations
- **Unauthorized Access**: Automatic redirect to login
- **Not Found**: Graceful handling of missing tickets

## 🏗️ Project Structure

```
src/
├── components/          # Reusable components
│   ├── Footer.js       # Site footer
│   ├── Navbar.js       # Navigation bar
│   ├── ProtectedRoute.js # Route protection
│   └── Toast.js        # Notification component
├── pages/              # Page components
│   ├── Dashboard.js    # Dashboard with stats
│   ├── Landing.js      # Landing page
│   ├── Login.js        # Login form
│   ├── Signup.js       # Registration form
│   ├── TicketDetail.js # Ticket view page
│   ├── TicketForm.js   # Create/Edit form
│   └── Tickets.js      # Tickets listing
├── utils/              # Utility functions
│   ├── auth.js         # Authentication logic
│   └── tickets.js      # Ticket CRUD operations
├── styles/             # CSS files
│   └── index.css       # Global styles
├── App.js              # Main app component
└── index.js            # React entry point
```

## 🚦 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run test suite
- `npm run deploy` - Deploy to GitHub Pages
- `npm eject` - Eject from Create React App

## ♿ Accessibility Features

- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Focus States**: Visible focus indicators for keyboard navigation
- **Color Contrast**: WCAG compliant color combinations
- **Alt Text**: Descriptive text for images and icons
- **Form Labels**: Proper labeling for all form inputs

## 🐛 Known Issues

- Data is stored in localStorage (not persistent across devices)
- No real-time updates (refresh required to see changes from other sessions)
- User passwords are stored in plain text (for demo purposes only)

## 🔄 Data Flow

1. **Authentication**: Login/Signup → localStorage session token
2. **Route Protection**: Check session → Allow/Redirect
3. **Ticket Operations**: CRUD → localStorage → UI update
4. **Notifications**: Action result → Toast display

## 📊 State Management

- **Local State**: React useState for component-level state
- **Session State**: localStorage for authentication
- **Data State**: localStorage for ticket persistence
- **Form State**: Controlled components with validation

## 🎉 Getting Started Guide

1. **Visit Landing Page**: Overview of features and benefits
2. **Create Account**: Sign up with email and password
3. **Explore Dashboard**: View statistics and quick actions
4. **Create First Ticket**: Use the ticket form to add a new ticket
5. **Manage Tickets**: View, edit, and update ticket statuses

---

**Built with ❤️ using React** - A complete ticket management solution for modern support teams.

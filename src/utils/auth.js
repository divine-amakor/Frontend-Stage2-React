const SESSION_KEY = 'ticketapp_session';
const USERS_KEY = 'ticketapp_users';

const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [
    { id: '1', email: 'admin@ticketflow.com', password: 'admin123', name: 'Admin User' }
  ];
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const auth = {
  login: (email, password) => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const session = { userId: user.id, email: user.email, name: user.name };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return { success: true, user: session };
    }
    return { success: false, error: 'Invalid credentials' };
  },

  signup: (email, password, name) => {
    if (!email || !password || !name) {
      return { success: false, error: 'All fields are required' };
    }
    
    const users = getUsers();
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already exists' };
    }
    
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name
    };
    
    users.push(newUser);
    saveUsers(users);
    
    const session = { userId: newUser.id, email: newUser.email, name: newUser.name };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { success: true, user: session };
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(SESSION_KEY);
  },

  getCurrentUser: () => {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  }
};
import React, { useState, useEffect } from 'react';

const AuthStatus = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('session');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Listen for storage changes (when user logs in/out)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem('session');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for manual localStorage changes
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  if (!user || !user.isLoggedIn) {
    return (
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: '#f44336',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '4px',
        fontSize: '14px',
        zIndex: 1001
      }}>
        Inte inloggad
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: '#4caf50',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '4px',
      fontSize: '14px',
      zIndex: 1001
    }}>
      Inloggad som: {user.email || 'Användare'}
    </div>
  );
};

export default AuthStatus;
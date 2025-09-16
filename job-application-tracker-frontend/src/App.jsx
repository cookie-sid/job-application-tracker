import React, { useState, useEffect } from 'react';
import SignInPage from './components/SignInPage';
import Landing from './components/Landing';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on app load
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // Simple token validation (check if it's not expired)
          const payload = JSON.parse(atob(token.split('.')[1]));
          const isExpired = payload.exp * 1000 < Date.now();
          
          if (!isExpired) {
            setIsAuthenticated(true);
          } else {
            // Token expired, remove it
            localStorage.removeItem('token');
          }
        } catch (error) {
          // Invalid token, remove it
          localStorage.removeItem('token');
        }
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Listen for authentication changes
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };

    // Listen for storage changes (like logout from another tab)
    window.addEventListener('storage', handleStorageChange);
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {isAuthenticated ? <Landing /> : <SignInPage />}
    </div>
  );
}

export default App;
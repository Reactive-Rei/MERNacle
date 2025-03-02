import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [showSignup, setShowSignup] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <div>
      <h1>Remote Productivity Tool</h1>

      {isAuthenticated ? (
        <>
          <Dashboard />
          <button onClick={handleLogout}>Log out</button>
        </>
      ) : (
        <>
          {showSignup ? (
            <>
              <Signup />
              <p>
                Already have an account?{' '}
                <button onClick={() => setShowSignup(false)}>Log in</button>
              </p>
            </>
          ) : (
            <>
              <Login setIsAuthenticated={setIsAuthenticated} />
              <p>
                Don’t have an account?{' '}
                <button onClick={() => setShowSignup(true)}>Sign up</button>
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  const fetchMessage = async () => {
    try {
      const res = await axios.get('/api/test');
      setMessage(res.data);
    } catch (err) {
      console.error('Error fetching message:', err);
      setMessage('Failed to connect to backend');
    }
  };

  return (
    <div>
      <h1>Remote Productivity Tool</h1>
      <button onClick={fetchMessage}>Test Backend</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
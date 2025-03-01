import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the '/client' addition
import App from './components/App';  // or './components/App.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
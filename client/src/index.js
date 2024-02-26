import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Make sure this imports before other components
import App from './App';
import '@picocss/pico/css/pico.min.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

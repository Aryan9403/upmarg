import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Make sure this imports before other components
import App from './App';
import 'path_to_your_pico_css_file.css'; // Path to PicoCSS file

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

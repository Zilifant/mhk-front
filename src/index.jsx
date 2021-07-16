import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import TestApp2 from './TestApp2';

// require('log-timestamp')(function() { return new Date().toLocaleTimeString('en-US', { hour12: false }) });

ReactDOM.render(
  // <React.StrictMode>
    <App />,
  // </React.StrictMode>,
  document.getElementById('root')
);

// ReactDOM.render(
//   // <React.StrictMode>
//     <TestApp2 />,
//   // </React.StrictMode>,
//   document.getElementById('root')
// );
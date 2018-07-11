import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom';

const supportsHistory = 'pushState' in window.history;
ReactDOM.render(
  <BrowserRouter forceRefresh={!supportsHistory} keyLength={20}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();

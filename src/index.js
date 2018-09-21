import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './scrollToTop.js';


const supportsHistory = 'pushState' in window.history;
ReactDOM.render(
  <BrowserRouter forceRefresh={!supportsHistory} keyLength={20}>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();

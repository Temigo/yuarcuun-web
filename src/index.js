import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from "react-redux";
import store from "./redux/store";

import { Router } from 'react-router-dom';
import ScrollToTop from './scrollToTop.js';
import createHistory from 'history/createBrowserHistory';
import ReactGA from 'react-ga';

// Uncomment this for deployment
// ReactGA.initialize('UA-127737321-1');

const history = createHistory();
//FIXME how to exclude localhost?
history.listen(location => {
	ReactGA.set({ page: location.pathname })
	ReactGA.pageview(location.pathname)
});

const supportsHistory = 'pushState' in window.history;
ReactDOM.render(
	<Provider store={store}>
  <Router forceRefresh={!supportsHistory} keyLength={20} history={history}>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </Router>
	</Provider>,
  document.getElementById('root')
);
registerServiceWorker();

import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ScrollToTop from './components/common/scrollToTop.js';
import { Provider } from "react-redux";
import store from "./redux/store";
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ReactGA from 'react-ga';

<<<<<<< Updated upstream
// Uncomment this for deployment
// ReactGA.initialize('UA-127737321-1');

const history = createHistory();
//FIXME how to exclude localhost?
history.listen(location => {
=======
import { Router } from 'react-router-dom';
import ScrollToTop from './scrollToTop.js';
import createHistory from 'history/createBrowserHistory';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-127737321-1');

const history = createHistory();
//FIXME how to exclude localhost?
history.listen(location => {
  console.log(location);
>>>>>>> Stashed changes
	ReactGA.set({ page: location.pathname })
	ReactGA.pageview(location.pathname)
});

const supportsHistory = 'pushState' in window.history;
ReactDOM.render(
<<<<<<< Updated upstream
	<Provider store={store}>
=======
>>>>>>> Stashed changes
  <Router forceRefresh={!supportsHistory} keyLength={20} history={history}>
    <ScrollToTop>
      <App />
    </ScrollToTop>
<<<<<<< Updated upstream
  </Router>
	</Provider>,
=======
  </Router>,
>>>>>>> Stashed changes
  document.getElementById('root')
);
registerServiceWorker();

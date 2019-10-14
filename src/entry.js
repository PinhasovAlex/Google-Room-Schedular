import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router';
import React from 'react';
import { render } from 'react-dom';
import Status from './components/status';
import Schedule from './components/schedule';
import Calendars from './components/calendars';
import CalendarsAuth from './components/calendarsAuth';
import CheckConnection from './components/check_connection';
import ConnectToWifi from './components/connect_to_wifi';
import WifiAuth from './components/wifiAuth'
import App from './app';

import '../static/sass/main.scss';

window.location.hash = 'status';

render((
  <Router history={hashHistory}>
    <Route path="/status" component={App}>
      <IndexRoute component={Status} />
      <Route path="/schedule" component={Schedule} />
      <Route path="/calendars" component={Calendars} />
      <Route path="/calendarsAuth" component={CalendarsAuth} />
      <Route path="/check_connection" component={CheckConnection} />
      <Route path="/connect_to_wifi" component={ConnectToWifi} />
      <Route path="/wifiAuth" component={WifiAuth} />
    </Route>
  </Router>
), document.getElementById('react-root'));

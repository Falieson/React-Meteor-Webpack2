import React from 'react';
import {
  Router,
  Route,
  browserHistory,
  IndexRoute
} from 'react-router';

import App from 'ui/App';
import Home from 'ui/pages/Home';

export default function renderRoutes() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/home" component={Home} />
      </Route>
    </Router>
  );
}

// Meteor & React
// import { Meteor } from 'meteor/meteor';
import 'meteor-client';

// Router
import { renderRoutes } from 'startup/client/';

// React
import React from 'react';
import { render } from 'react-dom';

// Redux
import { Provider } from 'react-redux';
import Store from 'ui/store/store';

// Material-UI
import injectTapEventPlugin from 'react-tap-event-plugin';

// Client entry point, imports all client code
import '../imports/startup/client/';
import '../imports/startup/both/';


function appRoot() {
  return (
    <div className="app-container">
      <Provider store={Store()}>
        {renderRoutes()}
      </Provider>
    </div>
  );
}

Meteor.startup(() => {
  injectTapEventPlugin(); // Required for Material-UI

  render(
    appRoot(),
    document.getElementById('root'),
  );
});

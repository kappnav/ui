import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Content,
} from 'carbon-components-react/lib/components/UIShell';

import { LandingPage, SingleResource } from '.';

// File that handles `react-router-dom` routes
const App = () => (
  <Content>
    <Switch>
      <Route exact path={['/', '/applications', '/actions']} component={LandingPage} />
      <Route path="/applications/:appName">
        {/* TODO: Implement single resource page */}
        <SingleResource />
      </Route>
    </Switch>
  </Content>
);

export default App;

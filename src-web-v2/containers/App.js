import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Content,
} from 'carbon-components-react/lib/components/UIShell';

import { LandingPage, SingleApplication, ActionsHistory } from '.';

const App = () => (
  <Content>
    <Switch>
      <Route exact path={['/', '/applications', '/actions']} component={LandingPage} />
      <Route path="/applications/:appName">
        <SingleApplication />
      </Route>
      {/* FIXME: Delete me when deleting <ActionsHistory> */}
      {/* <Route path="/actions/" component={ActionsHistory} /> */}
    </Switch>
  </Content>
);

export default App;

import React, { PureComponent } from 'react';
import { Route, Switch } from "react-router-dom";
import {
  Content,
} from 'carbon-components-react/lib/components/UIShell';

import { LandingPage, SingleApplication, CommandActions } from '.';

export default class App extends PureComponent {
  render() {
    return (
      <Content>
        <Switch>
          <Route exact path={['/', '/applications']} component={LandingPage} />
          <Route path="/applications/" component={SingleApplication} />
          <Route path="/jobs/" component={CommandActions} />
        </Switch>
      </Content>
    );
  }
}

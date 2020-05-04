import React, { PureComponent } from 'react';
import { Link } from "react-router-dom";

require('./LeftNavMenu.scss');

import msgs from '../../nls/kappnav.properties';

import {
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
} from 'carbon-components-react/lib/components/UIShell';

import {
  Application20,
  Catalog20,
  Code20,
  Category20,
  TreeViewAlt20,
} from '@carbon/icons-react';

export class LeftNavMenu extends PureComponent {
  render() {
    const { expanded } = this.props;
    return (
      <SideNav
        aria-label="Side navigation"
        isRail
        expanded={expanded}
      >
        <SideNavItems>
          <SideNavMenu renderIcon={Application20} title={msgs.get('page.applicationView.title')}>
            <SideNavMenuItem element={Link} to="/applications/stock-trader">
              Stock Trader
            </SideNavMenuItem>
          </SideNavMenu>
          <SideNavLink renderIcon={Catalog20} element={Link} to="/jobs">
            {msgs.get('page.jobsView.title')}
          </SideNavLink>
        </SideNavItems>
      </SideNav>
    );
  }
}

export default LeftNavMenu;

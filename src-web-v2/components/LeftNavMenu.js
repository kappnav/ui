import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';


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
import msgs from '../../nls/kappnav.properties';

require('./LeftNavMenu.scss');

export class LeftNavMenu extends PureComponent {
  render() {
    const { expanded } = this.props;
    return (
      <SideNav
        aria-label={msgs.get('header.menu.bar.label')}
        isRail
        expanded={expanded}
      >
        <SideNavItems>
          <SideNavLink renderIcon={Application20} element={Link} to="/applications">
            {msgs.get('page.applicationView.title')}
          </SideNavLink>
          <SideNavLink renderIcon={Catalog20} element={Link} to="/jobs">
            {msgs.get('page.jobsView.title')}
          </SideNavLink>
        </SideNavItems>
      </SideNav>
    );
  }
}

export default LeftNavMenu;

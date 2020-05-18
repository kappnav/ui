import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  SideNav,
  SideNavItems,
  SideNavLink,
} from 'carbon-components-react/lib/components/UIShell';

import {
  Application20,
  Catalog20,
} from '@carbon/icons-react';
import msgs from '../../nls/kappnav.properties';

require('./LeftNavMenu.scss');

const LeftNavMenu = (props) => {
  const { expanded } = props;
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
        <SideNavLink renderIcon={Catalog20} element={Link} to="/actions">
          {msgs.get('actions.history')}
        </SideNavLink>
      </SideNavItems>
    </SideNav>
  );
};

LeftNavMenu.propTypes = {
  expanded: PropTypes.bool.isRequired,
};

export default LeftNavMenu;

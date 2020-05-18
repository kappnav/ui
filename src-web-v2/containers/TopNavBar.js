import React from 'react';
import { Link } from 'react-router-dom';

import {
  HeaderContainer,
  Header,
  HeaderName,
  SkipToContent,
  HeaderMenuButton,
} from 'carbon-components-react/lib/components/UIShell';

import {
  TopNavBarActions,
  LeftNavMenu,
} from '../components';

import App from './App';

const TopNavBar = () => (
  <div className="container">
    <HeaderContainer
      isSideNavExpanded={false}
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <>
          <Header aria-label="IBM Application Navigator">
            <SkipToContent />

            <HeaderMenuButton
              aria-label="Open menu"
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
              isCollapsible
            />

            <LeftNavMenu expanded={isSideNavExpanded} />

            <HeaderName element={Link} to="/" prefix="IBM">
              Application Navigator
            </HeaderName>

            <TopNavBarActions />
          </Header>

          {/* The main body of the page */}
          <App />
        </>
      )}
    />
  </div>
);

export default TopNavBar;

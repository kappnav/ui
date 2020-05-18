import React, { useState } from 'react';
import {
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderPanel,
} from 'carbon-components-react/lib/components/UIShell';

import {
  Notification20,
  UserAvatar20,
  Information20,
} from '@carbon/icons-react';

const TopNavBarActions = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="About">
          <Information20 />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Notifications Menu" onClick={() => { setExpanded(!expanded); }}>
          <Notification20 />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="User Account Menu" onClick={() => { setExpanded(!expanded); }}>
          <UserAvatar20 />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
      <HeaderPanel aria-label="Header Panel" expanded={expanded} />
    </>
  );
};

export default TopNavBarActions;

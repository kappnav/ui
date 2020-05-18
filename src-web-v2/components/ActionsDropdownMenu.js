import React from 'react';
import {
  OverflowMenu,
  OverflowMenuItem,
} from 'carbon-components-react';

const ActionsDropdownMenu = () => (
  <>
    <OverflowMenu className="kv--overflow-menu" flipped>
      <OverflowMenuItem primaryFocus itemText="Action 1" />
      <OverflowMenuItem itemText="Action 2" />
    </OverflowMenu>
  </>
);

export default ActionsDropdownMenu;

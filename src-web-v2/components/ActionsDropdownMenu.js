import React, { PureComponent } from 'react';
import {
  OverflowMenu,
  OverflowMenuItem,
} from 'carbon-components-react';

export class ActionsDropdownMenu extends PureComponent {
  render() {
    return (
      <>
        <OverflowMenu flipped>
          <OverflowMenuItem primaryFocus itemText="Action 1" />
          <OverflowMenuItem itemText="Action 2" />
        </OverflowMenu>
      </>
    );
  }
}

export default ActionsDropdownMenu;

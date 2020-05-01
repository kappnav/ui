import React, { PureComponent } from 'react';
import {
  Button,
} from 'carbon-components-react';

import {
  Edit20,
  TrashCan20,
} from '@carbon/icons-react';

import { ActionsDropdownMenu } from '.';

require('./ActionButtons.scss');

let buttonProps = {
  size: 'small',
  hasIconOnly: true,
  kind: 'ghost',
  tooltipPosition: 'top',
  tooltipAlignment: 'center',
  className: 'kv--btn',
};

export class ActionsButtons extends PureComponent {
  constructor(props) {
    super();
    buttonProps = { ...buttonProps, ...props };
  }

  render() {
    return (
      <span className="bx--btn-set">
        <Button {...buttonProps} iconDescription="Edit" renderIcon={Edit20} />
        <Button {...buttonProps} iconDescription="Delete" renderIcon={TrashCan20} />
        <ActionsDropdownMenu />
      </span>
    );
  }
}

export default ActionsButtons;

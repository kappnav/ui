import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
} from 'carbon-components-react';

import {
  Edit20,
  TrashCan20,
} from '@carbon/icons-react';

import ActionsDropdownMenu from './ActionsDropdownMenu';

import msgs from '../../nls/kappnav.properties';

require('./ActionButtons.scss');

let buttonProps = {
  size: 'small',
  hasIconOnly: true,
  kind: 'ghost',
  tooltipPosition: 'top',
  tooltipAlignment: 'center',
  className: 'kv--btn',
  iconDescription: 'Placeholder',
};

const ActionsButtons = (props) => {
  // Remove the disableRemoveButton to avoid it being
  // rendered in the DOM when passing buttonProps
  const { disableRemoveButton, ...rest } = props;

  // Expose the Carbon component props by merging
  // ...rest into the buttonProps
  buttonProps = { ...buttonProps, ...rest };

  return (
    <span className="bx--btn-set">
      {!disableRemoveButton && <Button {...buttonProps} iconDescription={msgs.get('table.actions.edit')} renderIcon={Edit20} />}
      <Button {...buttonProps} iconDescription={msgs.get('table.actions.remove')} renderIcon={TrashCan20} />
      <ActionsDropdownMenu />
    </span>
  );
};

ActionsButtons.propTypes = {
  disableRemoveButton: PropTypes.bool.isRequired,
};

export default ActionsButtons;

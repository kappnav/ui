import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Modal,
} from 'carbon-components-react';

import {
  TrashCan20,
} from '@carbon/icons-react';

import deleteApplication from '../../redux/deleteApplication';

import ActionsDropdownMenu from './ActionsDropdownMenu';

import msgs from '../../../nls/kappnav.properties';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Remove the disableRemoveButton to avoid it being
  // rendered in the DOM when passing buttonProps
  const { disableRemoveButton, ...rest } = props;

  // Expose the Carbon component props by merging
  // ...rest into the buttonProps
  buttonProps = { ...buttonProps, ...rest };

  const applicationName = 'FIXME'; // FIXME: Get the appname somewhere

  // FIXME: onSubmit should be passed into here instead to allow flexibility
  const handleOnSubmit = (appName, appNamespace) => {
    setIsModalOpen(false);
    deleteApplication(appName, appNamespace);
    return true;
  };

  return (
    <span className="bx--btn-set">
      {
        !disableRemoveButton
        && <Button {...buttonProps} onClick={() => setIsModalOpen(true)} iconDescription={msgs.get('table.actions.remove')} renderIcon={TrashCan20} />
      }
      {
        <Modal
          modalHeading={msgs.get('modal.remove.application')}
          primaryButtonText={msgs.get('modal.button.remove')}
          secondaryButtonText={msgs.get('modal.button.cancel')}
          modalAriaLabel={msgs.get('modal.remove.confirm', [applicationName])}
          iconDescription={msgs.get('modal.button.close.the.modal')}
          onRequestClose={() => setIsModalOpen(false)}
          onRequestSubmit={handleOnSubmit} // FIXME: Need to implement this, find the appname and appnamespace
          open={isModalOpen}
          danger
          shouldSubmitOnEnter
          size="xs"
        >
          <p className="bx--modal-content__text">
            {msgs.get('modal.remove.confirm', [applicationName])}
          </p>
        </Modal>
      }
      <ActionsDropdownMenu />
    </span>
  );
};

ActionsButtons.propTypes = {
  disableRemoveButton: PropTypes.bool,
};

ActionsButtons.defaultProps = {
  disableRemoveButton: false,
};

export default ActionsButtons;

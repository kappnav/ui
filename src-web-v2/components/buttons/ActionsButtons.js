import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Modal,
} from 'carbon-components-react';

import {
  Edit20,
  TrashCan20,
} from '@carbon/icons-react';

import deleteApplication from '../../redux/deleteApplication';

import ActionsDropdownMenu from './ActionsDropdownMenu';

import msgs from '../../../nls/kappnav.properties';

require('./ActionButtons.scss');

const buttonProps = {
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
  const {
    deletable, editable, urlActions, cmdActions,
  } = props;

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
        editable
        && <Button {...buttonProps} onClick={() => setIsModalOpen(true)} iconDescription={msgs.get('table.actions.edit')} renderIcon={Edit20} />
      }
      {
        deletable
        && <Button {...buttonProps} onClick={() => setIsModalOpen(true)} iconDescription={msgs.get('table.actions.remove')} renderIcon={TrashCan20} />
      }
      {
        <Modal
          modalHeading={msgs.get('modal.remove.application')} // FIXME: PII needs to be different between edit/delete
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
      <ActionsDropdownMenu urlActions={urlActions} cmdActions={cmdActions} />
    </span>
  );
};

ActionsButtons.propTypes = {
  deletable: PropTypes.bool.isRequired,
  editable: PropTypes.bool.isRequired,
  urlActions: PropTypes.arrayOf(PropTypes.object),
  cmdActions: PropTypes.arrayOf(PropTypes.object),
};

ActionsButtons.defaultProps = {
  urlActions: [],
  cmdActions: [],
};

export default ActionsButtons;

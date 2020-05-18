import React from 'react';

import {
  Button,
} from 'carbon-components-react';

import {
  HealthCross20,
} from '@carbon/icons-react';

import msgs from '../../nls/kappnav.properties';

require('./HealthCheckButton.scss');

const buttonProps = {
  kind: 'tertiary',
  iconDescription: msgs.get('run.health.check'),
  className: 'kv--btn',
};

const HealthCheckButton = () => (
  <Button {...buttonProps} renderIcon={HealthCross20}>
    {msgs.get('run.health.check')}
  </Button>
);

export default HealthCheckButton;

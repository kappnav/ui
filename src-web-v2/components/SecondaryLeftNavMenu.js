import React, { useEffect } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import {
  Add20,
} from '@carbon/icons-react';

import {
  Search,
  Button,
} from 'carbon-components-react';

import { ResourceLevelNav, ResourceLevelNavSkeleton } from '@console/pal/Components';
import { useInterval } from '../hooks';
import fetchApplications from '../redux/fetchApplications';


import msgs from '../../nls/kappnav.properties';

require('./SecondaryLeftNavMenu.scss');

const getItems = (applications) => {
  const items = _.cloneDeep(applications);
  return items.map((e) => {
    const { name, status } = e;
    return {
      label: name,
      status,
      to: `/applications/${name}`,
    };
  });
};

const SecondaryLeftNavMenu = () => {
  const dispatch = useDispatch();

  useInterval(() => {
    dispatch(fetchApplications());
  }, 3000);

  const loading = useSelector((state) => state.applications.pending);
  const applications = useSelector((state) => state.applications.data);

  // const items = [ // Needs to be from redux
  //   {
  //     to: '/applications/details-app',
  //     label: 'details-app',
  //   },
  // ];

  const items = getItems(applications);

  const buttonProps = {
    renderIcon: Add20,
    size: 'sm',
    kind: 'ghost',
    iconDescription: msgs.get('button.application.create'), // FIXME: Need configurable PII
  };

  return (
    <div className="kv--secondary-nav">
      <Search size="sm" />
      <Button className="kv--secondary-nav-btn" {...buttonProps}>
        {/* FIXME: Need configurable PII */}
        {msgs.get('button.application.create')}
      </Button>
      {loading ? <ResourceLevelNavSkeleton />
        : <ResourceLevelNav linkComponent={Link} items={items} />}
    </div>
  );
};

export default SecondaryLeftNavMenu;

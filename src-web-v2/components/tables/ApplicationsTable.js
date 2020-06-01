import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import {
  Loading,
} from 'carbon-components-react';
import {
  HealthCross20,
  Add20,
  CheckmarkOutline20,
  WarningAltInvertedFilled20,
  WarningSquareFilled20,
} from '@carbon/icons-react';
import ResourceTable from './ResourceTable';
import { ActionsButtons } from '..';
import { useInterval } from '../../hooks';
import fetchApplications from '../../redux/fetchApplications';


import msgs from '../../../nls/kappnav.properties';

const tableHeaders = [
  {
    header: 'Status',
    key: 'status',
  },
  {
    header: 'Name',
    key: 'name',
  },
  {
    header: 'Namespace',
    key: 'namespace',
  },
  {
    header: 'Action',
    key: 'action',
  },
];

const getStatusIcon = (status) => (
  <>
    {status === 'Normal' && <CheckmarkOutline20 className="kv--normal-icon" /> }
    {status === 'Warning' && <WarningAltInvertedFilled20 className="kv--warning-icon" /> }
    {status === 'Problem' && <WarningSquareFilled20 className="kv--problem-icon" /> }
  </>
);

const ApplicationResourceTable = () => {
  const dispatch = useDispatch(); // Hook gets redux dispatch method

  // useSelector: Hook gets redux store state
  const loading = useSelector((state) => state.applications.pending);
  const applications = useSelector((state) => state.applications.data);
  const error = useSelector((state) => state.applications.error);

  useInterval(() => {
    dispatch(fetchApplications());
  }, 3000);

  if (loading && _.isEmpty(applications)) {
    // Only show loading when there is no applications and
    // the API is fetching data
    return <Loading withOverlay />;
  }

  return (
    <ResourceTable
      actionButtons={<ActionsButtons />}
      tableHeaders={tableHeaders}
      getStatusIcon={getStatusIcon}
      listOfResources={applications}
      buttonText={msgs.get('button.application.create')}
    />
  );
};

export default ApplicationResourceTable;

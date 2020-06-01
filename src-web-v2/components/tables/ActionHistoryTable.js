import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Loading,
} from 'carbon-components-react';
import _ from 'lodash';
import {
  CheckmarkOutline20,
  ErrorFilled20,
  Unknown20,
  Fade20,
} from '@carbon/icons-react';
import ResourceTable from './ResourceTable';
import { useInterval } from '../../hooks';
import fetchCommands from '../../redux/fetchCommands';
import { ActionsButtons } from '..';
import msgs from '../../../nls/kappnav.properties';

const tableHeaders = [
  {
    header: 'Status',
    key: 'status',
  },
  {
    header: 'Action Name',
    key: 'actionName',
  },
  {
    header: 'Component',
    key: 'component',
  },
  {
    header: msgs.get('message'),
    key: 'message',
  },
  {
    header: 'Action',
    key: 'action',
  },
];

const getStatusIcon = (status) => (
  <>
    { status === 'Completed' && <CheckmarkOutline20 className="kv--normal-icon job" /> }
    { status === 'Failed' && <ErrorFilled20 className="kv--problem-icon" /> }
    { status === 'Unknown' && <Unknown20 className="kv--unknown-icon" /> }
    { status === 'In Progress' && <Fade20 className="kv--inprogress-icon" /> }
  </>
);

const ActionHistoryResourceTable = () => {
  const dispatch = useDispatch(); // Hook gets redux dispatch method

  // useSelector: Hook gets redux store state
  const loading = useSelector((state) => state.commands.pending);
  const commands = useSelector((state) => state.commands.data);
  const error = useSelector((state) => state.commands.error);

  useInterval(() => {
    dispatch(fetchCommands());
  }, 3000);

  if (loading && _.isEmpty(commands)) {
    // Only show loading when there is no applications and
    // the API is fetching data
    return <Loading withOverlay />;
  }

  return (
    <ResourceTable
      actionButtons={<ActionsButtons />}
      tableHeaders={tableHeaders}
      getStatusIcon={getStatusIcon}
      listOfResources={commands}
      buttonText={msgs.get('run.health.check')}
    />
  );
};

export default ActionHistoryResourceTable;

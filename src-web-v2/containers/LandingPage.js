import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import {
  Button,
  DataTable,
  Loading,
} from 'carbon-components-react';

import {
  Add20,
  CheckmarkOutline20,
  WarningAltInvertedFilled20,
  WarningSquareFilled20,
} from '@carbon/icons-react';

import fetchApplications from '../redux/fetchApplications';

import {
  ActionsButtons,
  SecondaryHeader,
} from '../components';

import msgs from '../../nls/kappnav.properties';

import { useInterval } from '../hooks';

require('./LandingPage.scss');

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableToolbar,
  TableToolbarSearch,
  TableToolbarContent,
  TableExpandHeader,
  TableExpandRow,
  TableExpandedRow,
} = DataTable;

const defaultHeaders = [
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

const initialRows = [
  {
    id: 'a',
    name: 'stock-trader',
    status: 'Normal',
    namespace: 'kappnav',
  },
  {
    id: 'b',
    name: 'bookinfo',
    status: 'Warning',
    namespace: 'kappnav',
  },
  {
    id: 'c',
    name: 'music-library',
    status: 'Problem',
    namespace: 'kappnav',
  },
];

const LandingPage = () => {
  // useSelector: Hook gets redux store state
  const loading = useSelector((state) => state.applications.pending);
  const applications = useSelector((state) => state.applications.data);
  const error = useSelector((state) => state.applications.error);

  const dispatch = useDispatch(); // Hook gets redux dispatch method

  useInterval(() => {
    dispatch(fetchApplications());
  }, 3000);

  if (!error) {
    // TODO: Add the ability to detect error, but attempt to show as much
    // data already present in redux.  If error is seen, throw up a error banner
    // showing connection issues?
  }

  if (loading && !applications) {
    // Only show loading when there is no applications and
    // the API is fetching data
    return <Loading withOverlay />;
  }

  return (
    <DataTable
      headers={defaultHeaders}
      rows={applications}
      render={({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getTableProps,
        onInputChange,
      }) => (
        <>
          <SecondaryHeader title={msgs.get('tabs.applications')} showBreadCrumb={false} />

          <TableContainer>
            <TableToolbar>
              <TableToolbarContent>
                <TableToolbarSearch placeHolderText="Search by name, namespace or component" onChange={onInputChange} />
                <Button
                  onClick={() => console.log('Clicking')}
                  size="small"
                  kind="primary"
                  renderIcon={Add20}
                  iconDescription={msgs.get('button.application.create')}
                >
                  {msgs.get('button.application.create')}
                </Button>
              </TableToolbarContent>
            </TableToolbar>

            <Table {...getTableProps()}>

              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({ header, isSortable: header.key !== 'action' })}>
                      {msgs.get(`table.header.${header.key}`)}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((row) => (
                  <React.Fragment key={row.id}>
                    <TableRow {...getRowProps({ row })}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>
                          {cell.value === 'Normal' && <CheckmarkOutline20 className="kv--normal-icon" /> }
                          {cell.value === 'Warning' && <WarningAltInvertedFilled20 className="kv--warning-icon" /> }
                          {cell.value === 'Problem' && <WarningSquareFilled20 className="kv--problem-icon" /> }
                          {cell.info.header === 'action' && <ActionsButtons /> }
                          {cell.info.header === 'name' ? <Link to={`applications/${cell.value}`}>{cell.value}</Link> : cell.value}
                        </TableCell>
                      ))}
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>

            </Table>
          </TableContainer>
        </>
      )}
    />
  );
};

export default LandingPage;

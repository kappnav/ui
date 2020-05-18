import React from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
  DataTable,
} from 'carbon-components-react';

import {
  Add20,
  CheckmarkOutline20,
  WarningAltInvertedFilled20,
  WarningSquareFilled20,
} from '@carbon/icons-react';

import {
  ActionsButtons,
} from '../components';

import msgs from '../../nls/kappnav.properties';

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

const LandingPage = () => (
  <DataTable
    headers={defaultHeaders}
    rows={initialRows}
    render={({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getTableProps,
      onInputChange,
    }) => (
      <TableContainer title={msgs.get('tabs.applications')}>

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
              {/* add the expand header before all other headers */}
              <TableExpandHeader />
              {headers.map((header) => (
                <TableHeader {...getHeaderProps({ header })}>
                  {msgs.get(`table.header.${header.key}`)}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableExpandRow {...getRowProps({ row })}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>
                      {cell.value === 'Normal' && <CheckmarkOutline20 className="kv--normal-icon" /> }
                      {cell.value === 'Warning' && <WarningAltInvertedFilled20 className="kv--warning-icon" /> }
                      {cell.value === 'Problem' && <WarningSquareFilled20 className="kv--problem-icon" /> }
                      {cell.info.header === 'action' && <ActionsButtons /> }
                      {cell.info.header === 'name' ? <Link to={`applications/${cell.value}`}>{cell.value}</Link> : cell.value}
                    </TableCell>
                  ))}
                </TableExpandRow>
                {row.isExpanded && (
                <TableExpandedRow colSpan={headers.length + 1}>
                  <h1>Expandable row content</h1>
                  <p>Description here</p>
                </TableExpandedRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    )}
  />
);

export default LandingPage;

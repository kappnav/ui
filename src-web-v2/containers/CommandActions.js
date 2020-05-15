import React, { PureComponent } from 'react';
import { Link } from "react-router-dom";

import {
  Content,
} from 'carbon-components-react/lib/components/UIShell';

import {
  Button,
  DataTable,
  OverflowMenu,
  OverflowMenuItem,
  Icon,
} from 'carbon-components-react';

import {
  Search20,
  Edit20,
  Settings20,
  Add20,
  CheckmarkOutline20,
  ErrorFilled20,
  Unknown20,
  Fade20,
  WarningAltInvertedFilled20,
  WarningSquareFilled20,
} from '@carbon/icons-react';

import {
  ActionsButtons,
} from '../components';

import msgs from '../../nls/kappnav.properties';

require('./CommandActions.scss');

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
  TableToolbarAction,
} = DataTable;

const defaultHeaders = [
  {
    header: 'Status',
    key: 'status',
  },
  {
    header: 'Action Name',
    key: 'actionName',
  },
  {
    header: 'Application Name',
    key: 'applicationName',
  },
  {
    header: 'Component',
    key: 'component',
  },
  {
    header: 'Age',
    key: 'age',
  },
  {
    header: 'Action',
    key: 'action',
  },
];

const initialRows = [
  {
    id: 'a',
    status: 'Completed',
    actionName: 'job-name',
    applicationName: 'default/stocktrader',
    component: 'default/loyalty-level',
    age: '27 days ago',
  },
  {
    id: 'b',
    status: 'Unknown',
    actionName: 'job-name',
    applicationName: 'default/stocktrader',
    component: 'default/loyalty-level',
    age: '27 days ago',
  },
  {
    id: 'c',
    status: 'In Progress',
    actionName: 'job-name',
    applicationName: 'default/stocktrader',
    component: 'default/loyalty-level',
    age: '27 days ago',
  },
  {
    id: 'd',
    status: 'Failed',
    actionName: 'job-name',
    applicationName: 'default/stocktrader',
    component: 'default/loyalty-level',
    age: '27 days ago',
  },
];

export default class LandingPage extends PureComponent {
  render() {
    return (
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
          <TableContainer title={msgs.get('page.jobsView.title')}>

            <TableToolbar>
              <TableToolbarContent>
                <TableToolbarSearch onChange={onInputChange} />
                <Button
                  onClick={() => console.log('Clicking')}
                  size="small"
                  kind="primary"
                  renderIcon={Add20}
                  iconDescription={msgs.get('add.command.action')}
                >
                  {msgs.get('add.command.action')}
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
                          {cell.value === 'Completed' && <CheckmarkOutline20 className="kv--normal-icon job" /> }
                          {cell.value === 'Failed' && <ErrorFilled20 className="kv--problem-icon" /> }
                          {cell.value === 'Unknown' && <Unknown20 className="kv--unknown-icon" /> }
                          {cell.value === 'In Progress' && <Fade20 className="kv--inprogress-icon" /> }
                          {cell.info.header === 'action' ? <ActionsButtons disableRemoveButton /> : <span>{cell.value}</span>}
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
  }
}

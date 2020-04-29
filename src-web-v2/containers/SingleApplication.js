import React, { PureComponent } from 'react';
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
  WarningAltInvertedFilled20,
  WarningSquareFilled20,
} from '@carbon/icons-react';

import {
  ActionsDropdownMenu,
} from '../components';

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
    header: 'Name',
    key: 'name',
  },
  {
    header: 'Namespace',
    key: 'namespace',
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

export default class SingleApplication extends PureComponent {
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
          <TableContainer title="Applications">

            <TableToolbar>
              <TableToolbarContent>
                <TableToolbarSearch onChange={onInputChange} />
                <Button
                  onClick={() => console.log('Clicking')}
                  size="small"
                  kind="primary"
                  renderIcon={Add20}
                  iconDescription="Add Application"
                >
                  Add Application
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
                      {header.header}
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
                          <span>
                            {cell.value === 'Normal' && <CheckmarkOutline20 className="kv--normal-icon" /> }
                            {cell.value === 'Warning' && <WarningAltInvertedFilled20 className="kv--warning-icon" /> }
                            {cell.info.header === 'actions' ? <ActionsDropdownMenu /> : cell.value}
                          </span>
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

import React from 'react';

import { useParams } from 'react-router-dom';

import {
  Button,
  DataTable,
} from 'carbon-components-react';

import {
  Add20,
  CheckmarkOutline20,
  WarningAltInvertedFilled20,
} from '@carbon/icons-react';

import {
  ActionsButtons,
  SecondaryHeader,
  DropdownMenu,
} from '../components';

import msgs from '../../nls/kappnav.properties';

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
    header: 'Kind',
    key: 'kind',
  },
  {
    header: 'Namespace',
    key: 'namespace',
  },
  {
    header: 'Platform',
    key: 'platform',
  },
  {
    header: 'Action',
    key: 'action',
  },
];

const initialRows = [
  {
    id: 'a',
    name: 'a-component-part',
    kind: 'FakeService',
    platform: 'TheBestPlatform',
    status: 'Normal',
    namespace: 'kappnav',
  },
];

const SingleResource = () => {
  const params = useParams();

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
        <>
          <SecondaryHeader title={params.appName} rightButton={<DropdownMenu />} />

          <TableContainer title={msgs.get('page.componentView.title')}>

            <TableToolbar>
              <TableToolbarContent>
                <TableToolbarSearch onChange={onInputChange} />
                <Button
                  onClick={() => console.log('Clicking')}
                  size="small"
                  kind="primary"
                  renderIcon={Add20}
                  iconDescription={msgs.get('add.component')}
                >
                  {msgs.get('add.component')}
                </Button>
              </TableToolbarContent>
            </TableToolbar>

            <Table {...getTableProps()}>

              <TableHead>
                <TableRow>
                  {/* add the expand header before all other headers */}
                  <TableExpandHeader />
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
                    <TableExpandRow {...getRowProps({ row })}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>
                          <span>
                            {cell.value === 'Normal' && <CheckmarkOutline20 className="kv--normal-icon" /> }
                            {cell.value === 'Warning' && <WarningAltInvertedFilled20 className="kv--warning-icon" /> }
                            {cell.info.header === 'action' ? <ActionsButtons /> : cell.value}
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
        </>
      )}
    />
  );
};

export default SingleResource;

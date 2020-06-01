import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  DataTable,
  ModalWrapper,
  Button,
} from 'carbon-components-react';

import {
  HealthCross20,
  Add20,
  CheckmarkOutline20,
  WarningAltInvertedFilled20,
  WarningSquareFilled20,
} from '@carbon/icons-react';

import {
  SecondaryHeader,
} from '..';

import msgs from '../../../nls/kappnav.properties';

require('./ResourceTable.scss');

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

const ResourceTable = (props) => {
  const {
    listOfResources,
    buttonText,
    getStatusIcon,
    tableHeaders,
    actionButtons,
  } = props;

  return (
    <DataTable
      headers={tableHeaders}
      rows={listOfResources}
      render={({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getTableProps,
        onInputChange,
      }) => (
        <TableContainer>
          <TableToolbar>
            <TableToolbarContent>
              <TableToolbarSearch placeHolderText="Search by name, namespace or component" onChange={onInputChange} />
              <Button
                onClick={() => console.log('Clicking')}
                size="small"
                kind="primary"
                renderIcon={Add20}
                iconDescription={buttonText}
              >
                {buttonText}
              </Button>
            </TableToolbarContent>
          </TableToolbar>

          <Table {...getTableProps()}>

            <TableHead>
              <TableRow>
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
                        {/* FIXME: Find a better way to avoid unnecessary calls
                        to getStatusIcon for every cell */}
                        {getStatusIcon(cell.value)}
                        {cell.info.header === 'action' && actionButtons }
                        {/* FIXME: This logic is ugly.  We are relying on the else
                        clause to display the cell's text */}
                        {cell.info.header === 'name'
                          ? <Link to={`applications/${cell.value}`}>{cell.value}</Link>
                          : cell.value}
                      </TableCell>
                    ))}
                  </TableExpandRow>
                </React.Fragment>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      )}
    />
  );
};

ResourceTable.propTypes = {
  listOfResources: PropTypes.arrayOf(PropTypes.object).isRequired,
  buttonText: PropTypes.string.isRequired,
  // This is a function that will get the icon corresponding to the resource's status
  getStatusIcon: PropTypes.func.isRequired,
  // Headers for the Carbon `<DataTable>`
  tableHeaders: PropTypes.arrayOf(PropTypes.shape({
    header: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
  })).isRequired,
  // A React element (ie. <MyComponent />).
  actionButtons: PropTypes.element.isRequired,
};

export default ResourceTable;

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
  DataTableSkeleton,
  DataTable,
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
import ActionsButtons from '../buttons/ActionsButtons';

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
  TableExpandedRow, // TODO: Maybe for the first element on the list?
} = DataTable;

/**
 * returns list of React components (ie. <MyComponent />).
 */
const getActions = (list) => {
  const cloneList = _.cloneDeep(list);
  const {
    'cmd-actions': cmdActions,
    'url-actions': urlActions,
    deletable,
    editable,
  } = cloneList;

  const data = {
    cmdActions, urlActions, deletable, editable,
  };

  return <ActionsButtons {...data} />;
};

const ResourceTable = (props) => {
  const {
    renderCellContent,
    listOfResources,
    buttonText,
    tableHeaders,
    loading,
  } = props;

  if (loading) {
    return <DataTableSkeleton showHeader={false} />;
  }

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
                    {row.cells.map((cell) => {
                      const cellContent = renderCellContent(cell);
                      return (
                        <TableCell key={cell.id}>
                          {cellContent || cell.value}
                        </TableCell>
                      );
                    })}
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
  // Allow for custom rendering of cells if the default plaintext cell content
  // is undesirable.
  renderCellContent: PropTypes.func,
  listOfResources: PropTypes.arrayOf(PropTypes.object).isRequired,
  buttonText: PropTypes.string.isRequired,
  // Headers for the Carbon `<DataTable>`
  tableHeaders: PropTypes.arrayOf(PropTypes.shape({
    header: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
  })).isRequired,
  loading: PropTypes.bool,
};

ResourceTable.defaultProps = {
  loading: false,
  renderCellContent: (cell) => cell.value,
};

export default ResourceTable;

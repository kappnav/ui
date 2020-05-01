import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
  DataTable,
  OverflowMenu,
  OverflowMenuItem,
  Icon,
  Breadcrumb,
  BreadcrumbItem,
} from 'carbon-components-react';

import {
  WarningSquareFilled32,
} from '@carbon/icons-react';

class SecondaryHeader extends PureComponent {
  render() {
    return (
      <>
        <Breadcrumb noTrailingSlash>
          <BreadcrumbItem>
            <Link to="/applications">Applications</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <Link to="/applications/stock-trader">stock-trader</Link>
          </BreadcrumbItem>
        </Breadcrumb>

        <h1>
          stock-trader
          {' '}
          <span><WarningSquareFilled32 className="kv--problem-icon" /></span>
        </h1>
      </>
    );
  }
}

export default SecondaryHeader;

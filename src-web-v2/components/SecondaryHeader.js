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
  Dropdown,
} from 'carbon-components-react';

import msgs from '../../nls/kappnav.properties';

import {
  WarningSquareFilled32,
} from '@carbon/icons-react';

require('./SecondaryHeader.scss');

const defaultDropDownMenuItems = [
  {
    id: 'edit',
    msgId: 'modal.edit.application',
  },
  {
    id: 'remove',
    msgId: 'modal.remove.application',
  },
  {
    id: 'openshift',
    text: 'View in OpenShift',
  },
  {
    id: 'yaml',
    text: 'View YAML',
  },
];

const dropDownMenuProps = {
  id: 'actions-menu',
  items: defaultDropDownMenuItems,
  itemToString: (item) => (item?.msgId ? msgs.get(item?.msgId) : item?.text),
  label: msgs.get('actions'),
  size: 'xl',
  ariaLabel: msgs.get('actions'),
};

class SecondaryHeader extends PureComponent {
  render() {
    return (
      <>
        <Breadcrumb noTrailingSlash>
          <BreadcrumbItem>
            <Link to="/applications">{msgs.get('page.applicationView.title')}</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            {/* Deliberate placeholder here to get the trailing / from Carbon */}
            <></>
          </BreadcrumbItem>
        </Breadcrumb>


        <h1>
          stock-trader
          {' '}
          <span><WarningSquareFilled32 className="kv--problem-icon" /> Problem</span>
          <div className="kv--dropdown">
            <Dropdown {...dropDownMenuProps} />
          </div>
        </h1>

        <span className="kv--span">
          <h6>Namespace</h6>
          <p>Fake Namespace</p>
        </span>
      </>
    );
  }
}

export default SecondaryHeader;

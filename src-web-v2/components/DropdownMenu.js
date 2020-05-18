import React from 'react';
import {
  Dropdown,
} from 'carbon-components-react';

import msgs from '../../nls/kappnav.properties';

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

const DropdownMenu = () => (
  <Dropdown className="kv--dropdown" {...dropDownMenuProps} />
);

export default DropdownMenu;

import React from 'react';
import PropTypes from 'prop-types';
import {
  OverflowMenu,
  OverflowMenuItem,
} from 'carbon-components-react';

import _ from 'lodash';
import msgs from '../../../nls/kappnav.properties';

const ActionsDropdownMenu = (props) => {
  const { cmdActions, urlActions } = props;

  if (cmdActions.length + urlActions.length === 0) {
    // No need for a dropdown menu
    return <></>;
  }

  // Avoid mutating original parameters
  const cmdList = _.cloneDeep(cmdActions);
  const urlList = _.cloneDeep(urlActions);

  let urlMenuItems = [];
  // Transform list of actions into functional <OverflowMenuItems>
  urlMenuItems = urlList.map((itemProps, index) => {
    const {
      text,
      'text.nls': textNLS,
      description,
      'description.nls': descriptionNLS,
      name
    } = itemProps;
    const primaryFocus = index === 0;
    return (
      <OverflowMenuItem
        key={name}
        itemText={textNLS ? msgs.get(textNLS) : text}
        onClick={() => false} // FIXME: Implement me
        onFocus={(e) => {
          e.target.title = descriptionNLS ? msgs.get(descriptionNLS) : description;
        }}
        onMouseEnter={(e) => {
          e.target.title = descriptionNLS ? msgs.get(descriptionNLS) : description;
        }}
        primaryFocus={primaryFocus}
      />
    );
  });

  let cmdMenuItems = [];
  // Transform list of actions into functional <OverflowMenuItems>
  cmdMenuItems = cmdList.map((itemProps, index) => {
    const primaryFocus = index === 0;
    const {
      text,
      'text.nls': textNLS,
      description,
      'description.nls': descriptionNLS,
      name,
    } = itemProps;
    return (
      <OverflowMenuItem
        key={name}
        primaryFocus={primaryFocus}
        itemText={textNLS ? msgs.get(textNLS) : text}
        onClick={() => false} // FIXME: Implement me
        onFocus={(e) => {
          e.target.title = descriptionNLS ? msgs.get(descriptionNLS) : description;
        }}
        onMouseEnter={(e) => {
          e.target.title = descriptionNLS ? msgs.get(descriptionNLS) : description;
        }}
      />
    );
  });

  return (
    // FIXME: This needs to be replaced by the logic common.js
    <OverflowMenu className="kv--overflow-menu" flipped>
      {urlMenuItems}
      {cmdMenuItems}
    </OverflowMenu>
  );
};

ActionsDropdownMenu.propTypes = {
  cmdActions: PropTypes.arrayOf(PropTypes.object), // TODO: Expand object to key/value
  urlActions: PropTypes.arrayOf(PropTypes.object), // TODO: Expand object to key/value
};

ActionsDropdownMenu.defaultProps = {
  cmdActions: [],
  urlActions: [],
};

export default ActionsDropdownMenu;

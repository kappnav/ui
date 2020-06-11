import React from 'react';
import PropTypes from 'prop-types';
import {
  OverflowMenu,
  OverflowMenuItem,
} from 'carbon-components-react';

import _ from 'lodash';

const ActionsDropdownMenu = (props) => {
  const { listOfActions } = props;

  if (!listOfActions) {
    // Since listOfActions is optional, check it
    return <></>;
  }

  // Avoid mutating original parameters
  const list = _.cloneDeep(listOfActions);

  let listOfMenuItems = [];
  // Transform list of actions into functional <OverflowMenuItems>
  listOfMenuItems = list.map((itemProps, index) => {
    const primaryFocus = index === 0;
    return <OverflowMenuItem {...itemProps} primaryFocus={primaryFocus} />;
  });

  return (
    <OverflowMenu className="kv--overflow-menu" flipped>
      {listOfMenuItems}
    </OverflowMenu>
  );
};

{ /* <OverflowMenuItem key={itemId + action}
primaryFocus={staticindex === 0}
itemText={msgs.get('table.actions.'+action)}
onClick={openModal.bind(this, action, cloneData)}
onFocus={(e) => {e.target.title = msgs.get('table.actions.'+action)}}
onMouseEnter={(e) => {e.target.title = msgs.get('table.actions.'+action)}} />
)) */ }

ActionsDropdownMenu.propTypes = {
  listOfActions: PropTypes.arrayOf(PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    itemText: PropTypes.string.isRequired, // This has to be translated
  })),
};

ActionsDropdownMenu.defaultProps = {
  listOfActions: undefined,
};

export default ActionsDropdownMenu;

import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import {
  Tabs,
  Tab,
} from 'carbon-components-react';

import {
  ApplicationTable,
  ActionHistoryTable,
} from '../components';

import msgs from '../../nls/kappnav.properties';
import ActionHistoryResourceTable from '../components/tables/ActionHistoryTable';

require('./LandingPage.scss');

// This is used to avoid rendering tab content unless the tab is selected
const TabContentRenderedOnlyWhenSelected = ({
  selected,
  children,
  className,
  ...other
}) => (!selected ? (
  <div {...other} className="bx--visually-hidden" />
) : (
  <div
    {...other}
    className="bx--tab-content"
    selected={selected}
  >
    {children}
  </div>
));

/**
 * @return {int} - the tab number corresponding to the URL
 */
const getSelectedTab = (location) => {
  const path = location.pathname;
  const pathAsArray = path?.split('/')?.filter((indexItem) => indexItem != null);
  const lastDirectory = pathAsArray[pathAsArray?.length - 1];
  switch (lastDirectory) {
    case 'applications':
      return 0;
    case 'actions':
      return 1;
    default:
      return 0;
  }
};

const handleTabClick = (history, uri) => {
  // FIXME: There is a possible browser back button infinite loop here
  history.push(uri);
};

const LandingPage = () => {
  const location = useLocation();
  const history = useHistory();
  return (
    <Tabs className="kv--tabs" selected={getSelectedTab(location)}>
      {/* FIXME: These tabs need to be dymanic based on Redux or something */}
      <Tab
        label={msgs.get('page.applicationView.title')}
        renderContent={TabContentRenderedOnlyWhenSelected}
        onClick={() => handleTabClick(history, 'applications')}
      >
        <ApplicationTable />
      </Tab>
      <Tab label={msgs.get('actions.history')} renderContent={TabContentRenderedOnlyWhenSelected} onClick={() => handleTabClick(history, 'actions')}>
        <ActionHistoryTable />
      </Tab>
    </Tabs>
  );
};

export default LandingPage;

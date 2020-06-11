import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import {
  ApplicationTable,
  ActionHistoryTable,
} from '../components';

require('./LandingPage.scss');

/**
 * @return {String} - get the resource type from URL
 */
const getResourceTypeFromURL = (location) => {
  const path = location.pathname;
  const pathAsArray = path?.split('/')?.filter((indexItem) => indexItem != null);
  const lastDirectory = pathAsArray[pathAsArray?.length - 1];
  return lastDirectory;
};

const LandingPage = () => {
  const location = useLocation();
  const resourcePage = getResourceTypeFromURL(location);
  switch (resourcePage) {
    case 'applications':
      return <ApplicationTable />;
    case 'actions':
      return <ActionHistoryTable />;
    default:
      // FIXME: Maybe 404 page or redirect to homepage
      return <ApplicationTable />;
  }
};

export default LandingPage;

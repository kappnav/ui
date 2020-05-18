import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbItem,
} from 'carbon-components-react';

import {
  WarningSquareFilled32,
} from '@carbon/icons-react';
import msgs from '../../nls/kappnav.properties';

require('./SecondaryHeader.scss');

const SecondaryHeader = (props) => {
  const { rightButton, title } = props;
  return (
    <div className="kv--secondary-header-container">
      <div className="kv--secondary-header-left">
        <Breadcrumb noTrailingSlash>
          <BreadcrumbItem>
            <Link to="/applications">{msgs.get('page.applicationView.title')}</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            {/* Deliberate placeholder here to get the trailing / from Carbon and
              hide the current page in the breadcrumb */}
            <></>
          </BreadcrumbItem>
        </Breadcrumb>

        <h1>
          { title }
          {' '}
          <span>
            <WarningSquareFilled32 className="kv--problem-icon" />
            {' '}
            Problem
          </span>

        </h1>

        <span className="kv--span">
          <h6>Namespace</h6>
          <p>Fake Namespace</p>
        </span>
      </div>
      <div className="kv--secondary-header-right">
        {rightButton}
      </div>
    </div>
  );
};

SecondaryHeader.propTypes = {
  rightButton: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default SecondaryHeader;

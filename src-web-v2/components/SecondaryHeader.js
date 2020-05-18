import React from 'react';
import PropTypes from 'prop-types';
import { Link, useParams, useLocation } from 'react-router-dom';


import {
  Breadcrumb,
  BreadcrumbItem,
} from 'carbon-components-react';

import {
  WarningSquareFilled32,
} from '@carbon/icons-react';
import msgs from '../../nls/kappnav.properties';

require('./SecondaryHeader.scss');

const BreadCrumb = () => {
  const location = useLocation();
  const paths = location?.pathname?.split('/');
  if (!paths) {
    return <></>;
  }
  return (
    // ***********************************
    // Convert the location to breadcrumbs
    // ***********************************
    <Breadcrumb noTrailingSlash>
      {paths.map(
        (path, index) => {
          if (index === 0) {
            // Ignore the context root kappnav-ui
            return false;
          }
          if (index === paths.length - 1) {
            // Do not display the current page in the breadcrumb
            return (
              <BreadcrumbItem isCurrentPage>
                {/* Deliberate placeholder here to get the trailing / from Carbon and
                  hide the current page in the breadcrumb */}
                <></>
              </BreadcrumbItem>
            );
          }
          return (
            <BreadcrumbItem>
              {/* FIXME: This is still hardcoded to a message key.  The to={} might also
                be lacking ability to handle paths longer than 3  */}
              <Link to={`/${path}`}>{msgs.get('page.applicationView.title')}</Link>
            </BreadcrumbItem>
          );
        },
      )}
    </Breadcrumb>
  );
};

const SecondaryHeader = (props) => {
  const {
    showBreadCrumb, rightButton, title, secondaryTitle, status,
  } = props;

  return (
    <div className="kv--secondary-header-container">
      <div className="kv--secondary-header-left">
        {showBreadCrumb && <BreadCrumb />}
        <h1>
          { title }
          { status }
        </h1>
        { secondaryTitle }
        {/* <div>
          <WarningSquareFilled32 className="kv--problem-icon" />
          <span>Problem</span>
        </div> */}
        {/* <span className="kv--span">
          <h6>Namespace</h6>
          <p>Fake Namespace</p>
        </span> */}
      </div>
      <div className="kv--secondary-header-right">
        {rightButton}
      </div>
    </div>
  );
};

SecondaryHeader.propTypes = {
  showBreadCrumb: PropTypes.bool,
  rightButton: PropTypes.element,
  title: PropTypes.string.isRequired,
  status: PropTypes.element,
  secondaryTitle: PropTypes.node,
};

SecondaryHeader.defaultProps = {
  showBreadCrumb: true,
  rightButton: <></>,
  status: <></>,
  secondaryTitle: <></>,
};

export default SecondaryHeader;

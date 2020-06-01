import _ from 'lodash';
import {
  FETCH_APPLICATIONS_PENDING, FETCH_APPLICATIONS_SUCCESS, FETCH_APPLICATIONS_ERROR,
} from '../actions';

import msgs from '../../../nls/kappnav.properties';

const initialState = {
  pending: true,
  data: [],
  error: '',
};

// Format the data to fit the needs of Carbon.
function formatApplicationData(array) {
  const tableRows = array.map((item) => ({
    id: item.application?.metadata?.uid,
    name: item.application?.metadata?.name,
    status: item.application?.metadata?.annotations?.['kappnav.status.value'],
    namespace: item.application?.metadata?.namespace,
  }));
  return tableRows;
}

const applicationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_APPLICATIONS_PENDING:
      return {
        ...state, // do this to avoid mutating original state
        pending: true,
      };
    case FETCH_APPLICATIONS_SUCCESS: {
      // Avoid any modification to the original arguments, per Redux guidelines
      const applications = _.cloneDeep(action.payload);
      const formattedData = formatApplicationData(applications);
      return {
        ...state, // do this to avoid mutating original state
        pending: false,
        data: formattedData,
      };
    }
    case FETCH_APPLICATIONS_ERROR:
      return {
        ...state, // do this to avoid mutating original state
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default applicationsReducer;

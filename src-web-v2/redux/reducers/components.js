import _ from 'lodash';
import {
  FETCH_COMPONENTS_PENDING, FETCH_COMPONENTS_SUCCESS, FETCH_COMPONENTS_ERROR,
} from '../actions';

import msgs from '../../../nls/kappnav.properties';

const initialState = {
  pending: true,
  data: {},
  error: null,
};

// Format the data to fit the needs of Carbon.
const formatComponentsData = (array) => {
  const tableRows = array.map((item) => ({
    id: item?.metadata?.uid,
    status: item?.metadata?.annotations?.['kappnav.status.value'],
    name: item?.metadata?.annotations?.['kappnav-job-action-text'],
    kind: item?.kind,
    namespace: item?.metadata?.namespace,
  }));
  return tableRows;
};

const componentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMPONENTS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_COMPONENTS_SUCCESS: {
      // Avoid any modification to the original arguments, per Redux guidelines
      const commands = _.cloneDeep(action.payload);
      const formattedData = formatComponentsData(commands);
      return {
        ...state,
        pending: false,
        data: formattedData,
      };
    }
    case FETCH_COMPONENTS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default componentsReducer;

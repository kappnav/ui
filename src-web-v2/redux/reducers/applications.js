import _ from 'lodash';
import {
  FETCH_APPLICATIONS_PENDING, FETCH_APPLICATIONS_SUCCESS, FETCH_APPLICATIONS_ERROR,
  FETCH_SINGLE_APP_PENDING, FETCH_SINGLE_APP_SUCCESS, FETCH_SINGLE_APP_ERROR,
  DELETE_APPLICATIONS_PENDING, DELETE_APPLICATIONS_SUCCESS, DELETE_APPLICATIONS_ERROR,
} from '../actions';

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
    labels: item.application?.metadata?.labels,
    annotations: item.application?.metadata?.annotations,
    action: {
      urlActions: item?.['action-map']?.['url-actions'] || [],
      cmdActions: item?.['action-map']?.['cmd-actions'] || [],
      deletable: true, // default action for all
      editable: false,
    },
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
    case FETCH_SINGLE_APP_PENDING:
      return {
        ...state, // do this to avoid mutating original state
        pending: true,
      };
    case FETCH_SINGLE_APP_SUCCESS: {
      // Avoid any modification to the original arguments, per Redux guidelines
      const application = _.cloneDeep(action.payload);
      const formattedData = formatApplicationData(application);
      return {
        ...state, // do this to avoid mutating original state
        pending: false,
        data: formattedData, // FIXME: We need to change this to update a single app info in the applicationS redux space
      };
    }
    case FETCH_SINGLE_APP_ERROR:
      return {
        ...state, // do this to avoid mutating original state
        pending: false,
        error: action.error,
      };
    case DELETE_APPLICATIONS_PENDING:
      return {
        ...state, // do this to avoid mutating original state
        pending: true,
      };
    case DELETE_APPLICATIONS_SUCCESS: {
      const { applicationName, applicationNamespace } = action;
      // Delete the targeted application from Redux
      // filter() does not mutate the array on which it is called.
      const newState = state?.filter(
        (data) => (data?.name !== applicationName && data?.namespace !== applicationNamespace),
      );
      return {
        ...newState,
        pending: false,
      };
    }
    case DELETE_APPLICATIONS_ERROR:
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

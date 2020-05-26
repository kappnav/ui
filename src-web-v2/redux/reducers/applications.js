import {
  FETCH_APPLICATIONS_PENDING, FETCH_APPLICATIONS_SUCCESS, FETCH_APPLICATIONS_ERROR,
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
  }));
  return tableRows;
}

const applicationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_APPLICATIONS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_APPLICATIONS_SUCCESS: {
      const formattedData = formatApplicationData(action.payload);
      return {
        ...state,
        pending: false,
        data: formattedData, // do this to avoid mutating state
      };
    }
    case FETCH_APPLICATIONS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default applicationsReducer;

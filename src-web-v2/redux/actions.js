//
// Action Types ===================================================================================
//
export const FETCH_APPLICATIONS_PENDING = 'FETCH_APPLICATIONS_PENDING';
export const FETCH_APPLICATIONS_SUCCESS = 'FETCH_APPLICATIONS_SUCCESS';
export const FETCH_APPLICATIONS_ERROR = 'FETCH_APPLICATIONS_ERROR';

export const FETCH_COMMANDS_PENDING = 'FETCH_COMMANDS_PENDING';
export const FETCH_COMMANDS_SUCCESS = 'FETCH_COMMANDS_SUCCESS';
export const FETCH_COMMANDS_ERROR = 'FETCH_COMMANDS_ERROR';
//
// Action Creators ================================================================================
//
export const fetchApplicationsPending = () => (
  {
    type: FETCH_APPLICATIONS_PENDING,
  }
);

export const fetchApplicationsSuccess = (applications) => (
  {
    type: FETCH_APPLICATIONS_SUCCESS,
    payload: applications,
  }
);

export const fetchApplicationsError = (error) => (
  {
    type: FETCH_APPLICATIONS_ERROR,
    error: error.message,
  }
);

export const fetchCommandsPending = () => (
  {
    type: FETCH_COMMANDS_PENDING,
  }
);

export const fetchCommandsSuccess = (commands) => (
  {
    type: FETCH_COMMANDS_SUCCESS,
    payload: commands,
  }
);

export const fetchCommandsError = (error) => (
  {
    type: FETCH_COMMANDS_ERROR,
    error: error.message,
  }
);

// This is a generic Action Creator to reduce the need
// to create many boilerplate methods for each new action
function makeActionCreator(type, ...argNames) {
  return (...args) => {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

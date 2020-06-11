//
// Action Types ===================================================================================
//
export const FETCH_APPLICATIONS_PENDING = 'FETCH_APPLICATIONS_PENDING';
export const FETCH_APPLICATIONS_SUCCESS = 'FETCH_APPLICATIONS_SUCCESS';
export const FETCH_APPLICATIONS_ERROR = 'FETCH_APPLICATIONS_ERROR';

export const DELETE_APPLICATIONS_PENDING = 'DELETE_APPLICATIONS_PENDING';
export const DELETE_APPLICATIONS_SUCCESS = 'DELETE_APPLICATIONS_SUCCESS';
export const DELETE_APPLICATIONS_ERROR = 'DELETE_APPLICATIONS_ERROR';

export const FETCH_COMMANDS_PENDING = 'FETCH_COMMANDS_PENDING';
export const FETCH_COMMANDS_SUCCESS = 'FETCH_COMMANDS_SUCCESS';
export const FETCH_COMMANDS_ERROR = 'FETCH_COMMANDS_ERROR';

export const FETCH_COMPONENTS_PENDING = 'FETCH_COMPONENTS_PENDING';
export const FETCH_COMPONENTS_SUCCESS = 'FETCH_COMPONENTS_SUCCESS';
export const FETCH_COMPONENTS_ERROR = 'FETCH_COMPONENTS_ERROR';
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

export const deleteApplicationPending = () => (
  {
    type: DELETE_APPLICATIONS_PENDING,
  }
);

/**
 * @param {String} applicationName - application name
 * @param {String} applicationNamespace - application's namespace
 */
export const deleteApplicationSuccess = (applicationName, applicationNamespace) => (
  {
    type: DELETE_APPLICATIONS_SUCCESS,
    applicationName,
    applicationNamespace,
  }
);

export const deleteApplicationError = (error) => (
  {
    type: DELETE_APPLICATIONS_ERROR,
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

export const fetchComponentsPending = () => (
  {
    type: FETCH_COMPONENTS_PENDING,
  }
);

export const fetchComponentsSuccess = (components) => (
  {
    type: FETCH_COMPONENTS_SUCCESS,
    payload: components,
  }
);

export const fetchComponentsError = (error) => (
  {
    type: FETCH_COMPONENTS_ERROR,
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

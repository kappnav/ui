import {
  deleteApplicationPending,
  deleteApplicationSuccess,
  deleteApplicationError,
} from './actions';
import { defaultOptions } from './defaultFetchOptions';

/**
 * @param {String} applicationName - the name of the target application
 * @param {String} applicationNamespace - the namespace of the application
 */
function deleteApplication(applicationName, applicationNamespace) {
  return (dispatch) => {
    dispatch(deleteApplicationPending());
    const apiUrl = `/kappnav/applications/${applicationName}?namespace=${applicationNamespace}`;
    fetch(apiUrl, { ...defaultOptions, method: 'DELETE' })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP response code ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((res) => {
        dispatch(deleteApplicationSuccess(applicationName, applicationNamespace));
        return res;
      })
      .catch((error) => {
        dispatch(deleteApplicationError(error));
      });
  };
}

export default deleteApplication;

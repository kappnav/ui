import { fetchSingleAppPending, fetchSingleAppSuccess, fetchSingleAppError } from './actions';
import { defaultOptions } from './defaultFetchOptions';

/**
 * @param {*} applicationName - the application name
 * @param {*} applicationNamespace - the namespace where the application resides
 */
function fetchSingleApp(applicationName, applicationNamespace) {
  return (dispatch) => {
    dispatch(fetchSingleAppPending(), defaultOptions);
    fetch(`/kappnav/application/${applicationName}?namespace=${applicationNamespace}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP response code ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((res) => {
        dispatch(fetchSingleAppSuccess(res.application));
        return res.application;
      })
      .catch((error) => {
        dispatch(fetchSingleAppError(error));
      });
  };
}

export default fetchSingleApp;

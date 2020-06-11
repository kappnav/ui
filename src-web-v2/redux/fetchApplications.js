import { fetchApplicationsPending, fetchApplicationsSuccess, fetchApplicationsError } from './actions';
import { defaultOptions } from './defaultFetchOptions';

function fetchApplications() {
  return (dispatch) => {
    dispatch(fetchApplicationsPending(), defaultOptions);
    fetch('/kappnav/applications')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP response code ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((res) => {
        dispatch(fetchApplicationsSuccess(res.applications));
        return res.applications;
      })
      .catch((error) => {
        dispatch(fetchApplicationsError(error));
      });
  };
}

export default fetchApplications;

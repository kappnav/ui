import { fetchApplicationsPending, fetchApplicationsSuccess, fetchApplicationsError } from './actions';

function fetchApplications() {
  return (dispatch) => {
    dispatch(fetchApplicationsPending());
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

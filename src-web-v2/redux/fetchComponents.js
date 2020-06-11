import { fetchComponentsPending, fetchComponentsSuccess, fetchComponentsError } from './actions';
import { defaultOptions } from './defaultFetchOptions';

function fetchComponents(applicationName, namespace) {
  return (dispatch) => {
    dispatch(fetchComponentsPending());
    fetch(`/kappnav/resource/commands/${applicationName}?namespace=${namespace}`, defaultOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP response code ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((res) => {
        dispatch(fetchComponentsSuccess(res.components));
        return res.commands;
      })
      .catch((error) => {
        dispatch(fetchComponentsError(error));
      });
  };
}

export default fetchComponents;

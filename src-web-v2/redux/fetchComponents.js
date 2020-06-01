import { fetchComponentsPending, fetchComponentsSuccess, fetchComponentsError } from './actions';

function fetchComponents(applicationName, namespace) {
  return (dispatch) => {
    dispatch(fetchComponentsPending());
    fetch(`/kappnav/resource/commands/${applicationName}?namespace=${namespace}`)
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

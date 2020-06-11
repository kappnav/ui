import { fetchCommandsPending, fetchCommandsSuccess, fetchCommandsError } from './actions';
import { defaultOptions } from './defaultFetchOptions';

function fetchCommands() {
  return (dispatch) => {
    dispatch(fetchCommandsPending());
    fetch('/kappnav/resource/commands', defaultOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP response code ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((res) => {
        dispatch(fetchCommandsSuccess(res.commands));
        return res.commands;
      })
      .catch((error) => {
        dispatch(fetchCommandsError(error));
      });
  };
}

export default fetchCommands;

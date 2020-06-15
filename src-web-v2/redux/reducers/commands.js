import _ from 'lodash';
import {
  FETCH_COMMANDS_PENDING, FETCH_COMMANDS_SUCCESS, FETCH_COMMANDS_ERROR,
} from '../actions';

import msgs from '../../../nls/kappnav.properties';

const initialState = {
  pending: true,
  data: {},
  error: null,
};

const jobIsActive = (job) => {
  if (!job && !job.status.active) {
    return false;
  }
  return job.status.active > 0;
};

const jobIsPending = (job) => (
  // If none of these fields exist, the assumption is that
  // the job is pending
  !job && !job.status.active
       && !job.status.succeeded
       && !job.status.failed
);

const jobSucceeded = (job) => {
  if (!job && !job.status.succeeded) {
    return false;
  }
  return job.status.succeeded > 0;
};

const jobFailed = (job) => {
  if (!job && !job.status.failed) {
    return false;
  }
  return job.status.failed > 0;
};

const getStatus = (job) => {
  let result = { status: 'Unknown', statusText: msgs.get('unknown') };
  if (!job) {
    return result; // return Unknown
  }

  let status = ''; // Case sensitive!
  let statusText = '';
  if (jobIsActive(job)) {
    status = 'In Progress';
    statusText = msgs.get('in.progress');
  } else if (jobIsPending(job)) {
    status = 'Pending';
    statusText = msgs.get('pending');
  } else if (jobFailed(job)) {
    status = 'Failed';
    statusText = msgs.get('failed');
  } else if (jobSucceeded(job)) {
    status = 'Completed';
    statusText = msgs.get('completed');
  } else {
    status = 'Unknown';
    statusText = msgs.get('unknown');
  }

  result = { status, statusText };

  return result;
};

// Format the data to fit the needs of Carbon.
const formatCommmandData = (array) => {
  const tableRows = array.map((item) => ({
    id: item?.metadata?.uid,
    name: item?.metadata?.annotations?.['kappnav-job-action-text'],
    status: getStatus(item).status, // FIXME: Needs PII
    namespace: item?.metadata?.namespace,
    deletable: true, // default action for all
  }));
  return tableRows;
};

const commandsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMANDS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_COMMANDS_SUCCESS: {
      // Avoid any modification to the original arguments, per Redux guidelines
      const commands = _.cloneDeep(action.payload);
      const formattedData = formatCommmandData(commands);
      return {
        ...state,
        pending: false,
        data: formattedData,
      };
    }
    case FETCH_COMMANDS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default commandsReducer;

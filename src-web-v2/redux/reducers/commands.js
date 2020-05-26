import {
  FETCH_COMMANDS_PENDING, FETCH_COMMANDS_SUCCESS, FETCH_COMMANDS_ERROR,
} from '../actions';

const initialState = {
  pending: true,
  data: {},
  error: null,
};

const commandsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMANDS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_COMMANDS_SUCCESS:
      return {
        ...state,
        pending: false,
        ...action.payload, // Redux best practice: Do this to avoid mutating original state
      };
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

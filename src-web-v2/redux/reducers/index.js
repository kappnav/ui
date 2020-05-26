import { combineReducers } from 'redux';
import applications from './applications';
import commands from './commands';

export default combineReducers({
  applications,
  commands,
});

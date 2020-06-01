import { combineReducers } from 'redux';
import applications from './applications';
import commands from './commands';
import components from './components';

export default combineReducers({
  applications,
  commands,
  components,
});

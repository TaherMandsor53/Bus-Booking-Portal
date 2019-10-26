import { combineReducers } from 'redux';

import userDetails from '../reducer/LoginReducer';
import busDetails from '../reducer/BusDetailsReducer';

export default combineReducers({
  userDetails,
  busDetails,
});

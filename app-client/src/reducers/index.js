import globalNotification from '../core/reducers';
import auth from '../features/user/reducers';
import { combineReducers } from 'redux';

const PropertyManager = combineReducers({
  globalNotification,
  auth,
});

export default PropertyManager;

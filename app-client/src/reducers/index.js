import globalMessage from '../core/reducers';
import auth from '../features/user/reducers';
import { combineReducers } from 'redux';

const PropertyManager = combineReducers({
  globalMessage,
  auth,
});

export default PropertyManager;

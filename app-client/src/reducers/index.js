import auth from '../features/user/reducers';
import { combineReducers } from 'redux';

const PropertyManager = combineReducers({
  auth,
});

export default PropertyManager;

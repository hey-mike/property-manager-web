import { combineReducers } from 'redux';
import user from '../features/user/reducers';

const PropertyManager = combineReducers({
  user,
});

export default PropertyManager;

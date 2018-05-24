import user from '../features/user/reducers';
import { combineReducers } from 'redux';

const PropertyManager = combineReducers({
  user,
});

export default PropertyManager;

import { combineReducers } from 'redux';
import user from '../features/user/reducers';

console.log(user);

const PropertyManager = combineReducers({
  user,
});

export default PropertyManager;

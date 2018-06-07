import globalNotification from '../core/reducers/globalNotification';
import globalMessage from '../core/reducers/globalMessage';
import auth from '../features/user/reducers';
import tenant from '../features/tenant/reducers';
import { combineReducers } from 'redux';

const PropertyManager = combineReducers({
  globalNotification,
  globalMessage,
  auth,
  tenant,
});

export default PropertyManager;

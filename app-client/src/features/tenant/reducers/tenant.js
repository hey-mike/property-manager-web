import * as types from '../actions/actionTypes';

const initSate = {
  tenants: [],
  updatedTenant: {},
  totalCount: 0,
  isFetching: false,
  failed: false,
  deletedTenants: [],
  pageSize: 10,
  pageNum: 1,
  offset: 0,
};
const tenant = (state = initSate, action) => {
  switch (action.type) {
    case types.SEND_TENANT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case types.TURN_ON_FILTER:
      return Object.assign({}, state, {
        openFilter: true,
      });
    case types.TURN_OFF_FILTER:
      return Object.assign({}, state, {
        openFilter: false,
      });
    // case types.REQUEST_SERVER_ERROR:
    //   // console.log('REQUEST_SERVER_ERROR', action);
    //   return Object.assign({}, state, {
    //     error: action.error,
    //     receivedAt: action.receivedAt,
    //     isFetching: false,
    //   });

    case types.LOAD_TENANTS_SUCCESS:
      // console.log('LOAD_TENANTS_SUCCESS');
      return Object.assign({}, state, {
        tenants: action.data.tenants,
        totalCount: action.data.totalCount,
        isFetching: false,
        pageNum: action.data.pageNum,
        offset: action.data.offset,
        receivedAt: action.receivedAt,
      });

    case types.CREATE_TENANT_SUCCESS:
      // console.log('CREATE_TENANT_SUCCESS');
      const updatedTenant = action.tenant;
      return Object.assign({}, state, {
        tenants: [updatedTenant, ...state.tenants],
        receivedAt: action.receivedAt,
        isFetching: false,
      });
    case types.READ_TENANT_SUCCESS:
      return Object.assign({}, state, {
        currentTenant: action.tenant,
        receivedAt: action.receivedAt,
        isFetching: false,
      });
    case types.UPDATE_TENANT_SUCCESS:
      const updatedTenants = state.tenants.map(tenant => {
        if (tenant._id === action.tenant._id) {
          return action.tenant;
        }
        return tenant;
      });
      return Object.assign({}, state, {
        tenants: updatedTenants,
        updatedTenant: action.tenant,
        receivedAt: action.receivedAt,
        isFetching: false,
      });

    case types.DELETE_TENANT_SUCCESS:
      // console.log('DELETE_TENANT_SUCCESS');
      const newTenants = state.tenants.filter(
        tenant => action.tenantIds.indexOf(tenant._id) === -1
      );
      return Object.assign({}, state, {
        tenants: newTenants,
        deletedTenants: state.deletedTenants.concat(action.tenantIds),
        isFetching: false,
        receivedAt: action.receivedAt,
      });
    default:
      return state;
  }
};

export default tenant;

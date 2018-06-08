import * as types from './actionTypes';
import TenatService from '../tenant.service';
import queryString from 'query-string';
import {
  addSuccessMessage,
  addErrorMessage,
} from '../../../core/actions/messageActions';

import { notification } from 'antd';

export const requestTenantsError = error => ({
  type: types.REQUEST_SERVER_ERROR,
  error: error,
  receivedAt: Date.now(),
});

export const sendRequest = () => ({
  type: types.SEND_TENANT_REQUEST,
});

export const requestTenantsSuccess = data => ({
  type: types.LOAD_TENANTS_SUCCESS,
  data,
  receivedAt: Date.now(),
});
export const readTenantSuccess = data => ({
  type: types.READ_TENANT_SUCCESS,
  data,
  receivedAt: Date.now(),
});
export const createTenantSuccess = (employee, history) => {
  // history.push({
  //   pathname: `/employee/${employee._id}`
  // })
  return {
    type: types.CREATE_TENANT_SUCCESS,
    employee,
    receivedAt: Date.now(),
  };
};
export const updateTenantSuccess = (employee, history) => {
  return {
    type: types.UPDATE_TENANT_SUCCESS,
    employee,
    receivedAt: Date.now(),
  };
};
export const deleteTenantSuccess = employeeIds => ({
  type: types.DELETE_TENANT_SUCCESS,
  employeeIds,
  receivedAt: Date.now(),
});

const convertedTenant = employee => {
  employee.createdAt = new Date(employee.createdAt);
  if (employee.completionDate) {
    employee.completionDate = new Date(employee.completionDate);
  }
  return employee;
};

export const fetchTenants = (location, page_size) => dispatch => {
  const query = Object.assign({}, queryString.parse(location.search));
  const pageStr = query._page;

  delete query._page;
  query._offset = pageStr ? (parseInt(pageStr, 10) - 1) * page_size : 0;
  query._limit = page_size;

  const search = Object.keys(query)
    .map(k => `${k}=${query[k]}`)
    .join('&');

  dispatch(sendRequest());
  return TenatService.getAllTenants(search)
    .then(response => {
      if (!response.ok)
        return response.json().then(error => Promise.reject(error));
      response.json().then(data => {
        const employees = data.records;
        employees.forEach(employee => {
          employee.createdAt = new Date(employee.createdAt);
          if (employee.completionDate) {
            employee.completionDate = new Date(employee.completionDate);
          }
        });

        dispatch(
          requestTenantsSuccess({
            pageNum: pageStr ? parseInt(pageStr, 0) : 1,
            offset: query._offset,
            employees,
            totalCount: data.metadata.totalCount,
          })
        );
        dispatch(addSuccessMessage('Load employees successfull'));
      });
    })
    .catch(err => {
      const errorMsg = `Error in fetching data from server: ${err.message}`;
      console.log('errorMsg', errorMsg);
      dispatch(addErrorMessage(errorMsg));
    });
};

const shouldFetchTenants = (location, state) => {
  const employeeState = state.employeeState;
  if (!employeeState.employees.length) {
    return true;
  } else if (employeeState.isFetching) {
    return false;
  }
  return false;
};

export const fetchTenantsIfNeeded = (location, page_size) => (
  dispatch,
  getState
) => {
  if (shouldFetchTenants(location, getState())) {
    return dispatch(fetchTenants(location, page_size));
  }
};

export const createTenant = (employee, history) => {
  return dispatch => {
    dispatch(sendRequest());

    TenatService.createTenant(employee)
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => {
            dispatch(requestTenantsError(error));
            dispatch(addErrorMessage(error));
          });
        }
        response.json().then(updatedTenant => {
          updatedTenant = convertedTenant(updatedTenant);
          dispatch(createTenantSuccess(updatedTenant, history));
          notification.success({
            message: 'Create employee successfully',
          });
        });
      })
      .catch(error => {
        const errorMsg = `Error in sending data to server: ${error.message}`;
        dispatch(addErrorMessage(errorMsg));
      });
  };
};

export const readTenant = id => {
  return dispatch => {
    dispatch(sendRequest());
    TenatService.readTenant(id)
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => {
            dispatch(requestTenantsError(error));
            dispatch(addErrorMessage(error));
          });
        }
        response.json().then(employee => {
          console.log('employee', employee);
          employee = convertedTenant(employee);
          dispatch(readTenantSuccess(employee));
        });
      })
      .catch(error => {
        const errorMsg = `Error in sending data to server: ${error.message}`;
        dispatch(requestTenantsError(errorMsg));
      });
  };
};

export const updateTenant = (employee, history) => {
  return dispatch => {
    dispatch(sendRequest());
    TenatService.updateTenant(employee)
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => {
            const errorMsg = `Failed to update employee ${error.message}`;
            notification.error({
              message: errorMsg,
            });
          });
        }
        response.json().then(updatedTenant => {
          updatedTenant = convertedTenant(updatedTenant);
          notification.success({
            message: 'Update employee successfully',
          });
          return dispatch(updateTenantSuccess(updatedTenant, history));
        });
      })
      .catch(error => {
        const errorMsg = `Error in sending data to server: ${error.message}`;
        notification.error({
          message: errorMsg,
        });
      });
  };
};
export const deleteTenant = (id, history) => {
  return dispatch => {
    dispatch(sendRequest());
    TenatService.deleteTenant(id)
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => {
            const errorMsg = `Failed to delete employee ${error.message}`;
            notification.error({
              message: errorMsg,
            });
          });
        }
        return dispatch(deleteTenantSuccess(id, history));
      })
      .catch(error => {
        const errorMsg = `Error in sending data to server: ${error.message}`;
        notification.error({
          message: errorMsg,
        });
        // dispatch(requestTenantsError(errorMsg))
      });
  };
};
export const deleteBulkTenant = employeeIds => {
  return dispatch => {
    dispatch(sendRequest());
    TenatService.deleteBulkTenant(employeeIds)
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => {
            const errorMsg = `Failed to delete employee`;
            dispatch(requestTenantsError(errorMsg));
          });
        }
        return dispatch(deleteTenantSuccess(employeeIds));
      })
      .catch(error => {
        const errorMsg = `Error in sending data to server: ${error.message}`;
        dispatch(requestTenantsError(errorMsg));
      });
  };
};

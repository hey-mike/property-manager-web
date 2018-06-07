import * as types from './actionTypes';
import employeeApi from '../services/api/employeeApi';
import queryString from 'query-string';

import { notification, message } from 'antd';

// export const requestEmployeesError = error => ({
//   type: types.REQUEST_SERVER_ERROR,
//   error: error,
//   receivedAt: Date.now(),
// });

export const sendRequest = () => ({
  type: types.SEND_EMPLOYEE_REQUEST,
});

export const requestEmployeesSuccess = data => ({
  type: types.LOAD_EMPLOYEES_SUCCESS,
  data,
  receivedAt: Date.now(),
});
export const readEmployeeSuccess = data => ({
  type: types.READ_EMPLOYEE_SUCCESS,
  data,
  receivedAt: Date.now(),
});
export const createEmployeeSuccess = (employee, history) => {
  // history.push({
  //   pathname: `/employee/${employee._id}`
  // })
  return {
    type: types.CREATE_EMPLOYEE_SUCCESS,
    employee,
    receivedAt: Date.now(),
  };
};
export const updateEmployeeSuccess = (employee, history) => {
  return {
    type: types.UPDATE_EMPLOYEE_SUCCESS,
    employee,
    receivedAt: Date.now(),
  };
};
export const deleteEmployeeSuccess = employeeIds => ({
  type: types.DELETE_EMPLOYEE_SUCCESS,
  employeeIds,
  receivedAt: Date.now(),
});

const convertedEmployee = employee => {
  employee.createdAt = new Date(employee.createdAt);
  if (employee.completionDate) {
    employee.completionDate = new Date(employee.completionDate);
  }
  return employee;
};

export const fetchEmployees = (location, page_size) => dispatch => {
  const query = Object.assign({}, queryString.parse(location.search));
  const pageStr = query._page;

  delete query._page;
  query._offset = pageStr ? (parseInt(pageStr, 10) - 1) * page_size : 0;
  query._limit = page_size;

  const search = Object.keys(query)
    .map(k => `${k}=${query[k]}`)
    .join('&');

  dispatch(sendRequest());
  return employeeApi
    .getAllEmployees(search)
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
          requestEmployeesSuccess({
            pageNum: pageStr ? parseInt(pageStr) : 1,
            offset: query._offset,
            employees,
            totalCount: data.metadata.totalCount,
          })
        );
        message.success('Load employees successfull');
      });
    })
    .catch(err => {
      const errorMsg = `Error in fetching data from server: ${err.message}`;
      console.log('errorMsg', errorMsg);
      dispatch(requestEmployeesError(errorMsg));
      notification.error({
        message: errorMsg,
      });
    });
};

const shouldFetchEmployees = (location, state) => {
  const employeeState = state.employeeState;
  if (!employeeState.employees.length) {
    return true;
  } else if (employeeState.isFetching) {
    return false;
  }
  return false;
};

export const fetchEmployeesIfNeeded = (location, page_size) => (
  dispatch,
  getState
) => {
  if (shouldFetchEmployees(location, getState())) {
    return dispatch(fetchEmployees(location, page_size));
  }
};

export const createEmployee = (employee, history) => {
  return dispatch => {
    dispatch(sendRequest());

    employeeApi
      .createEmployee(employee)
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => {
            dispatch(requestEmployeesError(errorMsg));
            notification.error({
              message: errorMsg,
            });
          });
        }
        response.json().then(updatedEmployee => {
          updatedEmployee = convertedEmployee(updatedEmployee);
          dispatch(createEmployeeSuccess(updatedEmployee, history));
          notification.success({
            message: 'Create employee successfully',
          });
        });
      })
      .catch(error => {
        const errorMsg = `Error in sending data to server: ${error.message}`;
        dispatch(requestEmployeesError(errorMsg));
      });
  };
};

export const readEmployee = id => {
  return dispatch => {
    dispatch(sendRequest());
    employeeApi
      .readEmployee(id)
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => {
            dispatch(requestEmployeesError(errorMsg));
            notification.error({
              message: errorMsg,
            });
          });
        }
        response.json().then(employee => {
          console.log('employee', employee);
          employee = convertedEmployee(employee);
          dispatch(readEmployeeSuccess(employee, history));
        });
      })
      .catch(error => {
        const errorMsg = `Error in sending data to server: ${error.message}`;
        dispatch(requestEmployeesError(errorMsg));
      });
  };
};

export const updateEmployee = (employee, history) => {
  return dispatch => {
    dispatch(sendRequest());
    employeeApi
      .updateEmployee(employee)
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => {
            const errorMsg = `Failed to update employee ${error.message}`;
            notification.error({
              message: errorMsg,
            });
          });
        }
        response.json().then(updatedEmployee => {
          updatedEmployee = convertedEmployee(updatedEmployee);
          notification.success({
            message: 'Update employee successfully',
          });
          return dispatch(updateEmployeeSuccess(updatedEmployee, history));
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
export const deleteEmployee = (id, history) => {
  return dispatch => {
    dispatch(sendRequest());
    employeeApi
      .deleteEmployee(id)
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => {
            const errorMsg = `Failed to delete employee ${error.message}`;
            notification.error({
              message: errorMsg,
            });
          });
        }
        return dispatch(deleteEmployeeSuccess(id, history));
      })
      .catch(error => {
        const errorMsg = `Error in sending data to server: ${error.message}`;
        notification.error({
          message: errorMsg,
        });
        // dispatch(requestEmployeesError(errorMsg))
      });
  };
};
export const deleteBulkEmployee = employeeIds => {
  return dispatch => {
    dispatch(sendRequest());
    employeeApi
      .deleteBulkEmployee(employeeIds)
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => {
            const errorMsg = `Failed to delete employee`;
            dispatch(requestEmployeesError(errorMsg));
          });
        }
        return dispatch(deleteEmployeeSuccess(employeeIds));
      })
      .catch(error => {
        const errorMsg = `Error in sending data to server: ${error.message}`;
        dispatch(requestEmployeesError(errorMsg));
      });
  };
};

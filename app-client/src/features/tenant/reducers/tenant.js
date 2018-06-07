import * as types from '../actions/actionTypes';

const initSate = {
  employees: [],
  updatedEmployee: {},
  totalCount: 0,
  isFetching: false,
  failed: false,
  deletedEmployees: [],
  pageSize: 10,
  pageNum: 1,
  offset: 0,
};
const tenant = (state = initSate, action) => {
  switch (action.type) {
    case types.SEND_EMPLOYEE_REQUEST:
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

    case types.LOAD_EMPLOYEES_SUCCESS:
      // console.log('LOAD_EMPLOYEES_SUCCESS');
      return Object.assign({}, state, {
        employees: action.data.employees,
        totalCount: action.data.totalCount,
        isFetching: false,
        pageNum: action.data.pageNum,
        offset: action.data.offset,
        receivedAt: action.receivedAt,
      });

    case types.CREATE_EMPLOYEE_SUCCESS:
      // console.log('CREATE_EMPLOYEE_SUCCESS');
      const updatedEmployee = action.employee;
      return Object.assign({}, state, {
        employees: [updatedEmployee, ...state.employees],
        receivedAt: action.receivedAt,
        isFetching: false,
      });
    case types.READ_EMPLOYEE_SUCCESS:
      return Object.assign({}, state, {
        currentEmployee: action.employee,
        receivedAt: action.receivedAt,
        isFetching: false,
      });
    case types.UPDATE_EMPLOYEE_SUCCESS:
      const updatedEmployees = state.employees.map(employee => {
        if (employee._id === action.employee._id) {
          return action.employee;
        }
        return employee;
      });
      return Object.assign({}, state, {
        employees: updatedEmployees,
        updatedEmployee: action.employee,
        receivedAt: action.receivedAt,
        isFetching: false,
      });

    case types.DELETE_EMPLOYEE_SUCCESS:
      // console.log('DELETE_EMPLOYEE_SUCCESS');
      const newEmployees = state.employees.filter(
        employee => action.employeeIds.indexOf(employee._id) == -1
      );
      return Object.assign({}, state, {
        employees: newEmployees,
        deletedEmployees: state.deletedEmployees.concat(action.employeeIds),
        isFetching: false,
        receivedAt: action.receivedAt,
      });
    default:
      return state;
  }
};

export default tenant;

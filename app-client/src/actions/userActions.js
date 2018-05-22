import * as types from "./actionTypes";
import userApi from "../services/api/userApi";
import queryString from "query-string";
import reduxStore from "../store/reduxStore";

import { notification, message } from "antd";

export const requestUsersError = error => ({
  type: types.REQUEST_SERVER_ERROR,
  error: error,
  receivedAt: Date.now()
});

export const sendRequest = () => ({
  type: types.SEND_EMPLOYEE_REQUEST
});

export const requestUsersSuccess = data => ({
  type: types.LOAD_EMPLOYEES_SUCCESS,
  data,
  receivedAt: Date.now()
});
export const createUserSuccess = (user, history) => {
  // history.push({
  //   pathname: `/user/${user._id}`
  // })
  return {
    type: types.CREATE_EMPLOYEE_SUCCESS,
    user,
    receivedAt: Date.now()
  };
};
export const deleteUserSuccess = userIds => ({
  type: types.DELETE_EMPLOYEE_SUCCESS,
  userIds,
  receivedAt: Date.now()
});
export const turnOnFilter = () => ({
  type: types.TURN_ON_FILTER
});
export const turnOffFilter = () => ({
  type: types.TURN_OFF_FILTER
});

const convertedUser = user => {
  user.createdAt = new Date(user.createdAt);
  if (user.completionDate) {
    user.completionDate = new Date(user.completionDate);
  }
  return user;
};

export const fetchUsers = (location, page_size) => dispatch => {
  const query = Object.assign({}, queryString.parse(location.search));
  const pageStr = query._page;

  delete query._page;
  query._offset = pageStr ? (parseInt(pageStr, 10) - 1) * page_size : 0;
  query._limit = page_size;

  const search = Object.keys(query)
    .map(k => `${k}=${query[k]}`)
    .join("&");

  dispatch(sendRequest());
  return userApi
    .getAllUsers(search)
    .then(response => {
      if (!response.ok)
        return response.json().then(error => Promise.reject(error));
      response.json().then(data => {
        const users = data.records;
        users.forEach(user => {
          user.createdAt = new Date(user.createdAt);
          if (user.completionDate) {
            user.completionDate = new Date(user.completionDate);
          }
        });

        dispatch(
          requestUsersSuccess({
            pageNum: pageStr ? parseInt(pageStr) : 1,
            offset: query._offset,
            users,
            totalCount: data.metadata.totalCount
          })
        );
        message.success("Load users successfull");
      });
    })
    .catch(err => {
      const errorMsg = `Error in fetching data from server: ${err.message}`;
      console.log("errorMsg", errorMsg);
      dispatch(requestUsersError(errorMsg));
      notification.error({
        message: errorMsg
      });
    });
};

const shouldFetchUsers = (location, state) => {
  const userState = state.userState;
  if (!userState.users.length) {
    return true;
  } else if (userState.isFetching) {
    return false;
  }
  return false;
};

export const fetchUsersIfNeeded = (location, page_size) => (
  dispatch,
  getState
) => {
  if (shouldFetchUsers(location, getState())) {
    return dispatch(fetchUsers(location, page_size));
  }
};

export const createUser = (user, history) => {
  return dispatch => {
    dispatch(sendRequest());

    userApi
      .createUser(user)
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => {
            dispatch(requestUsersError(error));
            notification.error({
              message: error
            });
          });
        }
        response.json().then(updatedUser => {
          updatedUser = convertedUser(updatedUser);
          dispatch(createUserSuccess(updatedUser, history));
          notification.success({
            message: "Create user successfully"
          });
        });
      })
      .catch(error => {
        const errorMsg = `Error in sending data to server: ${error.message}`;
        dispatch(requestUsersError(errorMsg));
      });
  };
};
export const deleteUser = (id, history) => {
  return dispatch => {
    dispatch(sendRequest());
    userApi
      .deleteUser(id)
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => {
            const errorMsg = `Failed to delete user ${error.message}`;
            notification.error({
              message: errorMsg
            });
          });
        }
        return dispatch(deleteUserSuccess(id, history));
      })
      .catch(error => {
        const errorMsg = `Error in sending data to server: ${error.message}`;
        notification.error({
          message: errorMsg
        });
        // dispatch(requestUsersError(errorMsg))
      });
  };
};

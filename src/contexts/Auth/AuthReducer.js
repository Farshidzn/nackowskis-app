import {
  USER_REGISTER,
  USER_LOGIN,
  USER_LOGOUT,
  USER_ACTION_FAIL,
} from "./AuthActionTypes";
const AuthReducer = (state, action) => {
  switch (action.type) {
    case USER_REGISTER:
    case USER_LOGIN:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case USER_LOGOUT:
      return {
        ...state,
        user: null,
        error: null,
      };
    case USER_ACTION_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return { ...state, updateSuccess: false };
  }
};

export default AuthReducer;

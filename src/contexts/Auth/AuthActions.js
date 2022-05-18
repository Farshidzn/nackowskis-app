import axios from "axios";
import {
  USER_REGISTER,
  USER_LOGIN,
  USER_LOGOUT,
  USER_ACTION_FAIL,
} from "./AuthActionTypes";

const api = axios.create({
  baseURL: "https://nackowskiappapi.azurewebsites.net/api/v1/users",
});

const getMessage = (error) => {
  const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  console.log(message);
  return message;
};
export const login = async (formData, dispatch) => {
  //   const { email, password } = formData;
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("login");
    console.log(formData);
    const { data } = await api.post("Login", formData, config);
    dispatch({
      type: USER_LOGIN,
      payload: data,
    });

    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_ACTION_FAIL,
      payload: getMessage(error),
    });
  }
};
export const register = async (formData, dispatch) => {
  try {
    // const { name, email, password } = formData;
    const config = {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    console.log(formData);
    const { data } = await api.post("/Register", formData, config);
    dispatch({
      type: USER_REGISTER,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_ACTION_FAIL,
      payload: getMessage(error),
    });
  }
};
export const logout = (dispatch) => {
  localStorage.removeItem("user");
  dispatch({ type: USER_LOGOUT });
  document.location.href = "/login";
};

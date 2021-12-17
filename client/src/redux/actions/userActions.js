import axios from "axios";
import { message } from "antd";

export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  // const baseurl = "http://localhost:4500";
  try {
    const response = await axios.post(`/api/users/login`, reqObj);
    localStorage.setItem("user", JSON.stringify(response.data));
    message.success("Login Success");
    dispatch({ type: "LOADING", payload: false });
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  } catch (err) {
    console.log(err);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const userRegister = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  // const baseurl = "http://localhost:4500";
  try {
    const response = await axios.post(`/api/users/register`, reqObj);
    message.success("User Registered Success");
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
    dispatch({ type: "LOADING", payload: false });
  } catch (err) {
    console.log(err);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};

import axios from "axios";
import { message } from "antd";

export const bookCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  // const baseurl = "http://localhost:4500";
  try {
    await axios.post(`/api/bookings/bookcar`, reqObj);
    dispatch({ type: "LOADING", payload: false });
    setTimeout(() => {
      message.success("Your Car Booked Successfully");
      window.location.href = "/mybookings";
    }, 500);
  } catch (err) {
    console.log(err);
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong, Please try again later");
  }
};

export const getAllBookings = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  // const baseurl = "http://localhost:4500";
  try {
    const response = await axios.get(`/api/bookings/getallbookings`);
    dispatch({ type: "GET_ALL_BOOKINGS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (err) {
    console.log(err);
    dispatch({ type: "LOADING", payload: false });
  }
};

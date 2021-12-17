import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { getAllBookings } from "../redux/actions/bookingAction";
import { Row, Col } from "antd";
import Spinner from "../components/Spinner";
import moment from "moment";

function MyBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getAllBookings());
  }, []);
  return (
    <DefaultLayout>
      {loading == true && <Spinner />}
      <h3 className="text-center mt-2">My Bookings</h3>
      <Row justify="center" gutter={16}>
        <Col lg={16} sm={24}>
          {bookings
            .filter((o) => o.user == user._id)
            .map((booking) => {
              return (
                <Row className="bs1 mt-3 text-left" gutter={16}>
                  <Col lg={6} sm={24}>
                    <p>
                      <b>{booking.car.name}</b>
                    </p>
                    <p>
                      Total Hours: <b>{booking.totalHours}</b>
                    </p>
                    <p>
                      Rent Per Hour: <b>{booking.car.rentPerHour}</b>
                    </p>
                    <p>
                      Total Amount: <b>{booking.totalAmount}</b>
                    </p>
                  </Col>
                  <Col lg={12} sm={24}>
                    <p>
                      Transaction Id: <b>{booking.transactionId}</b>
                    </p>
                    <p>
                      From: <b>{booking.bookedTimeSlots.from}</b>
                    </p>
                    <p>
                      To: <b>{booking.bookedTimeSlots.to}</b>
                    </p>
                    <p>
                      Date Of Booking:{" "}
                      <b>
                        {moment(booking.createdAt).format("MMM DD YYYY HH:mm")}
                      </b>
                    </p>
                  </Col>
                  <Col lg={6} sm={24}>
                    <img
                      src={booking.car.image}
                      height={"140"}
                      className="p-2"
                      style={{ borderRadius: "10px" }}
                    />
                  </Col>
                </Row>
              );
            })}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default MyBookings;

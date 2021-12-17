import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../redux/actions/carsActions";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { Row, Col, Divider, DatePicker, Checkbox, Modal } from "antd";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingAction";
import StripeCheckout from "react-stripe-checkout";

const { RangePicker } = DatePicker;

function BookingCar() {
  const { carid } = useParams();
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setCar] = useState([]);
  const [to, setTo] = useState();
  const [from, setFrom] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
    } else {
      setCar(cars.find((o) => o._id == carid));
    }
  }, [cars]);

  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour);
    if (driver) {
      setTotalAmount(totalAmount + totalHours * 100);
    }
  }, [driver, totalHours]);

  function selectTimeSlots(values) {
    console.log(moment(values[0]).format("MMM DD YYYY HH:mm"));
    console.log(moment(values[1]).format("MMM DD YYYY HH:mm"));
    setFrom(moment(values[0]).format("MMM DD YYYY HH:mm"));
    setTo(moment(values[1]).format("MMM DD YYYY HH:mm"));
    setTotalHours(values[1].diff(values[0], "hours"));
  }

  const launchRazorpay = () => {
    var options = {
      key: "rzp_test_2lNx88Blumt0AQ",
      amount: totalAmount * 100,
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
    };
    let razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  function bookNow() {
    const reqObj = {
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalAmount,
      totalHours,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    dispatch(bookCar(reqObj));
    launchRazorpay();
  }

  return (
    <DefaultLayout>
      {loading == true && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24} className="p-3">
          <img src={car.image} className="carimg2 bs1 w-100 p-2" />
        </Col>
        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider type="horizontal" dashed>
            Car Info
          </Divider>
          <div style={{ textAlign: "right" }}>
            <p>{car.name}</p>
            <p>{car.rentPerHour} per hour /-</p>
            <p>Fuel Type: {car.fuelType}</p>
            <p>Max Capacity: {car.capacity}</p>
          </div>
          <Divider type="horizontal" dashed>
            Select Time Slots
          </Divider>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD YYYY HH:mm"
            onChange={selectTimeSlots}
          />
          <br />
          <button
            className="btn1 mt-3"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Booked Time Slots
          </button>
          {from && to && (
            <div>
              <p>
                Total Hours: <b>{totalHours}</b>
              </p>
              <p>
                Rent Per Hour: <b>{car.rentPerHour}</b>
              </p>
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    setDriver(true);
                  } else {
                    setDriver(false);
                  }
                }}
              >
                Driver Required{" "}
              </Checkbox>
              <h3>Total Amount: {totalAmount}</h3>

              <button className="btn1" onClick={bookNow}>
                Book Now
              </button>
            </div>
          )}
        </Col>
      </Row>
      <Modal
        visible={showModal}
        closable={false}
        footer={false}
        title="Booked Time Slots"
      >
        {car && (
          <div className="p-2">
            {car.bookedTimeSlots?.map((slot) => {
              return (
                <button className="btn1 mt-2">
                  {slot.from} - {slot.to}
                </button>
              );
            })}
            <div className="text-right mt-5">
              <button className="btn1" onClick={() => setShowModal(false)}>
                CLOSE
              </button>
            </div>
          </div>
        )}
      </Modal>
    </DefaultLayout>
  );
}

export default BookingCar;

import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../redux/actions/carsActions";
import { Row, Col, DatePicker } from "antd";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import moment from "moment";
const { RangePicker } = DatePicker;
function Home() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalCars] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    setTotalCars(cars);
  }, [cars]);
  function setFilter(values) {
    let selectFrom = moment(values[0], "MMM DD YYYY HH:mm");
    let selectTo = moment(values[1], "MMM DD YYYY HH:mm");

    let temp = [];
    for (let car of cars) {
      if (car.bookedTimeSlots == 0) {
        temp.push(car);
      } else {
        for (let booking of car.bookedTimeSlots) {
          if (
            selectFrom.isBetween(booking.from, booking.to) ||
            selectTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectFrom, selectTo) ||
            moment(booking.to).isBetween(selectFrom, selectTo)
          ) {
          } else {
            temp.push(car);
          }
        }
      }
    }
    setTotalCars(temp);
  }
  return (
    <DefaultLayout>
      <Row className="mt-3" justify="center">
        <Col lg={20} sm={24} className="d-flex justify-content-left">
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD YYYY HH:mm"
            onChange={setFilter}
          />
        </Col>
      </Row>
      {loading == true && <Spinner />}
      <Row justify="center" gutter={16}>
        {totalCars.map((car) => {
          return (
            <Col lg={5} sm={24} xs={24}>
              <div className="car p-2 bs1">
                <img src={car.image} className="carimg" />
                <div className="car-content d-flex align-items-center justify-content-between">
                  <div className="text-left ">
                    <p>{car.name}</p>
                    <p>Rent Per Hour {car.rentPerHour}/-</p>
                  </div>
                  <div>
                    <button className="btn1 mr-2">
                      <Link to={`/booking/${car._id}`}>Book Now</Link>
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </DefaultLayout>
  );
}

export default Home;

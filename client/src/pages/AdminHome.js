import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { deleteCar, getAllCars } from "../redux/actions/carsActions";
import { Row, Col, DatePicker } from "antd";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Popconfirm, message } from "antd";

const { RangePicker } = DatePicker;
function AdminHome() {
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

  return (
    <DefaultLayout>
      <Row justify="center mt-3" gutter={16}>
        <Col lg={20} sm={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h3>Admin Panel</h3>
            <Link to="/addcar">
              <button className="btn1">Add Car</button>
            </Link>
          </div>
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
                    <p>Rent Per Hour {car.rentPerHour} /-</p>
                  </div>
                  <div className="mr-4">
                    <Link to={`/editcar/${car._id}`}>
                      <EditOutlined
                        className="mr-2"
                        style={{ color: "skyblue", cursor: "pointer" }}
                      />
                    </Link>
                    <Popconfirm
                      title="Are you sure to delete this car?"
                      onConfirm={() => {
                        dispatch(deleteCar({ carid: car._id }));
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </Popconfirm>
                    ,
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

export default AdminHome;

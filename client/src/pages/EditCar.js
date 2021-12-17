import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Row, Col, Form, Input } from "antd";
import { editCar } from "../redux/actions/carsActions";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { getAllCars } from "../redux/actions/carsActions";
import { useParams } from "react-router-dom";

function EditCar() {
  const { carid } = useParams();
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setCar] = useState();
  const [totalCars, setTotalCars] = useState([]);
  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
    } else {
      setTotalCars(cars);
      setCar(cars.find((o) => o._id == carid));
    }
  }, [cars]);
  function onFinish(values) {
    values._id = car._id;
    dispatch(editCar(values));
    console.log(values);
  }
  return (
    <DefaultLayout>
      {loading == true && <Spinner />}
      <Row justify="center" className="mt-5">
        <Col lg={12} sm={24} xs={24}>
          {totalCars.length > 0 && (
            <Form
              initialValues={car}
              className="bs1 p-2"
              layout="vertical"
              onFinish={onFinish}
            >
              <h3>Edit Car</h3>
              <hr />
              <Form.Item
                name="name"
                label="Car Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="image"
                label="Image URL"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="rentPerHour"
                label="Rent Per Hour"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="capacity"
                label="Capacity"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="fuelType"
                label="Fuel Type"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <button className="btn1">Save Car</button>
            </Form>
          )}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default EditCar;

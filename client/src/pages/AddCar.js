import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Row, Col, Form, Input } from "antd";
import { addCar } from "../redux/actions/carsActions";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";

function AddCar() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  function onFinish(values) {
    values.bookedTimeSlots = [];
    dispatch(addCar(values));
    console.log(values);
  }
  return (
    <DefaultLayout>
      {loading == true && <Spinner />}
      <Row justify="center" className="mt-5">
        <Col lg={12} sm={24} xs={24}>
          <Form className="bs1 p-2" layout="vertical" onFinish={onFinish}>
            <h3>Add New Car</h3>
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
            <button className="btn1">Add Car</button>
          </Form>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default AddCar;

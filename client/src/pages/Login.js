import React from "react";
import { Row, Col, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/actions/userActions";
import Spinner from "../components/Spinner";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();
function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const onFinish = (values) => {
    dispatch(userLogin(values));
    console.log(values);
  };
  return (
    <div className="login">
      {loading == true && <Spinner />}
      <Row gutter={16} className="d-flex align-items-center">
        <Col lg={16} style={{ position: "relative" }}>
          <img
            className="w-100"
            data-aos="slide-right"
            data-aos-duration="1500"
            src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGNhciUyMHdpdGglMjBibGFjayUyMGJhY2tncm91bmR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
          />
          <h1 className="login-logo">SOMU CARS</h1>
        </Col>
        <Col lg={8} className="text-left p-5">
          <Form
            layout="vertical"
            className="login-form p-5"
            onFinish={onFinish}
          >
            <h1>Login</h1>
            <hr />
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input type={"password"} />
            </Form.Item>
            <button className="btn1 mt-2 mb-3">Login</button>
            <br />
            <Link to="/register">Click Here To Register</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;

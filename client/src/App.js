// import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookingCar from "./pages/BookingCar";
import MyBookings from "./pages/MyBookings";
import AddCar from "./pages/AddCar";
import "antd/dist/antd.css";
import { ProtectedWrapper } from "./components/ProtectedRoutes";
import AdminHome from "./pages/AdminHome";
import EditCar from "./pages/EditCar";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <ProtectedWrapper>
                <Home />
              </ProtectedWrapper>
            }
          ></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/booking/:carid"
            element={
              <ProtectedWrapper>
                <BookingCar />
              </ProtectedWrapper>
            }
          />
          <Route
            path="/mybookings"
            element={
              <ProtectedWrapper>
                <MyBookings />
              </ProtectedWrapper>
            }
          />
          <Route
            path="/addcar"
            element={
              <ProtectedWrapper>
                <AddCar />
              </ProtectedWrapper>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedWrapper>
                <AdminHome />
              </ProtectedWrapper>
            }
          />
          <Route
            path="/editcar/:carid"
            element={
              <ProtectedWrapper>
                <EditCar />
              </ProtectedWrapper>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

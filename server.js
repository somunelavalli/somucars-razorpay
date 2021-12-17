const express = require("express");
const app = express();
const port = process.env.PORT || 4500;
const cors = require("cors");
const dbConnection = require("./db");
app.use(express.json());
app.use(cors());

app.use("/api/cars/", require("./routes/carsRoute"));
app.use("/api/users/", require("./routes/userRoute"));
app.use("/api/bookings/", require("./routes/bookingRoute"));

const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

app.get("/", (req, res) => {
  res.send("Hello Customer");
});

app.listen(port, () => {
  console.log("Server is Running @ Port No: " + port);
});

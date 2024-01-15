const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const bodyParser = require("body-parser");
const connectDb = require("./config/db");

require("dotenv").config();

connectDb();
let port = process.env.PORT || 5001;

app.use(bodyParser.json());

app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

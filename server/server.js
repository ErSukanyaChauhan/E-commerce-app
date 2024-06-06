const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const bodyParser = require("body-parser");
const mainRoute = require("./routes");
var cors = require("cors");
const connectDb = require("./config/db");

require("dotenv").config();

connectDb();
let port = process.env.PORT || 5001;
// cross origin resource sharing
app.use(cors());
app.use(bodyParser.json());

app.use("/", mainRoute);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

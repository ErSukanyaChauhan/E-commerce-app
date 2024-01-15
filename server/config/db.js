const { default: mongoose } = require("mongoose");
const connectDb = () => {
  try {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log("connected successfully new one");
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log("Not connected", error);
    process.exit(1);
  }
};
module.exports = connectDb;

const jwt = require("jsonwebtoken");

const authCheck = async (req, res, next) => {
  console.log("ReqObject",req);
  try {
    let token = req.headers.authorization;
    
    if (!token) {
      res.send("Please provide token");
      return;
    }
    let result = await jwt.decode(token, "secret");
    console.log("result", result);

    req.userId = result._id;
    req.userRole = result.role;

    console.log("token", token);
    next();
  } catch (error) {
    res.send(error.message);
  }
};
module.exports = authCheck;

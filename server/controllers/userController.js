const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getAllUser = async (req, res) => {
  try {
    let usersData = await UserModel.find();
    res.send(usersData);
  } catch (error) {
    res.send(error.message);
  }
};

const addUser = async (req, res) => {
  try {
    const userData = req.body;
    const saltRounds = 10;
    let hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    let newUser = new UserModel({
      // email:userData.email,
      // password:userData.password,
      // username:userData.username,
      // role:userData.role
      ...userData,
      password: hashedPassword,
    });
    let data = await newUser.save();
    console.log(userData);
    let messageData = {
      message: "user added successfully",
      status: 200,
      data: newUser,
    };
    res.status(200).send(messageData);
  } catch (error) {
    let messageData = {
      message: error.message,
      status: 404,
      data: error,
    };
    res.status(404).send(messageData);
  }
};

const loginUser = async (req, res) => {
  try {
    let userLoginData = req.body;
    let userData = await UserModel.findOne({ email: userLoginData.email });
    console.log("userdata", userData);
    if (userData) {
      //check balance
      let isPasswordCorrect = await bcrypt.compare(
        userLoginData.password,
        userData.password
      );
      if (isPasswordCorrect) {
        //assign token
        let token = jwt.sign(
          {
            _id: userData._id,
            role: userData.role,
          },
          "secret",
          {
            expiresIn: 60 * 60,
          }
        );
        let messageData = {
          message: "User logged in successfully",
          status: 200,
          data: { token,
            role:userData.role,
            email:userData.email,
            username:userData.username
           },
        };
        res.status(200).send(messageData);
      } else {
        // send form here
        res.status(201).json({message:"Invalid credentials"});
      }
    } else {
      res.status(201).json({message:"User does not exist"});
    }
  } catch (error) {
    console.log(error);
    let messageData = {
      message: error.message,
      status: 404,
      data: error,
    };
    res.status(404).send(messageData);
  }
};

const updateUser = async (req, res) => {
  try {
    console.log("req", req.userId);
    let userId = req.params.userId;

    let enteredData = req.body;

    const updateUser = await UserModel.findByIdAndUpdate(userId, enteredData, {
      new: true,
    });

    res.send(updateUser);
  } catch (error) {
    let message;

    if (error.message.includes("Cast to objectId failed for value")) {
      message = "Please provide correct id";
    } else {
      message = error.message;
    }
    let messageData = {
      message: message,
      status: 404,
      data: error,
    };
    res.status(404).send(messageData);
  }
};
module.exports = { getAllUser, addUser, loginUser, updateUser };

const express = require("express");
const { getAllUser, addUser , loginUser,updateUser} = require("../controllers/userController");
const authCheck = require("../middlewares/auth");
const roleGaurd = require("../middlewares/roleGaurd");

const router = express.Router();

router.get("/", 
// authCheck,roleGaurd
getAllUser);

router.post("/", addUser);

router.post("/login", loginUser);

// allow only admins
router.put('/:userId',authCheck,roleGaurd,updateUser)
module.exports = router;


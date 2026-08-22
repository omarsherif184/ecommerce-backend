const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {register,login} = require("../controllers/userController");
router.post("/register",register);
router.post("/login",login);

module.exports = router;
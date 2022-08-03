const express = require("express");
const route = express.Router();


// /api/user/register : REGISTER
route.post("/register", require("./register"));





module.exports = route;

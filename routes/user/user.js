const express = require("express");
const route = express.Router();

// /api/user/register : REGISTER
route.post("/register", require("./register"));

// /api/user/login : LOGIN
route.get("/login", require("./login"));

// /api/user/blog/create/:id: CREATE BLOG
route.post("/blog/create/:id", require("./createBlog"));

// /api/user/blog/update/:id
route.put("/blog/update/:id", require("./updateBlog"));

module.exports = route;

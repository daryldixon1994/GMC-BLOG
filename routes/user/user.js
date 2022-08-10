const express = require("express");
const router = express.Router();
const verify = require("../../middlewares/verifyToken");
const Blog = require("./getBlogs");
// /api/user/register : REGISTER
router.post("/register", require("./register"));

// /api/user/login : LOGIN
router.get("/login", require("./login"));

// /api/user/blog/create/:id: CREATE BLOG
router.post("/blog/create/:id", verify, require("./createBlog"));

// /api/user/blog/update :
router.put("/blog/update", verify, require("./updateBlog"));

// /api/user/blog/delete
router.delete("/blog/delete", verify, require("./deleteBlog"));

// /api/user/blogs
router.get("/blogs", Blog);

// /api/user/myBlogs:id
router.get("/myBlogs/:id", verify, require("./getUserBlogs"));

module.exports = router;

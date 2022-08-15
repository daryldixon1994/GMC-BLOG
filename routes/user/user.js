const express = require("express");
const router = express.Router();
const verify = require("../../middlewares/verifyToken");
const Blog = require("../../models/Blog");
// /api/user/register : REGISTER
router.post("/register", require("./register"));

// /api/user/login : LOGIN
router.post("/login", require("./login"));

// /api/user/blog/create/:id: CREATE BLOG
router.post("/blog/create/:id", verify, require("./createBlog"));

// /api/user/blog/update :
router.put("/blog/update", verify, require("./updateBlog"));

// /api/user/blog/delete
router.delete("/blog/delete", verify, require("./deleteBlog"));

// /api/user/blogs
router.get("/blogs", async (req, res) => {
    try {
        let blogs = await Blog.find();
        res.status(200).json({ status: true, data: blogs });
    } catch (error) {
        if (error) throw error;
        res.status(401).json({ status: false, error: "bad" });
    }
});

// /api/user/myBlogs:id
router.get("/myBlogs/:id", verify, require("./getUserBlogs"));

module.exports = router;

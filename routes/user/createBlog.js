const Blog = require("../../models/Blog");
const User = require("../../models/User");
module.exports = async (req, res) => {
    try {
        // console.log(req.user);
        let { title, text, imgUrl } = req.body;
        let { id } = req.params;
        let user = await User.findById(id);
        const blog = new Blog({
            title,
            text,
            imgUrl,
            owner: `${user.firstName} ${user.lastName}`,
            userId: user._id,
        });
        const newBlog = await blog.save();
        res.status(200).json({
            status: true,
            message: "Your blog was created succesfully",
            data: newBlog,
        });
    } catch (error) {
        if (error) throw error;
        res.status(400).json({ status: false, error });
    }
};

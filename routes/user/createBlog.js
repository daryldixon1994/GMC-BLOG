const Blog = require("../../models/Blog");
const User = require("../../models/User");
module.exports = async (req, res) => {
    try {
        let { title, text } = req.body;
        let { id } = req.params;
        let user = await User.findById(id);
        const blog = new Blog({
            title,
            text,
            photos:
                req.files.length !== 0
                    ? req.files.map(
                          (elt) =>
                              `${req.protocol}://${req.get("host")}/uploads/${
                                  elt.filename
                              }`
                      )
                    : "/uploads/addPhotos.png",

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

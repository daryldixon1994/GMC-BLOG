const Blog = require("../../models/Blog");
const User = require("../../models/User");
const sizeOf = require("image-size");
const sharp = require("sharp");

module.exports = async (req, res) => {
    console.log("req", req);
    console.log("req.protocol", req.protocol);
    console.log("host", req.get("host"));
    try {
        let { title, text } = req.body;
        let { id } = req.params;
        // let user = await User.findById(id);
        // const blog = new Blog({
        //     title,
        //     text,
        //     photos:
        //         req.files.length !== 0
        //             ? req.files.map((elt) => {
        //                   return {
        //                       url: `https://${req.get(
        //                           "x-forwarded-host"
        //                       )}/uploads/${elt.filename}`,
        //                       width: sizeOf(elt.path).width,
        //                       heigth: sizeOf(elt.path).height,
        //                   };
        //               })
        //             : "/uploads/addPhotos.png",

        //     owner: `${user.firstName} ${user.lastName}`,
        //     userId: user._id,
        // });
        // const newBlog = await blog.save();
        res.status(200).json({
            status: true,
            message: "Your blog was created succesfully",
            // data: newBlog,
        });
    } catch (error) {
        if (error) throw error;
        res.status(400).json({ status: false, error });
    }
};

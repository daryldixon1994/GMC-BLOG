const User = require("../../models/User");
const nodemailer = require("nodemailer");
module.exports = async (req, res) => {
    try {
        let { email } = req.body;
        const user = await User.findOne({ email });
        console.log(user.id);
        if (!user) {
            return res.status(401).json({
                status: false,
                message: "User not found, please verify your e-mail",
            });
        }
        const output = `
            <h3>Welcome to GMC BLOGS,you asked to reset your password.
            Please click on the link below to reset your password:</h3>
            <a href="${req.protocol}://${req.get(
            "x-forwarded-host"
        )}/reset-password/${user.id}">Reset Password</a>
            `;
        let transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            secure: false,
            auth: {
                user: "service.gmc.blogs@outlook.com",
                pass: "ServiceGmcBlog@14789632",
            },
        });
        const options = {
            from: '"GMC BLOGS Contact" <service.gmc.blogs@outlook.com>"',
            to: `${email}`,
            subject: "Reset your password",
            text: "GMC BLOGS", // plain text body
            html: output,
        };
        const { error, info } = await transporter.sendMail(options);
        if (error) {
            console.log(error);
            return res.status(400).json({ status: false, error });
        }
        return res.status(200).json({ status: true, message: info });
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: false, error });
    }
};

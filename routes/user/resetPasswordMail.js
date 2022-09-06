const User = require("../../models/User");
const nodemailer = require("nodemailer");
module.exports = async (req, res) => {
    try {
        let { email } = req.body;
        console.log(email);
        if (!email) {
            return res.status(401).json({
                status: false,
                message: "Empty field : cannot send empty email field.",
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                status: false,
                message: "User not found, please verify your e-mail",
            });
        }
        const output = `
            <h3>Welcome to GMC BLOGS,you asked to reset your password.
            Please click on the link below to reset your password:</h3>
            <a href="https://${req.get(
            "host"
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
        console.log(info);
        return res.status(200).json({
            status: true,
            message:
                "A request to reset your password has been sen. Please check your email. ",
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: false, error });
    }
};

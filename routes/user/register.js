const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const { RegisterValidation } = require("../../config/RegisterValidation");

module.exports = async (req, res) => {
    try {
        let {
            firstName,
            lastName,
            phoneNumber,
            email,
            password,
            repeat_password,
        } = req.body;
        //CHECK THE EMAIL
        let checkEmail = await User.findOne({ email });
        if (checkEmail) {
            return res.status(401).json({
                status: false,
                message:
                    "This email is already exists, please enter another one",
            });
        }
        //REGISTER VALIDATION
        let { error } = await RegisterValidation({
            email,
            password,
            repeat_password,
        });
        if (error) {
            return res
                .status(401)
                .json({ status: false, error: error.details[0].message });
        }
        //CRYPT THE PASSWORD
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);

        // CREATE NEW USER
        const user = new User({
            firstName,
            lastName,
            phoneNumber,
            email,
            password: hashedPassword,
        });
        const newUser = await user.save();

        //SEND FINAL RESPONSE
        res.status(200).json({
            status: true,
            message: "User created successfully",
        });
    } catch (error) {
        if (error) throw error;
        res.send(400).json({ status: false, error });
    }
};

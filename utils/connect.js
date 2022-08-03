const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.uri;
const connect = () => {
    mongoose
        .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("connected to database"))
        .catch((err) => console.log(err));
};
module.exports = connect;

const express = require("express");
const connect = require("./utils/connect");
const app = express();
//port
const port = process.env.PORT;
require("dotenv").config();
//connect to database
connect();

app.use(express.json());
app.use("/api/user", require("./routes/user/user"));
app.listen(port, (err) => {
    if (err) throw err;
    console.log(`server is running on http://localhost:${port}/`);
});

const express = require("express");
const connect = require("./utils/connect");
const app = express();
const userRoutes = require("./routes/user/user");
//port
const port = process.env.PORT || 5000;
require("dotenv").config();
//connect to database
connect();

app.use(express.json());
app.use("/api/user", userRoutes);
app.listen(port, (err) => {
    if (err) throw err;
    console.log(`server is running on http://localhost:${port}/`);
});

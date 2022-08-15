const express = require("express");
const connect = require("./utils/connect");
const app = express();
const Blog = require("./models/Blog");

//port
const port = process.env.PORT ||5000;
require("dotenv").config();
//connect to database
connect();

app.use(express.json());
app.use("/api/user", require("./routes/user/user"));

// app.get("/api/user/blogs", async (req, res) => {
//     try {
//         let blogs = await Blog.find();
//         res.status(200).json({ status: true, data: blogs });
//     } catch (error) {
//         if (error) throw error;
//         res.status(401).json({ status: false, error: "bad" });
//     }
// });
app.listen(port, (err) => {
    if (err) throw err;
    console.log(`server is running on http://localhost:${port}/`);
});

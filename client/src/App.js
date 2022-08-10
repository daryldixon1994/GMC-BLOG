import "./App.css";
import React, { useEffect } from "react";
import Layout from "./components/views/Layout";
import Register from "./components/views/Register";
import Login from "./components/views/Login";
import Blogs from "./components/views/Blogs";
import MyBlogs from "./components/views/user/MyBlogs";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
function App() {
    useEffect(() => {
        fetch("https://api/user/blogs")
            .then((res) => res.json())
            .then((res) => console.log(res))
            .catch((err) => {
                console.dir(err);
                console.warn(err.responseText);
            });
    }, []);
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Blogs />} />
                    <Route path="register" element={<Register />} />
                    <Route path="login" element={<Login />} />
                    <Route path="myBlogs" element={<MyBlogs />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;

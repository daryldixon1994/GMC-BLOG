import "./App.css";
import React, { useEffect } from "react";
import Layout from "./components/views/Layout";
import Register from "./components/views/Register";
import Login from "./components/views/Login";
import Blogs from "./components/views/Blogs";
import MyBlogs from "./components/views/user/MyBlogs";
import UserRoute from "./components/routes/UserRoute";
import { Routes, Route } from "react-router-dom";
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Blogs />} />
                    <Route path="register" element={<Register />} />
                    <Route path="login" element={<Login />} />
                    <Route
                        path="myBlogs"
                        element={
                            <UserRoute>
                                <MyBlogs />
                            </UserRoute>
                        }
                    />
                </Route>
            </Routes>
        </div>
    );
}

export default App;

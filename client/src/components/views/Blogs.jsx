import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogItem from "./BlogItem";
function Blogs() {
    const [blogs, setBlogs] = useState();

    useEffect(() => {
        axios
            .get("/api/user/blogs")
            .then((res) => setBlogs(res.data.data))
            .catch((err) => console.log(err));
    }, [blogs]);

    return (
        <>
            <h1>Blogs Component</h1>
            <div className="blogs-container">
                {blogs ? (
                    blogs.map((blog) => {
                        return <BlogItem key={blog._id} {...blog} />;
                    })
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
        </>
    );
}

export default Blogs;

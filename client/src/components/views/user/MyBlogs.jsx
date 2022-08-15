import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../../../redux/actions/userActions";
import BlogItem from "../BlogItem";
function MyBlogs() {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const myBlogs = useSelector((state) => state.userReducer.blogs);
    useEffect(() => {
        dispatch(getBlogs({ id, token }));
    }, [myBlogs]);

    return (
        <div>
            <h1>My Blogs</h1>
            {myBlogs.length >= 1 ? (
                myBlogs.map((blog) => {
                    return <BlogItem key={blog._id} {...blog} />;
                })
            ) : (
                <h1>You don't have blogs</h1>
            )}
        </div>
    );
}

export default MyBlogs;

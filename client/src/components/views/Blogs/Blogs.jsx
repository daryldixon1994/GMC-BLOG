import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogItem from "./BlogItem";
import { Row, Container, Col, Form } from "react-bootstrap";
function Blogs() {
    const [blogs, setBlogs] = useState();
    const [search, setSearch] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const handleChange = (e) => {
        setSearch(e.target.value);
    };
    const handleDateFilter = (e) => {
        setDateFilter(e.target.value);
    };

    useEffect(() => {
        axios
            .get("https://gmc-blog.herokuapp.com/api/user/blogs", {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => setBlogs(res.data.data))
            .catch((err) => console.log(err));
    }, [blogs, search]);

    return (
        <Container
            style={{
                minHeight: "91vh",
                paddingTop: "25px",
                paddingBottom: "25px",
            }}
        >
            <Row
                style={{
                    marginBottom: "20px",
                    borderBottom: "2px grey solid",
                    paddingBottom: "10px",
                }}
            >
                <Col md={6}></Col>
                <Col md={4}>
                    <Form.Control
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    />
                </Col>
                <Col md={2}>
                    <Form.Control
                        as="input"
                        type="date"
                        id="exampleColorInput"
                        defaultValue="#563d7c"
                        title="Choose your color"
                        onChange={(e) => {
                            handleDateFilter(e);
                        }}
                    />
                </Col>
            </Row>
            {blogs ? (
                <Row xs={1} lg={3} className="g-4">
                    {blogs
                        .filter((blog) => {
                            return search && !dateFilter
                                ? blog.title
                                      .toLowerCase()
                                      .includes(search.toLowerCase()) ||
                                      blog.owner
                                          .toLowerCase()
                                          .includes(search.toLowerCase())
                                : dateFilter && !search
                                ? blog.createdAt.includes(dateFilter)
                                : blog;
                        })
                        .map((blog) => {
                            return <BlogItem key={blog._id} {...blog} />;
                        })}
                </Row>
            ) : (
                <h1>Loading...</h1>
            )}
        </Container>
    );
}

export default Blogs;

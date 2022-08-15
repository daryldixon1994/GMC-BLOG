import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
function NavBar() {
    //CONSTANTS
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    //MY LOCAL STATES
    const [show, setShow] = useState(false);
    const [newBlog, setNewBlog] = useState({});

    //MY BLOGS STATE FROM REDUX
    const myBlogs = useSelector((state) => state.userReducer.blogs);
    const navigate = useNavigate();
    //CLOSE MODAL
    const handleClose = () => setShow(false);
    //CLOSE SHOW
    const handleShow = () => setShow(true);
    //HANDLE LOGOUT
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isUser");
        navigate("login");
    };
    // HANDLE CHANGE NEW BLOG
    const handleChange = (e) => {
        setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
    };
    //CREATE NEW BLOG
    const handelSaveNewBlog = () => {
        axios
            .post(`/api/user/blog/create/${id}`, newBlog, {
                headers: {
                    jwt: token,
                },
            })
            .then((res) => {
                console.log(res);
                res && handleClose();
            })
            .catch((err) => console.dir(err));
    };
    return (
        <div className="nav-container">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    >
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>Blog's Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="write yor blog's name here"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>Image : </Form.Label>
                            <Form.Control
                                type="text"
                                name="imgUrl"
                                placeholder="paste your image url here"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Blog :</Form.Label>
                            <Form.Control name="text" as="textarea" rows={5} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handelSaveNewBlog}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>GOMYCODE BLOGS</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">
                                Home
                            </Nav.Link>

                            {localStorage.getItem("token") ? (
                                <>
                                    <Nav.Link as={Link} to="/myBlogs">
                                        My Blogs
                                        <div className="blogs-nbre">
                                            {" "}
                                            {myBlogs.length}{" "}
                                        </div>
                                    </Nav.Link>
                                    <Nav.Link
                                        as={Link}
                                        to="/login"
                                        className="login"
                                        onClick={() => {
                                            handleLogout();
                                        }}
                                    >
                                        LogOut
                                    </Nav.Link>
                                    <Nav.Link
                                        className="login"
                                        onClick={handleShow}
                                    >
                                        Add blog
                                    </Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link
                                        as={Link}
                                        to="/login"
                                        className="login"
                                    >
                                        Login
                                    </Nav.Link>
                                    <Nav.Link
                                        as={Link}
                                        to="/register"
                                        className="login"
                                    >
                                        Register
                                    </Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavBar;

import React, { useState } from "react";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Form, Modal } from "react-bootstrap";
import { IoSettingsSharp } from "react-icons/io5";
import "./NavBar.css";
import axios from "axios";
import ModalChangePassword from "./ModalChangePassword";
function NavBar() {
    //CONSTANTS
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    //MY LOCAL STATES
    const [newBlog, setNewBlog] = useState({});
    const [showSettings, setShowSettings] = useState(false);
    const [newFile, setNewFile] = useState();

    //MY BLOGS STATE FROM REDUX
    const myBlogs = useSelector((state) => state.userReducer.myblogs);
    const navigate = useNavigate();
    //MODAL HANDLING
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //Password MODAL HANDLING
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const handleClosePasswordModal = () => setShowPasswordModal(false);
    const handleShowPasswordModal = () => setShowPasswordModal(true);

    const handleShowSetting = () => setShowSettings(!showSettings);
    //HANDLE LOGOUT
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isUser");
        localStorage.removeItem("id");
        navigate("login");
    };
    // HANDLE CHANGE NEW BLOG
    const handleChange = (e) => {
        setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
    };
    //CREATE NEW BLOG
    const handleFile = (e) => {
        setNewFile(e.target.files);
    };
    const handelSaveNewBlog = () => {
        let blogFormData = new FormData();
        blogFormData.append("title", newBlog.title);
        blogFormData.append("text", newBlog.text);
        for (let i = 0; i < newFile.length; i++) {
            blogFormData.append("photos", newFile[i]);
        }
        axios
            .post(`/api/user/blog/create/${id}`, blogFormData, {
                headers: {
                    jwt: token,
                    "Content-Type": "multipart/form-data",
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
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        GOMYCODE BLOGS
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">
                                Home
                            </Nav.Link>

                            {localStorage.getItem("token") &&
                            localStorage.getItem("isUser") ? (
                                <>
                                    <Nav.Link as={Link} to="/myBlogs">
                                        My Blogs
                                        <span className="blogs-nbre">
                                            {myBlogs.length}
                                        </span>
                                    </Nav.Link>
                                    <Nav.Link
                                        className="login"
                                        onClick={() => {
                                            handleShowSetting();
                                        }}
                                    >
                                        <IoSettingsSharp />
                                        <Dropdown.Menu show={showSettings}>
                                            <Dropdown.Header>
                                                Settings
                                            </Dropdown.Header>
                                            <Dropdown.Item
                                                onClick={
                                                    handleShowPasswordModal
                                                }
                                            >
                                                Change password
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="3">
                                                Change email
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Nav.Link>

                                    <Nav.Link
                                        className="login"
                                        onClick={handleShow}
                                    >
                                        Add blog
                                    </Nav.Link>
                                    <Nav.Link
                                        as={Link}
                                        to="/login"
                                        className="login"
                                        onClick={() => {
                                            handleLogout();
                                        }}
                                    >
                                        Logout
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
            {/* MODAL ADD BLOG */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            controlId="formFileMultiple"
                            className="mb-3"
                        >
                            <Form.Label>Select your images</Form.Label>
                            <Form.Control
                                type="file"
                                name="photos"
                                multiple
                                onChange={(e) => {
                                    handleFile(e);
                                }}
                            />
                        </Form.Group>
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
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Blog :</Form.Label>
                            <Form.Control
                                name="text"
                                as="textarea"
                                rows={5}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            />
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
            {/* MODAL CHANGE PASSWORD */}
            <ModalChangePassword
                handleClosePasswordModal={handleClosePasswordModal}
                showPasswordModal={showPasswordModal}
            />
        </div>
    );
}

export default NavBar;

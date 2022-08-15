import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";

function BlogItem({ title, owner, text, imgUrl, _id }) {
    //CONSTANTS
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    //LOCAL STATE
    const [updatedBlog, setUpdatedBlog] = useState({});
    const [show, setShow] = useState(false);

    //CLOSE MODAL
    const handleClose = () => setShow(false);
    //CLOSE SHOW
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        setUpdatedBlog({ ...updatedBlog, [e.target.name]: e.target.value });
    };
    const handelUpdateBlog = () => {
        axios
            .put(`/api/user/blog/update?id=${_id}`, updatedBlog, {
                headers: {
                    jwt: token,
                },
            })
            .then((res) => {
                console.log(res);
                res && handleClose();
            });
    };
    const handleDelete = () => {
        axios
            .delete(`/api/user/blog/delete?_id=${_id}`, {
                headers: {
                    jwt: token,
                },
            })
            .then((res) => console.log(res))
            .catch((err) => console.dir(err));
    };
    return (
        <div id="blog-item-container">
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
                    <Button variant="primary" onClick={handelUpdateBlog}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <div id="drop-btn">
                <DropdownButton
                    // as={ButtonGroup}
                    id={`dropdown-button-drop`}
                    size="sm"
                    variant="light"
                    title=""
                >
                    <Dropdown.Item
                        eventKey="1"
                        onClick={() => {
                            handleShow();
                        }}
                    >
                        Update Blog
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                        eventKey="2"
                        onClick={() => {
                            handleDelete();
                        }}
                    >
                        Delete Blog
                    </Dropdown.Item>
                </DropdownButton>
            </div>
            <div>
                <h2> {title} </h2>
                <h4> {owner} </h4>
                <p> {text} </p>
                <img src={imgUrl} alt="blog-image" width={400} />
            </div>
        </div>
    );
}

export default BlogItem;

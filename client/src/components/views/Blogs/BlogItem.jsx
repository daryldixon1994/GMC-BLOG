import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import axios from "axios";
import { Button, Form, Modal, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function BlogItem({ title, owner, text, imgUrl, _id, userId, createdAt }) {
    // console.log(typeof userId);
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
    const date = createdAt.slice(0, 10);
    const hour = createdAt.slice(11, 16);
    return (
        <div className="">
            <Col>
                <Card style={{ minHeight: " 364px" }}>
                    {id === userId && (
                        <div id="drop-btn">
                            <DropdownButton
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
                    )}

                    <Card.Img
                        variant="top"
                        bsPrefix="card-img"
                        src={imgUrl}
                        width={312}
                        height={160}
                        style={{ objectFit: "cover" }}
                    />
                    <Card.Body>
                        <Card.Title as="h4">{title}</Card.Title>
                        <Card.Subtitle as="h6">{owner}</Card.Subtitle>
                        <br />
                        <Card.Text as="q">
                            {text.slice(0, 100)}...
                            <Card.Link as={Link} to={`/blog/${_id}`}>
                                read more
                            </Card.Link>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        {date} at {hour}&nbsp;
                    </Card.Footer>
                </Card>
            </Col>

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
        </div>
    );
}

export default BlogItem;

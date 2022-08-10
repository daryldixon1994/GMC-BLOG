import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBar() {
    const linkStyle = {
        textDecoration: "none",
        color: "inherit",
    };
    return (
        <div className="nav-container">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>GOMYCODE BLOGS</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">
                                Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/myBlogs">
                                My Blogs
                            </Nav.Link>
                            <Nav.Link as={Link} to="/login" className="login">
                                Login
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/register"
                                className="login"
                            >
                                Register
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavBar;

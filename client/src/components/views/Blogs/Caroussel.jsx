import React from "react";
import { Carousel } from "react-bootstrap";

function Caroussel({ blog, handleShow }) {
    return (
        <Carousel fade keyboard={true} touch={true}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={blog.imgUrl}
                    alt="First slide"
                    onClick={() => handleShow(true)}
                    style={{ cursor: "zoom-in" }}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
                    alt="Second slide"
                    onClick={() => handleShow(true)}
                    style={{ cursor: "zoom-in" }}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://www.follybeach.com/wp-content/uploads/2011/11/Folly-Beach-Thanksgiving.jpg"
                    alt="Third slide"
                    onClick={() => handleShow(true)}
                    style={{ cursor: "zoom-in" }}
                />
            </Carousel.Item>
        </Carousel>
    );
}

export default Caroussel;

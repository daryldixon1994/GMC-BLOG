import React, { useState , useEffect} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
function Register() {
    const [newUser, setNewUser] = useState();
    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    // const handleSubmit = () => {
    //     console.log("ok");
    //     axios
    //         .get("/blogger/u/blogssss")
    //         .then((res) => console.log(res))
    //         .catch((err) => {
    //             console.log("okk");
    //             console.dir(err);
    //         });
    // };
    
    

    return (
        // <Form
        //     style={{ width: "50%", margin: "auto" }}
        //     onChange={(e) => handleChange(e)}
        // >
        //     <Form.Group className="mb-3">
        //         <Form.Label>First Name </Form.Label>
        //         <Form.Control type="text" name="firstName" />
        //     </Form.Group>
        //     <Form.Group className="mb-3">
        //         <Form.Label>Last Name</Form.Label>
        //         <Form.Control type="text" name="lastName" />
        //     </Form.Group>
        //     <Form.Group className="mb-3">
        //         <Form.Label>Phone Number</Form.Label>
        //         <Form.Control
        //             type="tel"
        //             name="phoneNumber"
        //             placeholder="Enter phone number"
        //         />
        //     </Form.Group>
        //     <Form.Group className="mb-3">
        //         <Form.Label>Email address</Form.Label>
        //         <Form.Control
        //             type="email"
        //             name="email"
        //             placeholder="Enter email"
        //         />
        //     </Form.Group>
        //     <Form.Group className="mb-3">
        //         <Form.Label>Password</Form.Label>
        //         <Form.Control
        //             type="password"
        //             name="password"
        //             placeholder="Enter email"
        //             autoComplete=""
        //         />
        //     </Form.Group>
        //     <Form.Group className="mb-3">
        //         <Form.Label>Confirm Password</Form.Label>
        //         <Form.Control
        //             type="password"
        //             name="repeat_password"
        //             placeholder="Password"
        //             autoComplete=""
        //         />
        //     </Form.Group>
        //     <Button variant="primary" type="button" onClick={handleSubmit}>
        //         Submit
        //     </Button>
        // </Form>
        <h1>Register Component</h1>
    );
}

export default Register;

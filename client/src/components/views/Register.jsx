import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
function Register() {
    const [newUser, setNewUser] = useState();
    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };
    const navigate = useNavigate();

    const handleSubmit = async () => {
        await axios
            .post("/api/user/register", newUser)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.dir(error);
            });
        navigate("/login");
    };

    return (
        <div className="Auth-form-container-register">
            <form className="Auth-form" onChange={handleChange}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Register</h3>
                    <div className="text-center">
                        Already registered?
                        <Link to="/login" className="link-primary">
                            Login
                        </Link>
                    </div>
                    <div className="form-group mt-3">
                        <label>First Name</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="e.g Joe "
                            name="firstName"
                            autoComplete=""
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Last Name</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="e.g Doe"
                            name="lastName"
                            autoComplete=""
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            className="form-control mt-1"
                            placeholder="e.g 12345678"
                            name="phoneNumber"
                            autoComplete=""
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email Address"
                            name="email"
                            autoComplete=""
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Password"
                            name="password"
                            autoComplete=""
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Confirm Password"
                            name="repeat_password"
                            autoComplete=""
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                handleSubmit();
                            }}
                        >
                            Create Account
                        </button>
                    </div>
                    <p className="text-center mt-2">Forgot password?</p>
                </div>
            </form>
        </div>
    );
}

export default Register;

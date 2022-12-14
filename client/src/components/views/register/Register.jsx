import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import "./Register.css";
import { PulseLoader } from "react-spinners";
function Register() {
    const [newUser, setNewUser] = useState();
    const [loading, setLoading] = useState(false);
    const [registerError, setRegisterError] = useState("");
    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setLoading(true);
        await axios
            .post("/api/user/register", newUser)
            .then((response) => {
                if (response) {
                    setLoading(false);
                    swal(
                        "Welcome!",
                        "Your account was created successfully! Please check your email.",
                        "success"
                    ).then((result) => {
                        if (result) {
                            navigate("/login");
                        }
                    });
                }
            })
            .catch((error) => {
                if (error) {
                    setLoading(false);
                    setRegisterError(error.response.data.error);
                }
            });
    };

    useEffect(() => {
        setTimeout(() => {
            setRegisterError("");
        }, 15000);
    }, [registerError]);

    return (
        <div className="Auth-form-container-register">
            <form className="Auth-form" onChange={handleChange}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Register</h3>
                    <div className="text-center">
                        Already registered? &nbsp;
                        <Link to="/login" className="link-primary">
                            Login
                        </Link>
                    </div>
                    <div className="form-group mt-3">
                        <label>First Name *</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="e.g Joe "
                            name="firstName"
                        />
                        {registerError.includes("First Name") && (
                            <span style={{ color: "red", fontSize: "0.8em" }}>
                                {registerError}
                            </span>
                        )}
                    </div>
                    <div className="form-group mt-3">
                        <label>Last Name *</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="e.g Doe"
                            name="lastName"
                            autoComplete=""
                        />
                        {registerError.includes("Last Name") && (
                            <span style={{ color: "red", fontSize: "0.8em" }}>
                                {registerError}
                            </span>
                        )}
                    </div>
                    <div className="form-group mt-3">
                        <label>Phone Number *</label>
                        <input
                            type="tel"
                            className="form-control mt-1"
                            placeholder="e.g 12345678"
                            name="phoneNumber"
                            autoComplete=""
                        />
                        {registerError.includes("Phone Number") && (
                            <span style={{ color: "red", fontSize: "0.8em" }}>
                                {registerError}
                            </span>
                        )}
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address *</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email Address"
                            name="email"
                            autoComplete=""
                        />
                        {registerError.includes("email") && (
                            <span style={{ color: "red", fontSize: "0.8em" }}>
                                {registerError}
                            </span>
                        )}
                    </div>
                    <div className="form-group mt-3">
                        <label>Password *</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Password"
                            name="password"
                            autoComplete=""
                        />
                        {registerError.includes("Password") && (
                            <span style={{ color: "red", fontSize: "0.8em" }}>
                                {registerError}
                            </span>
                        )}
                    </div>
                    <div className="form-group mt-3">
                        <label>Confirm Password *</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Confirm Password"
                            name="repeat_password"
                            autoComplete=""
                        />
                        {registerError.toLowerCase().includes("confirm") && (
                            <span style={{ color: "red", fontSize: "0.8em" }}>
                                {registerError}
                            </span>
                        )}
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                handleSubmit();
                            }}
                        >
                            {loading ? (
                                <PulseLoader size={8} color={"#ffffff"} />
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </div>
                    {registerError && (
                        <span style={{ color: "red", fontSize: "0.8em" }}>
                            {registerError}
                        </span>
                    )}
                </div>
            </form>
        </div>
    );
}

export default Register;

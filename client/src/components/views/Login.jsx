import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

function Login() {
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const navigate = useNavigate();
    const handleLogin = async () => {
        await axios
            .post("/api/user/login", user)
            .then((res) => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("isUser", res.data.isUser);
                localStorage.setItem("id", res.data.id);
                navigate("/myBlogs");
            })
            .catch((err) => {
                // console.dir(err);
                setError(err.response.data.message);
            });
    };
    return (
        <div className="Auth-form-container-login">
            <form
                className="Auth-form"
                onChange={(e) => {
                    handleChange(e);
                }}
            >
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>

                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                            name="email"
                        />
                        {error && (
                            <span style={{ color: "red", fontSize: "0.8em" }}>
                                {/* <Alert key={"danger"} variant={"danger"}> */}
                                {error}
                                {/* </Alert> */}
                            </span>
                        )}
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            name="password"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                handleLogin();
                            }}
                        >
                            Submit
                        </button>
                    </div>
                    <p className="forgot-password text-right mt-2">
                        Forgot <a href="#">password?</a>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;

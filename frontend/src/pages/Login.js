import React from 'react';

import { useNavigate, BrowserRouter, Link } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Login() {
    const navigate = useNavigate()

    function navigateHome() {
        navigate("/");
    }
    return (
    <div>
        <h1 style={{"text-align":'center'}}>Login</h1>
        <div style={{display: 'flex',  justifyContent:'center'}}>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={navigateHome}>
                    Submit
                </Button>

                <nav>
                    <ul style={{"listStyle": "none"}}>
                        <li style={{"textAlign":'center'}}>
                        <Link to="/forgotpassword">Forgot my password</Link>
                        </li>
                        <li style={{"textAlign":'center'}}>
                        <Link to="/signup">Sign Up</Link>
                        </li>
                    </ul>
                </nav>

            </Form>

        </div>
    </div>
    );
}

export default Login;
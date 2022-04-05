import React, { useEffect, useState } from 'react';

import { useNavigate, BrowserRouter, Link } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function navigateHome() {
        console.log(email);
        console.log(password);
        navigate("/home");
    }

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }


    return (
    <div>
        <h1 style={{"textAlign":'center'}}>Login</h1>
        <div style={{display: 'flex',  justifyContent:'center'}}>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={!validateForm()} onClick={navigateHome}>
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
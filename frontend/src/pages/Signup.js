import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate, BrowserRouter, Link } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Signup() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordValidate, setPasswordValidate] = useState("");

    function navigateLogin(event) {
        event.preventDefault();
        console.log(email);
        console.log(password);
        console.log("Received submit");

        const request_body = {
            "email_id": email,
            "password": password
        }

        axios.post('/api/usersignup', request_body)
            .then(response => {
                console.log(response.data);
                if(response.data.status) {
                    alert("Signup Successful");
                    navigate("/login");
                }
                else {
                    alert("Signup Failed, possibly due to duplicate email");
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    function validateForm() {
        return email.length > 0 && password.length > 0 && password == passwordValidate;
    }


    return (
    <div>
        <h1 style={{"textAlign":'center'}}>Sign Up</h1>
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
                    <Form.Label style={{margin: "1px"}}>Password</Form.Label>
                    <br />
                    <Form.Text style={{margin: "1px"}} className="text-muted">
                        Enter your password with no special characters
                    </Form.Text>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label style={{margin: "1px"}}>Password</Form.Label>
                    <br />
                    <Form.Text style={{margin: "1px"}} className="text-muted">
                        Retype your password
                    </Form.Text>
                    <Form.Control 
                        type="password" 
                        placeholder="Retype Password" 
                        value={passwordValidate}
                        onChange={(e) => setPasswordValidate(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={!validateForm()} onClick={navigateLogin}>
                    Submit
                </Button>

            </Form>

        </div>
    </div>
    );
}

export default Signup;
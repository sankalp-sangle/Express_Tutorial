import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import {NavLink} from 'react-router-dom';

function Navigationbar(props) {
    return (
        <div>
            <Navbar bg="light" expand={false}>
            <Container fluid>
                <Navbar.Brand href="#">Hypertension Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel">Navigation</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                    <NavLink to={{pathname:'/home'}} state={{id:props.id}}>Home</NavLink>
                    <NavLink to={{pathname:'/calendar'}} state={{id:props.id}}>Calendar</NavLink>
                    <NavLink to={{pathname:'/moreinfo'}} state={{id:props.id}}>Info/FAQ</NavLink>
                    <NavLink to={{pathname:'/settings'}} state={{id:props.id}}>Settings</NavLink>
                    <NavLink to={{pathname:'/login'}}>Sign Out</NavLink>
                    </Nav>
                </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
            </Navbar>
        </div>
    );
}

export default Navigationbar;
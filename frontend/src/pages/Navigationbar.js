import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';

class Navigationbar extends React.Component {

    render() {
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
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/calendar">Calendar</Nav.Link>
                        <Nav.Link href="/moreinfo">Info/FAQ</Nav.Link>
                        <Nav.Link href="/settings">Settings</Nav.Link>
                        <Nav.Link href="/login">Sign Out</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
                </Navbar>
          </div>
      );
    }
}

export default Navigationbar;
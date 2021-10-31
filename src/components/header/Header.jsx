import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import icon from '../../assests/image/photo/icon.png'

const Header = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="home"><img src={icon} height="35px" alt="" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link className="me-4" href="home">Home</Nav.Link>
                        <Nav.Link className="me-4" href="cart">Orders</Nav.Link>
                        <Nav.Link className="me-4" href="admin">Admin</Nav.Link>
                        <Button className="me-4" href="login" variant="danger">Login</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
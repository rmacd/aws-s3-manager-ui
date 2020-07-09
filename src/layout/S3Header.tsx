import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";

function S3Header() {
    return (
        <header className={"mb-3"}>
            <Navbar variant={"dark"} bg={"dark"} sticky={"top"} fixed={"top"}>
                <Navbar.Brand href={"#"}>AWS S3 Manager</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav"/>
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to={"/"} className={"nav-link"}>Home</Nav.Link>
                        <Nav.Link as={Link} to={"/list"}>List items</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}

export default S3Header;
import React from 'react';
import Navbar from "react-bootstrap/Navbar";

function S3Header() {
    return (
        <header>
            <Navbar variant={"dark"} bg={"dark"} sticky={"top"} fixed={"top"}>
                <Navbar.Brand href={"#home"}>AWS S3 Manager</Navbar.Brand>
            </Navbar>
        </header>
    );
}

export default S3Header;
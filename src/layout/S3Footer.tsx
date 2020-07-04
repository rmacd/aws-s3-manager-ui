import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";

function S3Footer() {
    return (
        <Navbar bg={"light"} fixed={"bottom"}>
            <NavbarBrand bsPrefix={"small"}>v1.0</NavbarBrand>
        </Navbar>
    );
}

export default S3Footer;

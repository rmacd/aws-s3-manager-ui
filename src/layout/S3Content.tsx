import React from 'react';
import S3UploadForm from "../components/sections/S3UploadForm";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import S3ListDocuments from "../components/sections/S3ListDocuments";

export default function S3Main() {
    return (
        <Container>
            <Row>
                <Col>
                    <Tabs
                        transition={false}
                        defaultActiveKey="upload"
                        id="home-tabs"
                        className={"mt-5"}>
                        <Tab eventKey={"upload"} title={"Upload"} className={"p-3"}>
                            <S3UploadForm/>
                        </Tab>
                        <Tab eventKey={"list"} title={"List"} className={"p-3"}>
                            <S3ListDocuments/>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    );
}
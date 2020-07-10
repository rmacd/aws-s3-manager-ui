import React from "react";
import {Modal, Button} from 'react-bootstrap';
import S3TemporaryLink from "./S3TemporaryLink";

interface IS3OVModal {
    show: boolean,
    object_key: string,
    name: string,
    fetchLinkCB: (uri: string) => void,
    modalCloseCB: () => void,
    modalDeleteCB: (object_key: string) => void,
    signedLink: string,
}

export default class S3ObjectViewerModal extends React.Component<IS3OVModal, any> {
    render() {
        return (
            <>
                <Modal show={this.props.show} onHide={this.props.modalCloseCB} size={"xl"}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button variant={"primary"} onClick={() => this.props.fetchLinkCB(this.props.object_key)}>Generate
                            temporary link</Button>
                        <S3TemporaryLink signedLink={this.props.signedLink}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-danger" className={"mr-2"}
                                onClick={() => this.props.modalDeleteCB(this.props.object_key)}>
                            Delete
                        </Button>
                        <Button variant="secondary" onClick={this.props.modalCloseCB}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    };
}
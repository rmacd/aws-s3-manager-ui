import React from "react";
import {Modal, Button} from 'react-bootstrap';
import S3TemporaryLink from "./S3TemporaryLink";
import axios from "axios";

interface IS3OVModal {
    show: boolean,
    path: string,
    name: string,
    cb: () => void,
}

export default class S3ObjectViewerModal extends React.Component<IS3OVModal, any> {
    state = {
        signedLink: '',
    };

    fetchTemporaryLink(uri: string) {
        axios.get('/api/items/',
            {
                params: {
                    download: encodeURIComponent(uri)
                }
            })
            .then(res => {
                console.log(res.data);
                this.setState({
                    signedLink: res.data.signedLink
                })
            })
    }

    render() {
        return (
            <>
                <Modal show={this.props.show} onHide={this.props.cb} size={"xl"}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button variant={"primary"} onClick={() => this.fetchTemporaryLink(this.props.path)}>Generate
                            temporary link</Button>
                        <S3TemporaryLink temporaryLink={this.state.signedLink}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.cb}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    };
}
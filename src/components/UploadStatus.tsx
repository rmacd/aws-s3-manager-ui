import React from 'react';
import Alert from "react-bootstrap/Alert";
import UploadActionsInterface from "../interfaces/UploadActionsInterface";

export default class UploadStatus extends React.Component<UploadActionsInterface, any> {
    constructor(props: UploadActionsInterface) {
        super(props);
        this.state = {
            uploading: false
        }
    }

    componentWillReceiveProps(props: UploadActionsInterface) {
        this.setState(
            props
        );
    }

    render() {
        if (this.state.uploading) {
            return (
                <Alert variant={"primary"} className={"mt-3"}>Uploading...</Alert>
            )
        } else {
            if (this.state.error) {
                return (
                    <Alert variant={"danger"} className={"mt-3"}>Unable to upload
                        file: {this.state.errorMessage}</Alert>
                )
            }
        }
        return null;
    }
}

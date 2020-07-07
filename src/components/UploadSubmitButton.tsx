import React from 'react';
import Button from "react-bootstrap/Button";

type UploadSubmitButtonProps = {
    fnDoUpload: () => void;
}

export default class UploadSubmitButton extends React.Component<UploadSubmitButtonProps, any> {
    render() {
        return (
            <Button variant={"primary"} type={"button"} className={"mt-3"} onClick={this.props.fnDoUpload}>Upload</Button>
        );
    }
}
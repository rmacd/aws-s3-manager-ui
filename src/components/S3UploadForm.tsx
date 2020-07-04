import React, {createRef} from 'react';
import FormFileLabel from "react-bootstrap/FormFileLabel";
import Form from "react-bootstrap/Form";
import FormFileInput from "react-bootstrap/FormFileInput";
import UploadSubmitButton from "./UploadSubmitButton";
import AsyncRequest from "./AsyncRequest";
import {AxiosResponse} from "axios";
import UploadStatus from "./UploadStatus";

// https://stackoverflow.com/questions/39041710/react-js-change-child-components-state-from-parent-component

let getDataRef = createRef<any>();

export default class S3UploadForm extends React.Component {

    state = {
        uploading: false,
        error: false,
        errorMessage: "",
    };

    doUpload = () => {
        this.setState({
            uploading: true,
        });
        getDataRef.current.getData();
    };

    requestCallback = (response: AxiosResponse) => {
        this.setState({
            uploading: false,
        });
        console.log(response);
        return response;
    };

    errorCallback = (error: AxiosResponse) => {
        console.log(error);
        return Promise.reject(error);
    };

    render() {
        return (
            <Form>
                <AsyncRequest callbackSuccess={this.requestCallback} callbackError={this.errorCallback} ref={getDataRef}/>
                <FormFileLabel htmlFor={"upload"}>Upload a file to the public drive</FormFileLabel>
                <FormFileInput id={"upload"} className={"p-3"}/>
                <UploadSubmitButton fnDoUpload={this.doUpload}>{this.state}</UploadSubmitButton>
                <UploadStatus
                    uploading={this.state.uploading}
                    error={this.state.error}
                    errorMessage={this.state.errorMessage}
                />
                {/*<UploadStatus ref={this.childRef}/>*/}
            </Form>
        )
    }
}
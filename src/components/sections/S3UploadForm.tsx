import React, {createRef} from 'react';
import FormFileLabel from "react-bootstrap/FormFileLabel";
import Form from "react-bootstrap/Form";
import UploadSubmitButton from "../UploadSubmitButton";
import AsyncRequest from "../AsyncRequest";
import {AxiosResponse} from "axios";
import UploadStatus from "../UploadStatus";
import IUploadForm from "../../interfaces/IUploadForm";
import Alert from "react-bootstrap/Alert";

// https://stackoverflow.com/questions/39041710/react-js-change-child-components-state-from-parent-component

let asyncRequestRef = createRef<any>();

export default class S3UploadForm extends React.Component<IUploadForm, any> {
    state = {
        uploading: false,
        error: false,
        errorMessage: "",
        path: '',
        files: FileList.prototype,
    };

    constructor(props: IUploadForm) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState(this.props.location.state);
    }

    doUpload = () => {
        this.setState({
            uploading: true,
        });
        asyncRequestRef.current.postData();
    };

    uploadSuccessCallback = (response: AxiosResponse) => {
        this.setState({
            uploading: false,
        });
        return response;
    };

    errorCallback = (error: AxiosResponse) => {
        console.log(error);
        return Promise.reject(error);
    };

    handleChange(selectorFiles: FileList | null) {
        this.setState({files: selectorFiles});
    };

    render() {
        return (
            <Form>
                <AsyncRequest
                    callbackSuccess={this.uploadSuccessCallback}
                    callbackError={this.errorCallback}
                    files={this.state.files}
                    ref={asyncRequestRef} path={this.state.path}/>
                <Alert variant={"info"}>
                    <FormFileLabel htmlFor={"upload"}>Upload a file to s3:/{this.state.path}</FormFileLabel>
                </Alert>
                <input id={"upload"} ref={"fileRef"} type="file" onChange={ (e) => this.handleChange(e.target.files) } />
                {/*<FormFileInput id={"upload"} className={"p-3"} ref={fileRef}/>*/}
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
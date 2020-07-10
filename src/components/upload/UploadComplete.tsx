import React from 'react';
import Alert from 'react-bootstrap/Alert';
import {Link} from 'react-router-dom';

export default class UploadComplete extends React.Component<{ upload_complete: boolean, path: string }, any> {
    render() {
        if (this.props.upload_complete) {
            return (
                <Alert variant={"success"} className={"mt-3"}>
                    Upload complete, you can now either upload another file to the same location
                    or <Link to={{pathname: "/list", state: {path: this.props.path}}}>go back</Link>
                </Alert>
            );
        }
        return null;
    }
}
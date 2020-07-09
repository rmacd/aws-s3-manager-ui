import React from 'react';
import Alert from "react-bootstrap/Alert";
import IS3TemporaryLink from "../../interfaces/IS3TemporaryLink";

export default class S3TemporaryLink extends React.Component<IS3TemporaryLink, any> {
    render() {
        if (!this.props.signedLink) {
            return null;
        }
        return (
            <Alert variant={"info"} className={"mt-3"}>
                <div>Temporary link (valid for 60 seconds): <a href={`${this.props.signedLink}`}
                                                               target={"_blank"}
                                                               rel={"noopener noreferrer"}>link</a></div>
                <textarea className={"mt-2 w-100"} value={this.props.signedLink} readOnly={true} rows={5}/>
            </Alert>
        );
    }
};
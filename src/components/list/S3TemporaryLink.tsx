import React from 'react';
import Alert from "react-bootstrap/Alert";
import IS3TemporaryLink from "../../interfaces/IS3TemporaryLink";

export default class S3TemporaryLink extends React.Component<IS3TemporaryLink, any> {
    render() {
        if (!this.props.temporaryLink) {
            return null;
        }
        return (
            <Alert>
                Temporary link (valid for 60 seconds): <a href={`${this.props.temporaryLink}`} target={"_blank"}>link</a>
            </Alert>
        );
    }
};
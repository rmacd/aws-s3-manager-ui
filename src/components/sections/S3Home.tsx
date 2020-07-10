import React from 'react';
import Alert from "react-bootstrap/Alert";
import {AppContext} from '../../App';

export default class S3Home extends React.Component {
    render() {
        return (
            <>
                <h3>Welcome</h3>
                <p>Use this tool to manage your S3 bucket</p>
                <Alert variant={"info"}>
                    <AppContext.Consumer>
                        {
                            ({bucket}) => {
                                return <>Bucket: {bucket}</>
                            }
                        }
                    </AppContext.Consumer>
                </Alert>
            </>
        );
    }
}
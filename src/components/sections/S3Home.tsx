import React from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from "react-bootstrap/Alert";

export default class S3Home extends React.Component {
    state = {
        currently_fetching: false,
        bucket: '',
    };

    componentDidMount() {
        this.setState({
            currently_fetching: true,
        });
        axios.get(`/api/version`,)
            .then(res => {
                const objectResponse = res.data;
                this.setState({
                    bucket: objectResponse.bucket,
                });
                this.setState({currently_fetching: false});
            })
    }

    render() {
        if (this.state.currently_fetching) {
            return (
                <>
                    <CircularProgress/>
                </>
            );
        }
        if (undefined === this.state.bucket) {
            return (
                <Alert variant={"danger"}>
                    Error loading API
                </Alert>
            );
        }
        return (
            <>
                <h3>Welcome</h3>
                <p>Use this tool to manage your S3 bucket</p>
                <Alert variant={"info"}>
                    Bucket name: {this.state.bucket}
                </Alert>
            </>
        );
    }
}
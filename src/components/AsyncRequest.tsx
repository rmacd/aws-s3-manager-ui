import React from "react";
import axios, {AxiosInstance, AxiosResponse} from "axios";

interface AxiosRequest {
    callbackSuccess: (response: AxiosResponse) => AxiosResponse,
    callbackError: (response: AxiosResponse) => Promise<any>,
    files: FileList,
    path: string,
}

// handle that gets updated
let axiosHandle: AxiosInstance;

export default class AsyncRequest extends React.Component<AxiosRequest, any> {
    constructor(props: AxiosRequest) {
        super(props);
        axiosHandle = axios.create({withCredentials: true});
    }

    componentWillReceiveProps(props: AxiosRequest) {
        this.setState(props);
    }

    async postData() {
        axiosHandle.interceptors.response.use(this.props.callbackSuccess, this.props.callbackError);
        console.log("post:", this.props.files);
        if (null === this.props.files) return this.props.callbackError;

        const formData = new FormData();
        formData.append('file', this.props.files[0]);
        formData.append('path', this.props.path);
        await axiosHandle.post('/api/upload', formData).then(res => {
            console.log(res.statusText);
        });
    }

    render() {
        return null;
    }
}
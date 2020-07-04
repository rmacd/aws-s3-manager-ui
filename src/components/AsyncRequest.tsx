import React from "react";
import axios, {AxiosInstance, AxiosResponse} from "axios";

interface AxiosRequest {
    callbackSuccess: (response: AxiosResponse) => AxiosResponse,
    callbackError: (response: AxiosResponse) => Promise<any>,
}

// handle that gets updated
let axiosHandle: AxiosInstance;

export default class AsyncRequest extends React.Component<AxiosRequest, any> {
    constructor(props: AxiosRequest) {
        super(props);
        axiosHandle = axios.create();
    }

    componentWillReceiveProps(props: AxiosRequest) {
        this.setState(props);
    }

    async getData() {
        let body = {
            title: "This is POST request with body",
            completed: true
        };
        axiosHandle.interceptors.response.use(this.props.callbackSuccess, this.props.callbackError);
        await axiosHandle.post("https://jsonplaceholder.typicode.com/todos", body);
    }

    render() {
        return null;
    }
}
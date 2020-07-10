import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import S3Header from "./layout/S3Header";
import S3Footer from "./layout/S3Footer";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import S3UploadForm from "./components/sections/S3UploadForm";
import S3Home from "./components/sections/S3Home";
import S3ListDocuments from "./components/sections/S3ListDocuments";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Cookies from "js-cookie";

// send xsrf on all requests
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-CSRF-Token'] = Cookies.get('_csrf-aws-s3mgr');

export const AppContext = React.createContext({
    bucket: ''
});

export default class App extends React.Component {
    state = {
        bucket: ''
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
        return (
            <div>
                <Router>
                    <S3Header/>
                    <AppContext.Provider value={{ bucket: this.state.bucket }}>
                        <Container>
                            <Switch>
                                <Route path={"/"} exact component={S3Home}/>
                                <Route path={"/list"} exact component={S3ListDocuments}/>
                                <Route path={"/upload"} exact component={S3UploadForm}/>
                            </Switch>
                        </Container>
                    </AppContext.Provider>
                </Router>
                <S3Footer/>
            </div>
        );
    }
}

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

// send xsrf on all requests
axios.defaults.withCredentials = true;

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <S3Header/>
                    <Container>
                        <Switch>
                            <Route path={"/"} exact component={S3Home}/>
                            <Route path={"/list"} exact component={S3ListDocuments}/>
                            <Route path={"/upload"} exact component={S3UploadForm}/>
                        </Switch>
                    </Container>
                </Router>
                <S3Footer/>
            </div>
        );
    }
}

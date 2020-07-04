import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import S3Header from "./layout/S3Header";
import S3Footer from "./layout/S3Footer";
import S3Main from "./layout/S3Content";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <S3Header/>
                <S3Main/>
                <S3Footer/>
            </div>
        );
    }
}

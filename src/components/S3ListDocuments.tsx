import React from 'react';
import axios from 'axios';
import S3ListDocumentsRow from "./S3ListDocumentsRow";
import {S3ObjectType} from "./list/S3LDFilename";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import S3Breadcrumb from "./list/S3Breadcrumb";

export default class S3ListDocuments extends React.Component {
    state = {
        path: '',
        objects: [{
            name: '',
            object_key: '',
            type: S3ObjectType.object,
            size: -1,
            is_public: false,
        }]
    };

    componentDidMount() {
        this.fetchPath('');
    }

    fetchPath(uri: string) {
        this.setState({
            path: uri
        });
        console.log("fetching:", uri);
        axios.get(`/api/items?getACL`, {
            params: {
                path: uri
            }
        })
            .then(res => {
                const objectResponse = res.data;
                this.setState({
                    objects: objectResponse.objects
                })
            })
    }

    render() {
        return (
            <>
                <S3Breadcrumb path={this.state.path} navigationCallback={this.fetchPath.bind(this)}/>
                <table className={"table table-reflow"}>
                    <thead>
                    <tr>
                        <th>Filename</th>
                        <th>Size</th>
                        <th>Public</th>
                    </tr>
                    </thead>
                    <tbody>
                    {console.log(this.state.objects)}
                    {this.state.objects.map(obj => <S3ListDocumentsRow
                        navigationCallback={this.fetchPath.bind(this)}
                        name={obj.name}
                        object_key={obj.object_key}
                        type={obj.type}
                        size={obj.size}
                        is_public={obj.is_public}
                    />)}
                    </tbody>
                </table>
            </>
        );
    }
}
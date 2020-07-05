import React from 'react';
import axios from 'axios';
import S3LDRow from "./list/S3LDRow";
import {S3ObjectType} from "./list/S3LDFilename";
import S3Breadcrumb from "./list/S3Breadcrumb";
import S3ObjectViewerModal from "./list/S3ObjectViewerModal";

export default class S3ListDocuments extends React.Component {
    state = {
        path: '',
        objects: [{
            name: '',
            object_key: '',
            type: S3ObjectType.object,
            size: -1,
            is_public: false,
        }],
        objectViewer: {
            show: false,
            path: '',
            name: '',
        }
    };

    componentDidMount() {
        this.fetchPath('');
    }

    fetchPath(uri: string) {
        this.setState({
            path: uri
        });
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

    openObject(object_key: string, name: string) {
        if (object_key.endsWith('.txt') || object_key.endsWith('.pdf')) {
            this.setState({
                objectViewer: {
                    show: true,
                    path: object_key,
                    name: name,
                }
            })
        }
    }

    toggleVisibility(object_key: string) {
        console.log("toggle visibility on", object_key);
    }

    modal_hide() {
        this.setState({objectViewer: {show: false}})
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
                    {this.state.objects.map(obj => <S3LDRow
                        navigationCallback={this.fetchPath.bind(this)}
                        openObjectCallback={this.openObject.bind(this)}
                        toggleVisibilityCB={this.toggleVisibility.bind(this)}
                        name={obj.name}
                        object_key={obj.object_key}
                        type={obj.type}
                        size={obj.size}
                        is_public={obj.is_public}
                    />)}
                    </tbody>
                </table>
                <S3ObjectViewerModal
                    path={this.state.objectViewer.path} name={this.state.objectViewer.name}
                    show={this.state.objectViewer.show}
                    cb={this.modal_hide.bind(this)}
                />
            </>
        );
    }
}
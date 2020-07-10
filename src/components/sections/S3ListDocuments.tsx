import React from 'react';
import axios from 'axios';
import S3LDRow from "../list/S3LDRow";
import {S3ObjectType} from "../list/S3LDFilename";
import S3Breadcrumb from "../list/S3Breadcrumb";
import S3ObjectViewerModal from "../list/S3ObjectViewerModal";
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from "react-bootstrap/Alert";
import {Link} from "react-router-dom";
import {AddCircle} from "@material-ui/icons";
import {AppContext} from '../../App';

export default class S3ListDocuments extends React.Component {
    state = {
        path: '',
        currently_fetching: false,
        objects: [{
            name: '',
            object_key: '',
            type: S3ObjectType.object,
            size: -1,
            is_public: false,
        }],
        objectInfoModal: {
            show: false,
            path: '',
            name: '',
            signedLink: '',
        }
    };

    componentDidMount() {
        this.fetchItems('');
    }

    fetchItems(uri: string) {
        this.setState({
            path: uri,
            currently_fetching: true,
        });
        axios.get(`/api/items?getACL`, {
            params: {
                path: uri
            }
        })
            .then(res => {
                const objectResponse = res.data;
                this.setState({
                    objects: objectResponse.objects,
                });
                this.setState({currently_fetching: false});
            })
    }

    fetchSignedLink(uri: string) {
        axios.get('/api/items',
            {
                params: {
                    download: encodeURIComponent(uri)
                }
            })
            .then(res => {
                const signedLink = Object.assign({signedLink: res.data.signedLink}, this.state.objectInfoModal);
                this.setState({
                    objectInfoModal: signedLink
                })
            });
        console.log(this.state.objectInfoModal);
    }

    modalDelete(object_key: string) {
        axios.delete('/api/items',
            {
                params: {
                    object_key: encodeURIComponent(object_key)
                }
            })
            .then(res => {
                this.fetchItems(this.state.path);
                this.modalHide();
            })
    }

    openObject(object_key: string, name: string) {
        this.setState({
            objectInfoModal: {
                show: true,
                path: object_key,
                name: name,
            }
        })
    }

    toggleVisibility(object_key: string) {
        let s3Object = this.state.objects.find(s => s.object_key === object_key);
        if (s3Object === undefined) {
            return
        }

        try {
            axios.put('/api/items/',
                {
                    item: encodeURIComponent(object_key),
                    is_public: !s3Object.is_public,
                })
                .then(value => {
                        this.setState({
                            objects: this.state.objects.map((item, index) =>
                                item.object_key === object_key ? {...item, is_public: !item.is_public} : item
                            )
                        })
                    }
                );
        } catch (e) {
            console.error(e);
        }
    }

    modalHide() {
        this.setState({objectInfoModal: {show: false}});
    }

    render() {
        if (this.state.currently_fetching) {
            return (
                <>
                    <S3Breadcrumb path={this.state.path} navigationCallback={this.fetchItems.bind(this)}/>
                    <CircularProgress/>
                </>
            );
        }
        return (
            <>
                <S3Breadcrumb path={this.state.path} navigationCallback={this.fetchItems.bind(this)}/>
                <table className={"table table-reflow"}>
                    <thead>
                    <tr>
                        <th>Filename</th>
                        <th>Size</th>
                        <th className={"text-right"}>Public</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.objects.map(obj => <S3LDRow
                        key={obj.object_key}
                        navigationCB={this.fetchItems.bind(this)}
                        objectInfoCB={this.openObject.bind(this)}
                        toggleVisibilityCB={this.toggleVisibility.bind(this)}
                        name={obj.name}
                        object_key={obj.object_key}
                        type={obj.type}
                        size={obj.size}
                        is_public={obj.is_public}
                    />)}
                    </tbody>
                </table>
                <Alert variant={"light"}>
                    <Link to={{pathname: "/upload", state: {path: this.state.path}}}><AddCircle/> Add a document</Link>
                </Alert>
                <S3ObjectViewerModal
                    object_key={this.state.objectInfoModal.path} name={this.state.objectInfoModal.name}
                    show={this.state.objectInfoModal.show}
                    modalCloseCB={this.modalHide.bind(this)}
                    modalDeleteCB={this.modalDelete.bind(this)}
                    fetchLinkCB={this.fetchSignedLink.bind(this)}
                    signedLink={this.state.objectInfoModal.signedLink}
                />
            </>
        );
    }
}
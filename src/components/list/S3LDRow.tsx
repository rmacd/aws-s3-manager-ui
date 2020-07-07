import React from 'react';
import S3ListObjectInterface from '../../interfaces/S3ListObjectInterface';
import S3LDFilename, {S3ObjectType} from "./S3LDFilename";
import S3IsPublicIcon from "./S3IsPublicIcon";

export default class S3LDRow extends React.Component<S3ListObjectInterface, any> {
    constructor(props: S3ListObjectInterface) {
        super(props);
        // this.setState({local_is_public: props.is_public});
    }
    state = {
        // using a local variable to stop the entire table from being re-rendered
        local_is_public: false
    };

    setVisibility(object_key: string) {
        this.props.setVisibilityCB(object_key, !this.state.local_is_public);
    }

    render() {
        // render the icon that shows whether the item is public or private
        const is_public = (this.props.type === S3ObjectType.object)
            ? <S3IsPublicIcon
                is_public={this.state.local_is_public || false}
                object_key={this.props.object_key || ''}
                setVisibilityCB={this.setVisibility.bind(this)}
            />
            : undefined;
        const filename = <S3LDFilename name={this.props.name} type={this.props.type} />;

        // entry: if it's a folder, call the navCB, otherwise call parent modal viewer
        const entry = (this.props.type === S3ObjectType.folder)
            ? <a href={"#"} onClick={() => this.props.navigationCB(this.props.object_key)}>{filename}</a>
            : <a href={"#"} onClick={() => this.props.objectInfoCB(this.props.object_key, this.props.name)}>{filename}</a>;

        return (
            <tr>
                <td>
                    {entry}
                </td>
                <td>{this.props.size}</td>
                <td>{is_public}</td>
            </tr>
        );
    }
}
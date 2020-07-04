import React from 'react';
import S3ListObjectInterface from '../interfaces/S3ListObjectInterface';
import S3LDFilename, {S3ObjectType} from "./list/S3LDFilename";
import S3IsPublicIcon from "./list/S3IsPublicIcon";

export default class S3ListDocumentsRow extends React.Component<S3ListObjectInterface, any> {
    render() {
        const is_public = (this.props.type === S3ObjectType.object) ? <S3IsPublicIcon is_public={this.props.is_public || false}/> : undefined;
        const filename = <S3LDFilename name={this.props.name} type={this.props.type} />;
        const entry = <a href={"#"} onClick={() => this.props.navigationCallback(this.props.object_key)}>{filename}</a>;
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
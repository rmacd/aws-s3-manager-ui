import React from 'react';
import S3ListObjectInterface from '../../interfaces/S3ListObjectInterface';
import S3LDFilename, {S3ObjectType} from "./S3LDFilename";
import S3IsPublicIcon from "./S3IsPublicIcon";
import {AppContext} from "../../App";
import {Link} from "@material-ui/icons";

export default class S3LDRow extends React.Component<S3ListObjectInterface, any> {

    render() {
        // render the icon that shows whether the item is public or private
        const is_public = (this.props.type === S3ObjectType.object)
            ? <S3IsPublicIcon
                is_public={this.props.is_public || false}
                object_key={this.props.object_key || ''}
                toggleVisibilityCB={this.props.toggleVisibilityCB.bind(this)}
            />
            : undefined;
        const filename = <S3LDFilename name={this.props.name} type={this.props.type}/>;

        // entry: if it's a folder, call the navCB, otherwise call parent modal viewer
        const entry = (this.props.type === S3ObjectType.folder)
            ? <a href={"#"} onClick={() => this.props.navigationCB(this.props.object_key)}>{filename}</a>
            : <a href={"#"}
                 onClick={() => this.props.objectInfoCB(this.props.object_key, this.props.name)}>{filename}</a>;

        // todo - fix this so that we just call a single function
        const ext_link = (this.props.type === S3ObjectType.folder)
            ? () => {
                return null
            }
            : (bucket: string, object_key: string) => {
                return (this.props.is_public)
                    ? <a href={`https://${bucket}.s3.amazonaws.com/${object_key}`}
                         about={"Open public link"} target={"_blank"} rel={"noopener noreferrer"}><Link/></a>
                    : '';
            };

        return (
            <tr>
                <td>
                    {entry}
                </td>
                <td>{this.props.size}</td>
                <AppContext.Consumer>
                    {
                        ({bucket}) => {
                            return (
                                <>
                                    <td className={"text-right"}>{ext_link(bucket, this.props.object_key)} {is_public}</td>
                                </>
                            )
                        }
                    }
                </AppContext.Consumer>
            </tr>
        );
    }
}
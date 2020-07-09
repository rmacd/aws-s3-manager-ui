import React from 'react';
import {FolderOutlined, Description} from "@material-ui/icons";

export interface IS3LDFilename {
    name: string,
    type: S3ObjectType,
}

export enum S3ObjectType {
    folder = 'folder',
    object = 'object',
}

export default class S3LDFilename extends React.Component<IS3LDFilename, any> {
    render() {
        const icon = (this.props.type === S3ObjectType.folder) ? <FolderOutlined/> : <Description/>;
        return (
            <>
                <span className={"mr-2"}>{icon}</span>
                {this.props.name}
            </>
        );
    }
}
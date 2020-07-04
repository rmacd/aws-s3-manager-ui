import React from 'react';
import {S3ObjectType} from "../components/list/S3LDFilename";

export default interface S3ListObjectInterface {
    navigationCallback: (name: string) => void,
    name: string,
    object_key: string,
    size?: number,
    type: S3ObjectType,
    is_public?: boolean,
}

export class S3ListObjectInterfaceImpl implements S3ListObjectInterface {
    constructor() {
        this.navigationCallback = () => '';
        this.name = '';
        this.object_key = '';
        this.size = -1;
        this.type = S3ObjectType.folder;
        this.is_public = undefined;
    }

    navigationCallback: () => string;
    name: string;
    object_key: string;
    size?: number;
    type: S3ObjectType;
    is_public?: boolean;
}


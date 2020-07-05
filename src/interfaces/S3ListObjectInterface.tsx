import React from 'react';
import {S3ObjectType} from "../components/list/S3LDFilename";

export default interface S3ListObjectInterface {
    navigationCallback: (name: string) => void,
    openObjectCallback: (object_key: string, name: string) => void,
    toggleVisibilityCB: (object_key: string) => void,
    name: string,
    object_key: string,
    size?: number,
    type: S3ObjectType,
    is_public?: boolean,
}

export class S3ListObjectInterfaceImpl implements S3ListObjectInterface {
    constructor() {
        this.navigationCallback = () => '';
        this.openObjectCallback = () => '';
        this.toggleVisibilityCB = () => '';
        this.name = '';
        this.object_key = '';
        this.size = -1;
        this.type = S3ObjectType.folder;
        this.is_public = undefined;
    }

    navigationCallback: () => string;
    openObjectCallback: () => string;
    toggleVisibilityCB: () => string;
    name: string;
    object_key: string;
    size?: number;
    type: S3ObjectType;
    is_public?: boolean;
}


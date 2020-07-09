import React from 'react';
import {S3ObjectType} from "../components/list/S3LDFilename";

export default interface S3ListObjectInterface {
    navigationCB: (name: string) => void,
    objectInfoCB: (object_key: string, name: string) => void,
    toggleVisibilityCB: (object_key: string) => void,
    name: string,
    object_key: string,
    size?: number,
    type: S3ObjectType,
    is_public?: boolean,
}

export class S3ListObjectInterfaceImpl implements S3ListObjectInterface {
    constructor() {
        this.navigationCB = () => '';
        this.objectInfoCB = () => '';
        this.toggleVisibilityCB = (object_key) => '';
        this.name = '';
        this.object_key = '';
        this.size = -1;
        this.type = S3ObjectType.folder;
        this.is_public = undefined;
    }

    navigationCB: (name: string) => string;
    objectInfoCB: (object_key: string, name: string) => string;
    toggleVisibilityCB: (object_key: string) => void;
    name: string;
    object_key: string;
    size?: number;
    type: S3ObjectType;
    is_public?: boolean;
}


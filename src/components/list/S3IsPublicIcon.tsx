import React from 'react';
import {Check, VisibilityOff} from "@material-ui/icons";

interface IS3IsPublicIcon {
    object_key: string,
    is_public: boolean,
    toggleVisibilityCB: (object_key: string) => void,
}

export default class S3IsPublicIcon extends React.Component<IS3IsPublicIcon, any> {
    render() {
        const icon = (this.props.is_public) ? <Check/> : <VisibilityOff/>;
        return (
            <>
                <a href={"#"} onClick={() => this.props.toggleVisibilityCB(this.props.object_key)}>{icon}</a>
            </>
        );
    }
};
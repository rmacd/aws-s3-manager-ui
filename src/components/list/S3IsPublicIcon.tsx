import React from 'react';
import {Visibility, VisibilityOff} from "@material-ui/icons";

interface IS3IsPublicIcon {
    is_public: boolean
}

export default class S3IsPublicIcon extends React.Component<IS3IsPublicIcon, any> {
    render() {
        const is_public = (this.props.is_public) ? <Visibility/> : <VisibilityOff/>;
        console.log(this.props);
        return (
            <>
                {is_public}
            </>
        );
    }
};
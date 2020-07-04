import React from 'react';
import Breadcrumb from "react-bootstrap/Breadcrumb";

export interface IS3Breadcrumb {
    path: string,
    navigationCallback: (name: string) => void
}

export default class S3Breadcrumb extends React.Component<IS3Breadcrumb, any>{
    render() {
        console.log("Breadcrumb - current path:", this.props.path);
        const items = [];
        let currentPath = '';
        items.push(<Breadcrumb.Item href="#" onClick={() => this.props.navigationCallback('')}>Home</Breadcrumb.Item>);
        for (const item of this.props.path.split('/')) {
            if (item === '') continue;
            currentPath += `${item}/`;
            const s_currentPath = currentPath.toString();
            items.push(<Breadcrumb.Item href="#" onClick={() => this.props.navigationCallback(`${s_currentPath}`)}>{item}</Breadcrumb.Item>);
        }

        return (
            <Breadcrumb>
                {items}
            </Breadcrumb>
        );
    }
}
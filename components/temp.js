import React, { Component } from 'react';

export class temp extends Component {
    componentDidMount() {
        alert(this.props.data);
    }
    render() {
        return (
            <h1>
                { this.props.data }
            </h1>
        )
    }
}

export default temp

import React, { Component } from 'react'

class Icon extends Component {
    render = () => {
        return (
            <i style={{ color: this.props.color }} className={this.props.icon}></i>
        )
    }
}

export default Icon
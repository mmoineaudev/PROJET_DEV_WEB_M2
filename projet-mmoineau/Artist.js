import React, { Component } from 'react';

export default class Artist extends Component {
  render() {
    return (
      <div className="artist">
        { this.props.children }
      </div>
    )
  }
}

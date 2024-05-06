import React, { Component } from 'react';

class File extends Component {
  render() {
    return (
      <div style={{ cursor: 'pointer' }}>
        <span role="img" aria-label="File">&#x1F4C4;</span> {this.props.name}
      </div>
    );
  }
}

export default File;

import React, { Component } from 'react';

class Avatar extends Component {
  render() {
    return (
      <img {...this.props} style={styles} height={this.props.size || 30} width={this.props.size || 30}/>
    );
  }
}

const styles = {
  'border-radius': '50%',
  'margin-right': '10px'
};

export default Avatar;

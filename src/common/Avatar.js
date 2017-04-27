import React, { Component } from 'react';

const styles = {
  borderRadius: '50%',
  marginRight: '10px'
};

class Avatar extends Component {
  render() {
    return (
      <img {...this.props} style={styles} height={this.props.size || 30} width={this.props.size || 30 } alt={this.props.alt}/>
    );
  }
}



export default Avatar;

import React, { Component } from 'react';
import avatar from '../../img/avatar.png'
const styles = {
  borderRadius: '50%',
  marginRight: '10px',
  background: `#ddd url(${avatar})`,
};

class Avatar extends Component {
  render() {
    return (

      <img {...this.props} style={styles} height={this.props.size || 30} width={this.props.size || 30 } alt={this.props.alt}/>
    );
  }
}



export default Avatar;

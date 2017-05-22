import React, { Component } from 'react';
import avatar from '../../img/avatar.png'
const styles = {
  img: {
    borderRadius: '50%',
    borderRadius: '50%',
    marginRight: '10px',
    background: `#ddd`
  }


};

class Avatar extends Component {
  render() {
    return (

        <img {...this.props}
          src={this.props.src || avatar}
          style={styles.img}
          height={this.props.size || 30}
          width={this.props.size || 30 }
          alt={this.props.alt}/>


    );
  }
}



export default Avatar;

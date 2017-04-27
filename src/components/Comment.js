import React, { Component } from 'react';

const styles = {
  author:{
    fontWeight: 'bold',
    marginRight: 5,
    textDecoration: 'none',
    color: 'black',
  },
  comment:{
    marginTop: 0,
  }
}

class Comment extends Component {
  render() {
    return (
      <p style={styles.comment}>
        <a style={styles.author} href={this.props.authorLink}>{this.props.author}</a>
          {this.props.children}
      </p>
    );
  }
}


export default Comment;

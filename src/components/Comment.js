import React, { Component } from 'react';

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

export default Comment;

import React, { Component } from 'react';
import feedStore from  '../store.js'

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
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(e){
    e.preventDefault()
    if(confirm("Are you sure?")){
      return feedStore.deleteComment(this.props.postId, this.props.authorLink, this.props.id)
    }
  }

  renderRemove(){
    // if current user is the author allow it to delete
    if(feedStore.user._id == this.props.authorLink){
      return(
        <a style={styles.remove} href={`comment/${this.props.id}/delete`}
        onClick={this.handleRemove}>✕</a>
      )
    }

  }

  render() {
    return (
      <p style={styles.comment}>
        <a style={styles.author} href={this.props.authorLink}>{this.props.author}</a>
          {this.props.children} {this.renderRemove()}
      </p>
    )
  }
}


export default Comment;

import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import FeedItemHeader from './FeedItemHeader';
import FeedItemForm from './FeedItemForm';
import Comment from './Comment';

// these styles automaticaly create new components based on a dom obj
const Feed = styled.article`
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  margin: 30px 0;
`
const Image = styled.img`
  max-width: 100%;
`
const Comments = styled.section`
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  padding: 20px;
`
const Likes = styled.p`
  margin-top: 0;
`

class FeedItem extends Component {
  constructor(props) {
    super(props);
    this.addComment = this.addComment.bind(this);
    this.onLike = this.onLike.bind(this);
    this.state = {
      comments: this.props.obj.comments,
      likes: this.props.obj.likes,
    };

  }
  addComment(comment){
    const comments = this.state.comments
    comments.push({
      author: this.props.user.name,
      authorId: this.props.user.id,
      body: comment,
    })
    this.setState({comments: comments})
  }
  onLike(add=true){
    let likes = this.state.likes
    if(add){
      this.setState({likes: likes+1})
    }else{
      return this.setState({likes: likes-1})
    }
  }
  render() {
    const i = this.props.obj;
    return (
      <Feed>

        <FeedItemHeader
          avatar={i.authorImage}
          author={i.author}
          location={i.location}
          time={i.time}
        />

        <section>
          <Link to={`/post/${i.id}`}>
            <Image src={i.media} alt="media" />
          </Link>
        </section>
        <Comments>
          <Likes>{this.state.likes} likes</Likes>
          {i.comments.map(function(c, i){
            return(
              <Comment author={c.author} authorLink={c.authorId} key={i}>
                {c.body}
              </Comment>
            )
          })}
        </Comments>
        <FeedItemForm onSubmit={this.addComment} id={i.id} onLike={this.onLike} like={i.currentUserLike} />
      </Feed>
    );
  }
}

export default FeedItem;

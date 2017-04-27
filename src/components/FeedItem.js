import React, { Component } from 'react';
import styled from 'styled-components';
import FeedItemHeader from './FeedItemHeader';
import Comment from './Comment';


const Feed = styled.article`
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
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

class FeedItem extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.addComment = this.addComment.bind(this);
    this.state = {
      comments: this.props.obj.comments,
      comment: '',
    };

  }
  handleChange(event) {
    this.setState({comment: event.target.value});
  }
  addComment(){
    const comments = this.state.comments
    comments.push({
      author: this.props.user.name,
      authorId: this.props.user.id,
      body: this.state.comment,
    })
    this.setState({comments: comments})
    this.render();
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
          <Image src={i.media} alt="media" />
        </section>
        <Comments>
          <p className="content-likes">35 likes</p>
          {i.comments.map(function(c, i){
            return(
              <Comment author={c.author} authorLink={c.authorId} key={i}>
                {c.body}
              </Comment>
            )
          })}
        </Comments>
        <div>
          <input type="text" name="comment" onChange={this.handleChange} />
          <button onClick={this.addComment}>Comment</button>
        </div>
      </Feed>
    );
  }
}

export default FeedItem;

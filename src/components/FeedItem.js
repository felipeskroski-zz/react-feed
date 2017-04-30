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
          <Likes>{i.likes} likes</Likes>
          {i.comments.map(function(c, i){
            return(
              <Comment author={c.author} authorLink={c.authorId} key={i}>
                {c.body}
              </Comment>
            )
          })}
        </Comments>
        <FeedItemForm id={i.id} like={i.currentUserLike} />
      </Feed>
    );
  }
}

export default FeedItem;

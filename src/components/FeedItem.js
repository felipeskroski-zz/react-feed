import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {observer} from 'mobx-react';
import _ from 'lodash';
import styled from 'styled-components';
import feedStore from  '../store.js'
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

const FeedItem = observer(class FeedItem extends Component {


  renderComments(comments){
    return(
      _.map(comments, function(value, key) {
        const c = feedStore.comments[key]
        return(
          <Comment author={c.author} authorLink={c.author_id} key={key}>
            {c.body}
          </Comment>
        )
      })
    )
  }

  render() {
    const i = this.props.obj;
    return (
      <Feed>
        <FeedItemHeader
          avatar={i.author_image}
          author={i.author}
          location={i.author_location}
          time={i.time}
        />
        <section>
          <Link to={`/post/${i.id}`}>
            <Image src={i.media} alt="media" />
          </Link>
        </section>
        <Comments>
          <Likes>{Object.keys(i.likes).length} likes</Likes>
          {this.renderComments(i.comments)}
        </Comments>

        <FeedItemForm id={this.props.id}/>
      </Feed>
    );
  }
})

export default FeedItem;

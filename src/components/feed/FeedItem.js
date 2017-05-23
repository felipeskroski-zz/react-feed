import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {observer} from 'mobx-react';
//import {toJS} from 'mobx';
import _ from 'lodash';
import moment from 'moment';
import styled from 'styled-components';
import FeedItemHeader from './FeedItemHeader';
import FeedItemForm from './FeedItemForm';
import Comment from './Comment';

// these styles automaticaly create new components based on a dom obj
// for more info check styled-components documentation
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
  margin: 0;
  font-weight: bold;
`
// format time to be displayed on each post
moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s:  's',
    ss: '%ds',
    m:  '1m',
    mm: '%dm',
    h:  '1h',
    hh: '%dh',
    d:  '1d',
    dd: '%dd',
    M:  '1mo',
    MM: '%dmo',
    y:  '1y',
    yy: '%dY'
  }
})

const FeedItem = observer(class FeedItem extends Component {
  renderComments(comments, postId){
    /*
    loop through the comments if no commets available
    don't render
    */
    if(comments){
      return(
        _.map(comments, function(value, key) {
          const c = comments[key]
          return(
            <Comment author={c.author} authorLink={c.author_id} key={key} id={key} postId={postId}>
              {c.body}
            </Comment>
          )
        })
      )
    }
  }
  renderLikes(likes){
    if(likes){
      return(
        <Likes>{Object.keys(likes).length} likes</Likes>
      )
    }else{
      return(
        <Likes>0 likes</Likes>
      )
    }
  }

  render() {
    const i = this.props.obj;
    const c = this.props.comments
    return (
      <Feed>
        <FeedItemHeader
          author_image={i.author_image}
          author={i.author}
          author_id={i.author_id}
          post_id={i.post_id}
          location={i.author_location}
          time={moment(i.time).fromNow(true)}
        />
        <section>
          <Link to={`/post/${this.props.id}`}>
            <Image src={i.media} alt="media" />
          </Link>
        </section>
        <Comments>
          {this.renderLikes(i.likes)}
          {this.renderComments(c, i._id)}
        </Comments>

        <FeedItemForm id={this.props.id}/>
      </Feed>
    );
  }
})

export default FeedItem;

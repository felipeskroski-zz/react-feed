import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import _ from 'lodash';
import moment from 'moment';
import styled from 'styled-components';
import feedStore from  '../store.js'
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
  margin-top: 0;
`

moment.locale('en', {
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
  renderComments(comments){
    /*
    loop through the comments if no commets available
    don't render
    */
    if(comments){
      return(
        _.map(comments, function(value, key) {
          const c = comments[key]
          return(
            <Comment author={c.author} authorLink={c.author_id} key={key}>
              {c.body}
            </Comment>
          )
        })
      )
    }
  }

  render() {
    const i = this.props.obj;
    const c = feedStore.comments[this.props.id]
    return (
      <Feed>
        <FeedItemHeader
          avatar={i.author_image}
          author={i.author}
          location={i.author_location}
          time={moment(i.time).fromNow(true)}
        />
        <section>
          <Link to={`/post/${this.props.id}`}>
            <Image src={i.media} alt="media" />
          </Link>
        </section>
        <Comments>
          {/* gets the number of likes */}
          <Likes>{Object.keys(i.likes).length} likes</Likes>
          {this.renderComments(c)}
        </Comments>

        <FeedItemForm id={this.props.id}/>
      </Feed>
    );
  }
})

export default FeedItem;

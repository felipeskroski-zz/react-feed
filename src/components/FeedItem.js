import React, { Component } from 'react';
import FeedItemHeader from './FeedItemHeader';
import Comment from './Comment';
import './FeedItem.css';

class FeedItem extends Component {
  render() {
    const i = this.props.obj;
    console.log(i)
    return (
      <article className="feed-item">
        <FeedItemHeader
          avatar={i.authorImage}
          author={i.author}
          location={i.location}
          time={i.time}
        />
        <section className="item-media">
          <img src={i.media} className="media-img" alt="media" />
        </section>
        <section className="item-content">
          <p className="content-likes">35 likes</p>
          {i.comments.map(function(c, i){
            return(
              <Comment author={c.author} authorLink={c.authorId} key={i}>
                {c.body}
              </Comment>
            )
          })}
        </section>
      </article>
    );
  }
}

export default FeedItem;

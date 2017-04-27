import React, { Component } from 'react';
import Avatar from '../common/Avatar';
import Comment from './Comment';
import './FeedItem.css';

class FeedItem extends Component {
  render() {
    const i = this.props.obj;
    console.log(i)
    return (
      <article className="feed-item">
        <section className="item-header">
          <div className="item-avatar">
            <Avatar src={i.authorImage} alt="Username" />
            <div>
              <h4 className="avatar-name">{i.author}</h4>
              <p className="avatar-location">{i.location}</p>
            </div>

          </div>
          <div className="item-time">{i.time}</div>
        </section>
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

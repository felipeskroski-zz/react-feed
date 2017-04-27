import React, { Component } from 'react';
import avatar from '../img/avatar.jpg';
import media from '../img/media.jpg';
import './FeedItem.css';

class FeedItem extends Component {
  render() {
    return (
      <article className="feed-item">
        <section className="item-header">
          <div className="item-avatar">
            <img src={avatar} className="avatar-img" alt="Username" />
            <div>
              <h4 className="avatar-name">john.fake</h4>
              <p className="avatar-location">Wellington, New Zealand</p>
            </div>

          </div>
          <div className="item-time">1h</div>
        </section>
        <section className="item-media">
          <img src={media} className="media-img" alt="media" />
        </section>
        <section className="item-content">
          <p className="content-likes">35 likes</p>
          <p className="comment">
            <a className="comment-author">dummysuzy</a>
            This image is awesome and my comment is not real. I'm typing this message just so I can test how long comments look even if this is not that long.
          </p>
          <p className="comment">
            <a className="comment-author">dummyhelen</a>
            This image is awesome and my comment is not real. I'm typong this message just so I can test how long comments look even if this is not that long.
          </p>
        </section>
      </article>
    );
  }
}

export default FeedItem;

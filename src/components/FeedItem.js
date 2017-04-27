import React, { Component } from 'react';
import Avatar from '../common/Avatar';
import Comment from './Comment';
import avatar from '../img/avatar.jpg';
import media from '../img/media.jpg';
import './FeedItem.css';

class FeedItem extends Component {
  render() {
    return (
      <article className="feed-item">
        <section className="item-header">
          <div className="item-avatar">
            <Avatar src={avatar} alt="Username" />
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
          <Comment author='dummy user' authorLink="#">
            This image is awesome and my comment is not real. I'm typong this message just so I can test how long comments look even if this is not that long.
          </Comment>
          <Comment author='dummy user' authorLink="#">
            This image is awesome and my comment is not real. I'm typong this message just so I can test how long comments look even if this is not that long.
          </Comment>
        </section>
      </article>
    );
  }
}

export default FeedItem;

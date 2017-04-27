import React, { Component } from 'react';
import Avatar from '../common/Avatar';

class FeedItemHeader extends Component {
  render() {
    const i = this.props;
    return (
      <section className="item-header">
        <div className="item-avatar">
          <Avatar src={i.avatar} alt="Username" />
          <div>
            <h4 className="avatar-name">{i.author}</h4>
            <p className="avatar-location">{i.location}</p>
          </div>

        </div>
        <div className="item-time">{i.time}</div>
      </section>
    );
  }
}

export default FeedItemHeader;

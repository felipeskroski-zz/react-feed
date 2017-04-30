import React, { Component } from 'react';
import {observer} from 'mobx-react';
import FeedItem from './FeedItem';


// observer makes sure every change made on the store renders the feed
const Feed = observer(class Feed extends Component {
  render(){
    const u = this.props.store.user
    return(
      <div>
        {this.props.store.feed.map((item, i) => {
          return <FeedItem obj={item} key={i} user={u}/>;
        })}
      </div>
    )
  }
})

export default Feed;

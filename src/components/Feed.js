import React, { Component } from 'react';
import {observer} from 'mobx-react';
import FeedItem from './FeedItem';


// observer makes sure every change made on the store renders the feed
const Feed = observer(class Feed extends Component {
  renderLoading(){
    return(
      <h2>Loading feed ...</h2>
    )
  }
  renderFeed(){
    const u = this.props.store.user
    return(
      <div>
        {this.props.store.feed.map((item, i) => {
          return <FeedItem obj={item} key={i} user={u}/>;
        })}
      </div>
    )
  }
  render(){
    if(this.props.store.isFeedLoaded()){
      return(
        this.renderFeed()
      )
    }else{
      return(
        this.renderLoading()
      )
    }
  }
})

export default Feed;

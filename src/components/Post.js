import React, { Component } from 'react';
import {observer} from 'mobx-react';
import {Redirect} from 'react-router-dom'
import _ from 'lodash';
import {toJS} from 'mobx';
import FeedItem from './FeedItem';
import feedStore from  '../store.js'


// observer makes sure every change made on the store renders the feed
const Post = observer(class Post extends Component {
  renderLoading(){
    return(
      <h2>Loading Post ...</h2>
    )
  }
  renderFeed(){
    console.log('load post data')
    console.log(feedStore.feed)
    const u = feedStore.user
    const p = feedStore.feed[this.props.id]

    return(
      <div>
        <FeedItem
          obj={p} id={p._id}
          key={p._id} user={u}
          comments={toJS(feedStore.comments[p._id])}
        />
      </div>
    )
  }
  render(){
    if(!feedStore.user && feedStore.initialized){
      return(
        <Redirect to="/login"/>
      )
    }
    if(feedStore.isFeedLoaded()){
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

export default Post;

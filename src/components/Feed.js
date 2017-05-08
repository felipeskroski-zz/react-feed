import React, { Component } from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {toJS} from 'mobx';
import FeedItem from './FeedItem';
import feedStore from  '../store.js'


// observer makes sure every change made on the store renders the feed
const Feed = observer(class Feed extends Component {
  renderLoading(){
    return(
      <h2>Loading feed ...</h2>
    )
  }
  renderFeed(){
    const u = this.props.store.user
    const f = feedStore.feed
    const o = feedStore.ordered
    console.log('received feed')
    console.log(toJS(feedStore.ordered))
    o.map(function(item){
      console.log(item._id)
    })
    return(
      <div>
        
        {o.map(function(item){
          return <FeedItem obj={item} id={item._id} key={item._id} user={u}/>
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

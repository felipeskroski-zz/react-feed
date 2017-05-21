import React, { Component } from 'react';
import {observer} from 'mobx-react';
import {Redirect} from 'react-router-dom'
import _ from 'lodash';
import {toJS} from 'mobx';
import FeedItem from './FeedItem';


// observer makes sure every change made on the store renders the feed
const Post = observer(class Post extends Component {
  constructor(props){
    super(props)
    this.store = this.props.store
  }
  renderLoading(){
    return(
      <h2>Loading Post ...</h2>
    )
  }
  renderFeed(){
    const s = this.store
    console.log('load post data')
    console.log(s.feed)
    const u = s.user
    const p = s.feed[this.props.id]

    return(
      <div>
        <FeedItem
          obj={p} id={p._id}
          key={p._id} user={u}
          comments={toJS(s.comments[p._id])}
        />
      </div>
    )
  }
  render(){
    const s = this.store
    if(s.isFeedLoaded()){
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

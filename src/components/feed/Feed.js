import React, { Component } from 'react';
import {observer} from 'mobx-react';
import {Redirect} from 'react-router-dom'
import _ from 'lodash';
import {toJS} from 'mobx';
import FeedItem from './FeedItem';


// observer makes sure every change made on the store renders the feed
const Feed = observer(class Feed extends Component {
  renderLoading(){
    return(
      <h2>Loading feed ...</h2>
    )
  }
  renderFeed(){
    const store = this.props.store
    const u = store.user
    const o = store.ordered

    return(
      <div>
        {o.map(function(item){
          return (
            <FeedItem
              obj={item} id={item._id}
              key={item._id} user={u}
              comments={toJS(store.comments[item._id])}
            />
          )
        })}
      </div>
    )
  }
  render(){
    if(!this.props.store.user){
      return(
        <Redirect to="/login"/>
      )
    }else{
      return(
        this.renderFeed()
      )
    }
  }
})

export default Feed;

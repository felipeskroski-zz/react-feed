import React, { Component } from 'react';
import {observer} from 'mobx-react';
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
    const u = this.props.store.user
    const f = this.props.store.feed
    // use this to preserve original keys from firebase
    /*
    {Object.keys(toJS(f)).map(function(key,index){
      return <FeedItem obj={f[key]} key={key} user={u}/>
    })}
    */
    return(
      <div>
        {f.map((item, i) => {
          return <FeedItem obj={item} id={i} key={i} user={u}/>;
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

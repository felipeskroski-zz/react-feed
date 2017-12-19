import React, { Component } from 'react';
import {observer} from 'mobx-react';
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
  render(){
    const store = this.props.store
    const u = store.user
    const o = store.orderedFeed
    return(
      <div>
        {o.map((item, i) => (
            <FeedItem
              obj={item} id={item._id}
              key={i} user={u}
              // add comments to post if any
              comments={toJS(store.comments) && toJS(store.comments[item._id])}
            />
          )
        )}
      </div>
    )
  }
})

export default Feed

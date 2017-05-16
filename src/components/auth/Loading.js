import React, { Component } from 'react';
import {observer} from 'mobx-react';
import {Redirect} from 'react-router-dom';
import feedStore from  '../../store.js';


// observer makes sure every change made on the store renders the feed
const Loading = observer(class Loading extends Component {
  renderLoading(){
    return(
      <h2>Loading...</h2>
    )
  }
  render(){
    if(!feedStore.user){
      return(
        <Redirect to="/login"/>
      )
    }
    if(feedStore.isFeedLoaded()){
      return(
        <Redirect to="/"/>
      )
    }else{
      return(
        this.renderLoading()
      )
    }
  }
})

export default Loading;

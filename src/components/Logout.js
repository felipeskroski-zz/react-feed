import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import feedStore from  '../store.js'


const Logout = observer(class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
    feedStore.logout()
  }

  render() {
    return(
      <p>Logged out</p>
    )
  }
})


export default Logout;

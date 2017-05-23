import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {observer} from 'mobx-react';
import feedStore from  '../../store.js'


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
      <Redirect to="/login"/>
    )
  }
})


export default Logout;

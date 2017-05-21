import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import styled from 'styled-components';
import {observer} from 'mobx-react';
//import {toJS} from 'mobx';
import Feed from './components/feed/Feed';
import Post from './components/feed/Post';
import Profile from './components/user/Profile';
import FeedItemNew from './components/feed/FeedItemNew';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Signup from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';
import Avatar from './components/common/Avatar';
import Button from './components/common/Button';
import feedStore from  './store.js'

import './App.css';


const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 10px;
`
const Navigation = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
`

// page routes

const FeedView = function(){
  return(
    <Feed store={feedStore}/>
  )
}

// TODO add a loading view so components don't need to deal with waiting for data internally

const PostView = ({match}) => {
  //TODO fix post view so the app can reload from here
  const id = match.params.postId
  return(
    <Post id={id} store={feedStore}/>
  )
}
const ProfileView = () => (
  <Profile user={feedStore.user} />
)
const NewPost = () => (
  <FeedItemNew store={feedStore}/>
)
const LoginView = () => (
  <Login current_user={feedStore.user}/>
)
const LogoutView = () => (
  <Logout />
)
const SignupView = () => (
  <Signup />
)
const ForgotPasswordView = () => (
  <ForgotPassword />
)

//TODO add an error page

// App main shell
const App = observer(class App extends Component {
  renderNav(){
    if(feedStore.user){
      console.log(feedStore.user)
      return(
        <Navigation>
          <NavLink to="/newpost">
            <Button>Newpost</Button>
          </NavLink>
          <NavLink to="/profile">
            <Avatar src={feedStore.user.avatar} alt="Username" />
          </NavLink>
        </Navigation>
      )
    }else{
      return(
        <Navigation>
          <NavLink to="/login">
            Login
          </NavLink>
          <NavLink to="/signup">
            Signup
          </NavLink>
        </Navigation>
      )
    }
  }
  renderLoading(){
    return(
      <div className="App">
        <div className="newsfeed">
          <h2>Loading App ...</h2>
        </div>
      </div>
    )
  }
  renderApp() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <NavLink to="/">
              React Feed
            </NavLink>

            {this.renderNav()}
          </div>

          <div className="newsfeed">
            <Route exact path="/" component={FeedView}/>
            <Route path="/newpost" component={NewPost}/>
            <Route path="/post/:postId" component={PostView}/>
            <Route path="/login" component={LoginView}/>
            <Route path="/logout" component={LogoutView}/>
            <Route path="/signup" component={SignupView}/>
            <Route path="/forgot-password" component={ForgotPasswordView}/>
            <Route path="/profile" component={ProfileView}/>
          </div>
        </div>
      </Router>
    );
  }
  render(){
    if(feedStore.initialized){
      return(
        this.renderApp()
      )
    }else{
      return(
        this.renderLoading()
      )
    }
  }
})

export default App;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
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

const PostView = ({match}) => {
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
  // TODO improve loading view
  renderLoading(){
    return(
      <div className="App">
        <div className="newsfeed">
          <div className="loading">
            <div className="loader" title="2">
              <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
                 width="50px" height="50px" viewBox="0 0 50 50" >
              <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                <animateTransform attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="0.6s"
                  repeatCount="indefinite"/>
                </path>
              </svg>
            </div>
            <h2>Loading React Feed</h2>
          </div>

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

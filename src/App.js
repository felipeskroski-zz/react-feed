import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import styled from 'styled-components';
import {observer} from 'mobx-react';
//import {toJS} from 'mobx';
import Feed from './components/feed/Feed';
import Post from './components/feed/Post';
import FeedItemNew from './components/feed/FeedItemNew';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Signup from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';
import feedStore from  './store.js'
import './App.css';


const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 10px;
`

// page routes

const FeedView = function(){
  return(
    <Feed store={feedStore}/>
  )
}


const PostView = ({match}) => {
  //TODO fix post view so the app can reload from here
  const id = match.params.postId
  return(
    <Post id={id} />
  )
}

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


// App main shell
const App = observer(class App extends Component {
  renderNav(){
    if(feedStore.user){
      return(
        <nav>
          <NavLink to="/logout">
            Logout
          </NavLink>
          <NavLink to="/newpost">
            Newpost
          </NavLink>
        </nav>
      )
    }else{
      return(
        <nav>
          <NavLink to="/login">
            Login
          </NavLink>
          <NavLink to="/signup">
            Signup
          </NavLink>
        </nav>
      )
    }
  }

  render() {
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
          </div>
        </div>
      </Router>
    );
  }
  renderLoading
})

export default App;

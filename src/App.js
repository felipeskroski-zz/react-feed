import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import styled from 'styled-components';
import {observer} from 'mobx-react';
//import {toJS} from 'mobx';
import Feed from './components/Feed';
import FeedItem from './components/FeedItem';
import FeedItemNew from './components/FeedItemNew';
import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';
import Loading from './components/Loading';
import feedStore from  './store.js'
import './App.css';


const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 10px;
`

// page routes

const Home = function(){
  return(
    <Feed store={feedStore}/>
  )
}


const Post = ({match}) => {
  console.log('post item')

  const id = match.params.postId
  const item = feedStore.feed[id]
  const u = feedStore.user


  if(item){
    return(
      <FeedItem
        obj={item} id={item._id}
        key={item._id} user={u}
        comments={feedStore.comments[item._id]}/>
    )
  }else{
    // TODO display some error message saying this post doesn't exist
    return(
      <Redirect to="/"/>
    )
  }

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
const LoadingView = () => (
  <Loading />
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
  renderLoading(){
    if(feedStore.isFeedLoaded()){
      return(
        <Loading />
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
          {this.renderLoading()}
          <div className="newsfeed">
            <Route exact path="/" component={Home}/>
            <Route path="/post/:postId" component={Post}/>
            <Route path="/newpost" component={NewPost}/>
            <Route path="/login" component={LoginView}/>
            <Route path="/logout" component={LogoutView}/>
            <Route path="/signup" component={SignupView}/>
          </div>
        </div>
      </Router>
    );
  }
  renderLoading
})

export default App;

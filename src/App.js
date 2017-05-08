import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import styled from 'styled-components';
//import {toJS} from 'mobx';
import Feed from './components/Feed';
import FeedItem from './components/FeedItem';
import FeedItemNew from './components/FeedItemNew';
import Login from './components/Login';
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
const LoginPage = () => (
  <Login/>
)



// App main shell
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <NavLink to="/">
              React Feed
            </NavLink>
            <nav>
              <NavLink to="/login">
                Login
              </NavLink>
              <NavLink to="/newpost">
                Newpost
              </NavLink>
            </nav>

          </div>

            <div className="newsfeed">
              <Route exact path="/" component={Home}/>
              <Route path="/post/:postId" component={Post}/>
              <Route path="/newpost" component={NewPost}/>
              <Route path="/login" component={LoginPage}/>
            </div>

        </div>
      </Router>
    );
  }
}

export default App;

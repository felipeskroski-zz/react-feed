import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import styled from 'styled-components';
import Feed from './components/Feed';
import FeedItem from './components/FeedItem';
import FeedItemNew from './components/FeedItemNew';
import feedStore from  './store.js'
import './App.css';


const HomeLink = styled(Link)`
  color: white;
  text-decoration: none;
`

// page routes

const Home = function(){
  return(
    <Feed store={feedStore}/>
  )
}


const Post = ({match}) => {
  const id = match.params.postId
  console.log(id)
  const item = feedStore.feed.find(function(item, i){
    return item.id === Number(id);
  })
  if(item){
    return(
      <FeedItem obj={item} user={feedStore.user}/>
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



// App main shell
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <HomeLink to="/">
              React Feed
            </HomeLink>
            <nav>
              <HomeLink to="/newpost">
                Newpost
              </HomeLink>
            </nav>

          </div>

            <div className="newsfeed">
              <Route exact path="/" component={Home}/>
              <Route path="/post/:postId" component={Post}/>
              <Route path="/newpost" component={NewPost}/>
            </div>

        </div>
      </Router>
    );
  }
}

export default App;

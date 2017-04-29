import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import FeedItem from './components/FeedItem';
import feedStore from  './store.js'
import './App.css';

// page routes

const Home = () => (
  <div className="newsfeed">
    {feedStore.feed.map((feed, i) => {
      return <FeedItem obj={feed} key={i} user={feedStore.user}/>;
    })}
  </div>
)

const Post = ({match}) => {
  const id = match.params.postId
  const item = feedStore.feed.find(function(item, i){
    return item.id === id;
  })
  console.log(item)
  return(
    <div className="newsfeed">
      <FeedItem obj={item} user={feedStore.user}/>
    </div>
  )
}


// App main shell
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          React Feed
        </div>
        <Router>
          <div>
            <Route exact path="/" component={Home}/>
            <Route path="/post/:postId" component={Post}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

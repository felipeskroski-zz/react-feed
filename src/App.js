import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import styled from 'styled-components';
import FeedItem from './components/FeedItem';
import feedStore from  './store.js'
import './App.css';


const HomeLink = styled(Link)`
  color: white;
  text-decoration: none;
`

// page routes

const Home = () => (
  <div className="newsfeed">
    {feedStore.feed.map((item, i) => {
      return <FeedItem obj={item} key={i} user={feedStore.user}/>;
    })}
  </div>
)

const Post = ({match}) => {
  const id = match.params.postId
  console.log(id)
  const item = feedStore.feed.find(function(item, i){
    return item.id === Number(id);
  })

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
      <Router>
        <div className="App">
          <div className="App-header">
            <HomeLink to="/">
              React Feed
            </HomeLink>
          </div>

            <div>
              <Route exact path="/" component={Home}/>
              <Route path="/post/:postId" component={Post}/>
            </div>

        </div>
      </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import FeedItem from './components/FeedItem';
import avatar from './img/avatar.jpg';
import media from './img/media.jpg';
import './App.css';

const user = {
  name: 'Felipe',
  id: '5',
}
let newsfeed = [
  {
    id: '1',
    author: 'jonh bill',
    authorImage: avatar,
    location: 'Wellington',
    authorId: '1',
    time: '1h',
    media: media,
    likes: 35,
    currentUserLike: true,
    comments: [
      {
        author: 'dummy',
        authorId: '1',
        body: 'a random comment here',
      },
      {
        author: 'dummy2',
        authorId: '2',
        body: 'Another random comment',
      }
    ]
  },
  {
    id: '2',
    author: 'suzy',
    authorImage: avatar,
    location: 'Bay of plenty',
    authorId: '1',
    time: '2h',
    media: media,
    likes: 35,
    currentUserLike: false,
    comments: [
      {
        author: 'dummy',
        authorId: '1',
        body: 'a random comment here',
      },
      {
        author: 'dummy2',
        authorId: '2',
        body: 'Another random comment',
      }
    ]
  },
]
// page routes
const Home = () => (
  <div className="newsfeed">
    {newsfeed.map((feed, i) => {
      return <FeedItem obj={feed} key={i} user={user}/>;
    })}
  </div>
)

const Post = ({match}) => {
  const id = match.params.postId
  const item = newsfeed.find(function(item, i){
    return item.id === id;
  })
  console.log(item)
  return(
    <div className="newsfeed">
      <FeedItem obj={item} user={user}/>
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

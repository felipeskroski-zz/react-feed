import React, { Component } from 'react';
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
    key: '1',
    author: 'jonh bill',
    authorImage: avatar,
    location: 'Wellington',
    authorId: '1',
    time: '1h',
    media: media,
    likes: 35,
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
    key: '2',
    author: 'suzy',
    authorImage: avatar,
    location: 'Bay of plenty',
    authorId: '1',
    time: '2h',
    media: media,
    likes: 35,
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


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          React Feed
        </div>
        <div className="newsfeed">
          {newsfeed.map(function(feed, i){
            return <FeedItem obj={feed} key={i} user={user}/>;
          })}

        </div>

      </div>
    );
  }
}

export default App;

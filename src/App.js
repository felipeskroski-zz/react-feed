import React, { Component } from 'react';
import FeedItem from './components/FeedItem';
import logo from './logo.svg';
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
  constructor(props) {
    super(props);
    this.state = {newsfeed: newsfeed}
    this.newComment = this.newComment.bind(this);
  }
  newComment(post, comment){
    newsfeed[post].comments.push({
      author: user.name,
      authorId: user.id,
      body: comment,
    })
    this.setState({newsfeed: newsfeed})
    console.log(newsfeed[post].comments)
    this.render();

  }
  render() {
    const func = this.newComment

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="newsfeed">
          {this.state.newsfeed.map(function(feed, i){
            return <FeedItem obj={feed} key={i} id={i} onComment={func} />;
          })}

        </div>

      </div>
    );
  }
}

export default App;

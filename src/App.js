import React, { Component } from 'react';
import FeedItem from './components/FeedItem';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="newsfeed">
          <FeedItem />
        </div>

      </div>
    );
  }
}

export default App;

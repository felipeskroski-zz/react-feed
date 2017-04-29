import {observable, computed, action, extendObservable} from 'mobx';
import avatar from './img/avatar.jpg';
import media from './img/media.jpg';

const user = {
  name: 'Felipe',
  id: '5',
  avatar: avatar,
  location: 'Wellington',
}
const newsfeed = [
  {
    id: 1,
    author: 'jonh bill',
    authorImage: avatar,
    location: 'Wellington',
    authorId: '1',
    time: '1h',
    media: media,
    likes: 11,
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
    id: 2,
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

class FeedStore {
  constructor() {
    extendObservable(this, {
      feed: [],
      user: {},
    })
    this.feed = newsfeed;
    this.user = user;
  }
  getpost(id) {
    const item = this.feed.find(function(item, i){
      return item.id === id;
    })
	}

  addComment(postId, comment){
    this.feed.forEach((post, i)=>{
      if(post.id === postId){
        post.comments.push({
          author: this.user.name,
          authorId: this.user.id,
          body: comment,
        })
      }
    })
  }

  addPost(postObj){
    this.feed.push(postObj)
    console.log(postObj)
  }

  onLike(postId, add=true){
    this.feed.forEach((post)=>{
      if(post.id === postId){
        if(add){
          post.likes++
          post.currentUserLike = true
        }else{
          post.likes--
          post.currentUserLike = false
        }
      }
    })
  }
}


const feedStore = new FeedStore();
export default feedStore;

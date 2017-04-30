import {extendObservable} from 'mobx';
import * as firebase from 'firebase';
import config from './config';

// the store manages both the state and the model (firebase connection in this case)
class FeedStore {
  constructor() {
    // these are the observable properties when they change it will change all the observers
    extendObservable(this, {
      feed: [],
      user: {},
    })
  }

  updateFeed(posts){
    this.feed = posts
  }

  updateUser(user){
    this.user = user
  }

  getpost(id) {
    this.feed.find(function(item, i){
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


// initialize firebase db based on the config file
const fb = firebase
  .initializeApp(config)
  .database()
  .ref();

// whenever firebase changes reloads the data
fb.on('value', fbdata => {
  const data = fbdata.val();
  feedStore.updateFeed(data.posts)
  feedStore.updateUser(data.user)
});

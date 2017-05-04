import {extendObservable, toJS} from 'mobx';
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

  isFeedLoaded(){
    return this.feed.length
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

  //gets the key of an object with a certain value
  getKey(obj,val){
    return Object.keys(obj).find(key => obj[key] === val);
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
    const post = this.feed[postId]
    if(add){
      post.likes++
      post.currentUserLike =  true
    }else{
      post.likes--
      post.currentUserLike = false
    }
    console.log(toJS(post))
    this.savePost(postId, toJS(post))
  }


  //------------------------
  // MODEL
  //------------------------
  savePost(key, post){
    // save data to firebase
    firebase.database().ref(`posts/${key}`).set(post, function(error){
      if(error){
        console.log(error);
      }
      else{
        console.log("Post saved successfuly");
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

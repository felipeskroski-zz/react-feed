import {extendObservable, toJS} from 'mobx';
import * as firebase from 'firebase';
import _ from 'lodash';
import config from './config';
import * as db from './db.json'

// the store manages both the state and the model (firebase connection in this case)
class FeedStore {
  constructor() {
    // these are the observable properties when they change it will change all the observers
    extendObservable(this, {
      //feed: [],
      //user: {},
      comments: {},
      feed: {},
      user: {}
    })
  }
  loadDb(){
    this.comments = db.comments
    this.feed = db.posts
    this.user = db.users.IWMmk4ecDvMCq23FEGcqtH6AagX2
  }


  isFeedLoaded(){
    return Object.keys(this.feed).length
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

  //Gen random string
  randomId(){
    return Math.random().toString(36).slice(2)
  }

  addComment(postId, comment){
    console.log(toJS(this.comments))
    const id = this.randomId()

    this.comments[id] = {
      "_id": id,
      "author" : this.user.name,
      "author_id" : this.user._id,
      "body" : comment,
      "date" : _.now(),
      "post_id": postId
    }
    console.log(toJS(this.comments))

  }

  addPost(postObj){
    this.feed.push(postObj)
    //console.log(postObj)
  }

  isLiked(postId){
    const post = toJS(this.feed[postId])
    console.log('-------------')
    console.log(post.likes[this.user._id])
    console.log('-------------')
    if(post.likes[this.user._id]){
      return true
    }
    return false

  }

  onLike(postId, add=true){
    const post = this.feed[postId]
    if(add){
      post.likes[this.user._id] = true
    }else{
      delete post.likes[this.user._id]
    }
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
/*
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
*/

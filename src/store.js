import {extendObservable, toJS} from 'mobx';
import * as firebase from 'firebase';
import _ from 'lodash';
import config from './config';
//to use local db
//import * as db from './db.json'

// the store manages both the state and the model (firebase connection in this case)
class FeedStore {
  constructor() {
    // these are the observable properties when they change it will change all the observers
    extendObservable(this, {
      feed: {},
      user: {}
    })
  }
  isFeedLoaded(){
    return Object.keys(this.feed).length
  }

  updateFeed(posts){
    this.feed = posts
  }

  updateUser(user){
    this.user = user.IWMmk4ecDvMCq23FEGcqtH6AagX2
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
    // TODO refactor this to make it work with firebase
    const id = this.randomId()
    let c = toJS(this.comments)
    let pc = toJS(this.feed[postId].comments)
    c[id] = {
      "_id": id,
      "author" : this.user.name,
      "author_id" : this.user._id,
      "body" : comment,
      "date" : _.now(),
      "post_id": postId
    }
    this.comments = c
    pc[id] = true
    this.feed[postId].comments = pc
    console.log(toJS(this.comments))

  }

  addPost(postObj){
    this.feed.push(postObj)
    //console.log(postObj)
  }

  isLiked(postId){
    if(this.feed[postId].likes[this.user._id]){
      return true
    }
    return false

  }

  onLike(postId, add=true){
    // gets the post object
    let p = toJS(this.feed[postId])
    if(add){
      p.likes[this.user._id] = true
    }else{
      delete p.likes[this.user._id]
    }
    // update UI in a way mobx picks up
    this.feed[postId] = p
    // save to firebase
    this.updatePost(postId, p)
  }


  //------------------------
  // MODEL
  //------------------------
  updatePost(key, post){
    // save post to firebase
    firebase.database().ref(`posts/${key}`).set(post, function(error){
      if(error){
        console.log(error);
      }
      else{
        console.log("Post saved successfuly");
      }
    })
  }

  getCommentsFromPost(postId){
    // Get all commments from a post from firebase this returns a promise
    // TODO add a limit here
    return firebase.database()
    .ref('comments/').orderByChild("post_id").equalTo(postId)
    .once('value')
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
  feedStore.updateUser(data.users)
});

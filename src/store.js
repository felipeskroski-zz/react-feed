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

  updateData(data){
    this.feed = data.posts
    this.user = data.users.IWMmk4ecDvMCq23FEGcqtH6AagX2
  }
  updateFeed(data){
    this.feed = data
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
    const c = {
      "author" : this.user.name,
      "author_id" : this.user._id,
      "body" : comment,
      "date" : _.now(),
      "post_id": postId
    }
    this.saveComment(c);
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
    // update UI so mobx picks up
    this.feed[postId] = p
    // save to firebase
    this.updatePost(postId, p)
  }


  //------------------------
  // MODEL - All firebase transactions
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

  saveComment(comment){
    let c = comment
    // Get a key for a new Post.
    const newCommentKey = firebase.database().ref().child('comments').push().key;
    c._id = newCommentKey

    // Write the new comments's data simultaneously in the posts, comments list and users comments
    const updates = {};
    updates[`/posts/${c.post_id}/comments/${newCommentKey}`] = true;
    updates[`/users/${c.author_id}/comments/${newCommentKey}`] = true;
    updates[`/comments/${c._id}`] = c;

    // listen for comment updates, when the comment is added refreshes the ui
    const commentsRef = firebase.database().ref('posts/');
    commentsRef.on('child_changed', fbdata => {
      const data = fbdata.val();
      this.updateFeed(data)
    });

    // add the comment to firebase
    return firebase
      .database()
      .ref()
      .update(updates)
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

const fb = firebase
  .initializeApp(config)
  .database()
  .ref();

// when the data loads update store: feed and users
fb.on('value', fbdata => {
  const data = fbdata.val();
  feedStore.updateData(data)
});

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
      user: null,
      current_user: null,
      // to hold comments of all posts
      comments: {},
      ordered: [],
    })
    this.initFirebase()
    this.initAuth()
  }

  initFirebase(){
    const self = this;
    return firebase
      .initializeApp(config)
      .database()
      .ref()
      .on('value', fbdata => {
        const data = fbdata.val();
        self.updateData(data)
      });
  }

  initAuth(){
    const self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log('user authenticated')
        var emailVerified = user.emailVerified;
        if (!emailVerified) {
          console.log('users email not verified')
        }
        var userId = firebase.auth().currentUser.uid;
        return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
          console.log('grab users info')
          console.log(snapshot.val())
          self.updateUser(snapshot.val())
        });
      } else {
        console.log('no user logged')
      }
    });
  }


  isFeedLoaded(){
    return this.user
  }

  updateData(data){
    this.updateFeed(data.posts)
  }

  updateFeed(data){
    this.ordered = _.orderBy(data, 'time', 'desc')
    this.feed = data
    this.loadComments(data)
  }

  updateUser(user){
    this.user = user
  }

  loadComments(feed){
    const c = {}
    const self = this
    _.map(feed, function(value, key) {
      self.getCommentsFromPost(key).then(function(result){
        const comments = result.val()
        c[key] = comments
        return self.comments = c

      })
    })
  }

  getUser(){
    return this.user
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

  addPost(post, comment){
    this.savePost(post, comment)
    //console.log(postObj)
  }

  isLiked(postId){
    if(!this.feed[postId].likes){
      return false
    }
    if(this.feed[postId].likes[this.user._id]){
      return true
    }
    return false

  }

  onLike(postId, add=true){
    // gets the post object
    let p = toJS(this.feed[postId])
    if(add){
      if(p.likes){
        // add new like to the list
        p.likes[this.user._id] = true
      }else{
        // creates new list of likes if empty
        console.log('inserting first like')
        p.likes = {[this.user._id]: true}
      }
    }else{
      delete p.likes[this.user._id]
    }
    // update UI so mobx picks up
    this.feed[postId] = p
    // save to firebase
    this.updatePost(postId, p)
  }

  //------------------------
  // MODEL - Authentication
  //------------------------

  logout(){
    console.log('log out')
    // [START signout]
    return firebase.auth().signOut();
    // [END signout]
  }

  login(email,password) {
    // Sign in with email and pass.
    var promise = new Promise(function (resolve, reject) {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function(e){
        console.log('Logged in!')
        resolve('Logged in!')
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          console.log('Wrong password.');
        } else {
          console.log(errorMessage);
        }
        reject(error);
        // [END_EXCLUDE]
      });
    })
    return promise


  }

  //------------------------
  // MODEL - Feed transactions
  //------------------------

  updatePost(key, post){
    // save post to firebase
    firebase.database().ref(`posts/${key}`).set(post, function(error){
      if(error){
        console.log(error);
      }
      else{
        console.log("Post saved successfully");
      }
    })
  }

  saveComment(comment){
    let c = comment
    // Get a key for a new comment.
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

  savePost(post, comment){
    let c = comment
    let p = post
    let m = p.media
    let img = p.imgdata
    const updates = {};

    // Create a root reference
    const storageRef = firebase.storage().ref();

    // Create a reference to new image on firebase
    const imgRef = storageRef.child(`images/${m.name}`);

    // Get a key for post comment.
    const postCommentKey = firebase.database().ref().child('comments').push().key;
    c._id = postCommentKey
    console.log('comment:')
    console.log(c)

    // Get a key for a new Post.
    const postKey = firebase.database().ref().child('posts').push().key;
    p._id = postKey
    c.post_id = postKey
    p.comments = {[postCommentKey]: true}
    console.log('post:')
    console.log(p)
    delete p.imgdata


    // listen for post updates, when the post is added refreshes the ui
    const postsRef = firebase.database().ref('posts/');

    //TODO check how this call is been used
    postsRef.on('child_added', fbdata => {
      const data = fbdata.val();
      this.updateFeed(data)
    });

    var promise = new Promise(function (resolve, reject) {
      imgRef.putString(img, 'data_url').then(function(snapshot) {
        console.log('image uploaded!');
        console.log(snapshot.downloadURL);
        p.media = snapshot.downloadURL;
        console.log(p)

        updates[`/posts/${postKey}`] = p;
        updates[`/users/${c.author_id}/comments/${postCommentKey}`] = true;
        updates[`/comments/${postCommentKey}`] = c;
        resolve(firebase.database().ref().update(updates))
      })
    })
    return promise

  }

  getCommentsFromPost(postId){
    // Get all commments from a post from firebase this returns a promise
    // TODO add a limit to the items
    return firebase.database()
    .ref('comments/').orderByChild("post_id").equalTo(postId)
    .once('value')
  }
}


const feedStore = new FeedStore();
export default feedStore;

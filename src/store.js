//------------------------------------------------------------------------------------
// This store manages both the state and the model (firebase connection in this case)
// it would be something similar to a controller in an MVC architecture
//------------------------------------------------------------------------------------

import {extendObservable, toJS} from 'mobx';
import * as firebase from 'firebase';
import _ from 'lodash';
import config from './config';
//to use local db
//import * as db from './db.json'

class FeedStore {
  constructor() {
    // these are the observable properties when they change it will change all the observers
    extendObservable(this, {
      feed: null,
      orderedFeed: null,
      user: null,
      current_user: null,
      // to hold comments of all posts returned in the feed
      comments: null,
      // to flag if content was received from firebase
      loaded: false,
      initialized: false,
    })
    this.init()
  }

  init(){
    const self = this;

    // gets the latest 20 posts
    const fb = firebase
      .initializeApp(config)
      .database()
      .ref('/posts').orderByChild('time').limitToLast(20)

    //TODO fix the redundancy with the code below
    fb.on('value', fbdata => {
      console.log('grabbing feed')
      const data = fbdata.val();
      console.log(data)
      self.updateFeed(data)
    })

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log('user authenticated')
        var emailVerified = user.emailVerified;

        if (!emailVerified) {
          console.log('users email not verified')
        }
        var user_id = firebase.auth().currentUser.uid;

        // first get user credentials
        firebase.database().ref('/users/' + user_id).once('value')
        .then(function(snapshot) {
          self.updateUser(snapshot.val())

        // after getting the user load the feed
        });
      } else {
        console.log('no user logged')
        self.updateUser(null)
      }
      return fb.once('value').then(function(fbdata){
          console.log('grabbing feed after user data')
          const data = fbdata.val();
          self.updateFeed(data)
          self.initialized = true
      })
    })
  }

  isFeedLoaded(){
    return this.loaded
  }

  updateFeed(data){
    this.orderedFeed = _.orderBy(data, 'time', 'desc')
    this.feed = data
    this.loadComments(data)
  }

  updateUser(user){
    this.user = user
  }

  isUserVerified(){
    if(firebase.auth().currentUser.emailVerified){
      return true
    }else{
      return false
    }
  }

  //TODO check for ways to make this more efficient
  loadComments(feed){
    const c = {}
    const self = this
    _.map(feed, function(value, key) {
      self.getCommentsFromPost(key).then(function(result){
        const comments = result.val()
        c[key] = comments
        return self.comments = c
      }).then(function(){
        self.loaded = true
      })
    })
  }

  addComment(post_id, comment){
    const c = {
      "author" : this.user.name,
      "author_id" : this.user._id,
      "body" : comment,
      "date" : _.now(),
      "post_id": post_id
    }
    this.saveComment(c);
  }

  addPost(post, comment){
    this.savePost(post, comment)
    //console.log(postObj)
  }

  isLiked(post_id){
    // if no user
    if(!this.user){
      return false
    }
    // if no likes
    if(!toJS(this.feed[post_id].likes)){
      return false
    }
    // if liked by the current user
    if(toJS(this.feed[post_id].likes[this.user._id])){
      return true
    }
    return false

  }

  onLike(post_id, add=true){
    // gets the post object
    let p = toJS(this.feed[post_id])
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
    this.feed[post_id] = p
    // save to firebase
    this.updatePost(post_id, p)
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
      .then(() => {
        console.log('comment added')
      })
  }

  deleteComment(post_id, author_id, comment_id){
    const fb =   firebase.database().ref()
    if(this.user._id === author_id){
      fb.child(`posts/${post_id}/comments/${comment_id}`).remove();
      fb.child(`users/${author_id}/comments/${comment_id}`).remove();
      fb.child(`comments/${comment_id}`).remove();
      console.log('removed comment')
    }else{
      console.log('only the author can remove this comment')
    }
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
    p._id = postKey;
    p.img_ref = `images/${m.name}`;
    c.post_id = postKey;
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

    // upload image
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

  deletePost(post_id){
    const fb = firebase.database().ref()
    const storageRef = firebase.storage().ref()
    const author_id = this.feed[post_id].author_id
    const comments = this.feed[post_id].comments

    // Create a reference to the file to delete
    const imgRef = storageRef.child(`images/${this.feed[post_id].img_ref}`);

    if(this.user._id === author_id){
      fb.child(`posts/${post_id}`).remove();
      console.log('removed post')
      if (comments){
        const keys = _.keys(comments)
        keys.map(function(key){
          return fb.child(`comments/${key}`).remove();
        })
        console.log('removed post comments')
      }

      // Delete the file
      imgRef.delete().then(function() {
        console.log('removed post image')
      }).catch(function(error) {
        console.log('error removing image '+error)
      });

    }else{
      console.log('only the author can remove this post')
    }
  }

  getCommentsFromPost(post_id){
    // Get all commments from a post from firebase this returns a promise
    // TODO add a limit to the items
    return firebase.database()
    .ref('comments/').orderByChild("post_id").equalTo(post_id)
    .once('value')
  }

  //------------------------
  // MODEL - Authentication
  //------------------------

  logout(){
    console.log('log out')
    return firebase.auth().signOut();
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


  // Handles the sign up button press.
  signup(email, password, name, location, avatar, imgdata) {
    // Sign in with email and pass.
    let id;
    const self = this;
    // Create a root reference
    const storageRef = firebase.storage().ref();

    var promise = new Promise(function (resolve, reject) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(e){
        id = firebase.auth().currentUser.uid
        //Send verification email
        self.sendEmailVerification()

        firebase
          .database()
          .ref().child(`/users/${id}`)
          .update({_id: id, name: name, location: location})

        // Create a reference to new image on firebase
        const imgRef = storageRef.child(`images/${id}/${avatar.name}`);

        return imgRef.putString(imgdata, 'data_url')
      }).then(function(snapshot){
        console.log('image uploaded!');
        console.log(snapshot.downloadURL);
        const image = snapshot.downloadURL;

        return firebase
          .database()
          .ref().child(`/users/${id}`)
          .update({avatar: image})
      }).then(function(response){
        resolve('Image profile linked to user')
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        reject(error);
      });
    })
    return promise
  }

  // Sends an email verification to the user.
  sendEmailVerification() {
    console.log()
    firebase.auth().currentUser.sendEmailVerification().then(function() {
      console.log('Email Verification Sent!');
    });
  }


  sendPasswordReset(email) {
    var promise = new Promise(function (resolve, reject) {
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        console.log('Password Reset Email Sent!');
        resolve('email sent')
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/invalid-email') {
          console.log(errorMessage);
        } else if (errorCode === 'auth/user-not-found') {
          console.log(errorMessage);
        }
        console.log(error);
        reject(errorMessage)
      });
    });
    return promise
  }
}


const feedStore = new FeedStore();
export default feedStore;

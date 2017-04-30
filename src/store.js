import {extendObservable} from 'mobx';
import * as firebase from 'firebase';
import config from './config';



class FeedStore {
  constructor() {
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



const fb = firebase
  .initializeApp(config)
  .database()
  .ref();

fb.on('value', fbdata => {
  const data = fbdata.val();
  feedStore.updateFeed(data.posts)
  feedStore.updateUser(data.user)
});

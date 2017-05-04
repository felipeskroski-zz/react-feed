import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {observer} from 'mobx-react';
import _ from 'lodash';
import styled from 'styled-components';
import feedStore from  '../store.js'
import FeedItemHeader from './FeedItemHeader';
import FeedItemForm from './FeedItemForm';
import Comment from './Comment';

// these styles automaticaly create new components based on a dom obj
// for more info check styled-components documentation
const Feed = styled.article`
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  margin: 30px 0;
`
const Image = styled.img`
  max-width: 100%;
`
const Comments = styled.section`
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  padding: 20px;
`
const Likes = styled.p`
  margin-top: 0;
`

const FeedItem = observer(class FeedItem extends Component {
  constructor(props){
    super(props)
    this.state = {comments: {}}
  }
  componentWillMount(){
    /*
    Loads the comments post from the store (linked to firebase) and update state
    when loaded. When the state is updated it will re-render the component
    */
    const self = this
    feedStore.getCommentsFromPost(this.props.id).then(function(result){
      let comments = result.val()
      self.setState({comments: comments})
    })
  }
  renderComments(){
    /*
    Gets comments from the stat and loop through them if no commets available
    don't render
    */
    const comments = this.state.comments
    if(comments){
      return(
        _.map(comments, function(value, key) {
          const c = comments[key]
          console.log(c)
          return(
            <Comment author={c.author} authorLink={c.author_id} key={key}>
              {c.body}
            </Comment>
          )
        })
      )
    }
  }

  render() {
    const i = this.props.obj;
    return (
      <Feed>
        <FeedItemHeader
          avatar={i.author_image}
          author={i.author}
          location={i.author_location}
          time={i.time}
        />
        <section>
          <Link to={`/post/${this.props.id}`}>
            <Image src={i.media} alt="media" />
          </Link>
        </section>
        <Comments>
          {/* gets the number of likes */}
          <Likes>{Object.keys(i.likes).length} likes</Likes>
          {this.renderComments()}
        </Comments>

        <FeedItemForm id={this.props.id}/>
      </Feed>
    );
  }
})

export default FeedItem;

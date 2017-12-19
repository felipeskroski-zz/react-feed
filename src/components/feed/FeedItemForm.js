import React, { Component } from 'react'
import styled from 'styled-components'
import feedStore from  '../../store.js'
import Like from 'react-icons/lib/md/favorite-outline'
import Liked from 'react-icons/lib/md/favorite'


const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid #eee;
`
const Field = styled.input`
  padding: 20px 15px;
  flex: 1;
  font-size: 16px;
  border: none;
  font-weight: 300;
`
const Heart = styled(Like)`
  height: 24px;
  width: auto;
  margin-left: 20px
  color: #ccc;
`
const HeartFilled = styled(Liked)`
  color: red;
  height: 24px;
  margin-left: 20px
  width: auto;
`

class FeedItemForm extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.addComment = this.addComment.bind(this)
    this.toggleLike = this.toggleLike.bind(this)
    this.state = {
      comment: '',
    }
  }
  handleChange(event) {
    this.setState({comment: event.target.value})
  }
  addComment(e){
    e.preventDefault()
    feedStore.addComment(this.props.id, this.state.comment)
    this.setState({comment: ''})
  }
  toggleLike(e){
    e.preventDefault()

    if(feedStore.isLiked(this.props.id)){
      feedStore.onLike(this.props.id, false)
    }else{
      feedStore.onLike(this.props.id)
    }
  }
  //TODO use props instead of the feedstore to check for likes
  renderLike(){
    if(feedStore.isLiked(this.props.id)){
      return(<HeartFilled />)
    }else{
      return(<Heart />)
    }
  }
  render() {
    if(feedStore.user){
      return (
        <Form onSubmit={this.addComment}>
          <a href="#" onClick={this.toggleLike}>
            {this.renderLike()}
          </a>
          <Field type="text" value={this.state.comment} ref="comment" name="comment" onChange={this.handleChange} placeholder='Add a comment ...'/>
        </Form>
      )
    }else{
      return false
    }


  }
}

export default FeedItemForm

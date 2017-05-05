import React, { Component } from 'react';
import {toJS} from 'mobx';
import {Redirect} from 'react-router-dom'
import {observer} from 'mobx-react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone'
import feedStore from  '../store.js'
import FeedItemHeader from './FeedItemHeader';

// these styles automaticaly create new components based on a dom obj
const Feed = styled.article`
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  margin: 30px 0;
`
const DropArea = styled.section`
  max-width: 100%;
  border: 2px dashed black;
  background: #ccc;
  min-height: 300px;
  position: relative;
`

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid #eee;
`
const Field = styled.input`
  padding: 15px 15px;
  flex: 1;
  font-size: 16px;
  border: none;
  font-weight: 300;
`
const Button = styled.button`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 20px;
  background: #ebebeb;
  border: none;
  font-size: 16px;
  color: #222;
`

const dropZoneStyle = {
  height:'100%',
  width: '100%',
  position:'absolute',
  background: 'rgba(255,255,255,0.5)',
  zIndex: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
}



const FeedItemNew = observer(class FeedItemNew extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.addPost = this.addPost.bind(this);
    this.state = {
      comment: '',
      files: [],
      redirect: false,
    };
  }

  handleChange(event) {
    this.setState({comment: event.target.value});
  }

  onDrop(files) {
    console.log(files)
    this.setState({
      files: files,
    });
  }

  addPost(e){
    e.preventDefault()
    const u = this.props.store.user
    const post = {
      id: feedStore.feed.length+10,
      author: u.name,
      authorImage: u.avatar,
      location: u.location,
      authorId: u.id,
      time: Date.now(),
      media: this.state.files[0].preview,
      likes: 0,
      currentUserLike: false,
      comments: [
        {
          author: u.name,
          authorId: u.id,
          body: this.state.comment,
        }
      ]
    }
    feedStore.addPost(post)
    this.setState({comment: '', redirect: true});
  }
  renderImage(){
    if(this.state.files.length > 0){
      const f = this.state.files[0]
      /*
      let src = ""
      let reader = new FileReader();
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          src = e.target.result
          console.log("image " +src);
        };
      })(f);
      reader.readAsDataURL(f)
      */

      return(
        <img src={f.preview} alt="media" width="100%"/>
      )
    }
  }
  renderLoading(){
    return(
      <h2>Loading ...</h2>
    )
  }
  renderForm() {
    const u = this.props.store.user;
    console.log(u)
    // goes to home after saving a post
    if(this.state.redirect){
      return(
        <Redirect to="/"/>
      )
    }
    return (
      <Feed>
        <FeedItemHeader
          avatar={u.avatar}
          author={u.name}
          location={u.location}
          time={Date.now}
          new
        />
        <DropArea>

          <Dropzone onDrop={this.onDrop.bind(this)}  style={dropZoneStyle} multiple={false}>
            <p>Try dropping some files here, or click to select files to upload.</p>
            {
              this.state.files.map((f, i) => (
                  <p key={i}>
                    {f.name} - {f.size} bytes
                    {f.size > 2000000 ? <b>too large, max 2mb</b> : ''}
                  </p>
              ))
            }
          </Dropzone>
          {this.renderImage()}
        </DropArea>
        <Form onSubmit={this.addPost}>
          <Field type="text" value={this.state.comment} ref="comment" name="comment" onChange={this.handleChange} placeholder='Add a comment ...'/>
          <Button>Submit</Button>
        </Form>
      </Feed>
    );
  }
  render(){
    console.log(toJS(this.props.store.user))
    if(this.props.store.isFeedLoaded()){
      return(
        this.renderForm()
      )
    }else{
      return(
        this.renderLoading()
      )
    }
  }
})

export default FeedItemNew;

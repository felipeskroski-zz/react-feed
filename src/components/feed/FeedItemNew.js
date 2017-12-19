import React, { Component } from 'react'
//import {toJS} from 'mobx'
import {Redirect} from 'react-router-dom'
import {observer} from 'mobx-react'
import styled from 'styled-components'
import Dropzone from 'react-dropzone'
import feedStore from  '../../store.js'
import FeedItemHeader from './FeedItemHeader'

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
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.addPost = this.addPost.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.state = {
      comment: '',
      files: [],
      redirect: false,
      imgdata: {},
      loading: false,
    }
  }

  handleChange(event) {
    this.setState({comment: event.target.value})
  }

  onDrop(files) {
    this.setState({
      files: files,
    })
  }

  addPost(e){
    e.preventDefault()
    this.setState({loading:true})
    let self = this
    const u = this.props.store.user


    const post = {
      author: u.name,
      author_image: u.avatar,
      author_location: u.location,
      author_id: u._id,
      time: Date.now(),
      media: this.state.files[0],
      likes: null,
      imgdata: this.state.imgdata,
    }
    const comment = {
      author: u.name,
      author_id: u._id,
      body: this.state.comment,
      time: Date.now(),
    }

    // send data to store to handle the post write on firebase
    feedStore.savePost(post, comment).then(function(e){
      // redirect after that
      console.log('Post updated !')
      self.setState({comment: '', redirect: true, loading: false})
    })


  }
  renderImage(){
    // TODO resize image before sending to firebase
    let self = this
    if(this.state.files.length > 0){
      const f = this.state.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(f)
      reader.onload = function(e) {
        // browser completed reading file send data to firebase
        console.log('img loaded')
        self.state.imgdata = e.target.result

      }

      // render image preview
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
    const u = this.props.store.user
    // goes to home after saving a post
    if(this.state.redirect){
      //window.location.reload()

      return(
        //<Redirect to="/"/>
        window.location.href = '/'
      )
    }
    return (
      <Feed>
        <FeedItemHeader
          author_image={u.avatar}
          author={u.name}
          location={u.location}
          author_id={u._id}
          time={Date.now}
          new
        />
        <DropArea>

          <Dropzone onDrop={this.onDrop}  style={dropZoneStyle} multiple={false}>
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
    )
  }
  render(){
    if(!feedStore.isFeedLoaded()){
      return(
        this.renderLoading()
      )
    }else{
      return(
        this.renderForm()
      )
    }
  }
})

export default FeedItemNew

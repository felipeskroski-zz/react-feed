import React, { Component } from 'react'
import {Redirect, Link} from 'react-router-dom'
import Dropzone from 'react-dropzone'
import styled from 'styled-components'
import feedStore from  '../../store.js'

const dropZoneStyle = {
  height:'100%',
  width: '100%',
  position:'absolute',
  zIndex: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
}

const DropArea = styled.section`
  max-width: 100%;
  border: 2px dashed black;
  background: #ccc;
  height: 120px;
  width: 120px;
  border-radius: 50%;
  position: relative;
  align-self: center;
`
const Preview = styled.img`
  border-radius: 50%;
`

class Signup extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.state = {
      loading: false,
      error: false,
      redirect: false,
      email: '',
      password: '',
      password_confirm: '',
      name: '',
      location: '',
      imgdata: {},
      files: [],
    }
  }


  handleSubmit(event) {
    event.preventDefault()
    this.setState({loading:true})
    const self = this
    const name = this.state.name
    const location = this.state.location
    const email = this.state.email
    const password = this.state.password
    const avatar = this.state.files[0]
    const imgdata = this.state.imgdata

    console.log('A name was submitted: ' + email + password)

    if (email.length < 4) {
      alert('Please enter an email address.')
      return
    }
    if (password.length < 4) {
      alert('Please enter a password.')
      return
    }
    // login returns a promise so we can work out the ui changes
    feedStore.signup(email, password, name, location, avatar, imgdata).then(function(success){
      console.log('user signed')
      self.setState({loading:false, redirect: true})
    }).catch(function(error){
      console.log(error)
      self.setState({loading:false, error: error})
    })
  }

  handleChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }
  sendEmailVerification(){

  }

  onDrop(files) {
    this.setState({
      files: files,
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
        <Preview src={f.preview} alt="media" width="100%"/>
      )
    }
  }

  renderForm() {
    return (
      <div>
        <section className='auth-form'>
          <form onSubmit={this.handleSubmit}>
            <h3>Signup</h3>
            <DropArea>

              <Dropzone onDrop={this.onDrop}  style={dropZoneStyle} multiple={false}>

                {
                  this.state.files.map((f, i) => (
                      <p key={i}>
                        {f.size > 1000000 ? <b>Too large, max 1mb</b> : ''}
                      </p>
                  ))
                }
              </Dropzone>
              {this.renderImage()}

            </DropArea>
            <p>Your profile picture</p>
            <input name="name" placeholder="Name" type="text" value={this.state.name} onChange={this.handleChange}/>
            <input name="location" placeholder="Location" type="text" value={this.state.location} onChange={this.handleChange}/>
            <input name="email" placeholder="Email" type="email" value={this.state.email} onChange={this.handleChange}/>
            <input name="password" placeholder="Password" type="password" value={this.state.password} onChange={this.handleChange}/>
            <input name="password_confirm" placeholder="Confirm Password" type="password" value={this.state.password_confirm} onChange={this.handleChange}/>
            <input type="submit" value={this.state.loading ? 'Signing up...' : 'Signup'}/>
            {this.state.error && <p>{this.state.error.message}</p>}
          </form>
        </section>
        <section className='auth-form'>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </section>
      </div>
    )
  }
  render() {
    if(this.state.redirect){
      return(
        <Redirect to="/"/>
      )
    }
    return(
      this.renderForm()
    )
  }
}


export default Signup

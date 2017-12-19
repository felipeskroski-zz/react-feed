import React, { Component } from 'react'
import {Redirect, Link} from 'react-router-dom'
import {observer} from 'mobx-react'
import feedStore from  '../../store.js'


const Login = observer(class Login extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      loading: false,
      error: false,
      redirect: false,
      email: '',
      password: '',
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({loading:true})
    const self = this
    const email = this.state.email
    const password = this.state.password

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
    feedStore.login(email, password).then(function(success){
      console.log('user logged in')
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


  handleLogout(){
    feedStore.logout()
  }

  renderForm() {
    return (
      <div>
        <section className='auth-form'>
          <form onSubmit={this.handleSubmit}>
            <p>Login to see the posts</p>
            <input name="email" placeholder="email" type="email" value={this.state.email} onChange={this.handleChange}/>
            <input name="password" placeholder="password" type="password" value={this.state.password} onChange={this.handleChange}/>
            <Link to="/forgot-password">Forgot?</Link>
            <input type="submit" value={this.state.loading ? 'Logging in...' : 'Login'}/>
            {this.state.error && <p>{this.state.error.message}</p>}
          </form>
        </section>
        <section className='auth-form'>
            <p>Don't have a login? <Link to="/signup">Signup</Link></p>
        </section>
      </div>
    )
  }
  renderLogout() {
    return (
      <div>
        <section className='auth-form'>
          <form onSubmit={this.handleLogout}>
            <p>Hello {this.props.current_user.name}</p>
            <input type="submit" value="Logout"/>
          </form>
        </section>
      </div>
    )
  }
  renderLoading(){
    return(
      <h2>Loading...</h2>
    )
  }
  render() {
    if(this.state.redirect){
      return(
        <Redirect to="/"/>
      )
    }
    if(this.props.current_user){
      return(
        <Redirect to="/"/>
      )
    }else{
      if(feedStore.initialized){
        return(
          this.renderForm()
        )
      }else{
        return(
          this.renderLoading()
        )
      }
    }
  }
})


export default Login

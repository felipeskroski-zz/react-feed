import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {toJS} from 'mobx';
import feedStore from  '../store.js'


class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      loading: false,
      error: false,
      redirect: false,
    };
  }

  handleSubmit(event) {
    this.setState({loading:true})
    const self = this

    console.log('A name was submitted: ' + this.email.value + this.password.value);
    event.preventDefault();
    const email = this.email.value
    const password = this.password.value
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
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

  handleLogout(){
    feedStore.logout()
  }

  renderForm() {
    return (
      <div>
        <section className='auth-form'>
          <form onSubmit={this.handleSubmit}>
            <p>Login to see the posts</p>
            <input name="name" placeholder="name" type="text" ref={(input) => this.name = input}/>
            <input name="email" placeholder="email" type="email" ref={(input) => this.email = input}/>
            <input name="password" placeholder="password" type="password" ref={(input) => this.password = input}/>
            <input name="password_confirm" placeholder="confirm password" type="password" ref={(input) => this.password_confirm = input}/>
            <input type="submit" value={this.state.loading ? 'Signing up...' : 'Signup'}/>
            {this.state.error && <p>{this.state.error.message}</p>}
          </form>
        </section>
        <section className='auth-form'>
            <p>Already have an account? <a href="/login">Signup</a></p>
        </section>
      </div>
    );
  }
  renderLogout() {
    return (
      <div>
        <section className='auth-form'>
          <form onSubmit={this.handleLogout}>
            <p>Hello {feedStore.user.name}</p>
            <input type="submit" value={this.state.loading ? 'Logging out...' : 'Logout'}/>
          </form>
        </section>
      </div>
    );
  }
  render() {
    if(this.state.redirect){
      return(
        <Redirect to="/"/>
      )
    }
    if(feedStore.user){
      return(
        this.renderLogout()
      )
    }else{
      return(
        this.renderForm()
      )
    }
  }

}


export default Login;

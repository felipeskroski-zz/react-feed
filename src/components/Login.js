import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {toJS} from 'mobx';
import feedStore from  '../store.js'


const styles = {
  author:{
    fontWeight: 'bold',
    marginRight: 5,
    textDecoration: 'none',
    color: 'black',
  },
  comment:{
    marginTop: 0,
  }
}

class Login extends Component {
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
      console.log(success)
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
            <input name="email" placeholder="email" type="email" ref={(input) => this.email = input}/>
            <input name="password" placeholder="password" type="password" ref={(input) => this.password = input}/>
            <input type="submit" value={this.state.loading ? 'Logging in...' : 'Login'}/>
            {this.state.error && <p>{this.state.error.message}</p>}
          </form>
        </section>
        <section className='auth-form'>
            <p>Don't have a login? <a href="/signup">Signup</a></p>
        </section>
      </div>
    );
  }
  renderLogout() {
    console.log(toJS(feedStore.user))
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
    if(feedStore.getUser()){
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

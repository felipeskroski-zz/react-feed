import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {toJS} from 'mobx';
import feedStore from  '../../store.js'


class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      loading: false,
      error: false,
      redirect: false,
      email: '',
      password: '',
      name: '',
      location: '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({loading:true})
    const self = this
    const name = this.state.name
    const location = this.state.location
    const email = this.state.email
    const password = this.state.password

    console.log('A name was submitted: ' + email + password);

    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    // login returns a promise so we can work out the ui changes
    feedStore.signup(email, password, name, location).then(function(success){
      console.log('user signed')
      self.setState({loading:false, redirect: true})
    }).catch(function(error){
      console.log(error)
      self.setState({loading:false, error: error})
    })
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  sendEmailVerification(){

  }

  renderForm() {
    return (
      <div>
        <section className='auth-form'>
          <form onSubmit={this.handleSubmit}>
            <h3>Signup</h3>
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
            <p>Already have an account? <a href="/login">Login</a></p>
            <a href="#" onClick={feedStore.sendEmailVerification}>Send confirmation email</a>

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
    return(
      this.renderForm()
    )
  }
}


export default Signup;

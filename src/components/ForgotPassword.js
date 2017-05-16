import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import feedStore from  '../store.js'


const ForgotPassword = observer(class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      loading: false,
      error: false,
      sent: false,
      email: '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({loading:true})
    const self = this
    const email = this.state.email

    console.log('Sending password reset to: ' + email);
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    // login returns a promise so we can work out the ui changes
    feedStore.sendPasswordReset(email).then(function(success){
      console.log('password reset sent')
      self.setState({loading:false, sent: true})
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
  render() {
    return (
      <div>
        <section className='auth-form'>
          <form onSubmit={this.handleSubmit}>
            <p>Add your email to reset password</p>
            <input name="email" placeholder="email" type="email" value={this.state.email} onChange={this.handleChange}/>
            <input type="submit" value={this.state.loading ? 'Sending...' : 'Send'}/>
            {this.state.error && <p>{this.state.error.message}</p>}
            {this.state.sent && <p>Password reset sent to your email</p>}
          </form>
        </section>
      </div>
    );  }

})


export default ForgotPassword;

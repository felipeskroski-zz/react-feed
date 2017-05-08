import React, { Component } from 'react';

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
    };
  }
  handleSubmit(event) {
    console.log('A name was submitted: ' + this.email.value + this.password.value);
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <section className='auth-form'>
          <form onSubmit={this.handleSubmit}>
            <p>Login to see the posts</p>
            <input name="email" placeholder="email" type="email" ref={(input) => this.email = input}/>
            <input name="password" placeholder="password" type="password" ref={(input) => this.password = input}/>
            <input type="submit"/>
          </form>
        </section>
        <section className='auth-form'>
            <p>Don't have a login? <a href="/signup">{this.state.loaging ? 'Loading' : 'Signup'}</a></p>
        </section>
      </div>
    );
  }
}


export default Login;

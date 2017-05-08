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
  render() {
    return (
      <div>
        <section className='auth-form'>
          <form action="">
            <p>Login to see photos from your friends.</p>
            <input name="email" placeholder="email" type="email"/>
            <input name="password" placeholder="password" type="password"/>
            <input type="submit"/>
          </form>
        </section>
        <section className='auth-form'>
            <p>Don't have a login? <a href="/signup">Signup</a></p>
        </section>
      </div>
    );
  }
}


export default Login;

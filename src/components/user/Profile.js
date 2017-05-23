import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom'
import {observer} from 'mobx-react';
import styled from 'styled-components';
import Avatar from '../common/Avatar';

const Header = styled.section`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;
const Author = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
`
const Name = styled.h4`
  font-size: 24px;
  margin: 0;
  text-align: left;
`
const Location = styled.p`
  font-size: 20px;
  margin: 0;
  text-align: left;
`


const Profile = observer(class Profile extends Component {
  renderLoading(){
    return(
      <h2>Loading Profile ...</h2>
    )
  }
  renderProfile() {
    const i = this.props.user;
    console.log('loading user profile')
    console.log(i)
    return (
      <Header>
        <Author>
          <Avatar src={i.avatar} alt="Username" size={100}/>
          <div>
            <Name>{i.name}</Name>
            <Location>{i.location}</Location>
          </div>
        </Author>
        <Link to="/logout">Logout</Link>
      </Header>
    );
  }
  render(){
    if(!this.props.user){
      return(
        <Redirect to="/login"/>
      )
    }else{
      return(
        this.renderProfile()
      )
    }
  }
})

export default Profile;

import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom'
import {observer} from 'mobx-react';
import styled from 'styled-components';
import Avatar from '../common/Avatar';
import feedStore from  '../../store.js'

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
        <div>
          <Link to="/logout">Logout</Link>
          {feedStore.isUserVerified() &&
            <p><a href="#" onClick={feedStore.sendEmailVerification}>Send confirmation email</a></p>
          }
        </div>
      </Header>
    );
  }
  //TODO create helper for logged only views
  render(){
    if(feedStore.isFeedLoaded()){
      if(!this.props.user){
        console.log('redirecting to login')
        return(
          <Redirect to="/login"/>
        )
      }else{
        return(
          this.renderProfile()
        )
      }
    }else{
      return(
        this.renderLoading()
      )
    }


  }
})

export default Profile;

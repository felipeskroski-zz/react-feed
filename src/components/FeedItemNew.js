import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {observer} from 'mobx-react';
import styled from 'styled-components';
import FeedItemHeader from './FeedItemHeader';
import FeedItemNewForm from './FeedItemNewForm';
import media from '../img/media.jpg';

// these styles automaticaly create new components based on a dom obj
const Feed = styled.article`
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  margin: 30px 0;
`
const Image = styled.img`
  max-width: 100%;
`
const Comments = styled.section`
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  padding: 20px;
`
const Likes = styled.p`
  margin-top: 0;
`

class FeedItemNew extends Component {
  render() {
    const u = this.props.user;
    return (
      <Feed>
        <FeedItemHeader
          avatar={u.avatar}
          author={u.name}
          location={u.location}
          time={Date.now}
          new
        />
        <section>
          <Image src={media} alt="media" />
        </section>
        <FeedItemNewForm/>
      </Feed>
    );
  }
}

export default FeedItemNew;

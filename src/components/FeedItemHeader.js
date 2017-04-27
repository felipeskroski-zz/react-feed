import React, { Component } from 'react';
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
`
const Name = styled.h4`
  font-size: 14px;
  margin: 0;
  text-align: left;
`
const Location = styled.p`
  font-size: 12px;
  margin: 0;
  text-align: left;
`


class FeedItemHeader extends Component {
  render() {
    const i = this.props;
    return (
      <Header>
        <Author>
          <Avatar src={i.avatar} alt="Username" />
          <div>
            <Name>{i.author}</Name>
            <Location>{i.location}</Location>
          </div>
        </Author>
        <div>{i.time}</div>
      </Header>
    );
  }
}

export default FeedItemHeader;

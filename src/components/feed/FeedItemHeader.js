import React, { Component } from 'react';
import styled from 'styled-components';
import Avatar from '../common/Avatar';
import DeleteLink from '../common/DeleteLink';
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
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(e){
    e.preventDefault()
    console.log(`post/${this.props.post._id}/delete`)
    console.log(this.props)
    if(confirm("Are you sure?")){
      return feedStore.deletePost(this.props.post._id)
    }
  }

  renderRemove(){
    // if current user is the author allow it to delete
    if(!feedStore.user){
      return false
    }
    if(feedStore.user._id === this.props.author_id && !this.props.new){
      return(
        <DeleteLink
          href={`post/${this.props.post_id}/delete`}
          onClick={this.handleRemove}>✕</DeleteLink>
      )
    }
  }

  render() {
    const i = this.props;
    return (
      <Header>
        <Author>
          <Avatar src={i.author_image} alt="Username" />
          <div>
            <Name>{i.author}</Name>
            <Location>{i.location}</Location>
          </div>
        </Author>
        <div>{i.time} {this.renderRemove()}</div>
      </Header>
    );
  }
}

export default FeedItemHeader;

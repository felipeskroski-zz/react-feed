import React, { Component } from 'react';
import styled from 'styled-components';
import feedStore from  '../store.js'


const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid #eee;
`
const Field = styled.input`
  padding: 15px 15px;
  flex: 1;
  font-size: 16px;
  border: none;
  font-weight: 300;
`
const Button = styled.button`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 20px;
  background: #ebebeb;
  border: none;
  font-size: 16px;
  color: #222;
`

class FeedItemNewForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.addComment = this.addComment.bind(this);
    this.state = {
      comment: '',
    };
  }
  handleChange(event) {
    this.setState({comment: event.target.value});
  }
  addComment(e){
    e.preventDefault()
    feedStore.addComment(this.props.id, this.state.comment)
    this.setState({comment: ''});
  }
  render() {
    return (
      <Form onSubmit={this.addComment}>
        <Field type="text" value={this.state.comment} ref="comment" name="comment" onChange={this.handleChange} placeholder='Add a comment ...'/>
        <Button>Done</Button>
      </Form>
    );
  }
}

export default FeedItemNewForm;

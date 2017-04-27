import React, { Component } from 'react';
import styled from 'styled-components';


const Form = styled.form`
  display: flex;
`
const Field = styled.input`
  padding: 15px 15px;
  flex: 1;
  font-size: 16px;
  border: none;
  border-top: 1px solid #eee;
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

class FeedItemForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.addComment = this.addComment.bind(this);
    this.state = {
      comment: '',
      like: false,
    };
  }
  handleChange(event) {
    this.setState({comment: event.target.value});
  }
  addComment(e){
    e.preventDefault()
    this.props.onSubmit(this.state.comment)
  }
  render() {
    return (
      <Form onSubmit={this.addComment}>
        <Field type="text" ref="comment" name="comment" onChange={this.handleChange} placeholder='Add a comment ...'/>
        <Button>Done</Button>
      </Form>
    );
  }
}

export default FeedItemForm;

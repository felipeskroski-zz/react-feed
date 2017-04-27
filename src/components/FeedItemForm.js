import React, { Component } from 'react';
import styled from 'styled-components';


const Form = styled.div`
  display: flex;
`
const Field = styled.input`
  padding: 10px;

`
const Button = styled.button`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: #ccc;
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
  addComment(){
    this.props.onSubmit(this.state.comment)
  }
  render() {
    return (
      <Form>
        <Field type="text" name="comment" onChange={this.handleChange} />
        <Button onClick={this.addComment}>Comment</Button>
      </Form>
    );
  }
}

export default FeedItemForm;

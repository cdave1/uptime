import React from 'react';

import { Message } from 'semantic-ui-react'

class Messages extends React.Component {
  render() {
    return this.props.messages.success ? (
      <Message floating>
        {this.props.messages.success.map((message, index) => <div key={index}>{message.msg}</div>)}
      </Message>
    ) : this.props.messages.error ? (
      <Message floating negative>
        {this.props.messages.error.map((message, index) => <div key={index}>{message.msg}</div>)}
      </Message>
    ) : this.props.messages.info ? (
      <Message info floating>
        {this.props.messages.info.map((message, index) => <div key={index}>{message.msg}</div>)}
      </Message>
    ) : null;
  }
}

export default Messages;

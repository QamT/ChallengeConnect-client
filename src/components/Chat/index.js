import React from 'react';
import io from 'socket.io-client';
import uuid from 'uuid/v4';

import { SOCKET_URL } from '../../config';

export default class Chat extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      displayChat: false,
      message: '',
      messages: []
    }   
    
    this.socket = io(SOCKET_URL);

    this.socket.on('RECEIVE_MESSAGE', data => {
      this.addMessage(data);
    });
  }

  toggleChat = () => {
    this.setState(prevState => 
      ({ displayChat: !prevState.displayChat})
    );
  }

  sendMessage = (e) => {
    if (e.key === 'Enter') {
      this.socket.emit('SEND_MESSAGE', {
        profileUrl: 'https://static.thenounproject.com/png/630729-200.png',
        message: this.state.message
      });
      this.setState({ message: '' })
    }
  }

  addMessage = (data) => {
    this.setState({ messages: [...this.state.messages, data]});
  }

  componentWillUnmount = () => {
    this.socket.disconnect();
  }

  render() {
    let displayChat = this.state.displayChat ? 'chat-display': '';
    return (
      <div className={`${this.props.className} ${displayChat}`}>
        <h3
          onClick={() => this.toggleChat()}
          tabIndex='0'
        >
          CHAT
        </h3>
        <div className='chat__contents'>
          <ul>
            {this.state.messages.map(user => 
              <li key={uuid()}>
                <div className='chat__contents-user'>
                  <img src={user.profileUrl} alt='test' height='25' width='25'/>
                  <p>{user.name}</p>
                </div>
                <p className='chat__contents-message'>{user.message}</p>
              </li>
            )}
          </ul>
          <input 
            type='text' 
            aria-label='press enter to send message' 
            placeholder='message'
            value={this.state.message}
            onChange={e => this.setState({ message: e.target.value })}
            onKeyPress={this.sendMessage}
          />
        </div>
      </div>
    )
  }
}
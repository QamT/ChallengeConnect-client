import React from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { Icon } from 'semantic-ui-react';

import Chatbox from '../Chatbox';
import { SOCKET_URL } from '../../config';

export class Chat extends React.Component {
  static propTypes = {
    userId: string.isRequired,
    name: string.isRequired,
    profile: string
  }

  state = {
    displayChat: false,
    message: '',
    messages: []
  }   
  
  componentDidMount() {
    this.socket = io(SOCKET_URL);
    this.socket.on('RECEIVE_MESSAGE', data => this.addMessage(data));
  }

  toggleChat = e => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.setState(prevState => ({ displayChat: !prevState.displayChat }));
    }
  }

  setMessage = e => {
    this.setState({ message: e.target.value });
  }

  sendMessage = e => {
    const { profile, name, userId } = this.props;
    const { message } = this.state;

    if (!message) return;
    if (e.key === 'Enter' || e.type === 'click') {
      this.socket.emit('SEND_MESSAGE', {
        userId,
        name,
        profile,
        message,
      });
      this.setState({ message: '' });
    }
  }

  addMessage = data => {
    this.setState({ messages: [...this.state.messages, data] });
  }
  
  setRef = (ref) => {
    this.chat = ref;
  }

  componentDidUpdate(...args) {
    if (args[1].messages.length !== this.state.messages.length) {
      this.chat.scrollTo({ top: this.chat.scrollHeight, behavior: 'smooth' });
    }
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    const { displayChat, message, messages } = this.state;
    const { userId } = this.props;
    const classes = displayChat ? 'chat chat--display' : 'chat';
   
    return (
      <div className={classes}>
        <h4 
          onClick={this.toggleChat}
          onKeyDown={this.toggleChat}
          aria-label='toggle chat'
          tabIndex='0'
        >
          Chat {displayChat ? <Icon name='chevron down' /> : <Icon name='chevron up' />}
        </h4>
        <Chatbox 
          setRef={this.setRef}
          userId={userId}
          message={message}
          messages={messages} 
          setMessage={this.setMessage} 
          sendMessage={this.sendMessage} 
          hidden={!displayChat}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.userId,
  profile: state.user.profilePic.url,
  name: `${state.user.firstName} ${state.user.lastName}`
});

export default connect(mapStateToProps)(Chat);


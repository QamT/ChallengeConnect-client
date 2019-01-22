import React from 'react';
import { string, object, arrayOf, func, bool } from 'prop-types';
import { Icon } from 'semantic-ui-react';

import ChatMessage from '../ChatMessage';

const Chatbox = ({ userId, message, messages, setMessage, sendMessage, setRef, hidden }) => (
  <div className='chat__box'>
    <ul ref={setRef}>
      {messages.map((user, i) => <ChatMessage key={`${user.userId}-${i}`} user={user} isCurrentUser={user.userId === userId} />)}
    </ul>
    <div className='chat__box-input'>
      <input 
        type='text'
        aria-label='type your message'
        placeholder='Type your message'
        value={message}
        onChange={setMessage}
        onKeyDown={sendMessage}
        maxLength='150'
        autoComplete='off'
        disabled={hidden}
      />
      <Icon
        name='send'
        circular
        inverted
        aria-label='send message'
        onClick={sendMessage}
        onKeyDown={sendMessage}
        tabIndex={hidden ? '' : '0'}
      />
    </div>
  </div>
)

Chatbox.propTypes = {
  userId: string.isRequired,
  message: string,
  messages: arrayOf(object),
  setMessage: func.isRequired,
  sendMessage: func.isRequired,
  setRef: func.isRequired,
  hidden: bool.isRequired
}

export default Chatbox;

import React from 'react';
import { Icon } from 'semantic-ui-react';

const ChatMessage = ({ user, isCurrentUser }) => (
  <li className={isCurrentUser ? 'right' : null}> 
    {!isCurrentUser ?
      <>
        {user.profile ?
          <img src={user.profile} alt={`${user.name} profile`} height='42' width='42'/> :
          <Icon 
            name='user' 
            circular 
            size='large' 
            color='teal' 
            inverted 
            aria-label={`${user.name} profile`}
          />
        }
        <span className='chat__box-message'>
          <Icon name='caret left' size='big'/>
          <span className='name'>{user.name}</span>
          <p>{user.message}</p>
        </span>
      </> :
      <>
        <span className='chat__box-message chat__box-message--current'>
          <Icon name='caret right' size='big'/>
          <p style={{ color: '#fff' }}>{user.message}</p>
        </span>
        {user.profile ?
          <img src={user.profile} alt={`${user.name} profile`} height='42' width='42'/> :
          <Icon 
            name='user' 
            circular 
            size='large' 
            color='teal' 
            inverted 
            aria-label={`${user.name} profile`}
          />
        }
      </>
    }
  </li>
)

export default ChatMessage;


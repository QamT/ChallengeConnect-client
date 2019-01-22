import React from 'react';
import { arrayOf, string, func, object, shape } from 'prop-types';
import { Icon } from 'semantic-ui-react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Profile from '../../../Profile';

const FriendInfoCard = ({ requests = [], requested = [], acceptFriendRequest, rejectFriendRequest }) => (
  <>
    <div className='infoBox'>
      <span className='infoBox-arrow'><Icon name='caret up' /></span>
      <h4 className='infoBox-title'>Friend Requests</h4>
      <ul>
        <TransitionGroup component={null}>
          {requests.map(user => (
            <CSSTransition key={user._id} enter={false} timeout={375} classNames='slide'>
              <li>
                <span>
                  <Profile user={user} size={42} side='right' />
                  <span className='name'>{user.firstName} {user.lastName}</span>
                </span>
                <span className='btn-actions'>
                  <Icon 
                    name='checkmark' 
                    title='accept friend request'
                    aria-label='accept friend request'
                    circular 
                    onClick={e => acceptFriendRequest(e, user._id)} 
                    onKeyDown={e => acceptFriendRequest(e, user._id)} 
                    tabIndex='0' 
                  />
                  <Icon 
                    name='close' 
                    title='reject friend request'
                    aria-label='reject friend request'
                    circular 
                    onClick={e => rejectFriendRequest(e, user._id)} 
                    onKeyDown={e => rejectFriendRequest(e, user._id)} 
                    tabIndex='0' 
                  />
                </span>
              </li>
            </CSSTransition>)
            )
          }
        </TransitionGroup> 
        {requests.length === 0 && <li>No friend requests</li>}
      </ul>
      <h4 className='infoBox-title'>Friend's Requested</h4>
      <ul>
        {requested.length > 0 ? 
          requested.map(user => (
            <li key={user._id}>
              <span>
                <Profile user={user} size={42} side='right' />
                <span className='name'>{user.firstName} {user.lastName}</span>
              </span>
            </li>
            )
          ) : 
          <li>No friend requests sent</li>
        }
      </ul>
    </div>
  </>
)

FriendInfoCard.propTypes = {
  requests: arrayOf(shape({
    _id: string.isRequired,
    firstName: string.isRequired,
    lastName: string.isRequired,
    profilePic: object,
    currentChallenge: object,
    about: string
  })),
  requested: arrayOf(shape({
    _id: string.isRequired,
    firstName: string.isRequired,
    lastName: string.isRequired,
    profilePic: object,
    currentChallenge: object,
    about: string
  })),
  acceptFriendRequest: func.isRequired,
  rejectFriendRequest: func.isRequired
}

export default FriendInfoCard;



import React from 'react';
import { arrayOf, shape, string, object, func } from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import { sendFriendRequest, acceptFriendRequest } from '../../actions/user';

export class ProfileCard extends React.Component {
  static propTypes = {
    userId: string.isRequired,
    friends: arrayOf(object),
    friendRequests: arrayOf(object),
    friendRequested: arrayOf(object),
    user: shape({
      firstName: string.isRequired,
      lastName: string.isRequired,
      profilePic: object,
      currentChallenge: object,
      about: string
    }).isRequired,
    displayProfile: func.isRequired,
    side: string
  }

  sendFriendRequest = (e, userId) => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.props.dispatch(sendFriendRequest(userId));
    }
  }

  acceptFriendRequest = (e, userId) => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.props.dispatch(acceptFriendRequest(userId));
    }
  }

  render() {
    const { user, userId, displayProfile, friends = [], friendRequests = [], friendRequested = [], side = ''} = this.props;
    const id = user.id || user._id;
    
    return (
      <div className={`profile__card ${side ? 'profile__card--right' : ''}`}>
        <span className={`profile__card-arrow ${side ? 'profile__card-arrow--right' : ''}`}>
          <Icon name={side ? 'caret left' : 'caret right'} />
        </span>
        <div className='profile__card-top'>
          <span className='profile__card-close' onClick={displayProfile} onKeyDown={displayProfile} tabIndex='0'>
            <Icon name='chevron left' title='close profile' aria-label='close-profile' />
          </span>
          <span className='profile__card-friendStatus' >
            {
              id === userId ? null :
              friends.find(friend => id === friend._id) ? <Icon name='user outline' title='friend' /> :
              friendRequested.find(person => person._id === id) ? <Icon name='user' title='friend request sent' /> :
              friendRequests.find(person => person._id === id) ? 
              <Icon 
                name='add user' 
                title='accept friend request' 
                aria-label='accept friend request' 
                tabIndex='0' 
                onClick={e => this.acceptFriendRequest(e, id)} 
                onKeyDown={e => this.acceptFriendRequest(e, id)} 
              /> :
              <Icon 
                name='add user' 
                title='send friend request' 
                aria-label='send friend request' 
                tabIndex='0' 
                onClick={e => this.sendFriendRequest(e, id)}
                onKeyDown={e => this.sendFriendRequest(e, id)}  
              /> 
            }
          </span>
          <span className='outer-ring-1'>
            <span className='outer-ring-2'>
              {user.profilePic.url ? 
                <img
                  src={user.profilePic.url} 
                  alt={`${user.firstName} profile`}
                  height='55'
                  width='55'
                /> :
                <Icon name='user' circular size='big' color='teal' inverted aria-label={`${user.firstName} profile`} />
              }
            </span>
          </span>
          <h4>{user.firstName} {user.lastName}</h4>
        </div>
        <div className='profile__card-bottom'>
          <span className='profile__card-about'>
            <span>
              <h5>About</h5>
              <p>{user.about || 'No info available'}</p>
            </span>
          </span>
          <span className='profile__card-status'>
            {user.currentChallenge ? user.currentChallenge.id ? 
              `${user.firstName} is currently part of a challenge` : 
              `${user.firstName} is not in an active challenge` : null
            }
          </span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.userId,
  friends: state.user.friends,
  friendRequests: state.user.friendRequests,
  friendRequested: state.user.friendRequested
});

export default connect(mapStateToProps)(ProfileCard);

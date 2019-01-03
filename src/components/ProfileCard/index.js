import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import { sendFriendRequest, acceptFriendRequest } from '../../actions/user';

export class ProfileCard extends React.Component {
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
    const { user, userId, displayProfile, friends, friendRequests, friendRequested, side = ''} = this.props;
    const friend = friends.find(friend => user.id === friend);
    const requests = friendRequests.find(person => person.id === user.id);
    const requested = friendRequested.find(person=> person.id === user.id);

    return (
      <div className={side ? 'profile__card profile__card--right' : 'profile__card'}>
        <span className={side ? 'profile__card-arrow profile__card-arrow--right' : 'profile__card-arrow'}>
          <Icon name={side ? 'caret left' : 'caret right'} />
        </span>
        <div className='profile__card-top'>
          <span className='outer-ring-1'>
            <span className='outer-ring-2'>
              <span className='profile__card-close' onClick={displayProfile} onKeyDown={displayProfile} tabIndex='0'>
                <Icon name='chevron left' title='close profile' />
              </span>
              <span className='profile__card-friendStatus' >
                {
                  user.id === userId ? null :
                  friend ? <Icon name='user outline' title='friend' /> :
                  requested ? <Icon name='user' title='friend request sent' /> :
                  requests ? 
                  <Icon 
                    name='add user' 
                    title='accept friend request' 
                    tabIndex='0' 
                    onClick={(e) => this.acceptFriendRequest(e, user.id)} 
                    onKeyDown={(e) => this.acceptFriendRequest(e, user.id)} 
                  /> :
                  <Icon 
                    name='add user' 
                    title='send friend request' 
                    tabIndex='0' 
                    onClick={(e) => this.sendFriendRequest(e, user.id)}
                    onKeyDown={(e) => this.sendFriendRequest(e, user.id)}  
                  /> 
                }
              </span>
              {user.profilePic.url ? 
                <img
                  src={user.profilePic.url} 
                  alt={`${user.firstName} profile`}
                  height='60'
                  width='60'
                /> :
                <Icon name='user' circular size='big' color='teal' inverted />
              }
            </span>
          </span>
          <h4>{user.firstName} {user.lastName}</h4>
        </div>
        <div className='profile__card-bottom'>
          <span className='profile__card-about'>
            <span>
              <h5>About</h5>
              <p>{user.about ? user.about : 'No info available'}</p>
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


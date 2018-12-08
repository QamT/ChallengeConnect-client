import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4'

import { acceptFriendRequest, rejectFriendRequest } from '../../actions/user';

export class FriendInfo extends React.Component {
  state = {
    displayInfo: false
  }

  displayInfo = () => {
    this.setState(prevState => 
      ({ displayInfo: !prevState.displayInfo })
    );
  }

  acceptFriendRequest = userId => {
    this.props.dispatch(acceptFriendRequest(userId));
  }

  rejectFriendRequest = userId => {
    this.props.dispatch(rejectFriendRequest(userId));
  }

  render() {
    const { friendRequests, friendRequested } = this.props;
    let shouldDisplay = this.state.displayInfo ? 
      'friendInfo__content friendInfo__content-display' : 'friendInfo__content';
    
    return (
      <>
        <span className='friendInfo' onClick={this.displayInfo} tabIndex='0'>F</span>
        <div className={shouldDisplay}>
          <span className='friendInfo__arrow'></span>
          <h4>Friend Requests</h4>
          <ul>
            {friendRequests.length > 0 ? 
              friendRequests.map(user => 
                <li key={uuid()}>
                  <span 
                    className='btn btn--accept'
                    onClick={() => this.acceptFriendRequest(user.id)}
                    tabIndex='0'
                  >
                  A
                  </span>
                  <span>[P] {user.firstName} {user.lastName}</span>
                  <span 
                    className='btn btn--reject'
                    onClick={() => this.rejectFriendRequest(user.id)}
                    tabIndex='0'
                  >
                  R
                  </span>
                </li>
              ) : 
              <li key='1'>No friend requests</li>
            }
          </ul>
          <h4>Friends Requested</h4>
          <ul>
            {friendRequested.length > 0 ? 
              friendRequested.map(user => 
                <li key={uuid()}>
                  <span>[P] {user.firstName} {user.lastName}</span>
                </li>
              ) : 
              <li key='2'>No friend requests sent</li>
            }
          </ul>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  friendRequests: state.user.friendRequests,
  friendRequested: state.user.friendRequested
});

export default connect(mapStateToProps)(FriendInfo);
import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4'
import { Icon } from 'semantic-ui-react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Profile from '../Profile';
import { acceptFriendRequest, rejectFriendRequest } from '../../actions/user';

export class FriendInfo extends React.Component {
  state = {
    displayInfo: false
  }

  displayInfo = e => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.setState(prevState => 
        ({ displayInfo: !prevState.displayInfo })
      );
    }
  }

  acceptFriendRequest = (e, userId) => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.props.dispatch(acceptFriendRequest(userId));
    }
  }

  rejectFriendRequest = (e, userId) => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.props.dispatch(rejectFriendRequest(userId));
    }
  }

  render() {
    const { friendRequests, friendRequested } = this.props;

    return (
      <>
        <Icon name='users' inverted circular onClick={this.displayInfo} onKeyDown={this.displayInfo} tabIndex='0' />
        {this.state.displayInfo && 
          <>
            <div className='friendInfo'>
              <span className='friendInfo-arrow'><Icon name='caret up' /></span>
              <h4 className='friendInfo-title'>Friend Requests</h4>
              <ul>
                <TransitionGroup>
                  {friendRequests.map(user => 
                    <CSSTransition key={user.id} timeout={375} classNames='slide'>
                      <li>
                        <span>
                          <Profile user={user} />
                          <span className='name'>{user.firstName} {user.lastName}</span>
                        </span>
                        <span className='btn-actions'>
                          <Icon 
                            name='checkmark' 
                            title='accept friend request'
                            circular 
                            onClick={e => this.acceptFriendRequest(e, user.id)} 
                            onKeyDown={e => this.acceptFriendRequest(e, user.id)} 
                            tabIndex='0' 
                          />
                          <Icon 
                            name='close' 
                            title='reject friend request'
                            circular 
                            onClick={e => this.rejectFriendRequest(e, user.id)} 
                            onKeyDown={e => this.rejectFriendRequest(e, user.id)} 
                            tabIndex='0' 
                          />
                        </span>
                      </li>
                    </CSSTransition>)
                  }
                </TransitionGroup> 
                {friendRequests.length === 0 && <li key='1'>No friend requests</li>}
              </ul>
              <h4 className='friendInfo-title'>Friend's Requested</h4>
              <ul>
                {friendRequested.length > 0 ? 
                  friendRequested.map(user => 
                    <li key={uuid()}>
                      <span>
                        <Profile user={user} />
                        <span className='name'>{user.firstName} {user.lastName}</span>
                      </span>
                    </li>
                  ) : 
                  <li key='2'>No friend requests sent</li>
                }
              </ul>
            </div>
          </>
        }
      </>
    )
  }
}

const mapStateToProps = state => ({
  friendRequests: state.user.friendRequests,
  friendRequested: state.user.friendRequested
});

export default connect(mapStateToProps)(FriendInfo);

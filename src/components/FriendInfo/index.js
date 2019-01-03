import React from 'react';
import { arrayOf, string, func, object, shape } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon } from 'semantic-ui-react';

import FriendInfoCard from '../FriendInfoCard';
import { acceptFriendRequest, rejectFriendRequest } from '../../actions/user';

export class FriendInfo extends React.Component {
  static propTypes = {
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
      this.props.acceptFriendRequest(userId);
    }
  }

  rejectFriendRequest = (e, userId) => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.props.rejectFriendRequest(userId);
    }
  }

  render() {
    const { requests, requested } = this.props;
   
    return (
      <>
        <Icon 
          name='users' 
          inverted circular
          title='friend requests and friends requested' 
          aria-label='friend requests and friends requested' 
          onClick={this.displayInfo} 
          onKeyDown={this.displayInfo} 
          tabIndex='0' 
        />
        {this.state.displayInfo && 
          <FriendInfoCard 
            requests={requests} 
            requested={requested} 
            acceptFriendRequest={this.acceptFriendRequest}
            rejectFriendRequest={this.rejectFriendRequest}
          />
        }
      </>
    )
  }
}

const mapStateToProps = state => ({
  requests: state.user.friendRequests,
  requested: state.user.friendRequested,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    acceptFriendRequest,
    rejectFriendRequest
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(FriendInfo);


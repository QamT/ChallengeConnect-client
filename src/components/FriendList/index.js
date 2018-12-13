import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import Loader from '../Loader';
import { API_BASE_URL } from '../../config';
import { removeFriend } from '../../actions/user';

export class FriendList extends React.Component {
  state = {
    friends: [],
    loading: false
  }

  componentDidMount() {
    this.fetchFriends(this.props.friendIds)
  }

  componentDidUpdate(prevProps) {
    if(prevProps.friendIds.length !== this.props.friendIds.length) {
      this.fetchFriends(this.props.friendIds);
    }
  }

  fetchFriends(friendIds) {
    this.setState({ loading: true });
    fetch(`${API_BASE_URL}user/friend/info`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.authToken}`
      },
      body: JSON.stringify({ friendIds })
    })
    .then(res => res.json())
    .then(data => this.setState({ friends: data, loading: false }))
    .catch(e => console.log(e));
  }

  removeFriend = (userId) => {
    this.props.dispatch(removeFriend(userId));
  };

  render() {
    if (this.state.loading) return <Loader />
    return (
      <div className='friendsList'>
        <ul className='friendsList__container'>
          {this.state.friends.map((friend =>
             <li key={uuid()}>
             [P] {friend.firstName} {friend.lastName} 
             <span 
              className='friendsList__remove'
              onClick={() => this.removeFriend(friend.id)} 
              tabIndex='0'
            >
            x
            </span>
            </li>))
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  friendIds: state.user.friends,
  authToken: state.auth.authToken
});

export default connect(mapStateToProps)(FriendList)

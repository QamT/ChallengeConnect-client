import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Profile from '../Profile';
import Loader from '../Loader';
import { API_BASE_URL } from '../../config';
import { removeFriend } from '../../actions/user';

export class FriendList extends React.Component {
  state = {
    friends: [],
    loading: true,
    class: 'friendCard'
  }

  componentDidMount() {
    this.fetchFriends(this.props.friendIds);
    setTimeout(() => this.setState({ class: 'friendCard friendCard-active'}), 1000);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.friendIds.length !== this.props.friendIds.length) {
      this.fetchFriends(this.props.friendIds);
    }
  }

  fetchFriends(friendIds) {
    fetch(`${API_BASE_URL}user/friend/info`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.authToken}`
      },
      body: JSON.stringify({ friendIds })
    })
    .then(res => res.json())
    .then(data => {
      this.setState({ friends: data.sort((a, b) => a.firstName.localeCompare(b.firstName)), loading: false })
    })
    .catch(e => console.log(e));
  }

  removeFriend = (e, userId) => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.props.dispatch(removeFriend(userId));
    }
  };

  render() {
    if (this.state.loading) return <Loader />

    const length = this.state.friends.length;
    return (
      <div className={this.state.class}>
        <h4 className='friendCard__count'>{length} {length === 1 ? 'friend' : 'friends'}</h4>
        <ul>
          <TransitionGroup className='friendCard__container'>
            {this.state.friends.map(friend =>
              <CSSTransition key={friend.id} enter={false} timeout={350} classNames='slide'>
                <li>
                  <span>
                    <Profile user={friend} />
                    <span className='name'>{friend.firstName} {friend.lastName}</span>
                  </span>
                  <Icon 
                    name='remove user' 
                    title='remove friend from list'
                    onClick={(e) => this.removeFriend(e, friend.id)} 
                    onKeyDown={(e) => this.removeFriend(e, friend.id)} 
                    tabIndex='0'
                  />
                </li>
              </CSSTransition>)
            }
            {length === 0 &&
              <CSSTransition 
                timeout={375} 
                classNames='slide'
              >
                <li>No friends added</li>
              </CSSTransition>
            }
          </TransitionGroup>
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


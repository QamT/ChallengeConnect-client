import React from 'react';
import { arrayOf, string, shape, object, bool } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon } from 'semantic-ui-react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ChallengeIcon from './ChallengeIcon';
import FriendInfo from './FriendInfo';
import Profile from '../../Profile';
import { sendChallenge, removeFriend } from '../../../actions/user';

export class FriendList extends React.Component {
  static propTypes = {
    friends: arrayOf(shape({
      _id: string.isRequired,
      firstName: string.isRequired,
      lastName: string.isRequired,
      profilePic: object,
      currentChallenge: object,
      about: string
    })),
    challengeId: string,
    active: bool,
    challengeSent: arrayOf(string)
  }

  sendChallenge = (e, userId) => {
    const { challengeId, sendChallenge } = this.props;
    if (e.key === 'Enter' || e.type === 'click') sendChallenge(challengeId, userId);
  };

  removeFriend = (e, userId) => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.props.removeFriend(userId);
    }
  };

  render() {
    let { friends, challengeSent, challengeId, active } = this.props;
    const length = friends.length;
    if (length > 1) friends = friends.sort((a, b) => a.firstName.localeCompare(b.firstName));
    
    return (
      <div className='friendCard'>
        <h4 className='friendCard__count'>{length} {length === 1 ? 'friend' : 'friends'}</h4>
        <FriendInfo />
        <ul className='friendCard__container'>
          <TransitionGroup component={null}>
            {friends.map(friend => (
              <CSSTransition key={friend._id} enter={false} timeout={350} classNames='slide'>
                <li>
                  <span>
                    <Profile user={friend} side='right' />
                    <span className='name'>{friend.firstName} {friend.lastName}</span>
                  </span>
                  <span className='friendCard__actions'>
                    <ChallengeIcon 
                      friend={friend._id}
                      sendChallenge={this.sendChallenge} 
                      challengeSent={challengeSent} 
                      active={active}
                      challengeId={challengeId}
                      inChallenge={friend.currentChallenge.id === challengeId}
                    />
                    <Icon 
                      name='remove user' 
                      title='remove friend from list'
                      aria-label='remove friend from list'
                      onClick={e => this.removeFriend(e, friend._id)} 
                      onKeyDown={e => this.removeFriend(e, friend._id)} 
                      tabIndex='0'
                    />
                  </span>
                </li>
              </CSSTransition>)
              )
            }
          </TransitionGroup>
          {!length && <li>No friends added</li>}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  friends: state.user.friends,
  challengeId: state.user.currentChallenge,
  active: state.challenge.active,
  challengeSent: state.user.challengeSent
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    removeFriend,
    sendChallenge
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);




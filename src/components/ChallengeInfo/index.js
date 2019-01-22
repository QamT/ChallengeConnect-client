import React from 'react';
import { arrayOf, object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon } from 'semantic-ui-react';

import ChallengeInfoCard from '../ChallengeInfoCard';
import { acceptChallenge, rejectChallenge } from '../../actions/user';

export class ChallengeInfo extends React.Component {
  static propTypes = {
    requests: arrayOf(object)
  }

  state = {
    displayInfo: false
  }

  displayInfo = e => {
    if (e.key === 'Enter' || e.type === 'click') this.setState(prevState => ({ displayInfo: !prevState.displayInfo }));
  }

  acceptChallenge = (e, userId, challengeId, teamId) => {
    if (e.key === 'Enter' || e.type === 'click') this.props.acceptChallenge(userId, challengeId, teamId);
  }

  rejectChallenge = (e, userId) => {
    if (e.key === 'Enter' || e.type === 'click') this.props.rejectChallenge(userId);
  }

  render() {
    const { requests } = this.props;
    
    return (
      <>
        <Icon 
          name='users' 
          inverted circular
          title='challenges requested and challenge requests' 
          aria-label='challenges requested and challenge requests' 
          onClick={this.displayInfo} 
          onKeyDown={this.displayInfo} 
          tabIndex='0' 
        />
        {this.state.displayInfo &&
          <ChallengeInfoCard 
            requests={requests} 
            acceptChallenge={this.acceptChallenge} 
            rejectChallenge={this.rejectChallenge}
          />
        }
      </>
    )
  }
}

const mapStateToProps = state => ({
  requests: state.user.challengeRequests.filter(request => request.id !== null)
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    acceptChallenge,
    rejectChallenge
  }, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps)(ChallengeInfo);


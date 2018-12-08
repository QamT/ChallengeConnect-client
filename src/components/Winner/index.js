import React from 'react';
import { connect } from 'react-redux';

import { resetChallenge } from '../../actions/user';
import { completeChallenge } from '../../actions/challenge';

export class Winner extends React.Component {
  componentDidMount() {
    const { challengeId, teamId, team } = this.props;
    this.props.dispatch(completeChallenge(challengeId, teamId, team));
  }

  resetChallenge = () => {
    const { challengeId, adminId, teamId, proofs } = this.props;
    this.props.dispatch(resetChallenge(challengeId, adminId, teamId, proofs));
  }

  render() {
    const { team } = this.props;
  
    return (
      <div className='challengeCard'>
        <div className='challengeCard__container'>
          <h3>team {team.toUpperCase()} has won</h3>
          <button onClick={this.resetChallenge}>Done</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  challengeId: state.challenge.challengeId,
  adminId: state.challenge.adminId,
  teamId: state.challenge.teamId,
  proofs: [...state.team.teamA.proof, ...state.team.teamB.proof]
});

export default connect(mapStateToProps)(Winner);


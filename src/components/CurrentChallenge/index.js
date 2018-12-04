import React from 'react';
import { connect } from 'react-redux';

import TeamList from '../TeamList';
import ChallengeList from '../ChallengeList';
import Admin from '../Admin';
import { fetchAdmin } from '../../actions/admin';
import { fetchTeams } from '../../actions/team';
import { activateChallenge } from '../../actions/challenge';

export class CurrentChallenge extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAdmin(this.props.adminId));
    this.props.dispatch(fetchTeams(this.props.teamId));
  }

  changeChallengeState = (challengeId) => {
    this.props.dispatch(activateChallenge(challengeId));
  }

  render() {
    const { loading, isAdmin, active, challenges, challengeId } = this.props;

    if (loading) return <div>loading---</div> 
    return (
      <div className='challengeCard'>
        <div 
          className={
            `challengeCard__container
            challengeCard__container--${active ? 'active' : 'standBy'}`
          }
        >
          {isAdmin && <Admin />}
          <TeamList team='A' />
          <ChallengeList challenges={challenges} />
          <TeamList team='B' />
          {(isAdmin && !active) && <button onClick={() => this.changeChallengeState(challengeId)}>Start Challenge</button>}
        </div>
      </div>
    )
  }
}
  
const mapStateToProps = (state) => ({
  loading: state.team.loading,
  adminId: state.challenge.adminId,
  challengeId: state.challenge.challengeId,
  isAdmin: state.admin.admin === state.user.userId,
  title: state.challenge.title,
  challenges: state.challenge.challenges,
  teamId: state.challenge.teamId,
  active: state.challenge.active
});

export default connect(mapStateToProps)(CurrentChallenge);

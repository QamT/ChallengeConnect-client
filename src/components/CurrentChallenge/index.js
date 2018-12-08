import React from 'react';
import { connect } from 'react-redux';

import TeamList from '../TeamList';
import ChallengeList from '../ChallengeList';
import Admin from '../Admin';
import Winner from '../Winner';
import { fetchAdmin } from '../../actions/admin';
import { fetchTeams } from '../../actions/team';
import { activateChallenge } from '../../actions/challenge';

export class CurrentChallenge extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAdmin(this.props.adminId));
    this.props.dispatch(fetchTeams(this.props.teamId));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.adminId !== this.props.adminId && prevProps.teamId !== this.props.teamId) {
      this.props.dispatch(fetchAdmin(this.props.adminId));
      this.props.dispatch(fetchTeams(this.props.teamId));
    } 
  }

  changeChallengeState = (challengeId) => {
    this.props.dispatch(activateChallenge(challengeId));
  }

  render() {
    const { loading, isAdmin, active, challenges, challengeId, scoreA, scoreB } = this.props;

    if (loading) return <div>loading---</div> 
    
    if (scoreA === 5 || scoreB === 5) {
      let team = scoreA === 5 ? 'a' : 'b';
      return <Winner team={team} />
    }

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
  active: state.challenge.active,
  scoreA: state.team.teamA.score,
  scoreB: state.team.teamB.score
});

export default connect(mapStateToProps)(CurrentChallenge);


//add clear user data to api
//add clear action to this component
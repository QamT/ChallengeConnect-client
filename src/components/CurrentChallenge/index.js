import React from 'react';
import { connect } from 'react-redux';

import TeamList from '../TeamList';
import ChallengeList from '../ChallengeList';
import Admin from '../Admin';
<<<<<<< HEAD
import { fetchTeams } from '../../actions/team';

export class CurrentChallenge extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchTeams(this.props.teamId));
  }

  render() {
    if (this.props.loading) return <div>loading---</div>
    return (
      <div className='challengeCard'>
        <div 
          className={
            `challengeCard__container
            challengeCard__container--${this.props.active ? 'active' : 'standBy'}`
          }
        >
          {this.props.isAdmin && <Admin />}
          <TeamList team='A' />
          <ChallengeList challenges={this.props.challenges} />
          <TeamList team='B' />
          {(this.props.isAdmin && !this.props.active) && <button>Start Challenge</button>}
        </div>
      </div>
    )
  }
}
  
const mapStateToProps = (state) => ({
  loading: state.team.loading,
  isAdmin: state.user.userId === state.challenge.adminId,
  title: state.challenge.title,
  challenges: state.challenge.challenges,
  teamId: state.challenge.teamId,
  active: state.challenge.active
});

export default connect(mapStateToProps)(CurrentChallenge);
=======

export default ({ user, currentChallenge, teams }) => (
  <div className='challengeCard'>
    <div 
      className={
        `challengeCard__container
         challengeCard__container--${currentChallenge.active ? 'active' : 'standBy'}`
      }
    >
      {user.admin.isAdmin && <Admin />}
      <TeamList myTeam={true} team={teams.myTeam.members} />
      <ChallengeList currentChallenge={currentChallenge} />
      <TeamList team={teams.otherTeam.members} />
      {(user.admin.isAdmin && !currentChallenge.active) && <button>Start Challenge</button>}
    </div>
  </div>
)
>>>>>>> 919878c6e821db29ca43cf89afb65ddb3329a6b0

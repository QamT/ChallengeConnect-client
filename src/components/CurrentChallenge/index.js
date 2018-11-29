import React from 'react';
import { connect } from 'react-redux';

import TeamList from '../TeamList';
import ChallengeList from '../ChallengeList';
import Admin from '../Admin';
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

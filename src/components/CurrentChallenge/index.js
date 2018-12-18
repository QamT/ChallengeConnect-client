import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import TeamList from '../TeamList';
import ChallengeList from '../ChallengeList';
import Admin from '../Admin';
import Winner from '../Winner';
import Loader from '../Loader';
import { fetchAdmin, refreshAdminInfo } from '../../actions/admin';
import { fetchTeams, refreshTeamInfo, refreshScore } from '../../actions/team';
import { fetchIsActive, activateChallenge } from '../../actions/challenge';

export class CurrentChallenge extends React.Component {
  state = {
    error: null
  }

  componentDidMount() {
    this.props.dispatch(fetchAdmin(this.props.adminId));
    this.props.dispatch(fetchTeams(this.props.teamId));
    this.refreshInfo();
  }

  refreshInfo() {
    const { isAdmin, active, adminId, challengeId, teamId } = this.props;

    this.refreshInterval = setInterval(() => {
      if (isAdmin) this.props.dispatch(refreshAdminInfo(adminId));
      if (!active) this.props.dispatch(fetchIsActive(challengeId));
      if (!active) {
        this.props.dispatch(refreshTeamInfo(teamId, 'a'));
        this.props.dispatch(refreshTeamInfo(teamId, 'b'));
      }
      if (active) this.props.dispatch(refreshScore(teamId));
    }, 1000 * 10);
  }

  activateChallenge = (e, challengeId) => {
    this.setState({ error: null });

    if (e.key === 'Enter' || e.type === 'click') {
      if (this.props.teamB.length === 0) {
        this.setState({ error: 'Must have at least one member on both teams' });
        return;
      }

      this.props.dispatch(activateChallenge(challengeId));
    }
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  render() {
    const { loading, isAdmin, active, title, challengeId, scoreA, scoreB, teamA, teamB } = this.props;
    const { error } = this.state;

    if (loading) return <Loader />
    
    if (scoreA === 5 || scoreB === 5) {
      const team = scoreA === 5 ? 'a' : 'b';
      return <Winner team={team} />
    }

    return (
      <section className='container'>
        <div className='challengeCard challengeCard--current'>
          {(error && isAdmin) && <span className='challengeCard__error'>{error}</span>}
          {isAdmin && <Admin />}
          <h3 className={active ? null : 'nonactive'}>{title}</h3>
          <div className='challengeCard__content challengeCard__content--current'>
            <TeamList team={teamA} />
            <ChallengeList />
            <TeamList team={teamB} />
          </div>
          {(isAdmin && !active) && 
            <span
              className='challengeCard__activate' 
              onClick={e => this.activateChallenge(e, challengeId)}
              onKeyDown={e => this.activateChallenge(e, challengeId)}
              title='start challenge'
              tabIndex='0'
            >
              <Icon name='angle right' data-name='arrow 1' />
              <Icon name='angle right' data-name='arrow 2' />
            </span>
          }
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.team.loading,
  adminId: state.challenge.adminId,
  challengeId: state.challenge.challengeId,
  isAdmin: state.admin.admin === state.user.userId,
  title: state.challenge.title,
  teamId: state.challenge.teamId,
  active: state.challenge.active,
  scoreA: state.team.teamA.score,
  scoreB: state.team.teamB.score,
  teamA: state.team.teamA.members,
  teamB: state.team.teamB.members
});

export default connect(mapStateToProps)(CurrentChallenge);

//give everybody on winning team a point when challenge is completed ---
// -error handling
// -styling
// -refactor
// -edge cases
// -accessibility
// -clean structure and names
// -understand code
// -transitions and animations
// -best practices
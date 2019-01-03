import React from 'react';
import { bool, string, shape, arrayOf, object, number } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AdminContainer from '../AdminContainer';
import Winner from '../Winner';
import TeamList from '../TeamList';
import ChallengeList from '../ChallengeList';
import Timer from '../Timer';
import Loader from '../Loader';
import { fetchAdmin, refreshAdminInfo } from '../../actions/admin';
import { fetchTeams, refreshTeamInfo } from '../../actions/team';
import { 
  fetchIsActive, 
  fetchIsComplete, 
  startChallengeTimer, 
  endChallengeTimer ,
  completeChallenge
} from '../../actions/challenge';

export class CurrentChallenge extends React.Component {
  static propTypes = {
    loading: bool.isRequired,
    completedTime: string,
    adminId: string.isRequired,
    challengeId: string.isRequired,
    teamId: string.isRequired,
    isAdmin: bool.isRequired,
    title: string.isRequired,
    active: bool.isRequired,
    scoreA: number.isRequired,
    scoreB: number.isRequired,
    teamA: arrayOf(shape({
      id: string,
      firstName: string,
      lastName: string,
      profilePic: object,
      about: string
    })),
    teamB: arrayOf(shape({
      id: string,
      firstName: string,
      lastName: string,
      profilePic: object,
      about: string
    })),
    proofsChallenged: object
  }

  state = {
    leader: null
  }

  componentDidMount() {
    const { fetchAdmin, winner, fetchTeams, adminId, teamId } = this.props;
    fetchTeams(teamId);
    if (!winner) {
      fetchAdmin(adminId);
      this.refreshInfo();
    }
  }

  refreshInfo() {
    const { 
      active, 
      adminId, 
      challengeId, 
      teamId, 
      refreshAdminInfo, 
      fetchIsActive, 
      refreshTeamInfo, 
      fetchIsComplete
    } = this.props;

    this.refreshInterval = setInterval(() => {
      refreshAdminInfo(adminId);
      refreshTeamInfo(teamId);
      if (!active) fetchIsActive(challengeId);
      if (active) fetchIsComplete(challengeId);
    }, 1000 * 60);
  }

  setWinner() {
    const { scoreA, scoreB, proofsChallenged, challengeId, endChallengeTimer } = this.props;
    const { leader } = this.state;
    const proofA = proofsChallenged.a === 0;
    const proofB = proofsChallenged.b === 0;
   
    if (scoreA === 5 && proofA && scoreB !== 5) return this.startChallengeTimer('a');
    if (scoreB === 5 && proofB && scoreA !==5) return this.startChallengeTimer('b');
    if (scoreA === 5 && scoreB === 5 && proofA && proofB) return this.startChallengeTimer('both');
    if (leader !== null) this.setState({ leader: null });

    endChallengeTimer(challengeId);
  }

  startChallengeTimer(leader) {
    const { startChallengeTimer, challengeId } = this.props;
    this.setState({ leader });
    startChallengeTimer(challengeId);
  }

  completeChallenge = () => {
    const { challengeId, teamId, completeChallenge } = this.props;
    const { leader } = this.state;
    if (leader) completeChallenge(challengeId, teamId, leader);
  }

  componentDidUpdate(prevProps) {
    const { scoreA, winner, scoreB, proofsChallenged, active } = this.props; 
    const proof = prevProps.proofsChallenged.a !== proofsChallenged.a || prevProps.proofsChallenged.b !== proofsChallenged.b;

    if (!active || winner) return;
    if (
        (prevProps.scoreA !== scoreA && scoreA === 5) || 
        (prevProps.scoreB !== scoreB && scoreB === 5) || 
        (proof && (scoreA === 5 || scoreB === 5)) 
       ) { 
        this.setWinner();
      }
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  render() {
    const { loading, winner, completedTime = null, isAdmin, active, title, teamA, teamB } = this.props;
   
    if (winner) return <Winner winner={winner} />
    if (loading) return <Loader />

    return (
      <div className='container'>
        <div className='challengeCard challengeCard--current'>
          <h3 className={active ? null : 'inactive'}>{title}</h3>
          {isAdmin && <AdminContainer />}
          {completedTime && <Timer time={completedTime} completeChallenge={this.completeChallenge} />}
          <div className='challengeCard__content challengeCard__content--current'>
            <TeamList team={teamA} group='a' />
            <ChallengeList />
            <TeamList team={teamB} group='b' />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.team.loading,
  winner: state.challenge.winner,
  completedTime: state.challenge.completedTime,
  adminId: state.challenge.adminId,
  challengeId: state.challenge.challengeId,
  isAdmin: state.admin.admin === state.user.userId,
  title: state.challenge.title,
  teamId: state.challenge.teamId,
  active: state.challenge.active,
  scoreA: state.team.teamA.score,
  scoreB: state.team.teamB.score,
  teamA: state.team.teamA.members,
  teamB: state.team.teamB.members,
  proofsChallenged: {
    a: state.team.teamA.proofs.filter(proof => proof.challenged === true).length,
    b: state.team.teamB.proofs.filter(proof => proof.challenged === true).length
  },
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchAdmin,
    refreshAdminInfo,
    fetchTeams,
    refreshTeamInfo,
    fetchIsActive,
    fetchIsComplete,
    startChallengeTimer,
    endChallengeTimer,
    completeChallenge
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(CurrentChallenge);

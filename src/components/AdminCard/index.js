import React from 'react';
import { bool, string, arrayOf, object, number } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon } from 'semantic-ui-react';

import AdminActive from '../AdminActive';
import AdminStandby from '../AdminStandby';
import { acceptUser, rejectUser, acceptChallengeProof, denyChallengeProof } from '../../actions/admin';
import { decreaseScoreA, decreaseScoreB, clearProof, deleteProof } from '../../actions/team';

export class AdminCard extends React.Component {
  static propTypes = {
    active: bool.isRequired,
    adminId: string.isRequired,
    challengeId: string.isRequired,
    teamId: string.isRequired,
    requests: arrayOf(object),
    proofs: arrayOf(object),
    proofA: arrayOf(object).isRequired,
    teamA: number.isRequired,
    teamB: number.isRequired
  }

  acceptUser = (e, adminId, userId, challengeId, group, teamId) => {
    const { teamA, teamB, acceptUser } = this.props;
    const full = (group === 'a' && teamA === 5) || (group === 'b' && teamB === 5);
    
    if ((e.key === 'Enter' || e.type === 'click') && !full) {
      acceptUser(adminId, userId, challengeId, group, teamId);
    }
  }

  rejectUser = (e, adminId, userId, challengeId) => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.props.rejectUser(adminId, userId, challengeId);
    }
  }

  acceptProof = (e, proofId, adminId) => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.props.acceptChallengeProof(proofId, adminId);
      this.props.clearProof(proofId);
    }
  }

  denyProof = (e, proofId, adminId, userId, teamId) => {
    const { proofA, denyChallengeProof, deleteProof, decreaseScoreA, decreaseScoreB } = this.props;

    if (e.key === 'Enter' || e.type === 'click') {
      const group = proofA.find(proof => proofId === proof._id) ? 'a' : 'b';
      denyChallengeProof(proofId, adminId, userId, teamId, group);
      deleteProof(proofId);
      group === 'a' ? decreaseScoreA() : decreaseScoreB();
    }
  }

  render() {
    const { active, requests, proofs, adminId, challengeId, teamId } = this.props;
 
    return (
      <div className='infoBox infoBox--admin'>
        <span className='infoBox-arrow'><Icon name='caret up' /></span>
        {active ? 
          <AdminActive
            proofs={proofs} 
            acceptProof={this.acceptProof} 
            denyProof={this.denyProof} 
            adminId={adminId}
            teamId={teamId}
          /> : 
          <AdminStandby 
            requests={requests} 
            acceptUser={this.acceptUser}
            rejectUser={this.rejectUser}
            adminId={adminId}
            challengeId={challengeId}
            teamId={teamId}
          />
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  active: state.challenge.active,
  adminId: state.challenge.adminId,
  challengeId: state.user.currentChallenge,
  teamId: state.team.teamId,
  requests: state.admin.userRequests,
  proofs: state.admin.proofChallenged,
  proofA: state.team.teamA.proofs,
  teamA: state.team.teamA.members.length,
  teamB: state.team.teamB.members.length,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    acceptUser, 
    rejectUser,
    acceptChallengeProof,
    denyChallengeProof,
    decreaseScoreA,
    decreaseScoreB,
    clearProof,
    deleteProof
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AdminCard);


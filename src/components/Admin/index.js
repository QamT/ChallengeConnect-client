import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import { addMemberA, addMemberB, decreaseScoreA, decreaseScoreB } from '../../actions/team';
import { acceptUser, rejectUser, acceptChallengeProof, denyChallengeProof } from '../../actions/admin';
import { clearProof, deleteProof } from '../../actions/proof';

export class Admin extends React.Component {
  state = {
    displayInfo: false
  }

  displayInfo = () => {
    this.setState(prevState => 
      ({ displayInfo: !prevState.displayInfo })
    );
  }

  acceptUser = (adminId, userId, challengeId, group, teamId, userInfo) => {
    this.props.dispatch(acceptUser(adminId, userId, challengeId, group, teamId));
    group === 'a' ? this.props.dispatch(addMemberA(userInfo)) : this.props.dispatch(addMemberB(userInfo));
  }

  rejectUser = (adminId, userId) => {
    this.props.dispatch(rejectUser(adminId, userId))
  }

  acceptProof = (proofId, adminId) => {
    this.props.dispatch(acceptChallengeProof(proofId, adminId));
    this.props.dispatch(clearProof(proofId));
  }

  denyProof = (proofId, adminId, userId, teamId) => {
    let group = this.props.group.find(proof => proofId === proof.id) ? 'a' : 'b';
    this.props.dispatch(denyChallengeProof(proofId, adminId, userId, teamId, group));
    this.props.dispatch(deleteProof(proofId));
    group === 'a' ? this.props.dispatch(decreaseScoreA()) : this.props.dispatch(decreaseScoreB());
  }

  render() {
    const { requests, proofs, adminId, active, teamId } = this.props
    let classInfo = this.state.displayInfo ? 
      'challengeCard__admin-info challengeCard__admin-info-display' : 
      'challengeCard__admin-info'
   
    return (
      <>
        <span className='challengeCard__admin' onClick={() => this.displayInfo()} tabIndex='0'>A</span>
        <div className={classInfo}>
          <span className='arrow'></span>
          <ul>
            {requests.length === 0 && !active && <li>No requests for challenge yet</li>}
            {proofs.length === 0 && active && <li>No proofs challenged yet</li>}
            {requests.length > 0 && !active &&
              requests.map(user => 
                <li key={uuid()}>
                  <span 
                    tabIndex='0' 
                    className='btn btn--accept'
                    onClick={() => 
                      this.acceptUser(adminId, user.id, user.challengeId, user.group, user.teamId, 
                        {id: user.id, firstName: user.firstName, lastName: user.lastName, profilePic: user.profilePic, about: user.about}
                      )
                    }
                  >
                  A
                  </span>
                  <span>[P] {`${user.firstName} ${user.lastName}`}</span>
                  <span 
                    tabIndex='0' 
                    className='btn btn--reject'
                    onClick={() => this.rejectUser(adminId, user.id)}
                  >
                  R
                  </span>
                </li>
              )
            }
            {proofs.length > 0 && active && 
              proofs.map(proof => 
                <li key={uuid()}>
                  <span 
                    tabIndex='0' 
                    className='btn btn--accept'
                    onClick={() => this.acceptProof(proof.id, adminId)}
                  >
                  A
                  </span>
                  <span className='main-info'>
                    <div>
                      <img 
                        src={proof.url} 
                        alt='proof challenged' 
                        height='50px' width='50px'
                      />
                    </div>
                    <p>{proof.reason}</p>
                  </span>
                  <span 
                    tabIndex='0' 
                    className='btn btn--reject'
                    onClick={() => this.denyProof(proof.id, adminId, proof.user, teamId)}
                  >
                  R
                  </span>
                </li>
              )
            }
          </ul>
        </div>
      </>
    )
  }
}
  
const mapStateToProps = state => ({
  adminId: state.challenge.adminId,
  requests: state.admin.userRequests,
  proofs: state.admin.proofChallenged,
  active: state.challenge.active,
  teamId: state.team.teamId,
  group: state.proof.proofA
})

export default connect(mapStateToProps)(Admin);
import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import { addMemberA, addMemberB } from '../../actions/team';
import { acceptUser, rejectUser } from '../../actions/admin';

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

  render() {
    const { requests, proofs, adminId } = this.props
    let classInfo = this.state.displayInfo ? 
      'challengeCard__admin-info challengeCard__admin-info-display' : 
      'challengeCard__admin-info'

    return (
      <>
        <span className='challengeCard__admin' onClick={() => this.displayInfo()} tabIndex='0'>A</span>
        <div className={classInfo}>
          <span className='arrow'></span>
          <ul>
            {requests.length === 0 && <li>No requests for challenge yet</li>}
            {requests.length > 0 &&
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
          </ul>
        </div>
      </>
    )
  }
}
  
const mapStateToProps = state => ({
  adminId: state.challenge.adminId,
  requests: state.admin.userRequests,
  proofs: state.admin.proofChallenged
})

export default connect(mapStateToProps)(Admin);
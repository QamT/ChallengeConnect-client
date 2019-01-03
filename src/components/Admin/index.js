import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Profile from '../Profile';
import { acceptUser, rejectUser, acceptChallengeProof, denyChallengeProof, clearError } from '../../actions/admin';
import { fetchTeams, addMemberA, addMemberB, decreaseScoreA, decreaseScoreB } from '../../actions/team';
import { clearProof, deleteProof } from '../../actions/proof';

export class Admin extends React.Component {
  state = {
    displayInfo: false
  }

  displayInfo = e => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.setState(prevState => 
        ({ displayInfo: !prevState.displayInfo })
      );
    }
  }

  acceptUser = (e, adminId, userId, challengeId, group, teamId, userInfo) => {
    const { teamA, teamB } = this.props;
    const full = (group === 'a' && teamA === 5) || (group === 'b' && teamB === 5);

    if ((e.key === 'Enter' || e.type === 'click') && !full) {
      this.props.dispatch(acceptUser(adminId, userId, challengeId, group, teamId));
      group === 'a' ? this.props.dispatch(addMemberA(userInfo)) : this.props.dispatch(addMemberB(userInfo));
    }
  }

  rejectUser = (e, adminId, userId, challengeId) => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.props.dispatch(rejectUser(adminId, userId, challengeId));
    }
  }

  acceptProof = (e, proofId, adminId) => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.props.dispatch(acceptChallengeProof(proofId, adminId));
      this.props.dispatch(clearProof(proofId));
    }
  }

  denyProof = (e, proofId, adminId, userId, teamId) => {
    if (e.key === 'Enter' || e.type === 'click') {
      const group = this.props.group.find(proof => proofId === proof.id) ? 'a' : 'b';
      this.props.dispatch(denyChallengeProof(proofId, adminId, userId, teamId, group));
      this.props.dispatch(deleteProof(proofId));
      group === 'a' ? this.props.dispatch(decreaseScoreA()) : this.props.dispatch(decreaseScoreB());
    }
  }

  clearError = () => {
    setTimeout(() => {
      this.props.dispatch(clearError());
    }, 3000);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.error !== this.props.error && this.props.error) {
      this.clearError();
      this.props.dispatch(fetchTeams(this.props.teamId));
    }
  }

  render() {
    const { requests, proofs, adminId, active, teamId, challengeId, error } = this.props
    
    return (
      <>
        <Icon name='adn' size='large' onClick={this.displayInfo} onKeyDown={this.displayInfo} aria-label='admin control' tabIndex='0' />
        {error && <span className='admin-error'>{error}</span>}
        {this.state.displayInfo ? !active ?
          <div className='infoBox infoBox--admin'>
            <span className='infoBox-arrow'><Icon name='caret up' /></span>
            <h4 className='infoBox-title'>Challenge Requests</h4>
            <ul>
              <TransitionGroup>
                {requests.map(user => 
                  <CSSTransition key={user.id} timeout={375} classNames='slide'>
                    <li>
                      <span>
                        <Profile user={user} size='42' side='right' />
                        <span className='name'>{user.firstName} {user.lastName}</span>
                      </span>
                      <span className='btn-actions'>
                        <Icon 
                          name='checkmark' 
                          title='accept user for challenge'
                          circular 
                          onClick={e => 
                            this.acceptUser(e, adminId, user.id, challengeId, user.group, teamId, 
                              {id: user.id, firstName: user.firstName, lastName: user.lastName, profilePic: user.profilePic, about: user.about}
                            )
                          } 
                          onKeyDown={e => 
                            this.acceptUser(e, adminId, user.id, challengeId, user.group, teamId, 
                              {id: user.id, firstName: user.firstName, lastName: user.lastName, profilePic: user.profilePic, about: user.about}
                            )
                          } 
                          tabIndex='0' 
                        />
                        <Icon 
                          name='close' 
                          title='reject user for challenge'
                          circular 
                          onClick={e => this.rejectUser(e, adminId, user.id, challengeId)} 
                          onKeyDown={e => this.rejectUser(e, adminId, user.id, challengeId)} 
                          tabIndex='0' 
                        />
                      </span>
                    </li>
                  </CSSTransition>)
                }
              </TransitionGroup> 
              {requests.length === 0 && <li>No challenge requests</li>}
            </ul>
          </div> :
          <div className='infoBox infoBox--admin'>
            <span className='infoBox-arrow'><Icon name='caret up' /></span>
            <h4 className='infoBox-title'>Proofs Challenged</h4>
            <ul>
              <TransitionGroup>
                {proofs.map(proof => 
                  <CSSTransition key={proof.id} timeout={375} classNames='slide'>
                    <li>
                      <span>
                        {proof.url.charAt(proof.url.length - 1) === '4' ? 
                          <span className='proof'>
                            <video controls width='100' height='75'>
                              <source src={proof.url} type='video/mp4'/>
                              <p><a href={proof.url}>{proof.user.name} proof</a></p>
                            </video>
                          </span> :
                          <span className='proof'>
                            <img src={proof.url} alt={`${proof.user.name} proof`} height='75' width='100' />
                          </span>
                        }
                        <span className='reason'><span>Reason:</span>{proof.reason}</span>
                      </span>
                      <span className='btn-actions btn-actions--vertical'>
                        <Icon 
                          name='checkmark' 
                          title='accept proof'
                          circular 
                          onClick={e => this.acceptProof(e, proof.id, adminId)} 
                          onKeyDown={e => this.acceptProof(e, proof.id, adminId)} 
                          tabIndex='0' 
                        />
                        <Icon 
                          name='close' 
                          title='reject proof'
                          circular 
                          onClick={e => this.denyProof(e, proof.id, adminId, proof.user.id, teamId)} 
                          onKeyDown={e => this.denyProof(e, proof.id, adminId, proof.user.id, teamId)}  
                          tabIndex='0' 
                        />
                      </span>
                    </li>
                  </CSSTransition>)
                }
              </TransitionGroup> 
              {proofs.length === 0 && <li>No proofs challenged</li>}
            </ul>
          </div> : null
        }
      </>
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
  group: state.proof.proofA,
  teamA: state.team.teamA.members.length,
  teamB: state.team.teamB.members.length,
  error: state.admin.error
});

export default connect(mapStateToProps)(Admin);

import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import Proof from '../Proof';
import ProofModal from '../ProofModal';

export class ChallengeList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: 'modal',
      data: null
    }
  }

  displayModal = (challenged, proofGroup, proofId, proofUrl = null) => {
    const { userTeam } = this.props;
    this.setState({ 
      showModal: 'modal display-modal',
      data: {challenged, proofGroup, userTeam, proofId, proofUrl}
    });
  }

  closeModal = () => {
    this.setState({ showModal: 'modal' });
  }

  render() {
    const { challenges, active } = this.props
    return (
      <div className='challengeCard__list'>
        <ProofModal 
          closeModal={this.closeModal} 
          data={this.state.data}
          className={this.state.showModal}
        />
        <ul>
          {challenges.map((challenge, index) => 
            <li key={uuid()}>
              {active &&
                <Proof 
                  index={index}
                  team='a' 
                  displayModal={this.displayModal} 
                  proofId={this.props.proofA[index]} 
                />
              }
              <p>{challenge}</p>
              {active &&
                <Proof 
                  index={index}
                  team='b' 
                  displayModal={this.displayModal} 
                  proofId={this.props.proofB[index]} 
                />
              }
            </li>
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  proofA: state.team.teamA.proof,
  proofB: state.team.teamB.proof,
  active: state.challenge.active,
  userTeam: state.team.teamA.members.find(member => member.id === state.user.userId) ? 'a' : 'b'
});

export default connect(mapStateToProps)(ChallengeList);




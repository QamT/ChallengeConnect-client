import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import Proof from '../Proof';
import Modal from '../Modal';

<<<<<<< HEAD
export class ChallengeList extends React.Component {
=======
export default class ChallengeList extends React.Component {
>>>>>>> 919878c6e821db29ca43cf89afb65ddb3329a6b0
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      modalData: null
    }
  }
<<<<<<< HEAD

  displayModal = (team, proofUrl=null) => {
    this.setState({ 
      showModal: true,
      modalData: {team, proofUrl}
    });
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

  render() {
    const { challenges } = this.props
    return (
      <div className='challengeCard__list'>
        <Modal 
          closeModal={this.closeModal} 
          data={this.state.modalData}
          className={this.state.showModal ? 'modal display-modal' : 'modal'}
        />
        <ul>
          {challenges.map((challenge, index) => 
            <li key={uuid()}>
              <Proof 
                index={index}
                team='a' 
                displayModal={this.displayModal} 
                proofId={this.props.proofA[index]} 
              />
              <p>{challenge}</p>
              <Proof 
                index={index}
                team='b' 
                displayModal={this.displayModal} 
                proofId={this.props.proofB[index]} 
              />
            </li>
          )}
        </ul>
      </div>
    )
  }
}
//dont show proof when not active
const mapStateToProps = state => ({
  proofA: state.team.teamA.proof,
  proofB: state.team.teamB.proof
});

export default connect(mapStateToProps)(ChallengeList);
=======

  displayModal = (team, proofInfo) => {
    this.setState({ 
      showModal: true,
      modalData: {team, proofInfo}
    });
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

  render() {
    const { currentChallenge } = this.props

    return (
      <div className='challengeCard__list'>
        <Modal 
          closeModal={this.closeModal} 
          data={this.state.modalData}
          className={this.state.showModal ? 'modal display-modal' : 'modal'}
        />
        <ul>
          {currentChallenge.challenges.map((challenge, index) => 
            <li key={index}>
              <Proof team='a' active={currentChallenge.active} displayModal={this.displayModal} proof={currentChallenge.proofs[index]} />
              <p>{challenge}</p>
              <Proof team='b' active={currentChallenge.active} displayModal={this.displayModal} proof={currentChallenge.proofs[index + 1]} />
            </li>
          )}
        </ul>
      </div>
    )
  }
}

>>>>>>> 919878c6e821db29ca43cf89afb65ddb3329a6b0

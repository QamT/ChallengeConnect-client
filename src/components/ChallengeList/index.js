import React from 'react';

import Proof from '../Proof';
import Modal from '../Modal';

export default class ChallengeList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      modalData: null
    }
  }

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


import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import Proof from '../Proof';
import { fetchProofs, refreshProofsInfo } from '../../actions/proof'

export class ChallengeList extends React.Component {
  componentDidMount() {
    const { proofIdsA, proofIdsB } = this.props;

    this.props.dispatch(fetchProofs(proofIdsA, 'a'));
    this.props.dispatch(fetchProofs(proofIdsB, 'b'));
    this.refreshProofsInfo();
  }

  refreshProofsInfo() {
    const { proofIdsA, proofIdsB } = this.props;

    this.refreshInterval = setInterval(() => {
      this.props.dispatch(refreshProofsInfo(proofIdsA, 'a'));
      this.props.dispatch(refreshProofsInfo(proofIdsB, 'b'));
    }, 1000 * 10);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  render() {
    const { challenges, proofA, proofB, active } = this.props
    return (
      <ul className='challengeCard-challenges'>
        {challenges.map((challenge, index) => 
          <li key={uuid()} className={active ? 'active' : 'standby'}>
            <span>
              {active && <Proof proof={proofA[index]} team='a' />}
              <span>{!active && <span className='number'>{index + 1}.</span>} {challenge}</span>
              {active && <Proof proof={proofB[index]} team='b' />}
            </span>
            {(index !== challenges.length - 1 && active) && <hr />}
          </li>
        )}
      </ul>
    )
  }
}

const mapStateToProps = state => ({
  challenges: state.challenge.challenges,
  proofIdsA: state.team.teamA.proof,
  proofIdsB: state.team.teamB.proof,
  proofA: state.proof.proofA,
  proofB: state.proof.proofB,
  active: state.challenge.active
});

export default connect(mapStateToProps)(ChallengeList);




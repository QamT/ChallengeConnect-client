import React from 'react';
import { arrayOf, string, bool, object } from 'prop-types';
import { connect } from 'react-redux';

import Proof from '../Proof';

const ChallengeList = ({ challenges, proofA, proofB, active }) => (
  <ul className='challengeCard-challenges'>
    {challenges.map((challenge, index) => 
      <li key={challenge} className={active ? 'active' : 'standby'}>
        <div>
          {active && <Proof proof={proofA[index]} team='a' />}
          <span>{!active && <span className='number'>{index + 1}.</span>} {challenge}</span>
          {active && <Proof proof={proofB[index]} team='b' />}
        </div>
        {(index !== challenges.length - 1 && active) && <hr />}
      </li>
    )}
  </ul>
)

const mapStateToProps = state => ({
  challenges: state.challenge.challenges,
  proofA: state.team.teamA.proofs,
  proofB: state.team.teamB.proofs,
  active: state.challenge.active
});

ChallengeList.propTypes = {
  challenges: arrayOf(string).isRequired,
  proofA: arrayOf(object),
  proofB: arrayOf(object),
  active: bool.isRequired
}

export default connect(mapStateToProps)(ChallengeList);


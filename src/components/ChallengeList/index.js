import React from 'react';

import Proof from '../Proof';

export default ({ currentChallenge }) => (
  <div className='currentChallenge__list'>
    <ul>
      {currentChallenge.challenges.map((challenge, index) => 
        <li key={index}>
          <Proof proof={currentChallenge.proofs[index]} />
          <p>{challenge}</p>
          <Proof proof={currentChallenge.proofs[index + 1]} />
        </li>
      )}
    </ul>
  </div>
)

//@ needs to be another component(check)
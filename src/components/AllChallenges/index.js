import React from 'react';
import ChallengeCard from '../ChallengeCard';

export default ({ challenges }) => (
  <div>
    <ul className='grid'>
      {challenges.map(challenge => <ChallengeCard challenge={challenge} />)}
    </ul>
  </div>
)
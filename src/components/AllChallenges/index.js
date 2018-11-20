import React from 'react';
import ChallengeCard from '../ChallengeCard';

export default ({ challenges }) => (
  <div>
    <ul>
      {challenges.map(challenge => <ChallengeCard challenge={challenge} />)}
    </ul>
  </div>
)
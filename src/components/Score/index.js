import React from 'react';

export default ({ person, score }) => (
  <div className='leaderboard__score'>
    <p>{person}</p>
    <p>{score}</p>
  </div>
)
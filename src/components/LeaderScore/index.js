import React from 'react';
import Score from '../Score';

export default ({ leaders }) => (
  <div>
    {leaders.map(leader => <Score key={leader.id} person={leader.name} score={leader.score} />)}
  </div>
)
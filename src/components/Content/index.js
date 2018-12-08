import React from 'react';
import Leaderboard from '../Leaderboard';
import Friend from '../Friend';
import Challenges from '../Challenges';

export default ({ current }) => (
  <div>
    {
      (() => {
        switch(current) {
          case 'Leaderboard':
            return <Leaderboard />;
          case `Friend's List`:
            return <Friend />
          default: 
            return <Challenges />
        }
      })()
    }
  </div>
)
import React from 'react';
import uuid from 'uuid/v4';

import Profile from '../Profile';

export default ({ leaders }) => (
  <div className='leaderCard'>
    <ul>
    {
      leaders.map((leader, index) => 
        <li key={uuid()}>
          <div className='leaderCard__score'>
            <span><Profile user={leader} /></span> 
            <span className='leaderCard__main'>
              <span>
                <span className='leaderCard__number'>
                  {index + 1}.
                </span>
                {leader.firstName} {leader.lastName}
              </span>
              <span className='leaderCard__bar' style={{ width: `${leader.score}%` }}></span>
            </span>
            <span>{leader.score} points</span>
          </div>
          {index !== leaders.length - 1 && <hr />}
        </li>
      )
    }
    </ul>
  </div>
)
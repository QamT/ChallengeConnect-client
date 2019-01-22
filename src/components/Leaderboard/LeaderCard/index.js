import React from 'react';
import { arrayOf, shape, string, object, number } from 'prop-types';

import Profile from '../../Profile';

const LeaderCard = ({ leaders }) => (
  <div className='leaderCard'>
    <ul>
    {
      leaders.map((leader, index) => 
        <li key={leader.id}>
          <div className='leaderCard__container'>
            <span><Profile user={leader} side='right'/></span> 
            <span className='leaderCard__main'>
              <span>
                <span className='leaderCard-number'>
                  {index + 1}.
                </span>
                {leader.firstName} {leader.lastName}
              </span>
              <span className='leaderCard-bar' style={{ width: `${leader.score}%` }}></span>
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

LeaderCard.propTypes = {
  leaders: arrayOf(shape({
    id: string.isRequired,
    firstName: string.isRequired,
    lastName: string.isRequired,
    profilePic: object,
    currentChallenge: object,
    about: string,
    score: number.isRequired
  }))
}

export default LeaderCard;


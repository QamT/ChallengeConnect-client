import React from 'react';
import uuid from 'uuid/v4';
import { Icon } from 'semantic-ui-react';

import Profile from '../Profile';

export default ({ requestChallenge, admin, challengeId, request, title, challenges, teamA, teamB }) => {
  let spotsA = [];
  let spotsB = [];
  const requested = request !== challengeId;

  for (let i = teamA.length; i<5; i++) {
    spotsA.push(<li key={uuid()} className='empty'>---</li>);
  }

  for (let i = teamB.length; i<5; i++) {
    spotsB.push(<li key={uuid()} className='empty'>---</li>);
  }
  
  return (
    <>
      <li className='challengeCard'>
        <h3 className={requested ? null : 'requested'}>{requested ? title : 'Challenge Requested'}</h3>
        <div className='challengeCard__content'>
          <ul className='challengeCard-team'>
            {teamA.map(member=> 
              <li key={uuid()}>
                <Profile user={member} side='right' size={40} /><span className='name'>{`${member.firstName} ${member.lastName}`}</span>
              </li>)}
            {spotsA}
          </ul>
          <ul className='challengeCard-challenges'>
            {challenges.map((challenge, index) => <li key={uuid()}><span className='number'>{index + 1}.</span> {challenge}</li>)}
          </ul>
          <ul className='challengeCard-team'>
            {teamB.map(member=> 
              <li key={uuid()}>
                <Profile user={member} size={40} /><span className='name'>{`${member.firstName} ${member.lastName}`}</span>
              </li>)}
            {spotsB}
          </ul>
        </div>
        <div className='challengeCard__actions'>
          {teamA.length !== 5 && requested ? 
            <Icon 
              name='add circle' 
              size='big'
              onClick={(e) => requestChallenge(e, challengeId, admin, 'a')} 
              onKeyDown={(e) => requestChallenge(e, challengeId, admin, 'a')} 
              title='join team a'
              tabIndex='0'
            /> : requested ?
            <Icon 
              name='add circle' 
              size='big'
              title='team a is full'
              disabled
            /> : null
          }
          {teamB.length !== 5 && requested ?
            <Icon 
              name='add circle' 
              size='big'
              onClick={(e) => requestChallenge(e, challengeId, admin, 'b')} 
              onKeyDown={(e) => requestChallenge(e, challengeId, admin, 'b')} 
              title='join team b'
              tabIndex='0'
            /> : requested ?
            <Icon 
              name='add circle' 
              size='big'
              title='team b is full'
              disabled
            /> : null
          }
        </div>
      </li>
    </>
  )
}


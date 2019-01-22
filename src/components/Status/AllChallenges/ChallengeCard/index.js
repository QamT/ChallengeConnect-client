import React from 'react';
import { func, string, object, arrayOf } from 'prop-types';
import { Icon } from 'semantic-ui-react';

import Profile from '../../../Profile';

const ChallengeCard = ({ requestChallenge, admin, challengeId, request = [], title, challenges, teamA, teamB }) => {
  let spotsA = [];
  let spotsB = [];
  const requested = request.find(request => request === challengeId);

  for (let i = teamA.length; i<5; i++) {
    spotsA.push(<li key={`spotsA${i}`} className='empty'>---</li>);
  }

  for (let i = teamB.length; i<5; i++) {
    spotsB.push(<li key={`spotsB${i}`} className='empty'>---</li>);
  }
  
  return (
    <>
      <li className='challengeCard'>
        <h3 className={!requested ? null : 'requested'}>{!requested ? title : 'Challenge Requested'}</h3>
        <div className='challengeCard__content'>
          <ul className='challengeCard-team'>
            {teamA.map(member => (
              <li key={member.id}>
                <Profile user={member} side='right' size={40} /><span className='name'>{`${member.firstName} ${member.lastName}`}</span>
              </li>))
            }
            {spotsA}
          </ul>
          <ul className='challengeCard-challenges'>
            {challenges.map((challenge, index) => <li key={challenge}><span className='number'>{index + 1}.</span> {challenge}</li>)}
          </ul>
          <ul className='challengeCard-team'>
            {teamB.map(member => (
              <li key={member.id}>
                <Profile user={member} size={40} /><span className='name'>{`${member.firstName} ${member.lastName}`}</span>
              </li>))
            }
            {spotsB}
          </ul>
        </div>
        <div className='challengeCard__actions'>
          {teamA.length !== 5 && !requested ? 
            <Icon 
              name='add circle' 
              size='big'
              onClick={e => requestChallenge(e, challengeId, admin, 'a')} 
              onKeyDown={e => requestChallenge(e, challengeId, admin, 'a')} 
              title='join team a'
              aria-label='join team a'
              tabIndex='0'
            /> : !requested ?
            <Icon 
              name='add circle' 
              size='big'
              title='team a is full'
              disabled
            /> : null
          }
          {teamB.length !== 5 && !requested ?
            <Icon 
              name='add circle' 
              size='big'
              onClick={e => requestChallenge(e, challengeId, admin, 'b')} 
              onKeyDown={e => requestChallenge(e, challengeId, admin, 'b')} 
              title='join team b'
              aria-label='join team b'
              tabIndex='0'
            /> : !requested ?
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

ChallengeCard.propTypes = {
  requestChallenge: func.isRequired,
  admin: string.isRequired,
  challengeId: string.isRequired,
  request: arrayOf(string),
  title: string.isRequired,
  challenges: arrayOf(string),
  teamA: arrayOf(object),
  teamB: arrayOf(object)
}

export default ChallengeCard;



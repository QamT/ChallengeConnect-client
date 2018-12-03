import React from 'react';
import uuid from 'uuid/v4';

export default ({  onClickRequest, admin, challengeId, title, challenges, teamId, teamA, teamB }) => {
  let spotsA = [];
  let spotsB = [];

  for (let i = teamA.length; i<5; i++) {
    spotsA.push(<li key={uuid()}>---</li>);
  }

  for (let i = teamB.length; i<5; i++) {
    spotsB.push(<li key={uuid()}>---</li>);
  }

  return (
    <>
      <li className='challengeCard--mini'>
        <h3>{title}</h3>
        <div className='challengeCard__container challengeCard__container--mini'>
          <ul>
            {teamA.map((member, index) => <li key={index}>[&&] {`${member.firstName} ${member.lastName}`}</li>)}
            {spotsA}
            <li>
              <button onClick={() => onClickRequest(challengeId, admin, 'a', teamId)}>
                Join Team A
              </button>
            </li>
          </ul>
          <ul className='challengeCard__list'>
            {challenges.map((challenge, index) => <li key={index}>{challenge}</li>)}
          </ul>
          <ul>
            {teamB.map((member, index) => <li key={index}>[&&] {`${member.firstName} ${member.lastName}`}</li>)}
            {spotsB}
            <li>
              <button onClick={() => onClickRequest(challengeId, admin, 'b', teamId)}>
                Join Team B
              </button>
            </li>
          </ul>
        </div>
      </li>
    </>
  )
}
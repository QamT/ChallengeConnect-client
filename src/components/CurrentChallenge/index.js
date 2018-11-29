import React from 'react';

import TeamList from '../TeamList';
import ChallengeList from '../ChallengeList';
import Admin from '../Admin';

export default ({ user, currentChallenge, teams }) => (
  <div className='challengeCard'>
    <div 
      className={
        `challengeCard__container
         challengeCard__container--${currentChallenge.active ? 'active' : 'standBy'}`
      }
    >
      {user.admin.isAdmin && <Admin />}
      <TeamList myTeam={true} team={teams.myTeam.members} />
      <ChallengeList currentChallenge={currentChallenge} />
      <TeamList team={teams.otherTeam.members} />
      {(user.admin.isAdmin && !currentChallenge.active) && <button>Start Challenge</button>}
    </div>
  </div>
)
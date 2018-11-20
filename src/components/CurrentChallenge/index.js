import React from 'react';

import TeamList from '../TeamList';
import ChallengeList from '../ChallengeList';
import Admin from '../Admin';
import ProofModal from '../ProofModal';

export default ({ user, currentChallenge, teams }) => (
  <div className='currentChallenge'>
    <div className='modal'>
      <div className='modal-content'><ProofModal /></div>
    </div>
    <div 
      className={
        `currentChallenge__container
         currentChallenge__container--${currentChallenge.active ? 'active' : 'standBy'}`
      }
    >
      {user.admin.isAdmin && <Admin />}
      <TeamList team={teams.myTeam.members} />
      <ChallengeList currentChallenge={currentChallenge} />
      <TeamList otherTeam={teams.otherTeam.members} />
    </div>
  </div>
)
import React from 'react';
import uuid from 'uuid/v4';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Profile from '../Profile';

export default ({ team }) => {
  let spots=[];

  for (let i = team.length; i < 5; i++) {
    spots.push(<li key={uuid()} className='empty'>---</li>);
  }

  return (
    <ul className='challengeCard-team challengeCard-team--current'>
      <TransitionGroup component={null}>
        {team.map(member => 
          <CSSTransition key={member.id} timeout={400} classNames='slide'>
            <li>
              <Profile user={member} /><span className='name'>{`${member.firstName} ${member.lastName}`}</span>
            </li>
          </CSSTransition>
        )}
      </TransitionGroup>
      {spots}
    </ul>
  )
}


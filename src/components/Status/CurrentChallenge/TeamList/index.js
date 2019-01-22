import React from 'react';
import { string, arrayOf, shape, object } from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Profile from '../../../Profile';

const TeamList = ({ team = [], group }) => {
  let spots=[];

  for (let i = team.length; i < 5; i++) {
    spots.push(<li key={`${group}${i}`} className='empty'>---</li>);
  }

  return (
    <ul className='challengeCard-team challengeCard-team--current'>
      <TransitionGroup component={null}>
        {team.map(member => (
          <CSSTransition key={member.id} timeout={400} classNames='slide'>
            <li>
              <Profile user={member} side='right' />
              <span className='name'>{`${member.firstName} ${member.lastName}`}</span>
            </li>
          </CSSTransition>
          ))
        }
      </TransitionGroup>
      {spots}
    </ul>
  )
}

TeamList.propTypes = {
  team: arrayOf(shape({
    id: string,
    firstName: string,
    lastName: string,
    profilePic: object,
    about: string
  })),
  group: string.isRequired
}

export default TeamList;
